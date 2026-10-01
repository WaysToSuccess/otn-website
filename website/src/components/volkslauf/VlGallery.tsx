import { useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useInView, anim } from '../../hooks/useInView'

const BASE = '/images/privat/Vorbereitung und Bekanntheit/'

type Category = 'Presse' | 'Training' | 'Werbung'

const images: { file: string; caption: string; category: Category }[] = [
  { file: 'zeitungsartikel-ein-klassiker-kehrt-zurueck.jpeg', caption: 'Zeitungsartikel „Ein Klassiker kehrt zurück"', category: 'Presse' },
  { file: 'trainingslauf-gruppe-01.jpeg', caption: 'Der erste Trainingslauf im Juli', category: 'Training' },
  { file: 'zeitungsartikel-trainingslaeufe-gestartet.jpeg', caption: 'Zeitungsartikel: Trainingsläufe gestartet', category: 'Presse' },
  { file: 'trainingslauf-gruppe-02.jpeg', caption: 'Trainingslauf am Olympia-Clubheim', category: 'Training' },
  { file: 'trainingslauf-gruppe-03.jpeg', caption: 'Die Laufgruppe wächst von Woche zu Woche', category: 'Training' },
  { file: 'zeitungsanzeige-holsteinischer-courier.jpeg', caption: 'Anzeige im Holsteinischer Courier', category: 'Presse' },
  { file: 'trainingslauf-gruppe-04.jpeg', caption: 'Großer Andrang beim Trainingslauf', category: 'Training' },
  { file: 'zeitungsartikel-laufgemeinschaft-waechst.jpeg', caption: 'Zeitungsartikel „Die Laufgemeinschaft wächst"', category: 'Presse' },
  { file: 'zeitungsanzeige-die-legende-laeuft-wieder.jpeg', caption: 'Anzeige „Die Legende läuft wieder!"', category: 'Presse' },
  { file: 'zeitungsartikel-vorbereitung-laufevent.jpeg', caption: 'Zeitungsartikel zur Vorbereitung aufs Laufevent', category: 'Presse' },
  { file: 'trainingslauf-gruppe-05.jpeg', caption: 'Trainingslauf im Abendlicht', category: 'Training' },
  { file: 'ankuendigung-gartenstadt-open-air.jpeg', caption: 'Ankündigung für das Gartenstadt Open Air', category: 'Werbung' },
  { file: 'ankuendigung-volkslauf.jpeg', caption: 'Ankündigung für den 51. o.t.n Volkslauf', category: 'Werbung' },
  { file: 'zeitungsartikel-olympia-volkslauf-september.jpeg', caption: 'Zeitungsartikel zum Volkslauf im September', category: 'Presse' },
  { file: 'aufbau-eingang.jpeg', caption: 'Aufbau am Haupteingang', category: 'Werbung' },
  { file: 'trainingslauf-gruppe-06.jpeg', caption: 'Letzter Trainingslauf vor dem großen Tag', category: 'Training' },
]

