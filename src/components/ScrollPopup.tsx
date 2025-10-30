import { useState, useEffect, useRef } from 'react'
import { openCalendarBooking } from '../utils/calendarUtils'
import { isPopupDismissed, dismissPopup } from '../utils/popupUtils'

const ScrollPopup = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(() => isPopupDismissed())
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Watch for testimonials section to appear
  useEffect(() => {
    if (isDismissed) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isDismissed) {
            setShowPopup(true)
          }
        })
      },
      {
        threshold: 0.3, // Trigger when 30% of testimonials section is visible
        rootMargin: '0px',
      },
    )

    // Find the testimonials section and observe it
    const testimonialsSection = document.querySelector(
      '[data-section="testimonials"]',
    )
    if (testimonialsSection) {
      observerRef.current.observe(testimonialsSection)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [isDismissed])

  // Handle popup visibility with animation
  useEffect(() => {
    if (showPopup && !isVisible && !isDismissed) {
      setIsVisible(true)
    }
  }, [showPopup, isVisible, isDismissed])

  const handleClose = () => {
    setIsVisible(false)
    setIsDismissed(true)
    dismissPopup()
    setTimeout(() => setShowPopup(false), 300) // Wait for animation to complete
  }

  const handleBookDemo = () => {
    openCalendarBooking()
    handleClose()
  }

  if ((!showPopup && !isVisible) || isDismissed) return null

  return (
    <div
      className={`fixed bottom-2 sm:bottom-4 left-2 right-2 sm:left-4 sm:right-4 z-50 ${
        isVisible ? 'popup-enter' : 'popup-exit'
      }`}
    >
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-3 sm:p-4 max-w-4xl mx-auto relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-1 right-1 sm:top-2 sm:right-2 text-gray-400 hover:text-gray-600 transition-colors p-1"
          aria-label="Close popup"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Responsive layout */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          {/* Profile images */}
          <div className="flex -space-x-1 sm:-space-x-2 flex-shrink-0">
            <img
              src="/PP Maria.jpg"
              alt="Maria"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-normal text-gray-900 mb-1">
              Meet with Maria for a personalized walkthrough
            </h3>
            <div className="flex items-center justify-center sm:justify-start text-gray-500">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Limited availability this week — reserve your spot
            </div>
          </div>

          {/* Action button */}
          <div className="flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={handleBookDemo}
              className="bg-gray-900 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-normal hover:bg-gray-800 transition-colors flex items-center justify-center gap-1 group w-full sm:w-auto"
            >
              Book Your Demo
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollPopup
