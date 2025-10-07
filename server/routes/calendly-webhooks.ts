import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const router = Router();

// API Key middleware
const requireApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.CALENDLY_API_KEY;

  if (!validApiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  if (apiKey !== validApiKey) {
    return res.status(401).json({ error: 'Invalid or missing API key' });
  }

  next();
};

/**
 * List all webhook subscriptions
 * GET /api/calendly-webhooks/list
 * Requires: x-api-key header
 */
router.get('/list', requireApiKey, async (_req, res) => {
  try {
    // Get token from query or from stored tokens
    const tokenResponse = await fetch('http://localhost:3001/api/auth/calendly/token');
    
    if (!tokenResponse.ok) {
      return res.status(401).json({ error: 'Not authorized with Calendly' });
    }

    const { access_token } = await tokenResponse.json();

    // Get current user
    const userResponse = await axios.get('https://api.calendly.com/users/me', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    const organization = userResponse.data.resource.current_organization;

    // List webhooks
    const webhooksResponse = await axios.get(
      `https://api.calendly.com/webhook_subscriptions?organization=${organization}&scope=organization`,
      {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      }
    );

    res.json({
      webhooks: webhooksResponse.data.collection,
      count: webhooksResponse.data.collection.length,
    });
  } catch (error: any) {
    console.error('Error listing webhooks:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to list webhooks',
      details: error.response?.data || error.message,
    });
  }
});

/**
 * Delete a webhook subscription
 * DELETE /api/calendly-webhooks/:webhookId
 * Requires: x-api-key header
 */
router.delete('/:webhookId', requireApiKey, async (req, res) => {
  try {
    const { webhookId } = req.params;

    // Get token
    const tokenResponse = await fetch('http://localhost:3001/api/auth/calendly/token');
    
    if (!tokenResponse.ok) {
      return res.status(401).json({ error: 'Not authorized with Calendly' });
    }

    const { access_token } = await tokenResponse.json();

    // Delete webhook
    await axios.delete(
      `https://api.calendly.com/webhook_subscriptions/${webhookId}`,
      {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      }
    );

    res.json({ message: 'Webhook deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting webhook:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to delete webhook',
      details: error.response?.data || error.message,
    });
  }
});

/**
 * Create a webhook subscription manually
 * POST /api/calendly-webhooks/create
 * Requires: x-api-key header
 */
router.post('/create', requireApiKey, async (req, res) => {
  try {
    const { url, events, signing_key } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'Webhook URL is required' });
    }

    // Get token
    const tokenResponse = await fetch('http://localhost:3001/api/auth/calendly/token');
    
    if (!tokenResponse.ok) {
      return res.status(401).json({ error: 'Not authorized with Calendly' });
    }

    const { access_token } = await tokenResponse.json();

    // Get user info
    const userResponse = await axios.get('https://api.calendly.com/users/me', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    const userUri = userResponse.data.resource.uri;
    const organization = userResponse.data.resource.current_organization;

    // Create webhook
    const webhookResponse = await axios.post(
      'https://api.calendly.com/webhook_subscriptions',
      {
        url,
        events: events || ['invitee.created', 'invitee.canceled'],
        organization,
        user: userUri,
        signing_key: signing_key || process.env.CALENDLY_WEBHOOK_SECRET,
      },
      {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      message: 'Webhook created successfully',
      webhook: webhookResponse.data.resource,
    });
  } catch (error: any) {
    console.error('Error creating webhook:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to create webhook',
      details: error.response?.data || error.message,
    });
  }
});

export { router as calendlyWebhooksRoutes };

