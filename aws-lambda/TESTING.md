# Testing Guide

Comprehensive testing guide for the AWS SMS Automation system.

## Pre-Deployment Testing

### 1. TypeScript Compilation Test

```bash
cd aws-lambda
npm install
npm run build
```

**Expected:** No compilation errors, `dist/` folder created.

### 2. SAM Template Validation

```bash
sam validate --lint
```

**Expected:** `template.yaml is a valid SAM Template`

## Post-Deployment Testing

### 1. Health Check - Verify All Resources

```bash
# Check Lambda functions
aws lambda list-functions --query 'Functions[?contains(FunctionName, `Calendly`) || contains(FunctionName, `SMS`) || contains(FunctionName, `FollowUp`)].FunctionName'

# Check DynamoDB table
aws dynamodb describe-table --table-name SMSConversations

# Check Step Functions
aws stepfunctions list-state-machines --query 'stateMachines[?contains(name, `SMS`)].name'

# Check API Gateway
aws cloudformation describe-stacks \
  --stack-name sms-automation-stack \
  --query 'Stacks[0].Outputs[?OutputKey==`CalendlyWebhookUrl`].OutputValue' \
  --output text
```

### 2. Test Lambda Functions Individually

#### Test CalendlyWebhookHandler

```bash
# Create test event
cat > test-calendly-event.json << EOF
{
  "body": "$(cat test-payload.json | jq -c . | sed 's/"/\\"/g')",
  "headers": {
    "content-type": "application/json"
  },
  "httpMethod": "POST",
  "isBase64Encoded": false
}
EOF

# Invoke Lambda
aws lambda invoke \
  --function-name CalendlyWebhookHandler \
  --payload file://test-calendly-event.json \
  --cli-binary-format raw-in-base64-out \
  response.json

# Check response
cat response.json
```

**Expected Response:**
```json
{
  "statusCode": 200,
  "body": "{\"message\":\"Webhook processed successfully\",\"conversationId\":\"conv-...\",\"followUpScheduled\":\"...\"}"
}
```

#### Test SMS Sending Directly

```bash
# Send test SMS
aws sns publish \
  --phone-number "+12345678900" \
  --message "Test SMS from automation system" \
  --message-attributes '{
    "AWS.SNS.SMS.SMSType": {
      "DataType": "String",
      "StringValue": "Transactional"
    },
    "AWS.MM.SMS.OriginationNumber": {
      "DataType": "String",
      "StringValue": "YOUR_SNS_NUMBER"
    }
  }'
```

**Expected:** SMS received on test phone.

### 3. End-to-End Test - Complete Flow

#### Step 1: Create Test Booking

1. Go to your Calendly booking page
2. Book an appointment with:
   - Name: Test User
   - Email: test@example.com
   - Phone: YOUR_TEST_PHONE_NUMBER
3. Complete the booking

#### Step 2: Verify Initial SMS

**Expected Timeline:**
- **Immediate**: Receive SMS on test phone
- **Content**: Should include appointment details and your name

**Check Logs:**
```bash
sam logs -n CalendlyWebhookHandler --start-time '5min ago'
```

**Check DynamoDB:**
```bash
aws dynamodb query \
  --table-name SMSConversations \
  --key-condition-expression "phoneNumber = :phone" \
  --expression-attribute-values '{":phone":{"S":"YOUR_PHONE_NUMBER"}}' \
  --limit 1
```

#### Step 3: Verify Step Functions Started

```bash
# List recent executions
aws stepfunctions list-executions \
  --state-machine-arn $(aws cloudformation describe-stacks \
    --stack-name sms-automation-stack \
    --query 'Stacks[0].Outputs[?OutputKey==`StateMachineArn`].OutputValue' \
    --output text) \
  --max-results 5
```

**Expected:** One execution in "RUNNING" state.

#### Step 4: Test Response Handling

Reply to the SMS you received with any message (e.g., "Thanks!").

**Check Logs:**
```bash
sam logs -n IncomingSMSHandler --start-time '1min ago'
```

