'use client'

import { useEffect, useState } from 'react'
import { AdminLayout, Field, SectionCard, Toast, btnDanger, btnPrimary, btnSecondary, input } from '../components/AdminLayout'
import defaultData from '../../../data/home-sections.json'

type LinkContent = {
  buttonLabel: string
  buttonHref: string
}

type AboutContent = LinkContent & {
  kicker: string
  title: string
  body: string
}

type DishesContent = {
  kicker: string
  title: string
}

type ExperienceContent = LinkContent & {
  title: string
  body: string
}

type SpecialItem = {
  tag: string
  title: string
  copy: string
  icon: string
  ctaLabel: string
  ctaHref: string
}

type SpecialsContent = LinkContent & {
  kicker: string
  title: string
  body: string
  items: SpecialItem[]
}

type TestimonialsContent = {
  title: string
}

type ReservationDetail = {
  icon: string
  label: string
  value: string
}

type ReservationContent = {
  kicker: string
  title: string
  body: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
  imageKicker: string
  imageTitle: string
  bestForLabel: string
  bestForValue: string
  locationLabel: string
  locationValue: string
  details: ReservationDetail[]
}

type HomeSectionsContent = {
  about: AboutContent
  dishes: DishesContent
  experience: ExperienceContent
  specials: SpecialsContent
  testimonials: TestimonialsContent
  reservation: ReservationContent
}

const DEFAULT_DATA = defaultData as HomeSectionsContent

const sm = `w-full rounded-lg border border-[#D4A373]/25 bg-[#0d0905] px-2.5 py-2 text-xs text-[#FFF7ED] placeholder-[#C7B8A8]/40 transition-colors focus:border-[#fd850b] focus:outline-none focus:ring-1 focus:ring-[#fd850b]/20`
const smta = `${sm} min-h-16 resize-y`
const lbl = 'mb-1 block text-[0.6rem] font-black uppercase tracking-wider text-[#C7B8A8]/70'
const card = 'overflow-hidden rounded-xl border border-[#D4A373]/15 bg-[#130c08]'
const cardHead = 'flex items-center justify-between border-b border-[#D4A373]/10 px-4 py-3'

function mergeHomeSections(data: Partial<HomeSectionsContent>): HomeSectionsContent {
  return {
    about: { ...DEFAULT_DATA.about, ...data.about },
    dishes: { ...DEFAULT_DATA.dishes, ...data.dishes },
    experience: { ...DEFAULT_DATA.experience, ...data.experience },
    specials: {
      ...DEFAULT_DATA.specials,
      ...data.specials,
      items: data.specials?.items?.length ? data.specials.items : DEFAULT_DATA.specials.items,
    },
    testimonials: { ...DEFAULT_DATA.testimonials, ...data.testimonials },
    reservation: {
      ...DEFAULT_DATA.reservation,
      ...data.reservation,
      details: data.reservation?.details?.length ? data.reservation.details : DEFAULT_DATA.reservation.details,
    },
  }
}

