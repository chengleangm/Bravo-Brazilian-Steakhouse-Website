'use client'

import { useEffect, useRef, useState } from 'react'
import { AdminLayout, Toast, input, btnPrimary, btnSecondary, btnDanger } from '../components/AdminLayout'

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

type ImageMeta = {
  key: keyof PageImages
  label: string
  page: 'Home' | 'About' | 'Menu'
  pageHref: string
  section: string
  bestSize: string
  icon: string
}

const META: ImageMeta[] = [
  { key: 'homeHero', label: 'Main home photo', page: 'Home', pageHref: '/', section: 'Top of the home page', bestSize: 'Wide landscape', icon: 'fa-house' },
  { key: 'experience', label: 'Experience photo', page: 'Home', pageHref: '/', section: 'Grilling / experience section', bestSize: 'Landscape or square', icon: 'fa-fire-flame-curved' },
  { key: 'testimonialsBg', label: 'Reviews background', page: 'Home', pageHref: '/', section: 'Behind customer reviews', bestSize: 'Wide landscape', icon: 'fa-star' },
  { key: 'ctaImage', label: 'Booking photo', page: 'Home', pageHref: '/', section: 'Reserve your table section', bestSize: 'Wide landscape', icon: 'fa-calendar-check' },
  { key: 'aboutHero', label: 'About page main photo', page: 'About', pageHref: '/about', section: 'Top of the About page', bestSize: 'Wide landscape', icon: 'fa-book-open' },
  { key: 'aboutStory', label: 'Story photo', page: 'About', pageHref: '/about', section: 'Restaurant story section', bestSize: 'Portrait or square', icon: 'fa-scroll' },
  { key: 'aboutChurrascaria', label: 'Churrascaria photo', page: 'About', pageHref: '/about', section: 'Brazilian dining section', bestSize: 'Landscape', icon: 'fa-drumstick-bite' },
  { key: 'aboutTeamGroup', label: 'Team photo', page: 'About', pageHref: '/about', section: 'Team section', bestSize: 'Landscape group photo', icon: 'fa-users' },
  { key: 'aboutCTA', label: 'About booking photo', page: 'About', pageHref: '/about', section: 'Bottom call-to-action', bestSize: 'Wide landscape', icon: 'fa-bell-concierge' },
  { key: 'menuHero', label: 'Menu page main photo', page: 'Menu', pageHref: '/menu', section: 'Top of the Menu page', bestSize: 'Wide landscape', icon: 'fa-utensils' },
]

const PAGES = ['Home', 'About', 'Menu'] as const

