import React, { useState, useEffect } from 'react'
import { useVideoIntersectionObserver } from '../hooks/useVideoIntersectionObserver'

type VideoHeroProps = {
	className?: string
	containerClassName?: string
	srcs?: string[]
	poster?: string
	controls?: boolean
	priority?: boolean // If true, preload even on mobile (for above-the-fold content)
}

const DEFAULT_SRCS = [
	'/video.mp4',
	'https://payfud-local-storage.s3.us-east-1.amazonaws.com/videos/Branzini+Hero.mp4',
	'https://www.w3schools.com/html/mov_bbb.mp4',
]

// Detect if user is on mobile device
const isMobileDevice = (): boolean => {
	if (typeof window === 'undefined') return false
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
		|| window.innerWidth < 768
}

// Detect slow connection
const isSlowConnection = (): boolean => {
	if (typeof navigator === 'undefined' || !('connection' in navigator)) return false
	const conn = (navigator as any).connection
	return conn?.effectiveType === 'slow-2g' || conn?.effectiveType === '2g' || conn?.saveData === true
}

const VideoHero: React.FC<VideoHeroProps> = ({
	className,
	containerClassName,
	srcs = DEFAULT_SRCS,
	poster,
	controls = false,
	priority = false,
}) => {
	const [isMobile, setIsMobile] = useState(false)
	const [slowConnection, setSlowConnection] = useState(false)
	
	useEffect(() => {
		setIsMobile(isMobileDevice())
		setSlowConnection(isSlowConnection())
	}, [])

	const { videoRef } = useVideoIntersectionObserver({ 
		threshold: 0.3, 
		enableSound: true 
	})

	// Adaptive preload strategy:
	// - Slow connection: none (only load when user clicks play)
	// - Mobile (normal speed): metadata (only load video info, not content)
	// - Desktop or priority content: auto (preload entire video)
	const getPreloadStrategy = (): 'none' | 'metadata' | 'auto' => {
		if (slowConnection) return 'none'
		if (isMobile && !priority) return 'metadata'
		return 'auto'
	}

	return (
		<div className={`relative w-full overflow-hidden bg-black ${containerClassName ?? ''}`} style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
			<video
				ref={videoRef}
				className={`absolute top-0 left-0 w-full h-full object-cover ${className ?? ''}`}
				muted={false}
				playsInline
				loop
				preload={getPreloadStrategy()}
				poster={poster}
				controls={controls}
				{...{ 'webkit-playsinline': 'true' } as any}
				onLoadedMetadata={() => console.log('[VideoHero] loadedmetadata')}
				onCanPlay={() => console.log('[VideoHero] canplay')}
				onError={(e) => {
					const v = e.currentTarget
					console.log('[VideoHero] error', { error: v.error, src: v.currentSrc })
				}}
			>
				{srcs.map((s) => (
					<source key={s} src={s} type="video/mp4" />
				))}
				Your browser does not support the video tag.
			</video>
		</div>
	)
}

export default VideoHero


