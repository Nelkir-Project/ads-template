import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const Quote = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
  })
  return (
    <section ref={elementRef} className="py-12 sm:py-16 lg:py-20">
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}
      >
        <div className="flex flex-col gap-16 md:mb-8 md:mt-24">
          <blockquote className="text-subtitle testimonial-quote text-gray-700 leading-relaxed text-2xl/tight sm:text-3xl/tight md:text-5xl/tight text-pretty">
            “LocalSpot has really elevated our menu and the{' '}
            <strong>customer experience</strong>. It has integrated the ability
            for us to capture data from our customers. We can go behind the
            scenes, and make any adjustments to{' '}
            <strong>take our restaurant to the next level</strong>”.
          </blockquote>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden flex justify-center items-center">
                <img src="/donny.png" alt="Donny" />
              </div>
              <div>
                <h4 className="ftext-gray-900">Donny</h4>
                <p className="font-semibold text-gray-600">Restaurant Owner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Quote
