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
  page: 'Home' | 'About' | 'Menu'
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
  { key: 'aboutHero', label: 'About page main photo', page: 'About', pageHref: '/about', section: 'Top of the About page', bestSize: 'Wide landscape', icon: 'fa-book-open' },
  { key: 'aboutStory', label: 'Story photo', page: 'About', pageHref: '/about', section: 'Restaurant story section', bestSize: 'Portrait or square', icon: 'fa-scroll' },
  { key: 'aboutChurrascaria', label: 'Churrascaria photo', page: 'About', pageHref: '/about', section: 'Brazilian dining section', bestSize: 'Landscape', icon: 'fa-drumstick-bite' },
  { key: 'aboutTeamGroup', label: 'Team photo', page: 'About', pageHref: '/about', section: 'Team section', bestSize: 'Landscape group photo', icon: 'fa-users' },
  { key: 'aboutCTA', label: 'About booking photo', page: 'About', pageHref: '/about', section: 'Bottom call-to-action', bestSize: 'Wide landscape', icon: 'fa-bell-concierge' },
  { key: 'menuHero', label: 'Menu page main photo', page: 'Menu', pageHref: '/menu', section: 'Top of the Menu page', bestSize: 'Wide landscape', icon: 'fa-utensils' },
]

const PAGES = ['Home', 'About', 'Menu', 'Gallery', 'Catering', 'Promotions'] as const
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
      alert('Save failed: ' + (j.error ?? res.status) + '. Check that KV is connected in Vercel.')
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

  function removeHeroSlide(index: number) {
    setImages(prev => {
      if (!prev) return prev
      const slides = prev.homeHeroSlides.filter((_, i) => i !== index)
      return { ...prev, homeHero: slides[0] ?? '', homeHeroSlides: slides }
    })
    setDirty(true)
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

  return (
    <AdminLayout
      title="Photos"
      subtitle="Manage hero photos for every page"
      action={
        EXTRA_PAGES.includes(activePage as ExtraPage) ? (
          <button
            type="button"
            onClick={() => handleExtraSave(activePage as ExtraPage)}
            disabled={saving || !isExtraDirty(activePage as ExtraPage)}
            className={btnPrimary}
          >
            {saving ? 'Saving...' : <><i className="fa-solid fa-floppy-disk" /> {isExtraDirty(activePage as ExtraPage) ? 'Save Changes' : 'Saved'}</>}
          </button>
        ) : (
          <button type="button" onClick={handleSave} disabled={saving || !isMainDirty} className={btnPrimary}>
            {saving ? 'Saving...' : <><i className="fa-solid fa-floppy-disk" /> {isMainDirty ? 'Save Changes' : 'Saved'}</>}
          </button>
        )
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

        {/* Page tabs */}
        <div className="flex flex-wrap gap-2">
          {PAGES.map(page => {
            const active = activePage === page
            const count = getTabCount(page)
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

        {/* Home hero slideshow */}
        {activePage === 'Home' && (
          <section className="overflow-hidden rounded-lg border border-[#D4A373]/15 bg-[#130c08]">
            <div className="border-b border-[#D4A373]/10 p-4 sm:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#fd850b]">Home hero slideshow</p>
                  <h3 className="mt-1 text-lg font-black uppercase leading-tight text-[#FFF7ED]">Rotating background photos</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#C7B8A8]">
                    These are the large photos behind the first home page section. The first slide is shown first.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => slideFileRef.current?.click()}
                  disabled={uploading === 'homeHeroSlides'}
                  className={btnPrimary}
                >
                  {uploading === 'homeHeroSlides'
                    ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading...</>
                    : <><i className="fa-solid fa-upload" /> Upload Slide</>
                  }
                </button>
                <input
                  ref={slideFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) handleHeroSlideUpload(file)
                    e.target.value = ''
                  }}
                />
              </div>
            </div>

            <div className="space-y-4 p-4 sm:p-5">
              <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                <input
                  type="text"
                  value={newSlideUrl}
                  onChange={e => setNewSlideUrl(e.target.value)}
                  placeholder="Paste a hero slide image link"
                  className={input}
                />
                <button type="button" onClick={addHeroSlideUrl} className={btnSecondary}>
                  <i className="fa-solid fa-plus" /> Add Link
                </button>
              </div>

              {images.homeHeroSlides.length === 0 ? (
                <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed border-[#D4A373]/20 bg-[#0d0905] text-center text-[#C7B8A8]/55">
                  <div>
                    <i className="fa-solid fa-images mb-3 block text-4xl" />
                    <p className="text-sm font-black uppercase tracking-wide text-[#FFF7ED]">No hero slides yet</p>
                    <p className="mt-1 text-sm">Upload a photo or paste an image link to start the slideshow.</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 lg:grid-cols-2">
                  {images.homeHeroSlides.map((slide, index) => (
                    <article key={`${slide}-${index}`} className="overflow-hidden rounded-lg border border-[#D4A373]/12 bg-[#0d0905]">
                      <div className="relative aspect-[16/9] bg-black">
                        {slide ? (
                          <img src={slide} alt={`Home hero slide ${index + 1}`} className="absolute inset-0 h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[#C7B8A8]/45">
                            <i className="fa-solid fa-image text-3xl" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-4">
                          <div>
                            <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#fd850b]">
                              {index === 0 ? 'First slide' : `Slide ${index + 1}`}
                            </p>
                            <p className="mt-1 text-sm font-bold text-white">{index === 0 ? 'Shows first on page load' : 'Rotates after the first slide'}</p>
                          </div>
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fd850b] text-sm font-black text-black">
                            {index + 1}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 p-4">
                        <input
                          type="text"
                          value={slide}
                          onChange={e => updateHeroSlide(index, e.target.value)}
                          placeholder="Image URL"
                          className={input}
                        />
                        <div className="flex flex-wrap gap-2">
                          <button type="button" onClick={() => moveHeroSlide(index, -1)} disabled={index === 0} className={btnSecondary}>
                            <i className="fa-solid fa-arrow-up" /> Earlier
                          </button>
                          <button type="button" onClick={() => moveHeroSlide(index, 1)} disabled={index === images.homeHeroSlides.length - 1} className={btnSecondary}>
                            <i className="fa-solid fa-arrow-down" /> Later
                          </button>
                          <button type="button" onClick={() => removeHeroSlide(index)} className={btnDanger}>
                            <i className="fa-solid fa-trash" /> Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Extra page hero sections (Gallery / Catering / Promotions) */}
        {EXTRA_PAGES.includes(activePage as ExtraPage) && (() => {
          const page = activePage as ExtraPage
          const { heroImage, dirty: eDirty } = extraHeroes[page]
          const isUploading = uploading === `extra-${page}`
          return (
            <section className="overflow-hidden rounded-lg border border-[#D4A373]/15 bg-[#130c08]">
              <div className="border-b border-[#D4A373]/10 p-4 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#fd850b]">{page} page</p>
                    <h3 className="mt-1 text-lg font-black uppercase leading-tight text-[#FFF7ED]">Hero background photo</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#C7B8A8]">
                      This is the large photo behind the top section of the {page} page.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => extraFileRefs.current[page]?.click()}
                      disabled={isUploading}
                      className={btnPrimary}
                    >
                      {isUploading
                        ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading...</>
                        : <><i className="fa-solid fa-upload" /> Upload Photo</>
                      }
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExtraSave(page)}
                      disabled={saving || !eDirty}
                      className={btnSecondary}
                    >
                      {saving ? 'Saving...' : <><i className="fa-solid fa-floppy-disk" /> {eDirty ? 'Save' : 'Saved'}</>}
                    </button>
                  </div>
                  <input
                    ref={el => { extraFileRefs.current[page] = el }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) handleExtraUpload(page, file)
                      e.target.value = ''
                    }}
                  />
                </div>
              </div>

              <div className="space-y-4 p-4 sm:p-5">
                {/* Preview */}
                <div className="relative aspect-[16/5] overflow-hidden rounded-lg bg-[#0d0905]">
                  {heroImage ? (
                    <img src={heroImage} alt={`${page} hero`} className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-center text-[#C7B8A8]/45">
                      <div>
                        <i className={`fa-solid ${EXTRA_ICON[page]} mb-2 block text-4xl`} />
                        <span className="text-xs font-bold uppercase tracking-wide">No hero photo</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <p className="text-[0.62rem] font-black uppercase tracking-[0.18em] text-[#fd850b]">{page} hero</p>
                    <p className="text-sm font-bold text-white">Shown at the top of the {page} page</p>
                  </div>
                </div>

                {/* URL input */}
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-[#C7B8A8]">Image URL</label>
                  <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                    <input
                      type="text"
                      value={heroImage}
                      onChange={e => updateExtraHero(page, e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className={input}
                    />
                    {heroImage && (
                      <button type="button" onClick={() => updateExtraHero(page, '')} className={btnDanger}>
                        <i className="fa-solid fa-trash" /> Clear
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-[#D4A373]/10 pt-3">
                  <span className="truncate text-xs text-[#C7B8A8]/65">
                    {heroImage ? heroImage.replace(/^https?:\/\//, '') : 'No image URL saved'}
                  </span>
                  {eDirty && (
                    <button
                      type="button"
                      onClick={() => handleExtraSave(page)}
                      disabled={saving}
                      className={btnPrimary}
                    >
                      <i className="fa-solid fa-floppy-disk" /> Save Changes
                    </button>
                  )}
                </div>
              </div>
            </section>
          )
        })()}

        {/* Main page image cards (Home / About / Menu) */}
        {!EXTRA_PAGES.includes(activePage as ExtraPage) && (
          <div className="grid gap-4 lg:grid-cols-2">
            {activeItems.map((item) => {
              const value = images[item.key]
              const isUploading = uploading === item.key
              const showUrl = editingUrl === item.key
              const isLogo = item.key === 'heroLogo'

              return (
                <article key={item.key} className="overflow-hidden rounded-lg border border-[#D4A373]/15 bg-[#130c08]">
                  <div className="relative aspect-[16/9] bg-[#0d0905]">
                    {value ? (
                      <img
                        src={value}
                        alt={item.label}
                        className={`absolute inset-0 h-full w-full ${isLogo ? 'object-contain p-8' : 'object-cover'}`}
                      />
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
                      {isLogo && !value && (
                        <button type="button" onClick={() => updateImage(item.key, '/logo.png')} className={btnSecondary}>
                          <i className="fa-solid fa-rotate-left" /> Use Old Logo
                        </button>
                      )}
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
        )}

        <div className="flex items-center justify-end gap-3 pb-6">
          {EXTRA_PAGES.includes(activePage as ExtraPage) ? (
            <>
              {extraHeroes[activePage as ExtraPage].dirty && <span className="text-xs font-bold text-[#C7B8A8]">Unsaved changes</span>}
              <button type="button" onClick={() => handleExtraSave(activePage as ExtraPage)} disabled={saving || !extraHeroes[activePage as ExtraPage].dirty} className={btnPrimary}>
                {saving ? 'Saving...' : <><i className="fa-solid fa-floppy-disk" /> {extraHeroes[activePage as ExtraPage].dirty ? 'Save Changes' : 'Saved'}</>}
              </button>
            </>
          ) : (
            <>
              {dirty && <span className="text-xs font-bold text-[#C7B8A8]">Unsaved changes</span>}
              <button type="button" onClick={handleSave} disabled={saving || !dirty} className={btnPrimary}>
                {saving ? 'Saving...' : <><i className="fa-solid fa-floppy-disk" /> {dirty ? 'Save Changes' : 'Saved'}</>}
              </button>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
