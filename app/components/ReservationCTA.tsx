'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const ctaImage =
  'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=2000&q=90'

export function ReservationCTA() {
  return (
    <section className="relative overflow-hidden bg-[#edf5f3] px-5 py-20 text-center text-[#180c08] sm:px-8 lg:px-10 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.72 }}
        className="mx-auto max-w-4xl"
      >
        <p className="mb-3 text-xs font-black uppercase text-[#fd850b]">
          Book Bravo
        </p>
        <h2 className="font-serif text-5xl uppercase leading-[0.9] sm:text-6xl">
          Reserve your table today
        </h2>
        <div className="relative mx-auto mt-10 max-w-3xl pb-10">
          <div className="absolute left-1/2 top-9 hidden h-44 w-[82%] -translate-x-1/2 bg-[#120807] shadow-[0_34px_80px_rgba(0,0,0,0.18)] sm:block" />
          <div className="relative mx-auto aspect-[16/7] max-w-2xl overflow-hidden shadow-[0_32px_80px_rgba(18,8,7,0.24)]">
            <Image
              src={ctaImage}
              alt="Grilled steak ready for a restaurant reservation"
              fill
              sizes="(min-width: 768px) 640px, 92vw"
              className="object-cover transition duration-500 hover:scale-[1.03]"
            />
          </div>
          <Link
            href="/contact#reservation"
            className="relative z-10 mt-7 inline-flex min-h-11 items-center justify-center bg-[#fd850b] px-6 py-3 text-xs font-black uppercase text-black shadow-[0_16px_38px_rgba(253,133,11,0.34)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(253,133,11,0.58)]"
          >
            Book Now
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
