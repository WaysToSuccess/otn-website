import { useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight, Images, Plus } from 'lucide-react'
import { useInView, anim } from '../../hooks/useInView'

const BASE = '/images/51.otn volkslauf-2026/'
// Pre-resized, compressed WebP derivatives (thumb: 640px grid, full: 1920px lightbox)
// generated from the original ~9-12 MB camera JPEGs — keeps the grid to a few KB per tile.
const THUMB = BASE + 'thumb/'
const FULL = BASE + 'full/'

const rawFiles: { file: string; w: number; h: number }[] = [
  { file: 'DSC00194.jpg', w: 640, h: 801 },
  { file: 'DSC00221.jpg', w: 640, h: 800 },
  { file: 'DSC00231.jpg', w: 640, h: 800 },
  { file: 'DSC00253.jpg', w: 640, h: 426 },
  { file: 'DSC00261.jpg', w: 640, h: 800 },
  { file: 'DSC00264.jpg', w: 640, h: 800 },
  { file: 'DSC00268.jpg', w: 640, h: 427 },
  { file: 'DSC00272.jpg', w: 640, h: 800 },
  { file: 'DSC00283.jpg', w: 640, h: 800 },
  { file: 'DSC00286.jpg', w: 640, h: 800 },
  { file: 'DSC00300.jpg', w: 640, h: 800 },
  { file: 'DSC00312.jpg', w: 640, h: 800 },
  { file: 'DSC00379.jpg', w: 640, h: 427 },
  { file: 'DSC00394.jpg', w: 640, h: 427 },
  { file: 'DSC00406.jpg', w: 640, h: 800 },
  { file: 'DSC00409.jpg', w: 640, h: 801 },
  { file: 'DSC00420.jpg', w: 640, h: 800 },
  { file: 'DSC00430.jpg', w: 640, h: 801 },
  { file: 'DSC00437.jpg', w: 640, h: 800 },
  { file: 'DSC00469.jpg', w: 640, h: 800 },
  { file: 'DSC00507.jpg', w: 640, h: 800 },
  { file: 'DSC00513.jpg', w: 640, h: 426 },
  { file: 'DSC00517.jpg', w: 640, h: 427 },
  { file: 'DSC00526.jpg', w: 640, h: 801 },
  { file: 'DSC00532.jpg', w: 640, h: 800 },
  { file: 'DSC00565.jpg', w: 640, h: 800 },
  { file: 'DSC00580.jpg', w: 640, h: 800 },
  { file: 'DSC00630.jpg', w: 640, h: 800 },
  { file: 'DSC00644.jpg', w: 640, h: 800 },
  { file: 'DSC00682.jpg', w: 640, h: 800 },
  { file: 'DSC00694.jpg', w: 640, h: 800 },
  { file: 'DSC00718.jpg', w: 640, h: 426 },
  { file: 'DSC00731.jpg', w: 640, h: 426 },
  { file: 'DSC00745.jpg', w: 640, h: 426 },
  { file: 'DSC00765.jpg', w: 640, h: 800 },
  { file: 'DSC00767.jpg', w: 640, h: 960 },
  { file: 'DSC00771.jpg', w: 640, h: 800 },
  { file: 'DSC00785.jpg', w: 640, h: 800 },
  { file: 'DSC00801.jpg', w: 640, h: 800 },
  { file: 'DSC00804.jpg', w: 640, h: 800 },
  { file: 'DSC00812.jpg', w: 640, h: 800 },
  { file: 'DSC00818.jpg', w: 640, h: 801 },
  { file: 'DSC00843.jpg', w: 640, h: 800 },
  { file: 'DSC00854.jpg', w: 640, h: 800 },
  { file: 'DSC00903.jpg', w: 640, h: 801 },
  { file: 'DSC00916.jpg', w: 640, h: 800 },
  { file: 'DSC00932.jpg', w: 640, h: 800 },
  { file: 'DSC00959.jpg', w: 640, h: 800 },
  { file: 'DSC00974.jpg', w: 640, h: 800 },
  { file: 'DSC00981.jpg', w: 640, h: 800 },
  { file: 'DSC01008.jpg', w: 640, h: 800 },
  { file: 'DSC01018.jpg', w: 640, h: 801 },
  { file: 'DSC01034.jpg', w: 640, h: 800 },
  { file: 'DSC01074.jpg', w: 640, h: 800 },
  { file: 'DSC01087.jpg', w: 640, h: 800 },
  { file: 'DSC01103.jpg', w: 640, h: 800 },
  { file: 'DSC01121.jpg', w: 640, h: 800 },
  { file: 'DSC01134.jpg', w: 640, h: 800 },
  { file: 'DSC01155.jpg', w: 640, h: 800 },
  { file: 'DSC01176.jpg', w: 640, h: 801 },
  { file: 'DSC01194.jpg', w: 640, h: 800 },
  { file: 'DSC01201.jpg', w: 640, h: 800 },
  { file: 'DSC01207.jpg', w: 640, h: 853 },
  { file: 'DSC01211.jpg', w: 640, h: 800 },
  { file: 'DSC01217.jpg', w: 640, h: 800 },
  { file: 'DSC01250.jpg', w: 640, h: 800 },
  { file: 'DSC01286.jpg', w: 640, h: 800 },
  { file: 'DSC01294.jpg', w: 640, h: 800 },
  { file: 'DSC01306.jpg', w: 640, h: 800 },
  { file: 'DSC01347.jpg', w: 640, h: 800 },
  { file: 'DSC01352.jpg', w: 640, h: 799 },
  { file: 'DSC01389.jpg', w: 640, h: 800 },
  { file: 'DSC01399.jpg', w: 640, h: 800 },
  { file: 'DSC01431.jpg', w: 640, h: 800 },
  { file: 'DSC01460.jpg', w: 640, h: 800 },
  { file: 'DSC01484.jpg', w: 640, h: 800 },
  { file: 'DSC01495.jpg', w: 640, h: 800 },
]

