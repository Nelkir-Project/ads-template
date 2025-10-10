import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import type { ConversationRecord, AdminReply } from '../../src/types/conversation.js';

// Lazy initialization to ensure env vars are loaded
let docClient: DynamoDBDocumentClient | null = null;

function getDocClient(): DynamoDBDocumentClient {
  if (!docClient) {
    const region = process.env.AWS_REGION || 'us-east-1';
    const client = new DynamoDBClient({ region });
    docClient = DynamoDBDocumentClient.from(client);
    console.log(`📊 DynamoDB Client initialized: region=${region}`);
  }
  return docClient;
}

function getTableName(): string {
  return process.env.CONVERSATIONS_TABLE_NAME || 'SMSConversations';
}

/**
 * Get all conversations with optional pagination
 */
export async function getAllConversations(
  limit: number = 100,
  lastEvaluatedKey?: Record<string, any>
): Promise<{ conversations: ConversationRecord[]; lastEvaluatedKey?: Record<string, any> }> {
  try {
    const params = {
      TableName: getTableName(),
      Limit: limit,
      ExclusiveStartKey: lastEvaluatedKey,
    };

    const result = await getDocClient().send(new ScanCommand(params));

    const conversations = (result.Items || []) as ConversationRecord[];
    
    // Sort by updatedAt descending
    conversations.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return {
      conversations,
      lastEvaluatedKey: result.LastEvaluatedKey,
    };
  } catch (error) {
    console.error('Error fetching all conversations:', error);
    throw new Error('Failed to fetch conversations from DynamoDB');
  }
}

/**
 * Get conversations filtered by status
 */
export async function getConversationsByStatus(
  status: string,
  limit: number = 100
): Promise<ConversationRecord[]> {
  try {
    const params = {
      TableName: getTableName(),
      FilterExpression: '#status = :status',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':status': status,
      },
      Limit: limit,
    };

    const result = await getDocClient().send(new ScanCommand(params));
    const conversations = (result.Items || []) as ConversationRecord[];
    
    // Sort by updatedAt descending
    conversations.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return conversations;
  } catch (error) {
    console.error('Error fetching conversations by status:', error);
    throw new Error('Failed to fetch conversations by status');
  }
}

/**
 * Get a specific conversation
 */
export async function getConversation(
  phoneNumber: string,
  conversationId: string
): Promise<ConversationRecord | null> {
  try {
    const result = await getDocClient().send(
      new GetCommand({
        TableName: getTableName(),
        Key: {
          phoneNumber,
          conversationId,
        },
      })
    );

    return (result.Item as ConversationRecord) || null;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw new Error('Failed to fetch conversation');
  }
}

/**
 * Add admin reply to conversation
 */
export async function addAdminReply(
  phoneNumber: string,
  conversationId: string,
  message: string
): Promise<void> {
  try {
    const now = new Date().toISOString();
    
    // Get existing conversation to append to adminReplies array
    const conversation = await getConversation(phoneNumber, conversationId);
    
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const adminReplies = conversation.adminReplies || [];
    const newReply: AdminReply = {
      message,
      sentAt: now,
      sentBy: 'admin', // Could be extended to include admin user identifier
    };

    adminReplies.push(newReply);

    await getDocClient().send(
      new UpdateCommand({
        TableName: getTableName(),
        Key: {
          phoneNumber,
          conversationId,
        },
        UpdateExpression: 'SET adminReplies = :adminReplies, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':adminReplies': adminReplies,
          ':updatedAt': now,
        },
      })
    );

    console.log('Admin reply added to conversation:', conversationId);
  } catch (error) {
    console.error('Error adding admin reply:', error);
    throw new Error('Failed to add admin reply to conversation');
  }
}

