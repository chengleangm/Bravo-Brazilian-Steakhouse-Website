'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const socialLinks = [
  { href: 'https://www.facebook.com/bravosteakhousechurrascaria', icon: 'fa-brands fa-facebook-f', label: 'Facebook' },
  { href: 'https://www.instagram.com/bravobraziliansteakhouse/', icon: 'fa-brands fa-instagram', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@bravobraziliansteakhouse', icon: 'fa-brands fa-tiktok', label: 'TikTok' },
  { href: 'https://wa.me/85578938333', icon: 'fa-brands fa-whatsapp', label: 'WhatsApp' },
  { href: 'https://t.me/BravoReservationsTTP', icon: 'fa-brands fa-telegram', label: 'Telegram' },
]

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/promotions', label: 'Promotions' },
  { href: '/catering', label: 'Catering' },
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

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition duration-300 ${
        isScrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.7)]' : ''
      }`}
    >
      {/* Top utility bar — social icons left, utility links right */}
      <div className="hidden border-b border-white/8 bg-[#050302] lg:block">
        <div className="mx-auto flex h-9 max-w-[1560px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="text-[13px] text-white/45 transition duration-200 hover:text-white/90"
              >
                <i className={item.icon} aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="flex items-center text-[10px] font-semibold tracking-[0.1em] uppercase text-white/50">
            <a
              href="tel:+85578938333"
              className="border-r border-white/15 px-3 transition duration-200 hover:text-white/90"
            >
              Call Us
            </a>
            <a
              href="https://wa.me/85578938333"
              target="_blank"
              rel="noreferrer"
              className="border-r border-white/15 px-3 transition duration-200 hover:text-white/90"
            >
              WhatsApp
            </a>
            <span className="pl-3 text-white/30">Phnom Penh, Cambodia</span>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="bg-[#0d0806]">
        <div className="mx-auto flex h-[64px] w-full max-w-[1560px] items-center justify-between lg:pr-0">
          {/* Logo */}
          <div className="pl-5 sm:pl-8 lg:pl-10">
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
                className="h-10 w-auto object-contain sm:h-12"
              />
            </Link>
          </div>

          {/* Desktop nav links */}
          <nav
            aria-label="Main navigation"
            className="hidden flex-1 items-center justify-end gap-6 px-8 lg:flex"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`py-2 text-[11px] font-bold tracking-[0.12em] uppercase transition duration-200 ${
                    isActive ? 'text-white' : 'text-white/65 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Reservations — full-height gold block */}
          <Link
            href="/contact#reservation"
            className="hidden h-[64px] shrink-0 items-center justify-center bg-[#C4A06B] px-8 text-[11px] font-bold tracking-[0.15em] uppercase text-[#1a0d08] transition duration-200 hover:bg-[#d4b07b] lg:inline-flex"
          >
            Reservations
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="mr-4 inline-flex h-11 w-11 items-center justify-center border border-white/20 bg-white/5 lg:hidden"
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
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-[#0d0806] transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? 'max-h-[560px] opacity-100' : 'max-h-0 opacity-0'
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
                    ? 'bg-white/10 text-white'
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
          <div className="mt-4 flex items-center gap-5 border-t border-white/10 px-4 pt-4">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="text-sm text-white/45 transition duration-200 hover:text-white/90"
              >
                <i className={item.icon} aria-hidden="true" />
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
