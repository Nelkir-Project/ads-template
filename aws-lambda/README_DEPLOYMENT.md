# Quick Deployment Reference

## First Time Deployment

### Bash (Linux/macOS)
```bash
cd aws-lambda
./deploy.sh --profile your-profile-name --guided
```

### PowerShell (Windows)
```powershell
cd aws-lambda
.\deploy.ps1 -AwsProfile your-profile-name -Guided
```

## What You Need

Before deploying, have these ready:

1. **AWS Profile Name**: Your configured AWS profile
   ```bash
   aws configure list-profiles
   ```

2. **Calendly Webhook Secret**: From Calendly → Settings → Webhooks

3. **SNS Phone Number**: Your origination number
   ```
   Format: +12345678900
   ```

4. **Incoming SMS Topic ARN**: Your existing SNS topic
   ```bash
   aws sns list-topics --profile your-profile-name
   ```
   Look for the topic connected to your phone number.

5. **Business Name**: How you want to appear in SMS messages

## Deployment Parameters

When prompted during `--guided` deployment:

| Parameter | Example | Where to Find |
|-----------|---------|---------------|
| Stack name | `sms-automation-stack` | Choose any name |
| AWS Region | `us-east-1` | Your preferred region |
| CalendlyWebhookSecret | `cal_xxx...` | Calendly webhooks page |
| OriginationNumber | `+12345678900` | AWS SNS phone numbers |
| IncomingSMSTopicArn | `arn:aws:sns:...` | `aws sns list-topics` |
| BusinessName | `My Business` | Your choice |

## After Deployment

Get your webhook URL:
```bash
aws cloudformation describe-stacks \
  --stack-name sms-automation-stack \
  --profile your-profile-name \
  --query 'Stacks[0].Outputs[?OutputKey==`CalendlyWebhookUrl`].OutputValue' \
  --output text
```

## Subsequent Deployments

After first deployment, you can deploy without `--guided`:

```bash
# Bash
./deploy.sh --profile your-profile-name

# PowerShell
.\deploy.ps1 -AwsProfile your-profile-name
```

## Troubleshooting

### "Profile not found"
```bash
aws configure --profile your-profile-name
```

### "SNS topic not found"
Verify your topic ARN:
```bash
aws sns list-topics --profile your-profile-name
```

### "Permission denied"
Ensure your IAM user has:
- CloudFormation full access
- Lambda full access
- DynamoDB full access
- SNS full access
- Step Functions full access

## Complete Documentation

- **[DEPLOYMENT_PROFILES.md](DEPLOYMENT_PROFILES.md)** - Complete profile guide
- **[AWS_SETUP_GUIDE.md](../AWS_SETUP_GUIDE.md)** - Full setup instructions
- **[QUICK_START.md](../QUICK_START.md)** - 15-minute quickstart

---

**Need help?** Check the documentation or run:
```bash
./deploy.sh --help  # (on Bash)
Get-Help .\deploy.ps1  # (on PowerShell)
```

