'use client'

import { useEffect, useRef, useState } from 'react'
import { AdminLayout, Toast, input, btnPrimary, btnSecondary } from '../components/AdminLayout'

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

const lbl = 'block text-[0.68rem] font-black uppercase tracking-widest text-[#C7B8A8] mb-1.5'
const card = 'bg-[#130c08] border border-[#D4A373]/12 rounded-2xl p-5 space-y-4'

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
    } catch { alert('Upload failed') } finally { setUploading(false) }
  }

  function setPackage<K extends keyof Package>(idx: number, key: K, val: Package[K]) {
    setData(prev => {
      const pkgs = prev.packages.map((p, i) => i === idx ? { ...p, [key]: val } : p)
      return { ...prev, packages: pkgs }
    })
  }

  function setFeature(pkgIdx: number, featIdx: number, val: string) {
    setData(prev => {
      const pkgs = prev.packages.map((p, i) => {
        if (i !== pkgIdx) return p
        const features = p.features.map((f, j) => j === featIdx ? val : f)
        return { ...p, features }
      })
      return { ...prev, packages: pkgs }
    })
  }

  function addFeature(pkgIdx: number) {
    setData(prev => {
      const pkgs = prev.packages.map((p, i) =>
        i === pkgIdx ? { ...p, features: [...p.features, ''] } : p
      )
      return { ...prev, packages: pkgs }
    })
  }

  function removeFeature(pkgIdx: number, featIdx: number) {
    setData(prev => {
      const pkgs = prev.packages.map((p, i) =>
        i === pkgIdx ? { ...p, features: p.features.filter((_, j) => j !== featIdx) } : p
      )
      return { ...prev, packages: pkgs }
    })
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/catering-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setToast('Catering content saved!')
    } catch {
      alert('Save failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout
      title="Catering Services"
      subtitle="Edit the catering page hero and pricing packages"
      action={
        <button onClick={handleSave} disabled={saving} className={btnPrimary}>
          {saving ? 'Saving…' : <><i className="fa-solid fa-floppy-disk mr-1" /> Save</>}
        </button>
      }
    >
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-6 space-y-6">

        {/* Hero Image */}
        <div className={card}>
          <p className="text-xs font-black uppercase tracking-widest text-[#fd850b]">Hero Image</p>
          <div className="relative aspect-[16/5] overflow-hidden rounded-xl bg-[#0d0905]">
            {data.heroImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.heroImage} alt="Hero preview" className="h-full w-full object-cover" />
            )}
          </div>
          <div>
            <label className={lbl}>Image URL</label>
            <input
              type="text"
              value={data.heroImage}
              onChange={e => setData(prev => ({ ...prev, heroImage: e.target.value }))}
              placeholder="https://images.unsplash.com/..."
              className={input}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className={btnSecondary}
            >
              <i className="fa-solid fa-upload mr-1" />
              {uploading ? 'Uploading…' : 'Upload file'}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={e => { if (e.target.files?.[0]) uploadHero(e.target.files[0]) }} />
          </div>
        </div>

        {/* Packages */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#fd850b] mb-3">Catering Packages</p>
          <div className="grid gap-5 sm:grid-cols-2">
            {data.packages.map((pkg, i) => (
              <div key={i} className={card}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-[#FFF7ED]">{pkg.name || `Package ${i + 1}`}</p>
                  {pkg.accent && <span className="text-[0.6rem] font-black uppercase tracking-widest text-[#fd850b] bg-[#fd850b]/10 px-2 py-0.5 rounded">Featured</span>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={lbl}>Package Name</label>
                    <input type="text" value={pkg.name} onChange={e => setPackage(i, 'name', e.target.value)} className={input} />
                  </div>
                  <div>
                    <label className={lbl}>Price (e.g. $22.95)</label>
                    <input type="text" value={pkg.price} onChange={e => setPackage(i, 'price', e.target.value)} className={input} />
                  </div>
                  <div>
                    <label className={lbl}>Min Guests</label>
                    <input type="number" value={pkg.min} onChange={e => setPackage(i, 'min', Number(e.target.value))} className={input} />
                  </div>
                  <div>
                    <label className={lbl}>Badge (e.g. Most Popular)</label>
                    <input type="text" value={pkg.badge} onChange={e => setPackage(i, 'badge', e.target.value)} placeholder="Leave blank for none" className={input} />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className={lbl + ' mb-0'}>Featured Package</label>
                  <button
                    onClick={() => setPackage(i, 'accent', !pkg.accent)}
                    className={`px-3 py-1.5 text-xs font-black uppercase rounded transition-colors ${pkg.accent ? 'bg-[#fd850b] text-black' : 'bg-[#0d0905] text-[#C7B8A8] border border-[#D4A373]/20'}`}
                  >
                    {pkg.accent ? 'Yes (highlighted)' : 'No'}
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className={lbl + ' mb-0'}>Features (what&apos;s included)</label>
                    <button onClick={() => addFeature(i)} className={btnSecondary + ' text-[0.6rem] px-2 py-1'}>
                      <i className="fa-solid fa-plus mr-1" /> Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {pkg.features.map((feat, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feat}
                          onChange={e => setFeature(i, j, e.target.value)}
                          placeholder="e.g. 8 grilled meat cuts"
                          className={input}
                        />
                        <button
                          onClick={() => removeFeature(i, j)}
                          className="shrink-0 px-2.5 py-2 bg-red-900/20 text-red-400 rounded text-xs hover:bg-red-700 hover:text-white transition-colors"
                        >
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

        <div className="flex justify-end pb-6">
          <button onClick={handleSave} disabled={saving} className={btnPrimary}>
            {saving ? 'Saving…' : <><i className="fa-solid fa-floppy-disk mr-1" /> Save All Changes</>}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
