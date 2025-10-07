# AWS SMS Automation Setup Guide

This guide will walk you through setting up the complete SMS automation system using pure AWS services.

## System Overview

**Flow:**
1. Customer books appointment on Calendly
2. Calendly sends webhook to API Gateway
3. Lambda function sends initial SMS via AWS SNS
4. Step Functions waits 30 minutes
5. If no response received, Lambda sends follow-up SMS
6. Incoming SMS responses are tracked via SNS → Lambda → DynamoDB

## Prerequisites

- AWS Account with billing enabled
- AWS CLI configured
- AWS SAM CLI installed
- Node.js 20.x or later
- Calendly account with webhook access

## Step 1: Request AWS Phone Number

1. Log into AWS Console
2. Navigate to **Amazon SNS** → **Phone numbers** → **Request phone number**
3. Choose:
   - Country: Your country
   - Capabilities: SMS, Two-way SMS
   - Number type: Toll-free or 10DLC (US)
4. Complete the request and wait for approval
5. **Save the phone number** (E.164 format: +12345678900)

### Important: Two-Way SMS Setup

After getting your phone number, you need to:
1. Enable two-way SMS on the phone number
2. Configure SNS topic for incoming messages (we'll do this after deployment)

## Step 2: Install AWS SAM CLI

### macOS
```bash
brew tap aws/tap
brew install aws-sam-cli
```

### Windows
Download from: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

### Linux
```bash
wget https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip
unzip aws-sam-cli-linux-x86_64.zip -d sam-installation
sudo ./sam-installation/install
```

Verify installation:
```bash
sam --version
```

## Step 3: Configure AWS CLI

```bash
aws configure
```

Enter:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., us-east-1)
- Output format (json)

## Step 4: Prepare Lambda Functions

```bash
cd aws-lambda
npm install
npm run build
```

## Step 5: Deploy to AWS

### Initial Deployment

```bash
sam build
sam deploy --guided
```

Answer the prompts:

```
Stack Name: sms-automation-stack
AWS Region: us-east-1
Parameter CalendlyWebhookSecret: [Your Calendly webhook secret]
Parameter OriginationNumber: +12345678900
Parameter BusinessName: Your Business Name
Parameter BusinessNotificationTopicArn: [Leave empty for now]
Confirm changes before deploy: Y
Allow SAM CLI IAM role creation: Y
Disable rollback: N
Save arguments to configuration file: Y
```

**Wait for deployment to complete** (5-10 minutes)

### Get Deployment Outputs

```bash
aws cloudformation describe-stacks \
  --stack-name sms-automation-stack \
  --query 'Stacks[0].Outputs' \
  --output table
```

Save these values:
- `CalendlyWebhookUrl` - For Calendly configuration
- `IncomingSMSTopicArn` - For phone number configuration
- `StateMachineArn` - For verification

## Step 6: Configure Two-Way SMS

1. Go to **AWS SNS Console** → **Phone numbers**
2. Click on your phone number
3. Under **Two-way SMS**:
   - Enable two-way SMS: **Yes**
   - Incoming message destination: **SNS Topic**
   - SNS Topic ARN: Use the `IncomingSMSTopicArn` from deployment outputs
4. Save changes

## Step 7: Configure Calendly Webhook

### Get Webhook Signing Secret

