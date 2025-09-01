import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface LocalSpotPricingProps {
  onBookDemo?: () => void;
}

const LocalSpotPricing: React.FC<LocalSpotPricingProps> = ({ onBookDemo }) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  const handleGetDemo = () => {
    if (onBookDemo) {
      onBookDemo();
    }
  };

  return (
    <section ref={elementRef} id="pricing" className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className={`text-center mb-12 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Pricing That Pays for Itself. Guaranteed.
          </h2>
          <p className="text-lg text-gray-600">
            If LocalSpot doesn't pay for itself in 60 days, you get your money back. No questions asked.
          </p>
        </div>

        {/* Pricing Card */}
        <div className={`animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}>
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-gray-200">
            
            {/* LocalSpot Header */}
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">LocalSpot</h3>
            </div>

            {/* What's included */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">What's included</h4>
              
              <div className="space-y-1.5">
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
                    <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Bonus items */}
              <div className="mt-6 space-y-1.5">
                {[
                  { label: "Bonus 1:", text: "+24 Branded QR Menu Kit" },
                  { label: "Bonus 2:", text: "Professional Photoshoot" },
                  { label: "Bonus 3:", text: "Full Set-up" }
                ].map((bonus, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-5 h-5 bg-orange-500 rounded-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.5 2C8.67 2 8 2.67 8 3.5S8.67 5 9.5 5H11V7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7H13V5H14.5C15.33 5 16 4.33 16 3.5S15.33 2 14.5 2H9.5Z"/>
                        <path d="M11 7V5H13V7H11Z"/>
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed">
                      <span className="font-semibold text-orange-600">{bonus.label}</span> {bonus.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">
                Value <span className="line-through">$5,500</span>/month
              </div>
              <div className="text-2xl font-bold text-gray-900">
                Today's Cost: Just <span className="text-blue-600">$499/Month</span>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              onClick={handleGetDemo}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center group"
            >
              Get a Free Demo
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            {/* Bottom text */}
            <p className="text-center text-sm text-gray-600 mt-4">
              We only accept a handful of clients each month
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocalSpotPricing;
