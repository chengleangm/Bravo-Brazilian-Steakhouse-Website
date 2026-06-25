'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const NAV = [
  { href: '/admin/dashboard', icon: 'fa-gauge-high', label: 'Dashboard' },
  { href: '/admin/page-images', icon: 'fa-panorama', label: 'Page Images' },
  { href: '/admin/menu', icon: 'fa-utensils', label: 'Menu Items' },
  { href: '/admin/images', icon: 'fa-photo-film', label: 'Site Images' },
  { href: '/admin/gallery', icon: 'fa-images', label: 'Gallery' },
  { href: '/admin/events', icon: 'fa-calendar-star', label: 'Events' },
]

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

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin')
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={`
        flex flex-col bg-[#0a0805] border-r border-[#D4A373]/12 w-60 shrink-0
        ${mobile ? 'fixed inset-y-0 left-0 z-50 shadow-2xl' : 'hidden lg:flex'}
      `}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#D4A373]/12">
        <div className="w-9 h-9 rounded-lg bg-[#fd850b] flex items-center justify-center shrink-0">
          <i className="fa-solid fa-fire text-black text-sm" />
        </div>
        <div>
          <p className="font-black text-[0.7rem] uppercase tracking-widest text-[#FFF7ED]">Bravo Admin</p>
          <p className="text-[0.6rem] text-[#C7B8A8]">Content Manager</p>
        </div>
        {mobile && (
          <button onClick={() => setOpen(false)} className="ml-auto text-[#C7B8A8] hover:text-white">
            <i className="fa-solid fa-xmark" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {NAV.map(item => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all duration-150
                ${active
                  ? 'bg-[#fd850b]/15 text-[#fd850b] border border-[#fd850b]/25'
                  : 'text-[#C7B8A8] hover:bg-[#FFF7ED]/5 hover:text-[#FFF7ED]'
                }
              `}
            >
              <i className={`fa-solid ${item.icon} w-4 text-center text-xs ${active ? 'text-[#fd850b]' : 'text-[#C7B8A8]'}`} />
              {item.label}
              {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#fd850b]" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-[#D4A373]/12 p-3 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#C7B8A8] hover:bg-[#FFF7ED]/5 hover:text-[#FFF7ED] transition-colors"
        >
          <i className="fa-solid fa-arrow-up-right-from-square w-4 text-center text-xs" />
          View Website
        </a>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
        >
          <i className="fa-solid fa-right-from-bracket w-4 text-center text-xs" />
          Sign Out
        </button>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-[#0d0905] text-[#FFF7ED] flex">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile sidebar overlay */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />
          <Sidebar mobile />
        </>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-[#D4A373]/12 bg-[#0d0905]/95 backdrop-blur px-4 py-3 sm:px-6">
          {/* Mobile menu */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-[#C7B8A8] hover:text-[#fd850b] transition-colors"
          >
            <i className="fa-solid fa-bars text-lg" />
          </button>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <h1 className="font-black text-base sm:text-lg uppercase tracking-wide text-[#FFF7ED] truncate">{title}</h1>
            {subtitle && <p className="text-[#C7B8A8] text-xs mt-0.5 hidden sm:block">{subtitle}</p>}
          </div>

          {/* Action slot */}
          {action && <div className="shrink-0">{action}</div>}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  // auto-dismiss handled by caller with setTimeout
  return (
    <div className="fixed bottom-6 right-6 z-[100] bg-[#fd850b] text-black font-black text-sm px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom-4">
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`bg-[#130c08] border border-[#D4A373]/25 rounded-2xl w-full shadow-2xl my-auto ${wide ? 'max-w-2xl' : 'max-w-lg'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4A373]/15">
          <h3 className="font-black text-sm uppercase tracking-widest text-[#FFF7ED]">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-[#C7B8A8] hover:bg-[#FFF7ED]/8 hover:text-white transition-colors">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export const input = 'w-full bg-[#0d0905] border border-[#D4A373]/25 text-[#FFF7ED] px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:border-[#fd850b] focus:ring-1 focus:ring-[#fd850b]/20 transition-colors placeholder-[#C7B8A8]/40'
export const btnPrimary = 'flex items-center gap-2 bg-[#fd850b] text-black px-4 py-2.5 rounded-lg text-sm font-black uppercase tracking-wide hover:bg-[#ff9a2e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
export const btnSecondary = 'flex items-center gap-2 border border-[#D4A373]/30 text-[#C7B8A8] px-4 py-2.5 rounded-lg text-sm font-bold hover:border-[#fd850b] hover:text-[#fd850b] transition-colors'
export const btnDanger = 'flex items-center gap-2 bg-red-900/20 text-red-400 px-3 py-2 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition-colors'

export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-wider text-[#C7B8A8] mb-1.5">{label}</label>
      {children}
      {hint && <p className="mt-1 text-[0.68rem] text-[#C7B8A8]/60">{hint}</p>}
    </div>
  )
}

export function SectionCard({ title, count, children }: { title: string; count?: number | string; children: React.ReactNode }) {
  return (
    <div className="bg-[#130c08] border border-[#D4A373]/15 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#D4A373]/10">
        <h2 className="font-black text-sm uppercase tracking-widest text-[#FFF7ED]">{title}</h2>
        {count !== undefined && (
          <span className="bg-[#fd850b]/15 text-[#fd850b] text-xs font-black px-2.5 py-1 rounded-full">{count}</span>
        )}
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}
