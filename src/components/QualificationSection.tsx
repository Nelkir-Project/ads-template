import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface QualificationSectionProps {
  onBookDemo?: () => void;
}

const QualificationSection: React.FC<QualificationSectionProps> = ({ onBookDemo }) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  const handleGetDemo = () => {
    if (onBookDemo) {
      onBookDemo();
    }
  };

  return (
    <section ref={elementRef} className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two Column Layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-20 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up' : ''}`}>
          
          {/* Left Column - Not For You */}
          <div className="bg-white rounded-2xl p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                LocalSpot is not for you if...
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-red-500 text-lg font-bold mr-3 mt-0.5 flex-shrink-0">
                  ✗
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  You're afraid to try new things or resist change.
                </span>
              </div>
              
              <div className="flex items-start">
                <div className="text-red-500 text-lg font-bold mr-3 mt-0.5 flex-shrink-0">
                  ✗
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  You're not serious about growing your restaurant.
                </span>
              </div>
              
              <div className="flex items-start">
                <div className="text-red-500 text-lg font-bold mr-3 mt-0.5 flex-shrink-0">
                  ✗
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  You'd rather waste hours testing random ideas than following a system that works.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - For You */}
          <div className="bg-white rounded-2xl p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM1 9h4v12H1V9z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                LocalSpot is for you if...
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-green-500 text-lg font-bold mr-3 mt-0.5 flex-shrink-0">
                  ✓
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  Your restaurant is already bringing in steady sales but you know it could do way more.
                </span>
              </div>
              
              <div className="flex items-start">
                <div className="text-green-500 text-lg font-bold mr-3 mt-0.5 flex-shrink-0">
                  ✓
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  You're a full-service restaurant that cares about guests, not just transactions.
                </span>
              </div>
              
              <div className="flex items-start">
                <div className="text-green-500 text-lg font-bold mr-3 mt-0.5 flex-shrink-0">
                  ✓
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  You're excited to try new ways to fill seats and keep guests coming back.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Introduction */}
        <div className={`mb-20 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}>
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-4xl mx-auto">
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
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  Meet with Brandyn and Rick for a personalized walkthrough
                </h4>
                <div className="flex items-center text-xs text-gray-500">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Limited availability this week — reserve your spot
                </div>
              </div>

              {/* Action button */}
              <div className="flex-shrink-0">
                <button
                  onClick={handleGetDemo}
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

        {/* Main Headline */}
        <div className={`text-center mb-20 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-300' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Every empty table is a missed opportunity.
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-gray-900">
            LocalSpot helps you fill them.
          </p>
        </div>

        {/* Final CTA */}
        <div className={`bg-gray-900 rounded-2xl p-8 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-400' : ''}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Ready to pack your spot?</h3>
              <p className="text-lg text-gray-300 mb-6">Start turning first-time guests into VIP members</p>
              <p className="text-sm text-gray-300">
                We make you more money than we cost. Guaranteed or Your Money Back.
              </p>
            </div>
            
            {/* Right Column - Email and Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your work email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button 
                onClick={handleGetDemo}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center whitespace-nowrap"
              >
                Get a Free Demo
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualificationSection;
