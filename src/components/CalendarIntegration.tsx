import { useState, useEffect } from 'react';

interface CalendarEvent {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
  location?: string;
  attendees?: Array<{ email: string }>;
}

interface SMSStatus {
  awsConfigured: boolean;
  recipientsConfigured: boolean;
  topicArnConfigured: boolean;
  region: string;
}

export function CalendarIntegration() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [smsStatus, setSmsStatus] = useState<SMSStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const API_BASE = 'http://localhost:3001/api';

  useEffect(() => {
    checkSMSStatus();
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

  const startAuthorization = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/calendar/auth`);
      const data = await response.json();
      
      if (data.authUrl) {
        // Open authorization URL in new window
        window.open(data.authUrl, '_blank', 'width=500,height=600');
        setMessage('Please complete the authorization in the new window, then click "Check Authorization"');
      }
    } catch (error) {
      console.error('Error starting authorization:', error);
      setMessage('Failed to start authorization process');
    } finally {
      setLoading(false);
    }
  };

  const checkAuthorization = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/calendar/events`);
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
        setIsAuthorized(true);
        setMessage('✅ Authorization successful! Calendar monitoring is active.');
      } else {
        setMessage('❌ Authorization not complete. Please try again.');
      }
    } catch (error) {
      console.error('Error checking authorization:', error);
      setMessage('❌ Failed to check authorization status');
    } finally {
      setLoading(false);
    }
  };

  const setupCalendarWatch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/calendar/watch`, {
        method: 'POST',
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage('✅ Calendar watching enabled! SMS notifications will be sent for new bookings.');
      } else {
        setMessage(`❌ Failed to setup calendar watch: ${data.error}`);
      }
    } catch (error) {
      console.error('Error setting up calendar watch:', error);
      setMessage('❌ Failed to setup calendar monitoring');
    } finally {
      setLoading(false);
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
        📅 Google Calendar SMS Integration
      </h2>

      {/* SMS Status */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">📱 SMS Configuration Status</h3>
        {smsStatus ? (
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-2 rounded ${smsStatus.awsConfigured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              AWS Configured: {smsStatus.awsConfigured ? '✅' : '❌'}
            </div>
            <div className={`p-2 rounded ${smsStatus.recipientsConfigured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              Recipients Configured: {smsStatus.recipientsConfigured ? '✅' : '❌'}
            </div>
            <div className="p-2 rounded bg-blue-100 text-blue-800">
              AWS Region: {smsStatus.region}
            </div>
            <div className={`p-2 rounded ${smsStatus.topicArnConfigured ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              SNS Topic: {smsStatus.topicArnConfigured ? '✅ Configured' : '⚠️ Optional'}
            </div>
          </div>
        ) : (
          <div className="text-gray-600">Loading SMS status...</div>
        )}
      </div>

      {/* Authorization Section */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">🔐 Google Calendar Authorization</h3>
        
        {!isAuthorized ? (
          <div className="space-y-3">
            <button
              onClick={startAuthorization}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Starting...' : '🚀 Start Authorization'}
            </button>
            
            <button
              onClick={checkAuthorization}
              disabled={loading}
              className="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Checking...' : '✅ Check Authorization'}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-green-600 font-semibold">✅ Authorized successfully!</div>
            
            <button
              onClick={setupCalendarWatch}
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Setting up...' : '👀 Enable SMS Notifications'}
            </button>
          </div>
        )}
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
          
          <button
            onClick={testCalendarSMS}
            disabled={loading || !isAuthorized}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Testing...' : '📅 Test Calendar SMS'}
          </button>
        </div>
        
        <div className="mt-3 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
          <p className="text-sm text-yellow-800">
            <strong>📋 For Development:</strong> Real-time webhooks require HTTPS. Use the "Test Calendar SMS" button to manually trigger SMS for existing calendar events, or use ngrok for live webhooks.
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

      {/* Recent Events */}
      {events.length > 0 && (
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-3">📅 Recent Calendar Events</h3>
          <div className="space-y-2">
            {events.map((event) => (
              <div key={event.id} className="p-3 bg-gray-50 rounded">
                <div className="font-semibold">{event.summary || 'No Title'}</div>
                <div className="text-sm text-gray-600">{formatEventTime(event)}</div>
                {event.location && (
                  <div className="text-sm text-gray-600">📍 {event.location}</div>
                )}
                {event.attendees && (
                  <div className="text-sm text-gray-600">
                    👥 {event.attendees.map(a => a.email).join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">📋 Setup Instructions</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Create a <code>.env</code> file with your API credentials</li>
          <li>Set up Google Calendar API credentials in Google Cloud Console</li>
          <li>Configure AWS SNS credentials for SMS delivery</li>
          <li>Set your business name and phone in environment variables</li>
          <li>Click "Start Authorization" and complete Google OAuth</li>
          <li>Enable SMS notifications to start monitoring calendar events</li>
          <li>Test SMS functionality to ensure everything works</li>
        </ol>
        
        <div className="mt-4 p-3 bg-green-50 rounded border-l-4 border-green-400">
          <h4 className="font-semibold text-green-800 mb-2">📱 How Client SMS Works:</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• System automatically extracts phone numbers from calendar events</li>
            <li>• Clients receive personalized confirmation SMS messages</li>
            <li>• Phone numbers can be in event description, attendee name, or location</li>
            <li>• Supports formats: +1234567890, (123) 456-7890, 123-456-7890</li>
            <li>• Business can optionally receive booking notifications too</li>
          </ul>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Example Calendar Event:</h4>
          <div className="text-sm text-yellow-700 font-mono bg-white p-2 rounded">
            Title: Hair Cut Appointment<br/>
            Description: Client: John Doe<br/>
            Phone: +1-234-567-8900<br/>
            Service: Cut and Style
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
          <h4 className="font-semibold text-blue-800 mb-2">🔒 HTTPS Requirement for Live Webhooks:</h4>
          <div className="text-sm text-blue-700 space-y-2">
            <p><strong>Option 1 - ngrok (Recommended):</strong></p>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>Install ngrok from <a href="https://ngrok.com/download" target="_blank" className="underline">ngrok.com/download</a></li>
              <li>Run: <code className="bg-white px-1 rounded">ngrok http 3001</code></li>
              <li>Copy the HTTPS URL (e.g., https://abc123.ngrok.io)</li>
              <li>Update .env: <code className="bg-white px-1 rounded">WEBHOOK_BASE_URL=https://abc123.ngrok.io</code></li>
              <li>Restart server and enable webhooks</li>
            </ol>
            <p className="mt-2"><strong>Option 2:</strong> Use the "Test Calendar SMS" button for manual testing without webhooks.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
