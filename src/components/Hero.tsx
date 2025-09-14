import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { openCalendarBooking } from '../utils/calendarUtils';
import VideoHero from './VideoHero';

const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  // (debug logger removed)

  return (
    <>
      {/* Mobile Video - Full width, no margins, directly after header */}
      <div className="lg:hidden w-full">
        <VideoHero />
      </div>
      
      <section ref={elementRef} className="hero-section py-12 sm:py-16 lg:py-20">
        {/* Mobile Layout - Keep existing mobile design */}
        <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-left animate-on-scroll">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-gray-900 mb-4 sm:mb-6 leading-tight">
              The system that brings guests back
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 px-4">
              Your restaurant deserves to be the local spot everyone loves. With LocalSpot, people discover you, return more often, and spends a little more.
            </p>

            {/* Customer Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8 px-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  <span className="font-normal">340+ restaurant owners trust LocalSpot</span>
                </div>
              </div>
              <div className="flex items-center text-yellow-500">
                <span className="text-xs sm:text-sm text-gray-600">⭐ Typical results: first week</span>
              </div>
            </div>

            {/* Email Form - Hidden on mobile */}
            <div className="hidden sm:block bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-6 shadow-sm mx-4">
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
                <button 
                  onClick={openCalendarBooking}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-normal transition-colors group"
                >
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

            {/* Watch Demo Button - Hidden on mobile */}
            <button 
              onClick={openCalendarBooking}
              className="hidden sm:flex items-center justify-center text-blue-600 hover:text-blue-700 font-normal mb-6 sm:mb-8 px-4"
            >
              <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                ▶
              </span>
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <span>Watch Demo</span>
                <span className="text-xs sm:text-sm text-gray-500 sm:ml-2">See LocalSpot in action</span>
              </div>
            </button>
          </div>
        </div>

        {/* Desktop Layout - New Figma Design */}
        <div className="hidden lg:block max-w-4xl mx-auto px-8">
          <div className={`text-center animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up' : ''}`}>
            {/* Main Headline - Figma: opacity 0.9 */}
            <h1 className="text-5xl xl:text-6xl font-normal leading-tight mb-8" style={{ color: 'rgba(0, 0, 0, 0.9)' }}>
              The System That Brings Guests Back
            </h1>
            
            {/* Subtitle - Figma: opacity 0.65 */}
            <p className="text-lg xl:text-xl mb-16 max-w-4xl mx-auto leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
              Your restaurant deserves to be the local spot everyone loves. With LocalSpot, people discovers you, return more often, and spends a little more.
            </p>

            {/* Trust Indicators Bar - positioned above video */}
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white px-6 py-3 rounded-lg shadow-sm flex items-center gap-8">
                <span className="text-xs" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                  +10,000 Diners Love LocalSpot
                </span>
                <span className="text-xs" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                  20 days
                </span>
              </div>
            </div>

            {/* Video Container - Figma: gray background #D9D9D9 */}
            <div className={`w-full max-w-4xl mx-auto animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}>
              <div className="bg-gray-300 rounded-lg overflow-hidden" style={{ backgroundColor: '#D9D9D9' }}>
                <VideoHero />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
