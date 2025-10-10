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
            <blockquote className="testimonial-quote text-3xl lg:text-4xl leading-tight mb-16 max-w-5xl" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
              "I was constantly worried about getting people through the door. With LocalSpot our restaurant stays busy and I finally have the time to focus on training my staff and making service even better".
            </blockquote>
            
            <div className="flex items-center">
              <img 
                src="/new.png" 
                alt="Karolyn" 
                className="w-15 h-15 rounded-full mr-5 object-cover"
              />
              <div>
                <div className="font-semibold text-gray-900" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Karolyn</div>
                <div className="text-gray-600" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Restaurant Manager</div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden">
            <blockquote className="testimonial-quote text-xl sm:text-2xl text-gray-800 mb-6 leading-relaxed max-w-4xl">
              "I was constantly worried about getting people through the door. <span className="font-semibold">With LocalSpot</span> our restaurant stays busy and I finally have the time to focus on training my staff and making service even better".
            </blockquote>
            
            <div className="flex items-center">
              <img 
                src="/new.png" 
                alt="Karolyn" 
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <div className="font-semibold text-gray-900">Karolyn</div>
                <div className="text-gray-600">Restaurant Manager</div>
              </div>
            </div>
          </div>
        </div>

        {/* Green Tag */}
        <div className={`mb-8 text-center animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-100' : ''}`}>
          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-medium">
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
                <h3 className="font-semibold text-gray-900 mb-3" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Attract more guests</h3>
                <p className="text-gray-600 leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                  With LocalSpot, restaurants attract more diners through Google, social media, and reservations — making them the best choice when guests are deciding where to eat.
                </p>
              </div>

              {/* Top Right - Bring first-time visitors back */}
              <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-sm">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-3 text-white">Bring first-time visitors back</h3>
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
                <h3 className="font-semibold text-gray-900 mb-3" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Grow Avg. Ticket Size</h3>
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
                <h3 className="font-semibold text-gray-900 mb-3" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>Simple & Fast</h3>
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
              <p className="text-gray-600 leading-relaxed">
                With LocalSpot, restaurants attract more diners through Google, social media, and reservations — making them the best choice when guests are deciding where to eat.
              </p>
            </div>

            {/* Top Right - Bring first-time visitors back */}
            <div className="bg-blue-600 rounded-lg p-6 text-white shadow-sm">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Bring first-time visitors back</h3>
              <p className="text-blue-100 leading-relaxed">
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
              <p className="text-gray-600 leading-relaxed">
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
              <p className="text-gray-600 leading-relaxed">
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
