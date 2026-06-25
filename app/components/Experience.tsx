'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const DEFAULT = 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1400&q=90'

export function Experience() {
  const [experienceImage, setExperienceImage] = useState(DEFAULT)

  useEffect(() => {
    fetch('/api/admin/page-images')
      .then(r => r.json())
      .then(d => { if (d.experience) setExperienceImage(d.experience) })
      .catch(() => {})
  }, [])

  return (
    <section className="bg-[#432015] px-4 py-8 text-[#FFF7ED] sm:px-8 sm:py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-5 sm:gap-12 lg:grid-cols-[0.88fr_1fr] lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-3 h-px w-24 bg-[#FFF7ED]/60 sm:mb-5 sm:w-44 sm:bg-[#FFF7ED]" />
          <h2 className="font-serif text-[1.72rem] uppercase leading-[0.94] sm:text-6xl sm:leading-[0.88] lg:text-7xl">
            Grilling, carved hot from the skewer
          </h2>
          <p className="mt-3 max-w-xl text-[0.82rem] leading-[1.55] text-[#f4d8c5] sm:mt-6 sm:text-lg sm:leading-8">
            Our churrasco service is built around theatre and generosity. Cuts are seasoned simply, grilled with patience, and served fresh at the table so every guest can taste the heat, smoke, and tenderness at its peak.
          </p>
          <Link href="/gallery" className="mt-4 inline-flex min-h-9 items-center justify-center bg-[#fd850b] px-3 py-2 text-[0.62rem] font-black uppercase text-black shadow-[0_14px_34px_rgba(253,133,11,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(253,133,11,0.46)] sm:mt-8 sm:min-h-11 sm:px-6 sm:py-3 sm:text-xs">
            Discover The Experience
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.72, delay: 0.12 }}
          className="relative h-40 overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.35)] sm:h-auto sm:aspect-[4/3]"
        >
          <Image
            src={experienceImage}
            alt="Guests enjoying a warm Brazilian steakhouse dining experience"
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover transition duration-500 hover:scale-[1.03]"
            unoptimized={!experienceImage.includes('unsplash.com')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
