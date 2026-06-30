'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const DEFAULT_VIDEO = '/Home/video_2026-06-30_20-27-44.mp4'

export function Experience() {
  const [videoUrl, setVideoUrl] = useState(DEFAULT_VIDEO)

  useEffect(() => {
    fetch('/api/admin/promo-video')
      .then(r => r.json())
      .then(d => { if (d.url) setVideoUrl(d.url) })
      .catch(() => {})
  }, [])

  return (
    <section className="bg-[#432015] px-4 py-8 text-[#FFF7ED] sm:px-8 sm:py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-5 sm:gap-12 lg:grid-cols-[1fr_0.88fr] lg:gap-24">

        {/* Video — LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.72 }}
          className="overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.45)]"
        >
          <video
            className="aspect-square w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={videoUrl} />
          </video>
        </motion.div>

        {/* Text — RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          <div className="mb-3 h-px w-24 bg-[#FFF7ED]/60 sm:mb-5 sm:w-44 sm:bg-[#FFF7ED]" />
          <h2 className="font-serif text-2xl uppercase leading-[0.94] sm:text-4xl sm:leading-[0.88] lg:text-5xl">
            Grilling, carved hot from the skewer
          </h2>
          <p className="mt-3 max-w-xl text-[0.82rem] leading-[1.55] text-[#f4d8c5] sm:mt-6 sm:text-lg sm:leading-8">
            Our churrasco service is built around theatre and generosity. Cuts are seasoned simply, grilled with patience, and served fresh at the table so every guest can taste the heat, smoke, and tenderness at its peak.
          </p>
          <Link
            href="/gallery"
            className="mt-4 inline-flex min-h-9 items-center justify-center bg-[#fd850b] px-3 py-2 text-[0.62rem] font-black uppercase text-black shadow-[0_14px_34px_rgba(253,133,11,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_46px_rgba(253,133,11,0.46)] sm:mt-8 sm:min-h-11 sm:px-6 sm:py-3 sm:text-xs"
          >
            Discover The Experience
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
