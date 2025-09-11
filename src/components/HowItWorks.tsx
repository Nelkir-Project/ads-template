import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { openCalendarBooking } from '../utils/calendarUtils';

const HowItWorks: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const steps = [
    {
      number: 1,
      title: "Be the Restaurant Everyone Visits",
      description: "Be found in Google, Facebook and Instagram.",
      features: [
        "Show up when diners search things like \"best bar\".",
        "Be the \"this restaurant has great reviews, let's go\".",
        "Keep your Social Media Fresh with Automated Posts.",
        "Get more diners booking online instead of calling."
      ],
      image: "/Be the restaurant everyone visits.png"
    },
    {
      number: 2,
      title: "Turn First-time Visitors Into Regulars",
      description: "Capture guest info and give them reasons to return",
      features: [
        "Let diners join your VIP club at your restaurant.",
        "Send a text message on their birthday with an offer.",
        "Promote offers during slow hours.",
        "Use a fun loyalty program to bring them back."
      ],
      image: "/Turn First Time Visitors 1.png"
    },
    {
      number: 3,
      title: "Run Smarter, Not Harder",
      description: "Understand what's happening in your restaurant when you are out",
      features: [
        "View restaurant performance in your dashboard.",
        "Learn what guests love (and what they don't) with insights from reviews and QR menus.",
        "Upsell with Pairing Suggestions",
        "Featured specials to spotlight your chef's best."
      ],
      image: "/Marketing for resturant owners 1.png"
    }
  ];

  return (
    <section ref={elementRef} id="how-it-works" className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        {/* Removed overall section title and subtitle per design */}

        <div className="space-y-16 sm:space-y-24 lg:space-y-28">
          {/* Step 1 */}
          <div className={`animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}>
            {/* Desktop-only title/subtitle centered above */}
            <div className="hidden lg:block mb-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-3 text-center" style={{fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 700}}>
                {steps[0].title}
              </h3>
              <p className="text-xl text-gray-600 text-center">
                {steps[0].description}
              </p>
            </div>
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
              {/* Image */}
              <div className="w-full mb-6 lg:mb-0 lg:col-span-7">
                <div className="bg-white rounded-none sm:rounded-2xl shadow-xl overflow-hidden">
                  <img 
                    src={steps[0].image} 
                    alt={steps[0].title}
                    className="w-full h-48 sm:h-64 lg:h-96 object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="px-4 sm:px-0 lg:px-0 lg:col-span-5">
              {/* Title + Subtitle (mobile/tablet only) */}
              <h3 className="lg:hidden text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-left" style={{fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 700}}>
                {steps[0].title}
              </h3>
              <p className="lg:hidden text-lg text-gray-600 mb-6 text-left">
                {steps[0].description}
              </p>
              
              {/* Features */}
              <div className="space-y-4 px-4">
                <h4 className="font-normal text-gray-900 text-lg">Features:</h4>
                <ul className="space-y-0.5">
                  {steps[0].features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-gray-700">
                      <span className="text-black mr-3 mt-1 flex-shrink-0">•</span>
                      <span className="text-base leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <button 
                    onClick={openCalendarBooking}
                    className="inline-flex items-center text-blue-600 font-normal hover:text-blue-700 transition-colors"
                  >
                    Get a Free Demo
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className={`animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-400' : ''}`}>
            {/* Desktop-only title/subtitle centered above */}
            <div className="hidden lg:block mb-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-3 text-center" style={{fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 700}}>
                {steps[1].title}
              </h3>
              <p className="text-xl text-gray-600 text-center">
                {steps[1].description}
              </p>
            </div>
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
              {/* Content */}
              <div className="px-4 sm:px-0 lg:px-0 lg:col-span-5 lg:order-1">
              {/* Title + Subtitle (mobile/tablet only) */}
              <h3 className="lg:hidden text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-left" style={{fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 700}}>
                {steps[1].title}
              </h3>
              <p className="lg:hidden text-lg text-gray-600 mb-6 text-left">
                {steps[1].description}
              </p>
              
              {/* Features */}
              <div className="space-y-4 px-4">
                <h4 className="font-normal text-gray-900 text-lg">Features:</h4>
                <ul className="space-y-0.5">
                  {steps[1].features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-gray-700">
                      <span className="text-black mr-3 mt-1 flex-shrink-0">•</span>
                      <span className="text-base leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <button 
                    onClick={openCalendarBooking}
                    className="inline-flex items-center text-blue-600 font-normal hover:text-blue-700 transition-colors"
                  >
                    Get a Free Demo
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
              {/* Image */}
              <div className="w-full mb-6 lg:mb-0 lg:col-span-7 lg:order-2">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-none sm:rounded-2xl shadow-xl overflow-hidden p-4 sm:p-8">
                  <img 
                    src={steps[1].image} 
                    alt={steps[1].title}
                    className="w-full h-48 sm:h-64 lg:h-96 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className={`animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-600' : ''}`}>
            {/* Desktop-only title/subtitle centered above */}
            <div className="hidden lg:block mb-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-3 text-center" style={{fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 700}}>
                {steps[2].title}
              </h3>
              <p className="text-xl text-gray-600 text-center">
                {steps[2].description}
              </p>
            </div>
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
              {/* Image with special border */}
              <div className="w-full mb-6 lg:mb-0 lg:col-span-7">
                <div className="relative">
                  <div className="bg-white rounded-none sm:rounded-2xl shadow-xl overflow-hidden border-0 sm:border-2 border-dashed border-blue-300">
                    <img 
                      src={steps[2].image} 
                      alt={steps[2].title}
                      className="w-full h-48 sm:h-64 lg:h-96 object-cover"
                    />
                  </div>
                  {/* Rating badge */}
                  <div className="absolute -bottom-4 left-2 sm:left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-normal">
                    592 ⭐ 343
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-4 sm:px-0 lg:px-0 lg:col-span-5">
              {/* Title + Subtitle (mobile/tablet only) */}
              <h3 className="lg:hidden text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-left" style={{fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 700}}>
                {steps[2].title}
              </h3>
              <p className="lg:hidden text-lg text-gray-600 mb-6 text-left">
                {steps[2].description}
              </p>
              
              {/* Features */}
              <div className="space-y-4 px-4">
                <h4 className="font-normal text-gray-900 text-lg">Features:</h4>
                <ul className="space-y-0.5">
                  {steps[2].features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-gray-700">
                      <span className="text-black mr-3 mt-1 flex-shrink-0">•</span>
                      <span className="text-base leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <button 
                    onClick={openCalendarBooking}
                    className="inline-flex items-center text-blue-600 font-normal hover:text-blue-700 transition-colors"
                  >
                    Get a Free Demo
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
