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

export function Footer() {
  return (
    <footer className="bg-black px-5 py-14 text-[#FFF7ED] sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
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
              className="h-20 w-auto object-contain"
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[#C7B8A8]">
            BRAVO Brazilian BBQ.
            <br />
            Fire-grilled dining in Phnom Penh, Cambodia.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-2xl uppercase text-[#FFF7ED]">
            Contact
          </h3>
          <p className="mt-5 text-sm leading-7 text-[#C7B8A8]">
            +855 78 938 333
            <br />
            Phnom Penh, Cambodia
            <br />
            Facebook
            <br />
            WhatsApp
          </p>
        </div>

        <div>
          <h3 className="font-serif text-2xl uppercase text-[#FFF7ED]">
            Quick Links
          </h3>
          <nav className="mt-5 grid gap-3" aria-label="Footer navigation">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-[#C7B8A8] transition hover:text-[#fd850b]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-center text-xs text-[#C7B8A8]">
        <p>&copy; {new Date().getFullYear()} BRAVO Brazilian BBQ. All rights reserved.</p>
      </div>
    </footer>
  )
}
