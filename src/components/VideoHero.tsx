import React from 'react'
import { useVideoIntersectionObserver } from '../hooks/useVideoIntersectionObserver'

type VideoHeroProps = {
	className?: string
	containerClassName?: string
	srcs?: string[]
	poster?: string
	controls?: boolean
}

const DEFAULT_SRCS = [
	'/video.mp4',
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
	const { videoRef } = useVideoIntersectionObserver({ 
		threshold: 0.3, 
		enableSound: true 
	})

	return (
		<div className={`relative w-full overflow-hidden bg-black ${containerClassName ?? ''}`} style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
			<video
				ref={videoRef}
				className={`absolute top-0 left-0 w-full h-full object-cover ${className ?? ''}`}
				muted={false}
				playsInline
				loop
				preload="auto"
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


