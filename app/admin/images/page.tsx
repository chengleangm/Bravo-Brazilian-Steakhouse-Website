'use client'

import { useEffect, useRef, useState } from 'react'
import { AdminLayout, Toast, Modal, Field, input, btnPrimary, btnSecondary } from '../components/AdminLayout'

type StripImage = { src: string; alt: string }
type Dish = { title: string; description: string; price: string; image: string }
type SiteImagesData = { stripImages: StripImage[]; dishes: Dish[] }

const BLANK_DISH: Dish = { title: '', description: '', price: '', image: '' }

const card = 'overflow-hidden rounded-xl border border-[#D4A373]/15 bg-[#130c08]'
const cardHead = 'flex items-center justify-between border-b border-[#D4A373]/10 px-3 py-2'

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
    <AdminLayout title="Home Media">
      <div className="flex items-center justify-center h-64 text-[#C7B8A8]"><i className="fa-solid fa-spinner fa-spin mr-2" /> Loading…</div>
    </AdminLayout>
  )

  return (
    <AdminLayout title="Home Media">
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-5 grid grid-cols-1 gap-3 lg:grid-cols-[2fr_3fr]">

        {/* ── Photo Strip ── */}
        <div className={`${card} flex flex-col`}>
          <div className={cardHead}>
            <span className="text-[0.65rem] font-black uppercase tracking-wider text-[#fd850b]">
              <i className="fa-solid fa-film mr-1.5 opacity-60" />Photo Strip
              <span className="ml-1.5 font-normal text-[#C7B8A8]/60">{data.stripImages.length}</span>
            </span>
            <button onClick={openStripAdd} className="flex h-6 w-6 items-center justify-center rounded-md bg-[#fd850b]/15 text-[#fd850b] text-xs hover:bg-[#fd850b]/30 transition-colors" title="Add image">
              <i className="fa-solid fa-plus" />
            </button>
          </div>

          <div className="flex-1 p-2 space-y-1.5">
            {data.stripImages.length === 0 && (
              <div className="py-10 text-center text-xs text-[#C7B8A8]/40">No strip images yet</div>
            )}
            {data.stripImages.map((img, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg bg-[#0d0905] px-2.5 py-2">
                <img src={img.src} alt={img.alt} className="w-14 h-9 object-cover rounded shrink-0 border border-[#D4A373]/10" />
                <div className="flex-1 min-w-0">
                  <p className="text-[0.7rem] font-bold text-[#FFF7ED] truncate">{img.alt}</p>
                  <p className="text-[0.6rem] text-[#C7B8A8]/50 truncate">{img.src.split('/').pop()}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => moveStrip(i, -1)} disabled={i === 0} className="h-6 w-6 flex items-center justify-center rounded bg-[#D4A373]/10 text-[#C7B8A8] text-[0.6rem] hover:bg-[#D4A373]/20 disabled:opacity-30 transition-colors">
                    <i className="fa-solid fa-arrow-up" />
                  </button>
                  <button onClick={() => moveStrip(i, 1)} disabled={i === data.stripImages.length - 1} className="h-6 w-6 flex items-center justify-center rounded bg-[#D4A373]/10 text-[#C7B8A8] text-[0.6rem] hover:bg-[#D4A373]/20 disabled:opacity-30 transition-colors">
                    <i className="fa-solid fa-arrow-down" />
                  </button>
                  <button onClick={() => openStripEdit(i)} className="h-6 px-2 flex items-center rounded bg-[#D4A373]/10 text-[#C7B8A8] text-[0.6rem] font-bold hover:bg-[#fd850b]/15 hover:text-[#fd850b] transition-colors">
                    Edit
                  </button>
                  <button onClick={() => deleteStrip(i)} className="h-6 w-6 flex items-center justify-center rounded bg-red-900/20 text-red-400 text-[0.6rem] hover:bg-red-700 hover:text-white transition-colors">
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Featured Dishes ── */}
        <div className={`${card} flex flex-col`}>
          <div className={cardHead}>
            <span className="text-[0.65rem] font-black uppercase tracking-wider text-[#fd850b]">
              <i className="fa-solid fa-utensils mr-1.5 opacity-60" />Featured Dishes
              <span className="ml-1.5 font-normal text-[#C7B8A8]/60">{data.dishes.length}</span>
            </span>
            <button onClick={openDishAdd} className="flex h-6 w-6 items-center justify-center rounded-md bg-[#fd850b]/15 text-[#fd850b] text-xs hover:bg-[#fd850b]/30 transition-colors" title="Add dish">
              <i className="fa-solid fa-plus" />
            </button>
          </div>

          <div className="flex-1 p-2">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {data.dishes.map((dish, i) => (
                <div key={i} className="flex flex-col rounded-xl overflow-hidden bg-[#0d0905] border border-[#D4A373]/10 hover:border-[#fd850b]/20 transition-colors">
                  <div className="relative aspect-[4/3]">
                    {dish.image
                      ? <img src={dish.image} alt={dish.title} className="absolute inset-0 w-full h-full object-cover" />
                      : <div className="flex h-full items-center justify-center text-[#C7B8A8]/30 text-[0.6rem]">No image</div>
                    }
                  </div>
                  <div className="flex flex-col flex-1 p-2">
                    <p className="text-[0.7rem] font-black uppercase text-[#FFF7ED] leading-tight line-clamp-1">{dish.title}</p>
                    <p className="text-[#ffd029] font-black text-[0.7rem] mt-0.5">{dish.price}</p>
                    <div className="flex gap-1 mt-auto pt-1.5">
                      <button onClick={() => openDishEdit(i)} className="flex-1 py-1 rounded bg-[#D4A373]/12 text-[#C7B8A8] text-[0.6rem] font-bold hover:bg-[#fd850b]/15 hover:text-[#fd850b] transition-colors">Edit</button>
                      <button onClick={() => deleteDish(i)} className="px-2 py-1 rounded bg-red-900/20 text-red-400 text-[0.6rem] hover:bg-red-700 hover:text-white transition-colors"><i className="fa-solid fa-trash-can" /></button>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={openDishAdd} className="aspect-[4/3] border-2 border-dashed border-[#D4A373]/15 rounded-xl flex flex-col items-center justify-center gap-1 text-[#C7B8A8]/40 hover:border-[#fd850b] hover:text-[#fd850b] transition-colors">
                <i className="fa-solid fa-plus text-lg" />
                <span className="text-[0.6rem] font-black uppercase tracking-wider">Add</span>
              </button>
            </div>
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
