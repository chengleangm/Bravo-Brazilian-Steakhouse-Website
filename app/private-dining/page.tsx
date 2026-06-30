'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const vp = { once: true, amount: 0.18 }

const WHATSAPP_URL = 'https://wa.me/85578938333'
const TELEGRAM_URL = 'https://t.me/BravoReservationsTTP'

const PACKAGES = [
  {
    icon: 'fa-champagne-glasses',
    title: 'Birthday Package',
    copy: 'Full churrasco buffet, reserved table, cake setup, and group pricing. We make your birthday night memorable.',
    items: ['Reserved section', 'Cake & decoration setup', 'Unlimited churrasco', 'Dedicated service'],
  },
  {
    icon: 'fa-briefcase',
    title: 'Corporate Dining',
    copy: 'Impress clients or celebrate your team. Fixed group menus, drinks packages, and a private corner of the restaurant.',
    items: ['Private section', 'Set menus available', 'Drinks packages', 'Invoice billing'],
  },
  {
    icon: 'fa-heart',
    title: 'Date Night',
    copy: 'A romantic table for two with candlelight, a curated churrasco menu, and attentive service throughout the evening.',
    items: ['Premium table setup', 'Curated menu', 'Wine pairing available', 'Personalised service'],
  },
  {
    icon: 'fa-users',
    title: 'Group of 10+',
    copy: 'Planning a big group? We reserve the space, set the menus, and ensure every guest is taken care of from arrival to dessert.',
    items: ['Reserved dining area', 'Group menu pricing', 'Flexible seating', 'Pre-order available'],
  },
]

const PERKS = [
  { icon: 'fa-fire-flame-curved', label: 'Authentic Churrasco', copy: 'Grill cuts carved tableside by our passadores throughout your event.' },
  { icon: 'fa-people-group', label: 'Any Group Size', copy: 'From intimate dinners for 2 to large groups of 50+.' },
  { icon: 'fa-calendar-check', label: 'Easy to Book', copy: 'Just message us on WhatsApp or Telegram — we\'ll handle the rest.' },
  { icon: 'fa-location-dot', label: 'Phnom Penh', copy: 'Located in Toul Tom Poung, Phnom Penh. Central and easy to find.' },
]

const INPUT_CLASS =
  'w-full min-w-0 rounded border border-white/15 bg-white/10 px-3 py-2.5 text-[0.85rem] leading-tight text-[#FFF7ED] outline-none transition-all placeholder:text-[#C7B8A8]/40 focus:border-[#fd850b] focus:bg-white/15 focus:shadow-[0_0_0_3px_rgba(253,133,11,0.18)] sm:px-4 sm:py-3.5 sm:text-base'
const LABEL_CLASS =
  'mb-1.5 block text-[0.66rem] font-black uppercase tracking-[0.16em] text-[#C7B8A8] sm:mb-2 sm:text-xs sm:tracking-[0.2em]'

