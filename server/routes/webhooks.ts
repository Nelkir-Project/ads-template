import express, { Router } from 'express';
import { SMSService } from '../services/smsService.js';
import { CalendlyService } from '../services/calendlyService.js';

const router = Router();
const smsService = new SMSService();
const calendlyService = new CalendlyService();

// (Removed Google Calendar webhook; migrated to Calendly)

// Calendly webhook endpoint
// Use raw body for signature verification on this route only
router.post('/calendly', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signatureHeader = req.headers['calendly-webhook-signature'] as string | undefined;
    const secret = process.env.CALENDLY_WEBHOOK_SECRET;
    const rawBody = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});

    // Verify signature if secret configured
    const valid = calendlyService.verifySignature(signatureHeader, rawBody, secret);
    if (!valid) {
      return res.status(400).send('Invalid signature');
    }

    const data = JSON.parse(rawBody || '{}');
    const eventType = data?.event;

    // Only process relevant events
    if (eventType !== 'invitee.created' && eventType !== 'invitee.canceled') {
      return res.status(200).send('Ignored');
    }

    const info = calendlyService.extractClientInfo(data);

    // Build normalized event object for message formatting
    const normalizedEvent: any = {
      id: info.eventId || 'calendly-event',
      summary: info.eventTitle || (eventType === 'invitee.canceled' ? 'Canceled Appointment' : 'New Appointment'),
      start: info.startTime ? { dateTime: info.startTime } : undefined,
      end: info.endTime ? { dateTime: info.endTime } : undefined,
      location: info.location || undefined,
    };

    let clientSent = false;
    let businessSent = false;

    if (eventType === 'invitee.created') {
      if (info.clientPhone) {
        const clientMessage = smsService.formatClientConfirmationMessage(normalizedEvent, info.clientName);
        clientSent = await smsService.sendSMS(info.clientPhone, clientMessage);
      }
    }

    // Business notification
    const businessPhone = process.env.BUSINESS_NOTIFICATION_PHONE;
    const sendBusinessCopy = process.env.SEND_BUSINESS_COPY === 'true';
    if (sendBusinessCopy && businessPhone && info.clientPhone) {
      const businessMessage = smsService.formatBusinessNotificationMessage(
        normalizedEvent,
        info.clientName,
        info.clientPhone
      );
      businessSent = await smsService.sendSMS(businessPhone, businessMessage);
    }

    res.status(200).json({ processed: true, clientSent, businessSent });
  } catch (error) {
    console.error('❌ Error processing Calendly webhook:', error);
    res.status(500).json({ error: 'Calendly webhook processing failed' });
  }
});

// Manual test endpoint for SMS
router.post('/test-sms', async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
      return res.status(400).json({ error: 'Phone number and message are required' });
    }

    const success = await smsService.sendSMS(phoneNumber, message);
    
    if (success) {
      res.json({ message: 'SMS sent successfully' });
    } else {
      res.status(500).json({ error: 'Failed to send SMS' });
    }
  } catch (error) {
    console.error('Error sending test SMS:', error);
    res.status(500).json({ error: 'SMS test failed' });
  }
});

// (Removed Google webhook verification endpoint)

export { router as webhookRoutes };
