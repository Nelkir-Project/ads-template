import React from 'react';
import VideoHero from './VideoHero';

const Hero: React.FC = () => {

  // (debug logger removed)

  return (
    <>
      {/* Mobile Video - Full width, no margins, directly after header */}
      <div className="lg:hidden w-full mb-8">
        <VideoHero 
          controls={true} 
          priority={true}
          poster="/mainposter.webp"
        />
      </div>
      
      <section className="hero-section py-8 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
        {/* Mobile Layout - Keep existing mobile design */}
        <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-left relative z-10">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-4">
              Automated Marketing System for Restaurants
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 px-4">
              Your restaurant deserves to be the local spot everyone loves. With LocalSpot, people discover you, return more often, and spends a little more.
            </p>

            {/* Customer Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8 px-4">
              <div className="relative flex items-center">
                <div className="flex -space-x-2 relative z-10">
                  <img src="/1.png" alt="Customer" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
                  <img src="/2.png" alt="Customer" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
                  <img src="/3.png" alt="Customer" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
                  <img src="/4.png" alt="Customer" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" />
                </div>
                <div className="bg-white dark:bg-gray-800 px-3 py-1 ml-2 rounded relative z-0">
                  <span className="font-normal whitespace-nowrap text-gray-600 dark:text-gray-300">
                    +10,000 Diners Love LocalSpot
                  </span>
                </div>
              </div>
              <div className="flex items-center text-yellow-500">
                <span className="text-gray-600 dark:text-gray-300">⭐ Typical payback: 20 days</span>
              </div>
            </div>


          </div>
        </div>

        {/* Desktop Layout - New Figma Design */}
        <div className="hidden lg:block max-w-4xl mx-auto px-8">
          <div className="text-center">
            {/* Main Headline - Figma: opacity 0.9 */}
            <h1 className="text-5xl xl:text-6xl font-normal leading-tight mb-8 text-gray-900 dark:text-white">
              Automated Marketing System for Restaurants
            </h1>
            
            {/* Subtitle - Figma: opacity 0.65 */}
            <p className="mb-16 max-w-4xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
              Your restaurant deserves to be the local spot everyone loves. With LocalSpot, people discovers you, return more often, and spends a little more.
            </p>

            {/* Trust Indicators Bar - positioned above video */}
            <div className="flex items-center justify-center gap-6 mb-6">
              {/* Left Column - Overlapping Images + Text */}
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm flex items-center gap-3" style={{ height: '33px' }}>
                <div className="flex -space-x-2">
                  <img src="/1.png" alt="Customer" className="w-6 h-6 rounded-full object-cover" />
                  <img src="/2.png" alt="Customer" className="w-6 h-6 rounded-full object-cover" />
                  <img src="/3.png" alt="Customer" className="w-6 h-6 rounded-full object-cover" />
                  <img src="/4.png" alt="Customer" className="w-6 h-6 rounded-full object-cover" />
                </div>
                <span className="whitespace-nowrap text-gray-600 dark:text-gray-300">
                  +10,000 Diners Love LocalSpot
                </span>
              </div>
              
              {/* Right Column - Google Reviews */}
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm flex items-center gap-3" style={{ height: '33px' }}>
                <img src="/image 2018.png" alt="Google Reviews" className="h-5 w-auto" />
                <span className="whitespace-nowrap text-gray-600 dark:text-gray-300">
                  5.0 Stars in Google Reviews
                </span>
              </div>
            </div>

            {/* Video Container - Figma: gray background #D9D9D9 */}
            <div className="w-full max-w-4xl mx-auto mb-16">
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden">
                <VideoHero 
                  controls={true} 
                  priority={true}
                  poster="/mainposter.webp"
                />
              </div>
            </div>

            {/* Restaurant Trust Section */}
            <div className="w-full max-w-4xl mx-auto">
              <div className="text-center">
                <h3 className="font-medium mb-8 text-gray-600 dark:text-gray-400">
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
