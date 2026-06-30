'use client'

import { useEffect, useState } from 'react'
import { AdminLayout, Toast, input, btnPrimary } from '../components/AdminLayout'

type ShortVideo = { url: string; title: string }

const DEFAULT: ShortVideo[] = [
  { url: '/Gallery/VIDEO/IMG_2122.MOV', title: 'The Grill' },
  { url: '/Gallery/VIDEO/video_2026-06-30_20-33-55.mp4', title: 'The Experience' },
  { url: '/Gallery/VIDEO/video_2026-06-30_20-35-04.mp4', title: 'The Atmosphere' },
]

const label = 'block text-[0.68rem] font-black uppercase tracking-widest text-[#C7B8A8] mb-1.5'
const card = 'bg-[#130c08] border border-[#D4A373]/12 rounded-2xl p-5 space-y-4'

export default function AdminShortVideos() {
  const [videos, setVideos] = useState<ShortVideo[]>(DEFAULT)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    fetch('/api/admin/short-videos')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setVideos(d) })
      .catch(() => {})
  }, [])

  function update(i: number, field: keyof ShortVideo, val: string) {
    setVideos(prev => prev.map((v, idx) => idx === i ? { ...v, [field]: val } : v))
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/short-videos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videos),
      })
      if (!res.ok) throw new Error('Failed')
      setToast('Short videos saved!')
    } catch {
      alert('Save failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout
      title="Short Videos"
      subtitle="3 portrait (9:16) videos shown in the Gallery page"
      action={
        <button onClick={handleSave} disabled={saving} className={btnPrimary}>
          {saving ? 'Saving…' : <><i className="fa-solid fa-floppy-disk mr-1" /> Save</>}
        </button>
      }
    >
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 space-y-6">

        <div className="grid grid-cols-3 gap-4">
          {videos.map((vid, i) => (
            <div key={i} className="flex flex-col gap-3">
              {/* Preview */}
              <div className="relative overflow-hidden rounded-xl border border-[#fd850b]/20 bg-[#1a0e0a]" style={{ aspectRatio: '9/16' }}>
                {vid.url ? (
                  <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto">
                    <source src={vid.url} />
                  </video>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#C7B8A8]/40">
                    <i className="fa-solid fa-video text-2xl" />
                    <span className="text-[0.6rem] font-black uppercase tracking-widest">Empty</span>
                  </div>
                )}
              </div>
              <span className="text-center text-[0.65rem] font-black uppercase tracking-widest text-[#fd850b]">Clip {i + 1}</span>
            </div>
          ))}
        </div>

        {videos.map((vid, i) => (
          <div key={i} className={card}>
            <p className="text-xs font-black uppercase tracking-widest text-[#fd850b]">Clip {i + 1}</p>
            <div>
              <label className={label}>Video path or URL</label>
              <input
                type="text"
                value={vid.url}
                onChange={e => update(i, 'url', e.target.value)}
                placeholder="/Home/my-video.mp4"
                className={input}
              />
              <p className="mt-1 text-[0.65rem] text-[#C7B8A8]/50">
                Local files go in <code className="text-[#fd850b]">public/Home/</code> — leave empty to show placeholder.
              </p>
            </div>
            <div>
              <label className={label}>Title (shown below clip)</label>
              <input
                type="text"
                value={vid.title}
                onChange={e => update(i, 'title', e.target.value)}
                placeholder="The Grill"
                className={input}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-end pb-6">
          <button onClick={handleSave} disabled={saving} className={btnPrimary}>
            {saving ? 'Saving…' : <><i className="fa-solid fa-floppy-disk mr-1" /> Save All Changes</>}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
