'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

type Promotion = {
  id: number
  active: boolean
  badge: string
  title: string
  subtitle: string
  description: string
  date: string
  time: string
  image: string
  cta: string
  ctaLink: string
}

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } }
const vp = { once: true, amount: 0.2 }

const DEFAULT_HERO = 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1800&q=85'

const getPromoHighlights = (promo: Promotion) => {
  const text = [promo.title, promo.subtitle, promo.description].filter(Boolean).join(' ')
  const lower = text.toLowerCase()
  const highlights: { label: string; value: string; accent?: boolean }[] = []

  if (lower.includes('come 4') || lower.includes('pay 3')) {
    highlights.push({ label: 'Offer', value: '4 Pay 3' })
  }

  const prices = text.match(/\$\d+(?:\.\d{1,2})?/g)
  if (prices?.length) {
    highlights.push({ label: 'From', value: `${prices[0]}${lower.includes('nett') ? ' nett' : ''}`, accent: true })
  }

  const grillMeats = Array.from(text.matchAll(/(\d+)\s+grill meats/gi), match => match[1])
  if (grillMeats.length) {
    highlights.push({ label: 'Grill', value: `${[...new Set(grillMeats)].join('/')} meats` })
  } else if (lower.includes('beer') || lower.includes('wine')) {
    highlights.push({ label: 'Includes', value: 'Beer / Wine' })
  }

  return highlights.slice(0, 3)
}

