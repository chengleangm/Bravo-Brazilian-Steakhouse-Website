'use client'

import { useEffect, useRef, useState } from 'react'
import { AdminLayout, Toast, Modal, Field, input, btnPrimary, btnSecondary } from '../components/AdminLayout'

type Category = 'food' | 'grill' | 'interior' | 'events'
type GalleryImage = { id: number; src: string; category: Category; alt: string; featured: boolean }
type GalleryStory = { title: string; copy: string; image: string; filter: Category; icon: string }
type GalleryData = { heroImage: string; images: GalleryImage[]; stories: GalleryStory[] }

const CATEGORIES: Category[] = ['food', 'grill', 'interior', 'events']
const CAT_COLORS: Record<Category, string> = { food: '#fd850b', grill: '#ef4444', interior: '#60a5fa', events: '#a78bfa' }
const BLANK: GalleryImage = { id: 0, src: '', category: 'food', alt: '', featured: false }
const BLANK_STORY: GalleryStory = { title: '', copy: '', image: '', filter: 'food', icon: 'fa-utensils' }
const ICON_OPTIONS = ['fa-fire-flame-curved', 'fa-utensils', 'fa-champagne-glasses', 'fa-chair', 'fa-star', 'fa-people-group', 'fa-wine-glass', 'fa-camera']

