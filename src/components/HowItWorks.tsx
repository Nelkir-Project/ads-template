import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 sm:mb-16 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up' : ''}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 px-4">
            How LocalSpot Works 🍽️
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto px-4">
            Our restaurant marketing system helps you attract more guests, turn them into regulars, and run your restaurant smarter. Here's exactly how we do it:
          </p>
        </div>

        <div className="space-y-16 sm:space-y-24">
          {/* Step 1 - Image on left, content on right */}
          <div className={`animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}>
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {steps[0].title}
              </h3>
              <p className="text-lg text-gray-600">
                {steps[0].description}
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Image */}
              <div className="lg:w-1/2 w-full">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <img 
                    src={steps[0].image} 
                    alt={steps[0].title}
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="lg:w-1/2 w-full">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">Features:</h4>
                  <ul className="space-y-1">
                    {steps[0].features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-700">
                        <span className="text-green-500 mr-3 mt-1 flex-shrink-0">•</span>
                        <span className="text-base leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <button className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
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

          {/* Step 2 - Content on left, image on right */}
          <div className={`animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-400' : ''}`}>
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {steps[1].title}
              </h3>
              <p className="text-lg text-gray-600">
                {steps[1].description}
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
              {/* Image */}
              <div className="lg:w-1/2 w-full">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl overflow-hidden p-8">
                  <img 
                    src={steps[1].image} 
                    alt={steps[1].title}
                    className="w-full h-64 sm:h-80 object-contain"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="lg:w-1/2 w-full">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">Features:</h4>
                  <ul className="space-y-1">
                    {steps[1].features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-700">
                        <span className="text-green-500 mr-3 mt-1 flex-shrink-0">•</span>
                        <span className="text-base leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <button className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
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

          {/* Step 3 - Image on left, content on right with special styling */}
          <div className={`animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-600' : ''}`}>
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {steps[2].title}
              </h3>
              <p className="text-lg text-gray-600">
                {steps[2].description}
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Image with special border */}
              <div className="lg:w-1/2 w-full">
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-dashed border-blue-300">
                    <img 
                      src={steps[2].image} 
                      alt={steps[2].title}
                      className="w-full h-64 sm:h-80 object-cover"
                    />
                  </div>
                  {/* Rating badge */}
                  <div className="absolute -bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    592 ⭐ 343
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="lg:w-1/2 w-full">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 text-lg">Features:</h4>
                  <ul className="space-y-1">
                    {steps[2].features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-700">
                        <span className="text-green-500 mr-3 mt-1 flex-shrink-0">•</span>
                        <span className="text-base leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <button className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
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
