import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InternLayout from './InternLayout'

// OTN Brand-DNA — wird automatisch jedem Prompt hinzugefügt
const BRAND_DNA = [
  'professional sports event photography',
  'Schleswig-Holstein Germany',
  'outdoor athletic atmosphere',
  'cinematic lighting, golden hour or blue hour',
  'dynamic composition, shallow depth of field',
  'blue and teal color grading',
  'high quality DSLR photo, 8k resolution, photorealistic',
  'no text, no watermark',
].join(', ')

const MOOD_MAP: { keys: string[]; style: string }[] = [
  { keys: ['volkslauf','lauf','läufer','rennen','marathon','sprint','nordic'], style: 'runners in motion, finish line tape, crowd cheering, race bib numbers, athletic energy' },
  { keys: ['ergebnis','gewinner','sieger','pokal','platz','medaille','podium'], style: 'winner celebration, trophy, medal, podium, triumphant athlete, confetti' },
  { keys: ['anmeldung','registrier','start','termin','datum'], style: 'starting line, excited athletes preparing, anticipation, morning light, stadium' },
  { keys: ['sponsor','partner','förder'], style: 'professional event branding, sponsor banners, corporate sports event, premium atmosphere' },
  { keys: ['gemeinschaft','team','zusammen','verein','wir'], style: 'group of athletes together, community spirit, smiling runners, team photo' },
  { keys: ['gesundheit','fitness','sport','bewegung','aktiv'], style: 'healthy active lifestyle, fitness, sport activity, energetic movement' },
  { keys: ['natur','landschaft','schleswig','holstein','küste','meer'], style: 'beautiful Schleswig-Holstein landscape, nature running trail, coastal scenery' },
]

function buildPrompt(userPrompt: string): string {
  const lower = userPrompt.toLowerCase()
  const moodStyle = MOOD_MAP.find(m => m.keys.some(k => lower.includes(k)))?.style ?? ''
  return [userPrompt, moodStyle, BRAND_DNA].filter(Boolean).join(', ')
}

const ASPECT_RATIOS = [
  { label: 'Quadrat (1:1)', value: '1:1', desc: 'Instagram Post', w: 1080, h: 1080 },
  { label: 'Querformat (16:9)', value: '16:9', desc: 'Facebook Banner', w: 1280, h: 720 },
  { label: 'Story (9:16)', value: '9:16', desc: 'Instagram Story', w: 608, h: 1080 },
  { label: 'Portrait (4:5)', value: '4:5', desc: 'Instagram Portrait', w: 864, h: 1080 },
]

type GalleryImage = {
  id: string
  url: string
  prompt: string
  topic: string
  timestamp: string
  aspectRatio: string
}

export default function InternBilderPage() {
  const [prompt, setPrompt] = useState('')
  const [aspectRatio, setAspectRatio] = useState('1:1')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPrompt, setShowPrompt] = useState(false)
  const [images, setImages] = useState<GalleryImage[]>(() => {
    try { return JSON.parse(localStorage.getItem('otn_gallery') || '[]') } catch { return [] }
  })
  const [selected, setSelected] = useState<GalleryImage | null>(null)
  const navigate = useNavigate()

  async function generateImage() {
    if (!prompt.trim()) return
    setLoading(true)
    setError('')
    try {
      const ar = ASPECT_RATIOS.find(r => r.value === aspectRatio) ?? ASPECT_RATIOS[0]
      const fullPrompt = buildPrompt(prompt)
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=${ar.w}&height=${ar.h}&seed=${Date.now()}&nologo=true&model=flux`
      await new Promise<void>((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Bild konnte nicht geladen werden'))
        img.src = url
      })
      const img: GalleryImage = {
        id: Date.now().toString(),
        url,
        prompt: fullPrompt,
        topic: prompt,
        timestamp: new Date().toLocaleString('de-DE'),
        aspectRatio,
      }
      const updated = [img, ...images]
      setImages(updated)
      localStorage.setItem('otn_gallery', JSON.stringify(updated.slice(0, 50)))
      setSelected(img)
      setPrompt('')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Fehler bei der Bildgenerierung')
    }
    setLoading(false)
  }

  function deleteImage(id: string) {
    const updated = images.filter(i => i.id !== id)
    setImages(updated)
    localStorage.setItem('otn_gallery', JSON.stringify(updated))
    if (selected?.id === id) setSelected(null)
  }

  function download(img: GalleryImage) {
    const a = document.createElement('a')
    a.href = img.url
    a.download = `otn-bild-${img.id}.png`
    a.click()
  }

  return (
    <InternLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Bilder-Generator & Galerie</h1>
        <p className="text-sm text-gray-400 mb-6">Einfach Motiv beschreiben — OTN-Stil wird automatisch ergänzt · Kostenlos via Pollinations.ai (FLUX)</p>

        {/* Generator */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-gray-500 mb-1 block">Bildbeschreibung</label>
              <input
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && generateImage()}
                placeholder="z.B. Läufer beim Volkslauf, Gruppe beim Zieleinlauf, Startschuss..."
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Format</label>
              <select
                value={aspectRatio}
                onChange={e => setAspectRatio(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none"
              >
                {ASPECT_RATIOS.map(r => (
                  <option key={r.value} value={r.value}>{r.label} — {r.desc}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={generateImage}
                disabled={loading || !prompt.trim()}
                className="w-full text-white font-semibold px-4 py-2.5 rounded-xl transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: '#003399' }}
              >
                {loading ? 'Generiere...' : '🖼 Bild erstellen'}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {prompt && (
            <div className="mt-3">
              <button onClick={() => setShowPrompt(p => !p)} className="text-xs text-gray-400 hover:text-gray-600">
                {showPrompt ? '▲ Prompt ausblenden' : '▼ Vollständiger Prompt anzeigen'}
              </button>
              {showPrompt && (
                <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3 mt-1 leading-relaxed">
                  {buildPrompt(prompt)}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Galerie + Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Galerie ({images.length} Bilder)
            </h2>
            {images.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center text-gray-400 text-sm">
                Noch keine Bilder generiert
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map(img => (
                  <div
                    key={img.id}
                    onClick={() => setSelected(img)}
                    className="relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all hover:shadow-md"
                    style={{ borderColor: selected?.id === img.id ? '#003399' : 'transparent' }}
                  >
                    <img src={img.url} alt={img.topic} className="w-full h-36 object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                      <p className="text-white text-xs truncate">{img.topic}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Detail</h2>
            {selected ? (
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <img src={selected.url} alt={selected.topic} className="w-full rounded-xl mb-4 object-cover" />
                <p className="text-sm font-medium text-gray-700 mb-1">{selected.topic}</p>
                <p className="text-xs text-gray-400 mb-3">{selected.timestamp} · {selected.aspectRatio}</p>
                <button
                  onClick={() => {
                    sessionStorage.setItem('post_bg_image', selected.url)
                    navigate('/intern/social-media')
                  }}
                  className="w-full text-white text-sm font-semibold py-2.5 rounded-xl mb-2"
                  style={{ background: '#003399' }}
                >
                  ✏️ Als Post verwenden
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => download(selected)}
                    className="flex-1 text-white text-sm font-medium py-2 rounded-lg"
                    style={{ background: '#0d9488' }}
                  >
                    ↓ Download
                  </button>
                  <button
                    onClick={() => deleteImage(selected.id)}
                    className="px-3 py-2 rounded-lg border border-red-200 text-red-400 text-sm hover:bg-red-50"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 text-center text-gray-400 text-sm">
                Bild auswählen
              </div>
            )}
          </div>
        </div>
      </div>
    </InternLayout>
  )
}
