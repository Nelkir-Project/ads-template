import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import TestimonialSection from '../components/TestimonialSection'
import HowItWorks from '../components/HowItWorks'
import ResultsSection from '../components/ResultsSection'
import PricingSection from '../components/PricingSection'
import Footer from '../components/Footer'
import ScrollPopup from '../components/ScrollPopup'
import DemoModal from '../components/DemoModal'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBookDemo = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <TestimonialSection />
      <HowItWorks />
      <ResultsSection />
      <PricingSection />
      <Footer />
      
      {/* Scroll-triggered popup */}
      <ScrollPopup onBookDemo={handleBookDemo} />
      
      {/* Demo booking modal */}
      <DemoModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
