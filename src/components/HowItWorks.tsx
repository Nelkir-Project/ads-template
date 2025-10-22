import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { openCalendarBooking } from '../utils/calendarUtils';

const HowItWorks: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  
  const sections = [
    {
      title: "Get More Customers to Your Restaurant",
      subtitle: "Be found in Google, Facebook and Instagram.",
      featuresLabel: "A Digital Marketing Strategy That Helps You:",
      features: [
        "Get a Custom Website Design for your restaurant.",
        "Show up when diners search things like \"best bar\".",
        "Be the \"this restaurant has great reviews, let's go\".",
        "Keep your Social Media Fresh with Automated Posts.",
        "Get more diners booking online instead of calling."
      ],
      image: "/Get More Customers to Your Restaurant.jpg",
      imageFirst: true
    },
    {
      title: "Turn First-Time Diners Into Loyal Guests", 
      subtitle: "Capture guest info and give them reasons to return",
      featuresLabel: "A Loyalty Program for Restaurants That Helps You:",
      features: [
        "Let diners join your VIP club at your restaurant.",
        "Send a text message on their birthday with an offer.",
        "Promote offers during slow hours.",
        "Use a fun loyalty program to bring them back."
      ],
      image: "/Turn First-Time Diners Into Loyal Guests.jpg",
      imageFirst: false
    },
    {
      title: "Turn Your Menu Into a Sales Tool",
      subtitle: "Understand what's happening in your restaurant when you are out",
      featuresLabel: "Smart Menu Insights That Help You:",
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
    <section ref={elementRef} id="how-it-works" className="bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        <div className="space-y-16 sm:space-y-24 lg:space-y-28">
          {sections.map((section, index) => (
            <div key={index} className={`animate-on-scroll ${isIntersecting ? `animate animate-fade-in-up animate-delay-${(index + 1) * 200}` : ''}`}>
              
              {/* Desktop Layout - New Figma Design */}
              <div className="hidden lg:block">
                {/* Section Header - Centered */}
                <div className="text-center mb-18">
                  <h2 className="text-4xl font-normal leading-tight mb-4 text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                  <p className="subtitle-text text-xl font-bold leading-relaxed text-gray-600 dark:text-gray-300">
                    {section.subtitle}
                  </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-12 gap-16 items-center">
                  {/* Image */}
                  <div className={`col-span-6 ${section.imageFirst ? 'order-1' : 'order-2'}`}>
                    <div className="relative">
                      <img 
                        src={section.image} 
                        alt={section.title}
                        className="w-full h-auto object-contain rounded-3xl"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`col-span-6 ${section.imageFirst ? 'order-2' : 'order-1'}`}>
                    <div className="space-y-6">
                      {/* Features */}
                      <div>
                        <h4 className="font-normal text-gray-900 dark:text-white mb-4">{section.featuresLabel}</h4>
                        <ul className="space-y-3">
                          {section.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-baseline">
                              <span className="text-black dark:text-white mr-3 flex-shrink-0">•</span>
                              <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-4">
                        <button 
                          onClick={openCalendarBooking}
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 font-normal hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
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
                  <div className={`w-full mb-6 lg:mb-0 lg:col-span-6 ${section.imageFirst ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className={`${index === 1 ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20' : 'bg-white dark:bg-gray-800'} rounded-none sm:rounded-2xl shadow-xl overflow-hidden ${index === 1 ? 'p-4 sm:p-8' : ''} ${index === 2 ? 'border-0 sm:border-2 border-dashed border-blue-300 dark:border-blue-600 relative' : ''}`}>
                      <img 
                        src={section.image} 
                        alt={section.title}
                        className={`w-full h-auto object-contain`}
                      />
                      {index === 2 && (
                        <div className="absolute -bottom-4 left-2 sm:left-4 bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-normal">
                          592 ⭐ 343
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`px-4 sm:px-0 lg:px-0 lg:col-span-6 ${section.imageFirst ? 'lg:order-2' : 'lg:order-1'}`}>
                    {/* Title + Subtitle (mobile/tablet only) */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-left" style={{fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 700}}>
                      {section.title}
                    </h3>
                    <p className="subtitle-text text-lg font-bold text-gray-600 dark:text-gray-300 mb-6 text-left">
                      {section.subtitle}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-4 px-4">
                      <h4 className="font-normal text-gray-900 dark:text-white">{section.featuresLabel}</h4>
                      <ul className="space-y-0.5">
                        {section.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-baseline text-gray-700 dark:text-gray-300">
                            <span className="text-black dark:text-white mr-3 flex-shrink-0">•</span>
                            <span className="leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4">
                        <button 
                          onClick={openCalendarBooking}
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 font-normal hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
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