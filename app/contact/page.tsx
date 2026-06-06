'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const TELEGRAM_URL = 'https://t.me/BravoReservationsTTP'
const WHATSAPP_URL = 'https://wa.me/85578938333'

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
  'w-full rounded border border-white/15 bg-white/10 px-4 py-3.5 text-cream outline-none transition-all placeholder:text-cream/35 focus:border-orange focus:bg-white/15 focus:shadow-[0_0_0_3px_rgba(253,133,11,0.18)]'

const RESERVATION_LABEL_CLASS =
  'mb-2.5 block text-xs font-black uppercase tracking-[0.18em] text-cream/90'

const HOURS = [
  {
    day: 'Monday - Friday',
    time: '11:00 AM - 11:00 PM',
    note: 'Lunch, dinner, and after-work tables',
    icon: 'fa-calendar-day',
  },
  {
    day: 'Saturday',
    time: '10:00 AM - 12:00 AM',
    note: 'Late weekend service for groups',
    icon: 'fa-moon',
  },
  {
    day: 'Sunday',
    time: '10:00 AM - 11:00 PM',
    note: 'Family dining and relaxed gatherings',
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

  const [contactFormData, setContactFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleReservationChange = (e) => {
    const { name, value } = e.target
    setReservationFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleContactChange = (e) => {
    const { name, value } = e.target
    setContactFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleReservationSubmit = (e) => {
    e.preventDefault()
    if (!reservationFormData.name || !reservationFormData.phone || !reservationFormData.date || !reservationFormData.time || !reservationFormData.guests) {
      alert('Please fill in all required fields')
      return
    }
    console.log('Reservation:', reservationFormData)
    setShowSuccessModal(true)
    setTimeout(() => setShowSuccessModal(false), 3000)
    setReservationFormData({ name: '', phone: '', date: '', time: '', guests: '', message: '' })
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    if (!contactFormData.name || !contactFormData.phone || !contactFormData.email || !contactFormData.subject || !contactFormData.message) {
      alert('Please fill in all required fields')
      return
    }
    console.log('Contact:', contactFormData)
    setShowSuccessModal(true)
    setTimeout(() => setShowSuccessModal(false), 3000)
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
        <section className="bg-cream text-dark py-28 px-5">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
              <div className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-orange/20 rounded-full mb-4 mx-auto">
                  <i className="fa-solid fa-phone text-orange text-2xl"></i>
                </div>
                <h3 className="font-black text-xl mb-2">Phone</h3>
                <p className="text-dark/80"><a href="tel:+85578938333" className="hover:text-orange transition-colors">+855 78 938 333</a></p>
              </div>
              <div className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-orange/20 rounded-full mb-4 mx-auto">
                  <i className="fa-solid fa-map-pin text-orange text-2xl"></i>
                </div>
                <h3 className="font-black text-xl mb-2">Location</h3>
                <p className="text-dark/80">Phnom Penh, Cambodia</p>
              </div>
              <div className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-orange/20 rounded-full mb-4 mx-auto">
                  <i className="fa-brands fa-facebook text-orange text-2xl"></i>
                </div>
                <h3 className="font-black text-xl mb-2">Facebook</h3>
                <p className="text-dark/80"><a href="#" className="hover:text-orange transition-colors">@BravoRestaurant</a></p>
              </div>
              <div className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-orange/20 rounded-full mb-4 mx-auto">
                  <i className="fa-brands fa-whatsapp text-orange text-2xl"></i>
                </div>
                <h3 className="font-black text-xl mb-2">WhatsApp</h3>
                <p className="text-dark/80"><a href="https://wa.me/85578938333" target="_blank" rel="noreferrer" className="hover:text-orange transition-colors">Message Us</a></p>
              </div>
              <div className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-orange/20 rounded-full mb-4 mx-auto">
                  <i className="fa-brands fa-telegram text-orange text-2xl"></i>
                </div>
                <h3 className="font-black text-xl mb-2">Telegram</h3>
                <p className="text-dark/80"><a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-orange transition-colors">Reservations</a></p>
              </div>
            </div>
          </div>
        </section>

        {/* Reservation Form */}
        <section id="reservation" className="relative overflow-hidden bg-dark px-5 py-20 text-cream sm:px-8 lg:px-10 lg:py-24">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=90')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/95 to-black/95"></div>
          <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-orange">Book Bravo</p>
              <h2 className="font-black text-5xl uppercase leading-none md:text-6xl">Make a Reservation</h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-cream/75">
                Save your table for churrasco, buffet sides, cold drinks, and a full Brazilian steakhouse night in Phnom Penh.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {RESERVATION_PERKS.map((item) => (
                  <div key={item.label} className="rounded border border-white/10 bg-white/8 p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded bg-orange text-black">
                        <i className={`fa-solid ${item.icon} text-sm`}></i>
                      </span>
                      <div>
                        <h3 className="font-black uppercase leading-tight">{item.label}</h3>
                        <p className="mt-1 text-sm leading-6 text-cream/65">{item.copy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded border border-white/20 px-5 py-3 text-sm font-black uppercase tracking-wider transition-all hover:border-orange hover:text-orange"
                >
                  <i className="fa-brands fa-whatsapp mr-2"></i>
                  WhatsApp
                </a>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded border border-white/20 px-5 py-3 text-sm font-black uppercase tracking-wider transition-all hover:border-orange hover:text-orange"
                >
                  <i className="fa-brands fa-telegram mr-2"></i>
                  Telegram
                </a>
              </div>
            </div>

            <form onSubmit={handleReservationSubmit} className="rounded border border-white/10 bg-[#201615]/90 p-6 shadow-2xl backdrop-blur sm:p-8 lg:p-10">
              <div className="mb-8 flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-orange">Reservation Details</p>
                  <h3 className="font-black text-3xl uppercase leading-none">Tell us about your table</h3>
                </div>
                <p className="text-sm font-medium text-cream/55">Required fields marked *</p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={RESERVATION_LABEL_CLASS}>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={reservationFormData.name}
                    onChange={handleReservationChange}
                    className={RESERVATION_INPUT_CLASS}
                    placeholder="Your name"
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
                  />
                </div>
                <div>
                  <label className={RESERVATION_LABEL_CLASS}>Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={reservationFormData.date}
                    onChange={handleReservationChange}
                    className={RESERVATION_INPUT_CLASS}
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div>
                  <label className={RESERVATION_LABEL_CLASS}>Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={reservationFormData.time}
                    onChange={handleReservationChange}
                    className={RESERVATION_INPUT_CLASS}
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className={RESERVATION_LABEL_CLASS}>Number of Guests *</label>
                <input
                  type="number"
                  name="guests"
                  value={reservationFormData.guests}
                  onChange={handleReservationChange}
                  className={RESERVATION_INPUT_CLASS}
                  placeholder="Number of guests"
                  min="1"
                  max="20"
                />
              </div>

              <div className="mt-5">
                <label className={RESERVATION_LABEL_CLASS}>Special Requests</label>
                <textarea
                  name="message"
                  value={reservationFormData.message}
                  onChange={handleReservationChange}
                  className={`${RESERVATION_INPUT_CLASS} min-h-32 resize-none`}
                  placeholder="Any special requests or dietary requirements?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center rounded bg-gradient-to-r from-yellow to-orange px-6 py-4 text-sm font-black uppercase tracking-wider text-black shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <i className="fa-solid fa-calendar-check mr-2"></i> Reserve Table
              </button>
            </form>
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-cream text-dark py-28 px-5">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-black text-5xl uppercase text-center mb-4">GET IN TOUCH</h2>
            <p className="text-center text-dark/80 mb-16">Have a question or feedback? We'd love to hear from you.</p>
            <form onSubmit={handleContactSubmit} className="bg-white/6 border border-white/9 shadow-custom p-10 rounded">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-black text-sm uppercase tracking-wider mb-3">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={contactFormData.name}
                    onChange={handleContactChange}
                    className="w-full bg-white/10 border border-white/20 text-dark px-4 py-3 rounded focus:outline-none focus:border-orange focus:bg-white/15 transition-all placeholder-dark/40"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-black text-sm uppercase tracking-wider mb-3">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={contactFormData.email}
                    onChange={handleContactChange}
                    className="w-full bg-white/10 border border-white/20 text-dark px-4 py-3 rounded focus:outline-none focus:border-orange focus:bg-white/15 transition-all placeholder-dark/40"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block font-black text-sm uppercase tracking-wider mb-3">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={contactFormData.phone}
                  onChange={handleContactChange}
                  className="w-full bg-white/10 border border-white/20 text-dark px-4 py-3 rounded focus:outline-none focus:border-orange focus:bg-white/15 transition-all placeholder-dark/40"
                  placeholder="Your phone"
                />
              </div>
              <div className="mb-6">
                <label className="block font-black text-sm uppercase tracking-wider mb-3">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={contactFormData.subject}
                  onChange={handleContactChange}
                  className="w-full bg-white/10 border border-white/20 text-dark px-4 py-3 rounded focus:outline-none focus:border-orange focus:bg-white/15 transition-all placeholder-dark/40"
                  placeholder="What is this about?"
                />
              </div>
              <div className="mb-8">
                <label className="block font-black text-sm uppercase tracking-wider mb-3">Message *</label>
                <textarea
                  name="message"
                  value={contactFormData.message}
                  onChange={handleContactChange}
                  className="w-full bg-white/10 border border-white/20 text-dark px-4 py-3 rounded focus:outline-none focus:border-orange focus:bg-white/15 transition-all placeholder-dark/40 min-h-28 resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-dark text-cream font-black text-sm uppercase tracking-wider py-3 rounded hover:bg-orange hover:text-black transition-all"
              >
                <i className="fa-solid fa-paper-plane mr-2"></i> Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-dark py-28 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-black text-5xl uppercase text-center text-cream mb-16">FIND US</h2>
            <div className="w-full h-96 bg-white/10 border border-white/20 rounded overflow-hidden shadow-custom">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7818.48391752572!2d104.9155739!3d11.5344932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513d047ee727%3A0x8ea23f9513babd9e!2sBravo%20Steakhouse%20Churrascaria!5e0!3m2!1sen!2skh!4v1780715930751!5m2!1sen!2skh"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Hours */}
        <section className="relative overflow-hidden bg-cream px-5 py-20 text-dark sm:px-8 lg:px-10 lg:py-24">
          <div className="absolute inset-x-0 top-0 h-px bg-orange/30"></div>
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-orange">Open Daily</p>
              <h2 className="font-black text-5xl uppercase leading-none md:text-6xl">Hours of Operation</h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-dark/75">
                Visit BRAVO for fire-grilled churrasco, cold drinks, and generous tables throughout the week.
              </p>
              <Link
                href="/contact#reservation"
                className="mt-8 inline-flex items-center justify-center rounded bg-orange px-7 py-4 text-sm font-black uppercase tracking-wider text-black shadow-lg transition-all hover:-translate-y-1 hover:bg-yellow"
              >
                <i className="fa-solid fa-calendar-check mr-2"></i>
                Reserve a Table
              </Link>
            </div>

            <div className="grid gap-4">
              {HOURS.map((item) => (
                <div
                  key={item.day}
                  className="flex flex-col gap-4 rounded border border-dark/10 bg-white/75 p-5 shadow-custom transition-all hover:-translate-y-1 hover:border-orange/50 hover:shadow-2xl sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-dark text-orange">
                      <i className={`fa-solid ${item.icon}`}></i>
                    </span>
                    <div>
                      <h3 className="font-black text-2xl leading-none">{item.day}</h3>
                      <p className="mt-2 text-sm font-medium text-dark/65">{item.note}</p>
                    </div>
                  </div>
                  <p className="text-2xl font-black text-orange sm:text-right">{item.time}</p>
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
            <p className="text-cream/80 mb-6">Thank you! We've received your message and will get back to you soon.</p>
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
