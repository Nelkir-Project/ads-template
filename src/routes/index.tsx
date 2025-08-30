import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import Hero from '../components/Hero'
import TestimonialSection from '../components/TestimonialSection'
import HowItWorks from '../components/HowItWorks'
import ResultsSection from '../components/ResultsSection'
import PricingSection from '../components/PricingSection'
import Footer from '../components/Footer'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <TestimonialSection />
      <HowItWorks />
      <ResultsSection />
      <PricingSection />
      <Footer />
    </div>
  )
}
