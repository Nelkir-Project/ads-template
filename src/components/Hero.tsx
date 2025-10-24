import React from 'react';
import VideoHero from './VideoHero';

const Hero: React.FC = () => {

  // (debug logger removed)

  return (
    <>
      {/* Mobile Video - Full width, no margins, directly after header */}
      <div className="lg:hidden w-full mb-4">
        <VideoHero 
          priority={true}
          poster="/mainposter.webp"
        />
      </div>
      
      <section className="hero-section py-4 sm:py-8 lg:py-10 bg-white dark:bg-gray-900">
        {/* Mobile Layout - Keep existing mobile design */}
        <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-left relative z-10">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-gray-900 dark:text-white mb-2 sm:mb-3 leading-tight px-4">
              Automated Marketing System for Restaurants
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 px-4">
              Your restaurant deserves to be the local spot everyone loves. With LocalSpot, people discover you, return more often, and spends a little more.
            </p>

            {/* Customer Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-3 sm:mb-4 px-4">
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

            {/* Feature Cards - Mobile - Single column */}
            <div className="px-4 space-y-3 mb-4">
              {/* Card 1 */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#F6F7FB' }}>
                <img 
                  src="/Get More Customers to Your Restaurant.jpg" 
                  alt="Be found in Google, Facebook, and Instagram"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Be found in Google, Facebook, and Instagram
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Show up in Google or Instagram when diners search things like "best bar near me"
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#F6F7FB' }}>
                <img 
                  src="/Turn First-Time Diners Into Loyal Guests.jpg" 
                  alt="Turn First-Time Diners Into Loyal Guests"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Turn First-Time Diners Into Loyal Guests
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Automatically capture guest info and give them reasons to return
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#F6F7FB' }}>
                <img 
                  src="/Marketing for resturant owners 1.png" 
                  alt="Know what's going on when you are out"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Know what's going on when you are out
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    Learn what guests love (and what they don't) with insights from reviews and QR menus
                  </p>
                </div>
              </div>
            </div>

            {/* Success Stories Section - Mobile */}
            <div className="w-full px-4 mt-4">
              <div className="space-y-2 mb-8">
                {/* Success Card 1 */}
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src="/Instagram story - 3.png" 
                    alt="Restaurant success story"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Success Card 2 */}
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src="/Instagram story - 4.png" 
                    alt="Restaurant success story"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Success Card 3 */}
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src="/Instagram story - 5.png" 
                    alt="Restaurant success story"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Our Partners Section - Mobile */}
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                  Our Partners
                </h3>
                <div className="flex items-center justify-center gap-8 flex-wrap">
                  <img src="/google.png" alt="Google" className="h-6 w-auto opacity-70" />
                  <img src="/aws-logo.png" alt="AWS" className="h-6 w-auto opacity-70" />
                  <img src="/meta-logo.png" alt="Meta" className="h-6 w-auto opacity-70" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Desktop Layout - New Figma Design */}
        <div className="hidden lg:block max-w-7xl mx-auto px-8">
          <div className="text-center">
            {/* Main Headline - Figma: opacity 0.9 */}
            <h1 className="text-5xl xl:text-6xl font-normal leading-tight mb-4 text-gray-900 dark:text-white">
              Automated Marketing System for Restaurants
            </h1>
            
            {/* Subtitle - Figma: opacity 0.65 */}
            <p className="mb-8 max-w-5xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
              Your restaurant deserves to be the local spot everyone loves. With LocalSpot, people discovers you, return more often, and spends a little more.
            </p>

            {/* Trust Indicators Bar - positioned above feature cards */}
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

            {/* Feature Cards - 3 columns */}
            <div className="w-full max-w-5xl mx-auto mb-8">
              <div className="grid grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="rounded-2xl p-6" style={{ backgroundColor: '#F6F7FB' }}>
                  <img 
                    src="/Get More Customers to Your Restaurant.jpg" 
                    alt="Be found in Google, Facebook, and Instagram"
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Be found in Google, Facebook, and Instagram
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      Show up in Google or Instagram when diners search things like "best bar near me"
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="rounded-2xl p-6" style={{ backgroundColor: '#F6F7FB' }}>
                  <img 
                    src="/Turn First-Time Diners Into Loyal Guests.jpg" 
                    alt="Turn First-Time Diners Into Loyal Guests"
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Turn First-Time Diners Into Loyal Guests
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      Automatically capture guest info and give them reasons to return
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="rounded-2xl p-6" style={{ backgroundColor: '#F6F7FB' }}>
                  <img 
                    src="/Marketing for resturant owners 1.png" 
                    alt="Know what's going on when you are out"
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Know what's going on when you are out
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      Learn what guests love (and what they don't) with insights from reviews and QR menus
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Container - Figma: gray background #D9D9D9 */}
            <div className="w-full max-w-5xl mx-auto mb-8">
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden">
                <VideoHero 
                  priority={true}
                  poster="/mainposter.webp"
                />
              </div>
            </div>

            {/* Success Stories Section */}
            <div className="w-full max-w-5xl mx-auto mb-8">
              <div className="grid grid-cols-3 gap-4 mb-12">
                {/* Success Card 1 */}
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src="/Instagram story - 3.png" 
                    alt="Restaurant success story"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Success Card 2 */}
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src="/Instagram story - 4.png" 
                    alt="Restaurant success story"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Success Card 3 */}
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src="/Instagram story - 5.png" 
                    alt="Restaurant success story"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Our Partners Section */}
              <div className="text-center">
                <h3 className="font-medium text-gray-600 dark:text-gray-400 mb-6">
                  Our Partners
                </h3>
                <div className="flex items-center justify-center gap-12">
                  <img src="/googlel.png" alt="Google" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/aws-logo.png" alt="AWS" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
                  <img src="/meta-logo.png" alt="Meta" className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity" />
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
