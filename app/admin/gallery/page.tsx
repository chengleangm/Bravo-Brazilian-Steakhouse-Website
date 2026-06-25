'use client'

import { useEffect, useRef, useState } from 'react'
import { AdminLayout, Toast, Modal, Field, input, btnPrimary, btnSecondary } from '../components/AdminLayout'

type Category = 'food' | 'grill' | 'interior' | 'events'
type GalleryImage = { id: number; src: string; category: Category; alt: string; featured: boolean }
type GalleryData = { heroImage: string; images: GalleryImage[]; stories: unknown[] }

const CATEGORIES: Category[] = ['food', 'grill', 'interior', 'events']
const CAT_COLORS: Record<Category, string> = { food: '#fd850b', grill: '#ef4444', interior: '#60a5fa', events: '#a78bfa' }
const BLANK: GalleryImage = { id: 0, src: '', category: 'food', alt: '', featured: false }

export default function AdminGalleryPage() {
  const [data, setData] = useState<GalleryData | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [modal, setModal] = useState<{ open: boolean; idx: number | null; val: GalleryImage }>({ open: false, idx: null, val: BLANK })
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const heroFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/admin/gallery').then(r => r.json()).then(setData)
  }, [])

  async function save(updated: GalleryData) {
    setSaving(true)
    try {
      await fetch('/api/admin/gallery', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) })
      setData(updated)
      setToast('Saved!')
    } finally {
      setSaving(false)
    }
  }

  async function uploadFile(file: File, folder = 'gallery'): Promise<string | null> {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', folder)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      return (await res.json()).url
    } catch {
      alert('Upload failed. Please try again.')
      return null
    } finally {
      setUploading(false)
    }
  }

  function openAdd() { setModal({ open: true, idx: null, val: { ...BLANK, id: Date.now() } }) }
  function openEdit(i: number) { setModal({ open: true, idx: i, val: { ...data!.images[i] } }) }

  function saveModal() {
    if (!data) return
    if (!modal.val.src || !modal.val.alt) { alert('Image and alt text are required.'); return }
    const images = [...data.images]
    if (modal.idx === null) images.push(modal.val)
    else images[modal.idx] = modal.val
    save({ ...data, images })
    setModal({ open: false, idx: null, val: BLANK })
  }

  function deleteImage(i: number) {
    if (!data || !confirm('Delete this photo from the gallery?')) return
    save({ ...data, images: data.images.filter((_, idx) => idx !== i) })
  }

  function toggleFeatured(i: number) {
    if (!data) return
    save({ ...data, images: data.images.map((img, idx) => idx === i ? { ...img, featured: !img.featured } : img) })
  }

  if (!data) return (
    <AdminLayout title="Gallery">
      <div className="flex items-center justify-center h-64 text-[#C7B8A8]">
        <i className="fa-solid fa-spinner fa-spin mr-2" /> Loading…
      </div>
    </AdminLayout>
  )

  const displayed = filter === 'all' ? data.images : data.images.filter(img => img.category === filter)

  return (
    <AdminLayout
      title="Gallery"
      subtitle={`${data.images.length} photos`}
      action={
        <button onClick={openAdd} className={btnPrimary}>
          <i className="fa-solid fa-plus" /> Add Photo
        </button>
      }
    >
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Hero Image */}
        <div className="bg-[#130c08] border border-[#D4A373]/15 rounded-2xl p-5">
          <p className="text-xs font-black uppercase tracking-widest text-[#C7B8A8] mb-3">Gallery Hero Image</p>
          {data.heroImage && (
            <img src={data.heroImage} alt="hero" className="h-32 w-full object-cover rounded-xl border border-[#D4A373]/15 mb-3" />
          )}
          <div className="flex gap-2">
            <input
              className={`${input} flex-1`}
              value={data.heroImage}
              onChange={e => setData({ ...data, heroImage: e.target.value })}
              placeholder="Paste image URL…"
            />
            <button onClick={() => heroFileRef.current?.click()} className={btnSecondary}>
              <i className="fa-solid fa-upload" />
            </button>
            <input
              ref={heroFileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async e => {
                const f = e.target.files?.[0]
                if (!f) return
                const url = await uploadFile(f, 'gallery')
                if (url) save({ ...data, heroImage: url })
                e.target.value = ''
              }}
            />
            <button onClick={() => save(data)} disabled={saving} className={btnPrimary}>
              <i className="fa-solid fa-floppy-disk" /> Save
            </button>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          {(['all', ...CATEGORIES] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-colors ${
                filter === cat
                  ? 'bg-[#fd850b] text-black'
                  : 'border border-[#D4A373]/20 text-[#C7B8A8] hover:border-[#fd850b] hover:text-[#fd850b]'
              }`}
            >
              {cat === 'all' ? 'All' : cat} ({cat === 'all' ? data.images.length : data.images.filter(i => i.category === cat).length})
            </button>
          ))}
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {displayed.map((img) => {
            const realIdx = data.images.indexOf(img)
            return (
              <div key={img.id} className="group bg-[#130c08] border border-[#D4A373]/12 rounded-xl overflow-hidden hover:border-[#fd850b]/30 transition-colors">
                <div className="relative aspect-[4/3] bg-[#0d0905]">
                  <img src={img.src} alt={img.alt} className="absolute inset-0 w-full h-full object-cover" />
                  {img.featured && (
                    <span className="absolute top-2 left-2 bg-[#fd850b] text-black text-[0.6rem] font-black uppercase px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                  <span
                    className="absolute top-2 right-2 text-[0.6rem] font-black uppercase px-2 py-0.5 rounded-full"
                    style={{ background: `${CAT_COLORS[img.category]}20`, color: CAT_COLORS[img.category] }}
                  >
                    {img.category}
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-xs text-[#FFF7ED] font-bold truncate mb-2">{img.alt}</p>
                  <div className="flex gap-1.5">
                    <button onClick={() => openEdit(realIdx)} className="flex-1 py-1.5 bg-[#D4A373]/10 text-[#C7B8A8] rounded-lg text-xs font-bold hover:bg-[#fd850b]/15 hover:text-[#fd850b] transition-colors">
                      Edit
                    </button>
                    <button
                      onClick={() => toggleFeatured(realIdx)}
                      title="Toggle featured"
                      className={`px-2.5 py-1.5 rounded-lg text-xs transition-colors ${img.featured ? 'bg-[#ffd029]/20 text-[#ffd029]' : 'bg-[#D4A373]/10 text-[#C7B8A8] hover:text-[#ffd029]'}`}
                    >
                      <i className={`fa-${img.featured ? 'solid' : 'regular'} fa-star`} />
                    </button>
                    <button onClick={() => deleteImage(realIdx)} className="px-2.5 py-1.5 bg-red-900/20 text-red-400 rounded-lg text-xs hover:bg-red-700 hover:text-white transition-colors">
                      <i className="fa-solid fa-trash-can" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Add tile */}
          <button
            onClick={openAdd}
            className="aspect-[4/3] border-2 border-dashed border-[#D4A373]/20 rounded-xl flex flex-col items-center justify-center gap-2 text-[#C7B8A8] hover:border-[#fd850b] hover:text-[#fd850b] transition-colors"
          >
            <i className="fa-solid fa-plus text-2xl" />
            <span className="text-xs font-black uppercase tracking-wider">Add Photo</span>
          </button>
        </div>

        {displayed.length === 0 && filter !== 'all' && (
          <div className="text-center py-16 text-[#C7B8A8]">
            <i className="fa-solid fa-image text-3xl mb-3 block text-[#C7B8A8]/30" />
            No photos in &quot;{filter}&quot; category yet.
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modal.open && (
        <Modal title={modal.idx === null ? 'Add Photo' : 'Edit Photo'} onClose={() => setModal({ open: false, idx: null, val: BLANK })}>
          <div className="space-y-4">
            <Field label="Image">
              {modal.val.src && (
                <img src={modal.val.src} alt="" className="h-32 w-full object-cover rounded-xl border border-[#D4A373]/15 mb-2" />
              )}
              <input
                className={input}
                value={modal.val.src}
                onChange={e => setModal(m => ({ ...m, val: { ...m.val, src: e.target.value } }))}
                placeholder="Paste image URL…"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className={`${btnSecondary} mt-2 w-full justify-center`}
              >
                {uploading ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</> : <><i className="fa-solid fa-upload" /> Upload from computer</>}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={async e => { const f = e.target.files?.[0]; if (!f) return; const url = await uploadFile(f); if (url) setModal(m => ({ ...m, val: { ...m.val, src: url } })); e.target.value = '' }} />
            </Field>

            <Field label="Caption / Alt Text">
              <input className={input} value={modal.val.alt} onChange={e => setModal(m => ({ ...m, val: { ...m.val, alt: e.target.value } }))} placeholder="Describe the photo" />
            </Field>

            <Field label="Category">
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setModal(m => ({ ...m, val: { ...m.val, category: c } }))}
                    className={`py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-colors ${
                      modal.val.category === c
                        ? 'bg-[#fd850b] text-black'
                        : 'border border-[#D4A373]/20 text-[#C7B8A8] hover:border-[#fd850b]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Field>

            <label className="flex items-center gap-3 cursor-pointer bg-[#0d0905] rounded-xl px-4 py-3">
              <input
                type="checkbox"
                checked={modal.val.featured}
                onChange={e => setModal(m => ({ ...m, val: { ...m.val, featured: e.target.checked } }))}
                className="w-4 h-4 accent-[#fd850b] rounded"
              />
              <div>
                <p className="text-sm font-bold text-[#FFF7ED]">Featured photo</p>
                <p className="text-xs text-[#C7B8A8]">Shows as a larger tile in the gallery</p>
              </div>
            </label>

            <div className="flex gap-3 pt-1">
              <button onClick={saveModal} className={`${btnPrimary} flex-1 justify-center`}><i className="fa-solid fa-check" /> Save Photo</button>
              <button onClick={() => setModal({ open: false, idx: null, val: BLANK })} className={btnSecondary}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  )
}
