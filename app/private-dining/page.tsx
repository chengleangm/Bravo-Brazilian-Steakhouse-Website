'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const vp = { once: true, amount: 0.15 }

const WHATSAPP_URL = 'https://wa.me/85510231121'
const TELEGRAM_URL = 'https://t.me/BravoReservationsTTP'

const INPUT_CLASS =
  'w-full min-w-0 rounded border border-white/15 bg-white/10 px-2.5 py-1.5 text-[0.82rem] leading-tight text-[#FFF7ED] outline-none transition-all placeholder:text-[#FFF7ED]/35 focus:border-[#fd850b] focus:bg-white/15 focus:shadow-[0_0_0_3px_rgba(253,133,11,0.18)] sm:px-4 sm:py-3.5 sm:text-base sm:leading-normal'
const LABEL_CLASS =
  'mb-1 block text-[0.66rem] font-black uppercase tracking-[0.14em] text-[#FFF7ED]/90 sm:mb-2.5 sm:text-xs sm:tracking-[0.18em]'
const SELECT_CLASS =
  'w-full bg-[#1a0d0a] border border-white/15 text-[#FFF7ED] px-2 py-2 sm:py-3.5 rounded text-[0.82rem] sm:text-base focus:outline-none focus:border-[#fd850b] transition-all'

const FEATURES = [
  { icon: 'fa-fire-flame-curved', title: 'Authentic Churrasco',  desc: 'Grill cuts carved tableside by our passadores throughout your entire event.' },
  { icon: 'fa-people-group',      title: 'Any Group Size',       desc: 'From intimate dinners for 2 to large celebrations of 50+ guests.' },
  { icon: 'fa-calendar-check',    title: 'Easy to Book',         desc: 'Just fill in the form or message us directly — we handle everything else.' },
]

const PACKAGES = [
  {
    icon: 'fa-champagne-glasses',
    title: 'Birthday Package',
    accent: false,
    items: ['Reserved section', 'Cake & decoration setup', 'Unlimited churrasco', 'Dedicated service'],
    copy: 'Full churrasco buffet, reserved table, cake setup, and group pricing. Make your birthday unforgettable.',
  },
  {
    icon: 'fa-briefcase',
    title: 'Corporate Dining',
    accent: false,
    items: ['Private section', 'Set menus available', 'Drinks packages', 'Invoice billing'],
    copy: 'Impress clients or celebrate your team with a curated churrasco menu and a private corner of the restaurant.',
  },
  {
    icon: 'fa-heart',
    title: 'Date Night',
    accent: true,
    badge: 'Popular',
    items: ['Premium table setup', 'Curated menu', 'Personalised service', 'Wine pairing available'],
    copy: 'A romantic table for two — candlelight, a curated churrasco menu, and attentive service all evening.',
  },
  {
    icon: 'fa-users',
    title: 'Group of 10+',
    accent: false,
    items: ['Reserved dining area', 'Group menu pricing', 'Flexible seating', 'Pre-order available'],
    copy: 'Planning a big group? We reserve the space, set the menus, and take care of every guest from arrival to dessert.',
  },
]

const PERKS = [
  'Private or semi-private section',
  'Dedicated service staff',
  'Unlimited grill cuts included',
  'Drinks & wine packages available',
  'Decoration & setup on request',
  'Available daily · lunch & dinner',
]

