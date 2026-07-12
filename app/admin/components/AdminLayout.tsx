'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV_GROUPS = [
  {
    label: 'Home page',
    items: [
      { href: '/admin/dashboard', icon: 'fa-gauge-high', label: 'Dashboard', desc: 'Start here' },
      { href: '/admin/hero-content', icon: 'fa-heading', label: 'Hero text', desc: 'Tagline, stats, buttons' },
      { href: '/admin/home-sections', icon: 'fa-pen-to-square', label: 'Home sections', desc: 'About, offers, CTA text' },
      { href: '/admin/page-images', icon: 'fa-panorama', label: 'Photos', desc: 'Hero photos for all pages' },
      { href: '/admin/images', icon: 'fa-star', label: 'Featured dishes', desc: 'Home dishes and photo strip' },
      { href: '/admin/promo-video', icon: 'fa-circle-play', label: 'Promo video', desc: 'Home video section' },
    ],
  },
  {
    label: 'Website pages',
    items: [
      { href: '/admin/menu', icon: 'fa-utensils', label: 'Menu', desc: 'A la carte and grill cuts' },
      { href: '/admin/events', icon: 'fa-tags', label: 'Promotions', desc: 'Offers and events page' },
      { href: '/admin/catering', icon: 'fa-truck-fast', label: 'Catering', desc: 'Packages and pricing' },
      { href: '/admin/gallery', icon: 'fa-images', label: 'Gallery photos', desc: 'Photos and story cards' },
    ],
  },
]

const LIVE_PAGE_BY_ADMIN_PATH: Record<string, string> = {
  '/admin/dashboard': '/',
  '/admin/hero-content': '/',
  '/admin/home-sections': '/',
  '/admin/page-images': '/',
  '/admin/images': '/',
  '/admin/promo-video': '/',
  '/admin/menu': '/menu',
  '/admin/events': '/promotions',
  '/admin/catering': '/catering',
  '/admin/gallery': '/gallery',
}

const SECTION_HELP: Record<string, { title: string; copy: string; items: string[] }> = {
  '/admin/hero-content': {
    title: 'Home hero',
    copy: 'Controls the first thing customers see on the home page.',
    items: ['Tagline and subtitle', 'Hero stats', 'Primary and secondary buttons'],
  },
  '/admin/home-sections': {
    title: 'Home sections',
    copy: 'Controls the editable text across the rest of the home page.',
    items: ['Welcome section', 'Experience section', 'Special offer cards', 'Reservation CTA'],
  },
  '/admin/page-images': {
    title: 'Photos',
    copy: 'Controls hero and background photos for every page on the site.',
    items: ['Pick a page tab', 'Upload a photo or paste a URL', 'Save after changes'],
  },
  '/admin/images': {
    title: 'Home media',
    copy: 'Controls the home page photo strip and featured dishes cards.',
    items: ['Photo strip order', 'Featured dish text', 'Featured dish images'],
  },
  '/admin/promo-video': {
    title: 'Home promo video',
    copy: 'Controls the square video section on the home page.',
    items: ['Local video path', 'YouTube URL', 'Section title and subtitle'],
  },
  '/admin/menu': {
    title: 'Menu and team',
    copy: 'Controls the Menu page items and the team profile shown on About.',
    items: ['A la carte dishes', 'Grill cuts', 'Team member profile'],
  },
  '/admin/events': {
    title: 'Promotions page',
    copy: 'Controls the public Promotions page and event-style offers.',
    items: ['Active promotion banners', 'Event types', 'Packages and feature cards'],
  },
  '/admin/catering': {
    title: 'Catering page',
    copy: 'Controls catering pricing, package cards, and the catering hero image.',
    items: ['Package price', 'Minimum guests', 'Included features'],
  },
  '/admin/gallery': {
    title: 'Gallery photos',
    copy: 'Controls gallery photos, categories, featured flags, and story cards.',
    items: ['Bulk upload photos', 'Assign categories', 'Build story cards'],
  },
}

type AdminStatus = {
  isHosted: boolean
  contentStorage: 'ready' | 'missing' | 'local'
  mediaStorage: 'ready' | 'missing' | 'local'
  canSaveContent: boolean
  canUploadMedia: boolean
}

