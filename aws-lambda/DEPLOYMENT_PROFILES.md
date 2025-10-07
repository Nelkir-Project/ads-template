# AWS Profile-Based Deployment Guide

This guide explains how to deploy the SMS automation system using AWS named profiles.

## Why Use AWS Profiles?

AWS profiles allow you to:
- Manage multiple AWS accounts from one machine
- Keep credentials organized and secure
- Switch between different environments (dev, staging, prod)
- Avoid accidental deployments to wrong accounts

## Setup AWS Profiles

### 1. Configure Your Profile

```bash
aws configure --profile your-profile-name
```

Enter when prompted:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., us-east-1)
- Output format (json recommended)

### 2. Verify Profile

```bash
# View configured profiles
aws configure list-profiles

# Test profile access
aws sts get-caller-identity --profile your-profile-name

# Should output:
# {
#   "UserId": "...",
#   "Account": "123456789012",
#   "Arn": "arn:aws:iam::123456789012:user/your-user"
# }
```

## Deployment with Profiles

### Bash (Linux/macOS)

```bash
cd aws-lambda

# First time deployment
./deploy.sh --profile your-profile-name --guided

# Subsequent deployments
./deploy.sh --profile your-profile-name
```

### PowerShell (Windows)

```powershell
cd aws-lambda

# First time deployment
.\deploy.ps1 -AwsProfile your-profile-name -Guided

# Subsequent deployments
.\deploy.ps1 -AwsProfile your-profile-name
```

## Multiple Environment Setup

### Example: Dev and Production

```bash
# Configure dev profile
aws configure --profile sms-automation-dev
# Enter dev account credentials

# Configure prod profile
aws configure --profile sms-automation-prod
# Enter prod account credentials

# Deploy to dev
./deploy.sh --profile sms-automation-dev --guided

# Deploy to prod (after testing in dev)
./deploy.sh --profile sms-automation-prod --guided
```

### Environment-Specific Configuration

Create separate parameter files for each environment:

**samconfig-dev.toml**
```toml
version = 0.1
[default]
[default.deploy]
[default.deploy.parameters]
stack_name = "sms-automation-dev"
region = "us-east-1"
parameter_overrides = "BusinessName='My Business Dev'"
```

**samconfig-prod.toml**
```toml
version = 0.1
[default]
[default.deploy]
[default.deploy.parameters]
stack_name = "sms-automation-prod"
region = "us-east-1"
parameter_overrides = "BusinessName='My Business'"
```

Deploy with specific config:
```bash
sam deploy --profile sms-automation-dev --config-file samconfig-dev.toml
sam deploy --profile sms-automation-prod --config-file samconfig-prod.toml
```

## Profile Configuration Storage

AWS profiles are stored in:

**Linux/macOS:**
- Credentials: `~/.aws/credentials`
- Config: `~/.aws/config`

**Windows:**
- Credentials: `%USERPROFILE%\.aws\credentials`
- Config: `%USERPROFILE%\.aws\config`

### Example `~/.aws/credentials`
```ini
[default]
aws_access_key_id = YOUR_DEFAULT_KEY
aws_secret_access_key = YOUR_DEFAULT_SECRET

[sms-automation]
aws_access_key_id = YOUR_SMS_KEY
aws_secret_access_key = YOUR_SMS_SECRET

[sms-automation-prod]
aws_access_key_id = YOUR_PROD_KEY
aws_secret_access_key = YOUR_PROD_SECRET
```

### Example `~/.aws/config`
```ini
[default]
region = us-east-1
output = json

[profile sms-automation]
region = us-east-1
output = json

[profile sms-automation-prod]
region = us-west-2
output = json
```

## Deployment Script Features

### Bash Script Options

```bash
./deploy.sh [OPTIONS]

Options:
  --profile PROFILE_NAME   Use specific AWS profile
  --guided                 Run guided deployment (prompts for all parameters)
  
Examples:
  ./deploy.sh --profile my-profile --guided
  ./deploy.sh --profile my-profile
  ./deploy.sh --guided
```

### PowerShell Script Options

```powershell
.\deploy.ps1 [-AwsProfile <string>] [-Guided]

Parameters:
  -AwsProfile <string>   Use specific AWS profile
  -Guided               Run guided deployment (prompts for all parameters)
  
Examples:
  .\deploy.ps1 -AwsProfile my-profile -Guided
  .\deploy.ps1 -AwsProfile my-profile
  .\deploy.ps1 -Guided
```

