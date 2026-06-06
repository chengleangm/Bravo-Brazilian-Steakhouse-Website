'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const ctaImage =
  'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=2000&q=90'

const bookingDetails = [
  {
    icon: 'fa-calendar-check',
    label: 'Quick booking',
    value: 'Choose your date and party size',
  },
  {
    icon: 'fa-clock',
    label: 'Open daily',
    value: 'Lunch, dinner, and weekend gatherings',
  },
  {
    icon: 'fa-fire-flame-curved',
    label: 'Churrasco service',
    value: 'Fire-grilled cuts served tableside',
  },
]

export function ReservationCTA() {
  return (
    <section className="relative overflow-hidden bg-[#120807] px-5 py-20 text-[#FFF7ED] sm:px-8 lg:px-10 lg:py-28">
      <Image
        src={ctaImage}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-18"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,8,7,0.98)_0%,rgba(18,8,7,0.86)_48%,rgba(18,8,7,0.62)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[#D4A373]/35" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-[#D4A373]/35" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.72 }}
        className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
      >
        <div>
          <p className="mb-4 text-xs font-black uppercase text-[#fd850b]">
            Book Bravo
          </p>
          <h2 className="font-serif text-5xl uppercase leading-[0.88] sm:text-6xl lg:text-7xl">
            Reserve your table today
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#f4d8c5] sm:text-lg">
            Bring your guests to the flame. Book a table for churrasco,
            celebrations, family dinners, and nights built around bold Brazilian
            steakhouse flavor.
          </p>

          <div className="mt-8 grid gap-3">
            {bookingDetails.map((detail) => (
              <div
                key={detail.label}
                className="flex items-start gap-4 border border-[#D4A373]/18 bg-[#FFF7ED]/6 p-4 shadow-[0_18px_48px_rgba(0,0,0,0.22)] backdrop-blur"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#fd850b]/18 text-[#fd850b]">
                  <i className={`fa-solid ${detail.icon}`} aria-hidden="true" />
                </span>
                <span>
                  <strong className="block text-sm font-black uppercase text-[#FFF7ED]">
                    {detail.label}
                  </strong>
                  <span className="mt-1 block text-sm leading-6 text-[#C7B8A8]">
                    {detail.value}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#reservation"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#fd850b] px-6 py-3 text-xs font-black uppercase text-black shadow-[0_18px_42px_rgba(253,133,11,0.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_62px_rgba(253,133,11,0.5)] sm:text-sm"
            >
              <i className="fa-solid fa-calendar-check" aria-hidden="true" />
              Book Now
            </Link>
            <a
              href="https://wa.me/85578938333"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#FFF7ED]/50 bg-black/20 px-6 py-3 text-xs font-black uppercase text-[#FFF7ED] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#fd850b] hover:bg-[#fd850b] hover:text-black sm:text-sm"
            >
              <i className="fa-brands fa-whatsapp" aria-hidden="true" />
              Message Us
            </a>
          </div>
        </div>

        <div className="relative border border-[#D4A373]/22 bg-[#FFF7ED]/6 p-3 shadow-[0_32px_90px_rgba(0,0,0,0.48)] backdrop-blur">
          <div className="relative aspect-[16/11] overflow-hidden">
            <Image
              src={ctaImage}
              alt="Grilled steak ready for a restaurant reservation"
              fill
              sizes="(min-width: 1024px) 48vw, 92vw"
              className="object-cover object-center transition duration-500 hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120807]/82 via-[#120807]/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <p className="text-xs font-black uppercase text-[#fd850b]">
                Tonight at Bravo
              </p>
              <p className="mt-2 max-w-sm font-serif text-3xl uppercase leading-none text-[#FFF7ED] sm:text-4xl">
                Hot skewers, cold drinks, full tables
              </p>
            </div>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="bg-[#120807]/72 p-4 ring-1 ring-[#D4A373]/18">
              <p className="text-xs font-black uppercase text-[#fd850b]">
                Best for
              </p>
              <p className="mt-1 text-sm leading-6 text-[#f4d8c5]">
                Birthdays, date nights, team dinners
              </p>
            </div>
            <div className="bg-[#120807]/72 p-4 ring-1 ring-[#D4A373]/18">
              <p className="text-xs font-black uppercase text-[#fd850b]">
                Location
              </p>
              <p className="mt-1 text-sm leading-6 text-[#f4d8c5]">
                Phnom Penh, Cambodia
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
