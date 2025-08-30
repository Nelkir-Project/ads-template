import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Header: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <header 
      ref={elementRef}
      className={`bg-white border-b border-gray-200 sticky top-0 z-50 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className={`flex items-center animate-on-scroll ${isIntersecting ? 'animate animate-slide-in-left animate-delay-100' : ''}`}>
            <div className="text-2xl font-bold text-gray-900">
              Cascader
            </div>
          </div>

          {/* Navigation */}
          <nav className={`hidden md:flex space-x-8 flex-1 ml-8 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in animate-delay-200' : ''}`}>
            <a href="#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium">
              How it Works
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900 font-medium">
              Pricing
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className={`flex items-center space-x-4 animate-on-scroll ${isIntersecting ? 'animate animate-slide-in-right animate-delay-300' : ''}`}>
            <button className="text-gray-700 hover:text-gray-900 font-medium">
              Sign in
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors group">
              <span className="flex items-center justify-center">
                Get Started Free
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;