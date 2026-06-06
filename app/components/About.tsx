'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#f4eadb] px-5 py-20 text-[#180c08] sm:px-8 lg:px-10 lg:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[0.98fr_1fr] lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-xs font-black uppercase text-[#fd850b]">
            Welcome to Bravo
          </p>
          <h2 className="font-serif text-5xl uppercase leading-[0.9] text-[#1c0d09] sm:text-6xl md:text-7xl lg:text-8xl">
            Authentic Brazilian flavours crafted with fire and passion
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, delay: 0.12 }}
          className="pt-1 lg:pt-10"
        >
          <p className="max-w-xl text-base leading-8 text-[#3c2b24] sm:text-lg">
            At BRAVO, skewers move from open flame to your table with bold
            aroma, coarse salt, and slow-roasted heat. Gather for a generous
            buffet, premium grilled cuts, fresh sides, and a warm dining room
            made for families, friends, and celebrations.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex min-h-11 items-center justify-center bg-[#1c0d09] px-6 py-3 text-xs font-black uppercase text-[#FFF7ED] transition duration-300 hover:-translate-y-1 hover:bg-[#fd850b] hover:text-black"
          >
            Learn More About Us
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
