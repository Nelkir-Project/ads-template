import React from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { openCalendarBooking } from '../utils/calendarUtils'
import QualificationSection from './QualificationSection'

const FinalCTA: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
  })

  const handleGetDemo = () => {
    openCalendarBooking()
  }

  return (
    <section ref={elementRef} className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Headline */}
        <div
          className={`text-center mb-20 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up' : ''}`}
        >
          <p className="subtitle-text text-3xl sm:text-4xl font-normal text-gray-900 mb-4">
            Every empty table is a missed opportunity.
          </p>
          <p className="subtitle-text text-3xl sm:text-4xl font-normal text-gray-900">
            <strong>LocalSpot</strong> helps you fill them.
          </p>
        </div>

        <QualificationSection />

        {/* Final CTA */}
        <div
          className={`bg-gray-50 rounded-2xl p-8 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h3 className="text-xl font-normal text-gray-900">
                Ready to pack your spot?
              </h3>
              <p className="text-gray-600">
                We make you more money than we cost. Guaranteed or Your Money
                Back.
              </p>
            </div>

            {/* Right Column - Button Only */}
            <div className="flex justify-center lg:justify-end">
              <button
                onClick={handleGetDemo}
                className="bg-blue-600 hover:bg-blue-700 text-white font-normal py-3 px-6 rounded transition-colors inline-flex items-center justify-center whitespace-nowrap cursor-pointer"
              >
                Get a Free Demo
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA
