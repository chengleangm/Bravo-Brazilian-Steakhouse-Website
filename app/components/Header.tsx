'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const headerClass =
    isScrolled || isMobileMenuOpen
      ? 'bg-[#0d0806] shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
      : 'bg-[#0d0806]'

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition duration-300 ${headerClass}`}
    >
      <div className="mx-auto flex min-h-[70px] w-full max-w-[1560px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center transition duration-300 hover:opacity-80"
          aria-label="Bravo Brazilian Steakhouse home"
        >
          <Image
            src="/logo.png"
            alt="Bravo Brazilian Steakhouse"
            width={180}
            height={125}
            priority
            className="h-12 w-auto object-contain sm:h-14"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 text-[11px] font-bold tracking-[0.12em] uppercase transition duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Link
          href="/contact#reservation"
          className="hidden min-h-[70px] items-center justify-center bg-[#C4A06B] px-7 text-[11px] font-bold tracking-[0.12em] uppercase text-[#1a0d08] transition duration-200 hover:bg-[#d4b07b] lg:inline-flex"
        >
          Reservations
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-white/20 bg-white/5 lg:hidden"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="relative h-5 w-6">
            <span
              className={`absolute left-0 top-0 h-0.5 w-6 bg-white transition duration-300 ${
                isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-6 bg-white transition duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-4 h-0.5 w-6 bg-white transition duration-300 ${
                isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-[#0d0806] transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="mx-auto grid max-w-7xl gap-1 px-5 py-5 sm:px-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 text-sm font-bold tracking-[0.1em] uppercase transition ${
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/contact#reservation"
            className="mt-3 inline-flex min-h-[52px] items-center justify-center bg-[#C4A06B] px-5 py-4 text-sm font-bold tracking-[0.1em] uppercase text-[#1a0d08]"
          >
            Reservations
          </Link>
        </nav>
      </div>
    </header>
  )
}
