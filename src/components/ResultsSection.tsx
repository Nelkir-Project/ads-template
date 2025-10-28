import React from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import {
  CircleDollarSignIcon,
  RefreshCcwIcon,
  StarIcon,
  ZapIcon,
} from 'lucide-react'

const ResultsSection: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
  })

  return (
    <section ref={elementRef} className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Green Tag */}
        <div
          className={`mb-12 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-100' : ''}`}
        >
          <div className="inline-flex items-start bg-green-100 text-green-800 px-6 py-3 rounded-full font-medium border border-green-800">
            Real Results, Real Growth
          </div>
        </div>

        {/* Feature Grid - Desktop vs Mobile */}
        <div
          className={`mb-16 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}
        >
          {/* Desktop Layout - New Figma Design */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-12">
              {/* Top Left - Attract more guests */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <StarIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Attract more guests
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  With LocalSpot, restaurants attract more diners through
                  Google, social media, and reservations — making them the best
                  choice when guests are deciding where to eat.
                </p>
              </div>

              {/* Top Right - Bring first-time visitors back */}
              <div className="bg-blue-600 rounded-xl p-8 text-white">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <RefreshCcwIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-3 text-white">
                  Bring first-time visitors back
                </h3>
                <p className="text-blue-100 leading-relaxed">
                  Our loyalty and text message tools keep guests returning. On
                  average, VIP members visit 2x more often and come back 35%
                  more frequently.
                </p>
              </div>

              {/* Bottom Left - Grow Avg. Ticket Size */}
              <div className="bg-white rounded-xl p-8 border border-gray-200">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <CircleDollarSignIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Grow Avg. Ticket Size
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Menus with photos and pairing suggestions sell more. LocalSpot
                  restaurants see 10–25% higher checks and up to 50% more sales
                  on featured dishes.
                </p>
              </div>

              {/* Bottom Right - Simple & Fast */}
              <div className="bg-[#FBFBFB] rounded-xl p-8 border border-gray-200">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <ZapIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Simple & Fast
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Menus load in under 2 seconds, most restaurants are live in 7
                  days, and 95% of staff feel comfortable using the dashboard
                  within minutes.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout - Keep Original */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Left - Attract more guests */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <StarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Attract more guests
              </h3>
              <p className="text-gray-600 leading-relaxed">
                With LocalSpot, restaurants attract more diners through Google,
                social media, and reservations — making them the best choice
                when guests are deciding where to eat.
              </p>
            </div>

            {/* Top Right - Bring first-time visitors back */}
            <div className="bg-blue-600 rounded-lg p-6 text-white">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <RefreshCcwIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">
                Bring first-time visitors back
              </h3>
              <p className="text-blue-100 leading-relaxed">
                Our loyalty and text message tools keep guests returning. On
                average, VIP members visit 2x more often and come back 35% more
                frequently.
              </p>
            </div>

            {/* Bottom Left - Grow Avg. Ticket Size */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <CircleDollarSignIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Grow Avg. Ticket Size
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Menus with photos and pairing suggestions sell more. LocalSpot
                restaurants see 10-25% higher checks and up to 50% more sales on
                featured dishes.
              </p>
            </div>

            {/* Bottom Right - Simple & Fast */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <ZapIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Simple & Fast
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Menus load in under 2 seconds, most restaurants are live in 7
                days, and 95% of staff feel comfortable using the dashboard
                within minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col gap-10 md:mb-8 md:mt-24">
          <blockquote className="text-subtitle testimonial-quote text-gray-700 leading-relaxed text-2xl md:text-4xl/tight text-pretty max-w-[900px]">
            I had no idea I was missing out over $25,000 a month. LocalSpot
            brought new guests in less than a week.
          </blockquote>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden flex justify-center items-center">
                <p>MM</p>
              </div>
              <div>
                <h4 className="ftext-gray-900">Michael</h4>
                <p className="font-semibold text-gray-600">Restaurant Owner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResultsSection
