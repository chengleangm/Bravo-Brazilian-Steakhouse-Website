'use client'

import { useEffect, useRef, useState } from 'react'
import { AdminLayout, Toast, btnPrimary, btnSecondary } from '../components/AdminLayout'
import { uploadAdminFile } from '../components/upload'

type ShortVideo = { url: string; title: string }

const DEFAULT: ShortVideo[] = [
  { url: '/Gallery/VIDEO/IMG_2122.MOV', title: 'The Grill' },
  { url: '/Gallery/VIDEO/video_2026-06-30_20-33-55.mp4', title: 'The Experience' },
  { url: '/Gallery/VIDEO/video_2026-06-30_20-35-04.mp4', title: 'The Atmosphere' },
]

const inp = 'w-full rounded-lg border border-[#D4A373]/25 bg-[#0d0905] px-2.5 py-1.5 text-xs text-[#FFF7ED] placeholder-[#C7B8A8]/40 transition-colors focus:border-[#fd850b] focus:outline-none focus:ring-1 focus:ring-[#fd850b]/20'
const lbl = 'mb-0.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#C7B8A8]/70'

export default function AdminShortVideos() {
  const [videos, setVideos] = useState<ShortVideo[]>(DEFAULT)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<number | null>(null)
  const [toast, setToast] = useState('')
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({})

  useEffect(() => {
    fetch('/api/admin/short-videos')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setVideos(d) })
      .catch(() => {})
  }, [])

  function update(i: number, field: keyof ShortVideo, val: string) {
    setVideos(prev => prev.map((v, idx) => idx === i ? { ...v, [field]: val } : v))
  }

  async function uploadClip(i: number, file: File) {
    setUploading(i)
    try {
      const url = await uploadAdminFile(file, 'gallery-videos')
      update(i, 'url', url)
    } catch (error) {
      alert('Upload failed: ' + String(error instanceof Error ? error.message : error))
    } finally {
      setUploading(null)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/short-videos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videos),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error ?? `HTTP ${res.status}`)
      }
      setToast('Saved!')
    } catch (error) {
      alert('Save failed: ' + String(error instanceof Error ? error.message : error))
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout
      title="Gallery Videos"
      action={
        <button onClick={handleSave} disabled={saving} className={btnPrimary}>
          {saving ? 'Saving…' : <><i className="fa-solid fa-floppy-disk mr-1" /> Save</>}
        </button>
      }
    >
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="mx-auto max-w-4xl px-4 py-4 sm:px-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {videos.map((vid, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-[#D4A373]/15 bg-[#130c08]">

              {/* Video preview */}
              <div className="relative bg-[#0d0905]" style={{ aspectRatio: '9/16' }}>
                {vid.url ? (
                  <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto">
                    <source src={vid.url} />
                  </video>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#C7B8A8]/30">
                    <i className="fa-solid fa-video text-3xl" />
                    <span className="text-[0.6rem] font-black uppercase tracking-widest">No video</span>
                  </div>
                )}
                {/* Clip badge */}
                <div className="absolute left-2 top-2 rounded-lg bg-black/60 px-2 py-1 text-[0.6rem] font-black uppercase tracking-widest text-[#fd850b] backdrop-blur-sm">
                  Clip {i + 1}
                </div>
              </div>

              {/* Fields */}
              <div className="p-3 space-y-2">
                <div>
                  <label className={lbl}>Title</label>
                  <input
                    type="text"
                    value={vid.title}
                    onChange={e => update(i, 'title', e.target.value)}
                    placeholder="e.g. The Grill"
                    className={inp}
                  />
                </div>
                <div>
                  <label className={lbl}>Video path or URL</label>
                  <input
                    type="text"
                    value={vid.url}
                    onChange={e => update(i, 'url', e.target.value)}
                    placeholder="/Gallery/VIDEO/clip.mp4"
                    className={inp}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => fileRefs.current[i]?.click()}
                  disabled={uploading === i}
                  className={`${btnSecondary} w-full justify-center`}
                >
                  {uploading === i
                    ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</>
                    : <><i className="fa-solid fa-upload" /> Upload clip</>
                  }
                </button>
                <input
                  ref={el => { fileRefs.current[i] = el }}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  className="hidden"
                  onChange={async e => {
                    const file = e.target.files?.[0]
                    if (file) await uploadClip(i, file)
                    e.target.value = ''
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
