import React from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const TestimonialSection: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
  })

  return (
    <section
      ref={elementRef}
      data-section="testimonials"
      className="bg-white py-12 sm:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Title */}
        <div
          className={`text-center mb-12 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl text-gray-900">
            Check what other restaurant owners are saying
          </h2>
        </div>

        {/* Google Reviews Grid */}
        <div
          className={`grid lg:grid-cols-2 gap-8 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-400' : ''}`}
        >
          {/* Left Column */}
          <div className="space-y-6">
            {/* Sheldon Blake Review */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                    <img
                      src="/sheldon.png"
                      alt="Sheldon Blake"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Sheldon Blake
                    </h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <img src="/google.png" alt="Google" className="w-6 h-6" />
              </div>
              <blockquote className="text-gray-700 leading-relaxed">
                "Maria was super helpful in helping me with website assistance.
                She is very knowledgeable in the industry and I highly recommend
                LocalSpot".
              </blockquote>
            </div>

            {/* Marius V Review */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                    <img
                      src="/marius.png"
                      alt="Marius V"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Marius V</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <img src="/google.png" alt="Google" className="w-6 h-6" />
              </div>
              <blockquote className="text-gray-700 leading-relaxed">
                "Great company for restaurant marketing and website design.
                Highly recommended".
              </blockquote>
            </div>

            {/* Peter Konstantakos Review */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                    <img
                      src="/peter.png"
                      alt="Peter Konstantakos"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Peter Konstantakos
                    </h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <img src="/google.png" alt="Google" className="w-6 h-6" />
              </div>
              <blockquote className="text-gray-700 leading-relaxed">
                "Great company for restaurant marketing and website design.
                Highly recommended".
              </blockquote>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Holyland Project Review */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Holyland Project
                    </h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <img src="/google.png" alt="Google" className="w-6 h-6" />
              </div>
              <blockquote className="text-gray-700 leading-relaxed mb-4">
                "I recently started using LocalSpot for my restaurant, and I
                couldn't be happier with the results! Their automated marketing
                solutions have transformed how we engage with our customers. The
                loyalty programs they offer not only increased our repeat
                business but also created a stronger connection with our
                patrons."
              </blockquote>
              <blockquote className="text-gray-700 leading-relaxed">
                "Overall, LocalSpot has been an invaluable resource for
                enhancing our marketing strategy and improving operational
                efficiency. Highly recommended for any restaurant looking to
                grow its customer base and streamline its processes!"
              </blockquote>
            </div>

            {/* Kevin Mawby Review */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                    <img
                      src="/kevin.png"
                      alt="Kevin Mawby"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Kevin Mawby</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <img src="/google.png" alt="Google" className="w-6 h-6" />
              </div>
              <blockquote className="text-gray-700 leading-relaxed">
                "Maria and her team were truly great. Helped me immensely with
                my restaurant website design. I would highly recommend them.
                Very friendly and knowledgeable".
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
