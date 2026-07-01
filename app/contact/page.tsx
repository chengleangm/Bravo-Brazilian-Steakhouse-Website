'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const vp = { once: true, amount: 0.2 }
import styles from './page.module.css'

const TELEGRAM_URL = 'https://t.me/BravoReservationsTTP'
const WHATSAPP_URL = 'https://wa.me/85510231121'
const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/M9Yce1YsMLbfiKqU8'
const FACEBOOK_URL = 'https://www.facebook.com/bravosteakhousechurrascaria'
const INSTAGRAM_URL = 'https://www.instagram.com/bravobraziliansteakhouse/'
const TIKTOK_URL = 'https://www.tiktok.com/@bravobraziliansteakhouse'

const DEFAULT_HERO = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85'
const DEFAULT_FIND_US_BG = 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1800&q=85'

const FAQS = [
  {
    q: 'How much is the buffet?',
    a: 'Our pricing depends on the time of day and package selected. Message us on WhatsApp or call for the latest rates — we update them seasonally.',
  },
  {
    q: 'Is it all-you-can-eat?',
    a: 'Yes! Our churrasco buffet includes unlimited grill cuts carved tableside by our passadores, plus a full buffet bar of sides, salads, and sauces.',
  },
  {
    q: 'Do you accept walk-ins?',
    a: 'Walk-ins are welcome, but we strongly recommend booking ahead — especially on weekends and public holidays — to guarantee your table.',
  },
  {
    q: 'Do you host private events?',
    a: 'Absolutely. We love hosting celebrations. Message us on WhatsApp to discuss packages for birthdays, corporate dinners, and group bookings.',
  },
  {
    q: 'Any vegetarian options?',
    a: 'Our buffet bar includes vegetarian-friendly sides and salads. Please let us know about dietary requirements when you book and we\'ll do our best to accommodate.',
  },
  {
    q: 'Is there parking nearby?',
    a: 'Yes, there is parking available near the restaurant in Toul Tom Poung, Phnom Penh. Open Google Maps for directions.',
  },
  {
    q: 'What is the dress code?',
    a: 'Smart casual. Come comfortable — this is a place to relax and enjoy a great meal with people you love.',
  },
  {
    q: 'How do I make a reservation?',
    a: 'Use the reservation form on this page, message us on WhatsApp, or call us directly. We\'ll confirm your booking as quickly as possible.',
  },
]

function FAQ() {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set())
  const toggle = (i: number) => setOpenSet(prev => {
    const next = new Set(prev)
    next.has(i) ? next.delete(i) : next.add(i)
    return next
  })

  const renderItem = (item: typeof FAQS[0], i: number) => (
    <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-xl border border-[#D4A373]/15 bg-[#1A0E0A]">
      <button
        type="button"
        onClick={() => toggle(i)}
        className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-[0.62rem] font-black uppercase tracking-[0.06em] transition hover:text-[#fd850b] sm:px-5 sm:py-3.5 sm:text-[0.65rem]"
      >
        <span>{item.q}</span>
        <i className={`fa-solid fa-chevron-down text-[#fd850b] text-[0.55rem] shrink-0 transition-transform duration-300 ${openSet.has(i) ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${openSet.has(i) ? 'max-h-40' : 'max-h-0'}`}>
        <p className="border-t border-[#D4A373]/10 px-3 py-2.5 text-[0.7rem] leading-5 text-[#C7B8A8] sm:px-5 sm:py-4 sm:text-sm sm:leading-6">{item.a}</p>
      </div>
    </motion.div>
  )

  const half = Math.ceil(FAQS.length / 2)

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <div className="flex flex-1 flex-col gap-2">
        {FAQS.slice(0, half).map((item, i) => renderItem(item, i))}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {FAQS.slice(half).map((item, i) => renderItem(item, i + half))}
      </div>
    </div>
  )
}

const RESERVATION_PERKS = [
  {
    label: 'Quick Confirmation',
    copy: 'Send your details and our team will follow up.',
    icon: 'fa-check',
  },
  {
    label: 'Groups Welcome',
    copy: 'Great for birthdays, dates, and team dinners.',
    icon: 'fa-users',
  },
  {
    label: 'Open Daily',
    copy: 'Lunch, dinner, and weekend late tables.',
    icon: 'fa-clock',
  },
]

