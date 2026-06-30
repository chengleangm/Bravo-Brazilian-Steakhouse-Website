'use client'

import { useEffect, useState } from 'react'
import { AdminLayout, Toast, btnPrimary } from '../components/AdminLayout'

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

const inp = 'w-full rounded-lg border border-[#D4A373]/25 bg-[#0d0905] px-2.5 py-1.5 text-xs text-[#FFF7ED] placeholder-[#C7B8A8]/40 transition-colors focus:border-[#fd850b] focus:outline-none focus:ring-1 focus:ring-[#fd850b]/20'
const lbl = 'mb-0.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#C7B8A8]/70'
const card = 'overflow-hidden rounded-xl border border-[#D4A373]/15 bg-[#130c08]'
const cardHead = 'flex items-center justify-between border-b border-[#D4A373]/10 px-3 py-2'

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
      action={
        <button onClick={handleSave} disabled={saving} className={btnPrimary}>
          {saving ? 'Saving…' : <><i className="fa-solid fa-floppy-disk mr-1" /> Save</>}
        </button>
      }
    >
      {toast && <Toast msg={toast} onDone={() => setToast('')} />}

      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-5">

        {/* Compact horizontal preview */}
        <div className="mb-3 rounded-xl border border-[#D4A373]/12 bg-[#120807] px-4 py-3 text-[#FFF7ED]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="min-w-0">
              <p className="text-[0.6rem] font-bold uppercase tracking-widest text-[#fd850b]">{data.tagline || '—'}</p>
              <p className="text-xs font-black leading-snug">{data.subtitle || '—'}</p>
            </div>
            <div className="flex gap-4 shrink-0">
              {data.stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-xs font-black text-[#fd850b]">{s.value}</p>
                  <p className="text-[0.55rem] uppercase tracking-widest text-[#C7B8A8]">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 shrink-0">
              <span className="bg-[#fd850b] text-black px-3 py-1 text-[0.6rem] font-black uppercase">{data.btn1Label}</span>
              <span className="border border-white/40 text-white px-3 py-1 text-[0.6rem] font-black uppercase">{data.btn2Label}</span>
            </div>
          </div>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">

          {/* Left: Tagline + Subtitle + Buttons */}
          <div className="space-y-3">

            {/* Tagline */}
            <div className={card}>
              <div className={cardHead}>
                <span className="text-[0.65rem] font-black uppercase tracking-wider text-[#fd850b]">
                  <i className="fa-solid fa-quote-left mr-1.5 opacity-60" />Tagline
                </span>
              </div>
              <div className="p-3">
                <label className={lbl}>Top line (above logo)</label>
                <input type="text" value={data.tagline} onChange={e => set('tagline', e.target.value)} placeholder="Phnom Penh · Est. 2024" className={inp} />
              </div>
            </div>

            {/* Subtitle */}
            <div className={card}>
              <div className={cardHead}>
                <span className="text-[0.65rem] font-black uppercase tracking-wider text-[#fd850b]">
                  <i className="fa-solid fa-align-left mr-1.5 opacity-60" />Subtitle
                </span>
              </div>
              <div className="p-3">
                <label className={lbl}>Text below logo</label>
                <textarea value={data.subtitle} onChange={e => set('subtitle', e.target.value)} rows={2} className={`${inp} min-h-12 resize-y`} />
              </div>
            </div>

            {/* Buttons */}
            <div className={card}>
              <div className={cardHead}>
                <span className="text-[0.65rem] font-black uppercase tracking-wider text-[#fd850b]">
                  <i className="fa-solid fa-computer-mouse mr-1.5 opacity-60" />Buttons
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 p-3">
                <div>
                  <p className="mb-1.5 text-[0.6rem] font-black uppercase tracking-wider text-[#FFF7ED]">Primary</p>
                  <div className="space-y-1.5">
                    <div>
                      <label className={lbl}>Label</label>
                      <input type="text" value={data.btn1Label} onChange={e => set('btn1Label', e.target.value)} placeholder="View Menu" className={inp} />
                    </div>
                    <div>
                      <label className={lbl}>Link</label>
                      <input type="text" value={data.btn1Href} onChange={e => set('btn1Href', e.target.value)} placeholder="/menu" className={inp} />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mb-1.5 text-[0.6rem] font-black uppercase tracking-wider text-[#FFF7ED]">Secondary</p>
                  <div className="space-y-1.5">
                    <div>
                      <label className={lbl}>Label</label>
                      <input type="text" value={data.btn2Label} onChange={e => set('btn2Label', e.target.value)} placeholder="Book A Table" className={inp} />
                    </div>
                    <div>
                      <label className={lbl}>Link</label>
                      <input type="text" value={data.btn2Href} onChange={e => set('btn2Href', e.target.value)} placeholder="/contact#reservation" className={inp} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Stats */}
          <div className={`${card} self-start`}>
            <div className={cardHead}>
              <span className="text-[0.65rem] font-black uppercase tracking-wider text-[#fd850b]">
                <i className="fa-solid fa-chart-bar mr-1.5 opacity-60" />Stats
              </span>
              <button
                onClick={() => set('stats', [...data.stats, { value: '', label: '' }])}
                className="flex h-6 w-6 items-center justify-center rounded-md bg-[#fd850b]/15 text-[#fd850b] text-xs hover:bg-[#fd850b]/30 transition-colors"
                title="Add stat"
              >
                <i className="fa-solid fa-plus" />
              </button>
            </div>
            <div className="p-3 space-y-2">
              {data.stats.map((s, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg bg-[#0d0905] px-2.5 py-2">
                  <div className="w-16 shrink-0">
                    <label className={lbl}>Value</label>
                    <input type="text" value={s.value} onChange={e => setStat(i, 'value', e.target.value)} placeholder="15+" className={inp} />
                  </div>
                  <div className="flex-1">
                    <label className={lbl}>Label</label>
                    <input type="text" value={s.label} onChange={e => setStat(i, 'label', e.target.value)} placeholder="Cuts of Meats" className={inp} />
                  </div>
                  <button
                    onClick={() => set('stats', data.stats.filter((_, idx) => idx !== i))}
                    className="mt-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-900/20 text-red-400 text-xs hover:bg-red-700 hover:text-white transition-colors"
                  >
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>
              ))}
              {data.stats.length === 0 && (
                <p className="py-4 text-center text-xs text-[#C7B8A8]/50">No stats — add one above</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  )
}