function getActiveItem(pathname: string) {
  return NAV_GROUPS.flatMap(group => group.items).find(item => pathname === item.href)
}

export function AdminLayout({
  children,
  title,
  subtitle,
  action,
}: {
  children: React.ReactNode
  title: string
  subtitle?: string
  action?: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<AdminStatus | null>(null)
  const activeItem = getActiveItem(pathname)
  const liveHref = LIVE_PAGE_BY_ADMIN_PATH[pathname] ?? '/'
  const guide = SECTION_HELP[pathname]

  useEffect(() => {
    fetch('/api/admin/status', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(setStatus)
      .catch(() => setStatus(null))
  }, [])

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin')
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={`flex w-[280px] shrink-0 flex-col border-r border-[#D4A373]/12 bg-[#090604] ${
        mobile ? 'fixed inset-y-0 left-0 z-50 shadow-2xl' : 'hidden lg:flex'
      }`}
    >
      <div className="border-b border-[#D4A373]/12 px-4 py-3">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Bravo" className="h-10 w-auto object-contain" />
          <p className="text-[0.65rem] text-[#C7B8A8]">Admin Panel</p>
          {mobile && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-[#C7B8A8] hover:bg-white/8 hover:text-white"
              aria-label="Close menu"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {NAV_GROUPS.map(group => (
          <div key={group.label} className="mb-3">
            <p className="mb-1 px-2 text-[0.6rem] font-black uppercase tracking-[0.16em] text-[#C7B8A8]/50">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map(item => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center gap-2.5 rounded-lg border px-2.5 py-1.5 transition ${
                      active
                        ? 'border-[#fd850b]/40 bg-[#fd850b]/14 text-[#FFF7ED]'
                        : 'border-transparent text-[#C7B8A8] hover:border-[#D4A373]/18 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                        active ? 'bg-[#fd850b] text-black' : 'bg-white/6 text-[#fd850b]'
                      }`}
                    >
                      <i className={`fa-solid ${item.icon} text-[0.6rem]`} />
                    </span>
                    <span className="text-xs font-bold leading-tight">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-[#D4A373]/12 p-3">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-[#C7B8A8] transition hover:bg-white/5 hover:text-white"
        >
          <i className="fa-solid fa-arrow-up-right-from-square w-4 text-center text-xs" />
          View website
        </a>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-red-400 transition hover:bg-red-950/40 hover:text-red-300"
        >
          <i className="fa-solid fa-right-from-bracket w-4 text-center text-xs" />
          Sign out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-[#0d0905] text-[#FFF7ED]">
      <Sidebar />

      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/65 lg:hidden" onClick={() => setOpen(false)} />
          <Sidebar mobile />
        </>
      )}

      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="sticky top-0 z-30 border-b border-[#D4A373]/12 bg-[#0d0905]/95 backdrop-blur">
          <div className="flex min-h-[72px] items-center gap-3 px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D4A373]/18 text-[#C7B8A8] transition hover:border-[#fd850b] hover:text-[#fd850b] lg:hidden"
              aria-label="Open menu"
            >
              <i className="fa-solid fa-bars" />
            </button>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-[0.16em] text-[#fd850b]">
                <span>Admin</span>
                {activeItem && (
                  <>
                    <i className="fa-solid fa-chevron-right text-[0.5rem] text-[#C7B8A8]/45" />
                    <span className="truncate text-[#C7B8A8]">{activeItem.label}</span>
                  </>
                )}
              </div>
              <h1 className="truncate text-lg font-black uppercase leading-tight tracking-wide text-[#FFF7ED] sm:text-xl">
                {title}
              </h1>
              {subtitle && <p className="mt-1 hidden truncate text-xs text-[#C7B8A8] sm:block">{subtitle}</p>}
            </div>

            <a
              href={liveHref}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-lg border border-[#D4A373]/25 px-3 py-2 text-xs font-black uppercase tracking-wide text-[#C7B8A8] transition hover:border-[#fd850b] hover:text-[#fd850b] sm:inline-flex"
            >
              <i className="fa-solid fa-eye" />
              Live page
            </a>

            {action && <div className="shrink-0">{action}</div>}
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {(guide || status?.contentStorage === 'missing' || status?.mediaStorage === 'missing') && (
            <div className="border-b border-[#D4A373]/10 bg-[#100b07] px-4 py-4 sm:px-6">
              <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-stretch">
                {guide && (
                  <div className="flex-1 rounded-lg border border-[#D4A373]/14 bg-[#130c08] p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fd850b]/15 text-[#fd850b]">
                        <i className="fa-solid fa-circle-info text-sm" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-black uppercase tracking-wide text-[#FFF7ED]">{guide.title}</p>
                        <p className="mt-1 text-sm leading-5 text-[#C7B8A8]">{guide.copy}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {guide.items.map(item => (
                            <span key={item} className="rounded bg-[#0d0905] px-2.5 py-1 text-[0.68rem] font-bold text-[#C7B8A8]">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {status && (status.contentStorage === 'missing' || status.mediaStorage === 'missing') && (
                  <div className="rounded-lg border border-red-500/30 bg-red-950/25 p-4 lg:w-[360px]">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/15 text-red-300">
                        <i className="fa-solid fa-triangle-exclamation text-sm" />
                      </span>
                      <div>
                        <p className="text-sm font-black uppercase tracking-wide text-red-200">Host storage setup needed</p>
                        <p className="mt-1 text-xs leading-5 text-red-100/80">
                          {status.contentStorage === 'missing' && 'Connect Cloudflare R2 so text and data changes save on the hosted site. '}
                          {status.mediaStorage === 'missing' && 'Connect Cloudflare R2 so image uploads work on the hosted site.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  )
}

export function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 2600)
    return () => window.clearTimeout(timer)
  }, [onDone])

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex items-center gap-2.5 rounded-lg bg-[#fd850b] px-4 py-3 text-sm font-black text-black shadow-2xl">
      <i className="fa-solid fa-check-circle text-black" /> {msg}
    </div>
  )
}

export function Modal({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string
  children: React.ReactNode
  onClose: () => void
  wide?: boolean
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`my-auto w-full rounded-lg border border-[#D4A373]/25 bg-[#130c08] shadow-2xl ${wide ? 'max-w-2xl' : 'max-w-lg'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#D4A373]/15 px-5 py-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#FFF7ED]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#C7B8A8] transition hover:bg-white/8 hover:text-white"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

export const input = 'w-full rounded-lg border border-[#D4A373]/25 bg-[#0d0905] px-3 py-2.5 text-sm text-[#FFF7ED] placeholder-[#C7B8A8]/40 transition-colors focus:border-[#fd850b] focus:outline-none focus:ring-1 focus:ring-[#fd850b]/20'
export const btnPrimary = 'inline-flex items-center justify-center gap-2 rounded-lg bg-[#fd850b] px-4 py-2.5 text-sm font-black uppercase tracking-wide text-black transition-colors hover:bg-[#ff9a2e] disabled:cursor-not-allowed disabled:opacity-50'
export const btnSecondary = 'inline-flex items-center justify-center gap-2 rounded-lg border border-[#D4A373]/30 px-4 py-2.5 text-sm font-bold text-[#C7B8A8] transition-colors hover:border-[#fd850b] hover:text-[#fd850b]'
export const btnDanger = 'inline-flex items-center justify-center gap-2 rounded-lg bg-red-900/20 px-3 py-2 text-xs font-bold text-red-400 transition-colors hover:bg-red-600 hover:text-white'

export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-[#C7B8A8]">{label}</label>
      {children}
      {hint && <p className="mt-1 text-[0.68rem] text-[#C7B8A8]/60">{hint}</p>}
    </div>
  )
}

export function SectionCard({
  title,
  count,
  children,
}: {
  title: string
  count?: number | string
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#D4A373]/15 bg-[#130c08]">
      <div className="flex items-center justify-between border-b border-[#D4A373]/10 px-5 py-4">
        <h2 className="text-sm font-black uppercase tracking-widest text-[#FFF7ED]">{title}</h2>
        {count !== undefined && (
          <span className="rounded-full bg-[#fd850b]/15 px-2.5 py-1 text-xs font-black text-[#fd850b]">{count}</span>
        )}
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}
