import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import InternLayout from './InternLayout'
import { PostGraphics } from './PostGraphics'

const FORMATS = [
  { value: 'instagram-post', label: 'Instagram Post', w: 1080, h: 1080, preview: 340 },
  { value: 'instagram-story', label: 'Instagram Story', w: 1080, h: 1920, preview: 191 },
  { value: 'facebook-post', label: 'Facebook Post', w: 1200, h: 630, preview: 340 },
  { value: 'facebook-banner', label: 'Facebook Banner', w: 1640, h: 624, preview: 340 },
]

const TEMPLATES = [
  { id: 'event', label: 'Veranstaltung', bg: 'linear-gradient(135deg, #003399 0%, #1a3a5c 100%)', textColor: '#ffffff', accent: '#2dd4bf', overlay: '' },
  { id: 'teal', label: 'Ankündigung', bg: 'linear-gradient(135deg, #0d9488 0%, #003399 100%)', textColor: '#ffffff', accent: '#ffffff', overlay: '' },
  { id: 'light', label: 'Info / Neutral', bg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', textColor: '#1a3a5c', accent: '#003399', overlay: '' },
  { id: 'dark', label: 'Ergebnis / Highlight', bg: 'linear-gradient(135deg, #0f172a 0%, #1a3a5c 100%)', textColor: '#ffffff', accent: '#2dd4bf', overlay: '' },
]

const CATEGORIES = ['Veranstaltung', 'Ankündigung', 'Ergebnis', 'Sponsor', 'Motivation', 'Info']
const OTN_STYLE = 'professional sports health orthopedics Schleswig-Holstein Germany, blue teal colors, high quality photorealistic'

type BildModus = 'keins' | 'generieren' | 'galerie'

type Post = {
  id: string
  format: string
  template: string
  category: string
  headline: string
  subtext: string
  hashtags: string
  timestamp: string
  bgImage?: string
}

type GalleryImage = { id: string; url: string; topic: string; timestamp: string }

export default function InternSocialMediaPage() {
  const [format, setFormat] = useState('instagram-post')
  const [template, setTemplate] = useState('event')
  const [category, setCategory] = useState('Ankündigung')
  const [headline, setHeadline] = useState('')
  const [subtext, setSubtext] = useState('')
  const [hashtags, setHashtags] = useState('#OTN #Volkslauf #SchleswigHolstein')
  const [bgImage, setBgImage] = useState<string | undefined>(() => {
    const v = sessionStorage.getItem('post_bg_image')
    if (v) sessionStorage.removeItem('post_bg_image')
    return v ?? undefined
  })
  const [bildModus, setBildModus] = useState<BildModus>(() =>
    sessionStorage.getItem('post_bg_image') ? 'galerie' : 'keins'
  )
  const [imgLoading, setImgLoading] = useState(false)
  const [imgError, setImgError] = useState('')
  const [showGallery, setShowGallery] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [posts, setPosts] = useState<Post[]>(() => {
    try { return JSON.parse(localStorage.getItem('otn_posts') || '[]') } catch { return [] }
  })
  const [activePost, setActivePost] = useState<Post | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const gallery: GalleryImage[] = (() => {
    try { return JSON.parse(localStorage.getItem('otn_gallery') || '[]') } catch { return [] }
  })()

  const currentFormat = FORMATS.find(f => f.value === format) ?? FORMATS[0]
  const currentTemplate = TEMPLATES.find(t => t.id === template) ?? TEMPLATES[0]
  const previewScale = currentFormat.preview / currentFormat.w
  const previewH = currentFormat.h * previewScale

  async function generateBgImage() {
    setImgLoading(true)
    setImgError('')
    try {
      const q = encodeURIComponent(`${headline || 'running event'}, ${OTN_STYLE}`)
      const url = `https://image.pollinations.ai/prompt/${q}?width=${currentFormat.w}&height=${currentFormat.h}&seed=${Date.now()}&nologo=true`
      await new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Bild konnte nicht geladen werden'))
        img.src = url
      })
      setBgImage(url)
      // auch in Galerie speichern
      const gal = JSON.parse(localStorage.getItem('otn_gallery') || '[]')
      gal.unshift({ id: Date.now().toString(), url, topic: headline || 'Post-Bild', timestamp: new Date().toLocaleString('de-DE') })
      localStorage.setItem('otn_gallery', JSON.stringify(gal.slice(0, 50)))
    } catch (e: unknown) {
      setImgError(e instanceof Error ? e.message : 'Fehler')
    }
    setImgLoading(false)
  }

  function savePost() {
    if (!headline.trim()) return
    const post: Post = {
      id: Date.now().toString(),
      format, template, category, headline, subtext, hashtags,
      bgImage,
      timestamp: new Date().toLocaleString('de-DE'),
    }
    const updated = [post, ...posts]
    setPosts(updated)
    localStorage.setItem('otn_posts', JSON.stringify(updated))
    setActivePost(post)
  }

  async function exportPNG() {
    if (!previewRef.current) return
    setExporting(true)
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: currentFormat.w / currentFormat.preview,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      })
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = `otn-post-${Date.now()}.png`
      a.click()
    } catch (e) { console.error(e) }
    setExporting(false)
  }

  const pad = currentFormat.preview * 0.06

  return (
    <InternLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Social Media Post-Designer</h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ── Editor ── */}
          <div className="xl:col-span-1 space-y-4">

            {/* Format & Vorlage */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-600 mb-4">Format & Design</h2>

              <label className="text-xs font-medium text-gray-500 mb-1 block">Format</label>
              <select value={format} onChange={e => setFormat(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none mb-3">
                {FORMATS.map(f => <option key={f.value} value={f.value}>{f.label} ({f.w}×{f.h})</option>)}
              </select>

              <label className="text-xs font-medium text-gray-500 mb-1 block">Farbvorlage</label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {TEMPLATES.map(t => (
                  <button key={t.id} onClick={() => setTemplate(t.id)}
                    className="text-xs py-2 px-3 rounded-lg border-2 transition-all text-left"
                    style={{ background: t.bg, color: t.textColor, borderColor: template === t.id ? t.accent : 'transparent' }}>
                    {t.label}
                  </button>
                ))}
              </div>

              <label className="text-xs font-medium text-gray-500 mb-1 block">Kategorie</label>
              <select value={category} onChange={e => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Hintergrundbild */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-600 mb-3">Hintergrundbild</h2>
              <div className="flex gap-2 mb-3">
                {(['keins', 'generieren', 'galerie'] as BildModus[]).map(m => (
                  <button key={m} onClick={() => { setBildModus(m); if (m === 'keins') setBgImage(undefined); if (m === 'galerie') setShowGallery(true) }}
                    className="flex-1 text-xs py-2 px-2 rounded-lg border-2 font-medium transition-all"
                    style={{ borderColor: bildModus === m ? '#003399' : '#e5e7eb', color: bildModus === m ? '#003399' : '#6b7280', background: bildModus === m ? '#eff6ff' : 'white' }}>
                    {m === 'keins' ? '✕ Keins' : m === 'generieren' ? '✨ Generieren' : '🖼 Galerie'}
                  </button>
                ))}
              </div>

              {bildModus === 'generieren' && (
                <div>
                  <button onClick={generateBgImage} disabled={imgLoading}
                    className="w-full text-white text-sm font-medium py-2 rounded-lg disabled:opacity-40 mb-2"
                    style={{ background: '#0d9488' }}>
                    {imgLoading ? 'Generiere...' : bgImage ? '↺ Neu generieren' : 'Bild generieren (kostenlos)'}
                  </button>
                  {imgError && <p className="text-red-500 text-xs">{imgError}</p>}
                  {bgImage && <img src={bgImage} className="w-full rounded-lg mt-1 object-cover h-20" alt="Hintergrund" />}
                </div>
              )}

              {bildModus === 'galerie' && showGallery && (
                <div>
                  {gallery.length === 0
                    ? <p className="text-xs text-gray-400">Noch keine Bilder in der Galerie. Zuerst auf der Bilder-Seite erstellen.</p>
                    : <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto">
                        {gallery.map(img => (
                          <img key={img.id} src={img.url} alt={img.topic}
                            onClick={() => { setBgImage(img.url); setShowGallery(false) }}
                            className="w-full h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-all" />
                        ))}
                      </div>
                  }
                  {bgImage && bildModus === 'galerie' && (
                    <img src={bgImage} className="w-full rounded-lg mt-2 object-cover h-20" alt="Gewählt" />
                  )}
                </div>
              )}
            </div>

            {/* Inhalt */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-600 mb-4">Inhalt</h2>

              <label className="text-xs font-medium text-gray-500 mb-1 block">Überschrift</label>
              <input value={headline} onChange={e => setHeadline(e.target.value)}
                placeholder="z.B. 51. OTN Volkslauf 2025"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 mb-3" />

              <label className="text-xs font-medium text-gray-500 mb-1 block">Untertext</label>
              <textarea value={subtext} onChange={e => setSubtext(e.target.value)}
                rows={3} placeholder="z.B. Anmeldung jetzt möglich!"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 resize-none mb-3" />

              <label className="text-xs font-medium text-gray-500 mb-1 block">Hashtags</label>
              <input value={hashtags} onChange={e => setHashtags(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 mb-4" />

              <div className="flex gap-2">
                <button onClick={savePost} disabled={!headline.trim()}
                  className="flex-1 text-white font-semibold py-2.5 rounded-xl disabled:opacity-40"
                  style={{ background: '#003399' }}>Speichern</button>
                <button onClick={exportPNG} disabled={exporting || !headline.trim()}
                  className="flex-1 text-white font-semibold py-2.5 rounded-xl disabled:opacity-40"
                  style={{ background: '#0d9488' }}>
                  {exporting ? 'Exportiere...' : '↓ PNG'}
                </button>
              </div>
            </div>
          </div>

          {/* ── Vorschau ── */}
          <div className="xl:col-span-1">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Vorschau</h2>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div style={{ width: currentFormat.preview, height: previewH, overflow: 'hidden', borderRadius: 12 }} className="mx-auto">
                <div ref={previewRef} style={{
                  width: currentFormat.preview,
                  height: previewH,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: pad,
                  boxSizing: 'border-box',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  overflow: 'hidden',
                  background: bgImage ? undefined : currentTemplate.bg,
                  color: currentTemplate.textColor,
                }}>
                  {/* Hintergrundbild */}
                  {bgImage && <>
                    <img src={bgImage} crossOrigin="anonymous" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.52)' }} />
                  </>}

                  {/* Automatische SVG-Grafiken passend zum Thema */}
                  {!bgImage && <PostGraphics text={`${headline} ${subtext}`} accent={currentTemplate.accent} size={currentFormat.preview} />}

                  {/* Inhalt über dem Bild */}
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <img src="/images/o.t.n_Logo transparent.png" alt="OTN" crossOrigin="anonymous"
                      style={{ height: currentFormat.preview * 0.07, objectFit: 'contain' }} />
                  </div>

                  <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: `${pad * 0.6}px 0` }}>
                    {headline && <h2 style={{ fontSize: currentFormat.preview * 0.07, fontWeight: 800, lineHeight: 1.15, margin: 0, marginBottom: currentFormat.preview * 0.025 }}>{headline}</h2>}
                    {subtext && <p style={{ fontSize: currentFormat.preview * 0.034, lineHeight: 1.5, margin: 0, opacity: 0.9 }}>{subtext}</p>}
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* ── Gespeicherte Posts ── */}
          <div className="xl:col-span-1">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Gespeichert ({posts.length})
            </h2>
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {posts.map(post => {
                const pFmt = FORMATS.find(f => f.value === post.format) ?? FORMATS[0]
                const pTpl = TEMPLATES.find(t => t.id === post.template) ?? TEMPLATES[0]
                const pScale = 100 / pFmt.w
                return (
                  <div key={post.id}
                    onClick={() => setActivePost(activePost?.id === post.id ? null : post)}
                    className="bg-white rounded-xl p-3 cursor-pointer border-2 transition-all hover:shadow-sm flex gap-3 items-center"
                    style={{ borderColor: activePost?.id === post.id ? '#003399' : 'transparent' }}>
                    <div style={{
                      width: 100, height: Math.round(pFmt.h * pScale), minWidth: 100, borderRadius: 6,
                      overflow: 'hidden', position: 'relative', background: pTpl.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {post.bgImage && <img src={post.bgImage} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} alt="" />}
                      {post.bgImage && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />}
                      <span style={{ position: 'relative', color: '#fff', fontSize: 9, fontWeight: 700, textAlign: 'center', lineHeight: 1.3, padding: 4 }}>
                        {post.headline}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{post.headline}</p>
                      <p className="text-xs text-gray-400">{post.category} · {pFmt.label}</p>
                      <p className="text-xs text-gray-400">{post.timestamp}</p>
                    </div>
                    <button onClick={e => {
                      e.stopPropagation()
                      const updated = posts.filter(p => p.id !== post.id)
                      setPosts(updated)
                      localStorage.setItem('otn_posts', JSON.stringify(updated))
                      if (activePost?.id === post.id) setActivePost(null)
                    }} className="text-red-300 hover:text-red-500 text-lg leading-none">×</button>
                  </div>
                )
              })}
              {posts.length === 0 && <p className="text-gray-400 text-sm text-center py-8">Noch keine Posts gespeichert</p>}
            </div>

            {headline && (
              <div className="bg-white rounded-2xl p-4 shadow-sm mt-4">
                <p className="text-xs font-medium text-gray-500 mb-2">Caption zum Kopieren</p>
                <p className="text-sm text-gray-700 mb-2 whitespace-pre-wrap">{headline}{subtext ? '\n\n' + subtext : ''}{'\n\n'}{hashtags}</p>
                <button onClick={() => navigator.clipboard.writeText(`${headline}${subtext ? '\n\n' + subtext : ''}\n\n${hashtags}`)}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg border"
                  style={{ borderColor: '#003399', color: '#003399' }}>
                  Caption kopieren
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </InternLayout>
  )
}
