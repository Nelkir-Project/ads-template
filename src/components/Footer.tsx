import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Footer: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <footer ref={elementRef} className="bg-white">
      {/* Gray separator line */}
      <div className="border-t border-gray-200"></div>
      
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in' : ''}`}>
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Logo and Contact */}
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <img src="/Light mode.webp" alt="LocalSpot" className="h-8 w-auto mb-3 mx-auto sm:mx-0 block" />
            <img src="/Dark mode.webp" alt="LocalSpot" className="h-8 w-auto mb-3 mx-auto sm:mx-0 hidden" />
            <div className="space-y-1">
              <a 
                href="mailto:hello@localspot.ai" 
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                hello@localspot.ai
              </a>
              <a 
                href="tel:+17272805723" 
                className="block text-gray-700 hover:text-blue-600 transition-colors"
              >
                +1 (727) 280-5723
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex space-x-6 sm:space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
          </div>
        </div>

        <div className="text-center sm:text-left mt-4 sm:mt-6">
          <p className="text-gray-500">
            © 2025 LocalSpot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
