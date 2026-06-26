import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const sparks = [
  { style: { top: '-5px', left: '14px',  animationDelay: '0s',   animationName: 'fsparkUp' } },
  { style: { top: '-5px', left: '48px',  animationDelay: '0.5s', animationName: 'fsparkUp' } },
  { style: { top: '-5px', right: '18px', animationDelay: '0.9s', animationName: 'fsparkUp' } },
  { style: { bottom: '-5px', left: '24px',  animationDelay: '0.3s', animationName: 'fsparkDown' } },
  { style: { bottom: '-5px', right: '28px', animationDelay: '0.7s', animationName: 'fsparkDown' } },
  { style: { left: '-5px', top: '8px',   animationDelay: '0.2s', animationName: 'fsparkLeft' } },
  { style: { right: '-5px', top: '8px',  animationDelay: '0.6s', animationName: 'fsparkRight' } },
  { style: { right: '-5px', bottom: '8px', animationDelay: '0.1s', animationName: 'fsparkRight' } },
]

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let footerVisible = false
    let vh = window.innerHeight

    const resizeHandler = () => { vh = window.innerHeight }
    window.addEventListener('resize', resizeHandler, { passive: true })

    const scrollHandler = () => {
      const pastHero = window.scrollY > vh * 0.75
      setVisible(pastHero && !footerVisible)
    }

    const footer = document.querySelector('footer')
    let obs: IntersectionObserver | null = null
    if (footer) {
      obs = new IntersectionObserver(([e]) => {
        footerVisible = e.isIntersecting
        scrollHandler()
      }, { threshold: 0 })
      obs.observe(footer)
    }

    window.addEventListener('scroll', scrollHandler, { passive: true })
    scrollHandler()
    return () => {
      window.removeEventListener('scroll', scrollHandler)
      window.removeEventListener('resize', resizeHandler)
      obs?.disconnect()
    }
  }, [])

  return (
    <>
      {/* Desktop: bottom-right  |  Mobile: bottom-center */}
      <div
        className="fixed z-40 bottom-6 right-4 sm:right-6 left-4 sm:left-auto flex justify-center sm:block pointer-events-none"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        <a
          href="#anmelden"
          className="pointer-events-auto relative inline-flex items-center gap-2.5 font-bold text-sm text-white px-6 py-3.5 rounded-2xl transition-all duration-200"
          style={{
            background: 'rgba(0, 51, 153, 0.72)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid #001a6e',
            boxShadow: '0 8px 32px rgba(0,51,153,0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#001a6e'
            ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 36px rgba(0,26,110,0.5)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,51,153,0.72)'
            ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 32px rgba(0,51,153,0.35), inset 0 1px 0 rgba(255,255,255,0.12)'
          }}
        >
          {/* Spark pixels */}
          {sparks.map((p, i) => (
            <span
              key={i}
              className="absolute rounded-sm pointer-events-none"
              style={{
                ...p.style,
                width: 3,
                height: 3,
                background: 'rgba(255,255,255,0.8)',
                animationDuration: '1.5s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
              }}
            />
          ))}

          Jetzt anmelden
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <style>{`
        @keyframes fsparkUp    { 0%,100%{opacity:0;transform:translateY(0)}  50%{opacity:1;transform:translateY(-5px)} }
        @keyframes fsparkDown  { 0%,100%{opacity:0;transform:translateY(0)}  50%{opacity:1;transform:translateY(5px)}  }
        @keyframes fsparkLeft  { 0%,100%{opacity:0;transform:translateX(0)}  50%{opacity:1;transform:translateX(-5px)} }
        @keyframes fsparkRight { 0%,100%{opacity:0;transform:translateX(0)}  50%{opacity:1;transform:translateX(5px)}  }
      `}</style>
    </>
  )
}
