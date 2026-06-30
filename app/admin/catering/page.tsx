'use client'

import { useEffect, useRef, useState } from 'react'
import { AdminLayout, Toast, btnPrimary, btnSecondary } from '../components/AdminLayout'

type Package = {
  name: string
  price: string
  svc: string
  min: number
  accent: boolean
  badge: string
  features: string[]
}

type CateringContent = {
  heroImage: string
  packages: Package[]
}

const DEFAULT: CateringContent = {
  heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85',
  packages: [
    { name: 'Essential', price: '$22.95', svc: '+10% SVC', min: 50, accent: false, badge: '', features: ['8 grilled meat cuts', '8 hot buffet dishes', 'Salad bar', 'Desserts'] },
    { name: 'Classic',   price: '$26.95', svc: '+10% SVC', min: 40, accent: false, badge: '', features: ['10 grilled meat cuts', '10 hot buffet dishes', 'Salad bar', 'Desserts'] },
    { name: 'Premium',   price: '$29.95', svc: '+10% SVC', min: 30, accent: true,  badge: 'Most Popular', features: ['16 grilled meat cuts', '10 hot buffet dishes', 'Salad bar & cold cuts', 'Desserts'] },
    { name: 'Deluxe',    price: '$39.95', svc: '+10% SVC', min: 30, accent: false, badge: '', features: ['16 grilled meat cuts', '10 hot buffet dishes', 'Salads, cold cuts & seafood', 'Desserts'] },
  ],
}

const inp = 'w-full rounded-lg border border-[#D4A373]/25 bg-[#0d0905] px-2.5 py-1.5 text-xs text-[#FFF7ED] placeholder-[#C7B8A8]/40 transition-colors focus:border-[#fd850b] focus:outline-none focus:ring-1 focus:ring-[#fd850b]/20'
const lbl = 'mb-0.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#C7B8A8]/70'
const card = 'overflow-hidden rounded-xl border border-[#D4A373]/15 bg-[#130c08]'
const cardHead = 'flex items-center justify-between border-b border-[#D4A373]/10 px-3 py-2'

