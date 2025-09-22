import { useEffect, useRef, useState } from 'react'
import { useVideoManager } from '../contexts/VideoManagerContext'

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
  const { registerVideo, canAutoPlay, playVideo, pauseVideo } = useVideoManager()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Register this video with the manager
    registerVideo(video)

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting
        setIsIntersecting(isVisible)
        
        if (isVisible) {
          // Video is in view - enable sound and try to auto-play
          if (enableSound) {
            video.muted = false
          }
          
          // Only auto-play if no other video is currently playing
          if (canAutoPlay(video)) {
            playVideo(video, false) // false = auto-play, not manual
          }
        } else {
          // Video is out of view - always pause (regardless of how it started)
          pauseVideo(video)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(video)

    return () => {
      observer.unobserve(video)
    }
  }, [threshold, rootMargin, enableSound, registerVideo, canAutoPlay, playVideo, pauseVideo])

  return {
    videoRef,
    isIntersecting
  }
}
