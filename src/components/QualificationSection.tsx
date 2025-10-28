import React from 'react'
import { ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const QualificationSection: React.FC = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
  })

  return (
    <section ref={elementRef} className="bg-white py-16 sm:py-20 lg:py-24">
      {/* Two Column Layout */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-20 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up' : ''}`}
      >
        {/* Left Column - Not For You */}
        <div className="bg-white rounded-2xl p-6 sm:p-8">
          <div className="flex items-center mb-6">
            <div className="size-12 bg-blue-50 rounded flex items-center justify-center mr-3">
              <ThumbsDownIcon className="text-blue-700" />
            </div>
            <h3 className="text-xl font-normal text-gray-900">
              <strong>LocalSpot</strong> is not for you if...
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="text-red-500 font-normal mr-3 mt-0.5 shrink-0">
                ❌
              </div>
              <span className="text-gray-700 leading-relaxed text-pretty">
                You're fine spending tons of time on marketing and don't mind
                figuring out complicated stuff by yourself.
              </span>
            </div>

            <div className="flex items-start">
              <div className="text-red-500 font-normal mr-3 mt-0.5 shrink-0">
                ❌
              </div>
              <span className="text-gray-700 leading-relaxed text-pretty">
                You're okay with empty tables some days and don't care about
                getting more steady customers.
              </span>
            </div>

            <div className="flex items-start">
              <div className="text-red-500 font-normal mr-3 mt-0.5 shrink-0">
                ❌
              </div>
              <span className="text-gray-700 leading-relaxed text-pretty">
                Slow days don't stress you out, and you're happy with how things
                are going.
              </span>
            </div>

            <div className="flex items-start">
              <div className="text-red-500 font-normal mr-3 mt-0.5 shrink-0">
                ❌
              </div>
              <span className="text-gray-700 leading-relaxed">
                You don't want easy tech that can help your restaurant grow and
                stand out.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - For You */}
        <div className="bg-white rounded-2xl p-6 sm:p-8">
          <div className="flex items-center mb-6">
            <div className="size-12 bg-blue-50 rounded flex items-center justify-center mr-3">
              <ThumbsUpIcon className="text-blue-700" />
            </div>
            <h3 className="text-xl font-normal text-gray-900">
              <strong>LocalSpot</strong> is for you if...
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="text-green-500 font-normal mr-3 mt-0.5 shrink-0">
                ✅
              </div>
              <span className="text-gray-700 leading-relaxed text-pretty">
                You want more time for yourself instead of constantly worrying
                about marketing.
              </span>
            </div>

            <div className="flex items-start">
              <div className="text-green-500 font-normal mr-3 mt-0.5 shrink-0">
                ✅
              </div>
              <span className="text-gray-700 leading-relaxed text-pretty">
                You love seeing your restaurant full of happy regulars who come
                back again and again like old friends.
              </span>
            </div>

            <div className="flex items-start">
              <div className="text-green-500 font-normal mr-3 mt-0.5 shrink-0">
                ✅
              </div>
              <span className="text-gray-700 leading-relaxed text-pretty">
                You want more people on slow days but feel stuck or don't know
                how to make it happen.
              </span>
            </div>

            <div className="flex items-start">
              <div className="text-green-500 font-normal mr-3 mt-0.5 shrink-0">
                ✅
              </div>
              <span className="text-gray-700 leading-relaxed text-pretty">
                You're excited to try advanced tools that help your restaurant
                make more money without all the tech headaches.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QualificationSection
