import { Router } from 'express';
import { GoogleCalendarService } from '../services/googleCalendar.js';

const router = Router();

// Store tokens in memory (in production, use a proper database)
const tokenStore: { [key: string]: any } = {};

// Start Google OAuth flow
router.get('/auth', (_req, res) => {
  try {
    const calendarService = new GoogleCalendarService();
    const authUrl = calendarService.getAuthUrl();
    res.json({ authUrl });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({ error: 'Failed to generate authorization URL' });
  }
});

// Handle OAuth callback
router.get('/auth/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code not provided' });
  }

  try {
    const calendarService = new GoogleCalendarService();
    const tokens = await calendarService.getTokens(code as string);
    
    // Store tokens (in production, associate with user and store securely)
    tokenStore['default'] = tokens;
    
    // Set up calendar watch (skip in development if using HTTP)
    calendarService.setCredentials(tokens);
    
    // Only setup webhook if we have HTTPS URL or explicitly enabled
    const webhookUrl = process.env.WEBHOOK_BASE_URL || 'http://localhost:3001';
    const isHttps = webhookUrl.startsWith('https://');
    const forceWebhook = process.env.FORCE_WEBHOOK === 'true';
    
    if (isHttps || forceWebhook) {
      try {
        await calendarService.watchCalendar(process.env.GOOGLE_CALENDAR_ID || 'primary');
        console.log('✅ Calendar webhook setup successful');
      } catch (error) {
        console.log('⚠️ Calendar webhook setup failed (this is normal for localhost):', (error as Error).message);
      }
    } else {
      console.log('⚠️ Skipping webhook setup - HTTPS required. Use ngrok or set FORCE_WEBHOOK=true to override');
    }
    
    res.json({ 
      message: 'Authorization successful! Calendar watching is now active.',
      tokens: {
        access_token: tokens.access_token ? '***' : null,
        refresh_token: tokens.refresh_token ? '***' : null
      }
    });
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    res.status(500).json({ error: 'Authorization failed' });
  }
});

// Get upcoming events
router.get('/events', async (_req, res) => {
  try {
    const tokens = tokenStore['default'];
    if (!tokens) {
      return res.status(401).json({ error: 'Not authorized. Please complete OAuth flow first.' });
    }

    const calendarService = new GoogleCalendarService();
    calendarService.setCredentials(tokens);
    const events = await calendarService.listEvents(
      process.env.GOOGLE_CALENDAR_ID || 'primary',
      10
    );

    res.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Setup calendar watch
router.post('/watch', async (_req, res) => {
  try {
    const tokens = tokenStore['default'];
    if (!tokens) {
      return res.status(401).json({ error: 'Not authorized. Please complete OAuth flow first.' });
    }

    const calendarService = new GoogleCalendarService();
    calendarService.setCredentials(tokens);
    
    // Check if we have HTTPS URL
    const webhookUrl = process.env.WEBHOOK_BASE_URL || 'http://localhost:3001';
    const isHttps = webhookUrl.startsWith('https://');
    
    if (!isHttps) {
      return res.status(400).json({ 
        error: 'HTTPS required for webhooks',
        message: 'Google Calendar webhooks require HTTPS. Use ngrok or deploy to a server with HTTPS.',
        suggestion: 'Run "ngrok http 3001" and update WEBHOOK_BASE_URL in .env'
      });
    }
    
    const watchResponse = await calendarService.watchCalendar(
      process.env.GOOGLE_CALENDAR_ID || 'primary'
    );

    res.json({ 
      message: 'Calendar watch setup successfully',
      watchData: watchResponse
    });
  } catch (error) {
    console.error('Error setting up calendar watch:', error);
    res.status(500).json({ error: 'Failed to setup calendar watch' });
  }
});

// Development: Manual trigger for testing SMS without webhooks
router.post('/test-sms-trigger', async (_req, res) => {
  try {
    const tokens = tokenStore['default'];
    if (!tokens) {
      return res.status(401).json({ error: 'Not authorized. Please complete OAuth flow first.' });
    }

    const calendarService = new GoogleCalendarService();
    calendarService.setCredentials(tokens);
    
    // Get recent events
    const events = await calendarService.listEvents(
      process.env.GOOGLE_CALENDAR_ID || 'primary',
      5
    );

    if (events.length === 0) {
      return res.json({ 
        message: 'No events found to test with',
        suggestion: 'Create a calendar event with a phone number in the description'
      });
    }

    // Import SMS service here to avoid circular dependency
    const { SMSService } = await import('../services/smsService');
    const smsService = new SMSService();

    const results = [];
    for (const event of events) {
      const result = await smsService.processCalendarBooking(event);
      results.push({
        eventId: event.id,
        eventTitle: event.summary,
        ...result
      });
    }

    res.json({
      message: 'SMS test completed',
      eventsProcessed: results.length,
      results
    });

  } catch (error) {
    console.error('Error in SMS test trigger:', error);
    res.status(500).json({ error: 'SMS test failed' });
  }
});

export { router as googleCalendarRoutes };
