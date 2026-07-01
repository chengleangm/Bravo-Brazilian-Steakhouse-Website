'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const vp = { once: true, amount: 0.15 }

const WHATSAPP_URL = 'https://wa.me/85510231121'
const TELEGRAM_URL = 'https://t.me/BravoReservationsTTP'

const INPUT_CLASS =
  'h-7 w-full min-w-0 rounded border border-white/15 bg-white/10 px-2 text-[0.68rem] leading-none text-[#FFF7ED] outline-none transition-all placeholder:text-[#FFF7ED]/35 focus:border-[#fd850b] focus:bg-white/15 focus:shadow-[0_0_0_3px_rgba(253,133,11,0.18)] sm:h-8 sm:px-2.5 sm:text-xs'
const LABEL_CLASS =
  'mb-0.5 block text-[0.52rem] font-black uppercase tracking-[0.08em] text-[#FFF7ED]/90 sm:mb-1 sm:text-[0.6rem] sm:tracking-[0.12em]'
const SELECT_CLASS =
  'h-7 w-full bg-[#1a0d0a] border border-white/15 text-[#FFF7ED] px-1.5 rounded text-[0.68rem] focus:outline-none focus:border-[#fd850b] transition-all sm:h-8 sm:px-2 sm:text-xs'

const FEATURES = [
  { icon: 'fa-truck-fast',          title: 'Delivery & Setup',       desc: 'We bring the full churrasco experience to your venue — grill, staff, equipment, and service included.' },
  { icon: 'fa-fire-flame-curved',   title: 'Live-Fire Grilling',     desc: 'Our passadores carve fire-grilled cuts tableside, exactly as served in the restaurant.' },
  { icon: 'fa-user-tie',            title: 'Dedicated Specialist',   desc: 'A catering coordinator manages every detail from first contact to final cleanup.' },
]

const PACKAGES = [
  {
    name: 'Essential',
    price: '$22.95',
    svc: '+10% SVC',
    min: 50,
    accent: false,
    features: ['8 grilled meat cuts', '8 hot buffet dishes', 'Salad bar', 'Desserts'],
  },
  {
    name: 'Classic',
    price: '$26.95',
    svc: '+10% SVC',
    min: 40,
    accent: false,
    features: ['10 grilled meat cuts', '10 hot buffet dishes', 'Salad bar', 'Desserts'],
  },
  {
    name: 'Premium',
    price: '$29.95',
    svc: '+10% SVC',
    min: 30,
    accent: true,
    badge: 'Most Popular',
    features: ['16 grilled meat cuts', '10 hot buffet dishes', 'Salad bar & cold cuts', 'Desserts'],
  },
  {
    name: 'Deluxe',
    price: '$39.95',
    svc: '+10% SVC',
    min: 30,
    accent: false,
    features: ['16 grilled meat cuts', '10 hot buffet dishes', 'Salads, cold cuts & seafood', 'Desserts'],
  },
]

const MENU_CARDS = [
  {
    image: '/Catering/photo_2026-06-30_19-40-52.jpg',
    title: 'Full-Service Catering',
    desc: 'Live on-site grilling with dedicated passadores and full tableside service.',
    span: 'sm:col-span-2',
    tall: true,
  },
  {
    image: '/Catering/photo_2026-06-30_19-41-45.jpg',
    title: 'Pick-Up & Delivery',
    desc: 'For groups of 15+. Ready-to-serve platters delivered to your venue.',
    span: '',
    tall: false,
  },
  {
    image: '/Catering/photo_2026-06-30_19-08-35.jpg',
    title: 'Build Your Package',
    desc: 'Choose your meats, sides, and service level to match any budget.',
    span: '',
    tall: false,
  },
  {
    image: '/Catering/photo_2026-06-30_18-27-37.jpg',
    title: 'Group & Private Events',
    desc: 'Dedicated staff, premium churrasco, and reserved setups for large groups.',
    span: 'sm:col-span-2',
    tall: false,
  },
]

const PERKS = [
  { icon: 'fa-check', label: 'Delivery to your venue' },
  { icon: 'fa-check', label: 'Setup & cleanup included' },
  { icon: 'fa-check', label: 'Live-fire grill team on site' },
  { icon: 'fa-check', label: 'Equipment & tableware included' },
  { icon: 'fa-check', label: 'Flexible menus for any budget' },
  { icon: 'fa-check', label: 'Min. 15 guests · available daily' },
]

const DEFAULT_HERO = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85'

