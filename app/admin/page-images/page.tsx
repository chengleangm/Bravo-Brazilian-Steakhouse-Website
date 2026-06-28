'use client'

import { useEffect, useRef, useState } from 'react'
import { AdminLayout, Toast, input, btnPrimary, btnSecondary } from '../components/AdminLayout'

type PageImages = {
  homeHero: string
  experience: string
  testimonialsBg: string
  ctaImage: string
  aboutHero: string
  aboutStory: string
  aboutChurrascaria: string
  aboutTeamGroup: string
  aboutCTA: string
  menuHero: string
}

const META: { key: keyof PageImages; label: string; page: string; hint: string }[] = [
  { key: 'homeHero', label: 'Home Hero', page: '/', hint: 'Full-screen background on the home page' },
  { key: 'experience', label: 'Experience Section', page: '/', hint: 'Image beside the "Grilling, carved hot from the skewer" section' },
  { key: 'testimonialsBg', label: 'Testimonials Background', page: '/', hint: 'Background photo behind the customer reviews section' },
  { key: 'ctaImage', label: 'Reservation CTA', page: '/', hint: 'Background of the "Reserve your table today" section' },
  { key: 'aboutHero', label: 'About Hero', page: '/about', hint: 'Full-screen hero on the About page' },
  { key: 'aboutStory', label: 'About Story', page: '/about', hint: 'Photo in the story/history section' },
  { key: 'aboutChurrascaria', label: 'About Churrascaria', page: '/about', hint: 'Photo in the churrascaria section' },
  { key: 'aboutTeamGroup', label: 'About Team', page: '/about', hint: 'Team group photo on the About page' },
  { key: 'aboutCTA', label: 'About CTA', page: '/about', hint: 'Background of the CTA section on About page' },
  { key: 'menuHero', label: 'Menu Hero', page: '/menu', hint: 'Full-screen hero on the Menu page' },
]

export default function AdminPageImages() {
  const [images, setImages] = useState<PageImages | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [uploading, setUploading] = useState<string | null>(null)
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({})

  useEffect(() => {
    fetch('/api/admin/page-images').then(r => r.json()).then(setImages)
  }, [])

  async function handleSave() {
    if (!images) return
    setSaving(true)
    try {
      await fetch('/api/admin/page-images', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(images) })
      setToast('All images saved!')
    } finally {
      setSaving(false)
    }
  }

  async function handleUpload(key: keyof PageImages, file: File) {
    setUploading(key)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'pages')
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const d = await res.json()
      if (!res.ok) { alert('Upload failed: ' + (d.error ?? res.status)); return }
      if (d.url) {
        const updated = { ...images!, [key]: d.url }
        setImages(updated)
        // Auto-save immediately after successful upload
        await fetch('/api/admin/page-images', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) })
        setToast('Image uploaded & saved!')
      }
    } catch (e) { alert('Upload failed: ' + String(e)) }
    finally { setUploading(null) }
  }

  if (!images) return (
    <AdminLayout title="Page Images">
      <div className="flex items-center justify-center h-64 text-[#C7B8A8]"><i className="fa-solid fa-spinner fa-spin mr-2" /> Loading…</div>
    </AdminLayout>
  )

  const grouped = {
    'Home Page': META.filter(m => m.page === '/'),
    'About Page': META.filter(m => m.page === '/about'),
    'Menu Page': META.filter(m => m.page === '/menu'),
  }

  return (
    <AdminLayout
      title="Page Images"
      subtitle="Hero and background images across the whole website"
      action={
        <button onClick={handleSave} disabled={saving} className={btnPrimary}>
          {saving ? 'Saving…' : <><i className="fa-solid fa-floppy-disk" /> Save All</>}
        </button>
      }
    >
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        <p className="text-sm text-[#C7B8A8]">
          Update any background or hero image. Paste a URL or upload a file. Click <strong className="text-[#FFF7ED]">Save All</strong> to apply changes to the live site.
        </p>

        {Object.entries(grouped).map(([groupLabel, items]) => (
          <div key={groupLabel}>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-xs font-black uppercase tracking-widest text-[#fd850b]">{groupLabel}</p>
              <div className="flex-1 h-px bg-[#D4A373]/15" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {items.map(({ key, label, hint }) => (
                <div key={key} className="bg-[#130c08] border border-[#D4A373]/12 rounded-2xl overflow-hidden">
                  {/* Preview */}
                  <div className="relative h-36 bg-[#0d0905]">
                    {images[key] ? (
                      <img src={images[key]} alt={label} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="text-center text-[#C7B8A8]/30">
                          <i className="fa-solid fa-image text-2xl block mb-1" />
                          <span className="text-xs">No image</span>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                      <span className="text-xs font-black uppercase text-white">{label}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="p-4 space-y-3">
                    <p className="text-[0.68rem] text-[#C7B8A8]/60">{hint}</p>
                    <input
                      type="text"
                      value={images[key]}
                      onChange={e => setImages(prev => prev ? { ...prev, [key]: e.target.value } : prev)}
                      placeholder="Paste image URL…"
                      className={input}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => fileRefs.current[key]?.click()}
                        disabled={uploading === key}
                        className={`${btnSecondary} flex-1 justify-center`}
                      >
                        {uploading === key
                          ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</>
                          : <><i className="fa-solid fa-upload" /> Upload file</>
                        }
                      </button>
                      <input
                        ref={el => { fileRefs.current[key] = el }}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(key, f); e.target.value = '' }}
                      />
                      {images[key] && (
                        <button
                          onClick={() => setImages(prev => prev ? { ...prev, [key]: '' } : prev)}
                          className="px-3 py-2 bg-red-900/20 text-red-400 rounded-lg text-xs hover:bg-red-700 hover:text-white transition-colors"
                          title="Clear image"
                        >
                          <i className="fa-solid fa-trash" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-end pb-6">
          <button onClick={handleSave} disabled={saving} className={btnPrimary}>
            {saving ? 'Saving…' : <><i className="fa-solid fa-floppy-disk" /> Save All Changes</>}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
