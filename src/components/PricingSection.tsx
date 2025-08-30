import React, { useState } from 'react';

const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Launch",
      monthlyPrice: 99,
      yearlyPrice: Math.round(99 * 12 * 0.8), // 20% discount on yearly
      period: isYearly ? "/year" : "/month",
      description: "AI SEARCH ANALYSIS",
      features: [
        "Up to 10,000 terms / month",
        "ONE-CLICK GOOGLE ADS APPLY",
        "Single-Click Apply",
        "SCHEDULED SCANS",
        "Weekly, Biweekly, Monthly",
        "SEATS",
        "1 seat"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Growth",
      monthlyPrice: 249,
      yearlyPrice: Math.round(249 * 12 * 0.8), // 20% discount on yearly
      period: isYearly ? "/year" : "/month",
      description: "AI SEARCH ANALYSIS",
      features: [
        "Up to 40,000 terms / month",
        "ONE-CLICK GOOGLE ADS APPLY", 
        "Single-Click Apply",
        "SCHEDULED SCANS",
        "Daily, Weekly, Biweekly, Monthly",
        "SEATS",
        "3 seats"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Scale",
      monthlyPrice: 499,
      yearlyPrice: Math.round(499 * 12 * 0.8), // 20% discount on yearly
      period: isYearly ? "/year" : "/month",
      description: "AI SEARCH ANALYSIS",
      features: [
        "Up to 115,000 terms / month",
        "ONE-CLICK GOOGLE ADS APPLY",
        "Single-Click Apply", 
        "SCHEDULED SCANS",
        "Daily, Weekly, Biweekly, Monthly",
        "SEATS",
        "5 seats"
      ],
      cta: "Get Started",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-yellow-500">⭐</span> Pricing That <span className="text-blue-600">Pays for Itself</span>. Guaranteed. <span className="text-yellow-500">⭐</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            If Cascader doesn't pay for itself in 60 days, you get your money back. No questions asked.
          </p>
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold mb-8">
            <span className="mr-2">📈</span>
            Average customer saves $35K • Median Subscription Payback in &lt; 3 hours
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200 flex">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  !isYearly 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                  isYearly 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-white rounded-2xl shadow-lg p-8 relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-blue-600">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600 text-xl">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8 text-left">
                {plan.features.map((feature, index) => {
                  const isHeader = feature === feature.toUpperCase() && !feature.includes('terms') && !feature.includes('seat') && !feature.includes('Apply') && !feature.includes('Daily') && !feature.includes('Weekly');
                  
                  return (
                    <div key={index} className={isHeader ? "pt-4 first:pt-0" : ""}>
                      {isHeader ? (
                        <div className="mb-2">
                          <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">{feature}</span>
                        </div>
                      ) : (
                        <div className="text-gray-700 text-sm pl-0">
                          {feature.startsWith('Up to') ? (
                            <span><span className="font-semibold">{feature.split(' ')[2]}</span> {feature.split(' ').slice(3).join(' ')}</span>
                          ) : (
                            feature
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button className="w-full py-3 px-4 rounded-lg font-semibold transition-colors bg-blue-600 hover:bg-blue-700 text-white">
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Testimonial */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <blockquote className="text-xl text-gray-700 mb-6 italic text-center">
              "I had no idea I was losing over $3,000 a month on my ads. Cascader fixed it in less than a day."
            </blockquote>
            
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Garret Hecker</div>
                <div className="text-gray-600 text-sm">Founder, Second Source Inc.</div>
              </div>
            </div>
          </div>
        </div>

                 {/* Final CTA */}
         <div className="mt-20">
           {/* Container with consistent width for both sections */}
           <div className="max-w-6xl mx-auto">
             {/* Top headline with highlighted numbers */}
             <div className="mb-12 text-center">
               <h3 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                 If you're managing <span className="text-blue-600 font-bold">$50k in ad spend</span> you could be losing up to <span className="text-red-600 font-bold">$15,000</span> every month
               </h3>
             </div>

            {/* Dark CTA section */}
            <div className="bg-slate-900 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left side - Text content */}
              <div className="text-white">
                <h4 className="text-2xl font-bold mb-3">
                  Ready to recover wasted ad spend?
                </h4>
                <p className="text-gray-300 mb-4">
                  Start turning search term waste into profit.
                </p>
                
                {/* Stats */}
                <div className="text-sm text-gray-400">
                  <span className="font-semibold">340+</span> advertisers • <span className="font-semibold">$1.1M</span> saved • <span className="font-semibold">Avg $35K</span> per customer
                </div>
              </div>

              {/* Right side - Email form and guarantee */}
              <div className="text-white">
                {/* Single row form */}
                <div className="bg-white rounded-lg p-3 mb-4">
                  <div className="flex gap-2 items-center">
                    <input
                      type="email"
                      placeholder="Enter your work email"
                      className="flex-1 px-3 py-2 border-0 focus:outline-none text-gray-900 text-sm bg-transparent"
                    />
                    <button className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full sm:w-auto shrink-0 h-11 sm:h-12 bg-slate-50 text-slate-900 hover:text-slate-900 hover:bg-slate-100 shadow-md sm:shadow-lg hover:shadow-xl shadow-slate-900/20 sm:shadow-slate-900/30 font-medium text-sm sm:text-base py-5 sm:py-6 px-6 sm:px-8 rounded-lg group" type="submit">
                      <span className="flex items-center justify-center">
                        Reclaim Your Budget
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Guarantee text */}
                <p className="text-center text-sm text-yellow-400">
                  ⭐ We Save You More Than We Cost. Guaranteed or You Get Your Money Back. ⭐
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
