# AWS SMS Automation System

> **Pure AWS serverless solution** for automated SMS follow-ups with Calendly bookings

[![AWS](https://img.shields.io/badge/AWS-Serverless-orange)](https://aws.amazon.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 📋 Overview

An enterprise-grade, serverless SMS automation system that:

✅ **Sends instant SMS confirmations** when customers book appointments on Calendly  
✅ **Automatically follows up** after 30 minutes if no response  
✅ **Tracks customer responses** in real-time  
✅ **Scales automatically** to handle any volume  
✅ **Uses 100% AWS services** - no third-party dependencies  

## 🏗️ Architecture

```
Calendly → API Gateway → Lambda → SNS (SMS)
                           ↓
                      DynamoDB (Track)
                           ↓
                   Step Functions (Wait 30min)
                           ↓
                      Lambda → SNS (Follow-up)
                      
Customer Reply → SNS → Lambda → DynamoDB (Update)
```

**Technologies:**
- **AWS Lambda** - Serverless compute
- **AWS SNS** - SMS messaging
- **AWS DynamoDB** - NoSQL database
- **AWS Step Functions** - Workflow orchestration
- **AWS API Gateway** - Webhook endpoint
- **TypeScript** - Type-safe code

See [ARCHITECTURE.md](../ARCHITECTURE.md) for detailed diagrams.

## 🚀 Quick Start

Get running in 15 minutes! See [QUICK_START.md](../QUICK_START.md)

```bash
# 1. Install dependencies
cd aws-lambda
npm install

# 2. Deploy
sam build
sam deploy --guided

# 3. Configure SNS two-way SMS
# 4. Setup Calendly webhook
# 5. Test with a booking
```

## 📚 Documentation

- **[QUICK_START.md](../QUICK_START.md)** - Get up and running in 15 minutes
- **[AWS_SETUP_GUIDE.md](../AWS_SETUP_GUIDE.md)** - Complete setup guide with troubleshooting
- **[ARCHITECTURE.md](../ARCHITECTURE.md)** - System architecture and data flows
- **[README.md](README.md)** - Project technical details

## 💡 Features

### Core Features
- ✅ Instant SMS confirmation on Calendly booking
- ✅ 30-minute automatic follow-up (configurable)
- ✅ Response tracking and conversation management
- ✅ Client name personalization
- ✅ Webhook signature verification
- ✅ Auto-cleanup after 90 days (TTL)

### Technical Features
- ✅ 100% Serverless architecture
- ✅ Infrastructure as Code (SAM/CloudFormation)
- ✅ TypeScript with full type safety
- ✅ Comprehensive error handling
- ✅ CloudWatch monitoring & logging
- ✅ Automatic scaling
- ✅ Cost-optimized (pay-per-use)

## 💰 Pricing

**Estimated cost for 1,000 appointments/month: ~$11/month**

Breakdown:
- Lambda: $0.60
- Step Functions: $0.05
- DynamoDB: $0.01
- SNS SMS: $10.50 (~1,400 SMS)

See [ARCHITECTURE.md](../ARCHITECTURE.md) for detailed cost analysis.

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Functions** | AWS Lambda (Node.js 20.x) | Serverless compute |
| **Storage** | DynamoDB | Conversation tracking |
| **Messaging** | AWS SNS | SMS sending/receiving |
| **Workflow** | Step Functions | 30-min wait orchestration |
| **API** | API Gateway | Webhook endpoint |
| **Language** | TypeScript | Type-safe development |
| **IaC** | AWS SAM | Infrastructure deployment |

## 📦 Project Structure

```
aws-lambda/
├── functions/
│   ├── calendly-webhook.ts      # Handles Calendly events
│   ├── incoming-sms.ts           # Processes SMS responses
│   └── follow-up-sender.ts       # Sends follow-up messages
├── utils/
│   ├── dynamodb.ts               # Database operations
│   └── sns.ts                    # SMS utilities
├── types/
│   └── conversation.ts           # TypeScript interfaces
├── statemachine/
│   └── follow-up.asl.json        # Step Functions definition
├── template.yaml                 # SAM/CloudFormation template
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript config
```

## 🔧 Configuration

### Environment Variables

```bash
CALENDLY_WEBHOOK_SECRET=your_secret
ORIGINATION_NUMBER=+12345678900
BUSINESS_NAME=Your Business
CONVERSATIONS_TABLE=SMSConversations
STATE_MACHINE_ARN=arn:aws:states:...
```

### Message Templates

Edit `utils/sns.ts` to customize:
- Initial confirmation message
- Follow-up message
- Message formatting

### Wait Time

Edit `statemachine/follow-up.asl.json`:
```json
{
  "Wait30Minutes": {
    "Type": "Wait",
    "Seconds": 1800  // Change this (1800 = 30 min)
  }
}
```

## 🧪 Testing

### Test Calendly Webhook

```bash
# Start local API
sam local start-api

# Send test request
curl -X POST http://localhost:3000/calendly \
  -H "Content-Type: application/json" \
  -d @test-payload.json
```

### View Logs

```bash
# Real-time logs
sam logs -n CalendlyWebhookHandler --tail

# Follow-up logs
sam logs -n FollowUpSender --tail

# Incoming SMS logs
sam logs -n IncomingSMSHandler --tail
```

### Test Direct SMS

```bash
aws sns publish \
  --phone-number +12345678900 \
  --message "Test message" \
  --message-attributes '{"AWS.MM.SMS.OriginationNumber":{"DataType":"String","StringValue":"YOUR_NUMBER"}}'
```

## 📊 Monitoring

### CloudWatch Dashboards

Monitor key metrics:
- SMS sent/failed
- Lambda invocations/errors
- DynamoDB read/write capacity
- Step Functions executions

### Alarms (Recommended)

```bash
# High error rate
SMS Send Failures > 5%

# Lambda issues
Function Errors > 10 in 5 min

# DynamoDB throttling
Throttled Requests > 0
```

## 🔒 Security

- ✅ Webhook signature verification (HMAC-SHA256)
- ✅ IAM least privilege roles
- ✅ DynamoDB encryption at rest
- ✅ HTTPS only (API Gateway)
- ✅ Phone numbers masked in logs
- ✅ Automatic data expiration (90 days)
- ✅ No hardcoded secrets

## 🚀 Deployment

### Prerequisites
- AWS Account
- AWS CLI configured
- AWS SAM CLI installed
- Node.js 20.x
- SNS phone number with two-way SMS

### Deploy

```bash
# Install
npm install

# Build
npm run build

# Deploy
sam deploy --guided
```

### Update

```bash
# Make changes, then:
sam build && sam deploy
```

### Rollback

```bash
# Delete stack
sam delete

# Or rollback to previous version
aws cloudformation rollback-stack \
  --stack-name sms-automation-stack
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| SMS not sending | Check SNS spending limit |
| Follow-up not working | Verify STATE_MACHINE_ARN |
| Can't receive replies | Enable two-way SMS on phone |
| Webhook failing | Check signature secret |
| High costs | Review SMS volume, set budget alerts |

See [AWS_SETUP_GUIDE.md](../AWS_SETUP_GUIDE.md) for detailed troubleshooting.

## 📈 Scaling

The system auto-scales, but consider:

**For 10,000+ appointments/month:**
- Request SNS rate increase
- Monitor Lambda concurrent execution limits
- Consider DynamoDB provisioned capacity
- Enable API Gateway caching

## 🔄 Updates & Maintenance

### Regular Tasks
- [ ] Review CloudWatch logs weekly
- [ ] Monitor DynamoDB table size monthly
- [ ] Check SNS spending monthly
- [ ] Update Lambda runtime when available
- [ ] Rotate Calendly webhook secret quarterly

### Backup
```bash
# Enable PITR
aws dynamodb update-continuous-backups \
  --table-name SMSConversations \
  --point-in-time-recovery-specification \
  PointInTimeRecoveryEnabled=true
```

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use in your projects!

## 🙏 Support

- **Issues**: Open a GitHub issue
- **Questions**: Check documentation first
- **AWS Support**: For AWS-specific issues

## 🎯 Roadmap

- [ ] Multi-language support
- [ ] Response parsing & automation
- [ ] Business analytics dashboard
- [ ] Integration with CRM systems
- [ ] A/B testing for messages
- [ ] Appointment reminders (24h before)
- [ ] Post-appointment feedback collection

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using AWS Serverless**