export default function PrivateDiningPage() {
  const [form, setForm] = useState({ name: '', phone: '', guests: '', occasion: '', message: '' })
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
    if (!form.name || !form.phone || !form.guests || !form.occasion) {
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
            `🥩 <b>Private Dining Enquiry — BRAVO Website</b>\n` +
            `━━━━━━━━━━━━━━━━━\n` +
            `👤 <b>Name:</b> ${form.name}\n` +
            `📞 <b>Phone:</b> ${form.phone}\n` +
            `📅 <b>Date:</b> ${fullDate || 'Flexible'}\n` +
            `👥 <b>Guests:</b> ${form.guests}\n` +
            `🎉 <b>Occasion:</b> ${form.occasion}\n` +
            (form.message ? `💬 <b>Notes:</b> ${form.message}\n` : '') +
            `━━━━━━━━━━━━━━━━━`,
        }),
      })
      setSuccess(true)
      setForm({ name: '', phone: '', guests: '', occasion: '', message: '' })
      setDateMonth(''); setDateDay(''); setDateYear('')
    } catch {
      alert('Something went wrong. Please contact us directly on WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main className="bg-[#120807] text-[#FFF7ED]">

        {/* ── Hero ── */}
        <section
          className="relative flex min-h-[78vh] items-center justify-center overflow-hidden px-5 pb-0 pt-28 text-center sm:pt-32"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1800&q=85')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,8,7,0.78),rgba(18,8,7,0.5),rgba(18,8,7,0.95))]" />
          <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 pb-20">
            <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
              className="mb-4 text-[0.65rem] font-black uppercase tracking-[0.32em] text-[#fd850b] sm:text-xs sm:tracking-[0.36em]">
              Private Dining
            </motion.p>
            <motion.h1 variants={fadeUp} transition={{ duration: 0.65 }}
              className="font-serif text-5xl font-black uppercase leading-none drop-shadow-xl sm:text-6xl lg:text-7xl xl:text-8xl">
              Your Table.<br />Your Night.
            </motion.h1>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }}
              className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#C7B8A8] sm:text-base sm:leading-8">
              Book the full BRAVO experience for your group — birthdays, corporate dinners, anniversaries, or any celebration worth doing properly.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.55 }} className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#enquire"
                className="inline-flex min-h-12 items-center justify-center bg-[#fd850b] px-7 py-3 text-sm font-black uppercase tracking-[0.14em] text-[#120807] shadow-[0_18px_42px_rgba(253,133,11,0.35)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(253,133,11,0.5)]">
                <i className="fa-solid fa-calendar-check mr-2" />
                Enquire Now
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
          <div className="mx-auto grid max-w-6xl divide-y divide-[#D4A373]/12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center px-8 py-10 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center border border-[#fd850b]/30 bg-[#fd850b]/10 text-[#fd850b]">
                  <i className={`fa-solid ${f.icon} text-lg`} aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-xs font-black uppercase tracking-[0.18em]">{f.title}</h3>
                <p className="text-xs leading-5 text-[#C7B8A8]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Packages ── */}
        <section className="px-4 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }}
              className="mb-10 sm:mb-14 text-center">
              <p className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#fd850b] sm:text-xs">Packages</p>
              <h2 className="font-serif text-3xl uppercase leading-tight sm:text-4xl lg:text-5xl">What We Offer</h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#C7B8A8] sm:text-base">
                Every private dining package is customised. Tell us your occasion and we'll build the right experience.
              </p>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp}
              className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {PACKAGES.map((pkg) => (
                <motion.div key={pkg.title} variants={fadeUp} transition={{ duration: 0.5 }}
                  className={`relative flex flex-col rounded-xl border-2 bg-[#0d0806] p-5 sm:p-6 ${
                    pkg.accent
                      ? 'border-[#fd850b] shadow-[0_0_50px_rgba(253,133,11,0.18)]'
                      : 'border-[#D4A373]/20'
                  }`}>
                  {pkg.badge && (
                    <span className="absolute right-0 top-0 rounded-bl-xl bg-[#fd850b] px-3 py-1 text-[0.6rem] font-black uppercase tracking-[0.18em] text-black">
                      {pkg.badge}
                    </span>
                  )}
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#fd850b]/15">
                    <i className={`fa-solid ${pkg.icon} text-[#fd850b] text-lg`} aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl uppercase leading-tight">{pkg.title}</h3>
                  <p className="mt-2 flex-1 text-xs leading-5 text-[#C7B8A8] sm:text-sm sm:leading-6">{pkg.copy}</p>
                  <div className="my-4 h-px bg-[#D4A373]/15" />
                  <ul className="space-y-2">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[0.72rem] text-[#C7B8A8]">
                        <i className="fa-solid fa-check mt-0.5 shrink-0 text-[0.6rem] text-[#fd850b]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#enquire"
                    className={`mt-5 inline-flex items-center justify-center gap-2 rounded py-2.5 text-xs font-black uppercase tracking-wider transition hover:-translate-y-0.5 ${
                      pkg.accent
                        ? 'bg-[#fd850b] text-black hover:bg-[#ff9a2e]'
                        : 'border border-[#fd850b]/40 text-[#fd850b] hover:bg-[#fd850b] hover:text-black'
                    }`}>
                    <i className="fa-solid fa-paper-plane text-xs" />
                    Enquire
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Enquiry Form ── */}
        <section id="enquire" className="scroll-mt-20 relative overflow-hidden bg-[#1A0E0A] px-4 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <div className="absolute inset-x-0 top-0 h-px bg-[#fd850b]/25" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1800&q=90')] bg-cover bg-center opacity-8" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A0E0A] via-[#1A0E0A]/97 to-black/95" />

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }}
            className="relative mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-16">

            {/* Left */}
            <div className="lg:sticky lg:top-28">
              <p className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.24em] text-[#fd850b] sm:text-xs">Enquire</p>
              <h2 className="font-serif text-3xl uppercase leading-tight sm:text-4xl lg:text-5xl">
                Tell Us About Your Event
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-[#C7B8A8] sm:mt-6 sm:text-base sm:leading-8">
                Fill in the form and our team will reach out within 24 hours to confirm all details and pricing.
              </p>

              <ul className="mt-6 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-2.5 lg:grid-cols-1">
                {PERKS.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-xs font-black uppercase tracking-[0.1em] text-[#C7B8A8]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#fd850b]/20">
                      <i className="fa-solid fa-check text-[#fd850b] text-[0.55rem]" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-2.5 sm:mt-8">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 rounded border border-white/10 bg-white/5 px-4 py-3 text-sm font-black transition hover:border-[#fd850b]/50 hover:text-[#fd850b]">
                  <i className="fa-brands fa-whatsapp text-[#25D366] text-base" />
                  Prefer WhatsApp? Message us directly
                </a>
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 rounded border border-white/10 bg-white/5 px-4 py-3 text-sm font-black transition hover:border-[#fd850b]/50 hover:text-[#fd850b]">
                  <i className="fa-brands fa-telegram text-[#29A8E0] text-base" />
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
                <h3 className="font-serif text-2xl uppercase">Enquiry Sent!</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-[#C7B8A8]">
                  Our team will contact you within 24 hours to confirm your private dining details and pricing.
                </p>
                <button onClick={() => setSuccess(false)}
                  className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-[#fd850b] hover:text-white transition">
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}
                className="rounded border border-white/10 bg-[#201615]/90 p-3 shadow-2xl backdrop-blur sm:p-8 lg:p-10">

                <div className="mb-3 flex flex-col gap-1 border-b border-white/10 pb-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-3 sm:pb-6">
                  <div>
                    <p className="mb-1 text-[0.66rem] font-black uppercase tracking-[0.16em] text-[#fd850b] sm:mb-2 sm:text-xs sm:tracking-[0.2em]">Private Dining Enquiry</p>
                    <h3 className="font-black text-[1.35rem] uppercase leading-none sm:text-3xl">Tell us about your event</h3>
                  </div>
                  <p className="text-xs font-medium text-[#FFF7ED]/55 sm:text-sm">Required fields marked *</p>
                </div>

                <div className="flex flex-col gap-2.5 sm:gap-4">

                  {/* Name + Phone */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
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
                    <label className={LABEL_CLASS}>Preferred Date</label>
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
                        {['2026','2027','2028'].map(y => (
                          <option key={y} value={y} className="bg-[#1a0d0a] text-[#FFF7ED]">{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Guests + Occasion */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                    <div>
                      <label className={LABEL_CLASS}>Number of Guests *</label>
                      <input type="number" name="guests" value={form.guests} onChange={handleChange}
                        className={INPUT_CLASS} placeholder="e.g. 10" min="1" inputMode="numeric" />
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Occasion *</label>
                      <select name="occasion" value={form.occasion} onChange={handleChange} className={SELECT_CLASS}>
                        <option value="">Select occasion</option>
                        <option value="Birthday"          className="bg-[#1a0d0a] text-[#FFF7ED]">Birthday Party</option>
                        <option value="Corporate"         className="bg-[#1a0d0a] text-[#FFF7ED]">Corporate Dinner</option>
                        <option value="Anniversary"       className="bg-[#1a0d0a] text-[#FFF7ED]">Anniversary</option>
                        <option value="Date Night"        className="bg-[#1a0d0a] text-[#FFF7ED]">Date Night</option>
                        <option value="Team Celebration"  className="bg-[#1a0d0a] text-[#FFF7ED]">Team Celebration</option>
                        <option value="Other"             className="bg-[#1a0d0a] text-[#FFF7ED]">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className={LABEL_CLASS}>Special Requests</label>
                    <textarea name="message" value={form.message} onChange={handleChange}
                      className={`${INPUT_CLASS} min-h-16 resize-none sm:min-h-28`}
                      placeholder="Dietary requirements, decoration requests, or anything else we should know…" />
                  </div>
                </div>

                <button type="submit" disabled={submitting}
                  className="mt-3 flex w-full items-center justify-center rounded bg-gradient-to-r from-[#e87200] to-[#fd850b] px-4 py-3 text-sm font-black uppercase tracking-wider text-black shadow-lg transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(253,133,11,0.45)] disabled:cursor-not-allowed disabled:opacity-60 sm:mt-6 sm:px-6 sm:py-4">
                  {submitting
                    ? <><i className="fa-solid fa-spinner fa-spin mr-2" />Sending…</>
                    : <><i className="fa-solid fa-paper-plane mr-2" />Send Enquiry</>}
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
    </>
  )
}
