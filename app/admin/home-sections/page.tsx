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

const textarea = `${input} min-h-24 resize-y`
const miniGrid = 'grid gap-4 sm:grid-cols-2'

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
      subtitle="Edit the text, offer cards, review title, and reservation block on the home page"
      action={
        <button type="button" onClick={handleSave} disabled={saving} className={btnPrimary}>
          {saving ? 'Saving...' : <><i className="fa-solid fa-floppy-disk" /> Save</>}
        </button>
      }
    >
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
        <section className="rounded-lg border border-[#D4A373]/15 bg-[#130c08] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#fd850b]">Home page text</p>
              <p className="mt-1 text-sm leading-6 text-[#C7B8A8]">
                Images are still edited in Page Images, dishes in Featured Dishes, and videos in Promo Video.
              </p>
            </div>
            <a href="/" target="_blank" rel="noreferrer" className={btnSecondary}>
              <i className="fa-solid fa-eye" /> View home page
            </a>
          </div>
        </section>

        <SectionCard title="Welcome section">
          <div className="space-y-4">
            <Field label="Small orange label">
              <input className={input} value={data.about.kicker} onChange={e => setSection('about', { kicker: e.target.value })} />
            </Field>
            <Field label="Large title">
              <textarea className={textarea} value={data.about.title} onChange={e => setSection('about', { title: e.target.value })} />
            </Field>
            <Field label="Body text">
              <textarea className={textarea} value={data.about.body} onChange={e => setSection('about', { body: e.target.value })} />
            </Field>
            <div className={miniGrid}>
              <Field label="Button label">
                <input className={input} value={data.about.buttonLabel} onChange={e => setSection('about', { buttonLabel: e.target.value })} />
              </Field>
              <Field label="Button link">
                <input className={input} value={data.about.buttonHref} onChange={e => setSection('about', { buttonHref: e.target.value })} />
              </Field>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Featured dishes heading">
          <div className={miniGrid}>
            <Field label="Small orange label">
              <input className={input} value={data.dishes.kicker} onChange={e => setSection('dishes', { kicker: e.target.value })} />
            </Field>
            <Field label="Large title">
              <input className={input} value={data.dishes.title} onChange={e => setSection('dishes', { title: e.target.value })} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard title="Video experience text">
          <div className="space-y-4">
            <Field label="Large title">
              <textarea className={textarea} value={data.experience.title} onChange={e => setSection('experience', { title: e.target.value })} />
            </Field>
            <Field label="Body text">
              <textarea className={textarea} value={data.experience.body} onChange={e => setSection('experience', { body: e.target.value })} />
            </Field>
            <div className={miniGrid}>
              <Field label="Button label">
                <input className={input} value={data.experience.buttonLabel} onChange={e => setSection('experience', { buttonLabel: e.target.value })} />
              </Field>
              <Field label="Button link">
                <input className={input} value={data.experience.buttonHref} onChange={e => setSection('experience', { buttonHref: e.target.value })} />
              </Field>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Specials and offers" count={data.specials.items.length}>
          <div className="space-y-5">
            <div className={miniGrid}>
              <Field label="Small orange label">
                <input className={input} value={data.specials.kicker} onChange={e => setSection('specials', { kicker: e.target.value })} />
              </Field>
              <Field label="Large title">
                <input className={input} value={data.specials.title} onChange={e => setSection('specials', { title: e.target.value })} />
              </Field>
            </div>
            <Field label="Intro text">
              <textarea className={textarea} value={data.specials.body} onChange={e => setSection('specials', { body: e.target.value })} />
            </Field>
            <div className={miniGrid}>
              <Field label="Bottom button label">
                <input className={input} value={data.specials.buttonLabel} onChange={e => setSection('specials', { buttonLabel: e.target.value })} />
              </Field>
              <Field label="Bottom button link">
                <input className={input} value={data.specials.buttonHref} onChange={e => setSection('specials', { buttonHref: e.target.value })} />
              </Field>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-[#D4A373]/10 pt-5">
              <p className="text-xs font-black uppercase tracking-widest text-[#C7B8A8]">Offer cards</p>
              <button type="button" onClick={addSpecial} className={btnSecondary}>
                <i className="fa-solid fa-plus" /> Add offer
              </button>
            </div>

            <div className="space-y-4">
              {data.specials.items.map((item, index) => (
                <div key={`${item.title}-${index}`} className="rounded-lg border border-[#D4A373]/12 bg-[#0d0905] p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-sm font-black uppercase tracking-wide text-[#FFF7ED]">Offer {index + 1}</p>
                    <button type="button" onClick={() => removeSpecial(index)} className={btnDanger}>
                      <i className="fa-solid fa-trash" /> Remove
                    </button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Field label="Tag">
                      <input className={input} value={item.tag} onChange={e => updateSpecial(index, { tag: e.target.value })} />
                    </Field>
                    <Field label="Title">
                      <input className={input} value={item.title} onChange={e => updateSpecial(index, { title: e.target.value })} />
                    </Field>
                    <Field label="Icon class" hint="Example: fa-sun, fa-users, fa-tags">
                      <input className={input} value={item.icon} onChange={e => updateSpecial(index, { icon: e.target.value })} />
                    </Field>
                    <Field label="CTA label">
                      <input className={input} value={item.ctaLabel} onChange={e => updateSpecial(index, { ctaLabel: e.target.value })} />
                    </Field>
                    <Field label="CTA link">
                      <input className={input} value={item.ctaHref} onChange={e => updateSpecial(index, { ctaHref: e.target.value })} />
                    </Field>
                    <Field label="Description">
                      <textarea className={textarea} value={item.copy} onChange={e => updateSpecial(index, { copy: e.target.value })} />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Reviews title">
          <Field label="Large title above customer reviews">
            <input className={input} value={data.testimonials.title} onChange={e => setSection('testimonials', { title: e.target.value })} />
          </Field>
        </SectionCard>

        <SectionCard title="Reservation block" count={data.reservation.details.length}>
          <div className="space-y-5">
            <div className={miniGrid}>
              <Field label="Small orange label">
                <input className={input} value={data.reservation.kicker} onChange={e => setSection('reservation', { kicker: e.target.value })} />
              </Field>
              <Field label="Large title">
                <input className={input} value={data.reservation.title} onChange={e => setSection('reservation', { title: e.target.value })} />
              </Field>
            </div>
            <Field label="Body text">
              <textarea className={textarea} value={data.reservation.body} onChange={e => setSection('reservation', { body: e.target.value })} />
            </Field>
            <div className={miniGrid}>
              <Field label="Primary button label">
                <input className={input} value={data.reservation.primaryLabel} onChange={e => setSection('reservation', { primaryLabel: e.target.value })} />
              </Field>
              <Field label="Primary button link">
                <input className={input} value={data.reservation.primaryHref} onChange={e => setSection('reservation', { primaryHref: e.target.value })} />
              </Field>
              <Field label="Secondary button label">
                <input className={input} value={data.reservation.secondaryLabel} onChange={e => setSection('reservation', { secondaryLabel: e.target.value })} />
              </Field>
              <Field label="Secondary button link">
                <input className={input} value={data.reservation.secondaryHref} onChange={e => setSection('reservation', { secondaryHref: e.target.value })} />
              </Field>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Image overlay label">
                <input className={input} value={data.reservation.imageKicker} onChange={e => setSection('reservation', { imageKicker: e.target.value })} />
              </Field>
              <Field label="Image overlay title">
                <input className={input} value={data.reservation.imageTitle} onChange={e => setSection('reservation', { imageTitle: e.target.value })} />
              </Field>
              <Field label="Info card 1 label">
                <input className={input} value={data.reservation.bestForLabel} onChange={e => setSection('reservation', { bestForLabel: e.target.value })} />
              </Field>
              <Field label="Info card 1 value">
                <input className={input} value={data.reservation.bestForValue} onChange={e => setSection('reservation', { bestForValue: e.target.value })} />
              </Field>
              <Field label="Info card 2 label">
                <input className={input} value={data.reservation.locationLabel} onChange={e => setSection('reservation', { locationLabel: e.target.value })} />
              </Field>
              <Field label="Info card 2 value">
                <input className={input} value={data.reservation.locationValue} onChange={e => setSection('reservation', { locationValue: e.target.value })} />
              </Field>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-[#D4A373]/10 pt-5">
              <p className="text-xs font-black uppercase tracking-widest text-[#C7B8A8]">Booking detail rows</p>
              <button type="button" onClick={addReservationDetail} className={btnSecondary}>
                <i className="fa-solid fa-plus" /> Add row
              </button>
            </div>

            <div className="space-y-4">
              {data.reservation.details.map((detail, index) => (
                <div key={`${detail.label}-${index}`} className="rounded-lg border border-[#D4A373]/12 bg-[#0d0905] p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-sm font-black uppercase tracking-wide text-[#FFF7ED]">Row {index + 1}</p>
                    <button type="button" onClick={() => removeReservationDetail(index)} className={btnDanger}>
                      <i className="fa-solid fa-trash" /> Remove
                    </button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-3">
                    <Field label="Icon class">
                      <input className={input} value={detail.icon} onChange={e => updateReservationDetail(index, { icon: e.target.value })} />
                    </Field>
                    <Field label="Label">
                      <input className={input} value={detail.label} onChange={e => updateReservationDetail(index, { label: e.target.value })} />
                    </Field>
                    <Field label="Value">
                      <input className={input} value={detail.value} onChange={e => updateReservationDetail(index, { value: e.target.value })} />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        <div className="flex justify-end pb-6">
          <button type="button" onClick={handleSave} disabled={saving} className={btnPrimary}>
            {saving ? 'Saving...' : <><i className="fa-solid fa-floppy-disk" /> Save All Home Sections</>}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
