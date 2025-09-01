import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export class GoogleCalendarService {
  private oauth2Client: OAuth2Client;
  private calendar: any;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
  }

  // Generate authorization URL
  getAuthUrl(): string {
    const scopes = [
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/calendar.events.readonly'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  // Exchange authorization code for tokens
  async getTokens(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
    return tokens;
  }

  // Set credentials
  setCredentials(tokens: any) {
    this.oauth2Client.setCredentials(tokens);
  }

  // Watch calendar for changes
  async watchCalendar(calendarId: string = 'primary') {
    const webhookUrl = `${process.env.WEBHOOK_BASE_URL || 'http://localhost:3001'}/api/webhooks/calendar`;
    
    const watchRequest = {
      calendarId,
      requestBody: {
        id: `calendar-watch-${Date.now()}`,
        type: 'web_hook',
        address: webhookUrl,
        params: {
          ttl: '3600' // 1 hour
        }
      }
    };

    try {
      const response = await this.calendar.events.watch(watchRequest);
      console.log('📅 Calendar watch established:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error setting up calendar watch:', error);
      throw error;
    }
  }

  // Get event details
  async getEvent(calendarId: string, eventId: string) {
    try {
      const response = await this.calendar.events.get({
        calendarId,
        eventId
      });
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching event:', error);
      throw error;
    }
  }

  // List upcoming events
  async listEvents(calendarId: string = 'primary', maxResults: number = 10) {
    try {
      const response = await this.calendar.events.list({
        calendarId,
        timeMin: new Date().toISOString(),
        maxResults,
        singleEvents: true,
        orderBy: 'startTime'
      });
      return response.data.items || [];
    } catch (error) {
      console.error('❌ Error listing events:', error);
      throw error;
    }
  }

  // Stop watching calendar
  async stopWatch(channelId: string, resourceId: string) {
    try {
      await this.calendar.channels.stop({
        requestBody: {
          id: channelId,
          resourceId
        }
      });
      console.log('📅 Calendar watch stopped');
    } catch (error) {
      console.error('❌ Error stopping calendar watch:', error);
      throw error;
    }
  }
}
