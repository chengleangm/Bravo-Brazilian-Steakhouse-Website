'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type AboutContent = {
  kicker: string
  title: string
  body: string
  buttonLabel: string
  buttonHref: string
}

const DEFAULT_CONTENT: AboutContent = {
  kicker: 'Welcome to Bravo',
  title: 'Authentic Brazilian flavours crafted with fire and passion',
  body: 'At BRAVO, skewers move from open flame to your table with bold aroma, coarse salt, and slow-roasted heat. Gather for a generous buffet, premium grilled cuts, fresh sides, and a warm dining room made for families, friends, and celebrations.',
  buttonLabel: 'Learn More About Us',
  buttonHref: '/about',
}

export function About() {
  const [content, setContent] = useState(DEFAULT_CONTENT)

  useEffect(() => {
    fetch('/api/admin/home-sections')
      .then(r => r.json())
      .then(d => setContent(prev => ({ ...prev, ...d.about })))
      .catch(() => {})
  }, [])

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
            {content.kicker}
          </p>
          <h2 className="font-serif text-3xl uppercase leading-[0.9] text-[#1c0d09] sm:text-4xl md:text-5xl lg:text-6xl">
            {content.title}
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
            {content.body}
          </p>
          <Link
            href={content.buttonHref}
            className="mt-8 inline-flex min-h-11 items-center justify-center bg-[#1c0d09] px-6 py-3 text-xs font-black uppercase text-[#FFF7ED] transition duration-300 hover:-translate-y-1 hover:bg-[#fd850b] hover:text-black"
          >
            {content.buttonLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
