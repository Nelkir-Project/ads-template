import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { openCalendarBooking } from '../utils/calendarUtils';

const HowItWorks: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  
  const sections = [
    {
      title: "Be the Restaurant Everyone Visits",
      subtitle: "Be found in Google, Facebook and Instagram.",
      features: [
        "Show up when diners search things like \"best bar\".",
        "Be the \"this restaurant has great reviews, let's go\".",
        "Keep your Social Media Fresh with Automated Posts.",
        "Get more diners booking online instead of calling."
      ],
      image: "/Be the restaurant everyone visits.png",
      imageFirst: true
    },
    {
      title: "Turn First-time Visitors Into Regulars", 
      subtitle: "Capture guest info and give them reasons to return",
      features: [
        "Let diners join your VIP club at your restaurant.",
        "Send a text message on their birthday with an offer.",
        "Promote offers during slow hours.",
        "Use a fun loyalty program to bring them back."
      ],
      image: "/Turn First Time Visitors 1.png",
      imageFirst: false
    },
    {
      title: "Run Smarter, Not Harder",
      subtitle: "Understand what's happening in your restaurant when you are out",
      features: [
        "View restaurant performance in your dashboard.",
        "Learn what guests love (and what they don't) with insights from reviews and QR menus.",
        "Upsell with Pairing Suggestions",
        "Featured specials to spotlight your chef's best."
      ],
      image: "/Marketing for resturant owners 1.png",
      imageFirst: true
    }
  ];

  return (
    <section ref={elementRef} id="how-it-works" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        <div className="space-y-16 sm:space-y-24 lg:space-y-28">
          {sections.map((section, index) => (
            <div key={index} className={`animate-on-scroll ${isIntersecting ? `animate animate-fade-in-up animate-delay-${(index + 1) * 200}` : ''}`}>
              
              {/* Desktop Layout - New Figma Design */}
              <div className="hidden lg:block">
                {/* Section Header - Centered */}
                <div className="text-center mb-18">
                  <h2 className="text-4xl font-normal leading-tight mb-4" style={{ color: 'rgba(0, 0, 0, 0.9)' }}>
                    {section.title}
                  </h2>
                  <p className="text-xl leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                    {section.subtitle}
                  </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-12 gap-16 items-center">
                  {/* Image */}
                  <div className={`col-span-7 ${section.imageFirst ? 'order-1' : 'order-2'}`}>
                    <div className="relative">
                      <img 
                        src={section.image} 
                        alt={section.title}
                        className="w-full h-80 object-cover rounded-3xl"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`col-span-5 ${section.imageFirst ? 'order-2' : 'order-1'}`}>
                    <div className="space-y-6">
                      {/* Features */}
                      <div>
                        <h4 className="text-base font-normal text-gray-900 mb-4">Features:</h4>
                        <ul className="space-y-3">
                          {section.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <span className="text-black mr-3 flex-shrink-0 leading-relaxed">•</span>
                              <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-4">
                        <button 
                          onClick={openCalendarBooking}
                          className="inline-flex items-center text-blue-600 font-normal hover:text-blue-700 transition-colors group"
                        >
                          Get a Free Demo
                          <svg className="ml-2 w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m12 5 7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile/Tablet Layout - Keep Original Design */}
              <div className="lg:hidden">
                <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
                  {/* Image */}
                  <div className={`w-full mb-6 lg:mb-0 lg:col-span-7 ${section.imageFirst ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className={`${index === 1 ? 'bg-gradient-to-br from-blue-50 to-purple-50' : 'bg-white'} rounded-none sm:rounded-2xl shadow-xl overflow-hidden ${index === 1 ? 'p-4 sm:p-8' : ''} ${index === 2 ? 'border-0 sm:border-2 border-dashed border-blue-300 relative' : ''}`}>
                      <img 
                        src={section.image} 
                        alt={section.title}
                        className={`w-full h-48 sm:h-64 lg:h-96 ${index === 1 ? 'object-contain' : 'object-cover'}`}
                      />
                      {index === 2 && (
                        <div className="absolute -bottom-4 left-2 sm:left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-normal">
                          592 ⭐ 343
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`px-4 sm:px-0 lg:px-0 lg:col-span-5 ${section.imageFirst ? 'lg:order-2' : 'lg:order-1'}`}>
                    {/* Title + Subtitle (mobile/tablet only) */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-left" style={{fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 700}}>
                      {section.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6 text-left">
                      {section.subtitle}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-4 px-4">
                      <h4 className="font-normal text-gray-900 text-lg">Features:</h4>
                      <ul className="space-y-0.5">
                        {section.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-gray-700">
                            <span className="text-black mr-3 flex-shrink-0 leading-snug">•</span>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;