export default function AdminCatering() {
  const [data, setData] = useState<CateringContent>(DEFAULT)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [toast, setToast] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/admin/catering-content')
      .then(r => r.json())
      .then(d => setData({ ...DEFAULT, ...d }))
      .catch(() => {})
  }, [])

  async function uploadHero(file: File) {
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (json.url) setData(prev => ({ ...prev, heroImage: json.url }))
    } catch (error) { alert('Upload failed: ' + String(error)) } finally { setUploading(false) }
  }

  function setPackage<K extends keyof Package>(idx: number, key: K, val: Package[K]) {
    setData(prev => ({ ...prev, packages: prev.packages.map((p, i) => i === idx ? { ...p, [key]: val } : p) }))
  }

  function setFeature(pkgIdx: number, featIdx: number, val: string) {
    setData(prev => ({
      ...prev,
      packages: prev.packages.map((p, i) =>
        i !== pkgIdx ? p : { ...p, features: p.features.map((f, j) => j === featIdx ? val : f) }
      ),
    }))
  }

  function addFeature(pkgIdx: number) {
    setData(prev => ({
      ...prev,
      packages: prev.packages.map((p, i) => i === pkgIdx ? { ...p, features: [...p.features, ''] } : p),
    }))
  }

  function removeFeature(pkgIdx: number, featIdx: number) {
    setData(prev => ({
      ...prev,
      packages: prev.packages.map((p, i) =>
        i === pkgIdx ? { ...p, features: p.features.filter((_, j) => j !== featIdx) } : p
      ),
    }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/catering-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error ?? `HTTP ${res.status}`)
      }
      setToast('Catering content saved!')
    } catch (error) {
      alert('Save failed: ' + String(error instanceof Error ? error.message : error))
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout
      title="Catering"
      action={
        <button onClick={handleSave} disabled={saving} className={btnPrimary}>
          {saving ? 'Saving…' : <><i className="fa-solid fa-floppy-disk mr-1" /> Save</>}
        </button>
      }
    >
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-5 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_2fr] lg:items-start">

        {/* ── Hero Image ── */}
        <div className={card}>
          <div className={cardHead}>
            <span className="text-[0.65rem] font-black uppercase tracking-wider text-[#fd850b]">
              <i className="fa-solid fa-image mr-1.5 opacity-60" />Hero Image
            </span>
          </div>
          <div className="p-3 space-y-2">
            <div className="relative aspect-[16/7] overflow-hidden rounded-lg bg-[#0d0905]">
              {data.heroImage && <img src={data.heroImage} alt="Hero preview" className="h-full w-full object-cover" />}
            </div>
            <div>
              <label className={lbl}>Image URL</label>
              <input
                type="text"
                value={data.heroImage}
                onChange={e => setData(prev => ({ ...prev, heroImage: e.target.value }))}
                placeholder="https://images.unsplash.com/..."
                className={inp}
              />
            </div>
            <button onClick={() => fileRef.current?.click()} disabled={uploading} className={btnSecondary}>
              <i className="fa-solid fa-upload mr-1" />
              {uploading ? 'Uploading…' : 'Upload file'}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={e => { if (e.target.files?.[0]) uploadHero(e.target.files[0]) }} />
          </div>
        </div>

        {/* ── Packages ── */}
        <div className={card}>
          <div className={cardHead}>
            <span className="text-[0.65rem] font-black uppercase tracking-wider text-[#fd850b]">
              <i className="fa-solid fa-box mr-1.5 opacity-60" />Catering Packages
              <span className="ml-1.5 font-normal text-[#C7B8A8]/60">{data.packages.length}</span>
            </span>
          </div>
          <div className="p-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {data.packages.map((pkg, i) => (
              <div key={i} className={`rounded-xl border ${pkg.accent ? 'border-[#fd850b]/30 bg-[#fd850b]/5' : 'border-[#D4A373]/10 bg-[#0d0905]'} p-3 space-y-2`}>

                {/* Card header */}
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black uppercase text-[#FFF7ED]">{pkg.name || `Package ${i + 1}`}</p>
                  {pkg.accent && <span className="text-[0.55rem] font-black uppercase tracking-wider text-[#fd850b] bg-[#fd850b]/15 px-1.5 py-0.5 rounded">Featured</span>}
                </div>

                {/* Fields 2-col */}
                <div className="grid grid-cols-2 gap-1.5">
                  <div>
                    <label className={lbl}>Name</label>
                    <input type="text" value={pkg.name} onChange={e => setPackage(i, 'name', e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Price</label>
                    <input type="text" value={pkg.price} onChange={e => setPackage(i, 'price', e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Min Guests</label>
                    <input type="number" value={pkg.min} onChange={e => setPackage(i, 'min', Number(e.target.value))} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Badge</label>
                    <input type="text" value={pkg.badge} onChange={e => setPackage(i, 'badge', e.target.value)} placeholder="Most Popular" className={inp} />
                  </div>
                </div>

                {/* Featured toggle */}
                <button
                  onClick={() => setPackage(i, 'accent', !pkg.accent)}
                  className={`w-full py-1 text-[0.6rem] font-black uppercase rounded transition-colors ${pkg.accent ? 'bg-[#fd850b] text-black' : 'bg-[#D4A373]/10 text-[#C7B8A8] hover:bg-[#D4A373]/20'}`}
                >
                  {pkg.accent ? 'Featured ✓' : 'Mark as Featured'}
                </button>

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className={lbl}>Included</label>
                    <button onClick={() => addFeature(i)} className="flex h-5 w-5 items-center justify-center rounded bg-[#fd850b]/15 text-[#fd850b] text-[0.6rem] hover:bg-[#fd850b]/30 transition-colors">
                      <i className="fa-solid fa-plus" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {pkg.features.map((feat, j) => (
                      <div key={j} className="flex items-center gap-1">
                        <input
                          type="text"
                          value={feat}
                          onChange={e => setFeature(i, j, e.target.value)}
                          placeholder="e.g. 8 grilled meat cuts"
                          className={inp}
                        />
                        <button onClick={() => removeFeature(i, j)} className="shrink-0 h-6 w-6 flex items-center justify-center bg-red-900/20 text-red-400 rounded text-[0.6rem] hover:bg-red-700 hover:text-white transition-colors">
                          <i className="fa-solid fa-trash" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}
