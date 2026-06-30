'use client'

import { useEffect, useRef, useState } from 'react'
import { AdminLayout, Toast, input, btnPrimary, btnSecondary } from '../components/AdminLayout'
import { uploadAdminFile } from '../components/upload'

type VideoData = { url: string; title: string; subtitle: string }

const DEFAULT: VideoData = {
  url: '/Home/video_2026-06-30_20-27-44.mp4',
  title: 'See Bravo in Action',
  subtitle: 'Watch how our authentic Brazilian churrasco experience comes to life',
}

const lbl = 'mb-0.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#C7B8A8]/70'
const card = 'overflow-hidden rounded-xl border border-[#D4A373]/15 bg-[#130c08]'
const cardHead = 'flex items-center justify-between border-b border-[#D4A373]/10 px-3 py-2'
const inp = 'w-full rounded-lg border border-[#D4A373]/25 bg-[#0d0905] px-2.5 py-1.5 text-xs text-[#FFF7ED] placeholder-[#C7B8A8]/40 transition-colors focus:border-[#fd850b] focus:outline-none focus:ring-1 focus:ring-[#fd850b]/20'

export default function AdminPromoVideo() {
  const [data, setData] = useState<VideoData>(DEFAULT)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [toast, setToast] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/admin/promo-video')
      .then(r => r.json())
      .then(d => setData({ ...DEFAULT, ...d }))
      .catch(() => {})
  }, [])

  function set<K extends keyof VideoData>(key: K, val: string) {
    setData(prev => ({ ...prev, [key]: val }))
  }

  async function uploadVideo(file: File) {
    setUploading(true)
    try {
      const url = await uploadAdminFile(file, 'videos')
      set('url', url)
    } catch (error) {
      alert('Upload failed: ' + String(error instanceof Error ? error.message : error))
    } finally {
      setUploading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/promo-video', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error ?? `HTTP ${res.status}`)
      }
      setToast('Video saved!')
    } catch (error) {
      alert('Save failed: ' + String(error instanceof Error ? error.message : error))
    } finally {
      setSaving(false)
    }
  }

  const isYT = data.url.includes('youtube.com') || data.url.includes('youtu.be')
  const isLocal = data.url.startsWith('/')

  return (
    <AdminLayout
      title="Promo Video"
      action={
        <button onClick={handleSave} disabled={saving} className={btnPrimary}>
          {saving ? 'Saving…' : <><i className="fa-solid fa-floppy-disk mr-1" /> Save</>}
        </button>
      }
    >
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start">

          {/* Left: Video preview */}
          <div className="overflow-hidden rounded-xl border border-[#D4A373]/12 bg-[#0d0905]">
            {data.url ? (
              isYT ? (
                <div className="aspect-square w-full bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${new URL(data.url.includes('youtu.be') ? `https://${data.url.replace(/^https?:\/\//, '')}` : data.url).searchParams.get('v') ?? data.url.split('/').pop()?.split('?')[0]}?rel=0`}
                    className="h-full w-full"
                    allowFullScreen
                    title="Preview"
                  />
                </div>
              ) : (
                <video className="aspect-square w-full object-cover" autoPlay muted loop playsInline preload="auto">
                  <source src={data.url} />
                </video>
              )
            ) : (
              <div className="aspect-square flex flex-col items-center justify-center text-[#C7B8A8]/30">
                <i className="fa-solid fa-video text-4xl mb-3" />
                <p className="text-xs">No video set</p>
              </div>
            )}
          </div>

          {/* Right: Fields */}
          <div className="space-y-3">

            {/* Video source */}
            <div className={card}>
              <div className={cardHead}>
                <span className="text-[0.65rem] font-black uppercase tracking-wider text-[#fd850b]">
                  <i className="fa-solid fa-link mr-1.5 opacity-60" />Video Source
                </span>
              </div>
              <div className="p-3 space-y-2">
                <div>
                  <label className={lbl}>URL or local path</label>
                  <input
                    type="text"
                    value={data.url}
                    onChange={e => set('url', e.target.value)}
                    placeholder="/Home/video.mp4 or https://youtu.be/..."
                    className={inp}
                  />
                  {isLocal && (
                    <p className="mt-1 text-[0.6rem] text-[#C7B8A8]/50">
                      Local file — place in <code className="text-[#fd850b]">public/Home/</code>
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className={btnSecondary}
                >
                  {uploading
                    ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</>
                    : <><i className="fa-solid fa-upload" /> Upload video</>
                  }
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  className="hidden"
                  onChange={async e => {
                    const file = e.target.files?.[0]
                    if (file) await uploadVideo(file)
                    e.target.value = ''
                  }}
                />
              </div>
            </div>

            {/* Text */}
            <div className={card}>
              <div className={cardHead}>
                <span className="text-[0.65rem] font-black uppercase tracking-wider text-[#fd850b]">
                  <i className="fa-solid fa-heading mr-1.5 opacity-60" />Section Text
                </span>
              </div>
              <div className="p-3 space-y-2">
                <div>
                  <label className={lbl}>Title</label>
                  <input type="text" value={data.title} onChange={e => set('title', e.target.value)} placeholder="See Bravo in Action" className={inp} />
                </div>
                <div>
                  <label className={lbl}>Subtitle</label>
                  <input type="text" value={data.subtitle} onChange={e => set('subtitle', e.target.value)} placeholder="Short description below the title" className={inp} />
                </div>
              </div>
            </div>

            {/* Tip */}
            <div className="flex items-start gap-2 rounded-lg border border-[#D4A373]/10 bg-[#130c08] px-3 py-2.5">
              <i className="fa-solid fa-circle-info text-[#fd850b] text-[0.65rem] mt-0.5 shrink-0" />
              <p className="text-[0.65rem] text-[#C7B8A8]/70 leading-4">
                Leave URL empty to hide this section. Supports YouTube links and local .mp4/.webm files.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
