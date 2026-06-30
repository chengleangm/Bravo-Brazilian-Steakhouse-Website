'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const vp = { once: true, amount: 0.15 }

const HERO_BG = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85'

const TOP_FEATURES = [
  {
    icon: 'fa-truck-fast',
    title: 'Delivery & Pickup',
    desc: 'Packages perfect for small events begin as large events, and everything in between.',
  },
  {
    icon: 'fa-user-tie',
    title: 'Personalised Service',
    desc: 'Our dedicated Catering Specialists will assist you in planning your ideal event.',
  },
  {
    icon: 'fa-fire-flame-curved',
    title: 'Full-Service Catering',
    desc: 'Setting up your event with attentive, gracious live-fire service.',
  },
]

const DELIVERY_OPTIONS = [
  'Delivery with meeting package available.',
  'Setup & service upgrades available — contact us for premium buffet add-ons.',
  'Browse hourly service staffing options to suit your event scale.',
  'Our grill team can set up catering stations at 3 hours in advance of your event.',
  'All catering includes equipment, napkins, silverware & serving utensils.',
]

const PACKAGES = [
  {
    name: 'Essential',
    from: '$22.95',
    svc: '+10% SVC',
    minGuests: 50,
    accent: false,
    features: [
      '8 grilled meat cuts',
      '8 hot dishes',
      'Salad bar',
      'Desserts',
    ],
  },
  {
    name: 'Classic',
    from: '$26.95',
    svc: '+10% SVC',
    minGuests: 40,
    accent: false,
    features: [
      '10 grilled meat cuts',
      '10 hot dishes',
      'Salad bar',
      'Desserts',
    ],
  },
  {
    name: 'Premium',
    from: '$29.95',
    svc: '+10% SVC',
    minGuests: 30,
    accent: true,
    badge: 'Most Popular',
    features: [
      '16 grilled meat cuts',
      '10 hot dishes',
      'Salad bar & cold cuts',
      'Desserts',
    ],
  },
  {
    name: 'Deluxe',
    from: '$39.95',
    svc: '+10% SVC',
    minGuests: 30,
    accent: false,
    features: [
      '16 grilled meat cuts',
      '10 hot dishes',
      'Salads, cold cuts & seafood',
      'Desserts',
    ],
  },
]

const MENU_CARDS = [
  {
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=85',
    title: 'Full-Service Catering',
    desc: 'Experience the art of Brazilian churrasco with live on-site grilling and tableside service.',
    span: 'lg:col-span-2',
    tall: true,
    href: '#enquire',
  },
  {
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=85',
    title: 'Catering Pick-Up or Delivery',
    desc: 'For groups of 15 or more. Choose the arrangement that\'s right for your event needs, serving choice, and group size.',
    span: 'lg:col-span-1',
    tall: false,
    href: '#enquire',
  },
  {
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=85',
    title: 'Build Your Own Package',
    desc: 'Find the perfect catering package for your occasion — customise meats, sides, and service to fit any budget.',
    span: 'lg:col-span-1',
    tall: false,
    href: '#enquire',
  },
  {
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85',
    title: 'Group Dining & Private Events',
    desc: 'Ready to host your group? Premium churrasco experience with dedicated staff and ready-to-serve platters.',
    span: 'lg:col-span-2',
    tall: false,
    href: '#enquire',
  },
]

