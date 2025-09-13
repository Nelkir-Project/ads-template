import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCountingAnimation } from '../hooks/useCountingAnimation';

const TestimonialSection: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const teamCount = useCountingAnimation(isIntersecting, { end: 2500, separator: ',' });

  return (
    <section ref={elementRef} className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className={`text-center mb-6 sm:mb-8 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up' : ''}`}>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 sm:mb-6 px-4">
            Helping <span className="text-blue-600">{teamCount}+</span> restaurant owners grow their business
          </h2>
          
          {/* Separator Line */}
          <div className="w-16 sm:w-24 h-px bg-gray-300 mx-auto mb-6 sm:mb-8"></div>
        </div>

        {/* Restaurant Logos - Responsive Grid */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 mb-12 sm:mb-16 opacity-60 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in animate-delay-200' : ''}`}>
          {['AvenueBlue', 'The Local', 'Bistro 42', 'Corner Cafe', 'Urban Eats', 'The Spot', 'Main Street'].map((company, index) => (
            <div 
              key={company} 
              className={`h-12 sm:h-16 bg-gray-200 rounded flex items-center justify-center animate-on-scroll ${isIntersecting ? `animate animate-fade-in-up animate-delay-${300 + index * 100}` : ''}`}
            >
              <span className="text-xs text-gray-500 text-center px-1 sm:px-2">{company}</span>
            </div>
          ))}
        </div>

        {/* Featured Testimonial - Desktop vs Mobile */}
        <div className={`max-w-4xl mx-auto px-4 sm:px-0 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-400' : ''}`}>
          
          {/* Desktop Layout - New Figma Design */}
          <div className="hidden lg:block">
            <blockquote className="text-4xl lg:text-5xl leading-tight mb-16 text-center" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
              "I was constantly worried about getting people through the door. With LocalSpot our restaurant stays busy and I finally have the time to focus on training my staff and making service even better".
            </blockquote>
            
            <div className="flex items-center justify-center">
              <div className="w-15 h-15 bg-gray-300 rounded-full mr-5 flex items-center justify-center">
                <img src="/Screenshot 2025-08-31 at 3.58.18 PM 1.png" alt="Karolyn" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-lg" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Karolyn</div>
                <div className="text-gray-600 text-base" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Restaurant Manager</div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout - Keep Original */}
          <div className="lg:hidden bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm">
            <blockquote className="text-lg sm:text-xl text-gray-700 mb-4 sm:mb-6 italic text-center leading-relaxed">
              "LocalSpot has been a game changer, it runs in the background, making my restaurant busy, and saving me a lot of time. Now I'm mostly focused on improving service rather than worrying about how many customers are coming today"
            </blockquote>
            
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full mr-3 sm:mr-4"></div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-sm sm:text-base">Donny</div>
                <div className="text-gray-600 text-xs sm:text-sm">AvenueBlue</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
