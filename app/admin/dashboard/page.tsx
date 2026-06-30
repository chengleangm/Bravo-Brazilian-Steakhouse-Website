'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AdminLayout } from '../components/AdminLayout'

type Stats = {
  galleryCount: number
  eventsPackages: number
  alacarteCount: number
  grillCount: number
  dishCount: number
  stripCount: number
}

const SECTIONS = [
  {
    href: '/admin/page-images',
    icon: 'fa-panorama',
    label: 'Page Images',
    desc: 'Hero & background images across every page of the site.',
    color: '#fd850b',
    bg: 'from-orange-950/60 to-orange-900/20',
    border: 'border-[#fd850b]/25',
  },
  {
    href: '/admin/menu',
    icon: 'fa-utensils',
    label: 'Menu Items',
    desc: 'À la carte dishes and grill cuts — names, prices, images.',
    color: '#4ade80',
    bg: 'from-green-950/60 to-green-900/20',
    border: 'border-green-700/25',
  },
  {
    href: '/admin/images',
    icon: 'fa-photo-film',
    label: 'Site Images',
    desc: 'Home page photo strip and featured dishes section.',
    color: '#D4A373',
    bg: 'from-amber-950/60 to-amber-900/20',
    border: 'border-amber-700/25',
  },
  {
    href: '/admin/gallery',
    icon: 'fa-images',
    label: 'Gallery',
    desc: 'Upload, categorize, and manage the full photo gallery.',
    color: '#fbbf24',
    bg: 'from-yellow-950/60 to-yellow-900/20',
    border: 'border-yellow-700/25',
  },
  {
    href: '/admin/events',
    icon: 'fa-calendar-star',
    label: 'Events',
    desc: 'Event types, private packages, features, and hero image.',
    color: '#f472b6',
    bg: 'from-pink-950/60 to-pink-900/20',
    border: 'border-pink-700/25',
  },
  {
    href: '/admin/hero-content',
    icon: 'fa-wand-magic-sparkles',
    label: 'Hero Content',
    desc: 'Edit the home page tagline, subtitle, stats, and CTA buttons.',
    color: '#a78bfa',
    bg: 'from-violet-950/60 to-violet-900/20',
    border: 'border-violet-700/25',
  },
  {
    href: '/admin/promo-video',
    icon: 'fa-circle-play',
    label: 'Promo Video',
    desc: 'Manage the video shown on the home page — YouTube or local file.',
    color: '#34d399',
    bg: 'from-emerald-950/60 to-emerald-900/20',
    border: 'border-emerald-700/25',
  },
  {
    href: '/admin/short-videos',
    icon: 'fa-film',
    label: 'Short Videos',
    desc: '3 portrait (9:16) clips shown in the Gallery page.',
    color: '#f87171',
    bg: 'from-red-950/60 to-red-900/20',
    border: 'border-red-700/25',
  },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ galleryCount: 0, eventsPackages: 0, alacarteCount: 0, grillCount: 0, dishCount: 0, stripCount: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [gallery, events, images, menu] = await Promise.all([
          fetch('/api/admin/gallery').then(r => r.json()),
          fetch('/api/admin/events').then(r => r.json()),
          fetch('/api/admin/site-images').then(r => r.json()),
          fetch('/api/admin/menu-items').then(r => r.json()),
        ])
        setStats({
          galleryCount: gallery.images?.length ?? 0,
          eventsPackages: events.packages?.length ?? 0,
          alacarteCount: menu.alacarte?.length ?? 0,
          grillCount: menu.grillCuts?.length ?? 0,
          dishCount: images.dishes?.length ?? 0,
          stripCount: images.stripImages?.length ?? 0,
        })
      } catch {}
      setLoading(false)
    }
    load()
  }, [])

  const statCards = [
    { label: 'Gallery Photos', value: stats.galleryCount, icon: 'fa-images', color: '#fbbf24' },
    { label: 'Menu Items', value: stats.alacarteCount + stats.grillCount, icon: 'fa-utensils', color: '#4ade80' },
    { label: 'Grill Cuts', value: stats.grillCount, icon: 'fa-fire', color: '#fd850b' },
    { label: 'Event Packages', value: stats.eventsPackages, icon: 'fa-calendar-star', color: '#f472b6' },
    { label: 'Featured Dishes', value: stats.dishCount, icon: 'fa-bowl-food', color: '#D4A373' },
    { label: 'Strip Images', value: stats.stripCount, icon: 'fa-photo-film', color: '#60a5fa' },
  ]

  return (
    <AdminLayout title="Dashboard" subtitle="Welcome back — all your content in one place">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">

        {/* Stats row */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#C7B8A8] mb-3">Site Overview</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {statCards.map(s => (
              <div key={s.label} className="bg-[#130c08] border border-[#D4A373]/12 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <i className={`fa-solid ${s.icon} text-xs`} style={{ color: s.color }} />
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[#C7B8A8] truncate">{s.label}</span>
                </div>
                <p className="text-3xl font-black text-[#FFF7ED]">
                  {loading ? <span className="text-[#C7B8A8]/40 text-lg">—</span> : s.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section links */}
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#C7B8A8] mb-3">Manage Content</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECTIONS.map(s => (
              <Link
                key={s.href}
                href={s.href}
                className={`group bg-gradient-to-br ${s.bg} border ${s.border} rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-200`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${s.color}20` }}
                  >
                    <i className={`fa-solid ${s.icon} text-sm`} style={{ color: s.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-sm uppercase tracking-wide text-[#FFF7ED]">{s.label}</p>
                    <p className="text-[#C7B8A8] text-xs leading-5 mt-1">{s.desc}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-black uppercase tracking-widest" style={{ color: s.color }}>
                  Open <i className="fa-solid fa-arrow-right text-[0.55rem] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-[#130c08] border border-[#D4A373]/12 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <i className="fa-solid fa-lightbulb text-[#fd850b] text-sm" />
            <p className="text-xs font-black uppercase tracking-widest text-[#C7B8A8]">Quick Tips</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: 'fa-floppy-disk', tip: 'Always click Save after making changes — edits won\'t apply until saved.' },
              { icon: 'fa-upload', tip: 'You can paste an image URL or upload a file directly from your computer.' },
              { icon: 'fa-rotate', tip: 'Changes go live immediately on the website after saving.' },
              { icon: 'fa-folder-open', tip: 'Uploaded files are stored in public/uploads/ — they\'re permanent.' },
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#0d0905] rounded-xl px-4 py-3">
                <i className={`fa-solid ${t.icon} text-[#fd850b] text-xs mt-0.5 shrink-0`} />
                <p className="text-xs text-[#C7B8A8] leading-5">{t.tip}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}
