'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const heroImage =
  'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=2200&q=90'

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#120807] text-[#FFF7ED]">
      <Image
        src={heroImage}
        alt="Fire grilled steak on a dark Brazilian BBQ table"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,8,7,0.08)_0%,rgba(18,8,7,0.42)_38%,rgba(0,0,0,0.9)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.58)_0%,rgba(18,8,7,0.18)_42%,rgba(0,0,0,0.9)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-5 py-28 text-center sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="pt-10"
        >
          <h1 className="sr-only">BRAVO Brazilian BBQ</h1>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.75 }}
            className="mx-auto flex justify-center"
          >
            <Image
              src="/logo.png"
              alt="Bravo Brazilian Steakhouse"
              width={760}
              height={527}
              priority
              className="h-auto w-[min(82vw,520px)] object-contain mix-blend-screen sm:w-[min(72vw,640px)]"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.7 }}
            className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#FFF7ED] sm:text-lg"
          >
            Authentic Brazilian steakhouse experiences in Phnom Penh.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.65 }}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/menu"
              className="inline-flex min-h-11 items-center justify-center bg-[#fd850b] px-6 py-3 text-xs font-black uppercase text-black shadow-[0_18px_42px_rgba(253,133,11,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(253,133,11,0.46)] sm:text-sm"
            >
              View Menu
            </Link>
            <Link
              href="/contact#reservation"
              className="inline-flex min-h-11 items-center justify-center border border-[#FFF7ED]/80 bg-black/15 px-6 py-3 text-xs font-black uppercase text-[#FFF7ED] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#fd850b] hover:bg-[#fd850b] hover:text-black sm:text-sm"
            >
              Book A Table
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-xs font-bold uppercase text-[#C7B8A8] sm:flex"
      >
        <span className="relative h-11 w-7 rounded-full border border-[#D4A373]/60">
          <span className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 animate-bounce rounded-full bg-[#fd850b]" />
        </span>
      </motion.a>
    </section>
  )
}
