import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

// Declare gtag global function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      eventName: string,
      params?: { [key: string]: string | number | boolean }
    ) => void
  }
}

export const Route = createFileRoute('/confirmation')({
  component: ConfirmationPage,
})

interface AppointmentData {
  inviteeName?: string
  inviteeEmail?: string
  inviteePhone?: string
  eventTypeName?: string
  eventStartTime?: string
  eventEndTime?: string
  rescheduleUrl?: string
  cancelUrl?: string
}

function ConfirmationPage() {
  const navigate = useNavigate()
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Parse URL parameters from Calendly redirect
    const urlParams = new URLSearchParams(window.location.search)
    
    const data: AppointmentData = {
      inviteeName: urlParams.get('invitee_name') || urlParams.get('name') || undefined,
      inviteeEmail: urlParams.get('invitee_email') || urlParams.get('email') || undefined,
      inviteePhone: urlParams.get('invitee_phone') || urlParams.get('phone') || undefined,
      eventTypeName: urlParams.get('event_type_name') || urlParams.get('event') || undefined,
      eventStartTime: urlParams.get('event_start_time') || urlParams.get('start_time') || undefined,
      eventEndTime: urlParams.get('event_end_time') || urlParams.get('end_time') || undefined,
      rescheduleUrl: urlParams.get('reschedule_url') || undefined,
      cancelUrl: urlParams.get('cancel_url') || undefined,
    }

    setAppointmentData(data)
    setLoading(false)
  }, [])

  // Fire Google Ads conversion event when confirmation page loads
  useEffect(() => {
    // Check if gtag is available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17583032542/J2ZqCMCuyaobEN6Rn8BB'
      })
    }
  }, [])

  const handleGoHome = () => {
    navigate({ to: '/' })
  }

  const handleReschedule = () => {
    // If Calendly provides a reschedule URL, use it; otherwise open the booking page
    if (appointmentData.rescheduleUrl) {
      window.open(appointmentData.rescheduleUrl, '_blank', 'noopener,noreferrer')
    } else {
      window.open('https://calendly.com/hello-localspot/demo', '_blank', 'noopener,noreferrer')
    }
  }

  const formatDateTime = (isoString?: string) => {
    if (!isoString) return 'Not specified'
    
    try {
      const date = new Date(isoString)
      return date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
      })
    } catch {
      return isoString
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading confirmation details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 py-12">
      <div className="w-full" style={{ maxWidth: '590px' }}>
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-16 py-16 flex flex-col gap-12">
            {/* Top Section - Profile + Text */}
            <div className="flex flex-col gap-8">
              {/* Profile Image + Headings */}
              <div className="flex flex-col gap-4">
                {/* Profile Image */}
                <div className="flex justify-center">
                  <div className="relative w-12 h-12">
                    <img 
                      src="/PP Maria.jpg" 
                      alt="Profile"
                      className="w-12 h-12 rounded-full border-2 border-white object-cover"
                      style={{ borderRadius: '46px' }}
                    />
                    <div 
                      className="absolute w-4 h-4 rounded-full border-2 border-white"
                      style={{ 
                        bottom: 0,
                        right: 0,
                        backgroundColor: '#5EC269'
                      }}
                    />
                  </div>
                </div>

                {/* Headings */}
                <div className="text-center flex flex-col gap-1">
                  <h1 className="font-normal text-gray-900 dark:text-white" style={{ fontSize: '20px' }}>
                    {appointmentData.eventTypeName || 'Discovery Call'} Confirmed
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300" style={{ fontSize: '16px' }}>
                    You are scheduled with {appointmentData.inviteeName || 'Maria del Mar Martinez'}
                  </p>
                </div>
              </div>

              {/* Date and Time Section */}
              {appointmentData.eventStartTime && (
                <div 
                  className="bg-blue-50 dark:bg-gray-700 rounded px-10 py-6 flex items-center gap-2"
                >
                  <svg className="w-6 h-6 flex-shrink-0 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.8 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      Date and Time
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      {formatDateTime(appointmentData.eventStartTime)}
                    </p>
                  </div>
                </div>
              )}

              {/* Email Confirmation Message */}
              <div className="text-center">
                <p className="text-gray-900 dark:text-white">
                  A calendar confirmation has been sent to your email address
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGoHome}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors heading-text"
                style={{ fontSize: '20px' }}
              >
                Back to Home
              </button>
              
              <button
                onClick={handleReschedule}
                className="flex-1 bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors heading-text"
                style={{ fontSize: '20px' }}
              >
                Reschedule Call
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Need help? Contact us at{' '}
            <a href="mailto:hello@localspot.com" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline">
              hello@localspot.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

