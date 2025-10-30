import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import Hero from '../components/Hero'
import TestimonialSection from '../components/TestimonialSection'
import ResultsSection from '../components/ResultsSection'
import LocalSpotPricing from '../components/LocalSpotPricing'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'
import ScrollPopup from '../components/ScrollPopup'
import Quote from '@/components/Quote'
import Features from '@/components/Features'
import { CalendarClockIcon, UtensilsIcon } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto lg:px-8">
          <div className="lg:grid lg:grid-cols-3 gap-4 lg:gap-16">
            <div className="flex flex-col justify-center items-center gap-5 lg:hidden mb-12">
              <div className="bg-blue-100 rounded-full flex justify-center items-center px-4 py-1.5 box-border gap-2">
                <CalendarClockIcon className="text-blue-700 size-5 stroke-2" />
                <span className="text-gray-800 font-medium">
                  32 reservations today
                </span>
              </div>

              <div className="bg-gray-100 rounded-full flex justify-center items-center px-4 py-1.5 box-border gap-2">
                <UtensilsIcon className="text-blue-700 size-5 stroke-2" />
                <span className="text-gray-800 font-medium">
                  2 catering orders this week
                </span>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-2 lg:space-y-6 my-auto px-4 sm:px-6 ">
              <h1 className="heading-text font-bold text-3xl lg:text-5xl text-center lg:text-left text-pretty">
                #1 Restaurant Marketing System in Tampa Bay
              </h1>
              <p className="subtitle-text text-gray-600 text-lg lg:text-xl text-center lg:text-left text-pretty">
                LocalSpot makes sure people find you, and return more often.
              </p>
              <div className="justify-start items-center gap-8 hidden lg:flex">
                <img
                  src="/image-2018.png"
                  alt="Google"
                  className="h-[60px] w-auto font-medium subtitle-text"
                />
                <p className="text-gray-600">5.0 Stars in Google Reviews</p>
              </div>
            </div>

            <div className="aspect-395/495 w-auto h-full overflow-hidden">
              <img
                src="/hero.png"
                alt="+10,000 Diners Love LocalSpot"
                className="size-full object-contain hidden lg:block"
              />
              <img
                src="/hero-mobile.png"
                alt="+10,000 Diners Love LocalSpot"
                className="size-full object-contain lg:hidden"
              />
            </div>

            <div className="flex flex-col justify-start items-center gap-4 lg:hidden mt-10">
              <img
                src="/image-2018.png"
                alt="Google"
                className="h-[60px] w-auto font-medium subtitle-text"
              />
              <p className="text-gray-600">5.0 Stars in Google Reviews</p>
            </div>
          </div>
        </div>
      </section>
      <Hero />
      <Features />
      <Quote />
      <ResultsSection />
      <LocalSpotPricing />
      <TestimonialSection />
      <FinalCTA />
      <Footer />

      {/* Scroll-triggered popup */}
      <ScrollPopup />
    </div>
  )
}
