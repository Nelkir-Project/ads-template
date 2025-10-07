#!/bin/bash

# AWS SMS Automation Deployment Script
# This script helps deploy the SMS automation system to AWS

set -e

echo "🚀 AWS SMS Automation - Deployment Script"
echo "=========================================="
echo ""

# Parse command line arguments
AWS_PROFILE=""
GUIDED_DEPLOY=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --profile)
      AWS_PROFILE="$2"
      shift 2
      ;;
    --guided)
      GUIDED_DEPLOY=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 [--profile PROFILE_NAME] [--guided]"
      exit 1
      ;;
  esac
done

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install it first."
    echo "   Visit: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if SAM CLI is installed
if ! command -v sam &> /dev/null; then
    echo "❌ AWS SAM CLI not found. Please install it first."
    echo "   Visit: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 20.x or later."
    exit 1
fi

echo "✅ All prerequisites found!"

# Display AWS profile info if specified
if [ -n "$AWS_PROFILE" ]; then
    echo "📌 Using AWS Profile: $AWS_PROFILE"
    export AWS_PROFILE
    
    # Verify profile exists and is valid
    if ! aws sts get-caller-identity --profile "$AWS_PROFILE" &> /dev/null; then
        echo "❌ AWS profile '$AWS_PROFILE' is invalid or not configured."
        echo "   Available profiles:"
        aws configure list-profiles
        exit 1
    fi
    
    ACCOUNT_ID=$(aws sts get-caller-identity --profile "$AWS_PROFILE" --query Account --output text)
    REGION=$(aws configure get region --profile "$AWS_PROFILE" || echo "us-east-1")
    echo "   Account: $ACCOUNT_ID"
    echo "   Region: $REGION"
else
    echo "⚠️  No AWS profile specified. Using default credentials."
    echo "   To use a specific profile, run: $0 --profile YOUR_PROFILE_NAME"
fi

echo ""

# Check if this is first deployment
if [ ! -f "samconfig.toml" ] || [ "$GUIDED_DEPLOY" = true ]; then
    echo "📝 First time deployment (or guided mode)."
    echo "   You'll need to provide the following information:"
    echo "   - Calendly webhook secret"
    echo "   - AWS SNS phone number (E.164 format)"
    echo "   - Incoming SMS Topic ARN (your existing SNS topic)"
    echo "   - Business name"
    echo ""
    read -p "Press Enter to continue..."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build
echo "✅ Build complete"
echo ""

# Build SAM
echo "🏗️  Building SAM application..."
sam build
echo "✅ SAM build complete"
echo ""

# Deploy
DEPLOY_CMD="sam deploy"

if [ -n "$AWS_PROFILE" ]; then
    DEPLOY_CMD="$DEPLOY_CMD --profile $AWS_PROFILE"
fi

if [ "$GUIDED_DEPLOY" = true ] || [ ! -f "samconfig.toml" ]; then
    echo "🚀 Starting guided deployment..."
    echo ""
    echo "Important notes:"
    echo "  - Stack name: sms-automation-stack (recommended)"
    echo "  - Region: $REGION (or your preferred region)"
    echo "  - CalendlyWebhookSecret: Your Calendly webhook signing secret"
    echo "  - OriginationNumber: Your AWS SNS phone number (+1234567890)"
    echo "  - IncomingSMSTopicArn: ARN of your existing SNS topic"
    echo "  - BusinessName: Your business name"
    echo "  - Allow IAM role creation: Y"
    echo "  - Confirm changeset: Y"
    echo ""
    $DEPLOY_CMD --guided
else
    echo "🚀 Deploying with saved configuration..."
    $DEPLOY_CMD
fi

echo ""
echo "✅ Deployment complete!"
echo ""

# Get outputs
echo "📋 Deployment Outputs:"
echo "====================="
DESCRIBE_CMD="aws cloudformation describe-stacks --stack-name sms-automation-stack"

if [ -n "$AWS_PROFILE" ]; then
    DESCRIBE_CMD="$DESCRIBE_CMD --profile $AWS_PROFILE"
fi

$DESCRIBE_CMD --query 'Stacks[0].Outputs[*].[OutputKey,OutputValue]' --output table 2>/dev/null || {
    echo "Run the following to see outputs:"
    if [ -n "$AWS_PROFILE" ]; then
        echo "aws cloudformation describe-stacks --stack-name sms-automation-stack --profile $AWS_PROFILE --query 'Stacks[0].Outputs'"
    else
        echo "aws cloudformation describe-stacks --stack-name sms-automation-stack --query 'Stacks[0].Outputs'"
    fi
}

echo ""
echo "📝 Next Steps:"
echo "=============="
echo "1. Your SNS topic is already connected to your phone number ✓"
echo "2. Set up Calendly webhook with the CalendlyWebhookUrl (from outputs above)"
echo "3. Add phone number question to your Calendly event"
echo "4. Test with a booking"
echo ""
echo "See QUICK_START.md for detailed instructions."
echo ""
echo "💡 Tip: To deploy again with your profile, run:"
if [ -n "$AWS_PROFILE" ]; then
    echo "   ./deploy.sh --profile $AWS_PROFILE"
else
    echo "   ./deploy.sh --profile YOUR_PROFILE_NAME"
fi
echo ""