const images = rawFiles.map(({ file, w, h }, i) => {
  const base = file.replace(/\.jpg$/i, '')
  return {
    file,
    thumb: THUMB + base + '.webp',
    full: FULL + base + '.webp',
    w,
    h,
    caption: `51. Volkslauf bei Olympia · Impression ${i + 1}`,
  }
})

const PAGE_SIZE = 12

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
          src={img.full}
          alt={img.caption}
          width={img.w}
          height={img.h}
          decoding="async"
          className="max-h-[60vh] sm:max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
        />
        <div className="mt-4 flex flex-col items-center gap-1 text-center px-4">
          <p className="text-white/40 text-xs tabular-nums">{index + 1} / {images.length}</p>
        </div>
      </div>
    </div>
  )
}

// Tracks how many masonry columns to render (matches the old columns-2/sm:3/lg:4 breakpoints).
function useColumnCount() {
  const [cols, setCols] = useState(2)
  useEffect(() => {
    const mqLg = window.matchMedia('(min-width: 1024px)')
    const mqSm = window.matchMedia('(min-width: 640px)')
    const update = () => setCols(mqLg.matches ? 4 : mqSm.matches ? 3 : 2)
    update()
    mqLg.addEventListener('change', update)
    mqSm.addEventListener('change', update)
    return () => {
      mqLg.removeEventListener('change', update)
      mqSm.removeEventListener('change', update)
    }
  }, [])
  return cols
}

type ImgData = (typeof images)[number]

function GalleryTile({ img, i, isShowcasing, isLoaded, onLoadImg, onOpen, tileRef }: {
  img: ImgData
  i: number
  isShowcasing: boolean
  isLoaded: boolean
  onLoadImg: (i: number) => void
  onOpen: (i: number) => void
  tileRef: (el: HTMLButtonElement | null) => void
}) {
  return (
    <button
      ref={tileRef}
      data-idx={i}
      onClick={() => onOpen(i)}
      className="group relative block w-full rounded-xl overflow-hidden bg-gray-100 transition-all duration-300 hover:-translate-y-1"
      style={{
        boxShadow: isShowcasing ? '0 16px 32px -6px rgba(0,51,153,0.28)' : '0 4px 14px rgba(0,51,153,0.10)',
        transform: isShowcasing ? 'translateY(-6px)' : undefined,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 16px 32px -6px rgba(0,51,153,0.28)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = isShowcasing ? '0 16px 32px -6px rgba(0,51,153,0.28)' : '0 4px 14px rgba(0,51,153,0.10)' }}
      aria-label={`Bild öffnen: ${img.caption}`}
    >
      <img
        src={img.thumb}
        alt={img.caption}
        width={img.w}
        height={img.h}
        loading="lazy"
        decoding="async"
        fetchPriority={i < 4 ? 'high' : 'auto'}
        onLoad={() => onLoadImg(i)}
        className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.04]"
        style={{
          transform: isShowcasing ? 'scale(1.04)' : undefined,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.35s ease, transform 0.5s ease',
        }}
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
      <div
        className="absolute inset-0 transition-opacity duration-300 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100"
        style={{ background: 'linear-gradient(to top, rgba(0,20,80,0.55), transparent 55%)', opacity: isShowcasing ? 1 : undefined }}
      >
        <span className="text-white text-xs font-semibold tracking-wide">Ansehen</span>
      </div>
    </button>
  )
}

