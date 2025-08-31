import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const HowItWorks: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const steps = [
    {
      number: 1,
      title: "Be the Restaurant Everyone Finds First",
      description: "Be found in Google, Facebook and Instagram.",
      features: [
        "Show up when locals search \"best drinks.\"",
        "Guests get a text to leave a review → 5-stars climb.",
        "Specials post to Instagram automatically.",
        "Diners book online instead of calling."
      ],
      image: "Restaurant Discovery Interface"
    },
    {
      number: 2,
      title: "Turn Diners Into Regulars",
      description: "Capture guest info once and give them reasons to return",
      features: [
        "A diner joins your VIP club at your restaurant.",
        "On their birthday, they get a free dessert text.",
        "Guests see your event and book again.",
        "A loyalty card in their phone brings them back."
      ],
      image: "Customer Retention Interface"
    },
    {
      number: 3,
      title: "Run Smarter, Not Harder",
      description: "Understand what's happening in your restaurant through reviews and QR menu analytics.",
      features: [
        "See top-clicked dishes in your dashboard.",
        "Learn what guests love (and what they don't) with insights from reviews and QR menus.",
        "Pairing suggestions help staff upsell.",
        "Featured dishes spotlight your chef's best."
      ],
      image: "Analytics Dashboard Interface"
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

        <div className="space-y-12 sm:space-y-16">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} animate-on-scroll ${isIntersecting ? `animate animate-fade-in-up animate-delay-${200 + index * 100}` : ''}`}
            >
              {/* Content */}
              <div className="lg:w-1/2 text-center lg:text-left px-4 lg:px-0">
                <div className="flex flex-col sm:flex-row items-center lg:items-start mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg sm:text-xl mr-0 sm:mr-4 mb-3 sm:mb-0">
                    {step.number}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
                  {step.description}
                </p>
                
                {/* Features List */}
                {step.features && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Features:</h4>
                    <ul className="space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-gray-600">
                          <span className="text-green-500 mr-2 mt-1 flex-shrink-0">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Image Placeholder */}
              <div className="lg:w-1/2 w-full px-4 lg:px-0">
                <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 h-48 sm:h-64 flex items-center justify-center border">
                  <span className="text-gray-400 text-center text-sm sm:text-base">{step.image}</span>
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
