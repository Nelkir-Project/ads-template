import React, { createContext, useContext, useRef, ReactNode } from 'react'

interface VideoManagerContextType {
  registerVideo: (videoElement: HTMLVideoElement) => void
  playVideo: (videoElement: HTMLVideoElement) => void
}

const VideoManagerContext = createContext<VideoManagerContextType | undefined>(undefined)

interface VideoManagerProviderProps {
  children: ReactNode
}

export const VideoManagerProvider: React.FC<VideoManagerProviderProps> = ({ children }) => {
  const activeVideoRef = useRef<HTMLVideoElement | null>(null)
  const registeredVideosRef = useRef<Set<HTMLVideoElement>>(new Set())

  const registerVideo = (videoElement: HTMLVideoElement) => {
    registeredVideosRef.current.add(videoElement)
  }

  const playVideo = (videoElement: HTMLVideoElement) => {
    // Pause the currently active video if it's different from the new one
    if (activeVideoRef.current && activeVideoRef.current !== videoElement) {
      activeVideoRef.current.pause()
    }

    // Set the new active video
    activeVideoRef.current = videoElement

    // Play the new video
    videoElement.play().catch((error) => {
      console.log('Video play failed:', error)
    })
  }

  return (
    <VideoManagerContext.Provider value={{ registerVideo, playVideo }}>
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
