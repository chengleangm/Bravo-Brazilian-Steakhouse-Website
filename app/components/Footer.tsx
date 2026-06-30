'use client'

import Image from 'next/image'
import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/promotions', label: 'Promotions' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

const TELEGRAM_URL = 'https://t.me/BravoReservationsTTP'
const FACEBOOK_URL = 'https://www.facebook.com/bravosteakhousechurrascaria'
const INSTAGRAM_URL = 'https://www.instagram.com/bravobraziliansteakhouse/'

const contactLinks = [
  {
    href: 'tel:+85523218211',
    icon: 'fa-phone',
    label: '023 218 211',
  },
  {
    href: 'tel:+85578938333',
    icon: 'fa-phone',
    label: '078 938 333',
  },
  {
    href: 'tel:+85578853441',
    icon: 'fa-phone',
    label: '078 853 441',
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
  {
    href: FACEBOOK_URL,
    icon: 'fa-brands fa-facebook-f',
    label: 'Facebook',
  },
  {
    href: INSTAGRAM_URL,
    icon: 'fa-brands fa-instagram',
    label: 'Instagram',
  },
]

const hours = [
  { day: 'Mon - Fri', time: '11:00 AM – 2:30 PM\n5:30 PM – 10:30 PM' },
  { day: 'Sat - Sun', time: '11:30 AM – 3:00 PM\n5:30 PM – 10:30 PM' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#D4A373]/22 bg-[#050302] px-3 text-[#FFF7ED] sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(253,133,11,0.16),transparent_34%),linear-gradient(180deg,rgba(18,8,7,0.78),rgba(0,0,0,0.96))]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-x-3 gap-y-6 py-8 sm:gap-8 sm:py-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.85fr] lg:py-14">
        <div className="col-span-2 max-w-none lg:col-span-1 lg:max-w-sm">
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
              className="h-16 w-auto object-contain sm:h-24"
            />
          </Link>
          <p className="mt-3 max-w-xs text-xs leading-5 text-[#C7B8A8] sm:mt-5 sm:text-sm sm:leading-7">
            BRAVO Brazilian BBQ.
            <br />
            Fire-grilled dining in Phnom Penh, Cambodia.
          </p>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <h3 className="font-serif text-lg uppercase leading-none text-[#FFF7ED] sm:text-2xl">
            Contact
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-5 sm:grid-cols-1 sm:gap-3">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                className="group flex min-w-0 items-center gap-2 text-[0.72rem] leading-tight text-[#C7B8A8] transition hover:text-[#fd850b] sm:gap-3 sm:text-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#FFF7ED]/6 text-xs text-[#fd850b] ring-1 ring-[#D4A373]/18 transition group-hover:bg-[#fd850b] group-hover:text-black sm:h-9 sm:w-9 sm:text-sm">
                  <i
                    className={
                      item.icon.startsWith('fa-brands')
                        ? item.icon
                        : `fa-solid ${item.icon}`
                    }
                    aria-hidden="true"
                  />
                </span>
                <span className="min-w-0">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg uppercase leading-none text-[#FFF7ED] sm:text-2xl">
            Hours
          </h3>
          <div className="mt-3 grid gap-2 text-[0.72rem] sm:mt-5 sm:gap-3 sm:text-sm">
            {hours.map((item) => (
              <div
                key={item.day}
                className="border-b border-[#D4A373]/12 pb-2 last:border-b-0 sm:pb-3"
              >
                <p className="font-black uppercase text-[#fd850b]">
                  {item.day}
                </p>
                <p className="mt-0.5 whitespace-pre-line leading-tight text-[#C7B8A8] sm:mt-1">
                  {item.time}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg uppercase leading-none text-[#FFF7ED] sm:text-2xl">
            Quick Links
          </h3>
          <nav
            className="mt-3 grid gap-y-2 text-[0.72rem] sm:mt-5 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-3 sm:text-sm lg:grid-cols-1"
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

      <div className="relative mx-auto flex max-w-6xl flex-col gap-3 border-t border-[#D4A373]/14 py-4 text-[0.68rem] leading-5 text-[#C7B8A8] sm:flex-row sm:items-center sm:justify-between sm:py-5 sm:text-xs">
        <p className="max-w-[17rem] sm:max-w-none">
          &copy; {new Date().getFullYear()} BRAVO Brazilian BBQ. All rights
          reserved.
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Link href="/contact#reservation" className="transition hover:text-[#fd850b]">
            Reserve a table
          </Link>
          <a href="tel:+85523218211" className="transition hover:text-[#fd850b]">
            Call now
          </a>
        </div>
      </div>
    </footer>
  )
}
