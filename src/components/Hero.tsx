import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCountingAnimation } from '../hooks/useCountingAnimation';

const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  
  // Counting animations for stats
  const totalSavings = useCountingAnimation(isIntersecting, { end: 1138896, prefix: '$', separator: ',' });
  const paybackTime = useCountingAnimation(isIntersecting, { end: 130, suffix: ' min' });
  const trustedBy = useCountingAnimation(isIntersecting, { end: 340 });
  const avgSavings = useCountingAnimation(isIntersecting, { end: 34512, prefix: '$', separator: ',' });
  const termsAnalyzed = useCountingAnimation(isIntersecting, { end: 37377, separator: ',' });
  const adSpend = useCountingAnimation(isIntersecting, { end: 9030993, prefix: '$', separator: ',' });

  return (
    <section ref={elementRef} className="hero-section bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className={`text-center lg:text-left animate-on-scroll ${isIntersecting ? 'animate animate-slide-in-left' : ''}`}>
                         {/* Main Headline */}
             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight lg:leading-[1.1]">
               The Marketing System That Makes<br className="hidden sm:block" />
               <span className="text-blue-600">Guests Happy</span>
             </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 px-4 lg:px-0">
              Your restaurant deserves to be the local spot everyone loves. With LocalSpot, people discover you, return more often, and spends a little more.
            </p>

            {/* Customer Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8 px-4 lg:px-0">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  <span className="font-semibold">340+ restaurant owners trust LocalSpot</span>
                </div>
              </div>
              <div className="flex items-center text-yellow-500">
                <span className="text-xs sm:text-sm text-gray-600">⭐ Typical results: first week</span>
              </div>
            </div>

            {/* Email Form */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-6 shadow-sm mx-4 lg:mx-0">
              <div className="flex flex-col gap-3">
                <div className="w-full">
                  <input
                    type="email"
                    placeholder="Enter your restaurant email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors group">
                  <span className="flex items-center justify-center">
                    Get Started Free
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center mt-4 text-xs sm:text-sm text-gray-500 gap-2 sm:gap-6">
                <span className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  Free Marketing Audit
                </span>
                <span className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  No Credit Card Needed
                </span>
              </div>
            </div>

            {/* Watch Demo Button */}
            <button className="flex items-center justify-center lg:justify-start text-blue-600 hover:text-blue-700 font-semibold mb-6 sm:mb-8 px-4 lg:px-0">
              <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                ▶
              </span>
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <span>Watch Demo</span>
                <span className="text-xs sm:text-sm text-gray-500 sm:ml-2">See LocalSpot in action</span>
              </div>
            </button>

            {/* Guarantee Badge */}
            <div className="inline-flex flex-col sm:flex-row items-center bg-green-50 border border-green-200 rounded-lg px-4 py-3 sm:py-2 mx-4 lg:mx-0 text-center sm:text-left">
              <span className="text-green-800 font-semibold text-sm sm:text-base mb-1 sm:mb-0 sm:mr-2">Pays for itself. Or you don't.</span>
              <span className="text-green-600 text-xs sm:text-sm">100% results-based guarantee</span>
            </div>
          </div>

                     {/* Right Column - Stats Grid */}
           <div className={`bg-gray-50 rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-auto lg:mx-0 mt-8 lg:mt-0 animate-on-scroll ${isIntersecting ? 'animate animate-slide-in-right animate-delay-200' : ''}`}>
                         <div className="mb-4 sm:mb-6">
               <div className="flex items-center justify-between mb-2">
                 <div className="flex items-center gap-2">
                   <span className="text-base sm:text-lg">📊</span>
                   <h2 className="text-base sm:text-lg font-bold text-gray-900">LocalSpot Impact</h2>
                 </div>
                 <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                   UPDATED DAILY
                 </span>
               </div>
             </div>

                         {/* Total Savings - Full Width */}
             <div className="bg-white rounded-lg p-3 sm:p-4 text-left shadow-sm border border-gray-100 mb-3">
               <div className="flex items-center mb-2">
                 <span className="text-green-500 mr-2">📈</span>
                 <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Revenue Generated</h3>
               </div>
               <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{totalSavings}</div>
               <p className="text-xs text-gray-600">Additional revenue across all restaurants</p>
             </div>

                         {/* Other Stats - 2x2 Grid */}
             <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
               {/* Payback Period */}
               <div className="bg-white rounded-lg p-2 sm:p-3 text-left shadow-sm border border-gray-100">
                 <div className="flex items-center mb-1">
                   <span className="text-orange-500 mr-1">⏱️</span>
                   <h3 className="text-xs font-semibold text-gray-900">Results Time</h3>
                 </div>
                 <div className="text-sm sm:text-lg font-bold text-gray-900 mb-1">{paybackTime}</div>
                 <p className="text-xs text-gray-600">Median time to see results</p>
               </div>

               {/* Trusted By */}
               <div className="bg-white rounded-lg p-2 sm:p-3 text-left shadow-sm border border-gray-100">
                 <div className="flex items-center mb-1">
                   <span className="text-purple-500 mr-1">👥</span>
                   <h3 className="text-xs font-semibold text-gray-900">Trusted By</h3>
                 </div>
                 <div className="text-sm sm:text-lg font-bold text-gray-900 mb-1">{trustedBy}</div>
                 <p className="text-xs text-gray-600">Restaurant Owners</p>
               </div>

               {/* Avg Savings */}
               <div className="bg-white rounded-lg p-2 sm:p-3 text-left shadow-sm border border-gray-100">
                 <div className="flex items-center mb-1">
                   <span className="text-green-500 mr-1">💰</span>
                   <h3 className="text-xs font-semibold text-gray-900">Avg Revenue Boost</h3>
                 </div>
                 <div className="text-sm sm:text-lg font-bold text-gray-900 mb-1">{avgSavings}</div>
                 <p className="text-xs text-gray-600">Per restaurant monthly</p>
               </div>

               {/* Terms Analyzed */}
               <div className="bg-white rounded-lg p-2 sm:p-3 text-left shadow-sm border border-gray-100">
                 <div className="flex items-center mb-1">
                   <span className="text-blue-500 mr-1">🔍</span>
                   <h3 className="text-xs font-semibold text-gray-900">Reviews Analyzed</h3>
                 </div>
                 <div className="text-sm sm:text-lg font-bold text-gray-900 mb-1">{termsAnalyzed}</div>
                 <p className="text-xs text-gray-600">Last 30 days</p>
               </div>
             </div>

                         {/* Connected Ad Spend */}
             <div className="bg-white rounded-lg p-3 sm:p-4 text-left shadow-sm border border-gray-100">
               <div className="flex items-center mb-2">
                 <span className="text-purple-500 mr-2">💳</span>
                 <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Connected Monthly Revenue</h3>
               </div>
               <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{adSpend}</div>
               <p className="text-xs text-gray-600">30-day revenue total from restaurants using LocalSpot</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
