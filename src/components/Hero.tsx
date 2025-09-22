import React from 'react';
import VideoHero from './VideoHero';

const Hero: React.FC = () => {

  // (debug logger removed)

  return (
    <>
      {/* Mobile Video - Full width, no margins, directly after header */}
      <div className="lg:hidden w-full mb-8">
        <VideoHero controls={true} />
      </div>
      
      <section className="hero-section py-8 sm:py-16 lg:py-20">
        {/* Mobile Layout - Keep existing mobile design */}
        <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-left relative z-10">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
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


          </div>
        </div>

        {/* Desktop Layout - New Figma Design */}
        <div className="hidden lg:block max-w-4xl mx-auto px-8">
          <div className="text-center">
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
            <div className="w-full max-w-4xl mx-auto mb-16">
              <div className="bg-gray-300 rounded-lg overflow-hidden" style={{ backgroundColor: '#D9D9D9' }}>
                <VideoHero controls={true} />
              </div>
            </div>

            {/* Restaurant Trust Section */}
            <div className="w-full max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-8" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                  Some of the Restaurants That Trust us in the Tampa Bay Area
                </h3>
                <div className="flex items-center justify-center gap-8 lg:gap-12">
                  <img src="/coffee.png" alt="Coffee restaurant" className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/avenue.png" alt="Avenue restaurant" className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/Malai.png" alt="Malai restaurant" className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/Branzini.png" alt="Branzini restaurant" className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
