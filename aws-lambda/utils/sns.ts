import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const snsClient = new SNSClient({});

const ORIGINATION_NUMBER = process.env.ORIGINATION_NUMBER;

/**
 * Send SMS via AWS SNS
 */
export async function sendSMS(
  phoneNumber: string,
  message: string
): Promise<boolean> {
  if (!ORIGINATION_NUMBER) {
    console.error('ORIGINATION_NUMBER environment variable not set');
    return false;
  }

  try {
    const command = new PublishCommand({
      Message: message,
      PhoneNumber: phoneNumber,
      MessageAttributes: {
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: 'Transactional',
        },
        'AWS.MM.SMS.OriginationNumber': {
          DataType: 'String',
          StringValue: ORIGINATION_NUMBER,
        },
      },
    });

    const response = await snsClient.send(command);
    console.log('SMS sent successfully:', response.MessageId);
    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
}

/**
 * Format initial confirmation message
 */
export function formatInitialMessage(
  clientName: string,
  eventTitle: string,
  startTime: string
): string {
  // Extract first name
  const firstName = clientName.split(' ')[0];

  return `Hey ${firstName}, this is Maria from LocalSpot

Will you send over a link to your website or GoogleMaps, so I can prep for our call?

Also here's some more info before the call!`;
}

/**
 * Format follow-up message
 */
export function formatFollowUpMessage(clientName: string): string {
  return `Hi, just wanted to double check that we are still good for the call? I'm trying to find your website or GoogleMaps to do some prep so I can best help you. Without them I'll have to cancel our call.`;
}