const RESERVATION_INPUT_CLASS =
  'h-8 w-full min-w-0 rounded border border-white/15 bg-white/10 px-2.5 text-xs leading-none text-cream outline-none transition-all placeholder:text-cream/35 focus:border-orange focus:bg-white/15 focus:shadow-[0_0_0_3px_rgba(253,133,11,0.18)]'

const RESERVATION_LABEL_CLASS =
  'mb-1 block text-[0.6rem] font-black uppercase tracking-[0.12em] text-cream/90'

const CONTACT_METHODS = [
  {
    label: 'Call',
    value: '023 218 211',
    href: 'tel:+85523218211',
    icon: 'fa-solid fa-phone',
  },
  {
    label: 'Call',
    value: '078 938 333',
    href: 'tel:+85578938333',
    icon: 'fa-solid fa-phone',
  },
  {
    label: 'Call',
    value: '078 853 441',
    href: 'tel:+85578853441',
    icon: 'fa-solid fa-phone',
  },
  {
    label: 'WhatsApp',
    value: 'Message us now',
    href: WHATSAPP_URL,
    icon: 'fa-brands fa-whatsapp',
  },
  {
    label: 'Telegram',
    value: 'Bravo reservations',
    href: TELEGRAM_URL,
    icon: 'fa-brands fa-telegram',
  },
  {
    label: 'Visit',
    value: 'Phnom Penh, Cambodia',
    href: null,
    icon: 'fa-solid fa-location-dot',
  },
]

const CONTACT_INPUT_CLASS =
  'w-full min-w-0 rounded border border-dark/10 bg-white/75 px-2.5 py-1.5 text-xs leading-tight text-dark outline-none transition-all placeholder:text-dark/35 focus:border-orange focus:bg-white focus:shadow-[0_0_0_3px_rgba(253,133,11,0.14)]'

const CONTACT_LABEL_CLASS =
  'mb-1 block text-[0.6rem] font-black uppercase tracking-[0.12em] text-dark'

const LOCATION_DETAILS = [
  {
    label: 'Restaurant',
    value: 'Bravo Steakhouse Churrascaria',
    icon: 'fa-utensils',
  },
  {
    label: 'Area',
    value: 'Toul Tom Poung, Phnom Penh',
    icon: 'fa-location-dot',
  },
  {
    label: 'Best For',
    value: 'Reservations, events, and group dining',
    icon: 'fa-people-group',
  },
]

const HOURS = [
  {
    day: 'Monday - Friday',
    time: '11:00 AM – 2:30 PM · 5:30 PM – 10:30 PM',
    note: 'Lunch and dinner service',
    icon: 'fa-calendar-day',
  },
  {
    day: 'Saturday - Sunday',
    time: '11:30 AM – 3:00 PM · 5:30 PM – 10:30 PM',
    note: 'Weekend lunch and dinner',
    icon: 'fa-sun',
  },
]

