# Calendly OAuth Setup Guide

## Overview

This guide shows you how to connect your Calendly account using OAuth 2.0 authentication.

## Prerequisites

1. A Calendly account
2. Node.js server running (`npm run dev`)

## Step 1: Create Calendly OAuth App

1. **Go to Calendly Integrations**
   - Visit: https://calendly.com/integrations/api_webhooks
   - Click on **"My Integrations"** or **"API & Webhooks"**

2. **Create New OAuth Application**
   - Click **"Create New OAuth Application"**
   - Fill in the details:
     - **Application Name**: "LocalSpot SMS Automation" (or your choice)
     - **Redirect URI**: `http://localhost:3001/api/auth/calendly/callback`
       - For production: `https://yourdomain.com/api/auth/calendly/callback`

3. **Save Credentials**
   - After creating, you'll receive:
     - **Client ID**: Copy this
     - **Client Secret**: Copy this
   - Keep these secure!

## Step 2: Configure Environment Variables

Add to your `.env` file:

```env
# Calendly OAuth
CALENDLY_CLIENT_ID=your_actual_client_id_here
CALENDLY_CLIENT_SECRET=your_actual_client_secret_here
CALENDLY_REDIRECT_URI=http://localhost:3001/api/auth/calendly/callback

# For production
# CALENDLY_REDIRECT_URI=https://yourdomain.com/api/auth/calendly/callback
```

## Step 3: Start Your Server

```bash
npm run dev
```

Server should start on `http://localhost:3001`

## Step 4: Authorize Calendly

### Option A: Browser

1. Open your browser and go to:
   ```
   http://localhost:3001/api/auth/calendly
   ```

2. You'll be redirected to Calendly's authorization page

3. Click **"Authorize"** to grant access

4. You'll be redirected back with a success message

### Option B: Frontend Button (Add to your React app)

```tsx
// Example React component
const CalendlyConnect = () => {
  const connectCalendly = () => {
    window.open(
      'http://localhost:3001/api/auth/calendly',
      'Calendly Authorization',
      'width=600,height=800'
    );
  };

  return (
    <button onClick={connectCalendly}>
      Connect Calendly
    </button>
  );
};
```

## Available Endpoints

### 1. Start OAuth Flow
```
GET /api/auth/calendly
```
Redirects user to Calendly authorization page.

### 2. OAuth Callback (automatic)
```
GET /api/auth/calendly/callback
```
Handles the redirect from Calendly after authorization.

### 3. Check Connection Status
```
GET /api/auth/calendly/status
```

Response:
```json
{
  "connected": true,
  "hasToken": true,
  "isExpired": false,
  "expiresAt": 1234567890000
}
```

### 4. Get Access Token
```
GET /api/auth/calendly/token
```

Response:
```json
{
  "access_token": "eyJhbGc...",
  "expires_at": 1234567890000
}
```

### 5. Revoke Authorization
```
POST /api/auth/calendly/revoke
```

Disconnects Calendly and revokes the token.

## Testing the Integration

### 1. Check Status
```bash
curl http://localhost:3001/api/auth/calendly/status
```

### 2. Test with Calendly API
```bash
# Get current user info
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  https://api.calendly.com/users/me
```

## Using the Access Token

After authorization, the token is stored in memory. To use it:

```typescript
// In your code
const response = await fetch('http://localhost:3001/api/auth/calendly/token');
const { access_token } = await response.json();

// Use token to call Calendly API
const calendlyResponse = await fetch('https://api.calendly.com/users/me', {
  headers: {
    'Authorization': `Bearer ${access_token}`,
  },
});
```

## Production Considerations

### 1. Store Tokens in Database

Currently tokens are stored in memory. For production:

```typescript
// Example: Store in database
await db.calendlyTokens.upsert({
  userId: req.user.id,
  access_token,
  refresh_token,
  expires_at,
});
```

### 2. Implement Token Refresh

```typescript
async function refreshAccessToken(refresh_token: string) {
  const response = await axios.post('https://auth.calendly.com/oauth/token', {
    grant_type: 'refresh_token',
    refresh_token,
    client_id: CALENDLY_CLIENT_ID,
    client_secret: CALENDLY_CLIENT_SECRET,
  });
  
  return response.data;
}
```

### 3. Update Redirect URI

In Calendly OAuth app settings:
- Development: `http://localhost:3001/api/auth/calendly/callback`
- Production: `https://yourdomain.com/api/auth/calendly/callback`

Update `.env`:
```env
CALENDLY_REDIRECT_URI=https://yourdomain.com/api/auth/calendly/callback
```

### 4. Secure Token Storage

- Use encryption for tokens in database
- Set proper CORS policies
- Use HTTPS in production
- Implement rate limiting

## Troubleshooting

### "Calendly OAuth not configured"
- Check that `CALENDLY_CLIENT_ID` is set in `.env`
- Restart your server after adding env variables

### "Redirect URI mismatch"
- Ensure the redirect URI in your `.env` matches exactly what's configured in Calendly OAuth app
- Include the full path: `/api/auth/calendly/callback`

### "Token expired"
- Tokens expire after a certain period
- Re-authorize by visiting `/api/auth/calendly` again
- Implement refresh token logic for production

### "Invalid client credentials"
- Verify `CALENDLY_CLIENT_ID` and `CALENDLY_CLIENT_SECRET` are correct
- Check for extra spaces or quotes in `.env` file

## What You Can Do With the Token

Once authorized, you can:

1. **Get User Information**
   ```
   GET https://api.calendly.com/users/me
   ```

2. **List Event Types**
   ```
   GET https://api.calendly.com/event_types?user={user_uri}
   ```

3. **Get Scheduled Events**
   ```
   GET https://api.calendly.com/scheduled_events
   ```

4. **Create Webhook Subscriptions** (programmatically)
   ```
   POST https://api.calendly.com/webhook_subscriptions
   ```

See [Calendly API Documentation](https://developer.calendly.com/api-docs) for more.

## Frontend Integration Example

```tsx
import { useState, useEffect } from 'react';

function CalendlyIntegration() {
  const [status, setStatus] = useState({ connected: false });

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    const res = await fetch('/api/auth/calendly/status');
    const data = await res.json();
    setStatus(data);
  };

  const connect = () => {
    const width = 600;
    const height = 800;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    
    const popup = window.open(
      '/api/auth/calendly',
      'Calendly Authorization',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    // Check for success
    const interval = setInterval(() => {
      if (popup?.closed) {
        clearInterval(interval);
        checkStatus();
      }
    }, 1000);
  };

  const disconnect = async () => {
    await fetch('/api/auth/calendly/revoke', { method: 'POST' });
    checkStatus();
  };

  return (
    <div>
      <h2>Calendly Integration</h2>
      {status.connected ? (
        <div>
          <p>✅ Connected to Calendly</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <div>
          <p>❌ Not connected</p>
          <button onClick={connect}>Connect Calendly</button>
        </div>
      )}
    </div>
  );
}
```

## Summary

You now have:
- ✅ OAuth flow to connect Calendly
- ✅ Secure token storage (in memory for now)
- ✅ Status checking endpoint
- ✅ Token revocation

Next steps:
1. Implement token refresh logic
2. Store tokens in database
3. Add frontend UI for connection
4. Use tokens to interact with Calendly API

---

Need help? Check the server logs or the [Calendly API docs](https://developer.calendly.com/).