export default function CateringPage() {
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO)
  const [packages, setPackages] = useState(PACKAGES)

  useEffect(() => {
    fetch('/api/admin/catering-content', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => {
        if (d.heroImage) setHeroImage(d.heroImage)
        if (Array.isArray(d.packages)) setPackages(d.packages)
      })
      .catch(() => {})
  }, [])

  const [form, setForm] = useState({
    name: '', phone: '', guests: '', location: '', type: '', message: '',
  })
  const [dateMonth, setDateMonth] = useState('')
  const [dateDay,   setDateDay]   = useState('')
  const [dateYear,  setDateYear]  = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const fullDate = dateMonth && dateDay && dateYear ? `${dateYear}-${dateMonth}-${dateDay}` : ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleDatePart = (part: 'month' | 'day' | 'year', val: string) => {
    if (part === 'month') setDateMonth(val)
    if (part === 'day')   setDateDay(val)
    if (part === 'year')  setDateYear(val)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.guests || !form.location) {
      alert('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    try {
      await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text:
            `🍖 <b>New Catering Request — BRAVO Website</b>\n` +
            `━━━━━━━━━━━━━━━━━\n` +
            `👤 <b>Name:</b> ${form.name}\n` +
            `📞 <b>Phone:</b> ${form.phone}\n` +
            `📅 <b>Date:</b> ${fullDate || 'Not specified'}\n` +
            `👥 <b>Guests:</b> ${form.guests}\n` +
            `📍 <b>Location:</b> ${form.location}\n` +
            `🎊 <b>Event Type:</b> ${form.type || 'Not specified'}\n` +
            (form.message ? `💬 <b>Details:</b> ${form.message}\n` : '') +
            `━━━━━━━━━━━━━━━━━`,
        }),
      })
      setSuccess(true)
      setForm({ name: '', phone: '', guests: '', location: '', type: '', message: '' })
      setDateMonth(''); setDateDay(''); setDateYear('')
    } catch {
      alert('Something went wrong. Please call us or message via WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#120807]">
      <Header />

      <main className="bg-[#120807] text-[#FFF7ED]">

        {/* ── Hero ── */}
        <section
          className="relative flex min-h-[78vh] items-center justify-center overflow-hidden px-5 pb-0 pt-28 text-center sm:pt-32"
          style={{ backgroundImage: `url('${heroImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,8,7,0.78),rgba(18,8,7,0.5),rgba(18,8,7,0.95))]" />
          <motion.div
            variants={stagger} initial="hidden" animate="show"
            className="relative z-10 pb-20"
          >
            <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
              className="mb-4 text-[0.65rem] font-black uppercase tracking-[0.32em] text-[#fd850b] sm:text-xs sm:tracking-[0.36em]">
              We Come To You
            </motion.p>
            <motion.h1 variants={fadeUp} transition={{ duration: 0.65 }}
              className="font-serif text-5xl font-black uppercase leading-none drop-shadow-xl sm:text-6xl lg:text-7xl xl:text-8xl">
              Catering
            </motion.h1>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }}
              className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#C7B8A8] sm:text-base sm:leading-8">
              Authentic Brazilian churrasco — live fire, tableside carving, and full service — brought to your venue anywhere in Phnom Penh.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#enquire"
                className="inline-flex min-h-12 items-center justify-center bg-[#fd850b] px-7 py-3 text-sm font-black uppercase tracking-[0.14em] text-[#120807] shadow-[0_18px_42px_rgba(253,133,11,0.35)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(253,133,11,0.5)]">
                <i className="fa-solid fa-paper-plane mr-2" />
                Get a Quote
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center border border-white/25 px-7 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-[#fd850b] hover:text-[#fd850b]">
                <i className="fa-brands fa-whatsapp mr-2" />
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Feature Strip ── */}
        <section className="border-y border-[#D4A373]/15 bg-[#0d0806]">
          <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-[#D4A373]/12 sm:divide-x">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center px-2 py-4 text-center sm:px-8 sm:py-10">
                <div className="mb-2 flex h-8 w-8 items-center justify-center border border-[#fd850b]/30 bg-[#fd850b]/10 text-[#fd850b] sm:mb-4 sm:h-12 sm:w-12">
                  <i className={`fa-solid ${f.icon} text-xs sm:text-lg`} aria-hidden="true" />
                </div>
                <h3 className="mb-1 text-[0.6rem] font-black uppercase leading-tight tracking-[0.08em] sm:mb-2 sm:text-xs sm:tracking-[0.18em]">{f.title}</h3>
                <p className="hidden text-xs leading-5 text-[#C7B8A8] sm:block">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Packages ── */}
        <section className="px-4 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }}
              className="mb-10 sm:mb-14 text-center">
              <p className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#fd850b] sm:text-xs">Pricing</p>
              <h2 className="font-serif text-3xl uppercase leading-tight sm:text-4xl lg:text-5xl">Catering Packages</h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#C7B8A8] sm:text-base">
                All packages include delivery, live grilling, service staff, equipment, and cleanup.
              </p>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp}
              className="grid grid-cols-2 gap-2.5 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {packages.map((pkg) => (
                <motion.div key={pkg.name} variants={fadeUp} transition={{ duration: 0.5 }}
                  className={`relative flex flex-col overflow-hidden rounded-xl border-2 bg-[#0d0806] p-3 sm:p-6 ${
                    pkg.accent
                      ? 'border-[#fd850b] shadow-[0_0_50px_rgba(253,133,11,0.18)]'
                      : 'border-[#D4A373]/20'
                  }`}>
                  {pkg.badge && (
                    <span className="absolute right-0 top-0 rounded-bl-xl bg-[#fd850b] px-2 py-0.5 text-[0.5rem] font-black uppercase tracking-[0.1em] text-black sm:px-3 sm:py-1 sm:text-[0.6rem] sm:tracking-[0.18em]">
                      {pkg.badge}
                    </span>
                  )}
                  <p className="text-[0.55rem] font-black uppercase tracking-[0.12em] text-[#C7B8A8] sm:text-[0.65rem] sm:tracking-[0.2em]">{pkg.name}</p>
                  <p className={`mt-1 font-serif text-xl sm:mt-2 sm:text-4xl ${pkg.accent ? 'text-[#fd850b]' : 'text-[#FFF7ED]'}`}>{pkg.price}</p>
                  <p className="text-[0.5rem] font-bold text-[#fd850b]/70 sm:text-[0.6rem]">{pkg.svc}</p>
                  <p className="mt-0.5 text-[0.55rem] text-[#C7B8A8]/70 sm:text-[0.65rem]">per person · min {pkg.min} guests</p>
                  <div className="my-2.5 h-px bg-[#D4A373]/15 sm:my-4" />
                  <ul className="flex-1 space-y-1.5 sm:space-y-2.5">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-[0.62rem] text-[#C7B8A8] sm:gap-2 sm:text-[0.75rem]">
                        <i className="fa-solid fa-check mt-0.5 shrink-0 text-[0.55rem] text-[#fd850b] sm:text-[0.6rem]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#enquire"
                    className={`mt-3 inline-flex items-center justify-center gap-1.5 rounded py-2 text-[0.6rem] font-black uppercase tracking-wider transition hover:-translate-y-0.5 sm:mt-5 sm:gap-2 sm:py-2.5 sm:text-xs ${
                      pkg.accent
                        ? 'bg-[#fd850b] text-black hover:bg-[#ff9a2e]'
                        : 'border border-[#fd850b]/40 text-[#fd850b] hover:bg-[#fd850b] hover:text-black'
                    }`}>
                    <i className="fa-solid fa-paper-plane text-[0.6rem] sm:text-xs" />
                    Enquire
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Menu Options (image mosaic) ── */}
        <section className="bg-[#0a0805] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }}
              className="mb-10 sm:mb-14 text-center">
              <p className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#fd850b] sm:text-xs">What We Offer</p>
              <h2 className="font-serif text-3xl uppercase leading-tight sm:text-4xl lg:text-5xl">Catering Styles</h2>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp}
              className="grid grid-cols-2 gap-2 sm:gap-4">
              {MENU_CARDS.map((card) => (
                <motion.a key={card.title} href="#enquire" variants={fadeUp} transition={{ duration: 0.55 }}
                  className={`group relative overflow-hidden rounded-xl col-span-2 ${card.span} ${card.tall ? 'min-h-[180px] sm:min-h-[320px] lg:min-h-[420px]' : 'min-h-[140px] sm:min-h-[220px] lg:min-h-[280px]'}`}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    unoptimized={!card.image.includes('unsplash.com')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/25 to-transparent transition duration-300 group-hover:from-black/92" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 lg:p-8">
                    <h3 className="font-serif text-sm uppercase leading-none sm:text-2xl">{card.title}</h3>
                    <p className="mt-1 text-[0.65rem] leading-4 text-white/70 sm:mt-2 sm:text-sm sm:leading-6">{card.desc}</p>
                    <span className="mt-1.5 inline-flex items-center gap-1.5 text-[0.55rem] font-black uppercase tracking-widest text-[#fd850b] transition-all group-hover:gap-3 sm:mt-3 sm:text-[0.65rem]">
                      Get a Quote <i className="fa-solid fa-arrow-right text-[0.55rem] sm:text-[0.6rem]" />
                    </span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Enquiry Form ── */}
        <section id="enquire" className="scroll-mt-20 relative overflow-hidden bg-[#1A0E0A] px-3 py-8 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <div className="absolute inset-x-0 top-0 h-px bg-[#fd850b]/25" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=90')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A0E0A] via-[#1A0E0A]/97 to-black/95" />

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }}
            className="relative mx-auto grid max-w-6xl gap-4 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-16">

            {/* Left: info */}
            <div className="lg:sticky lg:top-28">
              <p className="mb-1 text-[0.6rem] font-black uppercase tracking-[0.18em] text-[#fd850b] sm:mb-2 sm:text-xs sm:tracking-[0.24em]">Request a Quote</p>
              <h2 className="font-serif text-xl uppercase leading-tight sm:text-4xl lg:text-5xl">
                Let's Plan Your Event
              </h2>
              <p className="mt-2 max-w-md text-xs leading-5 text-[#C7B8A8] sm:mt-6 sm:text-base sm:leading-8">
                Tell us about your event and we'll come back with a full catering proposal within 24 hours.
              </p>

              {/* Perks checklist */}
              <ul className="mt-3 grid grid-cols-2 gap-1.5 sm:mt-8 sm:gap-2.5 lg:grid-cols-1">
                {PERKS.map((p) => (
                  <li key={p.label} className="flex items-center gap-1.5 text-[0.6rem] font-black uppercase tracking-[0.04em] text-[#C7B8A8] sm:gap-2.5 sm:text-xs sm:tracking-[0.1em]">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#fd850b]/20 sm:h-5 sm:w-5">
                      <i className="fa-solid fa-check text-[#fd850b] text-[0.45rem] sm:text-[0.55rem]" />
                    </span>
                    {p.label}
                  </li>
                ))}
              </ul>

              {/* Quick contact */}
              <div className="mt-3 space-y-2 sm:mt-8 sm:space-y-2.5">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-2 text-xs font-black transition hover:border-[#fd850b]/50 hover:text-[#fd850b] sm:gap-3 sm:px-4 sm:py-3 sm:text-sm">
                  <i className="fa-brands fa-whatsapp text-[#25D366] text-sm sm:text-base" />
                  Prefer WhatsApp? Message us directly
                </a>
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-2 text-xs font-black transition hover:border-[#fd850b]/50 hover:text-[#fd850b] sm:gap-3 sm:px-4 sm:py-3 sm:text-sm">
                  <i className="fa-brands fa-telegram text-[#29A8E0] text-sm sm:text-base" />
                  Contact us on Telegram
                </a>
              </div>
            </div>

            {/* Right: form */}
            {success ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-[#fd850b]/30 bg-[#120807] p-12 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fd850b]/20">
                  <i className="fa-solid fa-check text-[#fd850b] text-2xl" />
                </div>
                <h3 className="font-serif text-2xl uppercase">Request Sent!</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-[#C7B8A8]">
                  Our catering team will reach out within 24 hours with a full proposal for your event.
                </p>
                <button onClick={() => setSuccess(false)}
                  className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-[#fd850b] hover:text-white transition">
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}
                className="rounded border border-white/10 bg-[#201615]/90 p-2.5 shadow-2xl backdrop-blur sm:p-5 lg:p-6">

                <div className="mb-2 flex flex-col gap-0.5 border-b border-white/10 pb-2 sm:mb-3 sm:gap-1 sm:pb-3">
                  <div>
                    <p className="mb-0.5 text-[0.5rem] font-black uppercase tracking-[0.1em] text-[#fd850b] sm:text-[0.58rem] sm:tracking-[0.16em]">Catering Details</p>
                    <h3 className="font-black text-xs uppercase leading-none sm:text-base">Tell us about your event</h3>
                  </div>
                  <p className="text-[0.52rem] font-medium text-[#FFF7ED]/55 sm:text-[0.6rem]">Required fields marked *</p>
                </div>

                <div className="flex flex-col gap-1.5 sm:gap-2">

                  {/* Name + Phone */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={LABEL_CLASS}>Name *</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange}
                        className={INPUT_CLASS} placeholder="Your name" autoComplete="name" />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Phone *</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                        className={INPUT_CLASS} placeholder="Your phone" autoComplete="tel" inputMode="tel" />
                    </div>
                  </div>

                  {/* Date — 3 dropdowns */}
                  <div>
                    <label className={LABEL_CLASS}>Event Date</label>
                    <div className="grid grid-cols-3 gap-2">
                      <select value={dateMonth} onChange={e => handleDatePart('month', e.target.value)} className={SELECT_CLASS}>
                        <option value="">Month</option>
                        {['01','02','03','04','05','06','07','08','09','10','11','12'].map((m, i) => (
                          <option key={m} value={m} className="bg-[#1a0d0a] text-[#FFF7ED]">
                            {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}
                          </option>
                        ))}
                      </select>
                      <select value={dateDay} onChange={e => handleDatePart('day', e.target.value)} className={SELECT_CLASS}>
                        <option value="">Day</option>
                        {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map(d => (
                          <option key={d} value={d} className="bg-[#1a0d0a] text-[#FFF7ED]">{Number(d)}</option>
                        ))}
                      </select>
                      <select value={dateYear} onChange={e => handleDatePart('year', e.target.value)} className={SELECT_CLASS}>
                        <option value="">Year</option>
                        {['2026', '2027', '2028'].map(y => (
                          <option key={y} value={y} className="bg-[#1a0d0a] text-[#FFF7ED]">{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Guests + Event Type */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className={LABEL_CLASS}>No. of Guests *</label>
                      <input type="number" name="guests" value={form.guests} onChange={handleChange}
                        className={INPUT_CLASS} placeholder="e.g. 50" min="15" inputMode="numeric" />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Event Type</label>
                      <select name="type" value={form.type} onChange={handleChange} className={SELECT_CLASS}>
                        <option value="">Select type</option>
                        <option value="Full-Service Catering"   className="bg-[#1a0d0a] text-[#FFF7ED]">Full-Service Catering</option>
                        <option value="Pick-Up or Delivery"     className="bg-[#1a0d0a] text-[#FFF7ED]">Pick-Up or Delivery</option>
                        <option value="Build Your Own"          className="bg-[#1a0d0a] text-[#FFF7ED]">Build Your Own Package</option>
                        <option value="Corporate"               className="bg-[#1a0d0a] text-[#FFF7ED]">Corporate Event</option>
                        <option value="Wedding"                 className="bg-[#1a0d0a] text-[#FFF7ED]">Wedding / Reception</option>
                        <option value="Birthday"                className="bg-[#1a0d0a] text-[#FFF7ED]">Birthday Celebration</option>
                        <option value="Other"                   className="bg-[#1a0d0a] text-[#FFF7ED]">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Venue / Location */}
                  <div>
                    <label className={LABEL_CLASS}>Venue / Location *</label>
                    <input type="text" name="location" value={form.location} onChange={handleChange}
                      className={INPUT_CLASS} placeholder="Venue name or address in Phnom Penh" />
                  </div>

                  {/* Additional Details */}
                  <div>
                    <label className={LABEL_CLASS}>Additional Details</label>
                    <textarea name="message" value={form.message} onChange={handleChange}
                      className={`${INPUT_CLASS} min-h-14 resize-none`}
                      placeholder="Dietary requirements, theme, or anything else we should know…" />
                  </div>
                </div>

                <button type="submit" disabled={submitting}
                  className="mt-2 flex w-full items-center justify-center rounded bg-gradient-to-r from-[#e87200] to-[#fd850b] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black shadow-lg transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(253,133,11,0.45)] disabled:cursor-not-allowed disabled:opacity-60">
                  {submitting
                    ? <><i className="fa-solid fa-spinner fa-spin mr-2" />Sending…</>
                    : <><i className="fa-solid fa-paper-plane mr-2" />Send Catering Request</>}
                </button>

                <p className="mt-4 text-center text-[0.65rem] text-[#C7B8A8]">
                  Or reach us via{' '}
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-[#fd850b] hover:underline">WhatsApp</a>
                  {' '}·{' '}
                  <a href="tel:+85578938333" className="text-[#fd850b] hover:underline">+855 78 938 333</a>
                </p>
              </form>
            )}
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