**Check DynamoDB Update:**
```bash
aws dynamodb query \
  --table-name SMSConversations \
  --key-condition-expression "phoneNumber = :phone" \
  --expression-attribute-values '{":phone":{"S":"YOUR_PHONE_NUMBER"}}' \
  --limit 1
```

**Expected:** `clientResponded: true` in the record.

#### Step 5: Verify Follow-up (If No Response)

If you don't reply to the initial SMS:

**Expected Timeline:**
- **After 30 minutes**: Receive follow-up SMS

**Monitor Step Functions:**
```bash
# Check execution details
aws stepfunctions describe-execution \
  --execution-arn YOUR_EXECUTION_ARN
```

**Check Logs:**
```bash
sam logs -n FollowUpSender --start-time '35min ago'
```

### 4. Load Testing (Optional)

#### Simulate Multiple Bookings

```bash
#!/bin/bash
# test-load.sh

WEBHOOK_URL="YOUR_WEBHOOK_URL"

for i in {1..10}; do
  curl -X POST $WEBHOOK_URL \
    -H "Content-Type: application/json" \
    -d '{
      "event": "invitee.created",
      "payload": {
        "event_type": {"name": "Test Appointment '$i'"},
        "event": {
          "start_time": "'$(date -u -d "+1 day" +%Y-%m-%dT%H:%M:%SZ)'",
          "end_time": "'$(date -u -d "+1 day +30 minutes" +%Y-%m-%dT%H:%M:%SZ)'"
        },
        "invitee": {
          "name": "Test User '$i'",
          "email": "test'$i'@example.com"
        },
        "questions_and_answers": [
          {
            "question": "What is your phone number?",
            "answer": "+1555000'$(printf "%04d" $i)'"
          }
        ]
      }
    }' &
  
  sleep 0.1
done

wait
echo "Load test complete"
```

**Monitor:**
```bash
# Watch Lambda metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/Lambda \
  --metric-name Invocations \
  --dimensions Name=FunctionName,Value=CalendlyWebhookHandler \
  --start-time $(date -u -d '10 minutes ago' +%Y-%m-%dT%H:%M:%S) \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
  --period 60 \
  --statistics Sum
```

## Testing Checklist

### Initial Deployment
- [ ] All Lambda functions deployed
- [ ] DynamoDB table created
- [ ] Step Functions state machine active
- [ ] API Gateway endpoint accessible
- [ ] SNS topic created

### Configuration
- [ ] Two-way SMS enabled on phone number
- [ ] SNS topic subscribed to phone number
- [ ] Calendly webhook configured
- [ ] Webhook signature verification working
- [ ] Environment variables set correctly

### Functionality
- [ ] Initial SMS sends immediately
- [ ] Message includes correct personalization
- [ ] DynamoDB record created correctly
- [ ] Step Functions execution starts
- [ ] Incoming SMS responses tracked
- [ ] Follow-up SMS sends after 30 minutes
- [ ] Follow-up skipped if already responded

### Edge Cases
- [ ] Invalid phone number handling
- [ ] Missing phone number in payload
- [ ] Malformed webhook payload
- [ ] Duplicate bookings
- [ ] Cancellations (if implemented)

### Performance
- [ ] Lambda cold start < 3 seconds
- [ ] SMS delivery < 10 seconds
- [ ] DynamoDB writes < 100ms
- [ ] API response < 1 second

### Security
- [ ] Webhook signature verification enabled
- [ ] Invalid signatures rejected
- [ ] IAM roles follow least privilege
- [ ] Phone numbers masked in logs

## Troubleshooting Tests

### Test 1: Webhook Signature Verification

```bash
# Send webhook WITHOUT signature (should fail)
curl -X POST YOUR_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d @test-payload.json

# Expected: 401 Unauthorized or 400 Bad Request
```

### Test 2: Invalid Phone Number

