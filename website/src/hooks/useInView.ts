import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

export function anim(visible: boolean, delay = 0, from: 'bottom' | 'left' | 'right' | 'scale' = 'bottom') {
  const transforms: Record<typeof from, string> = {
    bottom: 'translateY(28px)',
    left: 'translateX(-32px)',
    right: 'translateX(32px)',
    scale: 'scale(0.88)',
  }
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : transforms[from],
    transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
  }
}
