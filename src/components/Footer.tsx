import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Footer: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <footer ref={elementRef} className="bg-white">
      {/* Gray separator line */}
      <div className="border-t border-gray-200"></div>
      
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in' : ''}`}>
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <div className="text-2xl font-bold text-gray-900">Cascader</div>
          </div>

          {/* Links */}
          <div className="flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
              About
            </a>
          </div>
        </div>

        <div className="text-left mt-6">
          <p className="text-gray-500 text-sm">
            © 2025 Cascader. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
