import React, { useState, useEffect, useRef } from 'react'

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
	const [isPlaying, setIsPlaying] = useState(false)
	const videoRef = useRef<HTMLVideoElement>(null)
	
	useEffect(() => {
		setIsMobile(isMobileDevice())
		setSlowConnection(isSlowConnection())
	}, [])

	// Adaptive preload strategy:
	// - Slow connection: none (only load when user clicks play)
	// - Mobile (normal speed): metadata (only load video info, not content)
	// - Desktop or priority content: auto (preload entire video)
	const getPreloadStrategy = (): 'none' | 'metadata' | 'auto' => {
		if (slowConnection) return 'none'
		if (isMobile && !priority) return 'metadata'
		return 'auto'
	}

	const handleVideoClick = () => {
		if (!videoRef.current) return
		
		if (videoRef.current.paused) {
			videoRef.current.play()
			setIsPlaying(true)
		} else {
			videoRef.current.pause()
			setIsPlaying(false)
		}
	}

	return (
		<div 
			className={`relative w-full overflow-hidden bg-black ${!controls ? 'cursor-pointer' : ''} ${containerClassName ?? ''}`} 
			style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}
			onClick={!controls ? handleVideoClick : undefined}
		>
		<video
			ref={videoRef}
			className={`absolute top-0 left-0 w-full h-full object-cover ${className ?? ''}`}
			muted={false}
			playsInline
			loop
			controls={controls}
			preload={getPreloadStrategy()}
			poster={poster}
			{...{ 'webkit-playsinline': 'true' } as any}
			onPlay={() => setIsPlaying(true)}
			onPause={() => setIsPlaying(false)}
		>
				{srcs.map((s) => (
					<source key={s} src={s} type="video/mp4" />
				))}
				Your browser does not support the video tag.
			</video>
		
		{/* Play/Pause overlay icon - only show when controls are disabled */}
		{!controls && !isPlaying && (
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div className="bg-black/50 rounded-full p-4">
					<svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
						<path d="M8 5v14l11-7z"/>
					</svg>
				</div>
			</div>
		)}
	</div>
	)
}

export default VideoHero


