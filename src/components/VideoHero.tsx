import React, { useEffect, useRef } from 'react'

type VideoHeroProps = {
	className?: string
	containerClassName?: string
	srcs?: string[]
	poster?: string
	controls?: boolean
}

const DEFAULT_SRCS = [
	'https://payfud-local-storage.s3.us-east-1.amazonaws.com/videos/Branzini+Hero.mp4',
	'https://www.w3schools.com/html/mov_bbb.mp4',
]

const VideoHero: React.FC<VideoHeroProps> = ({
	className,
	containerClassName,
	srcs = DEFAULT_SRCS,
	poster,
	controls = false,
}) => {
	const ref = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		// Try to start playback on mount (muted + playsInline allows autoplay on mobile)
		const video = ref.current
		if (video) {
			// Ensure video is loaded before attempting play
			if (video.readyState >= 3) {
				video.play().catch((err) => {
					console.log('[VideoHero] Autoplay failed:', err)
				})
			} else {
				// Wait for video to be ready
				const handleCanPlay = () => {
					video.play().catch((err) => {
						console.log('[VideoHero] Autoplay failed after canplay:', err)
					})
				}
				video.addEventListener('canplay', handleCanPlay, { once: true })
				return () => video.removeEventListener('canplay', handleCanPlay)
			}
		}
	}, [])

	return (
		<div className={`relative w-full overflow-hidden bg-black ${containerClassName ?? ''}`} style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
			<video
				ref={ref}
				className={`absolute top-0 left-0 w-full h-full object-cover ${className ?? ''}`}
				autoPlay
				muted
				playsInline
				loop
				preload="metadata"
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


