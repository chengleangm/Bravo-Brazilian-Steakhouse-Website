'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const heroImage =
  'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=2200&q=90'

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#120807] text-[#FFF7ED]">
      {/* Background image */}
      <Image
        src={heroImage}
        alt="Fire grilled steak on a dark Brazilian BBQ table"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Mobile: full dark overlay; Desktop: left-to-right fade */}
      <div className="absolute inset-0 bg-black/70 sm:bg-transparent sm:bg-[linear-gradient(to_right,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.78)_50%,rgba(0,0,0,0.08)_100%)]" />
      {/* Top & bottom fade */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,transparent_25%,transparent_75%,rgba(0,0,0,0.65)_100%)]" />

      {/* Content — left aligned */}
      <div className="relative z-10 flex min-h-screen w-full items-center">
        <div className="w-full max-w-3xl px-6 py-28 text-center sm:px-14 sm:text-left lg:px-20 xl:px-28">

          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 flex items-center justify-center gap-3 sm:mb-8 sm:justify-start sm:gap-4"
          >
            <span className="hidden h-px w-14 shrink-0 bg-[#fd850b] sm:block" />
            <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-[#fd850b] sm:text-sm sm:tracking-[0.3em]">
              Phnom Penh · Est. 2024
            </span>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center sm:justify-start"
          >
            <Image
              src="/logo.png"
              alt="Bravo Brazilian Steakhouse"
              width={760}
              height={527}
              priority
              className="h-auto w-[min(75vw,320px)] object-contain mix-blend-screen sm:w-[min(65vw,520px)] lg:w-[min(55vw,680px)]"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mx-auto mt-4 max-w-xs text-base leading-relaxed text-[#e8ddd4] sm:mx-0 sm:mt-4 sm:max-w-md sm:text-base lg:text-lg"
          >
            Authentic Brazilian churrasco — fire-carved tableside, everyday.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.42, duration: 0.55, ease: 'easeOut' }}
            style={{ originX: 0 }}
            className="mx-auto mt-5 h-px w-16 bg-[#fd850b]/60 sm:mx-0 sm:mt-5 sm:w-16"
          />

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-5 flex justify-center gap-6 sm:mt-5 sm:justify-start sm:gap-7"
          >
            {[
              { value: '15+', label: 'Cuts of Meats' },
              { value: '30+', label: 'Side dishes' },
              { value: '100%', label: 'Brazilian style' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-[#fd850b] sm:text-2xl lg:text-3xl">{value}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-[#C7B8A8] sm:mt-1 sm:text-[10px] lg:text-xs">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.65 }}
            className="mt-7 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:gap-3"
          >
            <Link
              href="/menu"
              className="inline-flex min-h-12 items-center justify-center bg-[#fd850b] px-8 py-3 text-xs font-black uppercase tracking-widest text-black shadow-[0_18px_42px_rgba(253,133,11,0.32)] transition duration-300 hover:-translate-y-1 hover:bg-[#ff9a2e] hover:shadow-[0_22px_55px_rgba(253,133,11,0.5)] sm:min-h-11 sm:px-7 sm:py-2.5 sm:text-xs lg:text-sm"
            >
              View Menu
            </Link>
            <Link
              href="/contact#reservation"
              className="inline-flex min-h-12 items-center justify-center border border-[#FFF7ED]/50 bg-white/5 px-8 py-3 text-xs font-black uppercase tracking-widest text-[#FFF7ED] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#fd850b] hover:bg-[#fd850b] hover:text-black sm:min-h-11 sm:px-7 sm:py-2.5 sm:text-xs lg:text-sm"
            >
              Book A Table
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
