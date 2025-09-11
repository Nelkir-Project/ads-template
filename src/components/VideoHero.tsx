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
		ref.current?.play().catch(() => {})
	}, [])

	return (
		<div className={`relative w-full aspect-video overflow-hidden bg-black ${containerClassName ?? ''}`}>
			<video
				ref={ref}
				className={`absolute inset-0 w-full h-full object-cover ${className ?? ''}`}
				autoPlay
				muted
				playsInline
				loop
				preload="metadata"
				poster={poster}
				controls={controls}
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


