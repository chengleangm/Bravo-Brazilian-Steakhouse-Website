'use client'

import { useEffect, useRef, useState } from 'react'
import { AdminLayout, Toast, Modal, Field, SectionCard, input, btnPrimary, btnSecondary } from '../components/AdminLayout'

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
type EventType = { icon: string; title: string; desc: string }
type Package = { title: string; from: string; capacity: string; features: string[] }
type Feature = { icon: string; kicker: string; title: string; desc: string }
type FeaturedPkg = { visible: boolean; title: string; price: string; minGuests: number; includes: string[] }
type EventsData = {
  heroImage: string
  promotions: Promotion[]
  eventTypes: EventType[]
  featuredPackage: FeaturedPkg
  packages: Package[]
  features: Feature[]
}

const BLANK_PROMO: Promotion = {
  id: 0, active: true, badge: 'SPECIAL EVENT',
  title: '', subtitle: '', description: '',
  date: '', time: '', image: '', cta: 'Book Now', ctaLink: '/contact#reservation',
}
const BLANK_TYPE: EventType = { icon: 'fa-star', title: '', desc: '' }
const BLANK_PKG: Package = { title: '', from: '', capacity: '', features: [''] }
const BLANK_FEAT: Feature = { icon: 'fa-star', title: '', kicker: '', desc: '' }

