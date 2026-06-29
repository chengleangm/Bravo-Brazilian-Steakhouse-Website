'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

type Promotion = {
  id: number
  active: boolean
  badge: string
  title: string
  subtitle: string
  description: string
  date: string
  time: string
  image: string
  cta: string
  ctaLink: string
}

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const vp = { once: true, amount: 0.2 }

const DEFAULT_HERO = 'https://images.unsplash.com/photo-1519167758481-dc8743210e51?auto=format&fit=crop&w=1800&q=85'

const DEFAULT_TYPES = [
  { icon: 'fa-cake-candles', title: 'BIRTHDAYS', desc: 'Celebrate with fire-grilled favorites' },
  { icon: 'fa-users', title: 'FAMILY GATHERINGS', desc: 'Generous buffet for all ages' },
  { icon: 'fa-briefcase', title: 'CORPORATE EVENTS', desc: 'Team building with Brazilian style' },
  { icon: 'fa-people-group', title: 'GROUP CELEBRATIONS', desc: 'Large parties welcome' },
  { icon: 'fa-ring', title: 'PRIVATE FUNCTIONS', desc: 'Intimate or exclusive dining' },
  { icon: 'fa-star', title: 'SPECIAL OCCASIONS', desc: 'Anniversaries, engagements & more' },
]

const DEFAULT_FEATURED = {
  visible: true,
  title: 'FAMILY GATHERING',
  price: '$18.90',
  minGuests: 10,
  includes: [
    'Full churrasco service (15+ cuts grilled fresh)',
    'Hot buffet (rice, farofa, salad, sides)',
    'House sauces & beverages',
    'Dessert selection',
  ],
}

const DEFAULT_PACKAGES = [
  { title: 'Birthday', from: '$16.90', capacity: '5-30 guests', features: ['Buffet service', 'Specialty cuts', 'Complimentary decorations'] },
  { title: 'Corporate', from: '$19.90', capacity: '15-100 guests', features: ['Team building', 'Private section available', 'Catering service'] },
  { title: 'Private Dining', from: '$22.90', capacity: '20-50 guests', features: ['Exclusive room', 'Premium service', 'Customized menu'] },
]

const DEFAULT_FEATURES = [
  { icon: 'fa-fire-flame-curved', kicker: 'Tableside theatre', title: 'Theatre & Spectacle', desc: 'Live churrasco carving brings heat, smoke, and energy straight to your guests.' },
  { icon: 'fa-people-group', kicker: 'Easy hosting', title: 'Group Friendly', desc: 'Flexible seating, buffet flow, and service pacing built for gatherings of every size.' },
  { icon: 'fa-utensils', kicker: 'Full-table dining', title: 'Generous Portions', desc: 'Premium grilled cuts, hot sides, sauces, salads, and dessert options for the whole group.' },
  { icon: 'fa-handshake', kicker: 'Handled with care', title: 'Attentive Service', desc: 'Our team coordinates details before and during your event so hosting feels simple.' },
]

