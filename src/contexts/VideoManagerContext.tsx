import React, { createContext, useContext, useRef, ReactNode } from 'react'

interface VideoManagerContextType {
  registerVideo: (videoElement: HTMLVideoElement) => void
  canAutoPlay: (videoElement: HTMLVideoElement) => boolean
  playVideo: (videoElement: HTMLVideoElement, isManual?: boolean) => void
  pauseVideo: (videoElement: HTMLVideoElement) => void
}

const VideoManagerContext = createContext<VideoManagerContextType | undefined>(undefined)

interface VideoManagerProviderProps {
  children: ReactNode
}

export const VideoManagerProvider: React.FC<VideoManagerProviderProps> = ({ children }) => {
  const activeVideoRef = useRef<HTMLVideoElement | null>(null)
  const registeredVideosRef = useRef<Set<HTMLVideoElement>>(new Set())
  const manuallyStartedRef = useRef<HTMLVideoElement | null>(null)

  const registerVideo = (videoElement: HTMLVideoElement) => {
    registeredVideosRef.current.add(videoElement)
    
    // Listen for manual play events (user clicks play button)
    const handlePlay = () => {
      if (!videoElement.paused) {
        manuallyStartedRef.current = videoElement
        // Pause other videos when user manually starts one
        if (activeVideoRef.current && activeVideoRef.current !== videoElement) {
          activeVideoRef.current.pause()
        }
        activeVideoRef.current = videoElement
      }
    }

    videoElement.addEventListener('play', handlePlay)
    
    // Cleanup function would be needed in a real implementation
    // For now, we'll rely on React's cleanup
  }

  const canAutoPlay = (videoElement: HTMLVideoElement) => {
    // Don't auto-play if another video is currently playing
    // unless this video was manually started before
    return !activeVideoRef.current || 
           activeVideoRef.current === videoElement || 
           activeVideoRef.current.paused
  }

  const playVideo = (videoElement: HTMLVideoElement, isManual = false) => {
    // If this is a manual play, always allow it
    if (isManual) {
      manuallyStartedRef.current = videoElement
      if (activeVideoRef.current && activeVideoRef.current !== videoElement) {
        activeVideoRef.current.pause()
      }
      activeVideoRef.current = videoElement
      videoElement.play().catch((error) => {
        console.log('Video play failed:', error)
      })
      return
    }

    // For auto-play, check if it's allowed
    if (!canAutoPlay(videoElement)) {
      return // Don't auto-play if another video is active
    }

    // Set the new active video
    activeVideoRef.current = videoElement

    // Play the video
    videoElement.play().catch((error) => {
      console.log('Video play failed:', error)
    })
  }

  const pauseVideo = (videoElement: HTMLVideoElement) => {
    videoElement.pause()
    if (activeVideoRef.current === videoElement) {
      activeVideoRef.current = null
    }
  }

  return (
    <VideoManagerContext.Provider value={{ registerVideo, canAutoPlay, playVideo, pauseVideo }}>
      {children}
    </VideoManagerContext.Provider>
  )
}

export const useVideoManager = () => {
  const context = useContext(VideoManagerContext)
  if (context === undefined) {
    throw new Error('useVideoManager must be used within a VideoManagerProvider')
  }
  return context
}