export default function AdminEventsPage() {
  const [data, setData] = useState<EventsData | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [uploading, setUploading] = useState(false)
  const heroFileRef = useRef<HTMLInputElement>(null)
  const promoFileRef = useRef<HTMLInputElement>(null)

  const [promoModal, setPromoModal] = useState<{ open: boolean; idx: number | null; val: Promotion }>({ open: false, idx: null, val: BLANK_PROMO })
  const [typeModal, setTypeModal] = useState<{ open: boolean; idx: number | null; val: EventType }>({ open: false, idx: null, val: BLANK_TYPE })
  const [pkgModal, setPkgModal] = useState<{ open: boolean; idx: number | null; val: Package }>({ open: false, idx: null, val: BLANK_PKG })
  const [featModal, setFeatModal] = useState<{ open: boolean; idx: number | null; val: Feature }>({ open: false, idx: null, val: BLANK_FEAT })

  useEffect(() => {
    fetch('/api/admin/events').then(r => r.json()).then(d => {
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
    <AdminLayout title="Events">
      <div className="flex items-center justify-center h-64 text-[#C7B8A8]">
        <i className="fa-solid fa-spinner fa-spin mr-2" /> Loading…
      </div>
    </AdminLayout>
  )

  // ── Promotions ──
  function savePromo() {
    if (!promoModal.val.title || !promoModal.val.image) {
      alert('Title and banner image are required.')
      return
    }
    const promos = [...(data.promotions ?? [])]
    const val = { ...promoModal.val, id: promoModal.val.id || Date.now() }
    if (promoModal.idx === null) promos.push(val)
    else promos[promoModal.idx] = val
    save({ ...data, promotions: promos })
    setPromoModal({ open: false, idx: null, val: BLANK_PROMO })
  }
  function deletePromo(i: number) {
    if (!confirm('Delete this promotion?')) return
    save({ ...data, promotions: (data.promotions ?? []).filter((_, idx) => idx !== i) })
  }
  function togglePromoActive(i: number) {
    const promos = (data.promotions ?? []).map((p, idx) => idx === i ? { ...p, active: !p.active } : p)
    save({ ...data, promotions: promos })
  }
  function movePromo(i: number, dir: -1 | 1) {
    const promos = [...(data.promotions ?? [])]
    const target = i + dir
    if (target < 0 || target >= promos.length) return
    ;[promos[i], promos[target]] = [promos[target], promos[i]]
    save({ ...data, promotions: promos })
  }

  // ── Event Types ──
  function saveType() {
    if (!typeModal.val.title) return
    const types = [...data.eventTypes]
    if (typeModal.idx === null) types.push(typeModal.val)
    else types[typeModal.idx] = typeModal.val
    save({ ...data, eventTypes: types })
    setTypeModal({ open: false, idx: null, val: BLANK_TYPE })
  }
  function deleteType(i: number) {
    if (!confirm('Delete this event type?')) return
    save({ ...data, eventTypes: data.eventTypes.filter((_, idx) => idx !== i) })
  }

  // ── Packages ──
  function savePkg() {
    if (!pkgModal.val.title) return
    const pkgs = [...data.packages]
    if (pkgModal.idx === null) pkgs.push(pkgModal.val)
    else pkgs[pkgModal.idx] = pkgModal.val
    save({ ...data, packages: pkgs })
    setPkgModal({ open: false, idx: null, val: BLANK_PKG })
  }
  function deletePkg(i: number) {
    if (!confirm('Delete this package?')) return
    save({ ...data, packages: data.packages.filter((_, idx) => idx !== i) })
  }

  // ── Features ──
  function saveFeat() {
    if (!featModal.val.title) return
    const feats = [...data.features]
    if (featModal.idx === null) feats.push(featModal.val)
    else feats[featModal.idx] = featModal.val
    save({ ...data, features: feats })
    setFeatModal({ open: false, idx: null, val: BLANK_FEAT })
  }
  function deleteFeat(i: number) {
    if (!confirm('Delete this feature?')) return
    save({ ...data, features: data.features.filter((_, idx) => idx !== i) })
  }

  const promotions = data.promotions ?? []

  return (
    <AdminLayout title="Events" subtitle="Promotions, event types, packages & features">
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ══ PROMOTIONS ══ */}
        <SectionCard title="Promotions / Special Events" count={promotions.length}>
          <p className="text-xs text-[#C7B8A8] mb-4">
            Add banners for upcoming events, watch parties, seasonal deals, or any promotion.
            Each banner shows a <strong className="text-[#FFF7ED]">1:1 square image</strong> beside the event details on the Events page.
          </p>

          <div className="space-y-3 mb-4">
            {promotions.length === 0 && (
              <div className="border-2 border-dashed border-[#D4A373]/20 rounded-xl py-10 text-center text-[#C7B8A8]">
                <i className="fa-solid fa-bullhorn text-3xl mb-3 block text-[#C7B8A8]/25" />
                <p className="text-sm">No promotions yet.</p>
                <p className="text-xs mt-1 text-[#C7B8A8]/60">Add a FIFA watch party, a holiday special, or any upcoming event.</p>
              </div>
            )}

            {promotions.map((promo, i) => (
              <div key={promo.id} className="flex gap-3 bg-[#0d0905] border border-[#D4A373]/12 rounded-xl overflow-hidden">
                {/* Thumbnail */}
                <div className="w-20 h-20 shrink-0 bg-[#120807] relative">
                  {promo.image
                    ? <img src={promo.image} alt={promo.title} className="absolute inset-0 w-full h-full object-cover" />
                    : <div className="flex h-full items-center justify-center text-[#C7B8A8]/20"><i className="fa-solid fa-image text-2xl" /></div>
                  }
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 py-3 pr-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[0.6rem] font-black uppercase tracking-wider bg-[#fd850b]/15 text-[#fd850b] px-2 py-0.5 rounded-full">{promo.badge}</span>
                    {!promo.active && <span className="text-[0.6rem] font-black uppercase tracking-wider bg-[#C7B8A8]/10 text-[#C7B8A8] px-2 py-0.5 rounded-full">Hidden</span>}
                  </div>
                  <p className="font-black text-sm text-[#FFF7ED] truncate">{promo.title}</p>
                  <p className="text-xs text-[#C7B8A8] mt-0.5">{promo.date}{promo.time ? ` · ${promo.time}` : ''}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-center gap-1.5 pr-3 shrink-0">
                  <button
                    onClick={() => movePromo(i, -1)}
                    disabled={i === 0}
                    title="Move up"
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#D4A373]/12 text-[#C7B8A8] hover:bg-[#fd850b]/15 hover:text-[#fd850b] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <i className="fa-solid fa-arrow-up" />
                  </button>
                  <button
                    onClick={() => movePromo(i, 1)}
                    disabled={i === promotions.length - 1}
                    title="Move down"
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#D4A373]/12 text-[#C7B8A8] hover:bg-[#fd850b]/15 hover:text-[#fd850b] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <i className="fa-solid fa-arrow-down" />
                  </button>
                  <button
                    onClick={() => togglePromoActive(i)}
                    title={promo.active ? 'Hide on website' : 'Show on website'}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${promo.active ? 'bg-green-900/30 text-green-400 hover:bg-green-800' : 'bg-[#D4A373]/10 text-[#C7B8A8] hover:bg-[#D4A373]/20'}`}
                  >
                    <i className={`fa-solid ${promo.active ? 'fa-eye' : 'fa-eye-slash'}`} />
                  </button>
                  <button
                    onClick={() => setPromoModal({ open: true, idx: i, val: { ...promo } })}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#D4A373]/12 text-[#C7B8A8] hover:bg-[#fd850b]/15 hover:text-[#fd850b] transition-colors"
                  >
                    <i className="fa-solid fa-pencil" />
                  </button>
                  <button
                    onClick={() => deletePromo(i)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-red-900/20 text-red-400 hover:bg-red-700 hover:text-white transition-colors"
                  >
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPromoModal({ open: true, idx: null, val: { ...BLANK_PROMO, id: Date.now() } })}
            className={btnPrimary}
          >
            <i className="fa-solid fa-plus" /> Add Promotion
          </button>
        </SectionCard>

        {/* ══ HERO IMAGE ══ */}
        <SectionCard title="Events Hero Image">
          <div className="space-y-3">
            {data.heroImage && (
              <img src={data.heroImage} alt="hero" className="h-36 w-full object-cover rounded-xl border border-[#D4A373]/15" />
            )}
            <input className={input} value={data.heroImage} onChange={e => setData({ ...data, heroImage: e.target.value })} placeholder="Paste image URL…" />
            <div className="flex gap-2">
              <button onClick={() => heroFileRef.current?.click()} disabled={uploading} className={btnSecondary}>
                {uploading ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</> : <><i className="fa-solid fa-upload" /> Upload</>}
              </button>
              <input ref={heroFileRef} type="file" accept="image/*" className="hidden" onChange={async e => { const f = e.target.files?.[0]; if (f) { const url = await uploadFile(f, 'events'); if (url && data) { const updated = { ...data, heroImage: url }; setData(updated); save(updated) } } e.target.value = '' }} />
              <button onClick={() => save(data)} disabled={saving} className={btnPrimary}>
                <i className="fa-solid fa-floppy-disk" /> {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </SectionCard>

        {/* ══ EVENT TYPES ══ */}
        <SectionCard title="Event Types" count={data.eventTypes.length}>
          <div className="space-y-2 mb-4">
            {data.eventTypes.length === 0 && <p className="text-center text-[#C7B8A8] text-sm py-6">No event types. Add one below.</p>}
            {data.eventTypes.map((t, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#0d0905] border border-[#D4A373]/10 rounded-xl px-4 py-3">
                <div className="w-9 h-9 rounded-lg bg-[#fd850b]/10 flex items-center justify-center shrink-0">
                  <i className={`fa-solid ${t.icon} text-[#fd850b] text-sm`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm text-[#FFF7ED]">{t.title}</p>
                  <p className="text-[#C7B8A8] text-xs truncate mt-0.5">{t.desc}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setTypeModal({ open: true, idx: i, val: { ...t } })} className="px-3 py-1.5 bg-[#D4A373]/12 text-[#C7B8A8] rounded-lg text-xs font-bold hover:bg-[#fd850b]/15 hover:text-[#fd850b] transition-colors">Edit</button>
                  <button onClick={() => deleteType(i)} className="px-3 py-1.5 bg-red-900/20 text-red-400 rounded-lg text-xs font-bold hover:bg-red-700 hover:text-white transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setTypeModal({ open: true, idx: null, val: { ...BLANK_TYPE } })} className={btnSecondary}>
            <i className="fa-solid fa-plus" /> Add Event Type
          </button>
        </SectionCard>

        {/* ══ FEATURED PACKAGE ══ */}
        <SectionCard title="Featured Package">
          {/* Visibility toggle */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#D4A373]/12">
            <div>
              <p className="text-sm font-black text-[#FFF7ED]">Show on Events page</p>
              <p className="text-xs text-[#C7B8A8] mt-0.5">Toggle to hide or show this section publicly</p>
            </div>
            <button
              onClick={() => {
                const updated = { ...data, featuredPackage: { ...data.featuredPackage, visible: !data.featuredPackage.visible } }
                setData(updated)
                save(updated)
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-black transition-colors ${
                data.featuredPackage.visible
                  ? 'bg-green-900/30 text-green-400 hover:bg-green-800'
                  : 'bg-[#D4A373]/10 text-[#C7B8A8] hover:bg-[#D4A373]/20'
              }`}
            >
              <i className={`fa-solid ${data.featuredPackage.visible ? 'fa-eye' : 'fa-eye-slash'}`} />
              {data.featuredPackage.visible ? 'Visible' : 'Hidden'}
            </button>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <Field label="Package Title">
              <input className={input} value={data.featuredPackage.title} onChange={e => setData({ ...data, featuredPackage: { ...data.featuredPackage, title: e.target.value } })} />
            </Field>
            <Field label="Price">
              <input className={input} value={data.featuredPackage.price} onChange={e => setData({ ...data, featuredPackage: { ...data.featuredPackage, price: e.target.value } })} placeholder="$18.90" />
            </Field>
            <Field label="Min Guests">
              <input className={input} type="number" value={data.featuredPackage.minGuests} onChange={e => setData({ ...data, featuredPackage: { ...data.featuredPackage, minGuests: Number(e.target.value) } })} />
            </Field>
          </div>
          <Field label="What's Included (one per line)">
            <textarea className={`${input} min-h-28 resize-y`} value={data.featuredPackage.includes.join('\n')} onChange={e => setData({ ...data, featuredPackage: { ...data.featuredPackage, includes: e.target.value.split('\n') } })} />
          </Field>
          <button onClick={() => save(data)} disabled={saving} className={`${btnPrimary} mt-4`}>
            <i className="fa-solid fa-floppy-disk" /> {saving ? 'Saving…' : 'Save Package'}
          </button>
        </SectionCard>

        {/* ══ EVENT PACKAGES ══ */}
        <SectionCard title="Event Packages" count={data.packages.length}>
          <div className="space-y-2 mb-4">
            {data.packages.length === 0 && <p className="text-center text-[#C7B8A8] text-sm py-6">No packages. Add one below.</p>}
            {data.packages.map((p, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#0d0905] border border-[#D4A373]/10 rounded-xl px-4 py-3">
                <div className="w-9 h-9 rounded-lg bg-[#ffd029]/10 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-box text-[#ffd029] text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm text-[#FFF7ED]">{p.title} <span className="text-[#ffd029]">· {p.from}</span></p>
                  <p className="text-[#C7B8A8] text-xs mt-0.5">{p.capacity} · {p.features.length} features</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setPkgModal({ open: true, idx: i, val: { ...p, features: [...p.features] } })} className="px-3 py-1.5 bg-[#D4A373]/12 text-[#C7B8A8] rounded-lg text-xs font-bold hover:bg-[#fd850b]/15 hover:text-[#fd850b] transition-colors">Edit</button>
                  <button onClick={() => deletePkg(i)} className="px-3 py-1.5 bg-red-900/20 text-red-400 rounded-lg text-xs font-bold hover:bg-red-700 hover:text-white transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setPkgModal({ open: true, idx: null, val: { ...BLANK_PKG, features: [''] } })} className={btnSecondary}>
            <i className="fa-solid fa-plus" /> Add Package
          </button>
        </SectionCard>

        {/* ══ FEATURES ══ */}
        <SectionCard title="Why Choose Us" count={data.features.length}>
          <div className="space-y-2 mb-4">
            {data.features.length === 0 && <p className="text-center text-[#C7B8A8] text-sm py-6">No features. Add one below.</p>}
            {data.features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#0d0905] border border-[#D4A373]/10 rounded-xl px-4 py-3">
                <div className="w-9 h-9 rounded-lg bg-[#fd850b]/10 flex items-center justify-center shrink-0">
                  <i className={`fa-solid ${f.icon} text-[#fd850b] text-sm`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm text-[#FFF7ED]">{f.title}</p>
                  <p className="text-[#C7B8A8] text-xs mt-0.5">{f.kicker}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setFeatModal({ open: true, idx: i, val: { ...f } })} className="px-3 py-1.5 bg-[#D4A373]/12 text-[#C7B8A8] rounded-lg text-xs font-bold hover:bg-[#fd850b]/15 hover:text-[#fd850b] transition-colors">Edit</button>
                  <button onClick={() => deleteFeat(i)} className="px-3 py-1.5 bg-red-900/20 text-red-400 rounded-lg text-xs font-bold hover:bg-red-700 hover:text-white transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setFeatModal({ open: true, idx: null, val: { ...BLANK_FEAT } })} className={btnSecondary}>
            <i className="fa-solid fa-plus" /> Add Feature
          </button>
        </SectionCard>
      </div>

      {/* ══ PROMO MODAL ══ */}
      {promoModal.open && (
        <Modal
          title={promoModal.idx === null ? 'Add Promotion / Event Banner' : 'Edit Promotion'}
          onClose={() => setPromoModal({ open: false, idx: null, val: BLANK_PROMO })}
          wide
        >
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Left: Image */}
            <div className="space-y-3">
              <Field label="Banner Image (1:1 square)" hint="Use a square image for best results">
                {/* Square preview */}
                <div className="aspect-square w-full bg-[#0d0905] rounded-xl border-2 border-dashed border-[#D4A373]/20 overflow-hidden relative mb-3">
                  {promoModal.val.image
                    ? <img src={promoModal.val.image} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
                    : (
                      <div className="flex flex-col items-center justify-center h-full text-[#C7B8A8]/40 gap-2">
                        <i className="fa-solid fa-image text-4xl" />
                        <span className="text-xs font-bold uppercase tracking-wider">1:1 Banner</span>
                      </div>
                    )
                  }
                </div>
                <input
                  className={input}
                  value={promoModal.val.image}
                  onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, image: e.target.value } }))}
                  placeholder="Paste image URL…"
                />
                <button
                  onClick={() => promoFileRef.current?.click()}
                  disabled={uploading}
                  className={`${btnSecondary} mt-2 w-full justify-center`}
                >
                  {uploading
                    ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</>
                    : <><i className="fa-solid fa-upload" /> Upload from computer</>
                  }
                </button>
                <input
                  ref={promoFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async e => {
                    const f = e.target.files?.[0]
                    if (!f) return
                    const url = await uploadFile(f, 'promotions')
                    if (url) setPromoModal(m => ({ ...m, val: { ...m.val, image: url } }))
                    e.target.value = ''
                  }}
                />
              </Field>
            </div>

            {/* Right: Text fields */}
            <div className="space-y-3">
              <Field label="Badge Label" hint='e.g. "LIVE EVENT", "LIMITED TIME", "NEW"'>
                <input className={input} value={promoModal.val.badge} onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, badge: e.target.value } }))} placeholder="SPECIAL EVENT" />
              </Field>
              <Field label="Event Title">
                <input className={input} value={promoModal.val.title} onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, title: e.target.value } }))} placeholder="FIFA World Cup Watch Party" />
              </Field>
              <Field label="Subtitle">
                <input className={input} value={promoModal.val.subtitle} onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, subtitle: e.target.value } }))} placeholder="Watch with the best crowd in town" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date">
                  <input className={input} value={promoModal.val.date} onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, date: e.target.value } }))} placeholder="Dec 18, 2026" />
                </Field>
                <Field label="Time">
                  <input className={input} value={promoModal.val.time} onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, time: e.target.value } }))} placeholder="7:00 PM" />
                </Field>
              </div>
            </div>
          </div>

          {/* Full-width description */}
          <div className="mt-4">
            <Field label="Description">
              <textarea
                className={`${input} resize-y`}
                rows={3}
                value={promoModal.val.description}
                onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, description: e.target.value } }))}
                placeholder="Describe the event — what guests can expect, why it's special…"
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <Field label="CTA Button Text">
              <input className={input} value={promoModal.val.cta} onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, cta: e.target.value } }))} placeholder="Reserve Your Spot" />
            </Field>
            <Field label="CTA Link">
              <input className={input} value={promoModal.val.ctaLink} onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, ctaLink: e.target.value } }))} placeholder="/contact#reservation" />
            </Field>
          </div>

          {/* Active toggle */}
          <label className="flex items-center gap-3 cursor-pointer bg-[#0d0905] rounded-xl px-4 py-3 mt-4 border border-[#D4A373]/12">
            <input
              type="checkbox"
              checked={promoModal.val.active}
              onChange={e => setPromoModal(m => ({ ...m, val: { ...m.val, active: e.target.checked } }))}
              className="w-4 h-4 accent-[#fd850b]"
            />
            <div>
              <p className="text-sm font-bold text-[#FFF7ED]">Show on website</p>
              <p className="text-xs text-[#C7B8A8]">Uncheck to hide this promotion without deleting it</p>
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

      {/* ══ EVENT TYPE MODAL ══ */}
      {typeModal.open && (
        <Modal title={typeModal.idx === null ? 'Add Event Type' : 'Edit Event Type'} onClose={() => setTypeModal({ open: false, idx: null, val: BLANK_TYPE })}>
          <div className="space-y-4">
            <Field label="Icon (Font Awesome)" hint="e.g. fa-star, fa-users, fa-cake-candles">
              <div className="flex gap-2">
                <input className={input} value={typeModal.val.icon} onChange={e => setTypeModal(m => ({ ...m, val: { ...m.val, icon: e.target.value } }))} placeholder="fa-star" />
                <div className="w-11 h-11 shrink-0 bg-[#fd850b]/10 rounded-lg flex items-center justify-center">
                  <i className={`fa-solid ${typeModal.val.icon || 'fa-star'} text-[#fd850b]`} />
                </div>
              </div>
            </Field>
            <Field label="Title"><input className={input} value={typeModal.val.title} onChange={e => setTypeModal(m => ({ ...m, val: { ...m.val, title: e.target.value } }))} placeholder="e.g. BIRTHDAYS" /></Field>
            <Field label="Description"><textarea className={`${input} resize-none`} rows={2} value={typeModal.val.desc} onChange={e => setTypeModal(m => ({ ...m, val: { ...m.val, desc: e.target.value } }))} /></Field>
            <div className="flex gap-3 pt-1">
              <button onClick={saveType} className={btnPrimary}><i className="fa-solid fa-check" /> Save</button>
              <button onClick={() => setTypeModal({ open: false, idx: null, val: BLANK_TYPE })} className={btnSecondary}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}

      {/* ══ PACKAGE MODAL ══ */}
      {pkgModal.open && (
        <Modal title={pkgModal.idx === null ? 'Add Package' : 'Edit Package'} onClose={() => setPkgModal({ open: false, idx: null, val: BLANK_PKG })}>
          <div className="space-y-4">
            <Field label="Package Title"><input className={input} value={pkgModal.val.title} onChange={e => setPkgModal(m => ({ ...m, val: { ...m.val, title: e.target.value } }))} placeholder="e.g. Platinum Package" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Starting Price"><input className={input} value={pkgModal.val.from} onChange={e => setPkgModal(m => ({ ...m, val: { ...m.val, from: e.target.value } }))} placeholder="$16.90" /></Field>
              <Field label="Capacity"><input className={input} value={pkgModal.val.capacity} onChange={e => setPkgModal(m => ({ ...m, val: { ...m.val, capacity: e.target.value } }))} placeholder="5–30 guests" /></Field>
            </div>
            <Field label="Features (one per line)">
              <textarea className={`${input} min-h-24 resize-y`} value={pkgModal.val.features.join('\n')} onChange={e => setPkgModal(m => ({ ...m, val: { ...m.val, features: e.target.value.split('\n') } }))} />
            </Field>
            <div className="flex gap-3 pt-1">
              <button onClick={savePkg} className={btnPrimary}><i className="fa-solid fa-check" /> Save</button>
              <button onClick={() => setPkgModal({ open: false, idx: null, val: BLANK_PKG })} className={btnSecondary}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}

      {/* ══ FEATURE MODAL ══ */}
      {featModal.open && (
        <Modal title={featModal.idx === null ? 'Add Feature' : 'Edit Feature'} onClose={() => setFeatModal({ open: false, idx: null, val: BLANK_FEAT })}>
          <div className="space-y-4">
            <Field label="Icon" hint="e.g. fa-fire, fa-crown, fa-shield-halved">
              <div className="flex gap-2">
                <input className={input} value={featModal.val.icon} onChange={e => setFeatModal(m => ({ ...m, val: { ...m.val, icon: e.target.value } }))} placeholder="fa-fire" />
                <div className="w-11 h-11 shrink-0 bg-[#fd850b]/10 rounded-lg flex items-center justify-center">
                  <i className={`fa-solid ${featModal.val.icon || 'fa-star'} text-[#fd850b]`} />
                </div>
              </div>
            </Field>
            <Field label="Kicker (small label)"><input className={input} value={featModal.val.kicker} onChange={e => setFeatModal(m => ({ ...m, val: { ...m.val, kicker: e.target.value } }))} placeholder="e.g. Our Promise" /></Field>
            <Field label="Title"><input className={input} value={featModal.val.title} onChange={e => setFeatModal(m => ({ ...m, val: { ...m.val, title: e.target.value } }))} placeholder="e.g. Premium Quality" /></Field>
            <Field label="Description"><textarea className={`${input} resize-none`} rows={3} value={featModal.val.desc} onChange={e => setFeatModal(m => ({ ...m, val: { ...m.val, desc: e.target.value } }))} /></Field>
            <div className="flex gap-3 pt-1">
              <button onClick={saveFeat} className={btnPrimary}><i className="fa-solid fa-check" /> Save</button>
              <button onClick={() => setFeatModal({ open: false, idx: null, val: BLANK_FEAT })} className={btnSecondary}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  )
}
