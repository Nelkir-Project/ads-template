/**
 * Data models for SMS conversation tracking
 */

export interface ConversationRecord {
  // Partition key: phone number
  phoneNumber: string;
  
  // Sort key: conversation ID (timestamp-based)
  conversationId: string;
  
  // Client information
  clientName: string;
  
  // Calendly event details
  eventId: string;
  eventTitle: string;
  eventStartTime: string;
  eventEndTime: string;
  
  // SMS tracking
  initialMessageSent: boolean;
  initialMessageSentAt?: string;
  followUpMessageSent: boolean;
  followUpMessageSentAt?: string;
  
  // Response tracking
  clientResponded: boolean;
  clientResponseAt?: string;
  clientResponseText?: string;
  
  // State management
  status: ConversationStatus;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  ttl?: number; // Auto-expire after 90 days
}

export enum ConversationStatus {
  INITIAL_SENT = 'INITIAL_SENT',
  AWAITING_RESPONSE = 'AWAITING_RESPONSE',
  FOLLOW_UP_SCHEDULED = 'FOLLOW_UP_SCHEDULED',
  FOLLOW_UP_SENT = 'FOLLOW_UP_SENT',
  CLIENT_RESPONDED = 'CLIENT_RESPONDED',
  COMPLETED = 'COMPLETED',
}

export interface FollowUpSchedule {
  // Partition key: scheduled execution time (ISO string)
  executionTime: string;
  
  // Sort key: conversation ID
  conversationId: string;
  
  // Reference data
  phoneNumber: string;
  clientName: string;
  
  // State
  executed: boolean;
  executedAt?: string;
  
  // Metadata
  createdAt: string;
}

export interface CalendlyWebhookPayload {
  event: string;
  payload: {
    event_type: {
      name: string;
    };
    event: {
      start_time: string;
      end_time: string;
    };
    invitee: {
      name?: string;
      first_name?: string;
      last_name?: string;
      email: string;
      text_reminder_number?: string;
      sms_reminder_number?: string;
    };
    questions_and_answers?: Array<{
      question: string;
      answer: string;
    }>;
  };
}