## What Happens During Deployment

1. **Profile Verification**: Script verifies the profile exists and is valid
2. **Account Info Display**: Shows AWS account ID and region
3. **Dependency Installation**: Runs `npm install`
4. **TypeScript Build**: Compiles TypeScript to JavaScript
5. **SAM Build**: Packages Lambda functions
6. **SAM Deploy**: Deploys to AWS with your profile
7. **Output Display**: Shows CloudFormation stack outputs

## Parameters Required During Deployment

When running with `--guided` or `-Guided`, you'll be prompted for:

1. **CalendlyWebhookSecret**: Your Calendly webhook signing secret
2. **OriginationNumber**: Your AWS SNS phone number (+1234567890)
3. **IncomingSMSTopicArn**: ARN of your existing SNS topic
4. **BusinessName**: Your business name for SMS messages
5. **BusinessNotificationTopicArn**: (Optional) For business notifications

### How to Get Your IncomingSMSTopicArn

```bash
# List all SNS topics in your account
aws sns list-topics --profile your-profile-name

# Get topics with names
aws sns list-topics \
  --profile your-profile-name \
  --query 'Topics[*].[join(`:`, [split(@, `:`)[-1], @])]' \
  --output table

# Example output:
# arn:aws:sns:us-east-1:123456789012:IncomingSMS
```

Copy the ARN of your existing topic that's connected to your phone number.

## Troubleshooting

### Profile Not Found

```
❌ AWS profile 'my-profile' is invalid or not configured.
```

**Solution:**
```bash
# List available profiles
aws configure list-profiles

# Configure the profile
aws configure --profile my-profile
```

### Permission Denied

```
❌ User is not authorized to perform: cloudformation:CreateStack
```

**Solution:** Ensure your IAM user has necessary permissions:
- CloudFormation full access
- Lambda full access
- DynamoDB full access
- SNS full access
- Step Functions full access
- IAM role creation

### Region Mismatch

If your SNS topic is in a different region than your deployment:

**Solution:** Update the region in your profile:
```bash
aws configure set region us-west-2 --profile your-profile-name
```

Or specify during deployment:
```bash
sam deploy --profile your-profile-name --region us-west-2
```

### Credentials Expired

```
❌ The security token included in the request is expired
```

**Solution:** Re-configure your profile with fresh credentials:
```bash
aws configure --profile your-profile-name
```

## Best Practices

### 1. Use Descriptive Profile Names
```bash
# Good
aws configure --profile company-sms-prod
aws configure --profile company-sms-dev

# Avoid
aws configure --profile profile1
```

### 2. Separate Environments
- Always use different profiles for dev/staging/prod
- Never deploy to production without testing in dev first

### 3. Credential Security
- Never commit credentials to git
- Use IAM roles for EC2/Lambda instead of long-term credentials
- Rotate access keys regularly (every 90 days)
- Enable MFA for production accounts

### 4. Profile Validation
Always verify which account you're deploying to:
```bash
aws sts get-caller-identity --profile your-profile-name
```

### 5. Use samconfig.toml
After initial guided deployment, use the saved configuration:
```bash
# First time
./deploy.sh --profile my-profile --guided

# Saves to samconfig.toml, then subsequent deployments:
./deploy.sh --profile my-profile
```

## CI/CD Integration

For automated deployments (GitHub Actions, GitLab CI, etc.):

```yaml
# Example GitHub Actions
- name: Configure AWS Credentials
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-east-1

- name: Deploy SAM application
  run: |
    cd aws-lambda
    npm install
    npm run build
    sam build
    sam deploy --no-confirm-changeset --no-fail-on-empty-changeset
```

## Quick Reference

```bash
# Configure profile
aws configure --profile PROFILE_NAME

# List profiles
aws configure list-profiles

# Check current identity
aws sts get-caller-identity --profile PROFILE_NAME

# Deploy with profile (Bash)
./deploy.sh --profile PROFILE_NAME [--guided]

# Deploy with profile (PowerShell)
.\deploy.ps1 -Profile PROFILE_NAME [-Guided]

# View stack outputs
aws cloudformation describe-stacks \
  --stack-name sms-automation-stack \
  --profile PROFILE_NAME \
  --query 'Stacks[0].Outputs'

# Delete stack
sam delete --profile PROFILE_NAME --stack-name sms-automation-stack
```

---

**Remember:** Always double-check which profile and account you're deploying to before running the deployment script!

