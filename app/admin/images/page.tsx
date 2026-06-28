'use client'

import { useEffect, useRef, useState } from 'react'
import { AdminLayout, Toast, Modal, Field, input, btnPrimary, btnSecondary } from '../components/AdminLayout'

type StripImage = { src: string; alt: string }
type Dish = { title: string; description: string; price: string; image: string }
type SiteImagesData = { stripImages: StripImage[]; dishes: Dish[] }

const BLANK_DISH: Dish = { title: '', description: '', price: '', image: '' }

export default function AdminImagesPage() {
  const [data, setData] = useState<SiteImagesData | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [uploading, setUploading] = useState(false)

  const [stripModal, setStripModal] = useState<{ open: boolean; idx: number | null; val: StripImage }>({ open: false, idx: null, val: { src: '', alt: '' } })
  const [dishModal, setDishModal] = useState<{ open: boolean; idx: number | null; val: Dish }>({ open: false, idx: null, val: BLANK_DISH })
  const stripFileRef = useRef<HTMLInputElement>(null)
  const dishFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/admin/site-images').then(r => r.json()).then(setData)
  }, [])

  async function save(updated: SiteImagesData) {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/site-images', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) })
      if (!res.ok) { const j = await res.json().catch(() => ({})); alert('Save failed: ' + (j.error ?? res.status)); return }
      setData(updated)
      setToast('Saved!')
    } finally {
      setSaving(false)
    }
  }

  async function upload(file: File, folder: string): Promise<string | null> {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', folder)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) { alert('Upload failed: ' + (json.error ?? res.status)); return null }
      return json.url
    } catch (e) { alert('Upload failed: ' + String(e)); return null }
    finally { setUploading(false) }
  }

  // ── Strip ──
  function openStripAdd() { setStripModal({ open: true, idx: null, val: { src: '', alt: 'Bravo Brazilian Steakhouse' } }) }
  function openStripEdit(i: number) { if (data) setStripModal({ open: true, idx: i, val: { ...data.stripImages[i] } }) }
  function saveStrip() {
    if (!data || !stripModal.val.src) { alert('Image URL required'); return }
    const imgs = [...data.stripImages]
    if (stripModal.idx === null) imgs.push(stripModal.val)
    else imgs[stripModal.idx] = stripModal.val
    save({ ...data, stripImages: imgs })
    setStripModal({ open: false, idx: null, val: { src: '', alt: '' } })
  }
  function deleteStrip(i: number) {
    if (!data || !confirm('Remove this image?')) return
    save({ ...data, stripImages: data.stripImages.filter((_, idx) => idx !== i) })
  }
  function moveStrip(i: number, dir: -1 | 1) {
    if (!data) return
    const imgs = [...data.stripImages]
    const j = i + dir
    if (j < 0 || j >= imgs.length) return;
    [imgs[i], imgs[j]] = [imgs[j], imgs[i]]
    save({ ...data, stripImages: imgs })
  }

  // ── Dishes ──
  function openDishAdd() { setDishModal({ open: true, idx: null, val: { ...BLANK_DISH } }) }
  function openDishEdit(i: number) { if (data) setDishModal({ open: true, idx: i, val: { ...data.dishes[i] } }) }
  function saveDish() {
    if (!data || !dishModal.val.title || !dishModal.val.image) { alert('Title and image required'); return }
    const dishes = [...data.dishes]
    if (dishModal.idx === null) dishes.push(dishModal.val)
    else dishes[dishModal.idx] = dishModal.val
    save({ ...data, dishes })
    setDishModal({ open: false, idx: null, val: BLANK_DISH })
  }
  function deleteDish(i: number) {
    if (!data || !confirm('Delete this dish?')) return
    save({ ...data, dishes: data.dishes.filter((_, idx) => idx !== i) })
  }

  if (!data) return (
    <AdminLayout title="Site Images">
      <div className="flex items-center justify-center h-64 text-[#C7B8A8]"><i className="fa-solid fa-spinner fa-spin mr-2" /> Loading…</div>
    </AdminLayout>
  )

  return (
    <AdminLayout title="Site Images" subtitle="Home page photo strip and featured dishes">
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">

        {/* ── Photo Strip ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-black text-sm uppercase tracking-widest text-[#FFF7ED]">Photo Strip</p>
              <p className="text-[#C7B8A8] text-xs mt-0.5">{data.stripImages.length} images · full-width strip on the home page</p>
            </div>
            <button onClick={openStripAdd} className={btnPrimary}><i className="fa-solid fa-plus" /> Add Image</button>
          </div>

          {data.stripImages.length === 0 && (
            <div className="border-2 border-dashed border-[#D4A373]/20 rounded-2xl py-12 text-center text-[#C7B8A8]">
              <i className="fa-solid fa-photo-film text-3xl mb-3 block text-[#C7B8A8]/30" />
              No strip images yet.
            </div>
          )}

          <div className="space-y-2">
            {data.stripImages.map((img, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#130c08] border border-[#D4A373]/12 rounded-xl px-4 py-3">
                <img src={img.src} alt={img.alt} className="w-20 h-12 object-cover rounded-lg border border-[#D4A373]/15 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#FFF7ED] truncate">{img.alt}</p>
                  <p className="text-[0.65rem] text-[#C7B8A8] truncate mt-0.5">{img.src}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button onClick={() => moveStrip(i, -1)} disabled={i === 0} className="w-8 h-8 flex items-center justify-center bg-[#D4A373]/10 text-[#C7B8A8] rounded-lg text-xs hover:bg-[#D4A373]/20 disabled:opacity-30 transition-colors" title="Move up">
                    <i className="fa-solid fa-arrow-up" />
                  </button>
                  <button onClick={() => moveStrip(i, 1)} disabled={i === data.stripImages.length - 1} className="w-8 h-8 flex items-center justify-center bg-[#D4A373]/10 text-[#C7B8A8] rounded-lg text-xs hover:bg-[#D4A373]/20 disabled:opacity-30 transition-colors" title="Move down">
                    <i className="fa-solid fa-arrow-down" />
                  </button>
                  <button onClick={() => openStripEdit(i)} className="px-3 py-1.5 bg-[#D4A373]/12 text-[#C7B8A8] rounded-lg text-xs font-bold hover:bg-[#fd850b]/15 hover:text-[#fd850b] transition-colors">Edit</button>
                  <button onClick={() => deleteStrip(i)} className="px-3 py-1.5 bg-red-900/20 text-red-400 rounded-lg text-xs font-bold hover:bg-red-700 hover:text-white transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dishes ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-black text-sm uppercase tracking-widest text-[#FFF7ED]">Featured Dishes</p>
              <p className="text-[#C7B8A8] text-xs mt-0.5">{data.dishes.length} dishes · shown in the home page dishes section</p>
            </div>
            <button onClick={openDishAdd} className={btnPrimary}><i className="fa-solid fa-plus" /> Add Dish</button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.dishes.map((dish, i) => (
              <div key={i} className="bg-[#130c08] border border-[#D4A373]/12 rounded-xl overflow-hidden hover:border-[#fd850b]/25 transition-colors">
                <div className="relative aspect-[4/3] bg-[#0d0905]">
                  {dish.image ? <img src={dish.image} alt={dish.title} className="absolute inset-0 w-full h-full object-cover" /> : <div className="flex h-full items-center justify-center text-[#C7B8A8]/30 text-sm">No image</div>}
                </div>
                <div className="p-4">
                  <p className="font-black text-sm uppercase text-[#FFF7ED]">{dish.title}</p>
                  <p className="text-[#C7B8A8] text-xs mt-1 leading-5 line-clamp-2">{dish.description}</p>
                  <p className="text-[#ffd029] font-black text-sm mt-2">{dish.price}</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => openDishEdit(i)} className="flex-1 py-2 bg-[#D4A373]/12 text-[#C7B8A8] rounded-lg text-xs font-bold hover:bg-[#fd850b]/15 hover:text-[#fd850b] transition-colors">Edit</button>
                    <button onClick={() => deleteDish(i)} className="px-3 py-2 bg-red-900/20 text-red-400 rounded-lg text-xs font-bold hover:bg-red-700 hover:text-white transition-colors"><i className="fa-solid fa-trash-can" /></button>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={openDishAdd} className="aspect-[4/3] border-2 border-dashed border-[#D4A373]/20 rounded-xl flex flex-col items-center justify-center gap-2 text-[#C7B8A8] hover:border-[#fd850b] hover:text-[#fd850b] transition-colors">
              <i className="fa-solid fa-plus text-2xl" />
              <span className="text-xs font-black uppercase tracking-wider">Add Dish</span>
            </button>
          </div>
        </div>
      </div>

      {/* Strip Modal */}
      {stripModal.open && (
        <Modal title={stripModal.idx === null ? 'Add Strip Image' : 'Edit Strip Image'} onClose={() => setStripModal({ open: false, idx: null, val: { src: '', alt: '' } })}>
          <div className="space-y-4">
            <Field label="Image">
              {stripModal.val.src && <img src={stripModal.val.src} alt="" className="h-28 w-full object-cover rounded-xl border border-[#D4A373]/15 mb-2" />}
              <input className={input} value={stripModal.val.src} onChange={e => setStripModal(m => ({ ...m, val: { ...m.val, src: e.target.value } }))} placeholder="Paste URL or upload below" />
              <button type="button" onClick={() => stripFileRef.current?.click()} disabled={uploading} className={`${btnSecondary} mt-2`}>
                {uploading ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</> : <><i className="fa-solid fa-upload" /> Upload file</>}
              </button>
              <input ref={stripFileRef} type="file" accept="image/*" className="hidden" onChange={async e => { const f = e.target.files?.[0]; if (!f) return; const url = await upload(f, 'strip'); if (url) setStripModal(m => ({ ...m, val: { ...m.val, src: url } })); e.target.value = '' }} />
            </Field>
            <Field label="Alt Text / Description">
              <input className={input} value={stripModal.val.alt} onChange={e => setStripModal(m => ({ ...m, val: { ...m.val, alt: e.target.value } }))} placeholder="Bravo Brazilian Steakhouse" />
            </Field>
            <div className="flex gap-3 pt-1">
              <button onClick={saveStrip} className={`${btnPrimary} flex-1 justify-center`}><i className="fa-solid fa-check" /> Save Image</button>
              <button onClick={() => setStripModal({ open: false, idx: null, val: { src: '', alt: '' } })} className={btnSecondary}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Dish Modal */}
      {dishModal.open && (
        <Modal title={dishModal.idx === null ? 'Add Dish' : 'Edit Dish'} onClose={() => setDishModal({ open: false, idx: null, val: BLANK_DISH })}>
          <div className="space-y-4">
            <Field label="Image">
              {dishModal.val.image && <img src={dishModal.val.image} alt="" className="h-28 w-full object-cover rounded-xl border border-[#D4A373]/15 mb-2" />}
              <input className={input} value={dishModal.val.image} onChange={e => setDishModal(m => ({ ...m, val: { ...m.val, image: e.target.value } }))} placeholder="Paste URL or upload" />
              <button type="button" onClick={() => dishFileRef.current?.click()} disabled={uploading} className={`${btnSecondary} mt-2`}>
                {uploading ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</> : <><i className="fa-solid fa-upload" /> Upload file</>}
              </button>
              <input ref={dishFileRef} type="file" accept="image/*" className="hidden" onChange={async e => { const f = e.target.files?.[0]; if (!f) return; const url = await upload(f, 'dishes'); if (url) setDishModal(m => ({ ...m, val: { ...m.val, image: url } })); e.target.value = '' }} />
            </Field>
            <Field label="Dish Name">
              <input className={input} value={dishModal.val.title} onChange={e => setDishModal(m => ({ ...m, val: { ...m.val, title: e.target.value } }))} placeholder="e.g. Garlic Rumpsteak" />
            </Field>
            <Field label="Description">
              <textarea className={`${input} resize-none`} rows={2} value={dishModal.val.description} onChange={e => setDishModal(m => ({ ...m, val: { ...m.val, description: e.target.value } }))} placeholder="Short description…" />
            </Field>
            <Field label="Price">
              <input className={input} value={dishModal.val.price} onChange={e => setDishModal(m => ({ ...m, val: { ...m.val, price: e.target.value } }))} placeholder="e.g. $12.95" />
            </Field>
            <div className="flex gap-3 pt-1">
              <button onClick={saveDish} className={`${btnPrimary} flex-1 justify-center`}><i className="fa-solid fa-check" /> Save Dish</button>
              <button onClick={() => setDishModal({ open: false, idx: null, val: BLANK_DISH })} className={btnSecondary}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  )
}