export default function CateringPage() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', guests: '', location: '', type: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.guests || !form.location) {
      alert('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text:
            `🍖 <b>New Catering Request — BRAVO Website</b>\n` +
            `━━━━━━━━━━━━━━━━━\n` +
            `👤 <b>Name:</b> ${form.name}\n` +
            `📞 <b>Phone:</b> ${form.phone}\n` +
            `📅 <b>Date:</b> ${form.date || 'Not specified'}\n` +
            `👥 <b>Guests:</b> ${form.guests}\n` +
            `📍 <b>Location:</b> ${form.location}\n` +
            `🎊 <b>Event Type:</b> ${form.type || 'Not specified'}\n` +
            (form.message ? `💬 <b>Details:</b> ${form.message}\n` : '') +
            `━━━━━━━━━━━━━━━━━`,
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000)
      setForm({ name: '', phone: '', date: '', guests: '', location: '', type: '', message: '' })
    } catch {
      alert('Something went wrong. Please call us or message via WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section
          className="relative flex min-h-[52vh] items-end justify-center bg-cover bg-center pb-0 pt-32 text-white"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />
          <div className="relative z-10 w-full pb-16 text-center">
            <motion.p
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="mb-3 text-[0.65rem] font-black uppercase tracking-[0.32em] text-[#fd850b]"
            >
              We Come to You
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
              className="font-black text-6xl uppercase leading-none drop-shadow-lg md:text-8xl lg:text-9xl"
            >
              CATERING
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.28 }}
              className="mx-auto mt-4 max-w-md text-sm text-white/80 md:text-base"
            >
              Authentic Brazilian churrasco delivered to your event — anywhere in Phnom Penh.
            </motion.p>
          </div>
        </section>

        {/* ── 3 Feature Columns ── */}
        <section className="border-b border-[#D4A373]/15 bg-[#0d0806]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-[#D4A373]/12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {TOP_FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center px-8 py-10 text-center"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center border border-[#fd850b]/30 bg-[#fd850b]/10 text-[#fd850b]">
                  <i className={`fa-solid ${f.icon} text-lg`} aria-hidden="true" />
                </div>
                <h3 className="mb-2 font-black text-xs uppercase tracking-[0.18em] text-[#FFF7ED]">{f.title}</h3>
                <p className="text-xs leading-5 text-[#C7B8A8]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Delivery Options ── */}
        <section className="bg-[#f4eadb] px-5 py-14 text-[#120807] sm:py-20">
          <div className="mx-auto max-w-4xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }} className="mb-8 text-center">
              <p className="mb-2 text-[0.6rem] font-black uppercase tracking-[0.28em] text-[#fd850b]">How We Deliver</p>
              <h2 className="font-black text-2xl uppercase md:text-4xl">Delivery Options</h2>
            </motion.div>
            <motion.ul
              variants={stagger} initial="hidden" whileInView="show" viewport={vp}
              className="mx-auto max-w-2xl space-y-3"
            >
              {DELIVERY_OPTIONS.map((opt) => (
                <motion.li
                  key={opt}
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                  className="flex items-start gap-3 text-sm leading-6 text-[#4b352b]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fd850b]" />
                  {opt}
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 text-center"
            >
              <a
                href="#enquire"
                className="inline-flex items-center gap-2 bg-[#120807] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white transition hover:bg-[#fd850b] hover:text-black"
              >
                <i className="fa-solid fa-paper-plane text-xs" />
                Request a Quote
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── Packages / Pricing ── */}
        <section className="bg-[#120807] px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }} className="mb-10 text-center">
              <p className="mb-2 text-[0.6rem] font-black uppercase tracking-[0.28em] text-[#fd850b]">Pricing</p>
              <h2 className="font-black text-2xl uppercase text-[#FFF7ED] md:text-4xl">Catering Packages</h2>
              <p className="mx-auto mt-3 max-w-lg text-xs text-[#C7B8A8] md:text-sm">
                All packages include delivery, setup, live grilling, service staff, and cleanup.
              </p>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="grid gap-4 md:grid-cols-3 md:gap-6">
              {PACKAGES.map((pkg) => (
                <motion.div
                  key={pkg.name}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className={`relative flex flex-col border-2 bg-[#0d0806] p-5 md:p-7 ${pkg.accent ? 'border-[#fd850b] shadow-[0_0_40px_rgba(253,133,11,0.18)]' : 'border-[#D4A373]/25'}`}
                >
                  {pkg.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fd850b] px-4 py-1 text-[0.6rem] font-black uppercase tracking-[0.18em] text-black">
                      {pkg.badge}
                    </span>
                  )}
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#C7B8A8]">{pkg.name}</p>
                  <p className={`mt-1 font-black text-3xl md:text-4xl ${pkg.accent ? 'text-[#fd850b]' : 'text-[#FFF7ED]'}`}>{pkg.from}</p>
                  <p className="mt-0.5 text-[0.65rem] text-[#C7B8A8]">per person · min {pkg.minGuests} guests</p>
                  <div className="my-4 h-px bg-[#D4A373]/15" />
                  <ul className="flex-1 space-y-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[0.72rem] text-[#C7B8A8] md:text-sm">
                        <i className="fa-solid fa-check mt-0.5 shrink-0 text-[0.6rem] text-[#fd850b]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#enquire"
                    className={`mt-5 inline-flex items-center justify-center gap-2 py-3 text-xs font-black uppercase tracking-wider transition hover:-translate-y-0.5 ${
                      pkg.accent
                        ? 'bg-[#fd850b] text-black hover:bg-[#ff9a2e]'
                        : 'border border-[#fd850b]/40 text-[#fd850b] hover:bg-[#fd850b] hover:text-black'
                    }`}
                  >
                    <i className="fa-solid fa-paper-plane text-xs" />
                    Enquire Now
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Menu Options (image cards) ── */}
        <section className="bg-[#0a0805] px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }} className="mb-10 text-center">
              <p className="mb-2 text-[0.6rem] font-black uppercase tracking-[0.28em] text-[#fd850b]">What We Offer</p>
              <h2 className="font-black text-2xl uppercase text-[#FFF7ED] md:text-4xl">Menu Options</h2>
            </motion.div>

            <motion.div
              variants={stagger} initial="hidden" whileInView="show" viewport={vp}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {MENU_CARDS.map((card) => (
                <motion.a
                  key={card.title}
                  href={card.href}
                  variants={fadeUp}
                  transition={{ duration: 0.55 }}
                  className={`group relative overflow-hidden ${card.span} ${card.tall ? 'min-h-[420px]' : 'min-h-[260px]'}`}
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(min-width: 1024px) 66vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                    unoptimized={!card.image.includes('unsplash.com')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition duration-300 group-hover:from-black/90" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                    <h3 className="font-black text-base uppercase text-[#FFF7ED] md:text-xl">{card.title}</h3>
                    <p className="mt-1.5 text-xs leading-5 text-white/70 md:text-sm md:leading-6">{card.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[0.65rem] font-black uppercase tracking-widest text-[#fd850b] transition group-hover:gap-2.5">
                      Learn More <i className="fa-solid fa-arrow-right text-[0.6rem]" />
                    </span>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Enquiry Form ── */}
        <section id="enquire" className="bg-[#120807] px-4 py-14 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-2xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }} className="mb-10 text-center">
              <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.28em] text-[#fd850b]">Let's Talk</p>
              <h2 className="font-black text-2xl uppercase text-[#FFF7ED] md:text-4xl">Request a Catering Quote</h2>
              <p className="mx-auto mt-3 max-w-md text-xs text-[#C7B8A8] md:text-sm">
                Fill in your details and we'll be in touch within 24 hours.
              </p>
            </motion.div>

            {success && (
              <div className="mb-6 flex items-center gap-3 border border-[#fd850b]/30 bg-[#fd850b]/10 px-5 py-4 text-sm text-[#fd850b]">
                <i className="fa-solid fa-circle-check" />
                <span>Request sent! We'll be in touch within 24 hours.</span>
              </div>
            )}

            <motion.form
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.55, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="space-y-4 border border-white/8 bg-white/4 p-5 md:p-10"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#FFF7ED]">Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your name"
                    className="w-full border border-white/15 bg-white/6 px-3 py-2.5 text-sm text-[#FFF7ED] placeholder-[#FFF7ED]/35 outline-none transition focus:border-[#fd850b] focus:bg-white/10" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#FFF7ED]">Phone *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="Your phone"
                    className="w-full border border-white/15 bg-white/6 px-3 py-2.5 text-sm text-[#FFF7ED] placeholder-[#FFF7ED]/35 outline-none transition focus:border-[#fd850b] focus:bg-white/10" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#FFF7ED]">Event Date</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange}
                    className="w-full border border-white/15 bg-[#1a0d0a] px-3 py-2.5 text-sm text-[#FFF7ED] outline-none transition focus:border-[#fd850b] [color-scheme:dark]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#FFF7ED]">No. of Guests *</label>
                  <input type="number" name="guests" value={form.guests} onChange={handleChange} required placeholder="e.g. 50" min="15" inputMode="numeric"
                    className="w-full border border-white/15 bg-white/6 px-3 py-2.5 text-sm text-[#FFF7ED] placeholder-[#FFF7ED]/35 outline-none transition focus:border-[#fd850b] focus:bg-white/10" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#FFF7ED]">Event Location *</label>
                <input type="text" name="location" value={form.location} onChange={handleChange} required placeholder="Venue or address in Phnom Penh"
                  className="w-full border border-white/15 bg-white/6 px-3 py-2.5 text-sm text-[#FFF7ED] placeholder-[#FFF7ED]/35 outline-none transition focus:border-[#fd850b] focus:bg-white/10" />
              </div>
              <div>
                <label className="mb-1.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#FFF7ED]">Event Type</label>
                <select name="type" value={form.type} onChange={handleChange}
                  className="w-full border border-white/15 bg-[#1a0d0a] px-3 py-2.5 text-sm text-[#FFF7ED] outline-none transition focus:border-[#fd850b]">
                  <option value="">Select type</option>
                  <option value="Full-Service Catering">Full-Service Catering</option>
                  <option value="Pick-Up or Delivery">Pick-Up or Delivery</option>
                  <option value="Build Your Own">Build Your Own Package</option>
                  <option value="Corporate">Corporate Event</option>
                  <option value="Wedding">Wedding / Reception</option>
                  <option value="Birthday">Birthday Celebration</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#FFF7ED]">Additional Details</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                  placeholder="Dietary requirements, theme, or special requests…"
                  className="w-full resize-none border border-white/15 bg-white/6 px-3 py-2.5 text-sm text-[#FFF7ED] placeholder-[#FFF7ED]/35 outline-none transition focus:border-[#fd850b] focus:bg-white/10" />
              </div>
              <button type="submit" disabled={submitting}
                className="w-full bg-[#fd850b] py-3.5 text-sm font-black uppercase tracking-wider text-black shadow-[0_12px_40px_rgba(253,133,11,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ff9a2e] disabled:cursor-not-allowed disabled:opacity-60">
                {submitting
                  ? <><i className="fa-solid fa-spinner fa-spin mr-2" />Sending…</>
                  : <><i className="fa-solid fa-paper-plane mr-2" />Send Catering Request</>}
              </button>
              <p className="text-center text-[0.65rem] text-[#C7B8A8]">
                Or reach us via{' '}
                <a href="https://wa.me/85578938333" target="_blank" rel="noreferrer" className="text-[#fd850b] hover:underline">WhatsApp</a>
                {' '}or{' '}
                <a href="tel:+85578938333" className="text-[#fd850b] hover:underline">+855 78 938 333</a>
              </p>
            </motion.form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
