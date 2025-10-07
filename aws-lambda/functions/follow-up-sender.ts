import type { EventBridgeHandler } from 'aws-lambda';
import { getConversation, markFollowUpSent } from '../utils/dynamodb';
import { sendSMS, formatFollowUpMessage } from '../utils/sns';
import { ConversationStatus } from '../types/conversation';

interface FollowUpEvent {
  phoneNumber: string;
  conversationId: string;
  clientName: string;
  scheduledTime: string;
}

/**
 * Lambda handler for sending follow-up SMS
 * Triggered by EventBridge scheduled event
 */
export const handler: EventBridgeHandler<'ScheduleFollowUp', FollowUpEvent, void> = async (
  event
) => {
  console.log('Processing follow-up event:', JSON.stringify(event, null, 2));

  try {
    const { phoneNumber, conversationId, clientName } = event.detail;

    // Get conversation to check if client has responded
    const conversation = await getConversation(phoneNumber, conversationId);

    if (!conversation) {
      console.error('Conversation not found:', conversationId);
      return;
    }

    // Check if client has already responded
    if (conversation.clientResponded) {
      console.log('Client has already responded. Skipping follow-up.');
      return;
    }

    // Check if follow-up was already sent
    if (conversation.followUpMessageSent) {
      console.log('Follow-up already sent. Skipping.');
      return;
    }

    // Check if conversation is in valid state for follow-up
    if (
      conversation.status !== ConversationStatus.AWAITING_RESPONSE &&
      conversation.status !== ConversationStatus.INITIAL_SENT &&
      conversation.status !== ConversationStatus.FOLLOW_UP_SCHEDULED
    ) {
      console.log('Conversation not in valid state for follow-up:', conversation.status);
      return;
    }

    // Send follow-up SMS
    const followUpMessage = formatFollowUpMessage(clientName);
    const smsSent = await sendSMS(phoneNumber, followUpMessage);

    if (!smsSent) {
      console.error('Failed to send follow-up SMS');
      throw new Error('Failed to send follow-up SMS');
    }

    // Update conversation record
    await markFollowUpSent(phoneNumber, conversationId);

    console.log('Follow-up SMS sent successfully to:', phoneNumber);
  } catch (error) {
    console.error('Error sending follow-up SMS:', error);
    throw error;
  }
};

