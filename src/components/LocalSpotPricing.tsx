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
              {/* Logo and Title */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <span className="text-base font-semibold text-gray-900">LocalSpot</span>
              </div>

              <h3 className="text-sm font-semibold text-gray-900 mb-3">Done for you</h3>

              <div className="space-y-1 mb-4 text-xs">
                {[
                  { text: "Custom Professional Website", type: "check" },
                  { text: "Reservation System with No Cover Fees", type: "check" },
                  { text: "In-restaurant Guest Data Collection", type: "check" },
                  { text: "Automated Social Media Posts", type: "check" },
                  { text: "Smart Loyalty Program", type: "check" },
                  { text: "Automated Text Message Marketing", type: "check" },
                  { text: "eGift Cards", type: "check" },
                  { text: "Online Catering Orders", type: "check" },
                  { text: "Customer Experience Tracking", type: "check" },
                  { text: "GoogleMaps Reviews", type: "check" },
                  { text: "Dedicated Customer Support", type: "check" },
                  { text: "Bonus 1: x24 Branded QR Menu Kit", type: "bonus" },
                  { text: "Bonus 2: Professional Photoshoot", type: "bonus" },
                  { text: "Bonus 3: Full Set-up", type: "bonus" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    {feature.type === "check" ? (
                      <span className="text-green-500 text-sm flex-shrink-0">✅</span>
                    ) : (
                      <span className="text-orange-500 text-sm flex-shrink-0">🎁</span>
                    )}
                    <span className="text-gray-700 leading-tight">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 mb-1">Total Proven Value: $42,000</p>
                <p className="text-lg font-semibold text-gray-900">Get it for $499/month</p>
                <p className="text-xs text-gray-600">Annual pre-pay</p>
              </div>

              <button 
                onClick={handleGetDemo}
                className="w-full bg-blue-600 text-white py-2.5 px-4 rounded text-sm font-medium hover:bg-blue-700 transition-colors duration-200 mb-3 flex items-center justify-center gap-2"
              >
                <span>Get a Free Demo</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>

              <div className="text-center space-y-1">
                <p className="text-xs text-gray-600">5 of 10 Spots Available</p>
                <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
                  <span>🤝</span> 60-Day Money-back Guarantee*
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Card */}
          <div className="hidden lg:block max-w-sm mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              {/* Logo and Title */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-gray-900">LocalSpot</span>
              </div>

              <h3 className="text-base font-semibold text-gray-900 mb-3">Done for you</h3>

              <div className="space-y-1 mb-5 text-sm">
                {[
                  { text: "Custom Professional Website", type: "check" },
                  { text: "Reservation System with No Cover Fees", type: "check" },
                  { text: "In-restaurant Guest Data Collection", type: "check" },
                  { text: "Automated Social Media Posts", type: "check" },
                  { text: "Smart Loyalty Program", type: "check" },
                  { text: "Automated Text Message Marketing", type: "check" },
                  { text: "eGift Cards", type: "check" },
                  { text: "Online Catering Orders", type: "check" },
                  { text: "Customer Experience Tracking", type: "check" },
                  { text: "GoogleMaps Reviews", type: "check" },
                  { text: "Dedicated Customer Support", type: "check" },
                  { text: "Bonus 1: x24 Branded QR Menu Kit", type: "bonus" },
                  { text: "Bonus 2: Professional Photoshoot", type: "bonus" },
                  { text: "Bonus 3: Full Set-up", type: "bonus" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    {feature.type === "check" ? (
                      <span className="text-green-500 flex-shrink-0">✅</span>
                    ) : (
                      <span className="text-orange-500 flex-shrink-0">🎁</span>
                    )}
                    <span className="text-gray-700 leading-tight">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="mb-5">
                <p className="text-sm font-medium text-gray-900 mb-1">Total Proven Value: $42,000</p>
                <p className="text-xl font-semibold text-gray-900 mb-0.5">Get it for $499/month</p>
                <p className="text-sm text-gray-600">Annual pre-pay</p>
              </div>

              <button 
                onClick={handleGetDemo}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded text-base font-medium hover:bg-blue-700 transition-colors duration-200 mb-4 flex items-center justify-center gap-2"
              >
                <span>Get a Free Demo</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">5 of 10 Spots Available</p>
                <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <span>🤝</span> 60-Day Money-back Guarantee*
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
