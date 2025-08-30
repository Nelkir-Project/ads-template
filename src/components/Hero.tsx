import React, { useState } from 'react';

const Hero: React.FC = () => {
  const [email, setEmail] = useState('');

  return (
    <section className="hero-section bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-left">
                         {/* Main Headline */}
             <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.1]">
               AI Negative Keyword<br />
               Platform{' '}
               <span className="text-blue-600">for<br />Google Ads</span>
             </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Cascader helps you identify and eliminate irrelevant clicks, reclaiming{' '}
              <span className="text-blue-600 font-semibold">25-76%</span> of your Google Ads budget.
            </p>

            {/* Customer Trust Indicators */}
            <div className="flex items-center gap-6 mb-8">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white"></div>
                <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white"></div>
                <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white"></div>
                <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white"></div>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">340+ PPC pros trust Cascader</span>
              </div>
              <div className="flex items-center text-yellow-500">
                <span className="text-sm text-gray-600 ml-2">⭐ Typical payback: &lt; 3 hours</span>
              </div>
            </div>

            {/* Email Form */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap group">
                  <span className="flex items-center justify-center">
                    Get Started Free
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                </button>
              </div>
              <div className="flex items-center justify-center mt-4 text-sm text-gray-500 space-x-6">
                <span className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  100 Free Search Terms
                </span>
                <span className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  No Credit Card Needed
                </span>
              </div>
            </div>

            {/* Watch Demo Button */}
            <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold mb-8">
              <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                ▶
              </span>
              Watch Demo
              <span className="text-sm text-gray-500 ml-2">See Cascader in action</span>
            </button>

            {/* Guarantee Badge */}
            <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-lg px-4 py-2">
              <span className="text-green-800 font-semibold mr-2">Pays for itself. Or you don't.</span>
              <span className="text-green-600 text-sm">100% results-based guarantee</span>
            </div>
          </div>

                     {/* Right Column - Stats Grid */}
           <div className="bg-gray-50 rounded-2xl p-6 max-w-md mx-auto lg:mx-0">
                         <div className="mb-6">
               <div className="flex items-center justify-between mb-2">
                 <div className="flex items-center gap-2">
                   <span className="text-lg">📊</span>
                   <h2 className="text-lg font-bold text-gray-900">Cascader Impact</h2>
                 </div>
                 <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                   UPDATED DAILY
                 </span>
               </div>
             </div>

                         {/* Total Savings - Full Width */}
             <div className="bg-white rounded-lg p-4 text-left shadow-sm border border-gray-100 mb-3">
               <div className="flex items-center mb-2">
                 <span className="text-green-500 mr-2">📈</span>
                 <h3 className="text-sm font-semibold text-gray-900">Total Savings</h3>
               </div>
               <div className="text-2xl font-bold text-gray-900 mb-1">$1,138,896</div>
               <p className="text-xs text-gray-600">Reclaimed wasted spend across all accounts</p>
             </div>

                         {/* Other Stats - 2x2 Grid */}
             <div className="grid grid-cols-2 gap-3 mb-4">
               {/* Payback Period */}
               <div className="bg-white rounded-lg p-3 text-left shadow-sm border border-gray-100">
                 <div className="flex items-center mb-1">
                   <span className="text-orange-500 mr-1">⏱️</span>
                   <h3 className="text-xs font-semibold text-gray-900">Payback Period</h3>
                 </div>
                 <div className="text-lg font-bold text-gray-900 mb-1">130 min</div>
                 <p className="text-xs text-gray-600">Median time to ROI</p>
               </div>

               {/* Trusted By */}
               <div className="bg-white rounded-lg p-3 text-left shadow-sm border border-gray-100">
                 <div className="flex items-center mb-1">
                   <span className="text-purple-500 mr-1">👥</span>
                   <h3 className="text-xs font-semibold text-gray-900">Trusted By</h3>
                 </div>
                 <div className="text-lg font-bold text-gray-900 mb-1">340</div>
                 <p className="text-xs text-gray-600">PPC Pros</p>
               </div>

               {/* Avg Savings */}
               <div className="bg-white rounded-lg p-3 text-left shadow-sm border border-gray-100">
                 <div className="flex items-center mb-1">
                   <span className="text-green-500 mr-1">💰</span>
                   <h3 className="text-xs font-semibold text-gray-900">Avg Savings</h3>
                 </div>
                 <div className="text-lg font-bold text-gray-900 mb-1">$34,512</div>
                 <p className="text-xs text-gray-600">Per paid customer</p>
               </div>

               {/* Terms Analyzed */}
               <div className="bg-white rounded-lg p-3 text-left shadow-sm border border-gray-100">
                 <div className="flex items-center mb-1">
                   <span className="text-blue-500 mr-1">🔍</span>
                   <h3 className="text-xs font-semibold text-gray-900">Terms Analyzed</h3>
                 </div>
                 <div className="text-lg font-bold text-gray-900 mb-1">37,377</div>
                 <p className="text-xs text-gray-600">Last 30 days</p>
               </div>
             </div>

                         {/* Connected Ad Spend */}
             <div className="bg-white rounded-lg p-4 text-left shadow-sm border border-gray-100">
               <div className="flex items-center mb-2">
                 <span className="text-purple-500 mr-2">💳</span>
                 <h3 className="text-sm font-semibold text-gray-900">Connected Monthly Ad Spend</h3>
               </div>
               <div className="text-2xl font-bold text-gray-900 mb-1">$9,030,993</div>
               <p className="text-xs text-gray-600">30-day ad spend total currently linked to Cascader</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
