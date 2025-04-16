"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  className?: string
  formatter?: (value: number) => string
}

export function AnimatedCounter({
  from,
  to,
  duration = 2,
  className = "",
  formatter = (value) => value.toString(),
}: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const nodeRef = useRef(null)
  const inView = useInView(nodeRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!inView) return

    let startTime: number
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const currentCount = Math.floor(progress * (to - from) + from)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    animationFrame = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrame)
  }, [from, to, duration, inView])

  return (
    <motion.span
      ref={nodeRef}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {formatter(count)}
    </motion.span>
  )
}

