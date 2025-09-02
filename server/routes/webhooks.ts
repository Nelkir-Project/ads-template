import { Router } from 'express';
import { GoogleCalendarService } from '../services/googleCalendar.js';
import { SMSService } from '../services/smsService.js';

const router = Router();
const calendarService = new GoogleCalendarService();
const smsService = new SMSService();

// Store tokens (in production, use proper database)
const tokenStore: { [key: string]: any } = {};

// Google Calendar webhook endpoint
router.post('/calendar', async (req, res) => {
  try {
    // Verify webhook (optional but recommended)
    const channelId = req.headers['x-goog-channel-id'];
    const channelToken = req.headers['x-goog-channel-token'];
    const resourceId = req.headers['x-goog-resource-id'];
    const resourceUri = req.headers['x-goog-resource-uri'];
    const resourceState = req.headers['x-goog-resource-state'];

    console.log('📅 Calendar webhook received:', {
      channelId,
      channelToken,
      resourceId,
      resourceUri,
      resourceState
    });

    // Only process sync and exists states (new/updated events)
    if (resourceState !== 'sync' && resourceState !== 'exists') {
      return res.status(200).send('OK');
    }

    // Get stored tokens
    const tokens = tokenStore['default'];
    if (!tokens) {
      console.error('❌ No tokens available for calendar access');
      return res.status(401).json({ error: 'No authorization tokens' });
    }

    calendarService.setCredentials(tokens);

    // Get recent events to find new bookings
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
    const events = await calendarService.listEvents(calendarId, 5);

    // Find events created in the last 5 minutes (likely new bookings)
    const recentEvents = events.filter((event: any) => {
      const createdTime = new Date(event.created || event.updated);
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      return createdTime > fiveMinutesAgo;
    });

    // Send SMS for each new booking
    for (const event of recentEvents) {
      const result = await smsService.processCalendarBooking(event);
      
      console.log(`📱 Booking processed for event ${event.id}:`, {
        clientSent: result.clientSent,
        businessSent: result.businessSent,
        clientPhone: result.clientPhone ? result.clientPhone.replace(/\d(?=\d{4})/g, '*') : 'none'
      });
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('❌ Error processing calendar webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Manual test endpoint for SMS
router.post('/test-sms', async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
      return res.status(400).json({ error: 'Phone number and message are required' });
    }

    const success = await smsService.sendSMS(phoneNumber, message);
    
    if (success) {
      res.json({ message: 'SMS sent successfully' });
    } else {
      res.status(500).json({ error: 'Failed to send SMS' });
    }
  } catch (error) {
    console.error('Error sending test SMS:', error);
    res.status(500).json({ error: 'SMS test failed' });
  }
});

// Webhook verification endpoint (for Google)
router.get('/calendar', (_req, res) => {
  res.status(200).send('Webhook endpoint is active');
});

export { router as webhookRoutes };
