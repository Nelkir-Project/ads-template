import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const TestimonialSection: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section ref={elementRef} className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Qualification Section */}
        <div className={`grid md:grid-cols-2 gap-8 mb-16 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}>
          {/* Left Column - Not for you */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">LocalSpot is not for you if...</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-red-600 font-bold mr-2 mt-1">✕</span>
                <p className="text-gray-700">You're fine spending tons of time on marketing and don't mind figuring out complicated stuff by yourself.</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 font-bold mr-2 mt-1">✕</span>
                <p className="text-gray-700">You're okay with empty tables some days and don't care about getting more steady customers.</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 font-bold mr-2 mt-1">✕</span>
                <p className="text-gray-700">Slow days don't stress you out, and you're happy with how things are going.</p>
              </div>
              <div className="flex items-start">
                <span className="text-red-600 font-bold mr-2 mt-1">✕</span>
                <p className="text-gray-700">You don't want easy tech that can help your restaurant grow and stand out.</p>
              </div>
            </div>
          </div>

          {/* Right Column - For you */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">LocalSpot is for you if...</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-2 mt-1">✓</span>
                <p className="text-gray-700">You want more time for yourself instead of constantly worrying about marketing.</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-2 mt-1">✓</span>
                <p className="text-gray-700">You love seeing your restaurant full of happy regulars who come back again and again like old friends.</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-2 mt-1">✓</span>
                <p className="text-gray-700">You want more people on slow days so you feel stuck or don't know how to make it happen.</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-2 mt-1">✓</span>
                <p className="text-gray-700">You're excited to try advanced tools that help your restaurant make more money without all the tech headaches.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Title */}
        <div className={`text-center mb-12 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-400' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Testimonials</h2>
        </div>

        {/* Google Reviews Grid */}
        <div className={`grid lg:grid-cols-2 gap-8 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-600' : ''}`}>
          {/* Left Column */}
          <div className="space-y-6">
             {/* Doreen Foster Review - Video Testimonial */}
             <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
               {/* Name and rating above video */}
               <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center">
                   <div>
                     <h4 className="font-semibold text-gray-900">Doreen Foster</h4>
                     <div className="flex items-center">
                       {[...Array(5)].map((_, i) => (
                         <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                         </svg>
                       ))}
                     </div>
                   </div>
                 </div>
                 <img src="/google.png" alt="Google" className="w-6 h-6" />
               </div>
               
               {/* Video below name and rating */}
               <div className="w-full mb-4">
                 <video 
                   src="/Testimonial.mp4" 
                   className="w-full aspect-video object-cover rounded-lg"
                   controls
                   muted
                   preload="metadata"
                   poster="https://payfud.com/wp-content/uploads/2024/08/Screenshot-2024-08-23-at-5.50.01-PM.png"
                 >
                   Your browser does not support the video tag.
                 </video>
               </div>
               
               <blockquote className="text-gray-700 leading-relaxed">
                 "Payfud has been very instrumental in the operation of our business. It has really automated much of our customer experience where they can find everything right at the table. Today, everything is about technology, and I feel like Payfud has integrated the ability for us to capture data from our customers, we can go behind the scenes, and make any adjustments that are necessary to continue to take our restaurant to the next level".
               </blockquote>
             </div>

             {/* Sheldon Blake Review */}
             <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center">
                   <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                     <img src="/sheldon.png" alt="Sheldon Blake" className="w-full h-full object-cover" />
                   </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sheldon Blake</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <img src="/google.png" alt="Google" className="w-6 h-6" />
              </div>
              <blockquote className="text-gray-700 leading-relaxed">
                "Maria was super helpful in helping me with website assistance. She is very knowledgeable in the industry and I highly recommend LocalSpot".
              </blockquote>
            </div>

             {/* Marius V Review */}
             <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center">
                   <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                     <img src="/marius.png" alt="Marius V" className="w-full h-full object-cover" />
                   </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Marius V</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <img src="/google.png" alt="Google" className="w-6 h-6" />
              </div>
              <blockquote className="text-gray-700 leading-relaxed">
                "Great company for restaurant marketing and website design. Highly recommended".
              </blockquote>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
             {/* Holyland Project Review */}
             <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center">
                   <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                     <img src="/holyland.png" alt="Holyland Project" className="w-full h-full object-cover" />
                   </div>
                   <div>
                     <h4 className="font-semibold text-gray-900">Holyland Project</h4>
                     <div className="flex items-center">
                       {[...Array(5)].map((_, i) => (
                         <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                         </svg>
                       ))}
                     </div>
                   </div>
                 </div>
                 <img src="/google.png" alt="Google" className="w-6 h-6" />
               </div>
               <blockquote className="text-gray-700 leading-relaxed mb-4">
                 "I recently started using LocalSpot for my restaurant, and I couldn't be happier with the results! Their automated marketing solutions have transformed how we engage with our customers. The loyalty programs they offer not only increased our repeat business but also created a stronger connection with our patrons."
               </blockquote>
               <blockquote className="text-gray-700 leading-relaxed mb-4">
                 "Overall, LocalSpot has been an invaluable resource for enhancing our marketing strategy and improving operational efficiency. Highly recommended for any restaurant looking to grow its customer base and streamline its processes!"
               </blockquote>
               
               {/* Holyland image below text */}
               <div className="w-full">
                 <img src="/holyimage.png" alt="Holyland Project" className="w-full aspect-video object-cover rounded-lg" />
               </div>
             </div>


             {/* Kevin Mawby Review */}
             <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center">
                   <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                     <img src="/kevin.png" alt="Kevin Mawby" className="w-full h-full object-cover" />
                   </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Kevin Mawby</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <img src="/google.png" alt="Google" className="w-6 h-6" />
              </div>
              <blockquote className="text-gray-700 leading-relaxed">
                "Maria and her team were truly great. Helped me immensely with my restaurant website design. I would highly recommend them. Very friendly and knowledgeable".
              </blockquote>
            </div>

             {/* Peter Konstantakos Review */}
             <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
               <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center">
                   <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                     <img src="/peter.png" alt="Peter Konstantakos" className="w-full h-full object-cover" />
                   </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Peter Konstantakos</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <img src="/google.png" alt="Google" className="w-6 h-6" />
              </div>
              <blockquote className="text-gray-700 leading-relaxed">
                "Great company for restaurant marketing and website design. Highly recommended".
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