export default function EventsPage() {
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO)
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [eventTypes, setEventTypes] = useState(DEFAULT_TYPES)
  const [featuredPackage, setFeaturedPackage] = useState(DEFAULT_FEATURED)
  const [packages, setPackages] = useState(DEFAULT_PACKAGES)
  const [features, setFeatures] = useState(DEFAULT_FEATURES)

  const [eventFormData, setEventFormData] = useState({ name: '', phone: '', date: '', guests: '', eventType: '', message: '' })
  const [dateMonth, setDateMonth] = useState('')
  const [dateDay, setDateDay] = useState('')
  const [dateYear, setDateYear] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch('/api/admin/events')
      .then(r => r.json())
      .then(data => {
        if (data.heroImage) setHeroImage(data.heroImage)
        if (data.promotions) setPromotions(data.promotions.filter((p: Promotion) => p.active))
        if (data.eventTypes) setEventTypes(data.eventTypes)
        if (data.featuredPackage) setFeaturedPackage(data.featuredPackage)
        if (data.packages) setPackages(data.packages)
        if (data.features) setFeatures(data.features)
      })
      .catch(() => {})
  }, [])

  const handleEventFormChange = (e) => {
    const { name, value } = e.target
    setEventFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDatePartChange = (part: 'month' | 'day' | 'year', value: string) => {
    const newMonth = part === 'month' ? value : dateMonth
    const newDay = part === 'day' ? value : dateDay
    const newYear = part === 'year' ? value : dateYear
    if (part === 'month') setDateMonth(value)
    if (part === 'day') setDateDay(value)
    if (part === 'year') setDateYear(value)
    if (newMonth && newDay && newYear) {
      setEventFormData(prev => ({ ...prev, date: `${newYear}-${newMonth}-${newDay}` }))
    }
  }

  const handleEventFormSubmit = async (e) => {
    e.preventDefault()
    if (!eventFormData.name || !eventFormData.phone || !eventFormData.date || !eventFormData.guests || !eventFormData.eventType) {
      alert('Please fill in all required fields')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text:
            `🎉 <b>New Event Request — BRAVO Website</b>\n` +
            `━━━━━━━━━━━━━━━━━\n` +
            `👤 <b>Name:</b> ${eventFormData.name}\n` +
            `📞 <b>Phone:</b> ${eventFormData.phone}\n` +
            `📅 <b>Date:</b> ${eventFormData.date}\n` +
            `👥 <b>Guests:</b> ${eventFormData.guests}\n` +
            `🎊 <b>Event Type:</b> ${eventFormData.eventType}\n` +
            (eventFormData.message ? `💬 <b>Details:</b> ${eventFormData.message}\n` : '') +
            `━━━━━━━━━━━━━━━━━`,
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setShowSuccessModal(true)
      setTimeout(() => setShowSuccessModal(false), 4000)
      setEventFormData({ name: '', phone: '', date: '', guests: '', eventType: '', message: '' })
      setDateMonth('')
      setDateDay('')
      setDateYear('')
    } catch {
      alert('Something went wrong. Please call us directly or message via WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section
          className="relative min-h-screen flex items-center justify-center bg-cover bg-center pt-32 pb-16 px-5 text-center text-white"
          style={{ backgroundImage: `url('${heroImage}')`, backgroundAttachment: 'fixed' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/70"></div>
          <div className="relative z-10">
            <h1 className="font-black text-8xl md:text-9xl uppercase leading-none drop-shadow-lg">EVENTS</h1>
            <p className="text-white/90 text-xl mt-6">Celebrate at BRAVO</p>
          </div>
        </section>

        {/* ── Promotions / Special Event Banners ── */}
        {promotions.length > 0 && (
          <section className="bg-[#0a0805] py-16 px-5 sm:py-24">
            <div className="max-w-6xl mx-auto">
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-12"
              >
                <div className="h-px flex-1 bg-[#fd850b]/25" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-[#fd850b]">Current Events & Promotions</span>
                <div className="h-px flex-1 bg-[#fd850b]/25" />
              </motion.div>

              <div className="space-y-8">
                {promotions.map((promo, idx) => (
                  <motion.div
                    key={promo.id}
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={vp}
                    transition={{ duration: 0.65, delay: idx * 0.1 }}
                    className={`relative isolate overflow-hidden border border-[#fd850b]/25 bg-[#120807] shadow-[0_24px_90px_rgba(0,0,0,0.5)] sm:grid sm:grid-cols-[minmax(220px,0.85fr)_minmax(0,1.15fr)] lg:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)] ${idx % 2 === 1 ? 'sm:[&>*:first-child]:order-2' : ''}`}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(253,133,11,0.16),transparent_36%),linear-gradient(135deg,rgba(255,247,237,0.04),transparent_46%)]" />

                    {/* Mobile-first feature image */}
                    <div className="relative min-h-[260px] w-full sm:min-h-full">
                      {promo.image ? (
                        <Image
                          src={promo.image}
                          alt={promo.title}
                          fill
                          sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 100vw"
                          className="object-cover"
                          unoptimized={!promo.image.includes('unsplash.com')}
                        />
                      ) : (
                        <div className="w-full h-full bg-[#1a0e0a] flex items-center justify-center">
                          <i className="fa-solid fa-calendar-star text-5xl text-[#fd850b]/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#120807] via-[#120807]/15 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-[#120807]/35" />
                      <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                        <span className="inline-flex items-center gap-1.5 bg-[#fd850b] text-black text-[0.62rem] font-black uppercase tracking-[0.18em] px-3 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                          <i className="fa-solid fa-bolt text-[0.55rem]" />
                          {promo.badge}
                        </span>
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="relative flex flex-col justify-center px-5 pb-6 pt-5 sm:p-8 lg:p-12">
                      {/* Badge */}
                      <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
                        {(promo.date || promo.time) && (
                          <span className="inline-flex items-center gap-2 border border-[#D4A373]/20 bg-white/[0.04] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#C7B8A8]">
                            <i className="fa-solid fa-clock text-[#fd850b]" aria-hidden="true" />
                            {promo.date}{promo.date && promo.time ? ' · ' : ''}{promo.time}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="font-serif text-[2.35rem] sm:text-4xl lg:text-5xl uppercase leading-[0.88] text-[#FFF7ED] mb-3">
                        {promo.title}
                      </h2>

                      {/* Subtitle */}
                      {promo.subtitle && (
                        <p className="text-[#fd850b] font-black text-sm sm:text-base uppercase tracking-[0.12em] leading-6 mb-4">
                          {promo.subtitle}
                        </p>
                      )}

                      <div className="mb-4 grid grid-cols-3 gap-2 text-center sm:max-w-md">
                        <div className="border border-[#D4A373]/18 bg-black/18 px-2 py-3">
                          <p className="text-[0.6rem] font-black uppercase tracking-[0.16em] text-[#C7B8A8]">Offer</p>
                          <p className="mt-1 text-sm font-black text-[#FFF7ED]">4 Pay 3</p>
                        </div>
                        <div className="border border-[#D4A373]/18 bg-black/18 px-2 py-3">
                          <p className="text-[0.6rem] font-black uppercase tracking-[0.16em] text-[#C7B8A8]">From</p>
                          <p className="mt-1 text-sm font-black text-[#fd850b]">$20 nett</p>
                        </div>
                        <div className="border border-[#D4A373]/18 bg-black/18 px-2 py-3">
                          <p className="text-[0.6rem] font-black uppercase tracking-[0.16em] text-[#C7B8A8]">Includes</p>
                          <p className="mt-1 text-sm font-black text-[#FFF7ED]">Drinks</p>
                        </div>
                      </div>

                      {/* Description */}
                      {promo.description && (
                        <p className="text-[#C7B8A8] text-sm sm:text-base leading-7 max-w-lg mb-6">
                          {promo.description}
                        </p>
                      )}

                      {/* CTA */}
                      {promo.cta && (
                        <div>
                          <Link
                            href={promo.ctaLink || '/contact#reservation'}
                            className="inline-flex w-full items-center justify-center gap-2 bg-[#fd850b] text-black px-6 py-3.5 text-sm font-black uppercase tracking-wider shadow-[0_12px_40px_rgba(253,133,11,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_56px_rgba(253,133,11,0.45)] sm:w-auto"
                          >
                            <i className="fa-solid fa-calendar-check text-xs" />
                            {promo.cta}
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Event Types Overview */}
        <section className="bg-dark text-cream py-28 px-5">
          <div className="max-w-6xl mx-auto">
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.65 }} className="font-black text-5xl uppercase text-center mb-16">PERFECT FOR EVERY OCCASION</motion.h2>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {eventTypes.map((item, idx) => (
                <motion.div key={idx} variants={fadeUp} transition={{ duration: 0.5 }} className="bg-white/6 border border-white/9 shadow-custom p-3 lg:p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
                  <div className="w-10 h-10 lg:w-16 lg:h-16 flex items-center justify-center bg-orange/20 rounded-full mb-2 lg:mb-4 mx-auto">
                    <i className={`fa-solid ${item.icon} text-orange text-base lg:text-2xl`}></i>
                  </div>
                  <h3 className="font-black text-sm lg:text-2xl mb-1 lg:mb-2 uppercase">{item.title}</h3>
                  <p className="text-cream/80 text-xs lg:text-base">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Package */}
        {featuredPackage.visible && <section className="bg-cream text-dark py-10 px-3 md:py-28 md:px-5">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-orange/20 to-yellow/20 border-2 border-orange shadow-2xl rounded-xl p-4 md:p-16 md:rounded-2xl md:scale-105">
              <p className="text-orange font-black text-[0.6rem] md:text-xs uppercase tracking-widest mb-1 md:mb-3 text-center">FEATURED PACKAGE</p>
              <h2 className="font-black text-2xl md:text-5xl uppercase text-center mb-4 md:mb-8">{featuredPackage.title}</h2>
              <div className="grid md:grid-cols-2 gap-4 md:gap-10 mb-4 md:mb-10">
                <div>
                  <h3 className="font-black text-base md:text-2xl mb-2 md:mb-4">Includes:</h3>
                  <ul className="space-y-1.5 md:space-y-3">
                    {featuredPackage.includes.filter(Boolean).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 md:gap-3">
                        <i className="fa-solid fa-check text-orange mt-0.5 text-xs md:text-base md:mt-1"></i>
                        <span className="text-xs md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="bg-white/6 border border-white/9 rounded p-4 md:p-8 text-center">
                    <p className="text-dark/60 uppercase text-[0.6rem] md:text-sm tracking-widest mb-1 md:mb-2">Starting from</p>
                    <p className="font-black text-3xl md:text-5xl text-orange mb-2 md:mb-6">{featuredPackage.price}</p>
                    <p className="text-dark/80 text-xs md:text-base mb-3 md:mb-8">per person (min {featuredPackage.minGuests} guests)</p>
                    <Link href="#event-form" className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-dark text-cream font-black text-xs md:text-sm uppercase tracking-wider rounded hover:bg-orange hover:text-black transition-all">
                      <i className="fa-solid fa-calendar-check"></i> Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>}

        {/* Event Packages */}
        <section className="bg-dark text-cream py-28 px-5">
          <div className="max-w-6xl mx-auto">
            <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.65 }} className="font-black text-5xl uppercase text-center mb-16">EVENT PACKAGES</motion.h2>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="grid grid-cols-3 gap-2 lg:gap-6">
              {packages.map((pkg, idx) => (
                <motion.div key={idx} variants={fadeUp} transition={{ duration: 0.5 }} className="bg-white/6 border border-white/9 shadow-custom rounded overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all">
                  <div className="p-2 lg:p-7 text-center">
                    <h3 className="font-black text-xs lg:text-2xl mb-1 lg:mb-2">{pkg.title}</h3>
                    <p className="text-yellow font-black text-sm lg:text-3xl mb-1 lg:mb-2">{pkg.from}</p>
                    <p className="text-cream/80 text-[0.6rem] lg:text-sm mb-2 lg:mb-6">{pkg.capacity}</p>
                    <ul className="text-left space-y-1 lg:space-y-2 mb-2 lg:mb-8">
                      {pkg.features.filter(Boolean).map((feat, i) => (
                        <li key={i} className="text-cream/80 text-[0.55rem] lg:text-sm flex items-start gap-1 lg:gap-2">
                          <i className="fa-solid fa-check text-orange mt-0.5 flex-shrink-0 text-[0.55rem] lg:text-sm"></i>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Event Features */}
        <section className="relative overflow-hidden bg-[#f4eadb] px-3 py-10 text-[#120807] sm:px-8 lg:px-10 lg:py-24">
          <div className="absolute inset-x-0 top-0 h-px bg-[#D4A373]/40"></div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-[#D4A373]/40"></div>
          <div className="mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.65 }} className="mx-auto max-w-3xl text-center">
              <p className="mb-2 text-[0.6rem] md:mb-4 md:text-xs font-black uppercase tracking-[0.24em] text-[#fd850b]">Event Hosting</p>
              <h2 className="font-black text-2xl md:text-5xl uppercase leading-[0.94] md:text-6xl">Why choose Bravo for your event</h2>
              <p className="mx-auto mt-3 md:mt-5 max-w-2xl text-xs md:text-base leading-6 md:leading-8 text-[#4b352b]">
                From birthday dinners to team celebrations, BRAVO gives your guests a full steakhouse experience with less planning stress.
              </p>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="mt-6 md:mt-12 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
              {features.map((feat, idx) => (
                <motion.article
                  key={feat.title}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="group relative overflow-hidden border border-[#D4A373]/22 bg-[#fff7ed] p-3 md:p-6 shadow-[0_24px_70px_rgba(18,8,7,0.1)] transition duration-300 hover:-translate-y-2 hover:border-[#fd850b]/55 hover:shadow-[0_28px_90px_rgba(253,133,11,0.16)]"
                >
                  <div className="flex items-start justify-between gap-2 md:gap-4">
                    <div className="flex h-9 w-9 md:h-14 md:w-14 items-center justify-center bg-[#fd850b]/14 text-[#fd850b] transition group-hover:bg-[#fd850b] group-hover:text-[#120807]">
                      <i className={`fa-solid ${feat.icon} text-sm md:text-xl`} aria-hidden="true"></i>
                    </div>
                    <span className="font-serif text-2xl md:text-4xl leading-none text-[#120807]/10">0{idx + 1}</span>
                  </div>
                  <p className="mt-3 md:mt-7 text-[0.5rem] md:text-xs font-black uppercase tracking-[0.18em] text-[#fd850b]">{feat.kicker}</p>
                  <h3 className="mt-1 md:mt-3 font-black text-sm md:text-2xl leading-tight">{feat.title}</h3>
                  <p className="mt-1 md:mt-4 text-[0.65rem] md:text-sm leading-5 md:leading-7 text-[#4b352b]">{feat.desc}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Event Request Form */}
        <section id="event-form" className="bg-dark text-cream py-10 px-3 md:py-28 md:px-5">
          <div className="max-w-2xl mx-auto">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.65 }} className="text-center mb-6 md:mb-16">
              <h2 className="font-black text-2xl md:text-5xl uppercase mb-2 md:mb-4">REQUEST AN EVENT</h2>
              <p className="text-cream/80 text-xs md:text-base">Let us know about your special occasion and we'll create an unforgettable experience.</p>
            </motion.div>
            <form onSubmit={handleEventFormSubmit} className="bg-white/6 border border-white/9 shadow-custom p-4 md:p-10 rounded space-y-3 md:space-y-6">
              <div className="grid grid-cols-2 gap-3 md:gap-6">
                <div>
                  <label className="block font-black text-[0.6rem] md:text-sm uppercase tracking-wider mb-1 md:mb-3">Name *</label>
                  <input type="text" name="name" value={eventFormData.name} onChange={handleEventFormChange} className="w-full bg-white/10 border border-white/20 text-[#FFF7ED] px-3 py-2.5 md:px-4 md:py-3 rounded text-sm md:text-base focus:outline-none focus:border-orange focus:bg-white/15 transition-all placeholder-[#FFF7ED]/40" placeholder="Your name" autoComplete="name" />
                </div>
                <div>
                  <label className="block font-black text-[0.6rem] md:text-sm uppercase tracking-wider mb-1 md:mb-3">Phone *</label>
                  <input type="tel" name="phone" value={eventFormData.phone} onChange={handleEventFormChange} className="w-full bg-white/10 border border-white/20 text-[#FFF7ED] px-3 py-2.5 md:px-4 md:py-3 rounded text-sm md:text-base focus:outline-none focus:border-orange focus:bg-white/15 transition-all placeholder-[#FFF7ED]/40" placeholder="Your phone" autoComplete="tel" inputMode="tel" />
                </div>
              </div>

              <div>
                <label className="block font-black text-[0.6rem] md:text-sm uppercase tracking-wider mb-1 md:mb-3">Date *</label>
                <div className="grid grid-cols-3 gap-2">
                  <select value={dateMonth} onChange={e => handleDatePartChange('month', e.target.value)} className="w-full bg-[#1a0d0a] border border-white/20 text-[#FFF7ED] px-2 py-2.5 md:px-4 md:py-3 rounded text-sm md:text-base focus:outline-none focus:border-orange transition-all">
                    <option value="">Month</option>
                    {['01','02','03','04','05','06','07','08','09','10','11','12'].map((m, i) => (
                      <option key={m} value={m} className="bg-[#1a0d0a] text-[#FFF7ED]">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</option>
                    ))}
                  </select>
                  <select value={dateDay} onChange={e => handleDatePartChange('day', e.target.value)} className="w-full bg-[#1a0d0a] border border-white/20 text-[#FFF7ED] px-2 py-2.5 md:px-4 md:py-3 rounded text-sm md:text-base focus:outline-none focus:border-orange transition-all">
                    <option value="">Day</option>
                    {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map(d => (
                      <option key={d} value={d} className="bg-[#1a0d0a] text-[#FFF7ED]">{Number(d)}</option>
                    ))}
                  </select>
                  <select value={dateYear} onChange={e => handleDatePartChange('year', e.target.value)} className="w-full bg-[#1a0d0a] border border-white/20 text-[#FFF7ED] px-2 py-2.5 md:px-4 md:py-3 rounded text-sm md:text-base focus:outline-none focus:border-orange transition-all">
                    <option value="">Year</option>
                    {['2026','2027','2028'].map(y => <option key={y} value={y} className="bg-[#1a0d0a] text-[#FFF7ED]">{y}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-6">
                <div>
                  <label className="block font-black text-[0.6rem] md:text-sm uppercase tracking-wider mb-1 md:mb-3">Guests *</label>
                  <input type="number" name="guests" value={eventFormData.guests} onChange={handleEventFormChange} className="w-full h-11 bg-[#1a0d0a] border border-white/20 text-[#FFF7ED] px-3 rounded text-sm md:text-base focus:outline-none focus:border-orange transition-all" min="5" max="500" inputMode="numeric" placeholder="e.g. 20" />
                </div>
                <div>
                  <label className="block font-black text-[0.6rem] md:text-sm uppercase tracking-wider mb-1 md:mb-3">Event Type *</label>
                  <select name="eventType" value={eventFormData.eventType} onChange={handleEventFormChange} className="w-full h-11 bg-[#1a0d0a] border border-white/20 text-[#FFF7ED] px-3 rounded text-sm md:text-base focus:outline-none focus:border-orange transition-all">
                    <option value="" className="bg-[#1a0d0a] text-[#FFF7ED]">Select type</option>
                    <option value="birthday" className="bg-[#1a0d0a] text-[#FFF7ED]">Birthday</option>
                    <option value="family" className="bg-[#1a0d0a] text-[#FFF7ED]">Family Gathering</option>
                    <option value="corporate" className="bg-[#1a0d0a] text-[#FFF7ED]">Corporate Event</option>
                    <option value="group" className="bg-[#1a0d0a] text-[#FFF7ED]">Group Celebration</option>
                    <option value="wedding" className="bg-[#1a0d0a] text-[#FFF7ED]">Wedding Reception</option>
                    <option value="other" className="bg-[#1a0d0a] text-[#FFF7ED]">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-black text-[0.6rem] md:text-sm uppercase tracking-wider mb-1 md:mb-3">Message</label>
                <textarea name="message" value={eventFormData.message} onChange={handleEventFormChange} className="w-full bg-white/10 border border-white/20 text-[#FFF7ED] px-3 py-2.5 md:px-4 md:py-3 rounded text-sm md:text-base focus:outline-none focus:border-orange focus:bg-white/15 transition-all placeholder-[#FFF7ED]/40 min-h-24 md:min-h-28 resize-none" placeholder="Tell us about your event…"></textarea>
              </div>

              <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-yellow to-orange text-black font-black text-sm md:text-base uppercase tracking-wider py-3 rounded hover:shadow-xl hover:-translate-y-1 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
                {submitting ? <><i className="fa-solid fa-spinner fa-spin mr-2"></i> Sending…</> : <><i className="fa-solid fa-calendar-check mr-2"></i> Submit Request</>}
              </button>
            </form>
          </div>
        </section>
      </main>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-5">
          <div className="bg-gradient-to-br from-dark to-brown border border-orange/30 shadow-2xl rounded max-w-sm w-full p-10 text-center text-cream">
            <div className="w-20 h-20 flex items-center justify-center bg-orange/20 rounded-full mx-auto mb-6">
              <i className="fa-solid fa-check text-orange text-4xl"></i>
            </div>
            <h3 className="font-black text-3xl mb-3">SUCCESS!</h3>
            <p className="text-cream/80 mb-6">Your event request has been sent! Our team will contact you shortly to confirm the details.</p>
            <button onClick={() => setShowSuccessModal(false)} className="px-6 py-2 bg-orange text-black font-black text-sm uppercase tracking-wider rounded hover:bg-yellow transition-all">Close</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
