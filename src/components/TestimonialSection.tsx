import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCountingAnimation } from '../hooks/useCountingAnimation';

const TestimonialSection: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  const teamCount = useCountingAnimation(isIntersecting, { end: 2500, separator: ',' });

  return (
    <section ref={elementRef} className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className={`text-center mb-8 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up' : ''}`}>
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Empowering <span className="text-blue-600">{teamCount}+</span> marketing teams to achieve exceptional results
          </h2>
          
          {/* Separator Line */}
          <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
        </div>

        {/* Company Logos - Full Width Grid */}
        <div className={`grid grid-cols-7 gap-4 mb-16 opacity-60 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in animate-delay-200' : ''}`}>
          {['Zight', 'Tilt Metrics', 'Monograph', 'Single Stone', 'Ecos', 'Hunter', 'Casebook'].map((company, index) => (
            <div 
              key={company} 
              className={`h-16 bg-gray-200 rounded flex items-center justify-center animate-on-scroll ${isIntersecting ? `animate animate-fade-in-up animate-delay-${300 + index * 100}` : ''}`}
            >
              <span className="text-xs text-gray-500 text-center px-2">{company}</span>
            </div>
          ))}
        </div>

        {/* Featured Testimonial - White Box */}
        <div className={`max-w-4xl mx-auto animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-400' : ''}`}>
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <blockquote className="text-xl text-gray-700 mb-6 italic text-center">
              "Cascader cut my negative keyword review time from hours to minutes. It's a no-brainer for any agency juggling multiple accounts."
            </blockquote>
            
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Abra Lipton</div>
                <div className="text-gray-600 text-sm">Growth Marketing Consultant</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
