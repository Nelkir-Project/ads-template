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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading confirmation details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 p-8 text-white text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Appointment Confirmed!</h1>
            <p className="text-blue-100">Your call has been successfully scheduled</p>
          </div>

          {/* Appointment Details */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Appointment Details</h2>
            
            <div className="space-y-4">
              {appointmentData.inviteeName && (
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-base font-medium text-gray-900">{appointmentData.inviteeName}</p>
                  </div>
                </div>
              )}

              {appointmentData.inviteeEmail && (
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-base font-medium text-gray-900">{appointmentData.inviteeEmail}</p>
                  </div>
                </div>
              )}

              {appointmentData.inviteePhone && (
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-base font-medium text-gray-900">{appointmentData.inviteePhone}</p>
                  </div>
                </div>
              )}

              {appointmentData.eventTypeName && (
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Meeting Type</p>
                    <p className="text-base font-medium text-gray-900">{appointmentData.eventTypeName}</p>
                  </div>
                </div>
              )}

              {appointmentData.eventStartTime && (
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="text-base font-medium text-gray-900">{formatDateTime(appointmentData.eventStartTime)}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-900">What's Next?</h3>
                  <p className="mt-1 text-sm text-blue-700">
                    A confirmation email has been sent to your inbox with calendar invite and meeting details. 
                    You'll receive a reminder before the scheduled call.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGoHome}
                className="flex-1 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Home
              </button>
              
              <button
                onClick={handleReschedule}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Reschedule Call
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{' '}
            <a href="mailto:support@localspot.com" className="text-blue-600 hover:text-blue-700 font-medium">
              support@localspot.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

