'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const SLIDES = [
  'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=2200&q=90',
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2200&q=90',
  'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=2200&q=90',
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=2200&q=90',
]

const INTERVAL = 5500

type HeroContent = {
  tagline: string
  subtitle: string
  stats: { value: string; label: string }[]
  btn1Label: string
  btn1Href: string
  btn2Label: string
  btn2Href: string
}

const DEFAULT_CONTENT: HeroContent = {
  tagline: 'Phnom Penh · Est. 2024',
  subtitle: 'Authentic Brazilian churrasco — fire-carved tableside, everyday.',
  stats: [
    { value: '15+', label: 'Cuts of Meats' },
    { value: '30+', label: 'Side dishes' },
    { value: '100%', label: 'Brazilian style' },
  ],
  btn1Label: 'View Menu',
  btn1Href: '/menu',
  btn2Label: 'Book A Table',
  btn2Href: '/contact#reservation',
}

export function Hero() {
  const [slides, setSlides] = useState(SLIDES)
  const [current, setCurrent] = useState(0)
  const [content, setContent] = useState<HeroContent>(DEFAULT_CONTENT)
  const [heroLogo, setHeroLogo] = useState('')

  useEffect(() => {
    fetch('/api/admin/page-images')
      .then(r => r.json())
      .then(d => {
        const adminSlides = Array.isArray(d.homeHeroSlides) ? d.homeHeroSlides.filter(Boolean) : []
        if (adminSlides.length > 0) {
          setSlides(adminSlides)
          setCurrent(0)
        } else if (d.homeHero) {
          setSlides([d.homeHero, ...SLIDES.slice(1)])
          setCurrent(0)
        }
        setHeroLogo(typeof d.heroLogo === 'string' ? d.heroLogo : '')
      })
      .catch(() => {})
    fetch('/api/admin/hero-content')
      .then(r => r.json())
      .then(d => setContent(prev => ({ ...prev, ...d })))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!slides.length) return
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), INTERVAL)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#120807] text-[#FFF7ED]">
      {/* Slideshow background images — crossfade via opacity */}
      {slides.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Bravo Brazilian Steakhouse"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-[1200ms] ease-in-out ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
          unoptimized={!src.includes('unsplash.com')}
        />
      ))}

      <div className="absolute inset-0 bg-black/70 sm:bg-transparent sm:bg-[linear-gradient(to_right,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.78)_50%,rgba(0,0,0,0.08)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,transparent_25%,transparent_75%,rgba(0,0,0,0.65)_100%)]" />

      <div className="relative z-10 flex min-h-screen w-full items-center">
        <div className="w-full max-w-3xl px-6 py-28 text-center sm:px-14 sm:text-left lg:px-20 xl:px-28">

          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 flex items-center justify-center gap-3 sm:mb-8 sm:justify-start sm:gap-4"
          >
            <span className="hidden h-px w-14 shrink-0 bg-[#fd850b] sm:block" />
            <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-[#fd850b] sm:text-sm sm:tracking-[0.3em]">
              {content.tagline}
            </span>
          </motion.div>

          {heroLogo && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center sm:justify-start"
            >
              <Image
                src={heroLogo}
                alt="Bravo Brazilian Steakhouse"
                width={760}
                height={527}
                priority
                className="h-auto w-[min(55vw,200px)] object-contain mix-blend-screen sm:w-[min(40vw,300px)] lg:w-[min(30vw,380px)]"
                unoptimized={heroLogo.startsWith('/uploads') || heroLogo.startsWith('/pages') || heroLogo.startsWith('/logos')}
              />
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mx-auto mt-4 max-w-xs text-base leading-relaxed text-[#e8ddd4] sm:mx-0 sm:mt-4 sm:max-w-md sm:text-base lg:text-lg"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.42, duration: 0.55, ease: 'easeOut' }}
            style={{ originX: 0 }}
            className="mx-auto mt-5 h-px w-16 bg-[#fd850b]/60 sm:mx-0 sm:mt-5 sm:w-16"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-5 flex justify-center gap-6 sm:mt-5 sm:justify-start sm:gap-7"
          >
            {content.stats.map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-[#fd850b] sm:text-2xl lg:text-3xl">{value}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-[#C7B8A8] sm:mt-1 sm:text-[10px] lg:text-xs">{label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.65 }}
            className="mt-7 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:gap-3"
          >
            <Link href={content.btn1Href} className="inline-flex min-h-12 items-center justify-center bg-[#fd850b] px-8 py-3 text-xs font-black uppercase tracking-widest text-black shadow-[0_18px_42px_rgba(253,133,11,0.32)] transition duration-300 hover:-translate-y-1 hover:bg-[#ff9a2e] hover:shadow-[0_22px_55px_rgba(253,133,11,0.5)] sm:min-h-11 sm:px-7 sm:py-2.5 sm:text-xs lg:text-sm">
              {content.btn1Label}
            </Link>
            <Link href={content.btn2Href} className="inline-flex min-h-12 items-center justify-center border border-[#FFF7ED]/50 bg-white/5 px-8 py-3 text-xs font-black uppercase tracking-widest text-[#FFF7ED] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#fd850b] hover:bg-[#fd850b] hover:text-black sm:min-h-11 sm:px-7 sm:py-2.5 sm:text-xs lg:text-sm">
              {content.btn2Label}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:left-auto sm:right-10 sm:translate-x-0">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              i === current
                ? 'w-8 bg-[#fd850b]'
                : 'w-4 bg-white/35 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
