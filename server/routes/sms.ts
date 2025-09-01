import { Router } from 'express';
import { SMSService } from '../services/smsService';

const router = Router();
const smsService = new SMSService();

// Send SMS to single recipient
router.post('/send', async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
      return res.status(400).json({ 
        error: 'Phone number and message are required',
        example: {
          phoneNumber: '+1234567890',
          message: 'Your appointment has been confirmed!'
        }
      });
    }

    const success = await smsService.sendSMS(phoneNumber, message);
    
    if (success) {
      res.json({ 
        message: 'SMS sent successfully',
        phoneNumber: phoneNumber.replace(/\d(?=\d{4})/g, '*') // Mask phone number
      });
    } else {
      res.status(500).json({ error: 'Failed to send SMS' });
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ error: 'SMS sending failed' });
  }
});

// Send SMS to multiple recipients
router.post('/send-bulk', async (req, res) => {
  try {
    const { phoneNumbers, message } = req.body;

    if (!phoneNumbers || !Array.isArray(phoneNumbers) || !message) {
      return res.status(400).json({ 
        error: 'Phone numbers (array) and message are required',
        example: {
          phoneNumbers: ['+1234567890', '+0987654321'],
          message: 'Your appointment has been confirmed!'
        }
      });
    }

    const result = await smsService.sendBulkSMS(phoneNumbers, message);
    
    res.json({ 
      message: 'Bulk SMS processing completed',
      results: result,
      totalRecipients: phoneNumbers.length
    });
  } catch (error) {
    console.error('Error sending bulk SMS:', error);
    res.status(500).json({ error: 'Bulk SMS sending failed' });
  }
});

// Send SMS to SNS topic
router.post('/send-topic', async (req, res) => {
  try {
    const { message, topicArn } = req.body;

    if (!message) {
      return res.status(400).json({ 
        error: 'Message is required',
        example: {
          message: 'Your appointment has been confirmed!',
          topicArn: 'arn:aws:sns:us-east-1:123456789012:MyTopic' // optional
        }
      });
    }

    const success = await smsService.sendSMSToTopic(message, topicArn);
    
    if (success) {
      res.json({ 
        message: 'SMS sent to topic successfully',
        topicArn: topicArn || process.env.AWS_SNS_TOPIC_ARN || 'default'
      });
    } else {
      res.status(500).json({ error: 'Failed to send SMS to topic' });
    }
  } catch (error) {
    console.error('Error sending SMS to topic:', error);
    res.status(500).json({ error: 'Topic SMS sending failed' });
  }
});

// Get SMS service status
router.get('/status', (_req, res) => {
  const hasAWSConfig = !!(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY);
  const hasRecipients = !!(process.env.SMS_RECIPIENTS);
  const hasTopicArn = !!(process.env.AWS_SNS_TOPIC_ARN);

  res.json({
    status: 'SMS Service Active',
    configuration: {
      awsConfigured: hasAWSConfig,
      recipientsConfigured: hasRecipients,
      topicArnConfigured: hasTopicArn,
      region: process.env.AWS_REGION || 'us-east-1'
    },
    endpoints: {
      sendSingle: '/api/sms/send',
      sendBulk: '/api/sms/send-bulk',
      sendTopic: '/api/sms/send-topic'
    }
  });
});

export { router as smsRoutes };