function Lightbox({ index, onClose, onPrev, onNext }: { index: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  const img = images[index]
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onPrev, onNext])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Bildergalerie: ${img.caption}`}
      className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-black/92 px-3 py-6 sm:px-6"
      onClick={onClose}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const dx = e.changedTouches[0].clientX - touchStartX.current
        if (dx > 60) onPrev()
        else if (dx < -60) onNext()
        touchStartX.current = null
      }}
    >
      <button
        onClick={onClose}
        aria-label="Schließen"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Desktop: side-mounted arrows */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Vorheriges Bild"
        style={{ boxShadow: '0 10px 28px rgba(0,20,80,0.5)' }}
        className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#003399] hover:bg-[#0040cc] text-white items-center justify-center transition-all duration-200 hover:scale-110 z-10"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Nächstes Bild"
        style={{ boxShadow: '0 10px 28px rgba(0,20,80,0.5)' }}
        className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#003399] hover:bg-[#0040cc] text-white items-center justify-center transition-all duration-200 hover:scale-110 z-10"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Mobile: arrows grouped at the bottom of the screen */}
      <div className="flex sm:hidden absolute bottom-6 left-1/2 -translate-x-1/2 gap-6 z-10">
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          aria-label="Vorheriges Bild"
          style={{ boxShadow: '0 10px 28px rgba(0,20,80,0.5)' }}
          className="w-12 h-12 rounded-full bg-[#003399] active:bg-[#0040cc] text-white flex items-center justify-center transition-transform active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          aria-label="Nächstes Bild"
          style={{ boxShadow: '0 10px 28px rgba(0,20,80,0.5)' }}
          className="w-12 h-12 rounded-full bg-[#003399] active:bg-[#0040cc] text-white flex items-center justify-center transition-transform active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-5xl w-full flex flex-col items-center mb-20 sm:mb-0" onClick={(e) => e.stopPropagation()}>
        <img
          key={img.file}
          src={BASE + img.file}
          alt={img.caption}
          className="max-h-[60vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
        />
        <div className="mt-4 flex flex-col items-center gap-1 text-center px-4">
          <p className="text-white/90 text-sm font-medium">{img.caption}</p>
          <p className="text-white/40 text-xs tabular-nums">{index + 1} / {images.length}</p>
        </div>
      </div>
    </div>
  )
}

const SCROLL_STEP = 340

export default function VlGallery() {
  const { ref: headRef, visible: headVisible } = useInView()
  const { ref: stripRef, visible: stripVisible } = useInView()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateEdges = () => {
    const el = scrollerRef.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    updateEdges()
    const el = scrollerRef.current
    if (!el) return
    el.addEventListener('scroll', updateEdges, { passive: true })
    window.addEventListener('resize', updateEdges)
    return () => {
      el.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
    }
  }, [])

  const scrollByStep = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * SCROLL_STEP, behavior: 'smooth' })
  }

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headRef} style={anim(headVisible)} className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#003399] mb-3">Vorbereitung &amp; Bekanntheit</h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm">
            Trainingsläufe, Presseberichte und Werbung rund um den 51. Volkslauf. Zum Durchklicken.
          </p>
        </div>

        <div ref={stripRef} style={anim(stripVisible, 100)} className="relative">
          {/* Edge fades: desktop-only hint that there's more to scroll (on mobile it clipped the peeking card's shadow into an ugly white block, and the on-screen arrows already make scrollability obvious) */}
          <div className="hidden sm:block absolute inset-y-0 left-0 w-16 pointer-events-none z-[2]" style={{ background: 'linear-gradient(to right, white, transparent)' }} />
          <div className="hidden sm:block absolute inset-y-0 right-0 w-16 pointer-events-none z-[2]" style={{ background: 'linear-gradient(to left, white, transparent)' }} />

          {/* Nav arrows, vertically centered on the photo (not the caption below it) */}
          <button
            onClick={() => scrollByStep(-1)}
            disabled={atStart}
            aria-label="Vorherige Bilder"
            style={{ boxShadow: '0 8px 20px rgba(0,51,153,0.35)' }}
            className="hidden sm:flex absolute left-1 top-[108px] sm:top-36 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#003399] hover:bg-[#0040cc] items-center justify-center text-white transition-all duration-200 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scrollByStep(1)}
            disabled={atEnd}
            aria-label="Weitere Bilder"
            style={{ boxShadow: '0 8px 20px rgba(0,51,153,0.35)' }}
            className="hidden sm:flex absolute right-1 top-[108px] sm:top-36 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#003399] hover:bg-[#0040cc] items-center justify-center text-white transition-all duration-200 hover:scale-110 disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            ref={scrollerRef}
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
            className="vl-gallery-strip flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 scroll-px-4 sm:mx-0 sm:px-14 sm:scroll-px-14"
          >
            {images.map((img, i) => (
              <button
                key={img.file}
                onClick={() => setOpenIndex(i)}
                className="group relative shrink-0 w-72 sm:w-96 rounded-2xl overflow-hidden bg-white border border-gray-100 transition-all duration-300 snap-start hover:-translate-y-1.5 text-left"
                style={{ boxShadow: '0 4px 16px rgba(0,51,153,0.10)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 20px 40px -8px rgba(0,51,153,0.28)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,51,153,0.10)' }}
                aria-label={`Bild öffnen: ${img.caption}`}
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={BASE + img.file}
                    alt={img.caption}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
                </div>
                <div className="p-2 min-h-[2.5rem] sm:min-h-[2.75rem] flex items-center">
                  <p className="text-[#003399] text-sm sm:text-base font-semibold leading-snug line-clamp-2">
                    {img.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile nav: overlaying arrows have no room on narrow screens, so give touch users on-screen controls below the strip instead */}
        <div className="flex sm:hidden justify-center gap-5 mt-5">
          <button
            onClick={() => scrollByStep(-1)}
            disabled={atStart}
            aria-label="Vorherige Bilder"
            style={{ boxShadow: '0 8px 20px rgba(0,51,153,0.35)' }}
            className="w-12 h-12 rounded-full bg-[#003399] active:bg-[#0040cc] flex items-center justify-center text-white transition-opacity disabled:opacity-30"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scrollByStep(1)}
            disabled={atEnd}
            aria-label="Weitere Bilder"
            style={{ boxShadow: '0 8px 20px rgba(0,51,153,0.35)' }}
            className="w-12 h-12 rounded-full bg-[#003399] active:bg-[#0040cc] flex items-center justify-center text-white transition-opacity disabled:opacity-30"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onPrev={() => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))}
          onNext={() => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length))}
        />
      )}

      <style>{`.vl-gallery-strip::-webkit-scrollbar { display: none; }`}</style>
    </section>
  )
}
