'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const EVENT_FEATURES = [
  {
    icon: 'fa-fire-flame-curved',
    kicker: 'Tableside theatre',
    title: 'Theatre & Spectacle',
    desc: 'Live churrasco carving brings heat, smoke, and energy straight to your guests.',
  },
  {
    icon: 'fa-people-group',
    kicker: 'Easy hosting',
    title: 'Group Friendly',
    desc: 'Flexible seating, buffet flow, and service pacing built for gatherings of every size.',
  },
  {
    icon: 'fa-utensils',
    kicker: 'Full-table dining',
    title: 'Generous Portions',
    desc: 'Premium grilled cuts, hot sides, sauces, salads, and dessert options for the whole group.',
  },
  {
    icon: 'fa-handshake',
    kicker: 'Handled with care',
    title: 'Attentive Service',
    desc: 'Our team coordinates details before and during your event so hosting feels simple.',
  },
]

export default function EventsPage() {
  const [eventFormData, setEventFormData] = useState({
    name: '',
    phone: '',
    date: '',
    guests: '',
    eventType: '',
    message: '',
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleEventFormChange = (e) => {
    const { name, value } = e.target
    setEventFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleEventFormSubmit = (e) => {
    e.preventDefault()
    if (!eventFormData.name || !eventFormData.phone || !eventFormData.date || !eventFormData.guests || !eventFormData.eventType) {
      alert('Please fill in all required fields')
      return
    }
    console.log('Event request:', eventFormData)
    setShowSuccessModal(true)
    setTimeout(() => setShowSuccessModal(false), 3000)
    setEventFormData({ name: '', phone: '', date: '', guests: '', eventType: '', message: '' })
  }

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1519167758481-dc8743210e51?auto=format&fit=crop&w=1800&q=85')] pt-32 pb-16 px-5 text-center text-white" style={{backgroundAttachment: 'fixed'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/70"></div>
          <div className="relative z-10">
            <h1 className="font-black text-8xl md:text-9xl uppercase leading-none drop-shadow-lg">EVENTS</h1>
            <p className="text-white/90 text-xl mt-6">Celebrate at BRAVO</p>
          </div>
        </section>

        {/* Event Types Overview */}
        <section className="bg-dark text-cream py-28 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-black text-5xl uppercase text-center mb-16">PERFECT FOR EVERY OCCASION</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: 'fa-cake-candles', title: 'BIRTHDAYS', desc: 'Celebrate with fire-grilled favorites' },
                { icon: 'fa-users', title: 'FAMILY GATHERINGS', desc: 'Generous buffet for all ages' },
                { icon: 'fa-briefcase', title: 'CORPORATE EVENTS', desc: 'Team building with Brazilian style' },
                { icon: 'fa-people-group', title: 'GROUP CELEBRATIONS', desc: 'Large parties welcome' },
                { icon: 'fa-ring', title: 'PRIVATE FUNCTIONS', desc: 'Intimate or exclusive dining' },
                { icon: 'fa-star', title: 'SPECIAL OCCASIONS', desc: 'Anniversaries, engagements & more' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-orange/20 rounded-full mb-4 mx-auto">
                    <i className={`fa-solid ${item.icon} text-orange text-2xl`}></i>
                  </div>
                  <h3 className="font-black text-2xl mb-2 uppercase">{item.title}</h3>
                  <p className="text-cream/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Package */}
        <section className="bg-cream text-dark py-28 px-5">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-orange/20 to-yellow/20 border-2 border-orange shadow-2xl rounded-2xl p-10 md:p-16 transform scale-105">
              <p className="text-orange font-black text-xs uppercase tracking-widest mb-3 text-center">FEATURED PACKAGE</p>
              <h2 className="font-black text-5xl uppercase text-center mb-8">FAMILY GATHERING</h2>
              <div className="grid md:grid-cols-2 gap-10 mb-10">
                <div>
                  <h3 className="font-black text-2xl mb-4">Includes:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <i className="fa-solid fa-check text-orange mt-1"></i>
                      <span>Full churrasco service (15+ cuts grilled fresh)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="fa-solid fa-check text-orange mt-1"></i>
                      <span>Hot buffet (rice, farofa, salad, sides)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="fa-solid fa-check text-orange mt-1"></i>
                      <span>House sauces & beverages</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="fa-solid fa-check text-orange mt-1"></i>
                      <span>Dessert selection</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="bg-white/6 border border-white/9 rounded p-8 text-center">
                    <p className="text-dark/60 uppercase text-sm tracking-widest mb-2">Starting from</p>
                    <p className="font-black text-5xl text-orange mb-6">$18.90</p>
                    <p className="text-dark/80 mb-8">per person (min 10 guests)</p>
                    <Link href="#event-form" className="inline-flex items-center gap-2 px-6 py-3 bg-dark text-cream font-black text-sm uppercase tracking-wider rounded hover:bg-orange hover:text-black transition-all">
                      <i className="fa-solid fa-calendar-check"></i> Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Packages */}
        <section className="bg-dark text-cream py-28 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-black text-5xl uppercase text-center mb-16">EVENT PACKAGES</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Birthday', from: '$16.90', capacity: '5-30 guests', features: ['Buffet service', 'Specialty cuts', 'Complimentary decorations'] },
                { title: 'Corporate', from: '$19.90', capacity: '15-100 guests', features: ['Team building', 'Private section available', 'Catering service'] },
                { title: 'Private Dining', from: '$22.90', capacity: '20-50 guests', features: ['Exclusive room', 'Premium service', 'Customized menu'] },
              ].map((pkg, idx) => (
                <div key={idx} className="bg-white/6 border border-white/9 shadow-custom rounded overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all">
                  <div className="p-7 text-center">
                    <h3 className="font-black text-2xl mb-2">{pkg.title}</h3>
                    <p className="text-yellow font-black text-3xl mb-2">{pkg.from}</p>
                    <p className="text-cream/80 text-sm mb-6">{pkg.capacity}</p>
                    <ul className="text-left space-y-2 mb-8">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="text-cream/80 text-sm flex items-start gap-2">
                          <i className="fa-solid fa-check text-orange mt-1 flex-shrink-0"></i>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Features */}
        <section className="relative overflow-hidden bg-[#f4eadb] px-5 py-20 text-[#120807] sm:px-8 lg:px-10 lg:py-24">
          <div className="absolute inset-x-0 top-0 h-px bg-[#D4A373]/40"></div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-[#D4A373]/40"></div>
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#fd850b]">
                Event Hosting
              </p>
              <h2 className="font-black text-5xl uppercase leading-[0.94] md:text-6xl">
                Why choose Bravo for your event
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#4b352b]">
                From birthday dinners to team celebrations, BRAVO gives your
                guests a full steakhouse experience with less planning stress.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {EVENT_FEATURES.map((feat, idx) => (
                <article
                  key={feat.title}
                  className="group relative overflow-hidden border border-[#D4A373]/22 bg-[#fff7ed] p-6 shadow-[0_24px_70px_rgba(18,8,7,0.1)] transition duration-300 hover:-translate-y-2 hover:border-[#fd850b]/55 hover:shadow-[0_28px_90px_rgba(253,133,11,0.16)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center bg-[#fd850b]/14 text-[#fd850b] transition group-hover:bg-[#fd850b] group-hover:text-[#120807]">
                      <i className={`fa-solid ${feat.icon} text-xl`} aria-hidden="true"></i>
                    </div>
                    <span className="font-serif text-4xl leading-none text-[#120807]/10">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-[#fd850b]">
                    {feat.kicker}
                  </p>
                  <h3 className="mt-3 font-black text-2xl leading-tight">
                    {feat.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#4b352b]">
                    {feat.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Event Request Form */}
        <section id="event-form" className="bg-dark text-cream py-28 px-5">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-black text-5xl uppercase text-center mb-4">REQUEST AN EVENT</h2>
            <p className="text-center text-cream/80 mb-16">Let us know about your special occasion and we'll create an unforgettable experience.</p>
            <form onSubmit={handleEventFormSubmit} className="bg-white/6 border border-white/9 shadow-custom p-10 rounded">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-black text-sm uppercase tracking-wider mb-3">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={eventFormData.name}
                    onChange={handleEventFormChange}
                    className="w-full bg-white/10 border border-white/20 text-cream px-4 py-3 rounded focus:outline-none focus:border-orange focus:bg-white/15 transition-all placeholder-cream/40"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-black text-sm uppercase tracking-wider mb-3">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={eventFormData.phone}
                    onChange={handleEventFormChange}
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
                    value={eventFormData.date}
                    onChange={handleEventFormChange}
                    className="w-full bg-white/10 border border-white/20 text-cream px-4 py-3 rounded focus:outline-none focus:border-orange focus:bg-white/15 transition-all"
                  />
                </div>
                <div>
                  <label className="block font-black text-sm uppercase tracking-wider mb-3">Number of Guests *</label>
                  <input
                    type="number"
                    name="guests"
                    value={eventFormData.guests}
                    onChange={handleEventFormChange}
                    className="w-full bg-white/10 border border-white/20 text-cream px-4 py-3 rounded focus:outline-none focus:border-orange focus:bg-white/15 transition-all"
                    min="5"
                    max="500"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block font-black text-sm uppercase tracking-wider mb-3">Event Type *</label>
                <select
                  name="eventType"
                  value={eventFormData.eventType}
                  onChange={handleEventFormChange}
                  className="w-full bg-white/10 border border-white/20 text-cream px-4 py-3 rounded focus:outline-none focus:border-orange focus:bg-white/15 transition-all"
                >
                  <option value="">Select event type</option>
                  <option value="birthday">Birthday</option>
                  <option value="family">Family Gathering</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="group">Group Celebration</option>
                  <option value="wedding">Wedding Reception</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-8">
                <label className="block font-black text-sm uppercase tracking-wider mb-3">Message</label>
                <textarea
                  name="message"
                  value={eventFormData.message}
                  onChange={handleEventFormChange}
                  className="w-full bg-white/10 border border-white/20 text-cream px-4 py-3 rounded focus:outline-none focus:border-orange focus:bg-white/15 transition-all placeholder-cream/40 min-h-28 resize-none"
                  placeholder="Tell us about your event..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow to-orange text-black font-black text-sm uppercase tracking-wider py-3 rounded hover:shadow-xl hover:-translate-y-1 transition-all shadow-lg"
              >
                <i className="fa-solid fa-calendar-check mr-2"></i> Submit Request
              </button>
            </form>
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
            <p className="text-cream/80 mb-6">Thank you! We've received your event request and will contact you soon.</p>
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
