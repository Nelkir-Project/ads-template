# 📅 Google Calendar SMS Integration Setup

This guide will help you set up SMS notifications via AWS SNS when someone books an appointment in your Google Calendar.

## 🚀 Quick Start

1. **Clone and Install Dependencies**
   ```bash
   npm install
   ```

2. **Create Environment File**
   ```bash
   cp .env.example .env
   ```

3. **Configure Your Environment** (see detailed steps below)

4. **Start Both Frontend and Backend**
   ```bash
   npm run dev:full
   ```

5. **Visit the Integration Page**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 🔧 Detailed Configuration

### 1. Google Calendar API Setup

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Calendar API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"

#### Step 2: Configure OAuth
1. Set application type to "Web application"
2. Add authorized redirect URIs:
   - `http://localhost:3001/auth/google/callback`
   - `https://yourdomain.com/auth/google/callback` (for production)
3. Download the credentials JSON file

#### Step 3: Update .env file
```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3001/auth/google/callback
GOOGLE_CALENDAR_ID=primary  # or your specific calendar ID
```

### 2. AWS SNS Setup

#### Step 1: Create AWS Account and IAM User
1. Create an AWS account if you don't have one
2. Create an IAM user with SNS permissions
3. Generate access keys for the user

#### Step 2: Configure SNS
1. Go to AWS SNS Console
2. Create a topic (optional - for topic-based messaging)
3. Note down the topic ARN if created

#### Step 3: Update .env file
```env
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1  # or your preferred region
AWS_SNS_TOPIC_ARN=arn:aws:sns:us-east-1:123456789012:YourTopic  # optional
```

### 3. SMS Recipients Configuration

Add phone numbers that should receive SMS notifications:

```env
# Single recipient
SMS_RECIPIENTS=+1234567890

# Multiple recipients (comma-separated)
SMS_RECIPIENTS=+1234567890,+0987654321,+1122334455
```

**Important**: Phone numbers must be in E.164 format (e.g., +1234567890)

### 4. Server Configuration

```env
PORT=3001
WEBHOOK_SECRET=your_secure_random_string_here
WEBHOOK_BASE_URL=http://localhost:3001  # Update for production
```

## 🔄 How It Works

### 1. Authorization Flow
1. User clicks "Start Authorization" in the web interface
2. User is redirected to Google OAuth consent screen
3. After approval, Google returns authorization code
4. Backend exchanges code for access/refresh tokens
5. Tokens are stored and used for API calls

### 2. Calendar Monitoring
1. Backend sets up a webhook with Google Calendar API
2. Google sends notifications when calendar events change
3. Backend processes notifications and identifies new bookings
4. System automatically extracts client phone numbers from events

### 3. Client SMS Delivery
1. New calendar events trigger the webhook
2. System extracts client phone number from event details
3. Personalized confirmation SMS is sent directly to the client
4. Optional business notification SMS is sent to configured number
5. All activities are logged for debugging

### 4. Phone Number Extraction
The system automatically finds phone numbers in:
- **Event Description** (most reliable): "Client: John Doe, Phone: +1234567890"
- **Attendee Display Name**: "John Doe (+1234567890)"
- **Event Location**: "Phone: +1234567890" (if not used for actual location)
- **Custom Properties**: Any extended event properties

Supported phone formats:
- E.164: `+1234567890`
- US formats: `(123) 456-7890`, `123-456-7890`, `123.456.7890`
- International: `+44 20 7946 0958`

## 📱 API Endpoints

### Calendar Endpoints
- `GET /api/calendar/auth` - Get authorization URL
- `GET /api/calendar/auth/callback` - Handle OAuth callback
- `GET /api/calendar/events` - List calendar events
- `POST /api/calendar/watch` - Setup calendar monitoring

### SMS Endpoints
- `POST /api/sms/send` - Send SMS to single recipient
- `POST /api/sms/send-bulk` - Send SMS to multiple recipients
- `POST /api/sms/send-topic` - Send SMS via SNS topic
- `GET /api/sms/status` - Check SMS configuration

### Webhook Endpoints
- `POST /api/webhooks/calendar` - Google Calendar webhook
- `POST /api/webhooks/test-sms` - Test SMS functionality

## 🧪 Testing

### 1. Test SMS Functionality
```bash
curl -X POST http://localhost:3001/api/sms/send \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+1234567890",
    "message": "Test SMS from Calendar Integration"
  }'
```

### 2. Test Calendar Integration
1. Complete Google OAuth authorization
2. Create a test event in your Google Calendar
3. Check server logs for webhook notifications
4. Verify SMS delivery

### 3. Check Configuration
```bash
curl http://localhost:3001/api/sms/status
```

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit `.env` file to version control
- Use strong, random values for `WEBHOOK_SECRET`
- Rotate AWS credentials regularly

### 2. Production Deployment
- Use HTTPS for all endpoints
- Set up proper domain for webhook URLs
- Configure CORS appropriately
- Use secure token storage (database, not memory)

### 3. AWS Permissions
Grant minimal required permissions:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "sns:Publish"
            ],
            "Resource": "*"
        }
    ]
}
```

## 🐛 Troubleshooting

### Common Issues

#### 1. "Authorization not complete"
- Ensure redirect URI matches Google Cloud Console configuration
- Check that authorization flow completed successfully
- Verify tokens are being stored properly

#### 2. "Failed to send SMS"
- Check AWS credentials and permissions
- Verify phone numbers are in E.164 format
- Ensure AWS SNS service is available in your region

#### 3. "Webhook not receiving events"
- Verify webhook URL is publicly accessible
- Check Google Calendar API quotas
- Ensure calendar watch is properly established

#### 4. "No SMS recipients configured"
- Check `SMS_RECIPIENTS` environment variable
- Ensure phone numbers are properly formatted
- Verify environment file is loaded

### Debug Mode
Enable detailed logging by setting:
```env
NODE_ENV=development
```

## 🚀 Production Deployment

### 1. Environment Setup
- Use production domain for webhook URLs
- Configure HTTPS certificates
- Set up proper database for token storage
- Configure monitoring and logging

### 2. Scaling Considerations
- Use Redis or database for token storage
- Implement rate limiting
- Add error handling and retry logic
- Set up monitoring and alerts

### 3. Maintenance
- Monitor Google Calendar API quotas
- Regularly check webhook status
- Update dependencies and security patches
- Backup configuration and tokens

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review server logs for detailed error messages
3. Test individual components (SMS, Calendar API) separately
4. Verify all environment variables are correctly set

## 📝 Example .env File

```env
# Google Calendar API Configuration
GOOGLE_CLIENT_ID=123456789012-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
GOOGLE_REDIRECT_URI=http://localhost:3001/auth/google/callback
GOOGLE_CALENDAR_ID=primary

# AWS SNS Configuration
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
AWS_SNS_TOPIC_ARN=arn:aws:sns:us-east-1:123456789012:CalendarNotifications

# Server Configuration
PORT=3001
WEBHOOK_SECRET=super-secret-webhook-key-change-this-in-production
WEBHOOK_BASE_URL=http://localhost:3001

# Business Information for Client SMS
BUSINESS_NAME=Your Business Name
BUSINESS_PHONE=+1234567890

# Business Notifications (optional)
SEND_BUSINESS_COPY=true
BUSINESS_NOTIFICATION_PHONE=+1234567890

# Legacy: Fixed SMS Recipients (now optional - system extracts from events)
# SMS_RECIPIENTS=+1234567890,+0987654321
```
