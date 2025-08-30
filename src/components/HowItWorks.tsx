import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const HowItWorks: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const steps = [
    {
      number: 1,
      title: "Pick a Campaign to Optimize",
      description: "Select any campaign you want our AI to hyper-optimize.",
      image: "Campaign Selection Interface"
    },
    {
      number: 2,
      title: "Target Your Biggest Money Drains",
      description: "Set your timeframe and spend threshold to focus on the search terms that are burning through your budget the fastest.",
      image: "Search Terms Selection Interface"
    },
    {
      number: 3,
      title: "Watch Our AI Expose Money-Wasting Terms",
      description: "See exactly which search terms are stealing your budget, with exclusion scores, expert rationales, and real spend data.",
      image: "AI Analysis Results Interface"
    },
    {
      number: 4,
      title: "Watch Your Savings Soar in Real-Time",
      description: "Select the terms to exclude and watch as we instantly calculate how much money you'll save every month.",
      image: "Term Selection Interface"
    },
    {
      number: 5,
      title: "One Click to Stop the Money Bleed",
      description: "With a single click, we'll add these terms as negatives to your campaign and shared exclusion lists directly to Google Ads.",
      image: "Apply Negatives Interface"
    },
    {
      number: 6,
      title: "See Your ROAS Explode",
      description: "Watch as we show you exactly how much money you're saving, with the metrics that prove your Return On Ad Spend is about to skyrocket.",
      image: "Results Summary Interface"
    }
  ];

  return (
    <section ref={elementRef} id="how-it-works" className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 sm:mb-16 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up' : ''}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 px-4">
            How We Save You Money 💰
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto px-4">
            Our AI instantly identifies and eliminates money-wasting search terms, transforming your wasted ad spend into high-converting traffic. This is exactly how we do it:
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
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {step.description}
                </p>
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
