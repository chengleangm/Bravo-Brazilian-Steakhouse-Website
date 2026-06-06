'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
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
            </div>
          </div>
        </section>

        {/* Reservation Form */}
        <section id="reservation" className="bg-dark text-cream py-28 px-5">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-black text-5xl uppercase text-center mb-4">MAKE A RESERVATION</h2>
            <p className="text-center text-cream/80 mb-16">Secure your table at BRAVO. We look forward to welcoming you.</p>
            <form onSubmit={handleReservationSubmit} className="bg-white/6 border border-white/9 shadow-custom p-10 rounded">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-black text-sm uppercase tracking-wider mb-3">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={reservationFormData.name}
                    onChange={handleReservationChange}
                    className="w-full bg-white/10 border border-white/20 text-cream px-4 py-3 rounded focus:outline-none focus:border-orange focus:bg-white/15 transition-all placeholder-cream/40"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-black text-sm uppercase tracking-wider mb-3">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={reservationFormData.phone}
                    onChange={handleReservationChange}
                    className="w-full bg-white/10 border border-white/20 text-cream px-4 py-3 rounded focus:outline-none focus:border-orange focus:bg-white/15 transition-all placeholder-cream/40"
                    placeholder="Your phone"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-black text-sm uppercase tracking-wider mb-3">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={reservationFormData.date}
                    onChange={handleReservationChange}
                    className="w-full bg-white/10 border border-white/20 text-cream px-4 py-3 rounded focus:outline-none focus:border-orange focus:bg-white/15 transition-all placeholder-cream/40"
                  />
                </div>
                <div>
                  <label className="block font-black text-sm uppercase tracking-wider mb-3">Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={reservationFormData.time}
                    onChange={handleReservationChange}
                    className="w-full bg-white/10 border border-white/20 text-cream px-4 py-3 rounded focus:outline-none focus:border-orange focus:bg-white/15 transition-all placeholder-cream/40"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block font-black text-sm uppercase tracking-wider mb-3">Number of Guests *</label>
                <input
                  type="number"
                  name="guests"
                  value={reservationFormData.guests}
                  onChange={handleReservationChange}
                  className="w-full bg-white/10 border border-white/20 text-cream px-4 py-3 rounded focus:outline-none focus:border-orange focus:bg-white/15 transition-all placeholder-cream/40"
                  placeholder="Number of guests"
                  min="1"
                  max="20"
                />
              </div>
              <div className="mb-8">
                <label className="block font-black text-sm uppercase tracking-wider mb-3">Special Requests</label>
                <textarea
                  name="message"
                  value={reservationFormData.message}
                  onChange={handleReservationChange}
                  className="w-full bg-white/10 border border-white/20 text-cream px-4 py-3 rounded focus:outline-none focus:border-orange focus:bg-white/15 transition-all placeholder-cream/40 min-h-28 resize-none"
                  placeholder="Any special requests or dietary requirements?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow to-orange text-black font-black text-sm uppercase tracking-wider py-3 rounded hover:shadow-xl hover:-translate-y-1 transition-all shadow-lg"
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.823876819632!2d104.92!3d11.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095100aa1d0001%3A0xf00ef62e7f000000!2sPhnom%20Penh%2C%20Cambodia!5e0!3m2!1sen!2skh!4v1234567890"
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
        <section className="bg-cream text-dark py-28 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-black text-5xl uppercase text-center mb-16">HOURS OF OPERATION</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
                <h3 className="font-black text-2xl mb-4">Monday - Friday</h3>
                <p className="text-2xl font-black text-orange">11:00 AM - 11:00 PM</p>
              </div>
              <div className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
                <h3 className="font-black text-2xl mb-4">Saturday</h3>
                <p className="text-2xl font-black text-orange">10:00 AM - 12:00 AM</p>
              </div>
              <div className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
                <h3 className="font-black text-2xl mb-4">Sunday</h3>
                <p className="text-2xl font-black text-orange">10:00 AM - 11:00 PM</p>
              </div>
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
