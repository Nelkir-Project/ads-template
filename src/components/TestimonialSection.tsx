import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const TestimonialSection: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={elementRef} className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Featured Testimonial - Desktop vs Mobile */}
        <div className={`max-w-4xl mx-auto px-4 sm:px-0 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-400' : ''}`}>
          
          {/* Desktop Layout - New Figma Design */}
          <div className="hidden lg:block">
            <blockquote className="text-3xl lg:text-4xl leading-tight mb-16 text-center" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
              "I was constantly worried about getting people through the door. With LocalSpot our restaurant stays busy and I finally have the time to focus on training my staff and making service even better".
            </blockquote>
            
            <div className="flex items-center justify-center">
              <div className="w-15 h-15 bg-gray-300 rounded-full mr-5 flex items-center justify-center">
                <img src="/karolyn.png" alt="Karolyn" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-base" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Karolyn</div>
                <div className="text-gray-600 text-sm" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Restaurant Manager</div>
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
