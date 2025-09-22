import { useEffect, useRef, useState } from 'react'

interface UseVideoIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  enableSound?: boolean
}

export function useVideoIntersectionObserver(
  options: UseVideoIntersectionObserverOptions = {}
) {
  const { threshold = 0.3, rootMargin = '0px', enableSound = true } = options
  const [isIntersecting, setIsIntersecting] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting
        setIsIntersecting(isVisible)
        
        if (isVisible) {
          // Video is in view - play and enable sound if specified
          if (enableSound) {
            video.muted = false
          }
          video.play().catch((error) => {
            console.log('Video play failed:', error)
          })
        } else {
          // Video is out of view - pause
          video.pause()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(video)

    return () => {
      observer.unobserve(video)
    }
  }, [threshold, rootMargin, enableSound])

  return {
    videoRef,
    isIntersecting
  }
}
