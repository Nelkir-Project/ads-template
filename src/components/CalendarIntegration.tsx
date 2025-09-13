import { useState, useEffect } from 'react';

interface SMSStatus {
  twilioConfigured: boolean;
  fromNumber: string | null;
  recipientsConfigured: boolean;
}

export function CalendarIntegration() {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [smsStatus, setSmsStatus] = useState<SMSStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const API_BASE = '/api';

  useEffect(() => {
    checkSMSStatus();
    setWebhookUrl(`${window.location.origin}/api/webhooks/calendly`);
  }, []);

  const checkSMSStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/sms/status`);
      const data = await response.json();
      setSmsStatus(data.configuration);
    } catch (error) {
      console.error('Error checking SMS status:', error);
    }
  };

  const testSMS = async () => {
    const phoneNumber = prompt('Enter phone number for test SMS (e.g., +1234567890):');
    if (!phoneNumber) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/sms/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          message: '📅 Test SMS from your Calendar Integration! This confirms SMS notifications are working correctly.'
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('✅ Test SMS sent successfully!');
      } else {
        setMessage(`❌ Failed to send test SMS: ${data.error}`);
      }
    } catch (error) {
      console.error('Error sending test SMS:', error);
      setMessage('❌ Failed to send test SMS');
    } finally {
      setLoading(false);
    }
  };

  const testCalendarSMS = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/calendar/test-sms-trigger`, {
        method: 'POST',
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage(`✅ Calendar SMS test completed! Processed ${data.eventsProcessed} events. Check logs for details.`);
      } else {
        setMessage(`❌ Calendar SMS test failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error testing calendar SMS:', error);
      setMessage('❌ Failed to test calendar SMS');
    } finally {
      setLoading(false);
    }
  };

  const formatEventTime = (event: CalendarEvent) => {
    const startTime = new Date(event.start?.dateTime || event.start?.date || '');
    const endTime = new Date(event.end?.dateTime || event.end?.date || '');
    
    return `${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📅 Calendly + Twilio SMS Integration
      </h2>

      {/* SMS Status */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">📱 SMS Configuration Status</h3>
        {smsStatus ? (
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-2 rounded ${smsStatus.twilioConfigured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              Twilio Configured: {smsStatus.twilioConfigured ? '✅' : '❌'}
            </div>
            <div className={`p-2 rounded ${smsStatus.recipientsConfigured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              Recipients Configured: {smsStatus.recipientsConfigured ? '✅' : '❌'}
            </div>
            <div className="p-2 rounded bg-blue-100 text-blue-800">
              From Number: {smsStatus.fromNumber || 'Not set'}
            </div>
          </div>
        ) : (
          <div className="text-gray-600">Loading SMS status...</div>
        )}
      </div>

      {/* Calendly Webhook Info */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">🔗 Calendly Webhook</h3>
        <div className="space-y-2 text-sm">
          <div>
            Webhook URL:
            <code className="ml-2 bg-gray-100 px-2 py-1 rounded">{webhookUrl}</code>
          </div>
          <div className="text-gray-600">Events: <span className="font-mono">invitee.created</span>, <span className="font-mono">invitee.canceled</span></div>
          <div className="text-gray-600">Header Secret: set <code className="bg-gray-100 px-1 rounded">CALENDLY_WEBHOOK_SECRET</code> in server .env</div>
        </div>
      </div>

      {/* Test SMS */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">🧪 Test SMS</h3>
        <div className="space-y-3">
          <button
            onClick={testSMS}
            disabled={loading}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-50 mr-3"
          >
            {loading ? 'Sending...' : '📱 Send Test SMS'}
          </button>
        </div>
        <div className="mt-3 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
          <p className="text-sm text-yellow-800">
            <strong>📋 For Development:</strong> Real-time webhooks require HTTPS. Use a tunnel like ngrok while testing Calendly webhooks.
          </p>
        </div>
      </div>

      {/* Status Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 
          message.includes('❌') ? 'bg-red-100 text-red-800' : 
          'bg-blue-100 text-blue-800'
        }`}>
          {message}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">📋 Setup Instructions</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Create a <code>.env</code> file with Twilio and Calendly settings</li>
          <li>Set <code>TWILIO_ACCOUNT_SID</code>, <code>TWILIO_AUTH_TOKEN</code>, <code>TWILIO_FROM_NUMBER</code></li>
          <li>Optionally set <code>BUSINESS_NOTIFICATION_PHONE</code> and <code>SEND_BUSINESS_COPY=true</code></li>
          <li>Set <code>CALENDLY_WEBHOOK_SECRET</code> to verify webhook signatures</li>
          <li>In Calendly, add a webhook to the URL above for invitee.created/canceled</li>
          <li>Test SMS functionality to ensure everything works</li>
        </ol>
        
        <div className="mt-4 p-3 bg-green-50 rounded border-l-4 border-green-400">
          <h4 className="font-semibold text-green-800 mb-2">📱 How Client SMS Works:</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• System extracts phone numbers from Calendly invitee and Q&A fields</li>
            <li>• Clients receive personalized confirmation SMS messages</li>
            <li>• Phone numbers can be in form responses or invitee details</li>
            <li>• Supports formats: +1234567890, (123) 456-7890, 123-456-7890</li>
            <li>• Business can optionally receive booking notifications too</li>
          </ul>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Example Calendly Payload (invitee.created):</h4>
          <div className="text-sm text-yellow-700 font-mono bg-white p-2 rounded">{{"event":"invitee.created","payload":{"invitee":{"name":"John Doe","sms_reminder_number":"+1-234-567-8900"},"event_type":{"name":"Consultation"},"start_time":"2025-01-01T10:00:00Z","end_time":"2025-01-01T10:30:00Z"}}}</div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
          <h4 className="font-semibold text-blue-800 mb-2">🔒 HTTPS Requirement for Live Webhooks:</h4>
          <div className="text-sm text-blue-700 space-y-2">
            Use a tunnel like <a href="https://ngrok.com/download" target="_blank" className="underline">ngrok</a> during development. Run <code className="bg-white px-1 rounded">ngrok http 3001</code> and use the HTTPS URL for Calendly webhooks.
          </div>
        </div>
      </div>
    </div>
  );
}
