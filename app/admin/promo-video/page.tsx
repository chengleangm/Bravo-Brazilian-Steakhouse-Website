'use client'

import { useEffect, useState } from 'react'
import { AdminLayout, Toast, input, btnPrimary } from '../components/AdminLayout'

type VideoData = { url: string; title: string; subtitle: string }

const DEFAULT: VideoData = {
  url: '/Home/video_2026-06-30_20-27-44.mp4',
  title: 'See Bravo in Action',
  subtitle: 'Watch how our authentic Brazilian churrasco experience comes to life',
}

const label = 'block text-[0.68rem] font-black uppercase tracking-widest text-[#C7B8A8] mb-1.5'
const card = 'bg-[#130c08] border border-[#D4A373]/12 rounded-2xl p-5 space-y-4'

export default function AdminPromoVideo() {
  const [data, setData] = useState<VideoData>(DEFAULT)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    fetch('/api/admin/promo-video')
      .then(r => r.json())
      .then(d => setData({ ...DEFAULT, ...d }))
      .catch(() => {})
  }, [])

  function set<K extends keyof VideoData>(key: K, val: string) {
    setData(prev => ({ ...prev, [key]: val }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/promo-video', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setToast('Video saved!')
    } catch {
      alert('Save failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const isLocal = data.url.startsWith('/')
  const isYT = data.url.includes('youtube.com') || data.url.includes('youtu.be')

  return (
    <AdminLayout
      title="Promo Video"
      subtitle="Manage the video shown on the home page after the Dishes section"
      action={
        <button onClick={handleSave} disabled={saving} className={btnPrimary}>
          {saving ? 'Saving…' : <><i className="fa-solid fa-floppy-disk mr-1" /> Save</>}
        </button>
      }
    >
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-6 space-y-6">

        {/* Preview */}
        {data.url && (
          <div className="rounded-2xl overflow-hidden border border-[#D4A373]/12">
            {isYT ? (
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
            )}
          </div>
        )}

        {/* Video URL */}
        <div className={card}>
          <p className="text-xs font-black uppercase tracking-widest text-[#fd850b]">Video Source</p>
          <div>
            <label className={label}>
              Video URL or path
              <span className="ml-2 normal-case text-[#C7B8A8]/60 tracking-normal">
                (YouTube link, or local path like /Home/video.mp4)
              </span>
            </label>
            <input
              type="text"
              value={data.url}
              onChange={e => set('url', e.target.value)}
              placeholder="/Home/video.mp4 or https://youtu.be/..."
              className={input}
            />
            {isLocal && (
              <p className="mt-1.5 text-[0.68rem] text-[#C7B8A8]/60">
                Local file — place it in <code className="text-[#fd850b]">public/Home/</code>
              </p>
            )}
          </div>
          <div>
            <label className={label}>Section Title</label>
            <input
              type="text"
              value={data.title}
              onChange={e => set('title', e.target.value)}
              placeholder="See Bravo in Action"
              className={input}
            />
          </div>
          <div>
            <label className={label}>Subtitle</label>
            <input
              type="text"
              value={data.subtitle}
              onChange={e => set('subtitle', e.target.value)}
              placeholder="Short description below the title"
              className={input}
            />
          </div>
        </div>

        <div className="bg-[#130c08] border border-[#D4A373]/12 rounded-2xl p-4 flex items-start gap-3">
          <i className="fa-solid fa-circle-info text-[#fd850b] text-xs mt-0.5 shrink-0" />
          <p className="text-xs text-[#C7B8A8] leading-5">
            Leave the URL empty to hide the video section. Supported: YouTube links, direct .mp4/.webm files, and local files in <code className="text-[#fd850b]">public/</code>.
          </p>
        </div>

        <div className="flex justify-end pb-6">
          <button onClick={handleSave} disabled={saving} className={btnPrimary}>
            {saving ? 'Saving…' : <><i className="fa-solid fa-floppy-disk mr-1" /> Save All Changes</>}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
