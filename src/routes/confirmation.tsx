import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading confirmation details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-8 py-12 sm:px-12 sm:py-16">
            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                  {appointmentData.inviteeName ? appointmentData.inviteeName.charAt(0).toUpperCase() : 'L'}
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
              </div>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-3">
                {appointmentData.eventTypeName || 'Discovery Call'} Confirmed
              </h1>
              <p className="text-lg text-gray-600">
                You are scheduled with {appointmentData.inviteeName || 'our team'}
              </p>
            </div>

            {/* Date and Time Section */}
            {appointmentData.eventStartTime && (
              <div className="mb-12 flex items-start gap-4 justify-center">
                <svg className="w-6 h-6 text-gray-700 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Date and Time</h3>
                  <p className="text-base text-gray-600">{formatDateTime(appointmentData.eventStartTime)}</p>
                </div>
              </div>
            )}

            {/* Email Confirmation Message */}
            <div className="text-center mb-8">
              <p className="text-base text-gray-600">
                A calendar confirmation has been sent to your email address
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGoHome}
                className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </button>
              
              <button
                onClick={handleReschedule}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Reschedule Call
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{' '}
            <a href="mailto:hello@localspot.com" className="text-blue-600 hover:text-blue-700 font-medium underline">
              hello@localspot.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

