'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import styles from './page.module.css'

const TELEGRAM_URL = 'https://t.me/BravoReservationsTTP'
const WHATSAPP_URL = 'https://wa.me/85578938333'
const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/M9Yce1YsMLbfiKqU8'

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
  'w-full min-w-0 rounded border border-white/15 bg-white/10 px-2.5 py-1.5 text-[0.82rem] leading-tight text-cream outline-none transition-all placeholder:text-cream/35 focus:border-orange focus:bg-white/15 focus:shadow-[0_0_0_3px_rgba(253,133,11,0.18)] sm:px-4 sm:py-3.5 sm:text-base sm:leading-normal'

const RESERVATION_LABEL_CLASS =
  'mb-1 block text-[0.66rem] font-black uppercase tracking-[0.14em] text-cream/90 sm:mb-2.5 sm:text-xs sm:tracking-[0.18em]'

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
  'w-full min-w-0 rounded border border-dark/10 bg-white/75 px-2.5 py-1.5 text-[0.82rem] leading-tight text-dark outline-none transition-all placeholder:text-dark/35 focus:border-orange focus:bg-white focus:shadow-[0_0_0_3px_rgba(253,133,11,0.14)] sm:px-4 sm:py-3.5 sm:text-base sm:leading-normal'

const CONTACT_LABEL_CLASS =
  'mb-1 block text-[0.66rem] font-black uppercase tracking-[0.14em] text-dark sm:mb-2.5 sm:text-xs sm:tracking-[0.18em]'

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

  const handleReservationChange = (e) => {
    const { name, value } = e.target
    setReservationFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleContactChange = (e) => {
    const { name, value } = e.target
    setContactFormData(prev => ({ ...prev, [name]: value }))
  }

  const openWhatsAppMessage = (lines) => {
    const message = lines.filter(Boolean).join('\n')
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  const handleReservationSubmit = (e) => {
    e.preventDefault()
    if (!reservationFormData.name || !reservationFormData.phone || !reservationFormData.date || !reservationFormData.time || !reservationFormData.guests) {
      alert('Please fill in all required fields')
      return
    }
    openWhatsAppMessage([
      'New reservation request from BRAVO website',
      `Name: ${reservationFormData.name}`,
      `Phone: ${reservationFormData.phone}`,
      `Date: ${reservationFormData.date}`,
      `Time: ${reservationFormData.time}`,
      `Guests: ${reservationFormData.guests}`,
      reservationFormData.message ? `Special requests: ${reservationFormData.message}` : '',
    ])
    setSuccessMessage('WhatsApp is opening with your reservation details. Please send the message there to complete the request.')
    setShowSuccessModal(true)
    setTimeout(() => setShowSuccessModal(false), 5000)
    setReservationFormData({ name: '', phone: '', date: '', time: '', guests: '', message: '' })
    setResDateMonth('')
    setResDateDay('')
    setResDateYear('')
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    if (!contactFormData.name || !contactFormData.phone || !contactFormData.email || !contactFormData.subject || !contactFormData.message) {
      alert('Please fill in all required fields')
      return
    }
    openWhatsAppMessage([
      'New contact message from BRAVO website',
      `Name: ${contactFormData.name}`,
      `Phone: ${contactFormData.phone}`,
      `Email: ${contactFormData.email}`,
      `Subject: ${contactFormData.subject}`,
      `Message: ${contactFormData.message}`,
    ])
    setSuccessMessage('WhatsApp is opening with your message. Please send it there so the BRAVO team receives it.')
    setShowSuccessModal(true)
    setTimeout(() => setShowSuccessModal(false), 5000)
    setContactFormData({ name: '', phone: '', email: '', subject: '', message: '' })
  }
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-96 flex items-center justify-center bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85')] pt-32 pb-16 px-5 text-center text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/70"></div>
          <div className="relative z-10">
            <h1 className="font-black text-8xl md:text-9xl uppercase leading-none drop-shadow-lg">CONTACT US</h1>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="bg-cream px-5 py-12 text-dark sm:py-20 lg:py-28">
          <div className="max-w-6xl mx-auto">
            <div className={styles.contactCardsGrid}>
              <div className={`${styles.contactInfoCard} bg-white/6 border border-white/9 shadow-custom rounded hover:shadow-2xl hover:-translate-y-2 transition-all`}>
                <div className={styles.contactInfoIcon}>
                  <i className="fa-solid fa-phone text-orange"></i>
                </div>
                <div>
                  <h3 className={styles.contactInfoTitle}>Phone</h3>
                  <p className={styles.contactInfoValue}><a href="tel:+85578938333" className="hover:text-orange transition-colors">+855 78 938 333</a></p>
                </div>
              </div>
              <div className={`${styles.contactInfoCard} bg-white/6 border border-white/9 shadow-custom rounded hover:shadow-2xl hover:-translate-y-2 transition-all`}>
                <div className={styles.contactInfoIcon}>
                  <i className="fa-solid fa-map-pin text-orange"></i>
                </div>
                <div>
                  <h3 className={styles.contactInfoTitle}>Location</h3>
                  <p className={styles.contactInfoValue}>Phnom Penh, Cambodia</p>
                </div>
              </div>
              <div className={`${styles.contactInfoCard} bg-white/6 border border-white/9 shadow-custom rounded hover:shadow-2xl hover:-translate-y-2 transition-all`}>
                <div className={styles.contactInfoIcon}>
                  <i className="fa-brands fa-facebook text-orange"></i>
                </div>
                <div>
                  <h3 className={styles.contactInfoTitle}>Facebook</h3>
                  <p className={styles.contactInfoValue}><a href="#" className="hover:text-orange transition-colors">@BravoRestaurant</a></p>
                </div>
              </div>
              <div className={`${styles.contactInfoCard} bg-white/6 border border-white/9 shadow-custom rounded hover:shadow-2xl hover:-translate-y-2 transition-all`}>
                <div className={styles.contactInfoIcon}>
                  <i className="fa-brands fa-whatsapp text-orange"></i>
                </div>
                <div>
                  <h3 className={styles.contactInfoTitle}>WhatsApp</h3>
                  <p className={styles.contactInfoValue}><a href="https://wa.me/85578938333" target="_blank" rel="noreferrer" className="hover:text-orange transition-colors">Message Us</a></p>
                </div>
              </div>
              <div className={`${styles.contactInfoCard} bg-white/6 border border-white/9 shadow-custom rounded hover:shadow-2xl hover:-translate-y-2 transition-all`}>
                <div className={styles.contactInfoIcon}>
                  <i className="fa-brands fa-telegram text-orange"></i>
                </div>
                <div>
                  <h3 className={styles.contactInfoTitle}>Telegram</h3>
                  <p className={styles.contactInfoValue}><a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-orange transition-colors">Reservations</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reservation Form */}
        <section id="reservation" className="relative scroll-mt-0 overflow-hidden bg-dark px-3 pb-6 pt-24 text-cream sm:scroll-mt-0 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=90')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/95 to-black/95"></div>
          <div className="relative mx-auto grid max-w-6xl gap-7 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="order-2 lg:sticky lg:top-28 lg:order-none">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-orange sm:mb-3 sm:text-sm sm:tracking-[0.25em]">Book Bravo</p>
              <h2 className="font-black text-4xl uppercase leading-none sm:text-5xl md:text-6xl">Make a Reservation</h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-cream/75 sm:mt-6 sm:text-lg sm:leading-8">
                Save your table for churrasco, buffet sides, cold drinks, and a full Brazilian steakhouse night in Phnom Penh.
              </p>

              <div className="mt-5 grid gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-3 lg:grid-cols-1">
                {RESERVATION_PERKS.map((item) => (
                  <div key={item.label} className="rounded border border-white/10 bg-white/8 p-3 sm:p-4">
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded bg-orange text-black sm:h-9 sm:w-9">
                        <i className={`fa-solid ${item.icon} text-xs sm:text-sm`}></i>
                      </span>
                      <div>
                        <h3 className="text-sm font-black uppercase leading-tight sm:text-base">{item.label}</h3>
                        <p className="mt-0.5 text-xs leading-5 text-cream/65 sm:mt-1 sm:text-sm sm:leading-6">{item.copy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3 lg:flex-col xl:flex-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded border border-white/20 px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all hover:border-orange hover:text-orange sm:px-5 sm:py-3 sm:text-sm"
                >
                  <i className="fa-brands fa-whatsapp mr-2"></i>
                  WhatsApp
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded border border-white/20 px-4 py-2.5 text-xs font-black uppercase tracking-wider transition-all hover:border-orange hover:text-orange sm:px-5 sm:py-3 sm:text-sm"
                >
                  <i className="fa-brands fa-telegram mr-2"></i>
                  Telegram
                </a>
              </div>
            </div>

            <form onSubmit={handleReservationSubmit} className="order-1 rounded border border-white/10 bg-[#201615]/90 p-3 shadow-2xl backdrop-blur sm:p-8 lg:order-none lg:p-10">
              <div className="mb-3 flex flex-col gap-1 border-b border-white/10 pb-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-3 sm:pb-6">
                <div>
                  <p className="mb-1 text-[0.66rem] font-black uppercase tracking-[0.16em] text-orange sm:mb-2 sm:text-xs sm:tracking-[0.2em]">Reservation Details</p>
                  <h3 className="font-black text-[1.35rem] uppercase leading-none sm:text-3xl">Tell us about your table</h3>
                </div>
                <p className="text-xs font-medium text-cream/55 sm:text-sm">Required fields marked *</p>
              </div>

              <div className="flex flex-col gap-2.5 sm:gap-4">

                {/* Name + Phone side by side */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
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
                      className="w-full bg-[#1a0d0a] border border-white/15 text-[#FFF7ED] px-2 py-2 sm:py-3.5 rounded text-[0.82rem] sm:text-base focus:outline-none focus:border-orange transition-all"
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
                      className="w-full bg-[#1a0d0a] border border-white/15 text-[#FFF7ED] px-2 py-2 sm:py-3.5 rounded text-[0.82rem] sm:text-base focus:outline-none focus:border-orange transition-all"
                    >
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map(d => (
                        <option key={d} value={d} className="bg-[#1a0d0a] text-[#FFF7ED]">{Number(d)}</option>
                      ))}
                    </select>
                    <select
                      value={resDateYear}
                      onChange={e => handleResDatePartChange('year', e.target.value)}
                      className="w-full bg-[#1a0d0a] border border-white/15 text-[#FFF7ED] px-2 py-2 sm:py-3.5 rounded text-[0.82rem] sm:text-base focus:outline-none focus:border-orange transition-all"
                    >
                      <option value="">Year</option>
                      {['2026','2027','2028'].map(y => (
                        <option key={y} value={y} className="bg-[#1a0d0a] text-[#FFF7ED]">{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Time + Guests side by side */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  <div>
                    <label className={RESERVATION_LABEL_CLASS}>Time *</label>
                    <select
                      name="time"
                      value={reservationFormData.time}
                      onChange={handleReservationChange}
                      className="w-full bg-[#1a0d0a] border border-white/15 text-[#FFF7ED] px-2 py-2 sm:py-3.5 rounded text-[0.82rem] sm:text-base focus:outline-none focus:border-orange transition-all"
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
                    className={`${RESERVATION_INPUT_CLASS} min-h-16 resize-none sm:min-h-28`}
                    placeholder="Any special requests or dietary requirements?"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="mt-3 flex w-full items-center justify-center rounded bg-gradient-to-r from-yellow to-orange px-4 py-3 text-sm font-black uppercase tracking-wider text-black shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl sm:mt-6 sm:px-6 sm:py-4"
              >
                <i className="fa-solid fa-calendar-check mr-2"></i> Reserve Table
              </button>
            </form>
          </div>
        </section>

        {/* Contact Form */}
        <section className="relative overflow-hidden bg-cream px-3 py-6 text-dark sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="absolute inset-x-0 top-0 h-px bg-dark/10"></div>
          <div className="mx-auto grid max-w-6xl gap-7 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="order-2 lg:order-none">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-orange sm:mb-3 sm:text-sm sm:tracking-[0.25em]">Talk to Bravo</p>
              <h2 className="font-black text-4xl uppercase leading-none sm:text-5xl md:text-6xl">Get in Touch</h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-dark/70 sm:mt-6 sm:text-lg sm:leading-8">
                Questions about reservations, private events, menu details, or feedback? Send us a note and the BRAVO team will help.
              </p>

              <div className="mt-5 grid gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-3 lg:grid-cols-1">
                {CONTACT_METHODS.map((method) => {
                  const content = (
                    <>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-dark text-orange sm:h-11 sm:w-11">
                        <i className={`${method.icon} text-sm sm:text-base`}></i>
                      </span>
                      <span>
                        <span className="block text-[0.68rem] font-black uppercase tracking-[0.16em] text-orange sm:text-xs sm:tracking-[0.18em]">{method.label}</span>
                        <span className="mt-0.5 block text-sm font-black leading-tight text-dark sm:mt-1 sm:text-base">{method.value}</span>
                      </span>
                    </>
                  )

                  if (method.href) {
                    return (
                      <a
                        key={method.label}
                        href={method.href}
                        target={method.href.startsWith('http') ? '_blank' : undefined}
                        rel={method.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="flex items-center gap-3 rounded border border-dark/10 bg-white/75 p-3 shadow-custom transition-all hover:-translate-y-1 hover:border-orange/50 hover:bg-white sm:gap-4 sm:p-4"
                      >
                        {content}
                      </a>
                    )
                  }

                  return (
                    <div key={method.label} className="flex items-center gap-3 rounded border border-dark/10 bg-white/75 p-3 shadow-custom sm:gap-4 sm:p-4">
                      {content}
                    </div>
                  )
                })}
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="order-1 rounded border border-dark/10 bg-white/90 p-3 shadow-2xl backdrop-blur sm:p-8 lg:order-none lg:p-10">
              <div className="mb-3 flex flex-col gap-1 border-b border-dark/10 pb-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-3 sm:pb-6">
                <div>
                  <p className="mb-1 text-[0.66rem] font-black uppercase tracking-[0.16em] text-orange sm:mb-2 sm:text-xs sm:tracking-[0.2em]">Message Details</p>
                  <h3 className="font-black text-[1.35rem] uppercase leading-none sm:text-3xl">How can we help?</h3>
                </div>
                <p className="text-xs font-medium text-dark/55 sm:text-sm">Required fields marked *</p>
              </div>

              <div className="flex flex-col gap-2.5 sm:gap-4">

                {/* Name + Email side by side */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
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
                    />
                  </div>
                </div>

                {/* Phone + Subject side by side */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
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
                    className={`${CONTACT_INPUT_CLASS} min-h-16 resize-none sm:min-h-32`}
                    placeholder="Your message"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="mt-3 flex w-full items-center justify-center rounded bg-dark px-4 py-3 text-sm font-black uppercase tracking-wider text-cream shadow-lg transition-all hover:-translate-y-1 hover:bg-orange hover:text-black hover:shadow-xl sm:mt-6 sm:px-6 sm:py-4"
              >
                <i className="fa-solid fa-paper-plane mr-2"></i> Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Map Section */}
        <section className="relative overflow-hidden bg-dark px-3 py-8 text-cream sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="absolute inset-x-0 top-0 h-px bg-orange/35"></div>
          <div className="mx-auto max-w-6xl">
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

            <div className="grid gap-2.5 sm:gap-4">
              {HOURS.map((item) => (
                <div
                  key={item.day}
                  className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 rounded border border-dark/10 bg-white/75 p-3 shadow-custom transition-all hover:-translate-y-1 hover:border-orange/50 hover:shadow-2xl sm:flex sm:p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="contents sm:flex sm:items-center sm:gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-dark text-orange sm:h-12 sm:w-12">
                      <i className={`fa-solid ${item.icon} text-xs sm:text-base`}></i>
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-black text-lg leading-none sm:text-2xl">{item.day}</h3>
                      <p className="mt-1 text-xs font-medium leading-4 text-dark/65 sm:mt-2 sm:text-sm sm:leading-5">{item.note}</p>
                    </div>
                  </div>
                  <p className="col-span-2 text-base font-black leading-none text-orange sm:text-2xl sm:text-right">{item.time}</p>
                </div>
              ))}
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
    </>
  )
}