export default function ContactPage() {
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO)
  const [findUsImage, setFindUsImage] = useState(DEFAULT_FIND_US_BG)

  useEffect(() => {
    fetch('/api/admin/page-images', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => {
        if (d.contactHero) setHeroImage(d.contactHero)
        if (d.contactFindUs) setFindUsImage(d.contactFindUs)
      })
      .catch(() => {})
  }, [])

  const [reservationFormData, setReservationFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    message: '',
  })

  const [resDateMonth, setResDateMonth] = useState('')
  const [resDateDay, setResDateDay] = useState('')
  const [resDateYear, setResDateYear] = useState('')

  const handleResDatePartChange = (part: 'month' | 'day' | 'year', value: string) => {
    const newMonth = part === 'month' ? value : resDateMonth
    const newDay = part === 'day' ? value : resDateDay
    const newYear = part === 'year' ? value : resDateYear
    if (part === 'month') setResDateMonth(value)
    if (part === 'day') setResDateDay(value)
    if (part === 'year') setResDateYear(value)
    if (newMonth && newDay && newYear) {
      setReservationFormData(prev => ({ ...prev, date: `${newYear}-${newMonth}-${newDay}` }))
    }
  }

  const [contactFormData, setContactFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState(
    "Thank you! We've received your message and will get back to you soon."
  )

  const [submitting, setSubmitting] = useState(false)

  const handleReservationChange = (e) => {
    const { name, value } = e.target
    setReservationFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleContactChange = (e) => {
    const { name, value } = e.target
    setContactFormData(prev => ({ ...prev, [name]: value }))
  }

  const sendToTelegram = async (text: string) => {
    const res = await fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
    if (!res.ok) throw new Error('Failed to send')
  }

  const handleReservationSubmit = async (e) => {
    e.preventDefault()
    if (!reservationFormData.name || !reservationFormData.phone || !reservationFormData.date || !reservationFormData.time || !reservationFormData.guests) {
      alert('Please fill in all required fields')
      return
    }
    setSubmitting(true)
    try {
      await sendToTelegram(
        `🍖 <b>New Reservation — BRAVO Website</b>\n` +
        `━━━━━━━━━━━━━━━━━\n` +
        `👤 <b>Name:</b> ${reservationFormData.name}\n` +
        `📞 <b>Phone:</b> ${reservationFormData.phone}\n` +
        `📅 <b>Date:</b> ${reservationFormData.date}\n` +
        `⏰ <b>Time:</b> ${reservationFormData.time}\n` +
        `👥 <b>Guests:</b> ${reservationFormData.guests}\n` +
        (reservationFormData.message ? `💬 <b>Special requests:</b> ${reservationFormData.message}\n` : '') +
        `━━━━━━━━━━━━━━━━━`
      )
      setSuccessMessage('Your reservation has been sent! We will confirm shortly.')
      setShowSuccessModal(true)
      setTimeout(() => setShowSuccessModal(false), 5000)
      setReservationFormData({ name: '', phone: '', date: '', time: '', guests: '', message: '' })
      setResDateMonth('')
      setResDateDay('')
      setResDateYear('')
    } catch {
      alert('Something went wrong. Please call us directly or message via WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    if (!contactFormData.name || !contactFormData.phone || !contactFormData.email || !contactFormData.subject || !contactFormData.message) {
      alert('Please fill in all required fields')
      return
    }
    setSubmitting(true)
    try {
      await sendToTelegram(
        `✉️ <b>New Contact Message — BRAVO Website</b>\n` +
        `━━━━━━━━━━━━━━━━━\n` +
        `👤 <b>Name:</b> ${contactFormData.name}\n` +
        `📞 <b>Phone:</b> ${contactFormData.phone}\n` +
        `📧 <b>Email:</b> ${contactFormData.email}\n` +
        `📌 <b>Subject:</b> ${contactFormData.subject}\n` +
        `💬 <b>Message:</b> ${contactFormData.message}\n` +
        `━━━━━━━━━━━━━━━━━`
      )
      setSuccessMessage('Your message has been sent! We will get back to you soon.')
      setShowSuccessModal(true)
      setTimeout(() => setShowSuccessModal(false), 5000)
      setContactFormData({ name: '', phone: '', email: '', subject: '', message: '' })
    } catch {
      alert('Something went wrong. Please call us directly or message via WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen bg-[#120807]">
      <Header />

      <main>
        {/* Hero Section */}
        <section
          className="relative min-h-96 flex items-center justify-center bg-cover bg-center pt-32 pb-16 px-5 text-center text-white"
          style={{ backgroundImage: `url('${heroImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/70"></div>
          <div className="relative z-10">
            <h1 className="font-black text-5xl md:text-7xl uppercase leading-none drop-shadow-lg">CONTACT US</h1>
          </div>
        </section>

        {/* Map Section */}
        <section
          className="relative overflow-hidden bg-dark bg-cover bg-center px-3 py-8 text-cream sm:px-8 sm:py-20 lg:px-10 lg:py-24"
          style={{ backgroundImage: `url('${findUsImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/70"></div>
          <div className="absolute inset-x-0 top-0 h-px bg-orange/35"></div>
          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="mb-6 grid gap-5 sm:mb-10 sm:gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-orange sm:mb-3 sm:text-sm sm:tracking-[0.25em]">Visit Bravo</p>
                <h2 className="font-black text-4xl uppercase leading-none sm:text-5xl md:text-6xl">Find Us</h2>
                <p className="mt-4 max-w-lg text-sm leading-6 text-cream/70 sm:mt-6 sm:text-lg sm:leading-8">
                  Find BRAVO Steakhouse Churrascaria in Phnom Penh for churrasco, buffet sides, drinks, and celebration tables.
                </p>
              </div>

              <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
                {LOCATION_DETAILS.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded border border-white/10 bg-white/8 p-2.5 sm:block sm:p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-orange text-black sm:mb-4 sm:h-10 sm:w-10">
                      <i className={`fa-solid ${item.icon} text-xs sm:text-base`}></i>
                    </span>
                    <div>
                      <p className="text-[0.66rem] font-black uppercase tracking-[0.16em] text-orange sm:text-xs sm:tracking-[0.18em]">{item.label}</p>
                      <p className="mt-0.5 text-xs font-black leading-4 text-cream sm:mt-2 sm:text-sm sm:leading-6">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid overflow-hidden rounded border border-white/10 bg-[#1f1412] shadow-2xl lg:grid-cols-[0.35fr_0.65fr] lg:items-stretch">
              <div className="border-b border-white/10 p-3 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-orange text-black sm:h-14 sm:w-14">
                    <i className="fa-solid fa-map-location-dot text-sm sm:text-xl"></i>
                  </span>
                  <h3 className="font-black text-[1.18rem] uppercase leading-none sm:text-3xl">Bravo Steakhouse Churrascaria</h3>
                </div>
                <p className="mt-3 text-sm leading-5 text-cream/70 sm:mt-4 sm:text-base sm:leading-7">
                  Phnom Penh, Cambodia. Open daily for fire-grilled Brazilian dining and group bookings.
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-3">
                  <div className="rounded border border-white/10 bg-black/20 p-2.5 sm:p-4">
                    <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-orange sm:text-xs sm:tracking-[0.18em]">Service</p>
                    <p className="mt-1 text-[0.76rem] font-black leading-4 sm:mt-2 sm:text-base sm:leading-6">Lunch, dinner, weekend tables</p>
                  </div>
                  <div className="rounded border border-white/10 bg-black/20 p-2.5 sm:p-4">
                    <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-orange sm:text-xs sm:tracking-[0.18em]">Need help?</p>
                    <p className="mt-1 text-[0.76rem] font-black leading-4 sm:mt-2 sm:text-base sm:leading-6">Call, WhatsApp, Telegram</p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-7 sm:gap-3 lg:grid-cols-1">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded bg-orange px-4 py-2 text-[0.72rem] font-black uppercase tracking-wider text-black transition-all hover:-translate-y-1 hover:bg-yellow sm:px-5 sm:py-3 sm:text-sm"
                  >
                    <i className="fa-solid fa-diamond-turn-right mr-2"></i>
                    Open Map
                  </a>
                  <Link
                    href="/contact#reservation"
                    className="inline-flex items-center justify-center rounded border border-white/20 px-4 py-2 text-[0.72rem] font-black uppercase tracking-wider text-cream transition-all hover:border-orange hover:text-orange sm:px-5 sm:py-3 sm:text-sm"
                  >
                    <i className="fa-solid fa-calendar-check mr-2"></i>
                    Book Table
                  </Link>
                </div>
              </div>

              <div className="relative min-h-[220px] bg-white/10 sm:min-h-[360px] lg:min-h-[520px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7818.48391752572!2d104.9155739!3d11.5344932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513d047ee727%3A0x8ea23f9513babd9e!2sBravo%20Steakhouse%20Churrascaria!5e0!3m2!1sen!2skh!4v1780715930751!5m2!1sen!2skh"
                  className="absolute inset-0 h-full w-full"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="bg-cream px-5 py-12 text-dark sm:py-20 lg:py-28">
          <div className="max-w-6xl mx-auto">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className={styles.contactCardsGrid}>
              {[
                { icon: 'fa-solid fa-phone', label: 'Phone', value: '+855 78 938 333', href: 'tel:+85578938333' },
                { icon: 'fa-solid fa-map-pin', label: 'Location', value: 'Phnom Penh, Cambodia', href: GOOGLE_MAPS_URL },
                { icon: 'fa-brands fa-facebook', label: 'Facebook', value: 'Bravo Steakhouse', href: FACEBOOK_URL },
                { icon: 'fa-brands fa-instagram', label: 'Instagram', value: '@bravobraziliansteakhouse', href: INSTAGRAM_URL },
                { icon: 'fa-brands fa-tiktok', label: 'TikTok', value: '@bravobraziliansteakhouse', href: TIKTOK_URL },
                { icon: 'fa-brands fa-whatsapp', label: 'WhatsApp', value: 'Message Us', href: WHATSAPP_URL },
                { icon: 'fa-brands fa-telegram', label: 'Telegram', value: 'Reservations', href: TELEGRAM_URL },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  className={`${styles.contactInfoCard} bg-white/6 border border-white/9 shadow-custom rounded hover:shadow-2xl hover:-translate-y-2 transition-all`}
                >
                  <div className={styles.contactInfoIcon}>
                    <i className={`${item.icon} text-orange`}></i>
                  </div>
                  <div>
                    <h3 className={styles.contactInfoTitle}>{item.label}</h3>
                    <p className={styles.contactInfoValue}><span className="hover:text-orange transition-colors">{item.value}</span></p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Reservation Form */}
        <section id="reservation" className="relative scroll-mt-0 overflow-hidden bg-dark px-3 pb-5 pt-20 text-cream sm:scroll-mt-0 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=90')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/95 to-black/95"></div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }} className="relative mx-auto grid max-w-6xl gap-4 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="order-2 lg:sticky lg:top-28 lg:order-none">
              <p className="mb-1 text-[0.65rem] font-black uppercase tracking-[0.2em] text-orange sm:mb-3 sm:text-sm sm:tracking-[0.25em]">Book Bravo</p>
              <h2 className="font-black text-2xl uppercase leading-none sm:text-5xl md:text-6xl">Make a Reservation</h2>
              <p className="mt-2 max-w-md text-xs leading-5 text-cream/75 sm:mt-6 sm:text-lg sm:leading-8">
                Save your table for churrasco, buffet sides, cold drinks, and a full Brazilian steakhouse night in Phnom Penh.
              </p>

              <div className="mt-3 grid gap-1.5">
                {RESERVATION_PERKS.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5 rounded-lg border border-[#fd850b]/20 bg-[#fd850b]/6 px-2.5 py-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fd850b]/20">
                      <i className={`fa-solid ${item.icon} text-[#fd850b] text-[0.55rem]`}></i>
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.6rem] font-black uppercase tracking-[0.1em] text-cream">{item.label}</p>
                      <p className="text-[0.58rem] leading-4 text-cream/55">{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:gap-3 lg:flex-col xl:flex-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded border border-white/20 px-3 py-2 text-[0.68rem] font-black uppercase tracking-wider transition-all hover:border-orange hover:text-orange sm:px-5 sm:py-3 sm:text-sm"
                >
                  <i className="fa-brands fa-whatsapp mr-2"></i>
                  WhatsApp
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded border border-white/20 px-3 py-2 text-[0.68rem] font-black uppercase tracking-wider transition-all hover:border-orange hover:text-orange sm:px-5 sm:py-3 sm:text-sm"
                >
                  <i className="fa-brands fa-telegram mr-2"></i>
                  Telegram
                </a>
              </div>
            </div>

            <form onSubmit={handleReservationSubmit} className="order-1 rounded border border-white/10 bg-[#201615]/90 p-2.5 shadow-2xl backdrop-blur sm:p-5 lg:order-none lg:p-6">
              <div className="mb-2.5 flex flex-col gap-1 border-b border-white/10 pb-2.5">
                <div>
                  <p className="mb-0.5 text-[0.58rem] font-black uppercase tracking-[0.16em] text-orange">Reservation Details</p>
                  <h3 className="font-black text-base uppercase leading-none">Tell us about your table</h3>
                </div>
                <p className="text-[0.6rem] font-medium text-cream/55">Required fields marked *</p>
              </div>

              <div className="flex flex-col gap-2">

                {/* Name + Phone side by side */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={RESERVATION_LABEL_CLASS}>Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={reservationFormData.name}
                      onChange={handleReservationChange}
                      className={RESERVATION_INPUT_CLASS}
                      placeholder="Your name"
                      autoComplete="name"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label className={RESERVATION_LABEL_CLASS}>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={reservationFormData.phone}
                      onChange={handleReservationChange}
                      className={RESERVATION_INPUT_CLASS}
                      placeholder="Your phone"
                      autoComplete="tel"
                      inputMode="tel"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                {/* Date — 3 dropdowns */}
                <div>
                  <label className={RESERVATION_LABEL_CLASS}>Date *</label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={resDateMonth}
                      onChange={e => handleResDatePartChange('month', e.target.value)}
                      className="h-8 w-full bg-[#1a0d0a] border border-white/15 text-[#FFF7ED] px-2 rounded text-xs focus:outline-none focus:border-orange transition-all"
                    >
                      <option value="">Month</option>
                      {['01','02','03','04','05','06','07','08','09','10','11','12'].map((m, i) => (
                        <option key={m} value={m} className="bg-[#1a0d0a] text-[#FFF7ED]">
                          {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}
                        </option>
                      ))}
                    </select>
                    <select
                      value={resDateDay}
                      onChange={e => handleResDatePartChange('day', e.target.value)}
                      className="h-8 w-full bg-[#1a0d0a] border border-white/15 text-[#FFF7ED] px-2 rounded text-xs focus:outline-none focus:border-orange transition-all"
                    >
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map(d => (
                        <option key={d} value={d} className="bg-[#1a0d0a] text-[#FFF7ED]">{Number(d)}</option>
                      ))}
                    </select>
                    <select
                      value={resDateYear}
                      onChange={e => handleResDatePartChange('year', e.target.value)}
                      className="h-8 w-full bg-[#1a0d0a] border border-white/15 text-[#FFF7ED] px-2 rounded text-xs focus:outline-none focus:border-orange transition-all"
                    >
                      <option value="">Year</option>
                      {['2026','2027','2028'].map(y => (
                        <option key={y} value={y} className="bg-[#1a0d0a] text-[#FFF7ED]">{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Time + Guests side by side */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={RESERVATION_LABEL_CLASS}>Time *</label>
                    <select
                      name="time"
                      value={reservationFormData.time}
                      onChange={handleReservationChange}
                      className="h-8 w-full bg-[#1a0d0a] border border-white/15 text-[#FFF7ED] px-2 rounded text-xs focus:outline-none focus:border-orange transition-all"
                    >
                      <option value="">Select time</option>
                      {['11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM'].map(t => (
                        <option key={t} value={t} className="bg-[#1a0d0a] text-[#FFF7ED]">{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={RESERVATION_LABEL_CLASS}>Guests *</label>
                    <input
                      type="number"
                      name="guests"
                      value={reservationFormData.guests}
                      onChange={handleReservationChange}
                      className={RESERVATION_INPUT_CLASS}
                      placeholder="e.g. 2"
                      min="1"
                      max="20"
                      inputMode="numeric"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className={RESERVATION_LABEL_CLASS}>Special Requests</label>
                  <textarea
                    name="message"
                    value={reservationFormData.message}
                    onChange={handleReservationChange}
                    className={`${RESERVATION_INPUT_CLASS} min-h-14 resize-none`}
                    placeholder="Any special requests or dietary requirements?"
                    suppressHydrationWarning
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 flex w-full items-center justify-center rounded bg-gradient-to-r from-yellow to-orange px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <><i className="fa-solid fa-spinner fa-spin mr-2"></i> Sending…</>
                ) : (
                  <><i className="fa-solid fa-calendar-check mr-2"></i> Reserve Table</>
                )}
              </button>
            </form>
          </motion.div>
        </section>

        {/* Contact Form */}
        <section className="relative overflow-hidden bg-cream px-3 py-5 text-dark sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="absolute inset-x-0 top-0 h-px bg-dark/10"></div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }} className="mx-auto grid max-w-6xl gap-4 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="order-2 lg:order-none">
              <p className="mb-1 text-[0.65rem] font-black uppercase tracking-[0.2em] text-orange sm:mb-3 sm:text-sm sm:tracking-[0.25em]">Talk to Bravo</p>
              <h2 className="font-black text-2xl uppercase leading-none sm:text-5xl md:text-6xl">Get in Touch</h2>
              <p className="mt-2 max-w-md text-xs leading-5 text-dark/70 sm:mt-6 sm:text-lg sm:leading-8">
                Questions about reservations, private events, menu details, or feedback? Send us a note and the BRAVO team will help.
              </p>

              <div className="mt-3 grid grid-cols-2 gap-1.5 sm:mt-6 sm:gap-2">
                {CONTACT_METHODS.map((method, i) => {
                  const content = (
                    <>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-dark text-orange sm:h-7 sm:w-7">
                        <i className={`${method.icon} text-[0.65rem] sm:text-xs`}></i>
                      </span>
                      <span>
                        <span className="block text-[0.55rem] font-black uppercase tracking-[0.14em] text-orange sm:text-[0.6rem]">{method.label}</span>
                        <span className="mt-0.5 block text-[0.68rem] font-black leading-tight text-dark sm:text-xs">{method.value}</span>
                      </span>
                    </>
                  )

                  if (method.href) {
                    return (
                      <a
                        key={i}
                        href={method.href}
                        target={method.href.startsWith('http') ? '_blank' : undefined}
                        rel={method.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="flex items-center gap-1.5 rounded border border-dark/10 bg-white/75 p-2 shadow-custom transition-all hover:-translate-y-0.5 hover:border-orange/50 hover:bg-white sm:gap-2 sm:p-2.5"
                      >
                        {content}
                      </a>
                    )
                  }

                  return (
                    <div key={i} className="flex items-center gap-1.5 rounded border border-dark/10 bg-white/75 p-2 shadow-custom sm:gap-2 sm:p-2.5">
                      {content}
                    </div>
                  )
                })}
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="order-1 rounded border border-dark/10 bg-white/90 p-2.5 shadow-2xl backdrop-blur sm:p-5 lg:order-none lg:p-6">
              <div className="mb-2.5 flex flex-col gap-1 border-b border-dark/10 pb-2.5">
                <div>
                  <p className="mb-0.5 text-[0.58rem] font-black uppercase tracking-[0.16em] text-orange">Message Details</p>
                  <h3 className="font-black text-base uppercase leading-none">How can we help?</h3>
                </div>
                <p className="text-[0.6rem] font-medium text-dark/55">Required fields marked *</p>
              </div>

              <div className="flex flex-col gap-2">

                {/* Name + Email side by side */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={CONTACT_LABEL_CLASS}>Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={contactFormData.name}
                      onChange={handleContactChange}
                      className={CONTACT_INPUT_CLASS}
                      placeholder="Your name"
                      autoComplete="name"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label className={CONTACT_LABEL_CLASS}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={handleContactChange}
                      className={CONTACT_INPUT_CLASS}
                      placeholder="Your email"
                      autoComplete="email"
                      inputMode="email"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                {/* Phone + Subject side by side */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className={CONTACT_LABEL_CLASS}>Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactFormData.phone}
                      onChange={handleContactChange}
                      className={CONTACT_INPUT_CLASS}
                      placeholder="Your phone"
                      autoComplete="tel"
                      inputMode="tel"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label className={CONTACT_LABEL_CLASS}>Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={contactFormData.subject}
                      onChange={handleContactChange}
                      className={CONTACT_INPUT_CLASS}
                      placeholder="What is this about?"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className={CONTACT_LABEL_CLASS}>Message *</label>
                  <textarea
                    name="message"
                    value={contactFormData.message}
                    onChange={handleContactChange}
                    className={`${CONTACT_INPUT_CLASS} min-h-16 resize-none`}
                    placeholder="Your message"
                    suppressHydrationWarning
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 flex w-full items-center justify-center rounded bg-dark px-4 py-2.5 text-xs font-black uppercase tracking-wider text-cream shadow-lg transition-all hover:-translate-y-1 hover:bg-orange hover:text-black hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <><i className="fa-solid fa-spinner fa-spin mr-2"></i> Sending…</>
                ) : (
                  <><i className="fa-solid fa-paper-plane mr-2"></i> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="bg-[#120807] px-4 py-16 text-[#FFF7ED] sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <div className="absolute inset-x-0 top-0 h-px bg-[#fd850b]/20" />
          <div className="mx-auto max-w-3xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }} className="mb-6 text-center sm:mb-8">
              <p className="mb-1 text-[0.62rem] font-black uppercase tracking-[0.24em] text-[#fd850b]">FAQ</p>
              <h2 className="font-serif text-2xl uppercase leading-tight sm:text-3xl">Common Questions</h2>
            </motion.div>
            <FAQ />
          </div>
        </section>

        {/* Hours */}
        <section className="relative overflow-hidden bg-cream px-3 py-8 text-dark sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="absolute inset-x-0 top-0 h-px bg-orange/30"></div>
          <div className="mx-auto grid max-w-6xl gap-6 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-orange sm:mb-3 sm:text-sm sm:tracking-[0.25em]">Open Daily</p>
              <h2 className="font-black text-4xl uppercase leading-none sm:text-5xl md:text-6xl">Hours of Operation</h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-dark/75 sm:mt-6 sm:text-lg sm:leading-8">
                Visit BRAVO for fire-grilled churrasco, cold drinks, and generous tables throughout the week.
              </p>
              <Link
                href="/contact#reservation"
                className="mt-5 inline-flex items-center justify-center rounded bg-orange px-4 py-2 text-[0.72rem] font-black uppercase tracking-wider text-black shadow-lg transition-all hover:-translate-y-1 hover:bg-yellow sm:mt-8 sm:px-7 sm:py-4 sm:text-sm"
              >
                <i className="fa-solid fa-calendar-check mr-2"></i>
                Reserve a Table
              </Link>
            </div>

            <div className="grid gap-2">
              {HOURS.map((item) => {
                const [lunch, dinner] = item.time.split('·').map(s => s.trim())
                return (
                  <div
                    key={item.day}
                    className="flex items-center justify-between gap-3 rounded border border-dark/10 bg-white/75 px-3 py-2.5 shadow-custom transition-all hover:-translate-y-0.5 hover:border-orange/40 hover:shadow-lg sm:px-4 sm:py-3"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-dark text-orange sm:h-9 sm:w-9">
                        <i className={`fa-solid ${item.icon} text-xs`}></i>
                      </span>
                      <div>
                        <p className="text-xs font-black uppercase leading-none tracking-wide text-dark sm:text-sm">{item.day}</p>
                        <p className="mt-0.5 text-[0.6rem] font-medium text-dark/50 sm:text-xs">{item.note}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="inline-flex items-center gap-1 rounded bg-orange/10 px-2 py-0.5 text-[0.6rem] font-black uppercase tracking-wide text-orange sm:text-xs">
                        <i className="fa-solid fa-sun text-[0.5rem]" /> {lunch}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-dark/8 px-2 py-0.5 text-[0.6rem] font-black uppercase tracking-wide text-dark/70 sm:text-xs">
                        <i className="fa-solid fa-moon text-[0.5rem]" /> {dinner}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-5">
          <div className="bg-gradient-to-br from-dark to-brown border border-orange/30 shadow-2xl rounded max-w-sm w-full p-10 text-center text-cream">
            <div className="w-20 h-20 flex items-center justify-center bg-orange/20 rounded-full mx-auto mb-6">
              <i className="fa-solid fa-check text-orange text-4xl"></i>
            </div>
            <h3 className="font-black text-3xl mb-3">SUCCESS!</h3>
            <p className="text-cream/80 mb-6">{successMessage}</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-6 py-2 bg-orange text-black font-black text-sm uppercase tracking-wider rounded hover:bg-yellow transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
