# Changes Summary - Profile-Based Deployment with Existing SNS Topic

## Updates Made

### 1. ✅ Use Existing SNS Topic (Instead of Creating New One)

**Changed Files:**
- `aws-lambda/template.yaml`

**What Changed:**
- Removed creation of new SNS topic resource
- Added `IncomingSMSTopicArn` as a required parameter
- Lambda function now subscribes to your existing SNS topic
- No manual topic connection needed after deployment

**Before:**
```yaml
# Created a new topic, required manual subscription
IncomingSMSTopic:
  Type: AWS::SNS::Topic
```

**After:**
```yaml
# Uses your existing topic ARN as parameter
Parameters:
  IncomingSMSTopicArn:
    Type: String
    Description: ARN of existing SNS topic connected to your phone number
```

### 2. ✅ AWS Profile-Based Deployment

**New/Updated Files:**
- `aws-lambda/deploy.sh` - Enhanced Bash deployment script
- `aws-lambda/deploy.ps1` - Enhanced PowerShell deployment script
- `aws-lambda/DEPLOYMENT_PROFILES.md` - Complete profile guide
- `aws-lambda/README_DEPLOYMENT.md` - Quick deployment reference

**New Features:**

#### Bash Script
```bash
# Profile support
./deploy.sh --profile your-profile-name --guided

# Shows account info
# Validates profile before deployment
# Passes profile to all AWS commands
```

#### PowerShell Script
```powershell
# Profile support with PowerShell parameters
.\deploy.ps1 -Profile your-profile-name -Guided

# Profile validation
# Account/region display
# Error handling
```

**Benefits:**
- Deploy to multiple AWS accounts safely
- Clear visibility of which account you're deploying to
- Prevents accidental deployments to wrong accounts
- Better credential management

### 3. ✅ Updated Documentation

**Files Updated:**
- `QUICK_START.md` - Added profile usage, removed manual topic setup
- `aws-lambda/README.md` - Updated deployment section
- `aws-lambda/env.example` - Added profile and topic ARN examples

**New Documentation:**
- `aws-lambda/DEPLOYMENT_PROFILES.md` - Complete guide for AWS profiles
- `aws-lambda/README_DEPLOYMENT.md` - Quick deployment reference

## How to Use

### First Time Deployment

1. **Have your existing SNS topic ARN ready:**
   ```bash
   aws sns list-topics --profile your-profile-name
   ```

2. **Run deployment with profile:**
   
   **Bash (Linux/macOS):**
   ```bash
   cd aws-lambda
   ./deploy.sh --profile your-profile-name --guided
   ```
   
   **PowerShell (Windows):**
   ```powershell
   cd aws-lambda
   .\deploy.ps1 -AwsProfile your-profile-name -Guided
   ```

3. **Enter parameters when prompted:**
   - CalendlyWebhookSecret: Your Calendly secret
   - OriginationNumber: +12345678900
   - **IncomingSMSTopicArn**: `arn:aws:sns:us-east-1:123456789012:YourTopic` ← NEW!
   - BusinessName: Your Business

4. **Done!** No manual topic subscription needed

### Subsequent Deployments

```bash
# Bash
./deploy.sh --profile your-profile-name

# PowerShell
.\deploy.ps1 -AwsProfile your-profile-name
```

## What You DON'T Need to Do Anymore

❌ ~~Create new SNS topic~~  
❌ ~~Manually subscribe Lambda to topic~~  
❌ ~~Configure two-way SMS after deployment~~  
❌ ~~Use default AWS credentials~~

✅ Use your existing SNS topic  
✅ Lambda automatically subscribes  
✅ Two-way SMS already configured  
✅ Use named AWS profiles

## Deployment Script Features

### Profile Management
- ✅ Validates profile exists before deploying
- ✅ Shows AWS account ID and region
- ✅ Lists available profiles if invalid
- ✅ Passes profile to all AWS CLI commands

### User Experience
- ✅ Clear progress indicators (🚀, ✅, ❌)
- ✅ Helpful error messages
- ✅ Display deployment outputs automatically
- ✅ Shows next steps after deployment
- ✅ Reminds you of the profile command for future use

### Safety
- ✅ Confirms which account before deploying
- ✅ Prevents wrong-account deployments
- ✅ Validates credentials before starting
- ✅ Clean error handling with rollback

## Examples

### Deploy to Development
```bash
./deploy.sh --profile company-sms-dev --guided
```

### Deploy to Production
```bash
./deploy.sh --profile company-sms-prod --guided
```

### View Deployment Outputs
```bash
aws cloudformation describe-stacks \
  --stack-name sms-automation-stack \
  --profile your-profile-name \
  --query 'Stacks[0].Outputs'
```

### Quick Redeploy After Code Changes
```bash
cd aws-lambda
npm run build
./deploy.sh --profile your-profile-name
```

## Configuration Files

### samconfig.toml (Generated After First Deploy)
Stores your deployment configuration:
- Stack name
- Region
- All parameters
- Deployment preferences

After first `--guided` deployment, you can deploy without prompts:
```bash
./deploy.sh --profile your-profile-name
```

### env.example
Updated to include:
- AWS_PROFILE example
- INCOMING_SMS_TOPIC_ARN example
- Clear descriptions for all variables

## Breaking Changes

### ⚠️ If You Already Deployed

If you already have a deployment WITHOUT these changes:

1. **Get your existing topic ARN:**
   ```bash
   aws cloudformation describe-stacks \
     --stack-name sms-automation-stack \
     --query 'Stacks[0].Outputs[?OutputKey==`IncomingSMSTopicArn`].OutputValue' \
     --output text
   ```

2. **Update your deployment:**
   ```bash
   ./deploy.sh --profile your-profile-name --guided
   ```
   
3. **Enter the SAME topic ARN** from step 1 when prompted

This will update your stack to use the existing topic without creating a new one.

## Documentation Structure

```
aws-lambda/
├── deploy.sh                    # Bash deployment (profile-aware)
├── deploy.ps1                   # PowerShell deployment (profile-aware)
├── DEPLOYMENT_PROFILES.md       # Complete AWS profile guide
├── README_DEPLOYMENT.md         # Quick deployment reference
├── env.example                  # Updated with profile & topic ARN
├── template.yaml                # Uses existing topic parameter
└── ...

Root/
├── QUICK_START.md              # Updated for profiles & existing topic
├── AWS_SETUP_GUIDE.md          # Original detailed guide
├── ARCHITECTURE.md             # System architecture
└── CHANGES_SUMMARY.md          # This file
```

## Support

For detailed guides, see:
- **Profile Setup**: `aws-lambda/DEPLOYMENT_PROFILES.md`
- **Quick Deploy**: `aws-lambda/README_DEPLOYMENT.md`
- **Complete Setup**: `AWS_SETUP_GUIDE.md`
- **Architecture**: `ARCHITECTURE.md`

## Quick Troubleshooting

**Profile not found?**
```bash
aws configure --profile your-profile-name
```

**Wrong account?**
```bash
aws sts get-caller-identity --profile your-profile-name
```

**Need topic ARN?**
```bash
aws sns list-topics --profile your-profile-name
```

---

**Ready to deploy!** 🚀

```bash
cd aws-lambda
./deploy.sh --profile your-profile-name --guided
```

