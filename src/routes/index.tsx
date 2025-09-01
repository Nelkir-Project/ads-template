import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import ResultsSection from '../components/ResultsSection'
import LocalSpotPricing from '../components/LocalSpotPricing'
import QualificationSection from '../components/QualificationSection'
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
      <HowItWorks />
      <ResultsSection />
      <LocalSpotPricing onBookDemo={handleBookDemo} />
      <QualificationSection onBookDemo={handleBookDemo} />
      <Footer />
      
      {/* Scroll-triggered popup */}
      <ScrollPopup onBookDemo={handleBookDemo} />
      
      {/* Demo booking modal */}
      <DemoModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
