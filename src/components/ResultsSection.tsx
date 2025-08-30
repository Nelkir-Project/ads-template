import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCountingAnimation } from '../hooks/useCountingAnimation';

const ResultsSection: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });
  
  // Counting animations for stats
  const totalSavings = useCountingAnimation(isIntersecting, { end: 1138896, prefix: '$', separator: ',' });
  const advertisers = useCountingAnimation(isIntersecting, { end: 340, suffix: '+' });
  const avgSavings = useCountingAnimation(isIntersecting, { end: 35, prefix: '$', suffix: 'K' });

  return (
    <section ref={elementRef} className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Testimonial */}
        <div className={`max-w-4xl mx-auto mb-16 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up' : ''}`}>
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <blockquote className="text-xl text-gray-700 mb-6 italic text-center">
              "Cascader's support is excellent, and the tool has saved me hours by giving me key insights to block negative keywords I wouldn't have caught without stressful manual work. Now my budget is more focused on growth."
            </blockquote>
            
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                <span className="text-gray-600 font-bold text-sm">OA</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Omar Abu-Shaaban</div>
                <div className="text-gray-600 text-sm">MedShop Direct</div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Stats */}
        <div className={`text-center mb-16 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}>
          {/* Green Tag */}
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold mb-6">
            <span className="mr-2">⚡</span>
            Real Results, Real Savings
          </div>
          
          {/* Large Number */}
          <div className="text-6xl md:text-7xl font-bold text-green-600 mb-4">{totalSavings}</div>
          
          {/* Description */}
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            in wasted spend <span className="font-semibold">reclaimed for advertisers like you.</span> Every dollar saved is a dollar that can drive real growth for your business.
          </p>

          {/* Stats Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl">👥</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{advertisers}</div>
              <p className="text-gray-600">Trusted by advertisers worldwide</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">📈</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{avgSavings}</div>
              <p className="text-gray-600">Average savings per customer</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 text-xl">⚡</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">&lt; 3 hours</div>
              <p className="text-gray-600">To cover your subscription cost</p>
            </div>
          </div>
        </div>

        {/* Second Testimonial */}
        <div className={`max-w-4xl mx-auto animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-400' : ''}`}>
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <blockquote className="text-xl text-gray-700 mb-6 italic text-center">
              "After just two scans, Cascader had already paid for itself. Now we run it on every high-spend account."
            </blockquote>
            
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Danielle Wilbur</div>
                <div className="text-gray-600 text-sm">Sr. Paid Media Strategist</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