export default function AdminHomeSections() {
  const [data, setData] = useState<HomeSectionsContent>(DEFAULT_DATA)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    fetch('/api/admin/home-sections', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => setData(mergeHomeSections(d)))
      .catch(() => {})
  }, [])

  function setSection<K extends keyof HomeSectionsContent>(section: K, patch: Partial<HomeSectionsContent[K]>) {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...patch },
    }))
  }

  function updateSpecial(index: number, patch: Partial<SpecialItem>) {
    setData(prev => ({
      ...prev,
      specials: {
        ...prev.specials,
        items: prev.specials.items.map((item, i) => i === index ? { ...item, ...patch } : item),
      },
    }))
  }

  function addSpecial() {
    setData(prev => ({
      ...prev,
      specials: {
        ...prev.specials,
        items: [
          ...prev.specials.items,
          { tag: 'New offer', title: 'Offer title', copy: 'Short offer description.', icon: 'fa-tags', ctaLabel: 'Learn More', ctaHref: '/promotions' },
        ],
      },
    }))
  }

  function removeSpecial(index: number) {
    setData(prev => ({
      ...prev,
      specials: {
        ...prev.specials,
        items: prev.specials.items.filter((_, i) => i !== index),
      },
    }))
  }

  function updateReservationDetail(index: number, patch: Partial<ReservationDetail>) {
    setData(prev => ({
      ...prev,
      reservation: {
        ...prev.reservation,
        details: prev.reservation.details.map((item, i) => i === index ? { ...item, ...patch } : item),
      },
    }))
  }

  function addReservationDetail() {
    setData(prev => ({
      ...prev,
      reservation: {
        ...prev.reservation,
        details: [
          ...prev.reservation.details,
          { icon: 'fa-circle-check', label: 'New detail', value: 'Describe the booking benefit' },
        ],
      },
    }))
  }

  function removeReservationDetail(index: number) {
    setData(prev => ({
      ...prev,
      reservation: {
        ...prev.reservation,
        details: prev.reservation.details.filter((_, i) => i !== index),
      },
    }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/home-sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error ?? `HTTP ${res.status}`)
      }
      setToast('Home sections saved')
    } catch (error) {
      alert('Save failed: ' + String(error instanceof Error ? error.message : error))
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout
      title="Home Sections"
      subtitle="Edit text, offers, reviews and reservation on the home page"
      action={
        <button type="button" onClick={handleSave} disabled={saving} className={btnPrimary}>
          {saving ? 'Saving…' : <><i className="fa-solid fa-floppy-disk" /> Save</>}
        </button>
      }
    >
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="mx-auto max-w-5xl grid grid-cols-1 gap-3 px-4 py-4 sm:grid-cols-2 sm:px-5">

        {/* Welcome */}
        <div className={card}>
          <div className={cardHead}>
            <p className="text-xs font-black uppercase tracking-widest text-[#FFF7ED]">Welcome section</p>
          </div>
          <div className="grid gap-3 p-4 sm:grid-cols-2">
            <div>
              <label className={lbl}>Label</label>
              <input className={sm} value={data.about.kicker} onChange={e => setSection('about', { kicker: e.target.value })} />
            </div>
            <div className="sm:col-span-1">
              <label className={lbl}>Button label</label>
              <input className={sm} value={data.about.buttonLabel} onChange={e => setSection('about', { buttonLabel: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className={lbl}>Title</label>
              <input className={sm} value={data.about.title} onChange={e => setSection('about', { title: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className={lbl}>Body text</label>
              <textarea className={smta} value={data.about.body} onChange={e => setSection('about', { body: e.target.value })} />
            </div>
            <div>
              <label className={lbl}>Button link</label>
              <input className={sm} value={data.about.buttonHref} onChange={e => setSection('about', { buttonHref: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Dishes heading */}
        <div className={card}>
          <div className={cardHead}>
            <p className="text-xs font-black uppercase tracking-widest text-[#FFF7ED]">Featured dishes heading</p>
          </div>
          <div className="grid gap-3 p-4 sm:grid-cols-2">
            <div>
              <label className={lbl}>Label</label>
              <input className={sm} value={data.dishes.kicker} onChange={e => setSection('dishes', { kicker: e.target.value })} />
            </div>
            <div>
              <label className={lbl}>Title</label>
              <input className={sm} value={data.dishes.title} onChange={e => setSection('dishes', { title: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Video / experience */}
        <div className={card}>
          <div className={cardHead}>
            <p className="text-xs font-black uppercase tracking-widest text-[#FFF7ED]">Video experience text</p>
          </div>
          <div className="grid gap-3 p-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={lbl}>Title</label>
              <input className={sm} value={data.experience.title} onChange={e => setSection('experience', { title: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className={lbl}>Body text</label>
              <textarea className={smta} value={data.experience.body} onChange={e => setSection('experience', { body: e.target.value })} />
            </div>
            <div>
              <label className={lbl}>Button label</label>
              <input className={sm} value={data.experience.buttonLabel} onChange={e => setSection('experience', { buttonLabel: e.target.value })} />
            </div>
            <div>
              <label className={lbl}>Button link</label>
              <input className={sm} value={data.experience.buttonHref} onChange={e => setSection('experience', { buttonHref: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Specials */}
        <div className={`${card} sm:col-span-2`}>
          <div className={cardHead}>
            <p className="text-xs font-black uppercase tracking-widest text-[#FFF7ED]">
              Specials &amp; offers
              <span className="ml-2 rounded-full bg-[#fd850b]/15 px-2 py-0.5 text-[0.6rem] font-black text-[#fd850b]">{data.specials.items.length}</span>
            </p>
            <button type="button" onClick={addSpecial} className={btnSecondary}>
              <i className="fa-solid fa-plus" /> Add offer
            </button>
          </div>
          <div className="p-4 space-y-3">
            {/* Section header fields */}
            <div className="grid gap-2 sm:grid-cols-4">
              <div>
                <label className={lbl}>Label</label>
                <input className={sm} value={data.specials.kicker} onChange={e => setSection('specials', { kicker: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className={lbl}>Section title</label>
                <input className={sm} value={data.specials.title} onChange={e => setSection('specials', { title: e.target.value })} />
              </div>
              <div>
                <label className={lbl}>Button label</label>
                <input className={sm} value={data.specials.buttonLabel} onChange={e => setSection('specials', { buttonLabel: e.target.value })} />
              </div>
              <div className="sm:col-span-3">
                <label className={lbl}>Intro text</label>
                <input className={sm} value={data.specials.body} onChange={e => setSection('specials', { body: e.target.value })} />
              </div>
              <div>
                <label className={lbl}>Button link</label>
                <input className={sm} value={data.specials.buttonHref} onChange={e => setSection('specials', { buttonHref: e.target.value })} />
              </div>
            </div>

            {/* Offer cards */}
            {data.specials.items.length > 0 && (
              <div className="border-t border-[#D4A373]/10 pt-3 space-y-2">
                {data.specials.items.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="rounded-lg border border-[#D4A373]/10 bg-[#0d0905] p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#fd850b]/10">
                        <i className={`fa-solid ${item.icon || 'fa-tags'} text-[#fd850b] text-xs`} />
                      </div>
                      <span className="text-xs font-black text-[#FFF7ED] uppercase tracking-wide flex-1">{item.title || `Offer ${index + 1}`}</span>
                      <button type="button" onClick={() => removeSpecial(index)}
                        className="flex h-6 w-6 items-center justify-center rounded bg-red-900/20 text-[0.6rem] text-red-400 hover:bg-red-700 hover:text-white transition-colors">
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-3">
                      <div>
                        <label className={lbl}>Tag</label>
                        <input className={sm} value={item.tag} onChange={e => updateSpecial(index, { tag: e.target.value })} />
                      </div>
                      <div>
                        <label className={lbl}>Title</label>
                        <input className={sm} value={item.title} onChange={e => updateSpecial(index, { title: e.target.value })} />
                      </div>
                      <div>
                        <label className={lbl}>Icon (fa-*)</label>
                        <input className={sm} value={item.icon} placeholder="fa-sun" onChange={e => updateSpecial(index, { icon: e.target.value })} />
                      </div>
                      <div>
                        <label className={lbl}>CTA label</label>
                        <input className={sm} value={item.ctaLabel} onChange={e => updateSpecial(index, { ctaLabel: e.target.value })} />
                      </div>
                      <div>
                        <label className={lbl}>CTA link</label>
                        <input className={sm} value={item.ctaHref} onChange={e => updateSpecial(index, { ctaHref: e.target.value })} />
                      </div>
                      <div>
                        <label className={lbl}>Description</label>
                        <input className={sm} value={item.copy} onChange={e => updateSpecial(index, { copy: e.target.value })} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className={card}>
          <div className={cardHead}>
            <p className="text-xs font-black uppercase tracking-widest text-[#FFF7ED]">Reviews title</p>
          </div>
          <div className="p-4">
            <label className={lbl}>Title above customer reviews</label>
            <input className={sm} value={data.testimonials.title} onChange={e => setSection('testimonials', { title: e.target.value })} />
          </div>
        </div>

        {/* Reservation */}
        <div className={`${card} sm:col-span-2`}>
          <div className={cardHead}>
            <p className="text-xs font-black uppercase tracking-widest text-[#FFF7ED]">
              Reservation block
              <span className="ml-2 rounded-full bg-[#fd850b]/15 px-2 py-0.5 text-[0.6rem] font-black text-[#fd850b]">{data.reservation.details.length}</span>
            </p>
            <button type="button" onClick={addReservationDetail} className={btnSecondary}>
              <i className="fa-solid fa-plus" /> Add row
            </button>
          </div>
          <div className="p-4 space-y-3">
            <div className="grid gap-2 sm:grid-cols-4">
              <div>
                <label className={lbl}>Label</label>
                <input className={sm} value={data.reservation.kicker} onChange={e => setSection('reservation', { kicker: e.target.value })} />
              </div>
              <div className="sm:col-span-3">
                <label className={lbl}>Title</label>
                <input className={sm} value={data.reservation.title} onChange={e => setSection('reservation', { title: e.target.value })} />
              </div>
              <div className="sm:col-span-4">
                <label className={lbl}>Body text</label>
                <textarea className={smta} value={data.reservation.body} onChange={e => setSection('reservation', { body: e.target.value })} />
              </div>
              <div>
                <label className={lbl}>Primary button</label>
                <input className={sm} value={data.reservation.primaryLabel} onChange={e => setSection('reservation', { primaryLabel: e.target.value })} />
              </div>
              <div>
                <label className={lbl}>Primary link</label>
                <input className={sm} value={data.reservation.primaryHref} onChange={e => setSection('reservation', { primaryHref: e.target.value })} />
              </div>
              <div>
                <label className={lbl}>Secondary button</label>
                <input className={sm} value={data.reservation.secondaryLabel} onChange={e => setSection('reservation', { secondaryLabel: e.target.value })} />
              </div>
              <div>
                <label className={lbl}>Secondary link</label>
                <input className={sm} value={data.reservation.secondaryHref} onChange={e => setSection('reservation', { secondaryHref: e.target.value })} />
              </div>
            </div>

            <div className="border-t border-[#D4A373]/10 pt-3">
              <p className="text-[0.6rem] font-black uppercase tracking-wider text-[#C7B8A8]/50 mb-2">Image overlay &amp; info cards</p>
              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <label className={lbl}>Overlay label</label>
                  <input className={sm} value={data.reservation.imageKicker} onChange={e => setSection('reservation', { imageKicker: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <label className={lbl}>Overlay title</label>
                  <input className={sm} value={data.reservation.imageTitle} onChange={e => setSection('reservation', { imageTitle: e.target.value })} />
                </div>
                <div>
                  <label className={lbl}>Card 1 label</label>
                  <input className={sm} value={data.reservation.bestForLabel} onChange={e => setSection('reservation', { bestForLabel: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <label className={lbl}>Card 1 value</label>
                  <input className={sm} value={data.reservation.bestForValue} onChange={e => setSection('reservation', { bestForValue: e.target.value })} />
                </div>
                <div>
                  <label className={lbl}>Card 2 label</label>
                  <input className={sm} value={data.reservation.locationLabel} onChange={e => setSection('reservation', { locationLabel: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <label className={lbl}>Card 2 value</label>
                  <input className={sm} value={data.reservation.locationValue} onChange={e => setSection('reservation', { locationValue: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Detail rows */}
            {data.reservation.details.length > 0 && (
              <div className="border-t border-[#D4A373]/10 pt-3 space-y-2">
                <p className="text-[0.6rem] font-black uppercase tracking-wider text-[#C7B8A8]/50">Booking detail rows</p>
                {data.reservation.details.map((detail, index) => (
                  <div key={`${detail.label}-${index}`} className="flex items-center gap-2 rounded-lg border border-[#D4A373]/10 bg-[#0d0905] px-3 py-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#fd850b]/10">
                      <i className={`fa-solid ${detail.icon || 'fa-circle-check'} text-[#fd850b] text-[0.55rem]`} />
                    </div>
                    <input className={`${sm} w-28 shrink-0`} value={detail.icon} placeholder="fa-check" onChange={e => updateReservationDetail(index, { icon: e.target.value })} />
                    <input className={`${sm} flex-1`} value={detail.label} placeholder="Label" onChange={e => updateReservationDetail(index, { label: e.target.value })} />
                    <input className={`${sm} flex-[2]`} value={detail.value} placeholder="Value" onChange={e => updateReservationDetail(index, { value: e.target.value })} />
                    <button type="button" onClick={() => removeReservationDetail(index)}
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-red-900/20 text-[0.6rem] text-red-400 hover:bg-red-700 hover:text-white transition-colors">
                      <i className="fa-solid fa-trash" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pb-4 sm:col-span-2">
          <button type="button" onClick={handleSave} disabled={saving} className={btnPrimary}>
            {saving ? 'Saving…' : <><i className="fa-solid fa-floppy-disk" /> Save All</>}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