export default function VlEventGallery() {
  const { ref: headRef, visible: headVisible } = useInView()
  const { ref: gridRef, visible: gridVisible } = useInView()
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [showcase, setShowcase] = useState<number | null>(null)
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set())
  const colCount = useColumnCount()

  const shown = images.slice(0, visibleCount)
  const hasMore = visibleCount < images.length

  // Auto-play the hover reveal, one tile after another, for whatever is currently in the viewport.
  const tileRefs = useRef<Map<number, HTMLButtonElement>>(new Map())
  const playedRef = useRef<Set<number>>(new Set())
  const queueRef = useRef<number[]>([])
  const runningRef = useRef(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const runQueue = () => {
      if (runningRef.current) return
      const next = queueRef.current.shift()
      if (next === undefined) return
      runningRef.current = true
      setShowcase(next)
      setTimeout(() => {
        setShowcase((cur) => (cur === next ? null : cur))
      }, 900)
      setTimeout(() => {
        runningRef.current = false
        runQueue()
      }, 450)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx)
          if (entry.isIntersecting && !playedRef.current.has(idx)) {
            playedRef.current.add(idx)
            queueRef.current.push(idx)
          }
        })
        runQueue()
      },
      { threshold: 0.4 }
    )
    tileRefs.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [shown.length])

  const markLoaded = (i: number) => setLoaded((prev) => (prev.has(i) ? prev : new Set(prev).add(i)))

  // Distribute round-robin into fixed columns (instead of CSS `columns-*`, whose auto-balancing
  // reshuffles every tile's position whenever the item count changes — that's what caused the
  // whole grid, and the scroll position, to jump on "Mehr laden"). Round-robin only ever appends
  // to the end of a column, so tiles already on screen never move.
  const columns: { img: ImgData; i: number }[][] = Array.from({ length: colCount }, () => [])
  shown.forEach((img, i) => { columns[i % colCount].push({ img, i }) })

  return (
    <section id="fotos" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={headRef} style={anim(headVisible)} className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-[#003399] font-semibold text-xs uppercase tracking-[0.2em] px-4 py-1.5 bg-[#003399]/8 rounded-full mb-4">
            <Images className="w-3.5 h-3.5" />
            Bildergalerie
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#003399] mb-3">Der 51. Volkslauf in Bildern</h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm">
            Impressionen vom Renntag – Start, Strecke, Zieleinlauf und Stimmung. Zum Vergrößern anklicken.
          </p>
        </div>

        <div ref={gridRef} style={anim(gridVisible, 100)} className="flex gap-3 sm:gap-4 items-start">
          {columns.map((col, ci) => (
            <div key={ci} className="flex-1 min-w-0 flex flex-col gap-3 sm:gap-4">
              {col.map(({ img, i }) => (
                <GalleryTile
                  key={img.file}
                  img={img}
                  i={i}
                  isShowcasing={showcase === i}
                  isLoaded={loaded.has(i)}
                  onLoadImg={markLoaded}
                  onOpen={setOpenIndex}
                  tileRef={(el) => { if (el) tileRefs.current.set(i, el); else tileRefs.current.delete(i) }}
                />
              ))}
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 sm:mt-10 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, images.length))}
              className="inline-flex items-center gap-2 bg-[#003399] hover:bg-[#0040cc] text-white font-semibold text-lg px-3 py-1.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Mehr laden
              <span className="text-white font-normal tabular-nums">
                ({visibleCount} / {images.length})
              </span>
            </button>
          </div>
        )}
      </div>

      {openIndex !== null && (
        <Lightbox
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onPrev={() => setOpenIndex((i) => (i === null ? null : (i - 1 + shown.length) % shown.length))}
          onNext={() => setOpenIndex((i) => (i === null ? null : (i + 1) % shown.length))}
        />
      )}
    </section>
  )
}
