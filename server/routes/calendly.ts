import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const router = Router();

// API Key middleware
const requireApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  const validApiKey = process.env.CALENDLY_API_KEY;

  if (!validApiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  if (apiKey !== validApiKey) {
    return res.status(401).json({ error: 'Invalid or missing API key' });
  }

  next();
};

// Calendly OAuth Configuration - Read from env when needed
const getCalendlyConfig = () => ({
  clientId: process.env.CALENDLY_CLIENT_ID,
  clientSecret: process.env.CALENDLY_CLIENT_SECRET,
  redirectUri: process.env.CALENDLY_REDIRECT_URI || 'https://localspot.ai/api/auth/calendly/callback',
});

// Store tokens temporarily (in production, use a database)
let calendlyTokens: {
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
} = {};

/**
 * Start Calendly OAuth flow
 * GET /api/auth/calendly
 * Requires: x-api-key header or ?api_key query parameter
 */
router.get('/', requireApiKey, (_req, res) => {
  const config = getCalendlyConfig();
  
  console.log('=== Calendly OAuth Debug ===');
  console.log('CALENDLY_CLIENT_ID:', config.clientId ? 'SET ✓' : 'MISSING ✗');
  console.log('CALENDLY_CLIENT_SECRET:', config.clientSecret ? 'SET ✓' : 'MISSING ✗');
  console.log('REDIRECT_URI:', config.redirectUri);
  console.log('============================');
  
  if (!config.clientId) {
    console.error('ERROR: CALENDLY_CLIENT_ID is not set!');
    return res.status(500).json({ error: 'Calendly OAuth not configured' });
  }

  const authUrl = new URL('https://auth.calendly.com/oauth/authorize');
  authUrl.searchParams.append('client_id', config.clientId);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', config.redirectUri);

  // Redirect user to Calendly authorization page
  res.redirect(authUrl.toString());
});

/**
 * Handle Calendly OAuth callback
 * GET /api/auth/calendly/callback
 */
router.get('/callback', async (req, res) => {
  const { code, error } = req.query;

  if (error) {
    console.error('Calendly OAuth error:', error);
    return res.status(400).send(`
      <html>
        <body>
          <h1>Authorization Failed</h1>
          <p>Error: ${error}</p>
          <a href="/">Go back home</a>
        </body>
      </html>
    `);
  }

  if (!code) {
    return res.status(400).send('No authorization code received');
  }

  try {
    const config = getCalendlyConfig();
    
    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://auth.calendly.com/oauth/token',
      {
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.redirectUri,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Store tokens (in production, save to database)
    calendlyTokens = {
      access_token,
      refresh_token,
      expires_at: Date.now() + expires_in * 1000,
    };

    console.log('✅ Calendly OAuth successful');

    // Get organization for webhook creation
    const userResponse = await axios.get('https://api.calendly.com/users/me', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    const organization = userResponse.data.resource.current_organization;

    // Create webhook subscription - pointing to AWS Lambda (30-min follow-up system)
    const webhookUrl = process.env.CALENDLY_WEBHOOK_URL || 'https://txy797kg90.execute-api.us-east-1.amazonaws.com/prod/calendly';
    const signingKey = process.env.CALENDLY_WEBHOOK_SECRET || 'your-signing-secret';

    try {
      const webhookResponse = await axios.post(
        'https://api.calendly.com/webhook_subscriptions',
        {
          url: webhookUrl,
          events: ['invitee.created', 'invitee.canceled'],
          organization: organization,
          scope: 'organization',
          signing_key: signingKey,
        },
        {
          headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('✅ Webhook subscription created:', webhookResponse.data.resource.uri);
    } catch (webhookError: any) {
      console.error('⚠️ Webhook creation failed:', webhookError.response?.data || webhookError.message);
      // Continue even if webhook creation fails (might already exist)
    }

    // Success page
    res.send(`
      <html>
        <head>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              max-width: 600px;
              margin: 50px auto;
              padding: 20px;
              text-align: center;
            }
            .success {
              color: #10b981;
              font-size: 48px;
              margin-bottom: 20px;
            }
            .info {
              background: #f3f4f6;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
              text-align: left;
            }
            .info-item {
              padding: 8px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .info-item:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: 600;
              color: #374151;
            }
            .value {
              color: #6b7280;
              font-family: monospace;
              font-size: 0.9em;
            }
            button {
              background: #3b82f6;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 6px;
              cursor: pointer;
              font-size: 16px;
              margin-top: 20px;
            }
            button:hover {
              background: #2563eb;
            }
          </style>
        </head>
        <body>
          <div class="success">✅</div>
          <h1>Calendly Connected!</h1>
          <p>Your Calendly account has been successfully authorized and webhook has been configured.</p>
          
          <div class="info">
            <div class="info-item">
              <div class="label">Webhook URL:</div>
              <div class="value">${webhookUrl}</div>
            </div>
            <div class="info-item">
              <div class="label">Events Subscribed:</div>
              <div class="value">invitee.created, invitee.canceled</div>
            </div>
            <div class="info-item">
              <div class="label">Token Expires:</div>
              <div class="value">${Math.floor(expires_in / 3600)} hours</div>
            </div>
          </div>
          
          <p><strong>Next Steps:</strong></p>
          <ul style="text-align: left; display: inline-block;">
            <li>Test by booking an appointment on Calendly</li>
            <li>SMS will be sent automatically to the client</li>
            <li>Follow-up sent after 30 min if no reply</li>
          </ul>
          
          <button onclick="window.close()">Close Window</button>
          <br/><br/>
          <a href="/">Go to Dashboard</a>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error exchanging Calendly code:', error);
    res.status(500).send(`
      <html>
        <body>
          <h1>Token Exchange Failed</h1>
          <p>Failed to exchange authorization code for access token.</p>
          <pre>${error instanceof Error ? error.message : 'Unknown error'}</pre>
          <a href="/api/auth/calendly">Try again</a>
        </body>
      </html>
    `);
  }
});

/**
 * Get current token status
 * GET /api/auth/calendly/status
 */
router.get('/status', (_req, res) => {
  const hasToken = !!calendlyTokens.access_token;
  const isExpired = calendlyTokens.expires_at ? Date.now() > calendlyTokens.expires_at : true;

  res.json({
    connected: hasToken && !isExpired,
    hasToken,
    isExpired,
    expiresAt: calendlyTokens.expires_at,
  });
});

/**
 * Get current access token (for internal use)
 * GET /api/auth/calendly/token
 */
router.get('/token', (_req, res) => {
  if (!calendlyTokens.access_token) {
    return res.status(401).json({ error: 'Not authorized with Calendly' });
  }

  if (calendlyTokens.expires_at && Date.now() > calendlyTokens.expires_at) {
    return res.status(401).json({ error: 'Token expired' });
  }

  res.json({
    access_token: calendlyTokens.access_token,
    expires_at: calendlyTokens.expires_at,
  });
});

/**
 * Revoke Calendly authorization
 * POST /api/auth/calendly/revoke
 * Requires: x-api-key header
 */
router.post('/revoke', requireApiKey, async (_req, res) => {
  try {
    if (calendlyTokens.access_token) {
      await axios.post(
        'https://auth.calendly.com/oauth/revoke',
        {
          token: calendlyTokens.access_token,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Clear stored tokens
    calendlyTokens = {};

    res.json({ message: 'Calendly authorization revoked' });
  } catch (error) {
    console.error('Error revoking Calendly token:', error);
    res.status(500).json({ error: 'Failed to revoke authorization' });
  }
});

export { router as calendlyRoutes };

