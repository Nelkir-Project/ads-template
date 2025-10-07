# AWS SMS Automation System

A serverless SMS automation system using AWS services (SNS, Lambda, DynamoDB, Step Functions) to send confirmation messages via Calendly webhooks and automatic follow-ups after 30 minutes if no response is received.

## Architecture

```
Calendly Webhook → API Gateway → Lambda (Calendly Handler)
                                    ↓
                                DynamoDB (Store conversation)
                                    ↓
                                AWS SNS (Send initial SMS)
                                    ↓
                            Step Functions (Wait 30 min)
                                    ↓
                        Lambda (Check & send follow-up)

Incoming SMS → SNS Topic → Lambda (Incoming SMS Handler)
                              ↓
                        DynamoDB (Mark as responded)
```

## Components

### Lambda Functions

1. **CalendlyWebhookHandler** - Receives Calendly webhook, sends initial SMS, starts follow-up workflow
2. **IncomingSMSHandler** - Processes incoming SMS responses and marks conversations as responded
3. **FollowUpSender** - Sends follow-up SMS after 30 minutes if no response received

### DynamoDB Tables

1. **SMSConversations** - Stores conversation state, tracking responses and message history

### Step Functions

1. **SMSFollowUpStateMachine** - Waits 30 minutes then invokes follow-up sender

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS SAM CLI** installed ([Installation Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html))
3. **Node.js 20.x** or later
4. **AWS SNS Phone Number** configured with two-way SMS enabled
5. **Calendly Account** with webhook access

## Setup Instructions

### 1. Configure AWS SNS Phone Number

1. Go to AWS SNS Console
2. Navigate to "Phone numbers" → "Request phone number"
3. Request a phone number with SMS and two-way SMS capabilities
4. Note the phone number (E.164 format, e.g., +12345678900)

### 2. Create SNS Topic for Incoming SMS

The template creates the topic automatically, but you need to link it to your phone number:

1. After deployment, get the `IncomingSMSTopicArn` from CloudFormation outputs
2. In SNS Console, go to your phone number settings
3. Under "Two-way SMS", set the topic ARN for incoming messages

### 3. Install Dependencies

```bash
cd aws-lambda
npm install
```

### 4. Build the Project

```bash
npm run build
# or
sam build
```

### 5. Deploy to AWS

```bash
sam deploy --guided
```

During deployment, you'll be prompted for:

- **CalendlyWebhookSecret**: Your Calendly webhook signing secret
- **OriginationNumber**: Your AWS SNS phone number (E.164 format)
- **BusinessName**: Your business name for SMS messages
- **BusinessNotificationTopicArn**: (Optional) SNS topic for business notifications

### 6. Configure Calendly Webhook

1. Copy the `CalendlyWebhookUrl` from deployment outputs
2. Go to Calendly → Account Settings → Webhooks
3. Create a new webhook:
   - URL: The CalendlyWebhookUrl
   - Events: Select "Invitee Created"
   - Signing Secret: Use the same secret from deployment

### 7. Update Calendly Event Form

Ensure your Calendly event includes a phone number question:
- Add a custom question: "What's your phone number?"
- Make it required
- The system will extract the phone number from responses

## Environment Variables

Set in AWS Lambda console or template.yaml:

| Variable | Description | Example |
|----------|-------------|---------|
| CONVERSATIONS_TABLE | DynamoDB table name | SMSConversations |
| ORIGINATION_NUMBER | AWS SNS phone number | +12345678900 |
| BUSINESS_NAME | Business name for messages | "Acme Corp" |
| STATE_MACHINE_ARN | Step Functions ARN | arn:aws:states:... |
| CALENDLY_WEBHOOK_SECRET | Calendly signing secret | abc123... |

## Message Templates

### Initial Message

```
Hi {clientName}! 🎉

Your appointment has been confirmed:

📅 {eventTitle}
🕐 {formattedDate}

We're looking forward to meeting with you! 

Reply to this message if you have any questions.

- {businessName}
```

### Follow-up Message (30 min later if no response)

```
Hi {clientName},

Just checking in to make sure you received our confirmation message about your upcoming appointment.

If you have any questions or need to reschedule, please reply to this message or give us a call.

Looking forward to seeing you!

- {businessName}
```

## Data Structure

### ConversationRecord (DynamoDB)

```typescript
{
  phoneNumber: string,           // Partition key
  conversationId: string,         // Sort key
  clientName: string,
  eventId: string,
  eventTitle: string,
  eventStartTime: string,
  eventEndTime: string,
  initialMessageSent: boolean,
  initialMessageSentAt?: string,
  followUpMessageSent: boolean,
  followUpMessageSentAt?: string,
  clientResponded: boolean,
  clientResponseAt?: string,
  clientResponseText?: string,
  status: ConversationStatus,
  createdAt: string,
  updatedAt: string,
  ttl: number                     // Auto-delete after 90 days
}
```

## Testing

### Test Calendly Webhook Locally

```bash
sam local start-api
```

Send test webhook:

```bash
curl -X POST http://localhost:3000/calendly \
  -H "Content-Type: application/json" \
  -d '{
    "event": "invitee.created",
    "payload": {
      "event_type": { "name": "Test Appointment" },
      "event": {
        "start_time": "2025-10-10T14:00:00Z",
        "end_time": "2025-10-10T15:00:00Z"
      },
      "invitee": {
        "name": "John Doe",
        "email": "john@example.com"
      },
      "questions_and_answers": [
        {
          "question": "What is your phone number?",
          "answer": "+1234567890"
        }
      ]
    }
  }'
```

### Monitor Logs

```bash
sam logs -n CalendlyWebhookHandler --tail
sam logs -n IncomingSMSHandler --tail
sam logs -n FollowUpSender --tail
```

## Cost Estimate

Based on 1,000 appointments/month:

- **Lambda**: ~$0.20 (3,000 invocations)
- **Step Functions**: ~$0.25 (1,000 executions)
- **DynamoDB**: ~$0.50 (on-demand)
- **SNS SMS**: ~$0.0075 per SMS (varies by country)
  - 1,000 initial: $7.50
  - ~400 follow-ups (60% response rate): $3.00
  - Total SMS: ~$10.50

**Estimated Total**: ~$11.50/month for 1,000 appointments

## Troubleshooting

### SMS Not Sending

1. Check CloudWatch logs for errors
2. Verify ORIGINATION_NUMBER is correct
3. Ensure phone number has SMS capabilities enabled
4. Check AWS SNS spending limits

### Follow-up Not Sending

1. Check Step Functions execution in AWS Console
2. Verify STATE_MACHINE_ARN is set correctly
3. Check if client responded (follow-up is skipped)

### Incoming SMS Not Processing

1. Verify SNS topic subscription is active
2. Check that phone number is configured for two-way SMS
3. Review IncomingSMSHandler logs

## Security

- Webhook signature verification enabled
- IAM roles follow least privilege principle
- Sensitive data (phone numbers) masked in logs
- DynamoDB encryption at rest enabled by default
- Data auto-expires after 90 days (TTL)

## Scaling

The system is serverless and scales automatically:
- Lambda: Up to 1,000 concurrent executions (can be increased)
- DynamoDB: On-demand scaling
- Step Functions: No limits on concurrent executions

## Clean Up

To remove all resources:

```bash
sam delete
```

## License

MIT