1. Log into Calendly
2. Go to **Account** → **Settings** → **Webhooks**
3. Click **Add Webhook** or **Generate signing key**
4. **Copy the signing secret** (you'll need it for webhook)

### Create Webhook

1. In Calendly webhooks page, click **Add Webhook**
2. Configure:
   - **Webhook URL**: Use `CalendlyWebhookUrl` from deployment
   - **Events to subscribe**: Select `Invitee Created`
   - **Webhook signing secret**: Enter the secret you generated
3. Click **Create Webhook**

### Update Lambda with Secret (if not done in deployment)

```bash
aws lambda update-function-configuration \
  --function-name CalendlyWebhookHandler \
  --environment "Variables={
    CALENDLY_WEBHOOK_SECRET=your_secret_here,
    ORIGINATION_NUMBER=+12345678900,
    BUSINESS_NAME='Your Business',
    STATE_MACHINE_ARN=your_state_machine_arn
  }"
```

## Step 8: Configure Calendly Event Form

Ensure your Calendly event includes phone number collection:

1. Edit your event type
2. Go to **Event Details** → **Invitee Questions**
3. Add a custom question:
   - Question: "What's your phone number?"
   - Type: One-line text
   - Required: Yes
4. Save changes

## Step 9: Test the System

### Test 1: Book Test Appointment

1. Create a test booking in Calendly
2. Enter a valid phone number (yours for testing)
3. Complete the booking

**Expected Result:**
- Receive confirmation SMS immediately
- Check CloudWatch logs for CalendlyWebhookHandler
- Verify DynamoDB record created

### Test 2: Verify Follow-up Schedule

1. Go to **AWS Step Functions Console**
2. Find execution with name starting with `followup-conv-`
3. Verify it's in "Running" state
4. Check execution time (should complete in 30 min)

### Test 3: Reply to SMS

1. Reply to the initial SMS with any message
2. Check CloudWatch logs for IncomingSMSHandler
3. Verify DynamoDB record updated with `clientResponded: true`

### Test 4: Wait for Follow-up

If you don't reply:
- Wait 30 minutes
- Should receive follow-up SMS
- Check FollowUpSender logs

## Monitoring and Logs

### CloudWatch Logs

```bash
# View Calendly webhook logs
sam logs -n CalendlyWebhookHandler --tail

# View incoming SMS logs
sam logs -n IncomingSMSHandler --tail

# View follow-up sender logs
sam logs -n FollowUpSender --tail
```

### DynamoDB Console

1. Go to **DynamoDB Console** → **Tables** → `SMSConversations`
2. Click **Explore table items**
3. View conversation records

### Step Functions Console

1. Go to **Step Functions Console**
2. Click on `SMSFollowUpStateMachine`
3. View executions and their status

## Troubleshooting

### Issue: SMS Not Sending

**Check:**
```bash
# Verify Lambda has SNS permissions
aws lambda get-function --function-name CalendlyWebhookHandler

# Check SMS quota
aws sns get-sms-attributes

# Test SMS directly
aws sns publish \
  --phone-number +12345678900 \
  --message "Test message" \
  --message-attributes '{"AWS.MM.SMS.OriginationNumber":{"DataType":"String","StringValue":"YOUR_SNS_NUMBER"}}'
```

**Solutions:**
- Increase SNS spending limit in AWS account settings
- Verify phone number has SMS capabilities
- Check CloudWatch logs for errors

### Issue: Follow-up Not Sending

**Check:**
```bash
# View Step Functions executions
aws stepfunctions list-executions \
  --state-machine-arn YOUR_STATE_MACHINE_ARN

# Describe specific execution
aws stepfunctions describe-execution \
  --execution-arn YOUR_EXECUTION_ARN
```

**Solutions:**
- Verify STATE_MACHINE_ARN is set in Lambda environment
- Check if client already responded (follow-up is skipped)
- Review FollowUpSender logs

### Issue: Incoming SMS Not Processing

**Check:**
```bash
# Verify SNS subscription
aws sns list-subscriptions-by-topic \
  --topic-arn YOUR_INCOMING_SMS_TOPIC_ARN

# Check subscription status
aws sns get-subscription-attributes \
  --subscription-arn YOUR_SUBSCRIPTION_ARN
```

**Solutions:**
- Verify SNS topic is linked to phone number
- Check two-way SMS is enabled
- Confirm Lambda has permission to read from SNS

### Issue: Calendly Webhook Failing

**Check:**
- Webhook URL is correct
- Signing secret matches
- API Gateway endpoint is active
- Lambda has no errors in logs

**Test webhook manually:**
```bash
curl -X POST YOUR_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d @test-payload.json
```

## Cost Management

### Set Up Billing Alerts

1. Go to **AWS Budgets**
2. Create budget for SMS costs
3. Set threshold (e.g., $50/month)
4. Add email notification

### Monitor Costs

```bash
# Check SNS usage
aws cloudwatch get-metric-statistics \
  --namespace AWS/SNS \
  --metric-name NumberOfMessagesSent \
  --start-time 2025-10-01T00:00:00Z \
  --end-time 2025-10-31T23:59:59Z \
  --period 86400 \
  --statistics Sum

# View DynamoDB usage
aws dynamodb describe-table \
  --table-name SMSConversations
```

## Updating the System

### Update Lambda Code

```bash
cd aws-lambda
npm run build
sam build
sam deploy
```

### Update Message Templates

Edit `aws-lambda/utils/sns.ts`:
- `formatInitialMessage()` - Initial SMS template
- `formatFollowUpMessage()` - Follow-up SMS template

Then redeploy:
```bash
sam build && sam deploy
```

### Update Wait Time

Edit `aws-lambda/statemachine/follow-up.asl.json`:
- Change `"Seconds": 1800` to desired seconds
- 1800 = 30 minutes
- 3600 = 1 hour

Then redeploy:
```bash
sam build && sam deploy
```

## Security Best Practices

1. **Rotate webhook secrets regularly**
2. **Enable AWS CloudTrail** for audit logging
3. **Use AWS Secrets Manager** for sensitive data (optional upgrade)
4. **Enable DynamoDB point-in-time recovery**
5. **Set up AWS WAF** on API Gateway (optional)

## Scaling Considerations

The system auto-scales, but consider:

- **Lambda concurrent executions**: Default 1,000 (request increase if needed)
- **SNS sending rate**: ~20 SMS/second (contact AWS for higher rates)
- **DynamoDB capacity**: On-demand scales automatically
- **Step Functions**: 1,000,000 concurrent executions (no action needed)

## Support and Maintenance

### Regular Maintenance Tasks

1. Review CloudWatch logs weekly
2. Monitor DynamoDB table size
3. Check SNS spending monthly
4. Update Lambda runtime when new versions available
5. Rotate credentials quarterly

### Backup Strategy

DynamoDB:
```bash
# Enable point-in-time recovery
aws dynamodb update-continuous-backups \
  --table-name SMSConversations \
  --point-in-time-recovery-specification PointInTimeRecoveryEnabled=true

# Create on-demand backup
aws dynamodb create-backup \
  --table-name SMSConversations \
  --backup-name SMSConversations-$(date +%Y%m%d)
```

## Clean Up

To remove all resources:

```bash
sam delete --stack-name sms-automation-stack
```

**Note:** This will delete:
- All Lambda functions
- DynamoDB table (and all data)
- API Gateway
- Step Functions state machine
- IAM roles

**Will NOT delete:**
- SNS phone number (delete manually if needed)
- CloudWatch logs (delete manually if needed)

---

## Next Steps

After successful setup:

1. Monitor first few bookings closely
2. Adjust message templates based on feedback
3. Set up business notification system (optional)
4. Consider adding analytics dashboard
5. Implement response handling logic (optional)

For questions or issues, check CloudWatch logs first, then review the troubleshooting section.


