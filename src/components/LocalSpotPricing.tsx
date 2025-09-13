import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { openCalendarBooking } from '../utils/calendarUtils';

const LocalSpotPricing: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  const handleGetDemo = () => {
    openCalendarBooking();
  };

  return (
    <section ref={elementRef} id="pricing" className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: 'rgba(27, 82, 207, 0.05)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Desktop vs Mobile */}
        <div className={`mb-16 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up' : ''}`}>
          {/* Desktop Layout - New Figma Design */}
          <div className="hidden lg:block text-center">
            <h2 className="text-5xl font-normal leading-tight mb-4" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
              Pricing That Pays for Itself. Guaranteed.
            </h2>
            <p className="text-2xl font-normal leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
              If LocalSpot doesn't pay for itself in 60 days, you get your money back. No questions asked.
            </p>
          </div>

          {/* Mobile/Tablet Layout - Keep Original */}
          <div className="lg:hidden text-center">
            <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-4">
              Pricing That Pays for Itself. Guaranteed.
            </h2>
            <p className="text-lg sm:text-xl font-normal text-gray-600">
              If LocalSpot doesn't pay for itself in 60 days, you get your money back. No questions asked.
            </p>
          </div>
        </div>

        {/* Pricing Card */}
        <div className={`max-w-2xl mx-auto animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}>
          <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-16 border border-gray-200">
            
            {/* LocalSpot Header */}
             <div className={`flex items-center mt-4 mb-6 animate-on-scroll ${isIntersecting ? 'animate animate-slide-in-left animate-delay-100' : ''}`}>
             <img src="/Group 15212.png" alt="LocalSpot" className="h-8 w-auto" />
           </div>

            {/* Done for you */}
            <div className="mb-8">
              <h4 className="text-xl font-normal mb-4" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Done for you</h4>
              
              <div className="space-y-4 text-base" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✅</span>
                  <span>Custom Professional Website</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✅</span>
                  <span>Reservation System with No Cover Fees</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✅</span>
                  <span>In-restaurant Guest Data Collection</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✅</span>
                  <span>Automated Social Media Posts</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✅</span>
                  <span>Smart Loyalty Program</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✅</span>
                  <span>Automated Text Message Marketing</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✅</span>
                  <span>eGift Cards</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✅</span>
                  <span>Online Catering Orders</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✅</span>
                  <span>Customer Experience Tracking</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✅</span>
                  <span>GoogleMaps Reviews</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1 flex-shrink-0">✅</span>
                  <span>Dedicated Customer Support</span>
                </div>
                
                {/* Bonus items */}
                <div className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1 flex-shrink-0">🎁</span>
                  <span><strong>Bonus 1:</strong> x24 Branded QR Menu Kit</span>
                </div>
                <div className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1 flex-shrink-0">🎁</span>
                  <span><strong>Bonus 2:</strong> Professional Photoshoot</span>
                </div>
                <div className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1 flex-shrink-0">🎁</span>
                  <span><strong>Bonus 3:</strong> Full Set-up</span>
                </div>
              </div>
            </div>

            {/* Total Proven Value */}
            <div className="mb-4">
              <div className="text-xl font-normal" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                Total Proven Value: $42,000
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-normal" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                  Today: Just $5,999
                </div>
                <div className="text-base" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                  Annual pre-pay
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              onClick={handleGetDemo}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-normal py-4 px-6 rounded-lg transition-colors flex items-center justify-center group"
            >
              Get a Free Demo
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            {/* Bottom sections */}
            <div className="mt-6 space-y-6 text-center">
              <p className="text-lg font-normal" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                5 of 10 Spots Available
              </p>
              <p className="text-lg" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                🤝 60-Day Money-back Guarantee*
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalSpotPricing;
