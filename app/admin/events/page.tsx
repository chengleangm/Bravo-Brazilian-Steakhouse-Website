'use client'

import { useEffect, useRef, useState } from 'react'
import { AdminLayout, Toast, Modal, Field, input, btnPrimary, btnSecondary } from '../components/AdminLayout'

type Promotion = {
  id: number
  active: boolean
  badge: string
  title: string
  subtitle: string
  description: string
  date: string
  time: string
  image: string
  cta: string
  ctaLink: string
}
type FeaturedPkg = { visible: boolean; title: string; price: string; minGuests: number; includes: string[] }
type EventsData = {
  heroImage: string
  promotions: Promotion[]
  featuredPackage: FeaturedPkg
}

const BLANK_PROMO: Promotion = {
  id: 0, active: true, badge: 'SPECIAL EVENT',
  title: '', subtitle: '', description: '',
  date: '', time: '', image: '', cta: 'Book Now', ctaLink: '/contact#reservation',
}

const cardBase = 'overflow-hidden rounded-xl border border-[#D4A373]/15 bg-[#130c08]'
const sectionHead = 'flex items-center justify-between border-b border-[#D4A373]/10 px-5 py-4'

export default function AdminEventsPage() {
  const [data, setData] = useState<EventsData | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [uploading, setUploading] = useState(false)
  const heroFileRef = useRef<HTMLInputElement>(null)
  const promoFileRef = useRef<HTMLInputElement>(null)

  const [promoModal, setPromoModal] = useState<{ open: boolean; idx: number | null; val: Promotion }>({ open: false, idx: null, val: BLANK_PROMO })

  useEffect(() => {
    fetch('/api/admin/events', { cache: 'no-store' }).then(r => r.json()).then(d => {
      setData({ promotions: [], ...d })
    })
  }, [])

  async function save(updated: EventsData) {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/events', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) })
      if (!res.ok) { const j = await res.json().catch(() => ({})); alert('Save failed: ' + (j.error ?? res.status)); return }
      setData(updated)
      setToast('Saved!')
    } finally {
      setSaving(false)
    }
  }

  async function uploadFile(file: File, folder: string): Promise<string | null> {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', folder)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const d = await res.json()
      if (!res.ok) { alert('Upload failed: ' + (d.error ?? res.status)); return null }
      return d.url ?? null
    } catch (e) { alert('Upload failed: ' + String(e)); return null }
    finally { setUploading(false) }
  }

  if (!data) return (
    <AdminLayout title="Promotions">
      <div className="flex items-center justify-center h-64 text-[#C7B8A8]">
        <i className="fa-solid fa-spinner fa-spin mr-2" /> Loading…
      </div>
    </AdminLayout>
  )

  const promotions = data.promotions ?? []

  function savePromo() {
    if (!promoModal.val.title || !promoModal.val.image) { alert('Title and image are required.'); return }
    const promos = [...promotions]
    const val = { ...promoModal.val, id: promoModal.val.id || Date.now() }
    if (promoModal.idx === null) promos.push(val)
    else promos[promoModal.idx] = val
    save({ ...data, promotions: promos })
    setPromoModal({ open: false, idx: null, val: BLANK_PROMO })
  }
  function deletePromo(i: number) {
    if (!confirm('Delete this promotion?')) return
    save({ ...data, promotions: promotions.filter((_, idx) => idx !== i) })
  }
  function togglePromoActive(i: number) {
    save({ ...data, promotions: promotions.map((p, idx) => idx === i ? { ...p, active: !p.active } : p) })
  }
  function movePromo(i: number, dir: -1 | 1) {
    const promos = [...promotions]
    const t = i + dir
    if (t < 0 || t >= promos.length) return
    ;[promos[i], promos[t]] = [promos[t], promos[i]]
    save({ ...data, promotions: promos })
  }


  return (
    <AdminLayout title="Promotions">
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

        {/* ══ PROMOTIONS ══ */}
        <div className={`${cardBase} sm:col-span-2`}>
          <div className={sectionHead}>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fd850b]/15 text-[#fd850b]">
                <i className="fa-solid fa-tags text-xs" />
              </span>
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-[#FFF7ED]">Active Promotions</h2>
                <p className="text-[0.68rem] text-[#C7B8A8] mt-0.5">These show on the live Promotions page — first = top</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#fd850b]/15 px-3 py-1 text-xs font-black text-[#fd850b]">
                {promotions.filter(p => p.active).length} live · {promotions.length} total
              </span>
              <button
                onClick={() => setPromoModal({ open: true, idx: null, val: { ...BLANK_PROMO, id: Date.now() } })}
                className={btnPrimary}
              >
                <i className="fa-solid fa-plus" /> Add
              </button>
            </div>
          </div>

          <div className="p-5 space-y-3">
            {promotions.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#D4A373]/20 py-14 text-center text-[#C7B8A8]">
                <i className="fa-solid fa-bullhorn text-4xl mb-3 text-[#C7B8A8]/20" />
                <p className="text-sm font-black text-[#FFF7ED]">No promotions yet</p>
                <p className="text-xs mt-1 text-[#C7B8A8]/60 max-w-xs">Add a World Cup promo, holiday special, or any upcoming event.</p>
                <button
                  onClick={() => setPromoModal({ open: true, idx: null, val: { ...BLANK_PROMO, id: Date.now() } })}
                  className={`${btnPrimary} mt-4`}
                >
                  <i className="fa-solid fa-plus" /> Add First Promotion
                </button>
              </div>
            )}

            {promotions.map((promo, i) => (
              <div
                key={promo.id}
                className={`relative overflow-hidden rounded-xl border ${promo.active ? 'border-[#D4A373]/20' : 'border-[#D4A373]/10 opacity-60'} bg-[#0d0905]`}
              >
                {/* Position badge */}
                <div className="absolute left-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-black/60 text-xs font-black text-[#fd850b] backdrop-blur-sm">
                  {i + 1}
                </div>
                {/* Hidden badge */}
                {!promo.active && (
                  <div className="absolute right-3 top-3 z-10 rounded-lg bg-black/60 px-2 py-1 text-[0.6rem] font-black uppercase tracking-wider text-[#C7B8A8] backdrop-blur-sm">
                    Hidden
                  </div>
                )}

                <div className="flex gap-0">
                  {/* Image */}
                  <div className="relative h-32 w-32 shrink-0 sm:h-36 sm:w-36 bg-[#120807]">
                    {promo.image
                      ? <img src={promo.image} alt={promo.title} className="absolute inset-0 h-full w-full object-cover" />
                      : <div className="flex h-full items-center justify-center text-[#C7B8A8]/20"><i className="fa-solid fa-image text-3xl" /></div>
                    }
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 min-w-0 flex-col justify-between p-3 sm:p-4">
                    <div>
                      <span className="inline-block text-[0.6rem] font-black uppercase tracking-wider bg-[#fd850b]/15 text-[#fd850b] px-2 py-0.5 rounded-full mb-1">
                        {promo.badge}
                      </span>
                      <p className="font-black text-sm text-[#FFF7ED] leading-tight">{promo.title}</p>
                      {promo.subtitle && <p className="text-xs text-[#fd850b] mt-0.5 truncate">{promo.subtitle}</p>}
                      {(promo.date || promo.time) && (
                        <p className="text-xs text-[#C7B8A8] mt-1">
                          <i className="fa-solid fa-clock mr-1 text-[#fd850b]/60" />
                          {promo.date}{promo.date && promo.time ? ' · ' : ''}{promo.time}
                        </p>
                      )}
                    </div>

                    {/* Action row */}
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => movePromo(i, -1)}
                        disabled={i === 0}
                        title="Move up"
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#D4A373]/20 text-xs text-[#C7B8A8] hover:border-[#fd850b] hover:text-[#fd850b] disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                      >
                        <i className="fa-solid fa-arrow-up" />
                      </button>
                      <button
                        onClick={() => movePromo(i, 1)}
                        disabled={i === promotions.length - 1}
                        title="Move down"
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#D4A373]/20 text-xs text-[#C7B8A8] hover:border-[#fd850b] hover:text-[#fd850b] disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                      >
                        <i className="fa-solid fa-arrow-down" />
                      </button>

                      <div className="mx-1 h-4 w-px bg-[#D4A373]/20" />

                      <button
                        onClick={() => togglePromoActive(i)}
                        title={promo.active ? 'Hide from website' : 'Show on website'}
                        className={`flex h-7 items-center gap-1.5 rounded-lg px-2.5 text-xs font-bold transition-colors ${
                          promo.active
                            ? 'bg-green-900/25 text-green-400 hover:bg-green-900/50'
                            : 'bg-[#D4A373]/10 text-[#C7B8A8] hover:bg-[#D4A373]/20'
                        }`}
                      >
                        <i className={`fa-solid ${promo.active ? 'fa-eye' : 'fa-eye-slash'}`} />
                        <span className="hidden sm:inline">{promo.active ? 'Live' : 'Hidden'}</span>
                      </button>

                      <button
                        onClick={() => setPromoModal({ open: true, idx: i, val: { ...promo } })}
                        className="flex h-7 items-center gap-1.5 rounded-lg bg-[#D4A373]/10 px-2.5 text-xs font-bold text-[#C7B8A8] hover:bg-[#fd850b]/15 hover:text-[#fd850b] transition-colors"
                      >
                        <i className="fa-solid fa-pencil" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>

                      <button
                        onClick={() => deletePromo(i)}
                        className="flex h-7 items-center gap-1.5 rounded-lg bg-red-900/20 px-2.5 text-xs font-bold text-red-400 hover:bg-red-700 hover:text-white transition-colors"
                      >
                        <i className="fa-solid fa-trash" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ HERO IMAGE ══ */}
        <div className={cardBase}>
          <div className={sectionHead}>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fd850b]/15 text-[#fd850b]">
                <i className="fa-solid fa-image text-xs" />
              </span>
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-[#FFF7ED]">Page Hero Photo</h2>
                <p className="text-[0.68rem] text-[#C7B8A8] mt-0.5">Large banner at the top of the Promotions page</p>
              </div>
            </div>
          </div>
          <div className="p-5 space-y-3">
            {data.heroImage && (
              <div className="relative overflow-hidden rounded-xl border border-[#D4A373]/15">
                <img src={data.heroImage} alt="hero" className="h-44 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-2 py-1 text-[0.65rem] font-black uppercase tracking-wider text-white backdrop-blur-sm">
                  Current hero
                </span>
              </div>
            )}
            <input className={input} value={data.heroImage} onChange={e => setData({ ...data, heroImage: e.target.value })} placeholder="Paste image URL…" />
            <div className="flex gap-2">
              <button onClick={() => heroFileRef.current?.click()} disabled={uploading} className={btnSecondary}>
                {uploading ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</> : <><i className="fa-solid fa-upload" /> Upload photo</>}
              </button>
              <input ref={heroFileRef} type="file" accept="image/*" className="hidden" onChange={async e => {
                const f = e.target.files?.[0]
                if (f) { const url = await uploadFile(f, 'events'); if (url) { const u = { ...data, heroImage: url }; setData(u); save(u) } }
                e.target.value = ''
              }} />
              <button onClick={() => save(data)} disabled={saving} className={btnPrimary}>
                <i className="fa-solid fa-floppy-disk" /> {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>

        {/* ══ FEATURED PACKAGE ══ */}
        <div className={cardBase}>
          <div className={sectionHead}>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ffd029]/15 text-[#ffd029]">
                <i className="fa-solid fa-crown text-xs" />
              </span>
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-[#FFF7ED]">Featured Package</h2>
                <p className="text-[0.68rem] text-[#C7B8A8] mt-0.5">Highlighted package shown prominently on the page</p>
              </div>
            </div>
            <button
              onClick={() => {
                const u = { ...data, featuredPackage: { ...data.featuredPackage, visible: !data.featuredPackage.visible } }
                setData(u); save(u)
              }}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-black transition-colors ${
                data.featuredPackage.visible
                  ? 'bg-green-900/25 text-green-400 hover:bg-green-900/50'
                  : 'bg-[#D4A373]/10 text-[#C7B8A8] hover:bg-[#D4A373]/20'
              }`}
            >
              <i className={`fa-solid ${data.featuredPackage.visible ? 'fa-eye' : 'fa-eye-slash'}`} />
              {data.featuredPackage.visible ? 'Visible' : 'Hidden'}
            </button>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Package Title">
                <input className={input} value={data.featuredPackage.title}
                  onChange={e => setData({ ...data, featuredPackage: { ...data.featuredPackage, title: e.target.value } })} />
              </Field>
              <Field label="Price per person">
                <input className={input} value={data.featuredPackage.price} placeholder="$18.90"
                  onChange={e => setData({ ...data, featuredPackage: { ...data.featuredPackage, price: e.target.value } })} />
              </Field>
              <Field label="Min guests">
                <input className={input} type="number" value={data.featuredPackage.minGuests}
                  onChange={e => setData({ ...data, featuredPackage: { ...data.featuredPackage, minGuests: Number(e.target.value) } })} />
              </Field>
            </div>
            <Field label="What's included" hint="One item per line">
              <textarea className={`${input} min-h-28 resize-y`}
                value={data.featuredPackage.includes.join('\n')}
                onChange={e => setData({ ...data, featuredPackage: { ...data.featuredPackage, includes: e.target.value.split('\n') } })} />
            </Field>
            <button onClick={() => save(data)} disabled={saving} className={btnPrimary}>
              <i className="fa-solid fa-floppy-disk" /> {saving ? 'Saving…' : 'Save Package'}
            </button>
          </div>
        </div>

      </div>

      {/* ══ PROMO MODAL ══ */}
      {promoModal.open && (
        <Modal
          title={promoModal.idx === null ? 'Add Promotion' : 'Edit Promotion'}
          onClose={() => setPromoModal({ open: false, idx: null, val: BLANK_PROMO })}
          wide
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-3">
              <Field label="Banner image" hint="Square 1:1 works best">
                <div className="aspect-square w-full bg-[#0d0905] rounded-xl border-2 border-dashed border-[#D4A373]/20 overflow-hidden relative mb-3">
                  {promoModal.val.image
                    ? <img src={promoModal.val.image} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
                    : <div className="flex flex-col items-center justify-center h-full text-[#C7B8A8]/40 gap-2">
                        <i className="fa-solid fa-image text-4xl" />
                        <span className="text-xs font-bold uppercase tracking-wider">1:1 Banner</span>
                      </div>
                  }
                </div>
                <input className={input} value={promoModal.val.image}
                  onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, image: e.target.value } }))}
                  placeholder="Paste image URL…" />
                <button onClick={() => promoFileRef.current?.click()} disabled={uploading} className={`${btnSecondary} mt-2 w-full justify-center`}>
                  {uploading ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</> : <><i className="fa-solid fa-upload" /> Upload from computer</>}
                </button>
                <input ref={promoFileRef} type="file" accept="image/*" className="hidden"
                  onChange={async e => { const f = e.target.files?.[0]; if (!f) return; const url = await uploadFile(f, 'promotions'); if (url) setPromoModal(m => ({ ...m, val: { ...m.val, image: url } })); e.target.value = '' }} />
              </Field>
            </div>

            <div className="space-y-3">
              <Field label="Badge label" hint='e.g. "LIVE EVENT", "LIMITED TIME"'>
                <input className={input} value={promoModal.val.badge}
                  onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, badge: e.target.value } }))}
                  placeholder="SPECIAL EVENT" />
              </Field>
              <Field label="Title">
                <input className={input} value={promoModal.val.title}
                  onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, title: e.target.value } }))}
                  placeholder="FIFA World Cup Watch Party" />
              </Field>
              <Field label="Subtitle">
                <input className={input} value={promoModal.val.subtitle}
                  onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, subtitle: e.target.value } }))}
                  placeholder="Watch with the best crowd in town" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date">
                  <input className={input} value={promoModal.val.date}
                    onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, date: e.target.value } }))}
                    placeholder="Dec 18, 2026" />
                </Field>
                <Field label="Time">
                  <input className={input} value={promoModal.val.time}
                    onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, time: e.target.value } }))}
                    placeholder="7:00 PM" />
                </Field>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Field label="Description">
              <textarea className={`${input} resize-y`} rows={3} value={promoModal.val.description}
                onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, description: e.target.value } }))}
                placeholder="Describe the event or deal…" />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <Field label="Button text">
              <input className={input} value={promoModal.val.cta}
                onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, cta: e.target.value } }))}
                placeholder="Reserve Your Spot" />
            </Field>
            <Field label="Button link">
              <input className={input} value={promoModal.val.ctaLink}
                onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, ctaLink: e.target.value } }))}
                placeholder="/contact#reservation" />
            </Field>
          </div>

          <label className="flex items-center gap-3 cursor-pointer bg-[#0d0905] rounded-xl px-4 py-3 mt-4 border border-[#D4A373]/12">
            <input type="checkbox" checked={promoModal.val.active}
              onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, active: e.target.checked } }))}
              className="w-4 h-4 accent-[#fd850b]" />
            <div>
              <p className="text-sm font-bold text-[#FFF7ED]">Show on website</p>
              <p className="text-xs text-[#C7B8A8]">Uncheck to hide without deleting</p>
            </div>
          </label>

          <div className="flex gap-3 mt-5">
            <button onClick={savePromo} className={`${btnPrimary} flex-1 justify-center`}>
              <i className="fa-solid fa-check" /> {promoModal.idx === null ? 'Add Promotion' : 'Save Changes'}
            </button>
            <button onClick={() => setPromoModal({ open: false, idx: null, val: BLANK_PROMO })} className={btnSecondary}>Cancel</button>
          </div>
        </Modal>
      )}

    </AdminLayout>
  )
}
