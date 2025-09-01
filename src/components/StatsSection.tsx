import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">LocalSpot Impact</h2>
          <p className="text-gray-600 uppercase tracking-wide text-sm font-semibold">UPDATED DAILY</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Total Savings */}
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">$2.4M+</div>
            <h3 className="font-semibold text-gray-900 mb-1">Total Savings</h3>
            <p className="text-sm text-gray-600">Reclaimed wasted spend across all accounts</p>
          </div>

          {/* Payback Period */}
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">&lt; 3hrs</div>
            <h3 className="font-semibold text-gray-900 mb-1">Payback Period</h3>
            <p className="text-sm text-gray-600">Median time to ROI</p>
          </div>

          {/* PPC Pros */}
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
            <h3 className="font-semibold text-gray-900 mb-1">Trusted By</h3>
            <p className="text-sm text-gray-600">PPC Pros</p>
          </div>

          {/* Avg Savings */}
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">$35K</div>
            <h3 className="font-semibold text-gray-900 mb-1">Avg Savings</h3>
            <p className="text-sm text-gray-600">Per paid customer</p>
          </div>

          {/* Terms Analyzed */}
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">2.1M</div>
            <h3 className="font-semibold text-gray-900 mb-1">Terms Analyzed</h3>
            <p className="text-sm text-gray-600">Last 30 days</p>
          </div>
        </div>

        {/* Connected Ad Spend */}
        <div className="text-center mt-12">
          <div className="text-5xl font-bold text-gray-900 mb-2">$12.8M</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">Connected Monthly Ad Spend</h3>
          <p className="text-gray-600">30-day revenue total currently linked to LocalSpot</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
