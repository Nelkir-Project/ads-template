import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { openCalendarBooking } from '../utils/calendarUtils';

const LocalSpotPricing: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  const handleGetDemo = () => {
    openCalendarBooking();
  };

  return (
    <section ref={elementRef} id="pricing" className="bg-gray-50 py-16 sm:py-20 lg:py-35">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header - Mobile: keep original, Desktop: match Figma */}
        <div className={`mb-16 lg:mb-20 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up' : ''}`}>
          {/* Mobile Header */}
          <div className="block lg:hidden text-center">
            <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-4">
              Pricing That Pays for Itself. Guaranteed.
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              If LocalSpot doesn't pay for itself in 60 days, you get your money back. No questions asked.
            </p>
          </div>

          {/* Desktop Header - Match Figma */}
          <div className="hidden lg:block text-center max-w-4xl mx-auto">
            <h2 className="text-4xl xl:text-5xl font-normal mb-2" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
              Pricing That Pays for Itself. Guaranteed.
            </h2>
            <p className="text-lg font-normal" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
              If LocalSpot doesn't pay for itself in 60 days, you get your money back. No questions asked.
            </p>
          </div>
        </div>

        {/* Pricing Card - Mobile: keep original, Desktop: match Figma */}
        <div className={`animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}>
          {/* Mobile Card */}
          <div className="block lg:hidden max-w-xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <img src="/Group 15212.png" alt="LocalSpot" className="h-8" />
                </div>
                <p className="text-gray-600">What's included</p>
              </div>

              <div className="space-y-2 mb-6">
                {[
                  "Custom Website with SEO that brings people in",
                  "Reservation System with No Cover Fees",
                  "In-restaurant Guest Data Collection",
                  "Automated Social Media Posts",
                  "Smart Loyalty Program",
                  "Automated Text Message Marketing",
                  "Monthly Customer Experience Summary and Tips",
                  "GoogleMaps Review Booster",
                  "Online Ordering Platform"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={handleGetDemo}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded text-lg font-medium hover:bg-blue-700 transition-colors duration-200 mb-4"
              >
                Get a Free Demo
              </button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">5 of 10 Spots Available</p>
                <p className="text-sm text-gray-600">🤝 60-Day Money-back Guarantee*</p>
              </div>
            </div>
          </div>

          {/* Desktop Card - Match Figma exactly */}
          <div className="hidden lg:block max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-16 shadow-sm border border-gray-200" style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}>
              {/* LocalSpot Logo */}
              <div className="flex items-center mb-16">
                <img src="/Group 15212.png" alt="LocalSpot" className="h-9" />
              </div>

              {/* What's included section */}
              <div className="mb-6">
                <h4 className="text-xl font-normal mb-4" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>What's included</h4>
                
                <div className="space-y-1 text-base mb-8" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                  <div className="flex items-start leading-relaxed">
                    <span className="mr-2">✅</span>
                    <span>Custom Professional Website</span>
                  </div>
                  <div className="flex items-start leading-relaxed">
                    <span className="mr-2">✅</span>
                    <span>Reservation System with No Cover Fees</span>
                  </div>
                  <div className="flex items-start leading-relaxed">
                    <span className="mr-2">✅</span>
                    <span>In-restaurant Guest Data Collection</span>
                  </div>
                  <div className="flex items-start leading-relaxed">
                    <span className="mr-2">✅</span>
                    <span>Automated Social Media Posts</span>
                  </div>
                  <div className="flex items-start leading-relaxed">
                    <span className="mr-2">✅</span>
                    <span>Smart Loyalty Program</span>
                  </div>
                  <div className="flex items-start leading-relaxed">
                    <span className="mr-2">✅</span>
                    <span>Automated Text Message Marketing</span>
                  </div>
                  <div className="flex items-start leading-relaxed">
                    <span className="mr-2">✅</span>
                    <span>eGift Cards</span>
                  </div>
                  <div className="flex items-start leading-relaxed">
                    <span className="mr-2">✅</span>
                    <span>Online Catering Orders</span>
                  </div>
                  <div className="flex items-start leading-relaxed">
                    <span className="mr-2">✅</span>
                    <span>Customer Experience Tracking</span>
                  </div>
                  <div className="flex items-start leading-relaxed">
                    <span className="mr-2">✅</span>
                    <span>GoogleMaps Reviews</span>
                  </div>
                  <div className="flex items-start leading-relaxed">
                    <span className="mr-2">✅</span>
                    <span>Dedicated Customer Support</span>
                  </div>
                  <div className="flex items-start leading-relaxed">
                    <span className="mr-2 text-orange-500">🎁</span>
                    <span><strong>Bonus 1:</strong> x24 Branded QR Menu Kit</span>
                  </div>
                  <div className="flex items-start leading-relaxed">
                    <span className="mr-2 text-orange-500">🎁</span>
                    <span><strong>Bonus 2:</strong> Professional Photoshoot</span>
                  </div>
                  <div className="flex items-start leading-relaxed">
                    <span className="mr-2 text-orange-500">🎁</span>
                    <span><strong>Bonus 3:</strong> Full Set-up</span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="text-xl font-normal mb-4" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                  Total Proven Value: Substantial ROI
                </div>
                <div className="mb-2">
                  <span className="text-2xl font-normal" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Contact us for pricing</span>
                </div>
                <div className="text-base" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                  Flexible payment options available
                </div>
              </div>

              {/* CTA Button */}
              <button 
                onClick={handleGetDemo}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded text-lg font-normal hover:bg-blue-700 transition-colors duration-200 mb-6 flex items-center justify-center gap-3"
                style={{ backgroundColor: '#1B51CF' }}
              >
                <span>Get a Free Demo</span>
                <div className="flex items-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </button>

              {/* Bottom sections */}
              <div className="space-y-6 text-center">
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
      </div>
    </section>
  );
};

export default LocalSpotPricing;
