'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AdminLayout } from '../components/AdminLayout'

type Stats = {
  galleryCount: number
  shortVideoCount: number
  promotionCount: number
  activePromotionCount: number
  alacarteCount: number
  grillCount: number
  dishCount: number
  stripCount: number
  cateringPackageCount: number
}

const DEFAULT_STATS: Stats = {
  galleryCount: 0,
  shortVideoCount: 0,
  promotionCount: 0,
  activePromotionCount: 0,
  alacarteCount: 0,
  grillCount: 0,
  dishCount: 0,
  stripCount: 0,
  cateringPackageCount: 0,
}

const PAGE_GROUPS = [
  {
    title: 'Home page',
    liveHref: '/',
    icon: 'fa-house',
    description: 'Use these first when the main landing page changes.',
    items: [
      { href: '/admin/hero-content', label: 'Hero text', helper: 'Tagline, subtitle, stats, and buttons', icon: 'fa-heading' },
      { href: '/admin/page-images', label: 'Hero and backgrounds', helper: 'Home hero, experience, reviews, and CTA photos', icon: 'fa-panorama' },
      { href: '/admin/images', label: 'Dishes and photo strip', helper: 'Featured dishes plus the six-image strip', icon: 'fa-star' },
      { href: '/admin/promo-video', label: 'Promo video', helper: 'The square video section on the home page', icon: 'fa-circle-play' },
    ],
  },
  {
    title: 'Menu page',
    liveHref: '/menu',
    icon: 'fa-utensils',
    description: 'Edit food listings, grill cuts, prices, and menu hero image.',
    items: [
      { href: '/admin/menu', label: 'Menu items', helper: 'A la carte dishes and grill cuts', icon: 'fa-utensils' },
      { href: '/admin/page-images', label: 'Menu hero image', helper: 'Change the top menu page photo', icon: 'fa-image' },
    ],
  },
  {
    title: 'Promotions page',
    liveHref: '/promotions',
    icon: 'fa-tags',
    description: 'Control live offers, event banners, and promotion page content.',
    items: [
      { href: '/admin/events', label: 'Promotions and events', helper: 'Active offers, hero photo, event types, and packages', icon: 'fa-tags' },
    ],
  },
  {
    title: 'Catering page',
    liveHref: '/catering',
    icon: 'fa-truck-fast',
    description: 'Update the catering hero, packages, prices, and inclusions.',
    items: [
      { href: '/admin/catering', label: 'Catering services', helper: 'Packages, price, minimum guests, and hero image', icon: 'fa-truck-fast' },
    ],
  },
  {
    title: 'Gallery page',
    liveHref: '/gallery',
    icon: 'fa-images',
    description: 'Manage photo galleries, story cards, and vertical videos.',
    items: [
      { href: '/admin/gallery', label: 'Gallery photos', helper: 'Photos, categories, featured state, and story cards', icon: 'fa-images' },
      { href: '/admin/short-videos', label: 'Short videos', helper: 'The three portrait videos on the gallery page', icon: 'fa-film' },
    ],
  },
  {
    title: 'About page',
    liveHref: '/about',
    icon: 'fa-book-open',
    description: 'About page images live inside Page Images.',
    items: [
      { href: '/admin/page-images', label: 'About images', helper: 'Hero, story, churrascaria, team, and CTA photos', icon: 'fa-book-open' },
      { href: '/admin/menu', label: 'Team member', helper: 'Chef/team profile data is saved with menu content', icon: 'fa-user-tie' },
    ],
  },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>(DEFAULT_STATS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [gallery, events, images, menu, catering, shortVideos] = await Promise.all([
          fetch('/api/admin/gallery').then(r => r.json()),
          fetch('/api/admin/events').then(r => r.json()),
          fetch('/api/admin/site-images').then(r => r.json()),
          fetch('/api/admin/menu-items').then(r => r.json()),
          fetch('/api/admin/catering-content').then(r => r.json()),
          fetch('/api/admin/short-videos').then(r => r.json()),
        ])

        const promotions = Array.isArray(events.promotions) ? events.promotions : []

        setStats({
          galleryCount: gallery.images?.length ?? 0,
          shortVideoCount: Array.isArray(shortVideos) ? shortVideos.length : 0,
          promotionCount: promotions.length,
          activePromotionCount: promotions.filter((promo: { active?: boolean }) => promo.active).length,
          alacarteCount: menu.alacarte?.length ?? 0,
          grillCount: menu.grillCuts?.length ?? 0,
          dishCount: images.dishes?.length ?? 0,
          stripCount: images.stripImages?.length ?? 0,
          cateringPackageCount: catering.packages?.length ?? 0,
        })
      } catch {
        setStats(DEFAULT_STATS)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const statCards = [
    { label: 'Menu items', value: stats.alacarteCount + stats.grillCount, icon: 'fa-utensils' },
    { label: 'Home dishes', value: stats.dishCount, icon: 'fa-star' },
    { label: 'Gallery photos', value: stats.galleryCount, icon: 'fa-images' },
    { label: 'Short videos', value: stats.shortVideoCount, icon: 'fa-film' },
    { label: 'Active promos', value: `${stats.activePromotionCount}/${stats.promotionCount}`, icon: 'fa-tags' },
    { label: 'Catering plans', value: stats.cateringPackageCount, icon: 'fa-truck-fast' },
  ]

  return (
    <AdminLayout title="Dashboard" subtitle="Choose the website page you want to update">
      <div className="mx-auto max-w-7xl space-y-7 px-4 py-6 sm:px-6 sm:py-8">
        <section className="overflow-hidden rounded-lg border border-[#D4A373]/15 bg-[#130c08]">
          <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
            <div className="p-5 sm:p-7">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#fd850b]">Website manager</p>
              <h2 className="text-2xl font-black uppercase leading-tight text-[#FFF7ED] sm:text-4xl">
                Edit Bravo by page, not by file name.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#C7B8A8]">
                Start with the page your customer sees, then open the matching editor. This dashboard now follows the current public website: Home, Menu, Promotions, Catering, Gallery, and About.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/admin/hero-content" className="inline-flex items-center gap-2 rounded-lg bg-[#fd850b] px-4 py-2.5 text-sm font-black uppercase tracking-wide text-black transition hover:bg-[#ff9a2e]">
                  <i className="fa-solid fa-heading" />
                  Edit home page
                </Link>
                <a href="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[#D4A373]/30 px-4 py-2.5 text-sm font-black uppercase tracking-wide text-[#C7B8A8] transition hover:border-[#fd850b] hover:text-[#fd850b]">
                  <i className="fa-solid fa-eye" />
                  View website
                </a>
              </div>
            </div>

            <div className="border-t border-[#D4A373]/12 bg-[#0d0905] p-5 lg:border-l lg:border-t-0">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-[#C7B8A8]">Current content</p>
              <div className="grid grid-cols-2 gap-2">
                {statCards.map(stat => (
                  <div key={stat.label} className="rounded-lg border border-[#D4A373]/12 bg-[#130c08] p-3">
                    <div className="mb-2 flex items-center gap-2 text-[#fd850b]">
                      <i className={`fa-solid ${stat.icon} text-xs`} />
                      <span className="truncate text-[0.62rem] font-black uppercase tracking-wide text-[#C7B8A8]">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-black text-[#FFF7ED]">
                      {loading ? <span className="text-[#C7B8A8]/35">...</span> : stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#fd850b]">Edit by page</p>
              <p className="mt-1 text-sm text-[#C7B8A8]">Pick the page, then pick the part you need to change.</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {PAGE_GROUPS.map(group => (
              <article key={group.title} className="rounded-lg border border-[#D4A373]/15 bg-[#130c08] p-4">
                <div className="mb-4 flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fd850b]/15 text-[#fd850b]">
                    <i className={`fa-solid ${group.icon} text-sm`} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-black uppercase leading-tight text-[#FFF7ED]">{group.title}</h3>
                      <a href={group.liveHref} target="_blank" rel="noreferrer" className="shrink-0 text-[0.65rem] font-black uppercase tracking-wide text-[#fd850b] hover:text-[#ffb15c]">
                        View
                      </a>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-[#C7B8A8]">{group.description}</p>
                  </div>
                </div>

                <div className="grid gap-2">
                  {group.items.map(item => (
                    <Link
                      key={`${group.title}-${item.href}-${item.label}`}
                      href={item.href}
                      className="group flex items-center gap-3 rounded-lg border border-[#D4A373]/10 bg-[#0d0905] px-3 py-3 transition hover:border-[#fd850b]/45 hover:bg-[#fd850b]/8"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/6 text-[#fd850b]">
                        <i className={`fa-solid ${item.icon} text-xs`} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-black text-[#FFF7ED]">{item.label}</span>
                        <span className="block truncate text-xs text-[#C7B8A8]/75">{item.helper}</span>
                      </span>
                      <i className="fa-solid fa-arrow-right text-[0.65rem] text-[#C7B8A8]/45 transition group-hover:translate-x-1 group-hover:text-[#fd850b]" />
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-[#D4A373]/12 bg-[#130c08] p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fd850b]/15 text-[#fd850b]">
              <i className="fa-solid fa-circle-info text-sm" />
            </span>
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#FFF7ED]">Simple rule</p>
              <p className="mt-1 text-sm leading-6 text-[#C7B8A8]">
                After editing a form, click Save. Most changes appear on the public site immediately. If a page still shows old content, refresh the page once.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  )
}