export default function AdminGalleryPage() {
  const [data, setData] = useState<GalleryData | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [modal, setModal] = useState<{ open: boolean; idx: number | null; val: GalleryImage }>({ open: false, idx: null, val: BLANK })
  const [storyModal, setStoryModal] = useState<{ open: boolean; idx: number | null; val: GalleryStory }>({ open: false, idx: null, val: BLANK_STORY })
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const heroFileRef = useRef<HTMLInputElement>(null)
  const storyFileRef = useRef<HTMLInputElement>(null)
  const bulkRef = useRef<HTMLInputElement>(null)
  const [bulkProgress, setBulkProgress] = useState<{ done: number; total: number } | null>(null)

  useEffect(() => {
    fetch('/api/admin/gallery').then(r => r.json()).then(setData)
  }, [])

  async function save(updated: GalleryData) {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/gallery', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) })
      if (!res.ok) { const j = await res.json().catch(() => ({})); alert('Save failed: ' + (j.error ?? res.status)); return }
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
      const json = await res.json()
      if (!res.ok) { alert('Upload failed: ' + (json.error ?? res.status)); return null }
      return json.url
    } catch (e) {
      alert('Upload failed: ' + String(e))
      return null
    } finally {
      setUploading(false)
    }
  }

  async function bulkUpload(files: FileList) {
    if (!data) return
    const total = files.length
    setBulkProgress({ done: 0, total })
    const newImages: GalleryImage[] = []
    for (let i = 0; i < total; i++) {
      const url = await uploadFile(files[i], 'gallery')
      if (url) newImages.push({ id: Date.now() + i, src: url, category: 'food', alt: files[i].name.replace(/\.[^.]+$/, ''), featured: false })
      setBulkProgress({ done: i + 1, total })
    }
    if (newImages.length) {
      const updated = { ...data, images: [...data.images, ...newImages] }
      await save(updated)
    }
    setBulkProgress(null)
  }

  function openAdd() { setModal({ open: true, idx: null, val: { ...BLANK, id: Date.now() } }) }
  function openEdit(i: number) { setModal({ open: true, idx: i, val: { ...data!.images[i] } }) }

  function saveModal() {
    if (!data) return
    if (!modal.val.src) { alert('Please add an image.'); return }
    const images = [...data.images]
    const entry = { ...modal.val, alt: modal.val.alt || 'Gallery photo' }
    if (modal.idx === null) images.push(entry)
    else images[modal.idx] = entry
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

  function openAddStory() { setStoryModal({ open: true, idx: null, val: { ...BLANK_STORY } }) }
  function openEditStory(i: number) { setStoryModal({ open: true, idx: i, val: { ...data!.stories[i] } }) }

  function saveStory() {
    if (!data) return
    if (!storyModal.val.title || !storyModal.val.image) { alert('Title and image are required.'); return }
    const stories = [...(data.stories ?? [])]
    if (storyModal.idx === null) stories.push(storyModal.val)
    else stories[storyModal.idx] = storyModal.val
    save({ ...data, stories })
    setStoryModal({ open: false, idx: null, val: BLANK_STORY })
  }

  function deleteStory(i: number) {
    if (!data || !confirm('Delete this story card?')) return
    save({ ...data, stories: data.stories.filter((_, idx) => idx !== i) })
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
        <div className="flex gap-2">
          <button onClick={() => bulkRef.current?.click()} disabled={!!bulkProgress} className={btnSecondary}>
            {bulkProgress
              ? <><i className="fa-solid fa-spinner fa-spin mr-1" /> {bulkProgress.done}/{bulkProgress.total}</>
              : <><i className="fa-solid fa-images mr-1" /> Bulk Upload</>
            }
          </button>
          <input ref={bulkRef} type="file" accept="image/*" multiple className="hidden"
            onChange={async e => { if (e.target.files?.length) { await bulkUpload(e.target.files); e.target.value = '' } }} />
          <button onClick={openAdd} className={btnPrimary}>
            <i className="fa-solid fa-plus" /> Add Photo
          </button>
        </div>
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

        {/* Story Cards */}
        <div className="bg-[#130c08] border border-[#D4A373]/15 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#C7B8A8]">Story Cards</p>
              <p className="text-xs text-[#C7B8A8]/60 mt-0.5">Highlight cards shown on the Gallery page — clicking one filters photos</p>
            </div>
            <button onClick={openAddStory} className={btnPrimary}>
              <i className="fa-solid fa-plus" /> Add Story
            </button>
          </div>
          {(data.stories ?? []).length === 0 ? (
            <div className="text-center py-10 text-[#C7B8A8]/40 text-sm">
              No story cards yet. Click &quot;Add Story&quot; to create one.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(data.stories ?? []).map((story, i) => (
                <div key={i} className="bg-[#0d0905] border border-[#D4A373]/12 rounded-xl overflow-hidden">
                  <div className="relative aspect-[16/9]">
                    {story.image && <img src={story.image} alt={story.title} className="absolute inset-0 w-full h-full object-cover" />}
                    <span className="absolute top-2 left-2 flex items-center gap-1.5 bg-[#120807]/80 px-2 py-1 rounded-lg text-[0.6rem] font-black uppercase tracking-wider text-[#fd850b]">
                      <i className={`fa-solid ${story.icon}`} />{story.filter}
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-black text-[#FFF7ED] truncate">{story.title}</p>
                    <p className="text-xs text-[#C7B8A8] mt-1 line-clamp-2">{story.copy}</p>
                    <div className="flex gap-1.5 mt-3">
                      <button onClick={() => openEditStory(i)} className="flex-1 py-1.5 bg-[#D4A373]/10 text-[#C7B8A8] rounded-lg text-xs font-bold hover:bg-[#fd850b]/15 hover:text-[#fd850b] transition-colors">
                        Edit
                      </button>
                      <button onClick={() => deleteStory(i)} className="px-2.5 py-1.5 bg-red-900/20 text-red-400 rounded-lg text-xs hover:bg-red-700 hover:text-white transition-colors">
                        <i className="fa-solid fa-trash-can" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
            onClick={() => bulkRef.current?.click()}
            disabled={!!bulkProgress}
            className="aspect-[4/3] border-2 border-dashed border-[#D4A373]/20 rounded-xl flex flex-col items-center justify-center gap-2 text-[#C7B8A8] hover:border-[#fd850b] hover:text-[#fd850b] transition-colors"
          >
            {bulkProgress ? (
              <>
                <i className="fa-solid fa-spinner fa-spin text-2xl" />
                <span className="text-xs font-black uppercase tracking-wider">{bulkProgress.done}/{bulkProgress.total}</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-plus text-2xl" />
                <span className="text-xs font-black uppercase tracking-wider">Add Photo</span>
              </>
            )}
          </button>
        </div>

        {displayed.length === 0 && filter !== 'all' && (
          <div className="text-center py-16 text-[#C7B8A8]">
            <i className="fa-solid fa-image text-3xl mb-3 block text-[#C7B8A8]/30" />
            No photos in &quot;{filter}&quot; category yet.
          </div>
        )}
      </div>

      {/* Add/Edit Photo Modal */}
      {modal.open && (
        <Modal title={modal.idx === null ? 'Add Photo' : 'Edit Photo'} onClose={() => setModal({ open: false, idx: null, val: BLANK })}>
          <div className="space-y-4">
            {modal.val.src && (
              <img src={modal.val.src} alt="" className="h-40 w-full object-cover rounded-xl border border-[#D4A373]/15" />
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
              className={`${btnSecondary} w-full justify-center`}
            >
              {uploading ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</> : <><i className="fa-solid fa-upload" /> Upload from computer</>}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={async e => { const f = e.target.files?.[0]; if (!f) return; const url = await uploadFile(f); if (url) setModal(m => ({ ...m, val: { ...m.val, src: url, alt: f.name.replace(/\.[^.]+$/, '') } })); e.target.value = '' }} />
            <div className="flex gap-3 pt-1">
              <button onClick={saveModal} className={`${btnPrimary} flex-1 justify-center`}><i className="fa-solid fa-check" /> Save Photo</button>
              <button onClick={() => setModal({ open: false, idx: null, val: BLANK })} className={btnSecondary}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add/Edit Story Modal */}
      {storyModal.open && (
        <Modal title={storyModal.idx === null ? 'Add Story Card' : 'Edit Story Card'} onClose={() => setStoryModal({ open: false, idx: null, val: BLANK_STORY })}>
          <div className="space-y-4">
            <Field label="Title">
              <input
                className={input}
                value={storyModal.val.title}
                onChange={e => setStoryModal(m => ({ ...m, val: { ...m.val, title: e.target.value } }))}
                placeholder="e.g. Start with the fire"
              />
            </Field>

            <Field label="Description">
              <input
                className={input}
                value={storyModal.val.copy}
                onChange={e => setStoryModal(m => ({ ...m, val: { ...m.val, copy: e.target.value } }))}
                placeholder="Short description shown on the card"
              />
            </Field>

            <Field label="Image">
              {storyModal.val.image && (
                <img src={storyModal.val.image} alt="" className="h-28 w-full object-cover rounded-xl border border-[#D4A373]/15 mb-2" />
              )}
              <input
                className={input}
                value={storyModal.val.image}
                onChange={e => setStoryModal(m => ({ ...m, val: { ...m.val, image: e.target.value } }))}
                placeholder="Paste image URL…"
              />
              <button
                type="button"
                onClick={() => storyFileRef.current?.click()}
                disabled={uploading}
                className={`${btnSecondary} mt-2 w-full justify-center`}
              >
                {uploading ? <><i className="fa-solid fa-spinner fa-spin" /> Uploading…</> : <><i className="fa-solid fa-upload" /> Upload from computer</>}
              </button>
              <input ref={storyFileRef} type="file" accept="image/*" className="hidden" onChange={async e => { const f = e.target.files?.[0]; if (!f) return; const url = await uploadFile(f, 'gallery'); if (url) setStoryModal(m => ({ ...m, val: { ...m.val, image: url } })); e.target.value = '' }} />
            </Field>

            <Field label="Gallery Filter (clicking card shows this category)">
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setStoryModal(m => ({ ...m, val: { ...m.val, filter: c } }))}
                    className={`py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-colors ${
                      storyModal.val.filter === c
                        ? 'bg-[#fd850b] text-black'
                        : 'border border-[#D4A373]/20 text-[#C7B8A8] hover:border-[#fd850b]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Icon">
              <div className="flex gap-2 items-center mb-2">
                <input
                  className={`${input} flex-1`}
                  value={storyModal.val.icon}
                  onChange={e => setStoryModal(m => ({ ...m, val: { ...m.val, icon: e.target.value } }))}
                  placeholder="fa-fire-flame-curved"
                />
                <span className="flex h-10 w-10 items-center justify-center bg-[#fd850b] text-[#120807] rounded-lg shrink-0">
                  <i className={`fa-solid ${storyModal.val.icon} text-base`} />
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {ICON_OPTIONS.map(ic => (
                  <button
                    key={ic}
                    type="button"
                    title={ic}
                    onClick={() => setStoryModal(m => ({ ...m, val: { ...m.val, icon: ic } }))}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors ${
                      storyModal.val.icon === ic
                        ? 'bg-[#fd850b] text-black'
                        : 'bg-[#D4A373]/10 text-[#C7B8A8] hover:bg-[#fd850b]/20 hover:text-[#fd850b]'
                    }`}
                  >
                    <i className={`fa-solid ${ic}`} />
                  </button>
                ))}
              </div>
            </Field>

            <div className="flex gap-3 pt-1">
              <button onClick={saveStory} className={`${btnPrimary} flex-1 justify-center`}><i className="fa-solid fa-check" /> Save Story</button>
              <button onClick={() => setStoryModal({ open: false, idx: null, val: BLANK_STORY })} className={btnSecondary}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  )
}
