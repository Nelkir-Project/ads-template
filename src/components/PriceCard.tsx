import { openCalendarBooking } from '@/utils/calendarUtils'
import pricesJson from '../constants/price.json'

{
  /* Pricing Card - Mobile: keep original, Desktop: match Figma */
}
const PriceCard: React.FC<{
  isIntersecting: boolean
  data: typeof pricesJson.stater | typeof pricesJson.pro
}> = ({ isIntersecting, data }) => {
  const handleGetDemo = () => {
    openCalendarBooking()
  }

  return (
    <div
      className={`animate-on-scroll ${isIntersecting ? 'animate animate-fade-in-up animate-delay-200' : ''}`}
    >
      {/* Mobile Card */}
      <div className="flex lg:hidden flex-1 w-full h-full mx-auto">
        <div className="w-full bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex flex-col justify-start gap-y-5">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {data.title}
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 text-pretty">
              {data.description}
            </p>
          </div>

          {data.additional && (
            <p className="text-lg sm:text-xl text-gray-800 text-pretty font-semibold">
              {data.additional}
            </p>
          )}

          <div className="space-y-1 flex-1">
            {data.benefits.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-green-500 shrink-0">✅</span>
                <span className="text-gray-700 leading-tight text-pretty">
                  {feature}
                </span>
              </div>
            ))}
            {data.bonus.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-green-500 shrink-0">🎁</span>
                <span className="text-gray-700 leading-tight text-pretty">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div>
            <p className="subtitle-text text-xl font-bold text-gray-900">
              {data.price}
            </p>
            <div className="flex items-baseline justify-between">
              <p className="text-lg text-gray-900">Billed annually</p>
            </div>
          </div>

          <button
            onClick={handleGetDemo}
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded text-sm font-medium hover:bg-blue-700 transition-colors duration-200 mb-3 flex items-center justify-center gap-2"
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

      {/* Desktop Card */}
      <div className="hidden lg:flex mx-auto flex-1 w-full h-full">
        <div className="w-full bg-white rounded-2xl p-8 shadow-sm border border-gray-200 flex flex-col justify-start gap-y-5">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {data.title}
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 text-pretty">
              {data.description}
            </p>
          </div>

          {data.additional && (
            <p className="text-lg sm:text-xl text-gray-800 text-pretty font-semibold">
              {data.additional}
            </p>
          )}

          <div className="space-y-1 flex-1">
            {data.benefits.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-green-500 shrink-0">✅</span>
                <span className="text-gray-700 leading-tight text-pretty">
                  {feature}
                </span>
              </div>
            ))}
            {data.bonus.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-green-500 shrink-0">🎁</span>
                <span className="text-gray-700 leading-tight text-pretty">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <div>
            <p className="subtitle-text text-3xl font-bold text-gray-900">
              {data.price}
            </p>
            <p className="text-lg sm:text-xl text-gray-600 text-pretty">
              Billed annually
            </p>
          </div>

          <button
            onClick={handleGetDemo}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded text-base font-medium hover:bg-blue-700 transition-colors duration-200 mb-4 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Get a Free Demo</span>
            <svg
              className="w-5 h-5"
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
    </div>
  )
}

export default PriceCard
