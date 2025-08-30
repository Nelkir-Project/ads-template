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
    <div className={`fixed bottom-4 left-4 right-4 z-50 ${
      isVisible ? 'popup-enter' : 'popup-exit'
    }`}>
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-4xl mx-auto px-4 relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close popup"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Horizontal layout with profile, content, and buttons */}
        <div className="flex items-center gap-4">
          {/* Profile images */}
          <div className="flex -space-x-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white flex items-center justify-center text-white font-semibold text-sm">
              B
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 border-2 border-white flex items-center justify-center text-white font-semibold text-sm">
              R
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm mb-1">
              Meet with Brandyn and Rick for a personalized walkthrough
            </h3>
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Limited availability this week — reserve your spot
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={handleMaybeLater}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Maybe Later
            </button>
            <button
              onClick={handleBookDemo}
              className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-1 group"
            >
              Book Your Demo
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