```bash
# Send webhook with invalid phone
curl -X POST YOUR_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{
    "event": "invitee.created",
    "payload": {
      "event_type": {"name": "Test"},
      "event": {
        "start_time": "2025-10-15T14:00:00Z",
        "end_time": "2025-10-15T14:30:00Z"
      },
      "invitee": {
        "name": "Test User",
        "email": "test@example.com"
      },
      "questions_and_answers": [
        {
          "question": "Phone?",
          "answer": "invalid"
        }
      ]
    }
  }'

# Expected: Error logged, no SMS sent
```

### Test 3: DynamoDB Query Performance

```bash
# Query conversations
time aws dynamodb query \
  --table-name SMSConversations \
  --key-condition-expression "phoneNumber = :phone" \
  --expression-attribute-values '{":phone":{"S":"+12345678900"}}' \
  --limit 1

# Expected: < 100ms
```

### Test 4: Step Functions Execution Time

```bash
# Check execution history
aws stepfunctions get-execution-history \
  --execution-arn YOUR_EXECUTION_ARN \
  --query 'events[?type==`TaskStateEntered` || type==`TaskStateExited`].[timestamp, type]'

# Verify wait time is approximately 30 minutes
```

## Monitoring Tests

### Set Up Test Alarms

```bash
# Create test alarm for Lambda errors
aws cloudwatch put-metric-alarm \
  --alarm-name "SMS-Lambda-Errors-Test" \
  --alarm-description "Alert on Lambda errors" \
  --metric-name Errors \
  --namespace AWS/Lambda \
  --statistic Sum \
  --period 300 \
  --threshold 1 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1 \
  --dimensions Name=FunctionName,Value=CalendlyWebhookHandler

# Trigger error intentionally
# ... send malformed request ...

# Wait for alarm
aws cloudwatch describe-alarms \
  --alarm-names "SMS-Lambda-Errors-Test"

# Clean up
aws cloudwatch delete-alarms \
  --alarm-names "SMS-Lambda-Errors-Test"
```

## Rollback Testing

```bash
# Create backup of current state
aws dynamodb create-backup \
  --table-name SMSConversations \
  --backup-name "pre-test-backup"

# Deploy changes
sam deploy

# If issues, rollback
sam delete
# ... redeploy previous version ...

# Or use CloudFormation rollback
aws cloudformation rollback-stack \
  --stack-name sms-automation-stack
```

## Automated Test Suite (Future Enhancement)

```typescript
// Example test structure
describe('SMS Automation System', () => {
  describe('Calendly Webhook', () => {
    it('should process valid webhook', async () => {});
    it('should reject invalid signature', async () => {});
    it('should extract phone number', async () => {});
  });
  
  describe('SMS Sending', () => {
    it('should send initial SMS', async () => {});
    it('should format message correctly', async () => {});
  });
  
  describe('Follow-up Logic', () => {
    it('should wait 30 minutes', async () => {});
    it('should skip if responded', async () => {});
  });
});
```

## Test Results Documentation

After testing, document:

1. **Test Date**: When tests were performed
2. **Test Environment**: AWS region, account, etc.
3. **Results**: Pass/fail for each test
4. **Issues Found**: Any bugs or unexpected behavior
5. **Performance Metrics**: Response times, cold starts, etc.
6. **Recommendations**: Any improvements needed

## Cleanup After Testing

```bash
# Delete test DynamoDB items
aws dynamodb scan --table-name SMSConversations \
  --filter-expression "contains(clientName, :test)" \
  --expression-attribute-values '{":test":{"S":"Test"}}' \
  --projection-expression "phoneNumber,conversationId" | \
  jq -r '.Items[] | "\(.phoneNumber.S) \(.conversationId.S)"' | \
  while read phone convId; do
    aws dynamodb delete-item \
      --table-name SMSConversations \
      --key "{\"phoneNumber\":{\"S\":\"$phone\"},\"conversationId\":{\"S\":\"$convId\"}}"
  done

# Stop running Step Functions
aws stepfunctions list-executions \
  --state-machine-arn YOUR_STATE_MACHINE_ARN \
  --status-filter RUNNING | \
  jq -r '.executions[].executionArn' | \
  while read arn; do
    aws stepfunctions stop-execution --execution-arn "$arn"
  done
```

---

**Remember:** Always test in a non-production environment first!


