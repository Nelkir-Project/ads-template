import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { ConversationRecord, FollowUpSchedule } from '../types/conversation';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const CONVERSATIONS_TABLE = process.env.CONVERSATIONS_TABLE || 'SMSConversations';
const FOLLOWUPS_TABLE = process.env.FOLLOWUPS_TABLE || 'SMSFollowUps';

/**
 * Create a new conversation record
 */
export async function createConversation(
  record: ConversationRecord
): Promise<void> {
  await docClient.send(
    new PutCommand({
      TableName: CONVERSATIONS_TABLE,
      Item: record,
    })
  );
}

/**
 * Get conversation by phone number and conversation ID
 */
export async function getConversation(
  phoneNumber: string,
  conversationId: string
): Promise<ConversationRecord | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: CONVERSATIONS_TABLE,
      Key: {
        phoneNumber,
        conversationId,
      },
    })
  );
  
  return (result.Item as ConversationRecord) || null;
}

/**
 * Get the most recent conversation for a phone number
 */
export async function getLatestConversation(
  phoneNumber: string
): Promise<ConversationRecord | null> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: CONVERSATIONS_TABLE,
      KeyConditionExpression: 'phoneNumber = :phoneNumber',
      ExpressionAttributeValues: {
        ':phoneNumber': phoneNumber,
      },
      ScanIndexForward: false, // Sort descending
      Limit: 1,
    })
  );
  
  return (result.Items?.[0] as ConversationRecord) || null;
}

/**
 * Update conversation with response
 */
export async function markConversationResponded(
  phoneNumber: string,
  conversationId: string,
  responseText: string
): Promise<void> {
  const now = new Date().toISOString();
  
  await docClient.send(
    new UpdateCommand({
      TableName: CONVERSATIONS_TABLE,
      Key: {
        phoneNumber,
        conversationId,
      },
      UpdateExpression:
        'SET clientResponded = :responded, clientResponseAt = :responseAt, clientResponseText = :responseText, #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':responded': true,
        ':responseAt': now,
        ':responseText': responseText,
        ':status': 'CLIENT_RESPONDED',
        ':updatedAt': now,
      },
    })
  );
}

/**
 * Update conversation follow-up status
 */
export async function markFollowUpSent(
  phoneNumber: string,
  conversationId: string
): Promise<void> {
  const now = new Date().toISOString();
  
  await docClient.send(
    new UpdateCommand({
      TableName: CONVERSATIONS_TABLE,
      Key: {
        phoneNumber,
        conversationId,
      },
      UpdateExpression:
        'SET followUpMessageSent = :sent, followUpMessageSentAt = :sentAt, #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':sent': true,
        ':sentAt': now,
        ':status': 'FOLLOW_UP_SENT',
        ':updatedAt': now,
      },
    })
  );
}

/**
 * Create follow-up schedule
 */
export async function createFollowUpSchedule(
  schedule: FollowUpSchedule
): Promise<void> {
  await docClient.send(
    new PutCommand({
      TableName: FOLLOWUPS_TABLE,
      Item: schedule,
    })
  );
}

/**
 * Mark follow-up as executed
 */
export async function markFollowUpExecuted(
  executionTime: string,
  conversationId: string
): Promise<void> {
  const now = new Date().toISOString();
  
  await docClient.send(
    new UpdateCommand({
      TableName: FOLLOWUPS_TABLE,
      Key: {
        executionTime,
        conversationId,
      },
      UpdateExpression: 'SET executed = :executed, executedAt = :executedAt',
      ExpressionAttributeValues: {
        ':executed': true,
        ':executedAt': now,
      },
    })
  );
}


