'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const stripImages = [
  {
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=90',
    alt: 'Brazilian BBQ steak with sides',
  },
  {
    src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=90',
    alt: 'Grilled meat platter with vegetables',
  },
  {
    src: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=90',
    alt: 'Restaurant buffet and chef service',
  },
  {
    src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=90',
    alt: 'Warm restaurant bar interior',
  },
  {
    src: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=800&q=90',
    alt: 'Guests dining in a restaurant',
  },
  {
    src: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=90',
    alt: 'Dessert served after dinner',
  },
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
