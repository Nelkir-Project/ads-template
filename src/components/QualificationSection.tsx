import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const QualificationSection: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

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
              <h3 className="text-xl font-normal text-gray-900">
                LocalSpot is not for you if...
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-red-500 text-lg font-normal mr-3 mt-0.5 flex-shrink-0">
                  ✗
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  You're afraid to try new things or resist change.
                </span>
              </div>
              
              <div className="flex items-start">
                <div className="text-red-500 text-lg font-normal mr-3 mt-0.5 flex-shrink-0">
                  ✗
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  You're not serious about growing your restaurant.
                </span>
              </div>
              
              <div className="flex items-start">
                <div className="text-red-500 text-lg font-normal mr-3 mt-0.5 flex-shrink-0">
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
              <h3 className="text-xl font-normal text-gray-900">
                LocalSpot is for you if...
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-green-500 text-lg font-normal mr-3 mt-0.5 flex-shrink-0">
                  ✓
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  Your restaurant is already bringing in steady sales but you know it could do way more.
                </span>
              </div>
              
              <div className="flex items-start">
                <div className="text-green-500 text-lg font-normal mr-3 mt-0.5 flex-shrink-0">
                  ✓
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  You're a full-service restaurant that cares about guests, not just transactions.
                </span>
              </div>
              
              <div className="flex items-start">
                <div className="text-green-500 text-lg font-normal mr-3 mt-0.5 flex-shrink-0">
                  ✓
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">
                  You're excited to try new ways to fill seats and keep guests coming back.
                </span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default QualificationSection;
