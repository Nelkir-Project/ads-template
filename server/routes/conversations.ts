import express from 'express';
import {
  getAllConversations,
  getConversationsByStatus,
  getConversation,
  addAdminReply,
} from '../services/dynamodbService.js';
import { sendSMSReply, isValidPhoneNumber } from '../services/awsSnsService.js';
import type {
  ConversationsListResponse,
  ConversationDetailResponse,
  SendReplyRequest,
  SendReplyResponse,
} from '../../src/types/conversation.js';

const router = express.Router();

/**
 * GET /api/conversations
 * List all conversations with optional status filter
 */
router.get('/', async (req, res) => {
  try {
    const status = req.query.status as string | undefined;
    const limit = parseInt(req.query.limit as string) || 100;
    const lastKey = req.query.lastKey ? JSON.parse(req.query.lastKey as string) : undefined;

    let conversations;
    let lastEvaluatedKey;

    if (status) {
      conversations = await getConversationsByStatus(status, limit);
      lastEvaluatedKey = undefined; // Status filter doesn't support pagination yet
    } else {
      const result = await getAllConversations(limit, lastKey);
      conversations = result.conversations;
      lastEvaluatedKey = result.lastEvaluatedKey;
    }

    const response: ConversationsListResponse = {
      conversations,
      count: conversations.length,
      lastEvaluatedKey,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({
      error: 'Failed to fetch conversations',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/conversations/:phoneNumber/:conversationId
 * Get a specific conversation
 */
router.get('/:phoneNumber/:conversationId', async (req, res) => {
  try {
    const { phoneNumber, conversationId } = req.params;

    const conversation = await getConversation(phoneNumber, conversationId);

    const response: ConversationDetailResponse = {
      conversation,
    };

    if (!conversation) {
      return res.status(404).json({
        error: 'Conversation not found',
      });
    }

    res.json(response);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({
      error: 'Failed to fetch conversation',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/conversations/reply
 * Send SMS reply to a client
 */
router.post('/reply', async (req, res) => {
  try {
    const { phoneNumber, conversationId, message } = req.body as SendReplyRequest;

    // Validation
    if (!phoneNumber || !conversationId || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: phoneNumber, conversationId, message',
      } as SendReplyResponse);
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid phone number format. Must be in E.164 format (e.g., +12345678901)',
      } as SendReplyResponse);
    }

    if (message.length === 0 || message.length > 1600) {
      return res.status(400).json({
        success: false,
        error: 'Message must be between 1 and 1600 characters',
      } as SendReplyResponse);
    }

    // Send SMS via SNS
    try {
      await sendSMSReply(phoneNumber, message);
    } catch (smsError) {
      console.error('Failed to send SMS via SNS:', smsError);
      return res.status(500).json({
        success: false,
        error: `Failed to send SMS: ${smsError instanceof Error ? smsError.message : 'Unknown error'}`,
      } as SendReplyResponse);
    }

    // Add admin reply to conversation record
    try {
      await addAdminReply(phoneNumber, conversationId, message);
    } catch (dbError) {
      console.error('Failed to update DynamoDB:', dbError);
      // SMS was sent but DB update failed - log but don't fail the request
      console.warn('SMS sent successfully but failed to update conversation record');
    }

    res.json({
      success: true,
      message: 'Reply sent successfully',
    } as SendReplyResponse);
  } catch (error) {
    console.error('Error sending reply:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send reply',
      message: error instanceof Error ? error.message : 'Unknown error',
    } as SendReplyResponse);
  }
});

export const conversationRoutes = router;

