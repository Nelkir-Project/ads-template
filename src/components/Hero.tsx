import React from 'react'

const Hero: React.FC = () => {
  // (debug logger removed)

  return (
    <section className="hero-section py-4 sm:py-8 lg:py-10 bg-white">
      {/* Mobile Layout - Keep existing mobile design */}
      <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6">
        <div>
          <p className="ml-4 text-gray-800 mb-3 sm:mb-4 text-2xl font-semibold subtitle-text max-w-[300px]">
            Trusted by Local Restaurants
          </p>

          {/* Success Stories Section - Mobile Carousel */}
          <div className="w-full mt-4 mb-8">
            <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-4 px-4 pb-4">
              {/* Success Card 1 */}
              <div className="flex-shrink-0 w-[85%] snap-center rounded-2xl overflow-hidden">
                <img
                  src="/Instagram story - 3.png"
                  alt="Restaurant success story"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Success Card 2 */}
              <div className="flex-shrink-0 w-[85%] snap-center rounded-2xl overflow-hidden">
                <img
                  src="/Instagram story - 4.png"
                  alt="Restaurant success story"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Success Card 3 */}
              <div className="flex-shrink-0 w-[85%] snap-center rounded-2xl overflow-hidden">
                <img
                  src="/Instagram story - 5.png"
                  alt="Restaurant success story"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Carousel Dots Indicator */}
            <div className="flex justify-center gap-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>

            {/* Our Partners Section - Mobile */}
            <div className="text-center px-4 hidden lg:block">
              <h3 className="text-sm font-medium text-gray-600 mb-4">
                Our Partners
              </h3>
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <img
                  src="/google.png"
                  alt="Google"
                  className="h-6 w-auto opacity-70"
                />
                <img
                  src="/aws-logo.png"
                  alt="AWS"
                  className="h-6 w-auto opacity-70"
                />
                <img
                  src="/meta-logo.png"
                  alt="Meta"
                  className="h-6 w-auto opacity-70"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - New Figma Design */}
      <div className="hidden lg:block max-w-7xl mx-auto px-8">
        <div>
          {/* Main Headline - Figma: opacity 0.9 */}

          <p className="text-gray-800 mb-3 sm:mb-4 text-2xl font-semibold subtitle-text">
            Trusted by Local Restaurant Owners
          </p>

          {/* Success Stories Section */}
          <div className="w-full max-w-7xl mx-auto mb-8">
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
            <div className="text-center hidden lg:block">
              <h3 className="font-medium text-gray-600 mb-6">Our Partners</h3>
              <div className="flex items-center justify-center gap-12">
                <img
                  src="/googlel.png"
                  alt="Google"
                  className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/aws-logo.png"
                  alt="AWS"
                  className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/meta-logo.png"
                  alt="Meta"
                  className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
