import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

// Create SNS client lazily to ensure env vars are loaded
let snsClient: SNSClient | null = null;

function getSNSClient(): SNSClient {
  if (!snsClient) {
    snsClient = new SNSClient({
      region: process.env.AWS_REGION || 'us-east-1',
    });
    console.log('📡 SNS Client initialized with region:', process.env.AWS_REGION || 'us-east-1');
  }
  return snsClient;
}

/**
 * Send SMS reply via AWS SNS
 */
export async function sendSMSReply(
  phoneNumber: string,
  message: string
): Promise<void> {
  // Read env vars at runtime, not at module load time
  const ORIGINATION_NUMBER = process.env.ORIGINATION_NUMBER;
  const AWS_REGION = process.env.AWS_REGION;

  // Debug logging
  console.log('🔍 Environment check:', {
    hasOriginationNumber: !!ORIGINATION_NUMBER,
    originationNumber: ORIGINATION_NUMBER,
    hasAwsRegion: !!AWS_REGION,
    awsRegion: AWS_REGION,
  });

  // Check environment configuration
  if (!ORIGINATION_NUMBER) {
    console.error('❌ ORIGINATION_NUMBER environment variable not set');
    console.error('All env vars:', Object.keys(process.env).filter(k => k.includes('ORIGIN') || k.includes('AWS')));
    throw new Error('SMS origination number not configured. Please set ORIGINATION_NUMBER in .env');
  }

  if (!AWS_REGION) {
    console.error('❌ AWS_REGION environment variable not set');
    throw new Error('AWS region not configured. Please set AWS_REGION in .env');
  }

  try {
    console.log(`📤 Sending SMS reply to ${maskPhoneNumber(phoneNumber)} from ${ORIGINATION_NUMBER}`);
    
    // For SNS SMS, we need to set attributes differently
    // The origination number should be set at the SNS topic/account level
    // or passed via specific parameters
    const command = new PublishCommand({
      Message: message,
      PhoneNumber: phoneNumber,
      // For toll-free or 10DLC numbers, you may need to configure
      // the origination number at the AWS account level
      // Custom attributes for tracking (not AWS reserved)
      MessageAttributes: {
        'OriginationNumber': {
          DataType: 'String',
          StringValue: ORIGINATION_NUMBER,
        },
      },
    });

    const client = getSNSClient();
    const response = await client.send(command);
    console.log(`✅ SMS reply sent successfully! MessageId: ${response.MessageId}`);
  } catch (error) {
    console.error('❌ Error sending SMS reply:', error);
    if (error instanceof Error) {
      // Provide more helpful error messages
      if (error.message.includes('InvalidParameterValue')) {
        throw new Error('Invalid phone number or origination number format');
      } else if (error.message.includes('AuthorizationError') || error.message.includes('AccessDenied')) {
        throw new Error('AWS credentials missing or invalid. Check AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY');
      } else if (error.message.includes('CredentialsError')) {
        throw new Error('AWS credentials not configured. Please set AWS credentials in .env');
      }
    }
    throw error;
  }
}

/**
 * Validate phone number format (E.164)
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  // E.164 format: +[country code][number]
  const e164Pattern = /^\+[1-9]\d{1,14}$/;
  return e164Pattern.test(phoneNumber);
}

/**
 * Format phone number for display (mask middle digits)
 */
export function maskPhoneNumber(phoneNumber: string): string {
  if (phoneNumber.length < 4) return phoneNumber;
  const lastFour = phoneNumber.slice(-4);
  const masked = phoneNumber.slice(0, -4).replace(/\d/g, '*');
  return masked + lastFour;
}