export default function AdminPageImages() {
  const [images, setImages] = useState<PageImages | null>(null)
  const [activePage, setActivePage] = useState<(typeof PAGES)[number]>('Home')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [uploading, setUploading] = useState<keyof PageImages | null>(null)
  const [editingUrl, setEditingUrl] = useState<keyof PageImages | null>(null)
  const [dirty, setDirty] = useState(false)
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({})

  useEffect(() => {
    fetch('/api/admin/page-images', { cache: 'no-store' })
      .then(r => r.json())
      .then(setImages)
      .catch(() => {})
  }, [])

  async function saveToKV(data: PageImages): Promise<boolean> {
    const res = await fetch('/api/admin/page-images', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      alert('Save failed: ' + (j.error ?? res.status) + '. Check that KV is connected in Vercel.')
      return false
    }
    return true
  }

  async function handleSave() {
    if (!images) return
    setSaving(true)
    try {
      const ok = await saveToKV(images)
      if (ok) {
        setDirty(false)
        setToast('Photos saved')
      }
    } finally {
      setSaving(false)
    }
  }

  function updateImage(key: keyof PageImages, value: string) {
    setImages(prev => prev ? { ...prev, [key]: value } : prev)
    setDirty(true)
  }

  async function handleUpload(key: keyof PageImages, file: File) {
    if (!images) return
    setUploading(key)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'pages')
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const d = await res.json()
      if (!res.ok) {
        alert('Upload failed: ' + (d.error ?? res.status))
        return
      }
      if (d.url) {
        const updated = { ...images, [key]: d.url }
        setImages(updated)
        const ok = await saveToKV(updated)
        if (ok) {
          setDirty(false)
          setToast('Photo uploaded and saved')
        }
      }
    } catch (e) {
      alert('Upload failed: ' + String(e))
    } finally {
      setUploading(null)
    }
  }

  if (!images) {
    return (
      <AdminLayout title="Page Images" subtitle="Change the main photos used across the website">
        <div className="flex h-64 items-center justify-center text-[#C7B8A8]">
          <i className="fa-solid fa-spinner fa-spin mr-2" /> Loading...
        </div>
      </AdminLayout>
    )
  }

  const activeItems = META.filter(item => item.page === activePage)
  const activeHref = activeItems[0]?.pageHref ?? '/'

  return (
    <AdminLayout
      title="Page Images"
      subtitle="Change customer-facing photos by page"
      action={
        <button type="button" onClick={handleSave} disabled={saving || !dirty} className={btnPrimary}>
          {saving ? 'Saving...' : <><i className="fa-solid fa-floppy-disk" /> {dirty ? 'Save Changes' : 'Saved'}</>}
        </button>
      }
    >
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
        <section className="rounded-lg border border-[#D4A373]/15 bg-[#130c08] p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#fd850b]">Photo manager</p>
              <h2 className="mt-1 text-xl font-black uppercase leading-tight text-[#FFF7ED] sm:text-2xl">
                Pick a page, then replace the photo.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#C7B8A8]">
                Upload from the computer for normal changes. Use image links only when the photo is already hosted somewhere else.
              </p>
            </div>
            <a href={activeHref} target="_blank" rel="noreferrer" className={btnSecondary}>
              <i className="fa-solid fa-eye" /> View {activePage}
            </a>
          </div>
        </section>

        <div className="flex flex-wrap gap-2">
          {PAGES.map(page => {
            const active = activePage === page
            const count = META.filter(item => item.page === page).length
            return (
              <button
                key={page}
                type="button"
                onClick={() => setActivePage(page)}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-black uppercase tracking-wide transition ${
                  active
                    ? 'border-[#fd850b] bg-[#fd850b] text-black'
                    : 'border-[#D4A373]/25 bg-[#130c08] text-[#C7B8A8] hover:border-[#fd850b] hover:text-[#fd850b]'
                }`}
              >
                {page}
                <span className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-black/15 text-black' : 'bg-white/8 text-[#C7B8A8]'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {activeItems.map((item) => {
            const value = images[item.key]
            const isUploading = uploading === item.key
            const showUrl = editingUrl === item.key

            return (
              <article key={item.key} className="overflow-hidden rounded-lg border border-[#D4A373]/15 bg-[#130c08]">
                <div className="relative aspect-[16/9] bg-[#0d0905]">
                  {value ? (
                    <img src={value} alt={item.label} className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center text-[#C7B8A8]/45">
                        <i className="fa-solid fa-image mb-2 block text-3xl" />
                        <span className="text-xs font-bold uppercase tracking-wide">No photo selected</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <p className="mb-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#fd850b]">{item.page}</p>
                        <h3 className="truncate text-lg font-black uppercase leading-tight text-white">{item.label}</h3>
                      </div>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fd850b] text-black">
                        <i className={`fa-solid ${item.icon} text-sm`} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-[#D4A373]/10 bg-[#0d0905] p-3">
                      <p className="text-[0.62rem] font-black uppercase tracking-wide text-[#C7B8A8]/60">Shows on</p>
                      <p className="mt-1 text-sm font-bold text-[#FFF7ED]">{item.section}</p>
                    </div>
                    <div className="rounded-lg border border-[#D4A373]/10 bg-[#0d0905] p-3">
                      <p className="text-[0.62rem] font-black uppercase tracking-wide text-[#C7B8A8]/60">Best photo shape</p>
                      <p className="mt-1 text-sm font-bold text-[#FFF7ED]">{item.bestSize}</p>
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                    <button
                      type="button"
                      onClick={() => fileRefs.current[item.key]?.click()}
                      disabled={isUploading}
                      className={`${btnPrimary} min-h-11`}
                    >
                      {isUploading
                        ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading...</>
                        : <><i className="fa-solid fa-upload" /> Upload New Photo</>
                      }
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingUrl(showUrl ? null : item.key)}
                      className={`${btnSecondary} min-h-11`}
                    >
                      <i className="fa-solid fa-link" /> Image Link
                    </button>
                  </div>

                  <input
                    ref={el => { fileRefs.current[item.key] = el }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) handleUpload(item.key, file)
                      e.target.value = ''
                    }}
                  />

                  {showUrl && (
                    <div className="rounded-lg border border-[#D4A373]/12 bg-[#0d0905] p-3">
                      <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-[#C7B8A8]">Image URL</label>
                      <input
                        type="text"
                        value={value}
                        onChange={e => updateImage(item.key, e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                        className={input}
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#D4A373]/10 pt-3">
                    <span className="truncate text-xs text-[#C7B8A8]/65">
                      {value ? value.replace(/^https?:\/\//, '') : 'No image URL saved'}
                    </span>
                    {value && (
                      <button type="button" onClick={() => updateImage(item.key, '')} className={btnDanger}>
                        <i className="fa-solid fa-trash" /> Clear
                      </button>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="flex items-center justify-end gap-3 pb-6">
          {dirty && <span className="text-xs font-bold text-[#C7B8A8]">Unsaved changes</span>}
          <button type="button" onClick={handleSave} disabled={saving || !dirty} className={btnPrimary}>
            {saving ? 'Saving...' : <><i className="fa-solid fa-floppy-disk" /> {dirty ? 'Save Changes' : 'Saved'}</>}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
