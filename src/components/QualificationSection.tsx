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
    <section ref={elementRef} className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two Column Layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up' : ''}`}>
          
          {/* Left Column - Not For You */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                LocalSpot <span className="text-red-600">is not</span> for you if...
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-5 h-5 bg-red-500 rounded-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  You're afraid to try new things or resist change.
                </span>
              </div>
              
              <div className="flex items-start">
                <div className="w-5 h-5 bg-red-500 rounded-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  You're not serious about growing your restaurant.
                </span>
              </div>
              
              <div className="flex items-start">
                <div className="w-5 h-5 bg-red-500 rounded-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  You'd rather waste hours testing random ideas than following a system that works.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - For You */}
          <div className="bg-green-50 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                LocalSpot <span className="text-green-600">is for you if...</span>
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  Your restaurant is already bringing in steady sales but you know it could do way more.
                </span>
              </div>
              
              <div className="flex items-start">
                <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  You're a full-service restaurant that cares about guests, not just transactions.
                </span>
              </div>
              
              <div className="flex items-start">
                <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  You're excited to try new ways to fill seats and keep guests coming back.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Introduction */}
        <div className={`text-center mb-12 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}>
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 inline-block">
            <div className="flex items-center justify-center mb-4">
              <div className="flex -space-x-2">
                <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-gray-600 font-bold text-sm">MA</span>
                </div>
                <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-gray-600 font-bold text-sm">FE</span>
                </div>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Meet with Maria and Federico for a personalized walkthrough</h4>
            <p className="text-sm text-gray-600 mb-4">Limited availability this week — reserve your spot</p>
            <button 
              onClick={handleGetDemo}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center"
            >
              Book Your Demo
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Headline */}
        <div className={`text-center mb-12 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-300' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Every empty table is a missed opportunity.
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-gray-900">
            <span className="text-blue-600">LocalSpot</span> helps you fill them.
          </p>
        </div>

        {/* Final CTA */}
        <div className={`bg-gray-50 rounded-2xl p-6 sm:p-8 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-400' : ''}`}>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to pack your spot?</h3>
            <p className="text-lg text-gray-600 mb-6">Start turning first-time guests into VIP members</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <input
                type="email"
                placeholder="Enter your work email"
                className="flex-1 max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button 
                onClick={handleGetDemo}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center"
              >
                Get a Free Demo
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            
            <p className="text-sm text-gray-600">
              We make you more money than we cost. Guaranteed or Your Money Back.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualificationSection;