export default function PromotionsPage() {
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO)
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/events', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        if (data.heroImage) setHeroImage(data.heroImage)
        if (data.promotions) setPromotions(data.promotions.filter((p: Promotion) => p.active))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#120807]">
      <Header />

      <main>
        {/* Hero */}
        <section
          className="relative min-h-[55vh] flex items-center justify-center bg-cover bg-center pt-32 pb-16 px-5 text-center text-white"
          style={{ backgroundImage: `url('${heroImage}')`, backgroundAttachment: 'fixed' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-[0.65rem] font-black uppercase tracking-[0.3em] text-[#fd850b]"
            >
              Exclusive Deals
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-black text-5xl md:text-7xl uppercase leading-none drop-shadow-lg"
            >
              PROMOTIONS
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 text-white/80 text-base md:text-xl max-w-md mx-auto"
            >
              Current offers &amp; special deals at BRAVO
            </motion.p>
          </div>
        </section>

        {/* Promotions List */}
        <section className="bg-[#0a0805] py-16 px-5 sm:py-24">
          <div className="max-w-6xl mx-auto">

            {!loading && promotions.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-24"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center bg-[#fd850b]/10">
                  <i className="fa-solid fa-tag text-4xl text-[#fd850b]/40" />
                </div>
                <h2 className="font-black text-2xl uppercase text-[#FFF7ED] mb-3">No Active Promotions</h2>
                <p className="text-[#C7B8A8] text-sm max-w-xs mx-auto mb-8">
                  Check back soon — new deals are added regularly.
                </p>
                <Link
                  href="/contact#reservation"
                  className="inline-flex items-center gap-2 bg-[#fd850b] text-black px-7 py-3 text-xs font-black uppercase tracking-widest transition hover:-translate-y-0.5"
                >
                  <i className="fa-solid fa-calendar-check text-xs" />
                  Book a Table
                </Link>
              </motion.div>
            )}

            {promotions.length > 0 && (
              <>
                <motion.div
                  variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }}
                  className="flex items-center gap-4 mb-12"
                >
                  <div className="h-px flex-1 bg-[#fd850b]/25" />
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-[#fd850b]">Current Promotions</span>
                  <div className="h-px flex-1 bg-[#fd850b]/25" />
                </motion.div>

                <div className="space-y-8">
                  {promotions.map((promo, idx) => {
                    const highlights = getPromoHighlights(promo)
                    return (
                      <motion.div
                        key={promo.id}
                        variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
                        transition={{ duration: 0.65, delay: idx * 0.1 }}
                        className={`relative isolate overflow-hidden border border-[#fd850b]/25 bg-[#120807] shadow-[0_24px_90px_rgba(0,0,0,0.5)] sm:grid sm:grid-cols-[minmax(220px,0.85fr)_minmax(0,1.15fr)] lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] ${idx % 2 === 1 ? 'sm:[&>*:first-child]:order-2' : ''}`}
                      >
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(253,133,11,0.16),transparent_36%),linear-gradient(135deg,rgba(255,247,237,0.04),transparent_46%)]" />

                        <div className="relative min-h-[260px] w-full sm:min-h-full">
                          {promo.image ? (
                            <Image
                              src={promo.image}
                              alt={promo.title}
                              fill
                              sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 100vw"
                              className="object-cover"
                              unoptimized={!promo.image.includes('unsplash.com')}
                            />
                          ) : (
                            <div className="w-full h-full bg-[#1a0e0a] flex items-center justify-center">
                              <i className="fa-solid fa-tag text-5xl text-[#fd850b]/30" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#120807] via-[#120807]/15 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-[#120807]/35" />
                          <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                            <span className="inline-flex items-center gap-1.5 bg-[#fd850b] text-black text-[0.62rem] font-black uppercase tracking-[0.18em] px-3 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                              <i className="fa-solid fa-bolt text-[0.55rem]" />
                              {promo.badge}
                            </span>
                          </div>
                        </div>

                        <div className="relative flex flex-col justify-center px-5 pb-6 pt-5 sm:p-8 lg:p-12">
                          <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
                            {(promo.date || promo.time) && (
                              <span className="inline-flex items-center gap-2 border border-[#D4A373]/20 bg-white/[0.04] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#C7B8A8]">
                                <i className="fa-solid fa-clock text-[#fd850b]" aria-hidden="true" />
                                {promo.date}{promo.date && promo.time ? ' · ' : ''}{promo.time}
                              </span>
                            )}
                          </div>

                          <h2 className="font-serif text-[2.35rem] sm:text-4xl lg:text-5xl uppercase leading-[0.88] text-[#FFF7ED] mb-3">
                            {promo.title}
                          </h2>

                          {promo.subtitle && (
                            <p className="text-[#fd850b] font-black text-sm sm:text-base uppercase tracking-[0.12em] leading-6 mb-4">
                              {promo.subtitle}
                            </p>
                          )}

                          {highlights.length > 0 && (
                            <div className={`mb-4 grid gap-2 text-center sm:max-w-md ${highlights.length === 1 ? 'grid-cols-1' : highlights.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                              {highlights.map(item => (
                                <div key={`${item.label}-${item.value}`} className="border border-[#D4A373]/18 bg-black/18 px-2 py-3">
                                  <p className="text-[0.6rem] font-black uppercase tracking-[0.16em] text-[#C7B8A8]">{item.label}</p>
                                  <p className={`mt-1 text-sm font-black ${item.accent ? 'text-[#fd850b]' : 'text-[#FFF7ED]'}`}>{item.value}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {promo.description && (
                            <p className="text-[#C7B8A8] text-sm sm:text-base leading-7 max-w-lg mb-6">
                              {promo.description}
                            </p>
                          )}

                          {promo.cta && (
                            <div>
                              <Link
                                href={promo.ctaLink || '/contact#reservation'}
                                className="inline-flex w-full items-center justify-center gap-2 bg-[#fd850b] text-black px-6 py-3.5 text-sm font-black uppercase tracking-wider shadow-[0_12px_40px_rgba(253,133,11,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_56px_rgba(253,133,11,0.45)] sm:w-auto"
                              >
                                <i className="fa-solid fa-calendar-check text-xs" />
                                {promo.cta}
                              </Link>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#120807] border-t border-[#fd850b]/15 py-16 px-5 text-center">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.28em] text-[#fd850b] mb-3">Planning something special?</p>
          <h2 className="font-black text-2xl md:text-4xl uppercase text-[#FFF7ED] mb-6">Host Your Event at BRAVO</h2>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 border border-[#fd850b]/50 bg-[#fd850b]/8 text-[#fd850b] px-7 py-3 text-xs font-black uppercase tracking-widest transition hover:bg-[#fd850b] hover:text-black"
          >
            <i className="fa-solid fa-calendar-star text-xs" />
            View Event Packages
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
