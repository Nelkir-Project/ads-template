import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ResultsSection: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={elementRef} className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Testimonial - Desktop vs Mobile */}
        <div className={`mb-12 sm:mb-16 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up' : ''}`}>
          
          {/* Desktop Layout - New Figma Design */}
          <div className="hidden lg:block">
            <blockquote className="text-3xl lg:text-4xl leading-tight mb-16 max-w-5xl" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
              "I had no idea I was missing out over $25,000 a month. LocalSpot brought new guests in less than a week."
            </blockquote>
            
            <div className="flex items-center">
              <div className="w-15 h-15 bg-gray-300 rounded-full mr-5 flex items-center justify-center">
                <span className="text-gray-600 font-bold text-base">MM</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-base" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Michael</div>
                <div className="text-gray-600 text-sm" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Restaurant Owner</div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout - Keep Original */}
          <div className="lg:hidden">
            <blockquote className="text-xl sm:text-2xl text-gray-800 mb-6 leading-relaxed max-w-4xl">
              "I was constantly worried about wasted ad spend eating into our profits. <span className="font-semibold">With LocalSpot</span> our campaigns stay profitable and I finally have the time to focus on scaling our business and improving our marketing strategy".
            </blockquote>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                <span className="text-gray-600 font-bold text-sm">SM</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Sarah</div>
                <div className="text-gray-600 text-sm">Marketing Director</div>
              </div>
            </div>
          </div>
        </div>

        {/* Green Tag */}
        <div className={`mb-8 text-center animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-100' : ''}`}>
          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-medium text-base">
            Real Results, Real Growth
          </div>
        </div>

        {/* Feature Grid - Desktop vs Mobile */}
        <div className={`mb-16 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}>
          
          {/* Desktop Layout - New Figma Design */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-12">
              {/* Top Left - Attract more guests */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Attract more guests</h3>
                <p className="text-gray-600 leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                  With LocalSpot, restaurants attract more diners through Google, social media, and reservations — making them the best choice when guests are deciding where to eat.
                </p>
              </div>

              {/* Top Right - Bring first-time visitors back */}
              <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-sm">
                <div className="w-12 h-12 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-3 text-lg text-white">Bring first-time visitors back</h3>
                <p className="text-blue-100 leading-relaxed">
                  Our loyalty and text message tools keep guests returning. On average, VIP members visit 2x more often and come back 35% more frequently.
                </p>
              </div>

              {/* Bottom Left - Grow Avg. Ticket Size */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Grow Avg. Ticket Size</h3>
                <p className="text-gray-600 leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                  Menus with photos and pairing suggestions sell more. LocalSpot restaurants see 10–25% higher checks and up to 50% more sales on featured dishes.
                </p>
              </div>

              {/* Bottom Right - Simple & Fast */}
              <div className="bg-gray-200 rounded-3xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Simple & Fast</h3>
                <p className="text-gray-600 leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                  Menus load in under 2 seconds, most restaurants are live in 7 days, and 95% of staff feel comfortable using the dashboard within minutes.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout - Keep Original */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Left - Attract more guests */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Attract more guests</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                With LocalSpot, restaurants attract more diners through Google, social media, and reservations — making them the best choice when guests are deciding where to eat.
              </p>
            </div>

            {/* Top Right - Bring first-time visitors back */}
            <div className="bg-blue-600 rounded-lg p-6 text-white shadow-sm">
              <div className="w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Bring first-time visitors back</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Our loyalty and text message tools keep guests returning. On average, VIP members visit 2x more often and come back 35% more frequently.
              </p>
            </div>

            {/* Bottom Left - Grow Avg. Ticket Size */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Grow Avg. Ticket Size</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Menus with photos and pairing suggestions sell more. LocalSpot restaurants see 10-25% higher checks and up to 50% more sales on featured dishes.
              </p>
            </div>

            {/* Bottom Right - Simple & Fast */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Simple & Fast</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Menus load in under 2 seconds, most restaurants are live in 7 days, and 95% of staff feel comfortable using the dashboard within minutes.
              </p>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default ResultsSection;
