import type { SNSEvent, SNSHandler } from 'aws-lambda';
import { getLatestConversation, markConversationResponded } from '../utils/dynamodb';
import { ConversationStatus } from '../types/conversation';

/**
 * Parse incoming SMS from SNS message
 */
interface IncomingSMS {
  originationNumber: string;
  destinationNumber: string;
  messageBody: string;
  messageKeyword: string;
  inboundMessageId: string;
  previousPublishedMessageId?: string;
}

/**
 * Lambda handler for incoming SMS from SNS
 */
export const handler: SNSHandler = async (event: SNSEvent) => {
  console.log('Received incoming SMS event:', JSON.stringify(event, null, 2));

  try {
    for (const record of event.Records) {
      const message = JSON.parse(record.Sns.Message) as IncomingSMS;
      
      const fromNumber = message.originationNumber;
      const messageBody = message.messageBody;

      console.log('Processing SMS from:', fromNumber);
      console.log('Message:', messageBody);

      // Get the latest conversation for this phone number
      const conversation = await getLatestConversation(fromNumber);

      if (!conversation) {
        console.log('No conversation found for phone number:', fromNumber);
        continue;
      }

      // Check if conversation is still awaiting response
      if (
        conversation.status === ConversationStatus.AWAITING_RESPONSE ||
        conversation.status === ConversationStatus.INITIAL_SENT ||
        conversation.status === ConversationStatus.FOLLOW_UP_SCHEDULED ||
        conversation.status === ConversationStatus.FOLLOW_UP_SENT
      ) {
        // Mark as responded
        await markConversationResponded(
          fromNumber,
          conversation.conversationId,
          messageBody
        );

        console.log('Conversation marked as responded:', conversation.conversationId);
        
        // Optional: Send to business notification system
        // You can add SNS publish to a topic for business notifications here
        const businessTopicArn = process.env.BUSINESS_NOTIFICATION_TOPIC_ARN;
        if (businessTopicArn) {
          // Send notification to business (implement if needed)
          console.log('Business notification would be sent to:', businessTopicArn);
        }
      } else {
        console.log('Conversation already responded or completed:', conversation.status);
      }
    }

    return;
  } catch (error) {
    console.error('Error processing incoming SMS:', error);
    throw error;
  }
};

