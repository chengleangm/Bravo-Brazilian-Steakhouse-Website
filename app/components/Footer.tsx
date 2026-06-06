'use client'

import Image from 'next/image'
import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

const TELEGRAM_URL = 'https://t.me/BravoReservationsTTP'

const contactLinks = [
  {
    href: 'tel:+85578938333',
    icon: 'fa-phone',
    label: '+855 78 938 333',
  },
  {
    href: '/contact',
    icon: 'fa-map-pin',
    label: 'Phnom Penh, Cambodia',
  },
  {
    href: 'https://wa.me/85578938333',
    icon: 'fa-brands fa-whatsapp',
    label: 'WhatsApp booking',
  },
  {
    href: TELEGRAM_URL,
    icon: 'fa-brands fa-telegram',
    label: 'Telegram reservations',
  },
]

const hours = [
  { day: 'Mon - Fri', time: '11:00 AM - 11:00 PM' },
  { day: 'Saturday', time: '10:00 AM - 12:00 AM' },
  { day: 'Sunday', time: '10:00 AM - 11:00 PM' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#D4A373]/22 bg-[#050302] px-5 text-[#FFF7ED] sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(253,133,11,0.16),transparent_34%),linear-gradient(180deg,rgba(18,8,7,0.78),rgba(0,0,0,0.96))]" />

      <div className="relative mx-auto grid max-w-6xl gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.85fr] lg:py-14">
        <div className="max-w-sm">
          <Link
            href="/"
            className="inline-flex items-center transition duration-300 hover:scale-[1.03]"
            aria-label="Bravo Brazilian Steakhouse home"
          >
            <Image
              src="/logo.png"
              alt="Bravo Brazilian Steakhouse"
              width={240}
              height={166}
              className="h-24 w-auto object-contain"
            />
          </Link>
          <p className="mt-5 text-sm leading-7 text-[#C7B8A8]">
            BRAVO Brazilian BBQ.
            <br />
            Fire-grilled dining in Phnom Penh, Cambodia.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://wa.me/85578938333"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center border border-[#D4A373]/25 bg-[#FFF7ED]/6 text-[#fd850b] transition hover:-translate-y-1 hover:border-[#fd850b] hover:bg-[#fd850b] hover:text-black"
              aria-label="Message BRAVO on WhatsApp"
            >
              <i className="fa-brands fa-whatsapp" aria-hidden="true" />
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center border border-[#D4A373]/25 bg-[#FFF7ED]/6 text-[#fd850b] transition hover:-translate-y-1 hover:border-[#fd850b] hover:bg-[#fd850b] hover:text-black"
              aria-label="Message BRAVO on Telegram"
            >
              <i className="fa-brands fa-telegram" aria-hidden="true" />
            </a>
            <Link
              href="/contact"
              className="flex h-10 w-10 items-center justify-center border border-[#D4A373]/25 bg-[#FFF7ED]/6 text-[#fd850b] transition hover:-translate-y-1 hover:border-[#fd850b] hover:bg-[#fd850b] hover:text-black"
              aria-label="Open BRAVO contact page"
            >
              <i className="fa-solid fa-envelope" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-2xl uppercase leading-none text-[#FFF7ED]">
            Contact
          </h3>
          <div className="mt-5 grid gap-3">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                className="group flex items-center gap-3 text-sm text-[#C7B8A8] transition hover:text-[#fd850b]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#FFF7ED]/6 text-[#fd850b] ring-1 ring-[#D4A373]/18 transition group-hover:bg-[#fd850b] group-hover:text-black">
                  <i
                    className={
                      item.icon.startsWith('fa-brands')
                        ? item.icon
                        : `fa-solid ${item.icon}`
                    }
                    aria-hidden="true"
                  />
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-2xl uppercase leading-none text-[#FFF7ED]">
            Hours
          </h3>
          <div className="mt-5 grid gap-3 text-sm">
            {hours.map((item) => (
              <div
                key={item.day}
                className="border-b border-[#D4A373]/12 pb-3 last:border-b-0"
              >
                <p className="font-black uppercase text-[#fd850b]">
                  {item.day}
                </p>
                <p className="mt-1 text-[#C7B8A8]">{item.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-2xl uppercase leading-none text-[#FFF7ED]">
            Quick Links
          </h3>
          <nav
            className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-sm lg:grid-cols-1"
            aria-label="Footer navigation"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-bold text-[#C7B8A8] transition hover:text-[#fd850b]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-3 border-t border-[#D4A373]/14 py-5 text-xs text-[#C7B8A8] sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} BRAVO Brazilian BBQ. All rights
          reserved.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/contact#reservation" className="transition hover:text-[#fd850b]">
            Reserve a table
          </Link>
          <a href="tel:+85578938333" className="transition hover:text-[#fd850b]">
            Call now
          </a>
        </div>
      </div>
    </footer>
  )
}
