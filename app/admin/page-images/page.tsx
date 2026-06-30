'use client'

import { useEffect, useRef, useState } from 'react'
import { AdminLayout, Toast, input, btnPrimary, btnSecondary, btnDanger } from '../components/AdminLayout'

type PageImages = {
  homeHero: string
  homeHeroSlides: string[]
  heroLogo: string
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

type PageImageKey = Exclude<keyof PageImages, 'homeHeroSlides'>

type ImageMeta = {
  key: PageImageKey
  label: string
  page: 'Home' | 'Our Story' | 'Menu'
  pageHref: string
  section: string
  bestSize: string
  icon: string
}

const META: ImageMeta[] = [
  { key: 'heroLogo', label: 'Hero logo image', page: 'Home', pageHref: '/', section: 'Logo over the hero background', bestSize: 'Transparent PNG or wide logo', icon: 'fa-certificate' },
  { key: 'experience', label: 'Experience photo', page: 'Home', pageHref: '/', section: 'Grilling / experience section', bestSize: 'Landscape or square', icon: 'fa-fire-flame-curved' },
  { key: 'testimonialsBg', label: 'Reviews background', page: 'Home', pageHref: '/', section: 'Behind customer reviews', bestSize: 'Wide landscape', icon: 'fa-star' },
  { key: 'ctaImage', label: 'Booking photo', page: 'Home', pageHref: '/', section: 'Reserve your table section', bestSize: 'Wide landscape', icon: 'fa-calendar-check' },
  { key: 'aboutHero', label: 'Our Story main photo', page: 'Our Story', pageHref: '/about', section: 'Top of the Our Story page', bestSize: 'Wide landscape', icon: 'fa-book-open' },
  { key: 'aboutStory', label: 'Story photo', page: 'Our Story', pageHref: '/about', section: 'Restaurant story section', bestSize: 'Portrait or square', icon: 'fa-scroll' },
  { key: 'aboutChurrascaria', label: 'Churrascaria photo', page: 'Our Story', pageHref: '/about', section: 'Brazilian dining section', bestSize: 'Landscape', icon: 'fa-drumstick-bite' },
  { key: 'aboutTeamGroup', label: 'Team photo', page: 'Our Story', pageHref: '/about', section: 'Team section', bestSize: 'Landscape group photo', icon: 'fa-users' },
  { key: 'aboutCTA', label: 'Our Story booking photo', page: 'Our Story', pageHref: '/about', section: 'Bottom call-to-action', bestSize: 'Wide landscape', icon: 'fa-bell-concierge' },
  { key: 'menuHero', label: 'Menu page main photo', page: 'Menu', pageHref: '/menu', section: 'Top of the Menu page', bestSize: 'Wide landscape', icon: 'fa-utensils' },
]

const PAGES = ['Home', 'Our Story', 'Menu', 'Gallery', 'Catering', 'Promotions'] as const
type PageTab = (typeof PAGES)[number]

type ExtraHero = { heroImage: string; dirty: boolean }

const EXTRA_PAGES = ['Gallery', 'Catering', 'Promotions'] as const
type ExtraPage = (typeof EXTRA_PAGES)[number]

const EXTRA_API: Record<ExtraPage, string> = {
  Gallery: '/api/admin/gallery',
  Catering: '/api/admin/catering-content',
  Promotions: '/api/admin/events',
}

const EXTRA_LIVE: Record<ExtraPage, string> = {
  Gallery: '/gallery',
  Catering: '/catering',
  Promotions: '/promotions',
}

const EXTRA_ICON: Record<ExtraPage, string> = {
  Gallery: 'fa-images',
  Catering: 'fa-truck-fast',
  Promotions: 'fa-tags',
}

export default function AdminPageImages() {
  const [images, setImages] = useState<PageImages | null>(null)
  const [activePage, setActivePage] = useState<PageTab>('Home')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [uploading, setUploading] = useState<string | null>(null)
  const [editingUrl, setEditingUrl] = useState<PageImageKey | null>(null)
  const [newSlideUrl, setNewSlideUrl] = useState('')
  const [dirty, setDirty] = useState(false)
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const slideFileRef = useRef<HTMLInputElement | null>(null)

  const [extraHeroes, setExtraHeroes] = useState<Record<ExtraPage, ExtraHero>>({
    Gallery: { heroImage: '', dirty: false },
    Catering: { heroImage: '', dirty: false },
    Promotions: { heroImage: '', dirty: false },
  })
  const extraFileRefs = useRef<Record<string, HTMLInputElement | null>>({})

  useEffect(() => {
    fetch('/api/admin/page-images', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => {
        const data = d as Partial<PageImages>
        setImages({
          homeHero: data.homeHero ?? '',
          homeHeroSlides: Array.isArray(data.homeHeroSlides)
            ? data.homeHeroSlides.filter(Boolean)
            : data.homeHero
              ? [data.homeHero]
              : [],
          heroLogo: data.heroLogo ?? '',
          experience: data.experience ?? '',
          testimonialsBg: data.testimonialsBg ?? '',
          ctaImage: data.ctaImage ?? '',
          aboutHero: data.aboutHero ?? '',
          aboutStory: data.aboutStory ?? '',
          aboutChurrascaria: data.aboutChurrascaria ?? '',
          aboutTeamGroup: data.aboutTeamGroup ?? '',
          aboutCTA: data.aboutCTA ?? '',
          menuHero: data.menuHero ?? '',
        })
      })
      .catch(() => {})

    for (const page of EXTRA_PAGES) {
      fetch(EXTRA_API[page], { cache: 'no-store' })
        .then(r => r.json())
        .then(d => {
          setExtraHeroes(prev => ({
            ...prev,
            [page]: { heroImage: typeof d.heroImage === 'string' ? d.heroImage : '', dirty: false },
          }))
        })
        .catch(() => {})
    }
  }, [])

  async function saveToKV(data: PageImages): Promise<boolean> {
    const res = await fetch('/api/admin/page-images', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      alert('Save failed: ' + (j.error ?? res.status))
      return false
    }
    return true
  }

  async function saveExtraHero(page: ExtraPage): Promise<boolean> {
    const url = EXTRA_API[page]
    const heroImage = extraHeroes[page].heroImage
    try {
      const current = await fetch(url, { cache: 'no-store' }).then(r => r.json())
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...current, heroImage }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        alert('Save failed: ' + (j.error ?? res.status))
        return false
      }
      return true
    } catch (e) {
      alert('Save failed: ' + String(e))
      return false
    }
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

  async function handleExtraSave(page: ExtraPage) {
    setSaving(true)
    try {
      const ok = await saveExtraHero(page)
      if (ok) {
        setExtraHeroes(prev => ({ ...prev, [page]: { ...prev[page], dirty: false } }))
        setToast(`${page} hero photo saved`)
      }
    } finally {
      setSaving(false)
    }
  }

  function updateImage(key: PageImageKey, value: string) {
    setImages(prev => prev ? { ...prev, [key]: value } : prev)
    setDirty(true)
  }

  function updateExtraHero(page: ExtraPage, value: string) {
    setExtraHeroes(prev => ({ ...prev, [page]: { heroImage: value, dirty: true } }))
  }

  async function handleUpload(key: PageImageKey, file: File) {
    if (!images) return
    setUploading(key)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', key === 'heroLogo' ? 'logos' : 'pages')
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const d = await res.json()
      if (!res.ok) { alert('Upload failed: ' + (d.error ?? res.status)); return }
      if (d.url) {
        const updated = { ...images, [key]: d.url }
        setImages(updated)
        const ok = await saveToKV(updated)
        if (ok) { setDirty(false); setToast('Photo uploaded and saved') }
      }
    } catch (e) {
      alert('Upload failed: ' + String(e))
    } finally {
      setUploading(null)
    }
  }

  async function handleExtraUpload(page: ExtraPage, file: File) {
    setUploading(`extra-${page}`)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'pages')
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const d = await res.json()
      if (!res.ok) { alert('Upload failed: ' + (d.error ?? res.status)); return }
      if (d.url) {
        const url = EXTRA_API[page]
        const current = await fetch(url, { cache: 'no-store' }).then(r => r.json())
        const saveRes = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...current, heroImage: d.url }),
        })
        if (saveRes.ok) {
          setExtraHeroes(prev => ({ ...prev, [page]: { heroImage: d.url, dirty: false } }))
          setToast(`${page} hero photo uploaded and saved`)
        }
      }
    } catch (e) {
      alert('Upload failed: ' + String(e))
    } finally {
      setUploading(null)
    }
  }

  function updateHeroSlide(index: number, value: string) {
    setImages(prev => {
      if (!prev) return prev
      const slides = [...prev.homeHeroSlides]
      slides[index] = value
      return { ...prev, homeHero: slides[0] ?? '', homeHeroSlides: slides }
    })
    setDirty(true)
  }

  async function removeHeroSlide(index: number) {
    if (!images) return
    const slides = images.homeHeroSlides.filter((_, i) => i !== index)
    const updated = { ...images, homeHero: slides[0] ?? '', homeHeroSlides: slides }
    setImages(updated)
    setDirty(false)
    const ok = await saveToKV(updated)
    if (ok) setToast('Slide removed')
  }

  function moveHeroSlide(index: number, direction: -1 | 1) {
    setImages(prev => {
      if (!prev) return prev
      const target = index + direction
      if (target < 0 || target >= prev.homeHeroSlides.length) return prev
      const slides = [...prev.homeHeroSlides]
      const current = slides[index]
      slides[index] = slides[target]
      slides[target] = current
      return { ...prev, homeHero: slides[0] ?? '', homeHeroSlides: slides }
    })
    setDirty(true)
  }

  function addHeroSlideUrl() {
    const value = newSlideUrl.trim()
    if (!value) return
    setImages(prev => {
      if (!prev) return prev
      const slides = [...prev.homeHeroSlides, value]
      return { ...prev, homeHero: slides[0] ?? '', homeHeroSlides: slides }
    })
    setNewSlideUrl('')
    setDirty(true)
  }

  async function handleHeroSlideUpload(file: File) {
    if (!images) return
    setUploading('homeHeroSlides')
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'pages')
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const d = await res.json()
      if (!res.ok) { alert('Upload failed: ' + (d.error ?? res.status)); return }
      if (d.url) {
        const slides = [...images.homeHeroSlides, d.url]
        const updated = { ...images, homeHero: slides[0] ?? '', homeHeroSlides: slides }
        setImages(updated)
        const ok = await saveToKV(updated)
        if (ok) { setDirty(false); setToast('Hero slide uploaded and saved') }
      }
    } catch (e) {
      alert('Upload failed: ' + String(e))
    } finally {
      setUploading(null)
    }
  }

  if (!images) {
    return (
      <AdminLayout title="Photos" subtitle="Manage hero photos for every page">
        <div className="flex h-64 items-center justify-center text-[#C7B8A8]">
          <i className="fa-solid fa-spinner fa-spin mr-2" /> Loading...
        </div>
      </AdminLayout>
    )
  }

  const activeItems = META.filter(item => item.page === activePage)
  const activeHref = EXTRA_PAGES.includes(activePage as ExtraPage)
    ? EXTRA_LIVE[activePage as ExtraPage]
    : (activeItems[0]?.pageHref ?? '/')

  function getTabCount(page: PageTab) {
    if (EXTRA_PAGES.includes(page as ExtraPage)) return 1
    return META.filter(item => item.page === page).length + (page === 'Home' ? images.homeHeroSlides.length : 0)
  }

  const isMainDirty = dirty
  const isExtraDirty = (page: ExtraPage) => extraHeroes[page].dirty

  const saveBtn = EXTRA_PAGES.includes(activePage as ExtraPage) ? (
    <button type="button" onClick={() => handleExtraSave(activePage as ExtraPage)} disabled={saving || !isExtraDirty(activePage as ExtraPage)} className={btnPrimary}>
      <i className="fa-solid fa-floppy-disk" /> {saving ? 'Saving…' : isExtraDirty(activePage as ExtraPage) ? 'Save' : 'Saved'}
    </button>
  ) : (
    <button type="button" onClick={handleSave} disabled={saving || !isMainDirty} className={btnPrimary}>
      <i className="fa-solid fa-floppy-disk" /> {saving ? 'Saving…' : isMainDirty ? 'Save' : 'Saved'}
    </button>
  )

  return (
    <AdminLayout title="Photos" subtitle="Pick a page tab, then upload or paste a URL" action={saveBtn}>
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 space-y-4">

        {/* Page tabs */}
        <div className="flex flex-wrap gap-1.5">
          {PAGES.map(page => {
            const active = activePage === page
            const count = getTabCount(page)
            return (
              <button
                key={page}
                type="button"
                onClick={() => setActivePage(page)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-black uppercase tracking-wide transition ${
                  active
                    ? 'border-[#fd850b] bg-[#fd850b] text-black'
                    : 'border-[#D4A373]/25 bg-[#130c08] text-[#C7B8A8] hover:border-[#fd850b] hover:text-[#fd850b]'
                }`}
              >
                {page}
                <span className={`rounded-full px-1.5 py-0.5 text-[0.6rem] ${active ? 'bg-black/15 text-black' : 'bg-white/8 text-[#C7B8A8]'}`}>
                  {count}
                </span>
              </button>
            )
          })}
          <a href={activeHref} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-[#D4A373]/25 px-3 py-1.5 text-xs font-bold text-[#C7B8A8] transition hover:border-[#fd850b] hover:text-[#fd850b]">
            <i className="fa-solid fa-eye" /> View live
          </a>
        </div>

        {/* Home hero slideshow */}
        {activePage === 'Home' && (
          <div className="overflow-hidden rounded-xl border border-[#D4A373]/15 bg-[#130c08]">
            <div className="flex items-center justify-between border-b border-[#D4A373]/10 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fd850b]/15 text-[#fd850b]">
                  <i className="fa-solid fa-film text-xs" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-[#FFF7ED]">Hero Slideshow</p>
                  <p className="text-[0.65rem] text-[#C7B8A8]">Rotating photos behind the home page hero</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={newSlideUrl}
                    onChange={e => setNewSlideUrl(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addHeroSlideUrl()}
                    placeholder="Paste URL…"
                    className="w-48 rounded-lg border border-[#D4A373]/25 bg-[#0d0905] px-3 py-1.5 text-xs text-[#FFF7ED] placeholder-[#C7B8A8]/40 focus:border-[#fd850b] focus:outline-none"
                  />
                  <button type="button" onClick={addHeroSlideUrl} className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D4A373]/25 text-xs text-[#C7B8A8] hover:border-[#fd850b] hover:text-[#fd850b] transition-colors">
                    <i className="fa-solid fa-plus" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => slideFileRef.current?.click()}
                  disabled={uploading === 'homeHeroSlides'}
                  className={btnPrimary}
                >
                  {uploading === 'homeHeroSlides' ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</> : <><i className="fa-solid fa-upload" /> Upload</>}
                </button>
                <input ref={slideFileRef} type="file" accept="image/*" className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleHeroSlideUpload(f); e.target.value = '' }} />
              </div>
            </div>

            {images.homeHeroSlides.length === 0 ? (
              <div className="flex h-32 items-center justify-center text-center text-[#C7B8A8]/50">
                <div>
                  <i className="fa-solid fa-images mb-2 block text-2xl" />
                  <p className="text-xs font-bold uppercase tracking-wide">No slides — upload a photo or paste a URL above</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.homeHeroSlides.map((slide, index) => (
                  <div key={`${slide}-${index}`} className="overflow-hidden rounded-lg border border-[#D4A373]/12 bg-[#0d0905]">
                    <div className="relative aspect-[16/7] bg-black">
                      {slide
                        ? <img src={slide} alt={`Slide ${index + 1}`} className="absolute inset-0 h-full w-full object-cover" />
                        : <div className="flex h-full items-center justify-center text-[#C7B8A8]/30"><i className="fa-solid fa-image text-xl" /></div>
                      }
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <span className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded bg-[#fd850b] text-xs font-black text-black">
                        {index + 1}
                      </span>
                      {index === 0 && (
                        <span className="absolute right-2 top-2 rounded bg-[#fd850b]/90 px-1.5 py-0.5 text-[0.58rem] font-black uppercase tracking-wider text-black">First</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 p-2">
                      <button onClick={() => moveHeroSlide(index, -1)} disabled={index === 0}
                        className="flex h-7 w-7 items-center justify-center rounded border border-[#D4A373]/20 text-[0.6rem] text-[#C7B8A8] hover:border-[#fd850b] hover:text-[#fd850b] disabled:opacity-25 transition-colors">
                        <i className="fa-solid fa-arrow-up" />
                      </button>
                      <button onClick={() => moveHeroSlide(index, 1)} disabled={index === images.homeHeroSlides.length - 1}
                        className="flex h-7 w-7 items-center justify-center rounded border border-[#D4A373]/20 text-[0.6rem] text-[#C7B8A8] hover:border-[#fd850b] hover:text-[#fd850b] disabled:opacity-25 transition-colors">
                        <i className="fa-solid fa-arrow-down" />
                      </button>
                      <input type="text" value={slide} onChange={e => updateHeroSlide(index, e.target.value)}
                        placeholder="Image URL" className="min-w-0 flex-1 rounded border border-[#D4A373]/20 bg-[#0d0905] px-2 py-1 text-[0.65rem] text-[#FFF7ED] focus:border-[#fd850b] focus:outline-none" />
                      <button onClick={() => removeHeroSlide(index)}
                        className="flex h-7 w-7 items-center justify-center rounded bg-red-900/20 text-[0.6rem] text-red-400 hover:bg-red-700 hover:text-white transition-colors">
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Extra page hero (Gallery / Catering / Promotions) */}
        {EXTRA_PAGES.includes(activePage as ExtraPage) && (() => {
          const page = activePage as ExtraPage
          const { heroImage, dirty: eDirty } = extraHeroes[page]
          const isUploading = uploading === `extra-${page}`
          return (
            <div className="overflow-hidden rounded-xl border border-[#D4A373]/15 bg-[#130c08]">
              <div className="flex items-center justify-between border-b border-[#D4A373]/10 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fd850b]/15 text-[#fd850b]">
                    <i className={`fa-solid ${EXTRA_ICON[page]} text-xs`} />
                  </span>
                  <p className="text-xs font-black uppercase tracking-wider text-[#FFF7ED]">{page} Hero Photo</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => extraFileRefs.current[page]?.click()} disabled={isUploading} className={btnPrimary}>
                    {isUploading ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</> : <><i className="fa-solid fa-upload" /> Upload</>}
                  </button>
                  <button type="button" onClick={() => handleExtraSave(page)} disabled={saving || !eDirty} className={btnSecondary}>
                    <i className="fa-solid fa-floppy-disk" /> {saving ? 'Saving…' : eDirty ? 'Save' : 'Saved'}
                  </button>
                  <input ref={el => { extraFileRefs.current[page] = el }} type="file" accept="image/*" className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleExtraUpload(page, f); e.target.value = '' }} />
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="relative aspect-[16/5] overflow-hidden rounded-lg bg-[#0d0905]">
                  {heroImage
                    ? <img src={heroImage} alt={`${page} hero`} className="absolute inset-0 h-full w-full object-cover" />
                    : <div className="flex h-full items-center justify-center text-[#C7B8A8]/30 text-xs font-bold uppercase tracking-wide">No photo set</div>
                  }
                </div>
                <div className="flex gap-2">
                  <input type="text" value={heroImage} onChange={e => updateExtraHero(page, e.target.value)}
                    placeholder="Paste image URL…"
                    className="flex-1 rounded-lg border border-[#D4A373]/25 bg-[#0d0905] px-3 py-2 text-sm text-[#FFF7ED] placeholder-[#C7B8A8]/40 focus:border-[#fd850b] focus:outline-none" />
                  {heroImage && (
                    <button type="button" onClick={() => updateExtraHero(page, '')} className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-900/20 text-xs text-red-400 hover:bg-red-700 hover:text-white transition-colors">
                      <i className="fa-solid fa-trash" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })()}

        {/* Main page image cards (Home / Our Story / Menu) */}
        {!EXTRA_PAGES.includes(activePage as ExtraPage) && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {activeItems.map((item) => {
              const value = images[item.key]
              const isUploading = uploading === item.key
              const showUrl = editingUrl === item.key
              const isLogo = item.key === 'heroLogo'

              return (
                <article key={item.key} className="overflow-hidden rounded-xl border border-[#D4A373]/15 bg-[#130c08]">
                  {/* Compact image preview */}
                  <div className="relative aspect-[16/7] bg-[#0d0905]">
                    {value ? (
                      <img src={value} alt={item.label}
                        className={`absolute inset-0 h-full w-full ${isLogo ? 'object-contain p-4' : 'object-cover'}`} />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#C7B8A8]/30">
                        <i className="fa-solid fa-image text-2xl" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-2 p-2.5">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-black uppercase leading-tight text-white">{item.label}</p>
                        <p className="text-[0.6rem] text-[#C7B8A8]/70">{item.section}</p>
                      </div>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#fd850b] text-black">
                        <i className={`fa-solid ${item.icon} text-[0.6rem]`} />
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-3 space-y-2">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => fileRefs.current[item.key]?.click()} disabled={isUploading}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#fd850b] py-2 text-xs font-black uppercase tracking-wide text-black transition hover:bg-[#ff9a2e] disabled:opacity-50">
                        {isUploading ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</> : <><i className="fa-solid fa-upload" /> Upload</>}
                      </button>
                      <button type="button" onClick={() => setEditingUrl(showUrl ? null : item.key)}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs transition-colors ${showUrl ? 'border-[#fd850b] text-[#fd850b]' : 'border-[#D4A373]/25 text-[#C7B8A8] hover:border-[#fd850b] hover:text-[#fd850b]'}`}>
                        <i className="fa-solid fa-link" />
                      </button>
                      {value && (
                        <button type="button" onClick={() => updateImage(item.key, '')}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-900/20 text-xs text-red-400 hover:bg-red-700 hover:text-white transition-colors">
                          <i className="fa-solid fa-trash" />
                        </button>
                      )}
                      {isLogo && !value && (
                        <button type="button" onClick={() => updateImage(item.key, '/logo.png')}
                          className="flex h-8 items-center gap-1 rounded-lg border border-[#D4A373]/25 px-2 text-[0.65rem] text-[#C7B8A8] hover:border-[#fd850b] hover:text-[#fd850b] transition-colors">
                          <i className="fa-solid fa-rotate-left" /> Default
                        </button>
                      )}
                    </div>

                    {showUrl && (
                      <input type="text" value={value} onChange={e => updateImage(item.key, e.target.value)}
                        placeholder="https://…"
                        className="w-full rounded-lg border border-[#D4A373]/25 bg-[#0d0905] px-2.5 py-1.5 text-xs text-[#FFF7ED] placeholder-[#C7B8A8]/40 focus:border-[#fd850b] focus:outline-none" />
                    )}

                    <input ref={el => { fileRefs.current[item.key] = el }} type="file" accept="image/*" className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(item.key, f); e.target.value = '' }} />
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {/* Bottom save */}
        <div className="flex justify-end pb-4">
          {saveBtn}
        </div>
      </div>
    </AdminLayout>
  )
}
