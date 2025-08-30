import { useState, useEffect } from 'react'

interface ScrollState {
  scrollDirection: 'up' | 'down' | null
  scrollY: number
  hasScrolledDown: boolean
  showPopup: boolean
}

export const useScrollDirection = (threshold: number = 100) => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollDirection: null,
    scrollY: 0,
    hasScrolledDown: false,
    showPopup: false,
  })

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      const hasScrolledDown = scrollY > threshold

      // Show popup when user scrolls up after scrolling down past threshold
      const shouldShowPopup = 
        direction === 'up' && 
        hasScrolledDown && 
        scrollY > threshold * 0.5 && // Still somewhat down the page
        scrollState.hasScrolledDown

      setScrollState(prev => ({
        scrollDirection: direction,
        scrollY,
        hasScrolledDown: hasScrolledDown || prev.hasScrolledDown,
        showPopup: shouldShowPopup && !prev.showPopup, // Only show once per session
      }))

      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    const handleScroll = () => requestTick()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold, scrollState.hasScrolledDown])

  const hidePopup = () => {
    setScrollState(prev => ({ ...prev, showPopup: false }))
  }

  return { ...scrollState, hidePopup }
}
