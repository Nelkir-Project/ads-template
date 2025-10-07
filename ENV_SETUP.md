# Environment Variables Setup

## Required Environment Variables

Create a `.env` file in your project root with these variables:

```env
# Server Configuration
PORT=3001

# API Security
CALENDLY_API_KEY=your-secure-random-api-key-here

# Calendly OAuth Configuration
CALENDLY_CLIENT_ID=your_calendly_client_id
CALENDLY_CLIENT_SECRET=your_calendly_client_secret
CALENDLY_REDIRECT_URI=http://localhost:3001/api/auth/calendly/callback

# Calendly Webhook Configuration
CALENDLY_WEBHOOK_URL=http://localhost:3001/api/webhooks/calendly
CALENDLY_WEBHOOK_SECRET=your-signing-secret-key

# Business Configuration
BUSINESS_NAME=LocalSpot
BUSINESS_PHONE=+12345678900

# Admin Password
ADMIN_PASSWORD=your-secure-admin-password

# Optional: SMS Configuration (if using Twilio for local testing)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=
```

## Generating Secure Keys

### Generate API Key
```bash
# On Linux/Mac
openssl rand -hex 32

# On Windows (PowerShell)
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Example output: `a3f8d9e2c1b4567890abcdef1234567890abcdef1234567890abcdef12345678`

### Generate Webhook Secret
```bash
# Use the same method as API key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Production Environment Variables

For production deployment (Vercel, AWS, etc.), set these in your hosting platform:

### Vercel
```bash
vercel env add CALENDLY_API_KEY
vercel env add CALENDLY_CLIENT_ID
vercel env add CALENDLY_CLIENT_SECRET
vercel env add CALENDLY_REDIRECT_URI
vercel env add CALENDLY_WEBHOOK_URL
vercel env add CALENDLY_WEBHOOK_SECRET
vercel env add BUSINESS_NAME
```

### AWS (Lambda/Elastic Beanstalk)
Add to your deployment configuration or AWS Systems Manager Parameter Store.

### Docker
Create a `.env.production` file and mount it or use environment variables in docker-compose.yml:

```yaml
environment:
  - CALENDLY_API_KEY=${CALENDLY_API_KEY}
  - CALENDLY_CLIENT_ID=${CALENDLY_CLIENT_ID}
  # ... etc
```

## Security Best Practices

1. **Never commit `.env` to git**
   - Already added to `.gitignore`

2. **Use different keys for different environments**
   - Development: One set of keys
   - Production: Different set of keys

3. **Rotate keys regularly**
   - Change API keys every 90 days
   - Update in both `.env` and Calendly settings

4. **Restrict access**
   - Only share API keys with authorized personnel
   - Use environment-specific keys

5. **Use secrets management**
   - For production, consider AWS Secrets Manager, HashiCorp Vault, etc.

## Testing Your Configuration

### Check if variables are loaded
```bash
curl http://localhost:3001/health
```

### Test API key protection
```bash
# Without API key (should fail)
curl http://localhost:3001/api/auth/calendly

# With API key (should work)
curl -H "x-api-key: your-api-key" http://localhost:3001/api/auth/calendly
```

### Test webhook endpoint
```bash
curl http://localhost:3001/api/webhooks/calendly \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"event":"invitee.created"}'
```

## Troubleshooting

### "API key not configured on server"
- Check that `CALENDLY_API_KEY` is set in `.env`
- Restart your server after adding the variable

### "Invalid or missing API key"
- Verify the API key matches exactly (no extra spaces)
- Check you're using the header: `x-api-key: your-key`
- For browser URLs, use: `?api_key=your-key`

### Variables not loading
- Ensure `.env` is in the project root
- Check file name is exactly `.env` (not `.env.txt`)
- Restart your development server
- Check for syntax errors in `.env`

## Example `.env` File

```env
# Copy this template and fill in your actual values

PORT=3001

# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
CALENDLY_API_KEY=a3f8d9e2c1b4567890abcdef1234567890abcdef1234567890abcdef12345678

# Get from https://calendly.com/integrations/api_webhooks
CALENDLY_CLIENT_ID=abc123xyz456
CALENDLY_CLIENT_SECRET=def789uvw012

# Update for production
CALENDLY_REDIRECT_URI=http://localhost:3001/api/auth/calendly/callback

# Your webhook endpoint
CALENDLY_WEBHOOK_URL=http://localhost:3001/api/webhooks/calendly

# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
CALENDLY_WEBHOOK_SECRET=b4c9f8e1d2a567890123456789abcdef0123456789abcdef0123456789abcdef

# Your business details
BUSINESS_NAME=LocalSpot
BUSINESS_PHONE=+12345678900

# Secure admin password
ADMIN_PASSWORD=your-secure-password-123
```

---

**Remember:** Keep your `.env` file secure and never share it publicly!

