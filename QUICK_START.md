# Quick Start Guide - AWS SMS Automation

Get your SMS automation running in 15 minutes!

## What You'll Build

A system that:
1. ✅ Sends automatic SMS when someone books on Calendly
2. ✅ Waits 30 minutes for a response
3. ✅ Sends follow-up SMS if no response received
4. ✅ Tracks responses automatically

## Prerequisites Checklist

- [ ] AWS Account with billing enabled
- [ ] AWS CLI installed and configured
- [ ] AWS SAM CLI installed
- [ ] Node.js 20+ installed
- [ ] AWS SNS phone number with two-way SMS

## Step-by-Step Setup

### 1. Get AWS Phone Number (5 min)

```bash
# Open AWS Console
1. Go to Amazon SNS → Phone numbers
2. Click "Request phone number"
3. Select: SMS + Two-way SMS capabilities
4. Save your number: +1234567890
```

### 2. Deploy the System (5 min)

```bash
# Navigate to lambda folder
cd aws-lambda

# Deploy with your AWS profile (follow prompts)
./deploy.sh --profile your-profile-name --guided

# OR on Windows PowerShell:
.\deploy.ps1 -AwsProfile your-profile-name -Guided

# Enter when prompted:
# - Stack name: sms-automation-stack
# - Region: us-east-1
# - CalendlyWebhookSecret: your_secret
# - OriginationNumber: +1234567890
# - IncomingSMSTopicArn: arn:aws:sns:us-east-1:123456789012:YourExistingTopic
# - BusinessName: Your Business
```

**Save the outputs!** You'll need:
- `CalendlyWebhookUrl`

### 3. Two-Way SMS Already Configured! ✓

Your SNS topic is already connected to your phone number, so this step is done!

### 4. Setup Calendly Webhook (3 min)

```bash
1. Calendly → Settings → Webhooks
2. Click "Add Webhook"
3. URL: [CalendlyWebhookUrl from step 2]
4. Events: Check "Invitee Created"
5. Paste your signing secret
6. Save
```

### 5. Add Phone Question to Calendly

```bash
1. Edit your event type
2. Invitee Questions → Add question
3. Question: "What's your phone number?"
4. Make it required
5. Save
```

### 6. Test It! (2 min)

```bash
# Book a test appointment using your own phone number
1. Go to your Calendly link
2. Book an appointment
3. Enter YOUR phone number

# You should:
✓ Receive SMS immediately
✓ Receive follow-up SMS after 30 min (if you don't reply)
```

## Verify Everything Works

### Check Logs

```bash
# View webhook processing
sam logs -n CalendlyWebhookHandler --tail

# View incoming SMS processing  
sam logs -n IncomingSMSHandler --tail
```

### Check Database

```bash
# AWS Console → DynamoDB → SMSConversations
# You should see your test conversation
```

### Check Step Functions

```bash
# AWS Console → Step Functions → SMSFollowUpStateMachine
# You should see running executions
```

## Customizing Messages

Edit `aws-lambda/utils/sns.ts`:

```typescript
// Change this function for initial message
export function formatInitialMessage(
  clientName: string,
  eventTitle: string,
  startTime: string
): string {
  // Your custom message here
}

// Change this function for follow-up
export function formatFollowUpMessage(clientName: string): string {
  // Your custom follow-up message here
}
```

Redeploy:
```bash
sam build && sam deploy
```

## Common Issues

### Issue: SMS not sending
**Fix:** Check SNS spending limit in AWS account settings

### Issue: Follow-up not working
**Fix:** Verify STATE_MACHINE_ARN in Lambda environment variables

### Issue: Can't receive replies
**Fix:** Ensure two-way SMS is enabled and topic is subscribed

## Cost Estimate

For 100 appointments/month:
- Lambda: ~$0.02
- Step Functions: ~$0.03
- DynamoDB: ~$0.05
- SNS SMS: ~$1.50 (varies by country)

**Total: ~$1.60/month**

## Next Steps

- [ ] Adjust wait time (edit `statemachine/follow-up.asl.json`)
- [ ] Customize message templates
- [ ] Set up billing alerts
- [ ] Add business notifications
- [ ] Monitor CloudWatch logs

## Need Help?

1. Check `AWS_SETUP_GUIDE.md` for detailed troubleshooting
2. Review CloudWatch logs for errors
3. Verify all environment variables are set
4. Test SMS sending directly from AWS SNS console

## Clean Up

To remove everything:
```bash
sam delete --stack-name sms-automation-stack
```

Remember to manually delete:
- SNS phone number (if not needed)
- CloudWatch log groups (if not needed)

---

**You're done!** 🎉 Your SMS automation is now live and running on pure AWS infrastructure.

