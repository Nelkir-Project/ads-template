import { useEffect } from 'react'

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleMaybeLater = () => {
    onClose()
  }

  const handleBookDemo = () => {
    // In a real implementation, this would open Calendly
    // For now, we'll just show an alert or redirect
    window.open('https://calendly.com/your-calendly-link', '_blank')
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto modal-content">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-1 shadow-sm"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="p-6">
          {/* Profile images */}
          <div className="flex justify-center mb-4">
            <div className="flex -space-x-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-4 border-white flex items-center justify-center text-white font-bold text-lg shadow-lg">
                B
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-teal-600 border-4 border-white flex items-center justify-center text-white font-bold text-lg shadow-lg">
                R
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Meet with Brandyn and Rick
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-center mb-6 leading-relaxed">
            Let's discuss your ad campaigns and how we can help optimize them. 
            This call is all about addressing your challenges and questions.
          </p>

          {/* Features */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Personalized walkthrough</h3>
                <p className="text-sm text-gray-600">See exactly how LocalSpot can optimize your campaigns</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">25 minutes, zero pressure</h3>
                <p className="text-sm text-gray-600">We'll respect your time and address your specific questions</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0v-4h8v4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Limited availability</h3>
                <p className="text-sm text-gray-600">We only schedule a few personal demos each week</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleMaybeLater}
              className="flex-1 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
            >
              Maybe Later
            </button>
            <button
              onClick={handleBookDemo}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              Book Your Demo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoModal
