# AWS SMS Automation Deployment Script (PowerShell)
# This script helps deploy the SMS automation system to AWS

param(
    [string]$AwsProfile = "",
    [switch]$Guided
)

$ErrorActionPreference = "Stop"

Write-Host "AWS SMS Automation - Deployment Script" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Check if AWS CLI is installed
if (-not (Get-Command aws -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] AWS CLI not found. Please install it first." -ForegroundColor Red
    Write-Host "        Visit: https://aws.amazon.com/cli/"
    exit 1
}

# Check if SAM CLI is installed
if (-not (Get-Command sam -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] AWS SAM CLI not found. Please install it first." -ForegroundColor Red
    Write-Host "        Visit: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html"
    exit 1
}

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Node.js not found. Please install Node.js 20.x or later." -ForegroundColor Red
    exit 1
}

Write-Host "[SUCCESS] All prerequisites found!" -ForegroundColor Green

# Display AWS profile info if specified
if ($AwsProfile) {
    Write-Host "[INFO] Using AWS Profile: $AwsProfile" -ForegroundColor Cyan
    $env:AWS_PROFILE = $AwsProfile
    
    # Verify profile exists and is valid
    try {
        $null = aws sts get-caller-identity --profile $AwsProfile 2>&1
        if ($LASTEXITCODE -ne 0) {
            throw "Profile verification failed"
        }
        
        $accountId = (aws sts get-caller-identity --profile $AwsProfile --query Account --output text)
        $region = (aws configure get region --profile $AwsProfile)
        if (-not $region) { $region = "us-east-1" }
        
        Write-Host "       Account: $accountId" -ForegroundColor Gray
        Write-Host "       Region: $region" -ForegroundColor Gray
    }
    catch {
        Write-Host "[ERROR] AWS profile '$AwsProfile' is invalid or not configured." -ForegroundColor Red
        Write-Host "        Available profiles:" -ForegroundColor Yellow
        aws configure list-profiles
        exit 1
    }
}
else {
    Write-Host "[WARNING] No AWS profile specified. Using default credentials." -ForegroundColor Yellow
    Write-Host "          To use a specific profile, run: .\deploy.ps1 -AwsProfile YOUR_PROFILE_NAME" -ForegroundColor Yellow
}

Write-Host ""

# Check if this is first deployment
if ((-not (Test-Path "samconfig.toml")) -or $Guided) {
    Write-Host "[INFO] First time deployment (or guided mode)." -ForegroundColor Yellow
    Write-Host "       You'll need to provide the following information:"
    Write-Host "       - Calendly webhook secret"
    Write-Host "       - AWS SNS phone number (E.164 format)"
    Write-Host "       - Incoming SMS Topic ARN (your existing SNS topic)"
    Write-Host "       - Business name"
    Write-Host ""
    Read-Host "Press Enter to continue"
}

# Install dependencies
Write-Host "[BUILD] Installing dependencies..." -ForegroundColor Yellow
npm install
Write-Host "[SUCCESS] Dependencies installed" -ForegroundColor Green
Write-Host ""

# Build TypeScript
Write-Host "[BUILD] Building TypeScript..." -ForegroundColor Yellow
npm run build
Write-Host "[SUCCESS] Build complete" -ForegroundColor Green
Write-Host ""

# Build SAM
Write-Host "[BUILD] Building SAM application..." -ForegroundColor Yellow
sam build
Write-Host "[SUCCESS] SAM build complete" -ForegroundColor Green
Write-Host ""

# Deploy
$deployArgs = @()

if ($AwsProfile) {
    $deployArgs += "--profile"
    $deployArgs += $AwsProfile
}

if ($Guided -or (-not (Test-Path "samconfig.toml"))) {
    Write-Host "[DEPLOY] Starting guided deployment..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Important notes:"
    Write-Host "  - Stack name: sms-automation-stack (recommended)"
    if ($region) {
        Write-Host "  - Region: $region (or your preferred region)"
    } else {
        Write-Host "  - Region: us-east-1 (or your preferred region)"
    }
    Write-Host "  - CalendlyWebhookSecret: Your Calendly webhook signing secret"
    Write-Host "  - OriginationNumber: Your AWS SNS phone number (+1234567890)"
    Write-Host "  - IncomingSMSTopicArn: ARN of your existing SNS topic"
    Write-Host "  - BusinessName: Your business name"
    Write-Host "  - Allow IAM role creation: Y"
    Write-Host "  - Confirm changeset: Y"
    Write-Host ""
    $deployArgs += "--guided"
    sam deploy @deployArgs
} else {
    Write-Host "[DEPLOY] Deploying with saved configuration..." -ForegroundColor Cyan
    sam deploy @deployArgs
}

Write-Host ""
Write-Host "[SUCCESS] Deployment complete!" -ForegroundColor Green
Write-Host ""

# Get outputs
Write-Host ""
Write-Host "Deployment Outputs:" -ForegroundColor Cyan
Write-Host "==================" -ForegroundColor Cyan
try {
    $describeArgs = @(
        "cloudformation", "describe-stacks",
        "--stack-name", "sms-automation-stack",
        "--query", "Stacks[0].Outputs[*].[OutputKey,OutputValue]",
        "--output", "table"
    )
    
    if ($AwsProfile) {
        $describeArgs += "--profile"
        $describeArgs += $AwsProfile
    }
    
    & aws @describeArgs
} catch {
    Write-Host "Run the following to see outputs:"
    if ($AwsProfile) {
        Write-Host "aws cloudformation describe-stacks --stack-name sms-automation-stack --profile $AwsProfile --query 'Stacks[0].Outputs'"
    } else {
        Write-Host "aws cloudformation describe-stacks --stack-name sms-automation-stack --query 'Stacks[0].Outputs'"
    }
}

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "===========" -ForegroundColor Cyan
Write-Host "1. Your SNS topic is already connected to your phone number [OK]" -ForegroundColor Green
Write-Host "2. Set up Calendly webhook with the CalendlyWebhookUrl (from outputs above)"
Write-Host "3. Add phone number question to your Calendly event"
Write-Host "4. Test with a booking"
Write-Host ""
Write-Host "See QUICK_START.md for detailed instructions." -ForegroundColor Yellow
Write-Host ""
Write-Host "[TIP] To deploy again with your profile, run:" -ForegroundColor Cyan
if ($AwsProfile) {
    Write-Host "      .\deploy.ps1 -AwsProfile $AwsProfile" -ForegroundColor Gray
} else {
    Write-Host "      .\deploy.ps1 -AwsProfile YOUR_PROFILE_NAME" -ForegroundColor Gray
}
Write-Host ""

