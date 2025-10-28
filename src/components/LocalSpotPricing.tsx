import React from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import PriceCard from './PriceCard'
import pricesJson from '../constants/price.json'

const LocalSpotPricing: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
  })

  return (
    <section
      ref={elementRef}
      id="pricing"
      className="bg-gray-50 py-16 sm:py-20 lg:py-35"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header - Mobile: keep original, Desktop: match Figma */}
        <div
          className={`mb-16 lg:mb-20 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up' : ''}`}
        >
          {/* Mobile Header */}
          <div className="block lg:hidden">
            <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-4">
              Simple pricing
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 text-pretty">
              Fast setup. Great support. Choose your plan and get started in
              less than 3 days with hands-on support from day one.
            </p>
          </div>

          {/* Desktop Header - Match Figma */}
          <div className="hidden lg:block max-w-7xl mx-auto">
            <h2 className="text-4xl xl:text-5xl font-normal mb-2 text-black opacity-80">
              Simple pricing
            </h2>
            <p className="text-lg font-normal text-pretty text-black opacity-80">
              Fast setup. Great support. Choose your plan and get started in
              less than 3 days with hands-on support from day one.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <PriceCard isIntersecting={isIntersecting} data={pricesJson.stater} />
          <PriceCard isIntersecting={isIntersecting} data={pricesJson.pro} />
        </div>
      </div>
    </section>
  )
}

export default LocalSpotPricing
