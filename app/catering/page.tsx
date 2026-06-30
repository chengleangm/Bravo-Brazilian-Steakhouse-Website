'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const vp = { once: true, amount: 0.18 }

const HERO_BG = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=85'

const SERVICES = [
  { icon: 'fa-building', title: 'Corporate Catering', desc: 'Impress clients and teams with live churrasco stations, buffet spreads, and full-service setup at your office or venue.' },
  { icon: 'fa-cake-candles', title: 'Private Celebrations', desc: 'Birthdays, anniversaries, and milestones deserve fire-grilled perfection. We bring BRAVO to your chosen location.' },
  { icon: 'fa-people-roof', title: 'Outdoor & Garden Events', desc: 'Garden parties, rooftop dinners, poolside gatherings — our mobile grill stations work anywhere.' },
  { icon: 'fa-ring', title: 'Weddings & Receptions', desc: 'A churrasco feast is an unforgettable wedding statement. We handle the fire so you enjoy your day.' },
  { icon: 'fa-graduation-cap', title: 'School & College Events', desc: 'Graduation dinners, award nights, and alumni gatherings with a feast that stands out.' },
  { icon: 'fa-handshake', title: 'Community & NGO Events', desc: 'Fundraisers, cultural events, and community gatherings — we\'re proud to support Phnom Penh\'s community.' },
]

const PACKAGES = [
  {
    name: 'Essential',
    from: '$14.90',
    perPerson: true,
    minGuests: 20,
    color: 'border-[#D4A373]/30',
    accent: false,
    features: [
      '8+ grilled meat cuts',
      'Rice & farofa',
      'House salad bar',
      'Basic setup & service',
      'Min. 20 guests',
    ],
  },
  {
    name: 'Classic',
    from: '$18.90',
    perPerson: true,
    minGuests: 30,
    color: 'border-[#fd850b]',
    accent: true,
    badge: 'Most Popular',
    features: [
      '12+ grilled meat cuts',
      'Full hot buffet sides',
      'Salad bar & sauces',
      'Dedicated grill station',
      'Trained service staff',
      'Min. 30 guests',
    ],
  },
  {
    name: 'Premium',
    from: '$24.90',
    perPerson: true,
    minGuests: 40,
    color: 'border-[#D4A373]/30',
    accent: false,
    features: [
      '15+ grilled meat cuts',
      'Full buffet + dessert',
      'Premium drinks setup',
      'Branded churrasco station',
      'Event coordinator',
      'Setup & cleanup included',
      'Min. 40 guests',
    ],
  },
]

const HOW_IT_WORKS = [
  { step: '01', icon: 'fa-comments', title: 'Enquire', desc: 'Tell us your event date, location, guest count, and type. We\'ll get back within 24 hours.' },
  { step: '02', icon: 'fa-clipboard-list', title: 'Customise', desc: 'We tailor a menu and setup plan to match your event, budget, and guests.' },
  { step: '03', icon: 'fa-calendar-check', title: 'Confirm', desc: 'Lock in your date with a deposit. We handle all logistics from there.' },
  { step: '04', icon: 'fa-fire-flame-curved', title: 'We Deliver', desc: 'Our team arrives early, sets up, grills fresh, serves your guests, and cleans up after.' },
]

