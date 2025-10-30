import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { openCalendarBooking } from '@/utils/calendarUtils'

const Features = () => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
  })
  return (
    <section ref={elementRef} className="py-12 sm:py-16 lg:py-20" id='how-it-works'>
      <div
        className={`max-w-7xl mx-auto lg:px-8 lg:space-y-24 xl:space-y-32 animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}
      >
        {features.map(
          ({ imageSrc, title, subtitle, list, imageClassName }, index) => (
            <div className="lg:grid lg:grid-cols-2" key={title}>
              <div
                className={`aspect-591/380 w-auto h-full overflow-hidden lg:rounded-lg ${index % 2 === 0 ? 'order-first' : 'order-last'}`}
              >
                <img
                  src={imageSrc}
                  alt={title}
                  className={`size-full ${imageClassName}`}
                />
              </div>
              <div
                className={`flex flex-col justify-start items-start gap-6 my-auto box-border ${index % 2 === 0 ? 'px-6 py-6 lg:py-0 lg:px-12 xl:px-16' : 'pr-6 pl-6 py-6 ly:pl-0 lg:py-0 lg:pr-12 xl:pr-16'}`}
              >
                <div className="space-y-1">
                  <p className="font-bold text-3xl subtitle-text">{title}</p>
                  <p className="">{subtitle}</p>
                </div>
                <ul className="list-disc list-inside">
                  {list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <button
                  onClick={() => openCalendarBooking()}
                  className="w-fit bg-transparent text-blue-600 underline py-2.5 px-4 rounded text-sm font-medium hover:bg-blue-700/10 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get a Free Demo</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  )
}

export default Features

const features = [
  {
    imageSrc: '/get-more-customers-to-your-restaurant.jpg',
    imageClassName: 'object-cover',
    title: 'Beat your Competitors',
    subtitle: 'Be found in Google and Maps',
    list: [
      'Get a Custom Website Design for your restaurant.',
      'Show up when diners search things like “best bar”.',
      'Be the “this restaurant has great reviews, let’s go”.',
      'Get more diners booking online instead of calling.',
    ],
  },
  {
    imageSrc: '/turn-first-time-visitors.png',
    imageClassName: 'object-cover',
    title: 'Bring Guests Back on Autopilot',
    subtitle: 'Capture guest info and give them reasons to return',
    list: [
      'Let diners join your VIP club at your restaurant.',
      'Promote offers automatically during slow hours.',
      'Use a fun loyalty program to bring them back.',
    ],
  },
  {
    imageSrc: '/marketing-for-resturant-owners.png',
    imageClassName: 'object-contain',
    title: 'Turn Your Menu into a Sales Tool',
    subtitle: 'Increase your average ticket size and experience',
    list: [
      'Learn what guests love (and what they don’t).',
      'Upsell with Pairing Suggestions.',
      'Featured specials to spotlight your chef’s best.',
    ],
  },
]
