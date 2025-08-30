import { useEffect, useState } from 'react'

interface UseCountingAnimationOptions {
  start?: number
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
}

export function useCountingAnimation(
  trigger: boolean,
  options: UseCountingAnimationOptions
) {
  const {
    start = 0,
    end,
    duration = 2000,
    decimals = 0,
    prefix = '',
    suffix = '',
    separator = ','
  } = options

  const [current, setCurrent] = useState(start)

  useEffect(() => {
    if (!trigger) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const value = start + (end - start) * easeOutQuart
      
      setCurrent(value)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [trigger, start, end, duration])

  // Format the number with separators and decimals
  const formatNumber = (num: number) => {
    const rounded = Number(num.toFixed(decimals))
    const parts = rounded.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return parts.join('.')
  }

  return `${prefix}${formatNumber(current)}${suffix}`
}
