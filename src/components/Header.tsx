import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { openCalendarBooking } from '../utils/calendarUtils';

const Header: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header 
      ref={elementRef}
      className={`hidden md:block bg-white border-b border-gray-200 sticky top-0 z-50 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className={`flex items-center animate-on-scroll ${isIntersecting ? 'animate animate-slide-in-left animate-delay-100' : ''}`}>
            <img src="/Light mode.webp" alt="LocalSpot" className="h-8 w-auto block" />
            <img src="/Dark mode.webp" alt="LocalSpot" className="h-8 w-auto hidden" />
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex space-x-8 flex-1 ml-8 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in animate-delay-200' : ''}`}>
            <a href="#how-it-works" className="text-gray-700 hover:text-gray-900">
              How it Works
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900">
              Pricing
            </a>
          </nav>

          {/* Desktop CTA Button */}
          <div className={`hidden md:flex items-center animate-on-scroll ${isIntersecting ? 'animate animate-slide-in-right animate-delay-300' : ''}`}>
            <button 
              onClick={openCalendarBooking}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors group"
            >
              <span className="flex items-center justify-center">
                Get Started Free
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#how-it-works"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-gray-700 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <div className="pt-4 pb-2 border-t border-gray-200">
                <button 
                  onClick={openCalendarBooking}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  Get Started Free
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;