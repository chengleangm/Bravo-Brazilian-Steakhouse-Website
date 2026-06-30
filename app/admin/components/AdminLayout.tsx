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
      { href: '/admin/page-images', icon: 'fa-panorama', label: 'Page images', desc: 'Home, about, menu photos' },
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
      { href: '/admin/short-videos', icon: 'fa-film', label: 'Gallery videos', desc: 'Short portrait clips' },
    ],
  },
]

const LIVE_PAGE_BY_ADMIN_PATH: Record<string, string> = {
  '/admin/dashboard': '/',
  '/admin/hero-content': '/',
  '/admin/page-images': '/',
  '/admin/images': '/',
  '/admin/promo-video': '/',
  '/admin/menu': '/menu',
  '/admin/events': '/promotions',
  '/admin/catering': '/catering',
  '/admin/gallery': '/gallery',
  '/admin/short-videos': '/gallery',
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
  const activeItem = getActiveItem(pathname)
  const liveHref = LIVE_PAGE_BY_ADMIN_PATH[pathname] ?? '/'

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
      <div className="border-b border-[#D4A373]/12 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fd850b] text-black">
            <i className="fa-solid fa-fire text-sm" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-black uppercase tracking-[0.18em] text-[#FFF7ED]">Bravo Admin</p>
            <p className="text-xs text-[#C7B8A8]">Edit the live website</p>
          </div>
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

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV_GROUPS.map(group => (
          <div key={group.label} className="mb-5">
            <p className="mb-2 px-3 text-[0.62rem] font-black uppercase tracking-[0.16em] text-[#C7B8A8]/55">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map(item => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`group flex items-start gap-3 rounded-lg border px-3 py-2.5 transition ${
                      active
                        ? 'border-[#fd850b]/40 bg-[#fd850b]/14 text-[#FFF7ED]'
                        : 'border-transparent text-[#C7B8A8] hover:border-[#D4A373]/18 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        active ? 'bg-[#fd850b] text-black' : 'bg-white/6 text-[#fd850b]'
                      }`}
                    >
                      <i className={`fa-solid ${item.icon} text-xs`} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-black leading-tight">{item.label}</span>
                      <span className="mt-0.5 block text-[0.68rem] leading-4 text-[#C7B8A8]/70">{item.desc}</span>
                    </span>
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
    <div className="flex min-h-screen bg-[#0d0905] text-[#FFF7ED]">
      <Sidebar />

      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/65 lg:hidden" onClick={() => setOpen(false)} />
          <Sidebar mobile />
        </>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
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

        <main className="flex-1 overflow-auto">{children}</main>
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
