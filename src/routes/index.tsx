import { createFileRoute } from '@tanstack/react-router'
import Header from '../components/Header'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import TestimonialSection from '../components/TestimonialSection'
import ResultsSection from '../components/ResultsSection'
import LocalSpotPricing from '../components/LocalSpotPricing'
import QualificationSection from '../components/QualificationSection'
import Footer from '../components/Footer'
import ScrollPopup from '../components/ScrollPopup'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <TestimonialSection />
      <ResultsSection />
      <LocalSpotPricing />
      <QualificationSection />
      <Footer />
      
      {/* Scroll-triggered popup */}
      <ScrollPopup />
    </div>
  )
}
