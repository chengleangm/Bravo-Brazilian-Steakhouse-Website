'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/M9Yce1YsMLbfiKqU8'
const DEFAULT_BG = 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1800&q=85'

const LOCATION_DETAILS = [
  {
    label: 'Restaurant',
    value: 'Bravo Steakhouse Churrascaria',
    icon: 'fa-utensils',
  },
  {
    label: 'Area',
    value: 'Toul Tom Poung, Phnom Penh',
    icon: 'fa-location-dot',
  },
  {
    label: 'Best For',
    value: 'Reservations, events, and group dining',
    icon: 'fa-people-group',
  },
]

const socialLinks = [
  { href: 'https://www.facebook.com/bravosteakhousechurrascaria', icon: 'fa-brands fa-facebook-f', label: 'Facebook' },
  { href: 'https://www.instagram.com/bravobraziliansteakhouse/', icon: 'fa-brands fa-instagram', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@bravobraziliansteakhouse', icon: 'fa-brands fa-tiktok', label: 'TikTok' },
  { href: 'https://wa.me/85510231121', icon: 'fa-brands fa-whatsapp', label: 'WhatsApp' },
  { href: 'https://t.me/BravoReservationsTTP', icon: 'fa-brands fa-telegram', label: 'Telegram' },
]

export default function LocationPage() {
  const [bgImage, setBgImage] = useState(DEFAULT_BG)

  useEffect(() => {
    fetch('/api/admin/page-images', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => { if (d.contactFindUs) setBgImage(d.contactFindUs) })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-[#120807]">
      <Header />

      <main>
        <section
          className="relative overflow-hidden bg-dark bg-cover bg-center px-3 py-8 pt-32 text-cream sm:px-8 sm:py-20 sm:pt-40 lg:px-10 lg:py-24 lg:pt-44"
          style={{ backgroundImage: `url('${bgImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/70"></div>
          <div className="absolute inset-x-0 top-0 h-px bg-orange/35"></div>
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mb-6 grid gap-5 sm:mb-10 sm:gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-orange sm:mb-3 sm:text-sm sm:tracking-[0.25em]">Visit Bravo</p>
                <h1 className="font-black text-4xl uppercase leading-none sm:text-5xl md:text-6xl">Location</h1>
                <p className="mt-4 max-w-lg text-sm leading-6 text-cream/70 sm:mt-6 sm:text-lg sm:leading-8">
                  Find BRAVO Steakhouse Churrascaria in Phnom Penh for churrasco, buffet sides, drinks, and celebration tables.
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
                {LOCATION_DETAILS.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded border border-white/10 bg-white/8 p-2.5 sm:block sm:p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-orange text-black sm:mb-4 sm:h-10 sm:w-10">
                      <i className={`fa-solid ${item.icon} text-xs sm:text-base`}></i>
                    </span>
                    <div>
                      <p className="text-[0.66rem] font-black uppercase tracking-[0.16em] text-orange sm:text-xs sm:tracking-[0.18em]">{item.label}</p>
                      <p className="mt-0.5 text-xs font-black leading-4 text-cream sm:mt-2 sm:text-sm sm:leading-6">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid overflow-hidden rounded border border-white/10 bg-[#1f1412] shadow-2xl lg:grid-cols-[0.35fr_0.65fr] lg:items-stretch">
              <div className="border-b border-white/10 p-3 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-orange text-black sm:h-14 sm:w-14">
                    <i className="fa-solid fa-map-location-dot text-sm sm:text-xl"></i>
                  </span>
                  <h2 className="font-black text-[1.18rem] uppercase leading-none sm:text-3xl">Bravo Steakhouse Churrascaria</h2>
                </div>
                <p className="mt-3 text-sm leading-5 text-cream/70 sm:mt-4 sm:text-base sm:leading-7">
                  Phnom Penh, Cambodia. Open daily for fire-grilled Brazilian dining and group bookings.
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3">
                  <div className="rounded border border-white/10 bg-black/20 p-2.5 sm:p-4">
                    <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-orange sm:text-xs sm:tracking-[0.18em]">Service</p>
                    <p className="mt-1 text-[0.76rem] font-black leading-4 sm:mt-2 sm:text-base sm:leading-6">Lunch, dinner, weekend tables</p>
                  </div>
                  <div className="rounded border border-white/10 bg-black/20 p-2.5 sm:p-4">
                    <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-orange sm:text-xs sm:tracking-[0.18em]">Need help?</p>
                    <p className="mt-1 text-[0.76rem] font-black leading-4 sm:mt-2 sm:text-base sm:leading-6">Call, WhatsApp, Telegram</p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-7 sm:gap-3 lg:grid-cols-1">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded bg-orange px-4 py-2 text-[0.72rem] font-black uppercase tracking-wider text-black transition-all hover:-translate-y-1 hover:bg-yellow sm:px-5 sm:py-3 sm:text-sm"
                  >
                    <i className="fa-solid fa-diamond-turn-right mr-2"></i>
                    Open Map
                  </a>
                  <Link
                    href="/contact#reservation"
                    className="inline-flex items-center justify-center rounded border border-white/20 px-4 py-2 text-[0.72rem] font-black uppercase tracking-wider text-cream transition-all hover:border-orange hover:text-orange sm:px-5 sm:py-3 sm:text-sm"
                  >
                    <i className="fa-solid fa-calendar-check mr-2"></i>
                    Book Table
                  </Link>
                </div>

                <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-4 sm:mt-6 sm:pt-5">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="text-base text-cream/50 transition duration-200 hover:text-orange"
                    >
                      <i className={item.icon} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[220px] bg-white/10 sm:min-h-[360px] lg:min-h-[520px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7818.48391752572!2d104.9155739!3d11.5344932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513d047ee727%3A0x8ea23f9513babd9e!2sBravo%20Steakhouse%20Churrascaria!5e0!3m2!1sen!2skh!4v1780715930751!5m2!1sen!2skh"
                  className="absolute inset-0 h-full w-full"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
