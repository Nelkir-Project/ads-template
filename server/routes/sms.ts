import { Router } from 'express';
import { SMSService } from '../services/smsService.js';

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
      message: 'Bulk SMS processing',
      results: result,
      totalRecipients: phoneNumbers.length
    });
  } catch (error) {
    console.error('Error sending bulk SMS:', error);
    res.status(500).json({ error: 'Bulk SMS sending failed' });
  }
});

// Topic-based SMS is not supported with Twilio
router.post('/send-topic', async (_req, res) => {
  return res.status(400).json({ error: 'Not supported with Twilio. Use /api/sms/send.' });
});

// Get SMS service status
router.get('/status', (_req, res) => {
  const hasTwilioConfig = !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM_NUMBER);
  const hasRecipients = !!(process.env.SMS_RECIPIENTS);

  res.json({
    status: 'SMS Service Active (Twilio)',
    configuration: {
      twilioConfigured: hasTwilioConfig,
      fromNumber: process.env.TWILIO_FROM_NUMBER || null,
      recipientsConfigured: hasRecipients,
    },
    endpoints: {
      sendSingle: '/api/sms/send',
      sendBulk: '/api/sms/send-bulk'
    }
  });
});

export { router as smsRoutes };


