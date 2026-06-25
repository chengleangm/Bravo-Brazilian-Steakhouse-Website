'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const DEFAULT_BG = 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=2000&q=90'

const testimonials = [
  { name: 'Sokha R.', quote: 'The beef was smoky, tender, and served with real Brazilian energy.' },
  { name: 'Daniel M.', quote: 'A great place for family dinner. The buffet has something for everyone.' },
  { name: 'Vicheka L.', quote: 'Warm service, strong flavours, and a premium dining atmosphere.' },
]

export function Testimonials() {
  const [backgroundImage, setBackgroundImage] = useState(DEFAULT_BG)

  useEffect(() => {
    fetch('/api/admin/page-images')
      .then(r => r.json())
      .then(d => { if (d.testimonialsBg) setBackgroundImage(d.testimonialsBg) })
      .catch(() => {})
  }, [])

  return (
    <section className="relative overflow-hidden px-4 py-10 text-[#FFF7ED] sm:px-8 sm:py-20 lg:px-10 lg:py-28">
      <Image
        src={backgroundImage}
        alt="Steak dinner plated for a celebration"
        fill
        sizes="100vw"
        className="object-cover object-center"
        unoptimized={!backgroundImage.includes('unsplash.com')}
      />
      <div className="absolute inset-0 bg-black/64" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.55),rgba(0,0,0,0.3),rgba(0,0,0,0.55))]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.68 }}
          className="mx-auto max-w-[22rem] text-center font-serif text-[2.05rem] uppercase leading-[0.9] sm:max-w-4xl sm:text-6xl lg:text-7xl"
        >
          Dinner that feels like a celebration
        </motion.h2>

        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-7 grid gap-3 sm:mt-12 sm:gap-5 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.article
              key={testimonial.name}
              variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.58 }}
              className="bg-[#f4eadb]/94 p-4 text-left text-[#180c08] shadow-[0_24px_60px_rgba(0,0,0,0.26)] sm:p-6"
            >
              <div className="mb-2 text-[0.7rem] font-black text-[#fd850b] sm:mb-3 sm:text-base" aria-label="5 out of 5 stars">★★★★★</div>
              <p className="text-[0.82rem] leading-5 text-[#3c2b24] sm:text-sm sm:leading-7">&quot;{testimonial.quote}&quot;</p>
              <h3 className="mt-3 font-serif text-xl uppercase text-[#180c08] sm:mt-5 sm:text-2xl">{testimonial.name}</h3>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
