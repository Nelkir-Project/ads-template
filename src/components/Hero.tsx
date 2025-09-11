import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { openCalendarBooking } from '../utils/calendarUtils';
import VideoHero from './VideoHero';

const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  // Debug logger for mobile video
  const logVideo = (type: string) => (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const v = e.currentTarget;
    console.log(`[HeroVideo:${type}]`, {
      readyState: v.readyState,
      networkState: v.networkState,
      currentTime: v.currentTime,
      paused: v.paused,
      muted: v.muted,
      videoWidth: v.videoWidth,
      videoHeight: v.videoHeight,
      src: v.currentSrc,
    });
  };

  return (
    <section ref={elementRef} className="hero-section py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Video - Shown only on mobile, before title - Full Width */}
        <div className="lg:hidden mb-8 animate-on-scroll">
          <VideoHero />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className={`text-center lg:text-left animate-on-scroll ${isIntersecting ? 'animate animate-slide-in-left' : ''}`}>
                         {/* Main Headline */}
             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900 mb-4 sm:mb-6 leading-tight lg:leading-[1.1]">
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
                  <span className="font-normal">340+ restaurant owners trust LocalSpot</span>
                </div>
              </div>
              <div className="flex items-center text-yellow-500">
                <span className="text-xs sm:text-sm text-gray-600">⭐ Typical results: first week</span>
              </div>
            </div>

            {/* Email Form - Hidden on mobile */}
            <div className="hidden sm:block bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-6 shadow-sm mx-4 lg:mx-0">
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
            <button className="hidden sm:flex items-center justify-center lg:justify-start text-blue-600 hover:text-blue-700 font-normal mb-6 sm:mb-8 px-4 lg:px-0">
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
              <span className="text-green-800 font-normal text-sm sm:text-base mb-1 sm:mb-0 sm:mr-2">Pays for itself. Or you don't.</span>
              <span className="text-green-600 text-xs sm:text-sm">100% results-based guarantee</span>
            </div>
          </div>

          {/* Right Column - Video (Desktop) / Hidden on Mobile - Bigger Size */}
          <div className={`hidden lg:block w-full max-w-xl mx-auto lg:mx-0 mt-8 lg:mt-0 animate-on-scroll ${isIntersecting ? 'animate animate-slide-in-right animate-delay-200' : ''}`}>
            <VideoHero />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
