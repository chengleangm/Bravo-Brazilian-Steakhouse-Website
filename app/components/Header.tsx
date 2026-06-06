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
      ? 'border-[#fd850b]/20 bg-black/90 shadow-[0_16px_44px_rgba(0,0,0,0.38)]'
      : 'border-transparent bg-black/42'

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-md transition duration-300 ${headerClass}`}
    >
      <div className="mx-auto flex min-h-[62px] w-full max-w-[1560px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center transition duration-300 hover:scale-[1.03]"
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
          className="hidden items-center gap-6 lg:flex"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-xs font-black uppercase transition duration-300 ${
                  isActive
                    ? 'text-[#fd850b]'
                    : 'text-[#FFF7ED]/86 hover:text-[#FFF7ED]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 -bottom-1 h-0.5 origin-left bg-[#fd850b] transition duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </Link>
            )
          })}
        </nav>

        <Link
          href="/contact#reservation"
          className="hidden min-h-10 items-center justify-center bg-[#fd850b] px-5 py-3 text-xs font-black uppercase text-black shadow-[0_12px_28px_rgba(253,133,11,0.3)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(253,133,11,0.48)] lg:inline-flex"
        >
          Book Now
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-[#fd850b]/35 bg-black/30 lg:hidden"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="relative h-5 w-6">
            <span
              className={`absolute left-0 top-0 h-0.5 w-6 bg-[#FFF7ED] transition duration-300 ${
                isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-6 bg-[#FFF7ED] transition duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-4 h-0.5 w-6 bg-[#FFF7ED] transition duration-300 ${
                isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-[#fd850b]/16 bg-black/96 transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="mx-auto grid max-w-7xl gap-2 px-5 py-5 sm:px-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 text-base font-black uppercase transition ${
                  isActive
                    ? 'bg-[#fd850b]/12 text-[#fd850b]'
                    : 'text-[#FFF7ED]/82 hover:bg-[#FFF7ED]/8 hover:text-[#FFF7ED]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/contact#reservation"
            className="mt-2 inline-flex min-h-[52px] items-center justify-center bg-[#fd850b] px-5 py-4 text-base font-black uppercase text-black"
          >
            Reserve a Table
          </Link>
        </nav>
      </div>
    </header>
  )
}