export default function PrivateDiningPage() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', guests: '', occasion: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.guests || !form.occasion) {
      alert('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    try {
      const text =
        `🥩 <b>Private Dining Enquiry — BRAVO Website</b>\n` +
        `━━━━━━━━━━━━━━━━━\n` +
        `👤 <b>Name:</b> ${form.name}\n` +
        `📞 <b>Phone:</b> ${form.phone}\n` +
        `📅 <b>Date:</b> ${form.date || 'Flexible'}\n` +
        `👥 <b>Guests:</b> ${form.guests}\n` +
        `🎉 <b>Occasion:</b> ${form.occasion}\n` +
        (form.message ? `💬 <b>Notes:</b> ${form.message}\n` : '') +
        `━━━━━━━━━━━━━━━━━`
      await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      setSent(true)
      setForm({ name: '', phone: '', date: '', guests: '', occasion: '', message: '' })
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

        {/* Hero */}
        <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 py-28 text-center sm:px-8 lg:px-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1800&q=85')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(18,8,7,0.85),rgba(18,8,7,0.55),rgba(18,8,7,0.9))]" />
          <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ duration: 0.8 }} className="relative z-10 pt-14">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.28em] text-[#fd850b]">Private Dining</p>
            <h1 className="font-serif text-4xl font-black uppercase leading-none drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
              Your Table.<br />Your Night.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#C7B8A8] sm:text-lg sm:leading-8">
              Book the full BRAVO experience for your group — birthdays, corporate events, anniversaries, or any celebration worth doing right.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#enquire" className="inline-flex min-h-12 items-center justify-center bg-[#fd850b] px-7 py-3 text-sm font-black uppercase tracking-[0.14em] text-[#120807] shadow-[0_18px_42px_rgba(253,133,11,0.35)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(253,133,11,0.5)]">
                <i className="fa-solid fa-calendar-check mr-2" />
                Enquire Now
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center border border-white/25 px-7 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:border-[#fd850b] hover:text-[#fd850b]">
                <i className="fa-brands fa-whatsapp mr-2" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </section>

        {/* Perks strip */}
        <section className="border-y border-[#D4A373]/15 bg-[#1A0E0A] px-4 py-8 sm:px-8 sm:py-12 lg:px-10">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp}
            className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PERKS.map((p) => (
              <motion.div key={p.label} variants={fadeUp} transition={{ duration: 0.5 }} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fd850b]/15">
                  <i className={`fa-solid ${p.icon} text-[#fd850b]`} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm font-black uppercase leading-none">{p.label}</h3>
                  <p className="mt-1 text-xs leading-5 text-[#C7B8A8]">{p.copy}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Packages */}
        <section className="px-4 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }} className="mb-10 sm:mb-14">
              <p className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.24em] text-[#fd850b] sm:text-xs">Packages</p>
              <h2 className="font-serif text-3xl uppercase leading-tight sm:text-4xl lg:text-5xl">What We Offer</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-[#C7B8A8] sm:text-base sm:leading-8">Every private dining package is customised. Tell us your occasion and we'll put together the right experience.</p>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp}
              className="grid gap-5 sm:grid-cols-2 lg:gap-6">
              {PACKAGES.map((pkg) => (
                <motion.div key={pkg.title} variants={fadeUp} transition={{ duration: 0.5 }}
                  className="rounded-xl border border-[#D4A373]/15 bg-[#1A0E0A] p-6 sm:p-8 transition hover:border-[#fd850b]/35">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#fd850b]/15">
                    <i className={`fa-solid ${pkg.icon} text-[#fd850b] text-xl`} aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-2xl uppercase leading-tight">{pkg.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#C7B8A8]">{pkg.copy}</p>
                  <ul className="mt-5 space-y-2">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-xs font-black uppercase tracking-[0.1em] text-[#C7B8A8]">
                        <i className="fa-solid fa-check text-[#fd850b] text-[0.6rem]" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Enquiry Form */}
        <section id="enquire" className="scroll-mt-20 relative overflow-hidden bg-[#1A0E0A] px-4 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <div className="absolute inset-x-0 top-0 h-px bg-[#fd850b]/25" />
          <div className="mx-auto max-w-5xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }}
              className="mb-10 sm:mb-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">

              {/* Left: copy */}
              <div>
                <p className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.24em] text-[#fd850b] sm:text-xs">Enquire</p>
                <h2 className="font-serif text-3xl uppercase leading-tight sm:text-4xl lg:text-5xl">Tell Us About Your Event</h2>
                <p className="mt-4 text-sm leading-6 text-[#C7B8A8] sm:text-base sm:leading-8">
                  Fill in the form and our team will reach out within 24 hours to confirm details and pricing.
                </p>
                <div className="mt-6 space-y-3 sm:mt-8">
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 rounded border border-white/10 bg-white/5 px-4 py-3 text-sm font-black transition hover:border-[#fd850b]/50 hover:text-[#fd850b]">
                    <i className="fa-brands fa-whatsapp text-[#25D366] text-base" />
                    Prefer WhatsApp? Message us directly
                  </a>
                  <a href={TELEGRAM_URL} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 rounded border border-white/10 bg-white/5 px-4 py-3 text-sm font-black transition hover:border-[#fd850b]/50 hover:text-[#fd850b]">
                    <i className="fa-brands fa-telegram text-[#29A8E0] text-base" />
                    Message us on Telegram
                  </a>
                </div>
              </div>

              {/* Right: form */}
              {sent ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-[#fd850b]/30 bg-[#120807] p-12 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fd850b]/20">
                    <i className="fa-solid fa-check text-[#fd850b] text-2xl" />
                  </div>
                  <h3 className="font-serif text-2xl uppercase">Enquiry Sent!</h3>
                  <p className="mt-3 text-sm leading-6 text-[#C7B8A8]">Our team will contact you within 24 hours to confirm your private dining details.</p>
                  <button onClick={() => setSent(false)} className="mt-6 text-xs font-black uppercase tracking-[0.14em] text-[#fd850b] hover:text-white transition">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-xl border border-white/10 bg-[#120807] p-5 sm:p-8">
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={LABEL_CLASS}>Name *</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} className={INPUT_CLASS} placeholder="Your name" />
                      </div>
                      <div>
                        <label className={LABEL_CLASS}>Phone *</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} className={INPUT_CLASS} placeholder="Your phone" inputMode="tel" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={LABEL_CLASS}>Preferred Date</label>
                        <input type="text" name="date" value={form.date} onChange={handleChange} className={INPUT_CLASS} placeholder="e.g. 15 July 2026" />
                      </div>
                      <div>
                        <label className={LABEL_CLASS}>Number of Guests *</label>
                        <input type="number" name="guests" value={form.guests} onChange={handleChange} className={INPUT_CLASS} placeholder="e.g. 20" min="1" inputMode="numeric" />
                      </div>
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Occasion *</label>
                      <select name="occasion" value={form.occasion} onChange={handleChange}
                        className="w-full bg-[#1a0d0a] border border-white/15 text-[#FFF7ED] px-3 py-2.5 rounded text-[0.85rem] sm:text-base focus:outline-none focus:border-[#fd850b] transition-all">
                        <option value="">Select occasion</option>
                        <option value="Birthday">Birthday Party</option>
                        <option value="Corporate">Corporate Dinner</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Date Night">Date Night</option>
                        <option value="Team Celebration">Team Celebration</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className={LABEL_CLASS}>Additional Notes</label>
                      <textarea name="message" value={form.message} onChange={handleChange}
                        className={`${INPUT_CLASS} min-h-24 resize-none`}
                        placeholder="Dietary requirements, decoration requests, or anything else we should know..." />
                    </div>
                    <button type="submit" disabled={submitting}
                      className="flex w-full items-center justify-center rounded bg-[#fd850b] px-6 py-4 text-sm font-black uppercase tracking-wider text-[#120807] shadow-[0_8px_32px_rgba(253,133,11,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(253,133,11,0.5)] disabled:opacity-60">
                      {submitting
                        ? <><i className="fa-solid fa-spinner fa-spin mr-2" /> Sending…</>
                        : <><i className="fa-solid fa-paper-plane mr-2" /> Send Enquiry</>}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