const WHY = [
  { icon: 'fa-fire-flame-curved', title: 'Live Fire Experience', desc: 'Tableside carving and live grill stations create a spectacle guests talk about long after.' },
  { icon: 'fa-utensils', title: 'Full-Service Setup', desc: 'We bring everything — grill, equipment, staff, and food. You provide the space.' },
  { icon: 'fa-sliders', title: 'Fully Flexible', desc: 'Menus adapt to dietary needs, headcounts from 20 to 500+, and any venue type.' },
  { icon: 'fa-shield-halved', title: 'Reliable & Punctual', desc: 'We take pride in arriving on time, fully prepared, and executing without stress to you.' },
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
    if (!form.name || !form.phone || !form.date || !form.guests || !form.location) {
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
            `📅 <b>Date:</b> ${form.date}\n` +
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
          className="relative flex min-h-[60vh] items-center justify-center bg-cover bg-center px-5 pb-16 pt-36 text-center text-white"
          style={{ backgroundImage: `url('${HERO_BG}')`, backgroundAttachment: 'fixed' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/80" />
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-[0.65rem] font-black uppercase tracking-[0.32em] text-[#fd850b]"
            >
              We Come to You
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-black text-7xl uppercase leading-none drop-shadow-lg md:text-9xl"
            >
              CATERING
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mx-auto mt-5 max-w-md text-base text-white/80 md:text-xl"
            >
              Authentic Brazilian churrasco delivered to your event — anywhere in Phnom Penh.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href="#enquire"
                className="inline-flex items-center gap-2 bg-[#fd850b] px-8 py-3 text-xs font-black uppercase tracking-widest text-black transition hover:-translate-y-0.5 hover:bg-[#ff9a2e]"
              >
                <i className="fa-solid fa-paper-plane text-xs" />
                Get a Quote
              </a>
              <a
                href="https://wa.me/85578938333"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/40 bg-white/8 px-8 py-3 text-xs font-black uppercase tracking-widest text-white backdrop-blur-sm transition hover:border-[#fd850b] hover:bg-[#fd850b] hover:text-black"
              >
                <i className="fa-brands fa-whatsapp text-xs" />
                WhatsApp Us
              </a>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="bg-[#0a0805] px-5 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }} className="mb-12 text-center">
              <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.28em] text-[#fd850b]">What We Cover</p>
              <h2 className="font-black text-3xl uppercase text-[#FFF7ED] md:text-5xl">Catering for Every Occasion</h2>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <motion.div
                  key={s.title}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="group border border-white/8 bg-white/4 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#fd850b]/40 hover:bg-white/6 md:p-7"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center bg-[#fd850b]/12 text-[#fd850b] transition group-hover:bg-[#fd850b] group-hover:text-black md:h-14 md:w-14">
                    <i className={`fa-solid ${s.icon} text-sm md:text-xl`} aria-hidden="true" />
                  </div>
                  <h3 className="font-black text-sm uppercase text-[#FFF7ED] md:text-lg">{s.title}</h3>
                  <p className="mt-1.5 text-[0.7rem] leading-5 text-[#C7B8A8] md:mt-2 md:text-sm md:leading-6">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Packages */}
        <section className="bg-[#120807] px-5 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }} className="mb-12 text-center">
              <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.28em] text-[#fd850b]">Pricing</p>
              <h2 className="font-black text-3xl uppercase text-[#FFF7ED] md:text-5xl">Catering Packages</h2>
              <p className="mx-auto mt-3 max-w-lg text-xs text-[#C7B8A8] md:text-sm">
                All packages include delivery, setup, live grilling, service staff, and cleanup. Custom menus available on request.
              </p>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="grid gap-4 md:grid-cols-3 md:gap-6">
              {PACKAGES.map((pkg) => (
                <motion.div
                  key={pkg.name}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className={`relative flex flex-col border-2 bg-[#0d0806] p-5 md:p-7 ${pkg.color} ${pkg.accent ? 'shadow-[0_0_40px_rgba(253,133,11,0.18)]' : ''}`}
                >
                  {pkg.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fd850b] px-4 py-1 text-[0.6rem] font-black uppercase tracking-[0.18em] text-black">
                      {pkg.badge}
                    </span>
                  )}
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#C7B8A8]">{pkg.name}</p>
                  <p className={`mt-1 font-black text-3xl md:text-4xl ${pkg.accent ? 'text-[#fd850b]' : 'text-[#FFF7ED]'}`}>
                    {pkg.from}
                  </p>
                  <p className="mt-0.5 text-[0.65rem] text-[#C7B8A8]">per person · min {pkg.minGuests} guests</p>
                  <div className="my-4 h-px bg-[#D4A373]/15" />
                  <ul className="flex-1 space-y-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[0.72rem] text-[#C7B8A8] md:text-sm">
                        <i className="fa-solid fa-check mt-0.5 shrink-0 text-[#fd850b] text-[0.6rem]" />
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

        {/* How It Works */}
        <section className="bg-[#f4eadb] px-5 py-16 text-[#120807] sm:py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }} className="mb-12 text-center">
              <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.28em] text-[#fd850b]">Simple Process</p>
              <h2 className="font-black text-3xl uppercase md:text-5xl">How It Works</h2>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
              {HOW_IT_WORKS.map((step) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="group relative border border-[#D4A373]/30 bg-[#fff7ed] p-5 transition hover:-translate-y-1 hover:border-[#fd850b]/50 md:p-7"
                >
                  <span className="font-serif text-4xl font-black leading-none text-[#120807]/8">{step.step}</span>
                  <div className="mt-2 flex h-10 w-10 items-center justify-center bg-[#fd850b]/12 text-[#fd850b] transition group-hover:bg-[#fd850b] group-hover:text-black">
                    <i className={`fa-solid ${step.icon} text-sm`} aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 font-black text-base uppercase">{step.title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-[#4b352b] md:text-sm md:leading-6">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why BRAVO Catering */}
        <section className="bg-[#0a0805] px-5 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }} className="mb-12 text-center">
              <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.28em] text-[#fd850b]">Why Choose Us</p>
              <h2 className="font-black text-3xl uppercase text-[#FFF7ED] md:text-5xl">Why BRAVO Catering</h2>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
              {WHY.map((w, i) => (
                <motion.div
                  key={w.title}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="group border border-white/8 bg-white/4 p-5 transition hover:-translate-y-1 hover:border-[#fd850b]/35"
                >
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="flex h-10 w-10 items-center justify-center bg-[#fd850b]/12 text-[#fd850b] transition group-hover:bg-[#fd850b] group-hover:text-black">
                      <i className={`fa-solid ${w.icon} text-sm`} aria-hidden="true" />
                    </div>
                    <span className="font-serif text-3xl font-black leading-none text-white/6">0{i + 1}</span>
                  </div>
                  <h3 className="font-black text-sm uppercase text-[#FFF7ED] md:text-base">{w.title}</h3>
                  <p className="mt-1.5 text-[0.7rem] leading-5 text-[#C7B8A8] md:text-sm md:leading-6">{w.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Enquiry Form */}
        <section id="enquire" className="bg-[#120807] px-3 py-14 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-2xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }} className="mb-8 text-center md:mb-12">
              <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.28em] text-[#fd850b]">Let's Talk</p>
              <h2 className="font-black text-2xl uppercase text-[#FFF7ED] md:text-4xl">Request a Catering Quote</h2>
              <p className="mx-auto mt-3 max-w-md text-xs text-[#C7B8A8] md:text-sm">
                Fill in your details and we'll send you a custom quote within 24 hours.
              </p>
            </motion.div>

            {success && (
              <div className="mb-6 flex items-center gap-3 border border-[#fd850b]/30 bg-[#fd850b]/10 px-5 py-4 text-sm text-[#fd850b]">
                <i className="fa-solid fa-circle-check" />
                <span>Request sent! We'll be in touch within 24 hours.</span>
              </div>
            )}

            <motion.form
              variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="space-y-4 border border-white/8 bg-white/4 p-5 md:p-10"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#FFF7ED] md:text-xs">Name *</label>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange} required
                    placeholder="Your name"
                    className="w-full border border-white/15 bg-white/6 px-3 py-2.5 text-sm text-[#FFF7ED] placeholder-[#FFF7ED]/35 outline-none transition focus:border-[#fd850b] focus:bg-white/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#FFF7ED] md:text-xs">Phone *</label>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange} required
                    placeholder="Your phone"
                    className="w-full border border-white/15 bg-white/6 px-3 py-2.5 text-sm text-[#FFF7ED] placeholder-[#FFF7ED]/35 outline-none transition focus:border-[#fd850b] focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#FFF7ED] md:text-xs">Event Date *</label>
                  <input
                    type="date" name="date" value={form.date} onChange={handleChange} required
                    className="w-full border border-white/15 bg-[#1a0d0a] px-3 py-2.5 text-sm text-[#FFF7ED] outline-none transition focus:border-[#fd850b] [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#FFF7ED] md:text-xs">No. of Guests *</label>
                  <input
                    type="number" name="guests" value={form.guests} onChange={handleChange} required
                    placeholder="e.g. 50" min="20" inputMode="numeric"
                    className="w-full border border-white/15 bg-white/6 px-3 py-2.5 text-sm text-[#FFF7ED] placeholder-[#FFF7ED]/35 outline-none transition focus:border-[#fd850b] focus:bg-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#FFF7ED] md:text-xs">Event Location *</label>
                <input
                  type="text" name="location" value={form.location} onChange={handleChange} required
                  placeholder="Venue or address in Phnom Penh"
                  className="w-full border border-white/15 bg-white/6 px-3 py-2.5 text-sm text-[#FFF7ED] placeholder-[#FFF7ED]/35 outline-none transition focus:border-[#fd850b] focus:bg-white/10"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#FFF7ED] md:text-xs">Event Type</label>
                <select
                  name="type" value={form.type} onChange={handleChange}
                  className="w-full border border-white/15 bg-[#1a0d0a] px-3 py-2.5 text-sm text-[#FFF7ED] outline-none transition focus:border-[#fd850b]"
                >
                  <option value="">Select type</option>
                  <option value="Corporate">Corporate Event</option>
                  <option value="Birthday">Birthday Celebration</option>
                  <option value="Wedding">Wedding / Reception</option>
                  <option value="Outdoor">Outdoor / Garden Party</option>
                  <option value="School">School / College Event</option>
                  <option value="Community">Community / NGO Event</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-[0.6rem] font-black uppercase tracking-wider text-[#FFF7ED] md:text-xs">Additional Details</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange} rows={4}
                  placeholder="Any dietary requirements, theme, or special requests…"
                  className="w-full resize-none border border-white/15 bg-white/6 px-3 py-2.5 text-sm text-[#FFF7ED] placeholder-[#FFF7ED]/35 outline-none transition focus:border-[#fd850b] focus:bg-white/10"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#fd850b] py-3.5 text-sm font-black uppercase tracking-wider text-black shadow-[0_12px_40px_rgba(253,133,11,0.3)] transition hover:-translate-y-0.5 hover:bg-[#ff9a2e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <><i className="fa-solid fa-spinner fa-spin mr-2" /> Sending…</>
                ) : (
                  <><i className="fa-solid fa-paper-plane mr-2" /> Send Catering Request</>
                )}
              </button>

              <p className="text-center text-[0.65rem] text-[#C7B8A8]">
                Or reach us directly via{' '}
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
