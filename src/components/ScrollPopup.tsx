import { useState, useEffect } from 'react'
import { useScrollDirection } from '../hooks/useScrollDirection'

interface ScrollPopupProps {
  onBookDemo: () => void
}

const ScrollPopup = ({ onBookDemo }: ScrollPopupProps) => {
  const { showPopup, hidePopup } = useScrollDirection(200)
  const [isVisible, setIsVisible] = useState(false)

  // Handle popup visibility with animation
  useEffect(() => {
    if (showPopup && !isVisible) {
      setIsVisible(true)
    }
  }, [showPopup, isVisible])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(hidePopup, 300) // Wait for animation to complete
  }

  const handleBookDemo = () => {
    onBookDemo()
    handleClose()
  }

  const handleMaybeLater = () => {
    handleClose()
  }

  if (!showPopup && !isVisible) return null

  return (
    <div className={`fixed bottom-2 sm:bottom-4 left-2 right-2 sm:left-4 sm:right-4 z-50 ${
      isVisible ? 'popup-enter' : 'popup-exit'
    }`}>
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-3 sm:p-4 max-w-4xl mx-auto relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-1 right-1 sm:top-2 sm:right-2 text-gray-400 hover:text-gray-600 transition-colors p-1"
          aria-label="Close popup"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Responsive layout */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          {/* Profile images */}
          <div className="flex -space-x-1 sm:-space-x-2 flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white flex items-center justify-center text-white font-normal text-xs sm:text-sm">
              B
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 border-2 border-white flex items-center justify-center text-white font-normal text-xs sm:text-sm">
              R
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-normal text-gray-900 text-xs sm:text-sm mb-1">
              Meet with Brandyn and Rick for a personalized walkthrough
            </h3>
            <div className="flex items-center justify-center sm:justify-start text-xs text-gray-500">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Limited availability this week — reserve your spot
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={handleMaybeLater}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors order-2 sm:order-1"
            >
              Maybe Later
            </button>
            <button
              onClick={handleBookDemo}
              className="bg-gray-900 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-normal hover:bg-gray-800 transition-colors flex items-center justify-center gap-1 group order-1 sm:order-2"
            >
              Book Your Demo
              <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollPopup
