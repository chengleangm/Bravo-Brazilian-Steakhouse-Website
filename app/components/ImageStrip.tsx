'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const stripImages = [
  { src: '/img/6-img/photo_2026-06-23_16-08-33.jpg', alt: 'Bravo Brazilian Steakhouse' },
  { src: '/img/6-img/photo_2026-06-23_16-12-15.jpg', alt: 'Bravo Brazilian Steakhouse' },
  { src: '/img/6-img/photo_2026-06-23_16-12-36.jpg', alt: 'Bravo Brazilian Steakhouse' },
  { src: '/img/6-img/photo_2026-06-23_16-16-37.jpg', alt: 'Bravo Brazilian Steakhouse' },
  { src: '/img/6-img/photo_2026-06-23_16-16-59.jpg', alt: 'Bravo Brazilian Steakhouse' },
  { src: '/img/6-img/photo_2026-06-23_16-17-54.jpg', alt: 'Bravo Brazilian Steakhouse' },
]

export function ImageStrip() {
  return (
    <section className="bg-[#f4eadb]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
      >
        {stripImages.map((image) => (
          <div
            key={image.src}
            className="group relative h-36 overflow-hidden sm:h-40 lg:h-44"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 17vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/18 to-transparent" />
          </div>
        ))}
      </motion.div>
    </section>
  )
}
