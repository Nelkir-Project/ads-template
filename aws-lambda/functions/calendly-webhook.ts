import type { APIGatewayProxyHandler } from 'aws-lambda';
import { SFNClient, StartExecutionCommand } from '@aws-sdk/client-sfn';
import { createConversation } from '../utils/dynamodb';
import { sendSMS, formatInitialMessage } from '../utils/sns';
import { type ConversationRecord, ConversationStatus } from '../types/conversation';
import crypto from 'crypto';

const sfnClient = new SFNClient({});

/**
 * Verify Calendly webhook signature
 */
function verifyCalendlySignature(
  signatureHeader: string | undefined,
  rawBody: string,
  secret: string
): boolean {
  if (!signatureHeader) return false;

  const parts = signatureHeader.split(',').reduce<Record<string, string>>((acc, part) => {
    const [k, v] = part.split('=');
    if (k && v) acc[k.trim()] = v.trim();
    return acc;
  }, {});

  const timestamp = parts['t'];
  const signature = parts['v1'];
  if (!timestamp || !signature) return false;

  const payloadToSign = `${timestamp}.${rawBody}`;
  const expected = crypto.createHmac('sha256', secret).update(payloadToSign).digest('hex');
  
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

/**
 * Extract phone number from Calendly payload
 */
function extractPhoneNumber(payload: any): string | null {
  const invitee = payload?.invitee || {};
  
  // Check explicit phone fields
  const candidates = [
    invitee.sms_reminder_number,
    invitee.text_reminder_number,
    invitee.phone_number,
  ];

  // Check Q&A responses
  const qas = payload?.questions_and_answers;
  if (Array.isArray(qas)) {
    for (const qa of qas) {
      const question = (qa?.question || '').toLowerCase();
      if (question.includes('phone') || question.includes('mobile')) {
        candidates.push(qa?.answer);
      }
    }
  }

  // Return first valid phone
  for (const candidate of candidates) {
    if (candidate && typeof candidate === 'string') {
      const normalized = normalizePhoneNumber(candidate);
      if (isValidPhoneNumber(normalized)) {
        return normalized;
      }
    }
  }

  return null;
}

/**
 * Normalize phone number to E.164 format
 */
function normalizePhoneNumber(phone: string): string {
  let cleaned = phone.replace(/[^\d+]/g, '');
  
  if (cleaned.startsWith('+')) return cleaned;
  if (cleaned.length === 10) return `+1${cleaned}`;
  if (cleaned.length === 11 && cleaned.startsWith('1')) return `+${cleaned}`;
  if (!cleaned.startsWith('+')) cleaned = `+${cleaned}`;
  
  return cleaned;
}

/**
 * Validate phone number
 */
function isValidPhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/[^\d+]/g, '');
  if (!cleaned.startsWith('+')) return false;
  const digits = cleaned.substring(1);
  return digits.length >= 7 && digits.length <= 15 && /^\d+$/.test(digits);
}

/**
 * Extract client name from Calendly payload
 */
function extractClientName(payload: any): string {
  const invitee = payload?.invitee || {};
  
  if (invitee.name) return invitee.name;
  
  if (invitee.first_name || invitee.last_name) {
    return `${invitee.first_name || ''} ${invitee.last_name || ''}`.trim();
  }
  
  return 'Valued Client';
}

/**
 * Lambda handler for Calendly webhook
 */
export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('Received Calendly webhook:', JSON.stringify(event, null, 2));

  try {
    // Verify signature
    const secret = process.env.CALENDLY_WEBHOOK_SECRET;
    if (secret) {
      const signature = event.headers['calendly-webhook-signature'];
      const isValid = verifyCalendlySignature(signature, event.body || '', secret);
      
      if (!isValid) {
        console.error('Invalid webhook signature');
        return {
          statusCode: 401,
          body: JSON.stringify({ error: 'Invalid signature' }),
        };
      }
    }

    const payload = JSON.parse(event.body || '{}');
    const eventType = payload?.event;

    // Only process invitee.created events
    if (eventType !== 'invitee.created') {
      console.log('Ignoring event type:', eventType);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Event ignored' }),
      };
    }

    // Extract information
    const phoneNumber = extractPhoneNumber(payload.payload);
    if (!phoneNumber) {
      console.error('No valid phone number found in payload');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No phone number found' }),
      };
    }

    const clientName = extractClientName(payload.payload);
    const eventTitle = payload.payload?.event_type?.name || 'Appointment';
    const startTime = payload.payload?.event?.start_time;
    const endTime = payload.payload?.event?.end_time;
    const eventId = payload.payload?.event?.uuid || `event-${Date.now()}`;

    // Create conversation record
    const now = new Date().toISOString();
    const conversationId = `conv-${Date.now()}`;
    const ttl = Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60; // 90 days

    const conversationRecord: ConversationRecord = {
      phoneNumber,
      conversationId,
      clientName,
      eventId,
      eventTitle,
      eventStartTime: startTime,
      eventEndTime: endTime,
      initialMessageSent: false,
      followUpMessageSent: false,
      clientResponded: false,
      status: ConversationStatus.AWAITING_RESPONSE,
      createdAt: now,
      updatedAt: now,
      ttl,
    };

    await createConversation(conversationRecord);
    console.log('Conversation record created:', conversationId);

    // Send initial SMS
    const initialMessage = formatInitialMessage(clientName, eventTitle, startTime);
    const smsSent = await sendSMS(phoneNumber, initialMessage);

    if (!smsSent) {
      console.error('Failed to send initial SMS');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send SMS' }),
      };
    }

    console.log('Initial SMS sent successfully');

    // Schedule follow-up message for 30 minutes later using Step Functions
    const followUpTime = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    const stateMachineArn = process.env.STATE_MACHINE_ARN;
    
    if (stateMachineArn) {
      await sfnClient.send(
        new StartExecutionCommand({
          stateMachineArn,
          input: JSON.stringify({
            phoneNumber,
            conversationId,
            clientName,
            scheduledTime: followUpTime,
          }),
          name: `followup-${conversationId}`,
        })
      );

      console.log('Follow-up scheduled for:', followUpTime);
    } else {
      console.warn('STATE_MACHINE_ARN not configured. Follow-up not scheduled.');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Webhook processed successfully',
        conversationId,
        followUpScheduled: followUpTime,
      }),
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

