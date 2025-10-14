/**
 * Shared conversation types for frontend and backend
 * Re-exports from aws-lambda types and adds API response DTOs
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
  
  // Admin reply tracking
  adminReplies?: AdminReply[];
}

export enum ConversationStatus {
  INITIAL_SENT = 'INITIAL_SENT',
  AWAITING_RESPONSE = 'AWAITING_RESPONSE',
  FOLLOW_UP_SCHEDULED = 'FOLLOW_UP_SCHEDULED',
  FOLLOW_UP_SENT = 'FOLLOW_UP_SENT',
  CLIENT_RESPONDED = 'CLIENT_RESPONDED',
  COMPLETED = 'COMPLETED',
}

export interface AdminReply {
  message: string;
  sentAt: string;
  sentBy?: string;
}

// API Response DTOs
export interface ConversationsListResponse {
  conversations: ConversationRecord[];
  count: number;
  lastEvaluatedKey?: Record<string, any>;
}

export interface ConversationDetailResponse {
  conversation: ConversationRecord | null;
}

export interface SendReplyRequest {
  phoneNumber: string;
  conversationId: string;
  message: string;
}

export interface SendReplyResponse {
  success: boolean;
  message?: string;
  error?: string;
}




