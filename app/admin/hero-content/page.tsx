'use client'

import { useEffect, useState } from 'react'
import { AdminLayout, Toast, input, btnPrimary, btnSecondary } from '../components/AdminLayout'

type Stat = { value: string; label: string }

type HeroContent = {
  tagline: string
  subtitle: string
  stats: Stat[]
  btn1Label: string
  btn1Href: string
  btn2Label: string
  btn2Href: string
}

const DEFAULT: HeroContent = {
  tagline: 'Phnom Penh · Est. 2024',
  subtitle: 'Authentic Brazilian churrasco — fire-carved tableside, everyday.',
  stats: [
    { value: '15+', label: 'Cuts of Meats' },
    { value: '30+', label: 'Side dishes' },
    { value: '100%', label: 'Brazilian style' },
  ],
  btn1Label: 'View Menu',
  btn1Href: '/menu',
  btn2Label: 'Book A Table',
  btn2Href: '/contact#reservation',
}

const fieldClass = input
const label = 'block text-[0.68rem] font-black uppercase tracking-widest text-[#C7B8A8] mb-1.5'
const card = 'bg-[#130c08] border border-[#D4A373]/12 rounded-2xl p-5 space-y-4'

export default function AdminHeroContent() {
  const [data, setData] = useState<HeroContent>(DEFAULT)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    fetch('/api/admin/hero-content')
      .then(r => r.json())
      .then(d => setData({ ...DEFAULT, ...d }))
      .catch(() => {})
  }, [])

  function set<K extends keyof HeroContent>(key: K, val: HeroContent[K]) {
    setData(prev => ({ ...prev, [key]: val }))
  }

  function setStat(i: number, field: keyof Stat, val: string) {
    const stats = data.stats.map((s, idx) => idx === i ? { ...s, [field]: val } : s)
    set('stats', stats)
  }

  function addStat() {
    set('stats', [...data.stats, { value: '', label: '' }])
  }

  function removeStat(i: number) {
    set('stats', data.stats.filter((_, idx) => idx !== i))
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/hero-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error ?? `HTTP ${res.status}`)
      }
      setToast('Hero content saved!')
    } catch (error) {
      alert('Save failed: ' + String(error instanceof Error ? error.message : error))
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout
      title="Hero Content"
      subtitle="Edit the home page hero text, stats, and buttons"
      action={
        <button onClick={handleSave} disabled={saving} className={btnPrimary}>
          {saving ? 'Saving…' : <><i className="fa-solid fa-floppy-disk mr-1" /> Save</>}
        </button>
      }
    >
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-6 space-y-6">

        {/* Live preview strip */}
        <div className="rounded-2xl overflow-hidden border border-[#D4A373]/12 bg-[#120807] px-6 py-8 text-[#FFF7ED]">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-[#fd850b] mb-2">{data.tagline}</p>
          <p className="font-black text-lg leading-snug mb-3">{data.subtitle}</p>
          <div className="flex gap-5 mb-4">
            {data.stats.map((s, i) => (
              <div key={i}>
                <p className="font-black text-lg text-[#fd850b]">{s.value}</p>
                <p className="text-[0.6rem] uppercase tracking-widest text-[#C7B8A8]">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <span className="bg-[#fd850b] text-black px-4 py-1.5 text-xs font-black uppercase">{data.btn1Label}</span>
            <span className="border border-white/40 text-white px-4 py-1.5 text-xs font-black uppercase">{data.btn2Label}</span>
          </div>
        </div>

        {/* Tagline */}
        <div className={card}>
          <p className="text-xs font-black uppercase tracking-widest text-[#fd850b]">Tagline</p>
          <div>
            <label className={label}>Top line (above logo)</label>
            <input
              type="text"
              value={data.tagline}
              onChange={e => set('tagline', e.target.value)}
              placeholder="Phnom Penh · Est. 2024"
              className={fieldClass}
            />
          </div>
        </div>

        {/* Subtitle */}
        <div className={card}>
          <p className="text-xs font-black uppercase tracking-widest text-[#fd850b]">Subtitle</p>
          <div>
            <label className={label}>Text below logo</label>
            <textarea
              value={data.subtitle}
              onChange={e => set('subtitle', e.target.value)}
              rows={2}
              className={`${fieldClass} resize-none`}
            />
          </div>
        </div>

        {/* Stats */}
        <div className={card}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-widest text-[#fd850b]">Stats</p>
            <button onClick={addStat} className={btnSecondary}>
              <i className="fa-solid fa-plus mr-1" /> Add stat
            </button>
          </div>
          <div className="space-y-3">
            {data.stats.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-24">
                  <label className={label}>Value</label>
                  <input
                    type="text"
                    value={s.value}
                    onChange={e => setStat(i, 'value', e.target.value)}
                    placeholder="15+"
                    className={fieldClass}
                  />
                </div>
                <div className="flex-1">
                  <label className={label}>Label</label>
                  <input
                    type="text"
                    value={s.label}
                    onChange={e => setStat(i, 'label', e.target.value)}
                    placeholder="Cuts of Meats"
                    className={fieldClass}
                  />
                </div>
                <button
                  onClick={() => removeStat(i)}
                  className="mt-5 px-3 py-2 bg-red-900/20 text-red-400 rounded-lg text-xs hover:bg-red-700 hover:text-white transition-colors"
                  title="Remove"
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className={card}>
          <p className="text-xs font-black uppercase tracking-widest text-[#fd850b]">Buttons</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <p className="text-[0.68rem] font-black uppercase tracking-widest text-[#FFF7ED]">Primary Button</p>
              <div>
                <label className={label}>Label</label>
                <input type="text" value={data.btn1Label} onChange={e => set('btn1Label', e.target.value)} placeholder="View Menu" className={fieldClass} />
              </div>
              <div>
                <label className={label}>Link</label>
                <input type="text" value={data.btn1Href} onChange={e => set('btn1Href', e.target.value)} placeholder="/menu" className={fieldClass} />
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[0.68rem] font-black uppercase tracking-widest text-[#FFF7ED]">Secondary Button</p>
              <div>
                <label className={label}>Label</label>
                <input type="text" value={data.btn2Label} onChange={e => set('btn2Label', e.target.value)} placeholder="Book A Table" className={fieldClass} />
              </div>
              <div>
                <label className={label}>Link</label>
                <input type="text" value={data.btn2Href} onChange={e => set('btn2Href', e.target.value)} placeholder="/contact#reservation" className={fieldClass} />
              </div>
            </div>
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
