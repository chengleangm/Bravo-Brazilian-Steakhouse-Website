'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } }
const fadeLeft = { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0 } }
const fadeRight = { hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0 } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const vp = { once: true, amount: 0.2 }

const DEFAULTS = {
  aboutHero: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85',
  aboutStory: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=80',
  aboutChurrascaria: 'https://images.unsplash.com/photo-1702741168115-cd3d9a682972?auto=format&fit=crop&w=1200&q=85',
  aboutTeamGroup: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=700&q=80',
  aboutCTA: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85',
}

const DEFAULT_TEAM = [
  { id: 1, name: 'Chef Carlos', title: 'Head Chef', description: '30 years grilling meat in São Paulo and Phnom Penh.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80' },
]

const VALUES = [
  { icon: 'fa-fire-flame-curved', title: 'Our Mission', body: 'To serve authentic Brazilian churrasco with warmth, skill, and the generosity that defines community dining at its best.' },
  { icon: 'fa-heart', title: 'Craft & Passion', body: 'Every cut is seasoned with care. Every flame is tended with patience. Every plate reflects our commitment to excellence.' },
  { icon: 'fa-handshake', title: 'Hospitality First', body: 'Your comfort and happiness matter more than speed. We listen, we adapt, and we go the extra mile.' },
  { icon: 'fa-circle-check', title: 'Consistency', body: 'Rain or shine, lunch or dinner, you can count on BRAVO to deliver the same quality and warmth every single visit.' },
]

const WHY_US = [
  { icon: 'fa-globe', title: 'Authentic Brazilian', body: 'Our chefs are Brazilian trained. Our methods are time-honoured. Our passion is genuine.' },
  { icon: 'fa-leaf', title: 'Fresh Ingredients', body: 'Premium meats, fresh vegetables, and quality sides sourced daily for optimal taste and quality.' },
  { icon: 'fa-users', title: 'Family Friendly', body: 'Welcoming to all ages, we host celebrations, quiet dinners, and joyful group gatherings every night.' },
  { icon: 'fa-sun', title: 'Warm Atmosphere', body: 'Our dining room is built for laughter, connection, and the kind of memories that last.' },
]

const ABOUT_CTA_HIGHLIGHTS = ['Brazilian grill tradition', 'Warm Phnom Penh hospitality', 'Built for groups and celebrations']

export default function AboutPage() {
  const [imgs, setImgs] = useState(DEFAULTS)
  const [teamMembers, setTeamMembers] = useState(DEFAULT_TEAM)

  useEffect(() => {
    fetch('/api/admin/page-images')
      .then(r => r.json())
      .then(d => setImgs(prev => ({ ...prev, ...d })))
      .catch(() => {})
    fetch('/api/admin/menu-items')
      .then(r => r.json())
      .then(d => { if (d.teamMembers?.length) setTeamMembers(d.teamMembers) })
      .catch(() => {})
  }, [])

  const u = (src: string) => !src.includes('unsplash.com')

  return (
    <>
      <Header />
      <main>

        {/* Hero */}
        <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-[#120807] px-5 pb-12 pt-24 text-center text-white sm:min-h-screen sm:pb-16 sm:pt-32">
          <Image src={imgs.aboutHero} alt="Bravo Brazilian Steakhouse" fill priority sizes="100vw" className="object-cover object-center" unoptimized={u(imgs.aboutHero)} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-black/75" />
          <div className="relative z-10">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#fd850b] sm:mb-4 sm:text-xs">Phnom Penh · Est. 2024</p>
            <h1 className="font-serif text-5xl font-black uppercase leading-none drop-shadow-lg sm:text-7xl md:text-9xl">About Bravo</h1>
            <p className="mx-auto mt-4 max-w-sm text-sm text-white/80 sm:mt-6 sm:max-w-md sm:text-lg">Our story, our team, our mission</p>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-[#FFF7ED] px-4 py-8 text-[#120807] sm:px-5 sm:py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-5 md:grid-cols-2 md:gap-16">
            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }} className="relative order-1 h-44 overflow-hidden rounded shadow-lg sm:h-80 md:order-2 md:h-96">
              <Image src={imgs.aboutStory} alt="Brazilian steakhouse dining" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" unoptimized={u(imgs.aboutStory)} />
            </motion.div>
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7, delay: 0.1 }} className="order-2 md:order-1">
              <p className="mb-1.5 text-[10px] font-black uppercase tracking-widest text-[#fd850b] sm:mb-3 sm:text-xs">Our Journey</p>
              <h2 className="font-serif text-2xl font-black uppercase leading-tight sm:text-5xl md:text-6xl">The Bravo Story</h2>
              <p className="mt-3 text-sm leading-relaxed opacity-90 sm:mt-8 sm:text-lg">BRAVO Brazilian Steakhouse was born from a simple dream: to bring the joy and generosity of a real São Paulo churrascaria to Phnom Penh.</p>
              <p className="mt-2 text-sm leading-relaxed opacity-90 sm:mt-4 sm:text-lg">Our founder assembled a team of seasoned grill masters and hospitality experts who share a passion for fire, meat, and gathering. Every day we celebrate the rhythm of churrasco — slow flames, caramelized edges, and tables full of guests who leave happy.</p>
            </motion.div>
          </div>
        </section>

        {/* Churrascaria */}
        <section id="churrascaria" className="bg-[#120807] px-5 py-12 text-[#FFF7ED] sm:py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-16">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }} className="relative h-56 overflow-hidden rounded shadow-lg sm:h-80 md:h-96 md:order-1">
              <Image src={imgs.aboutChurrascaria} alt="Churrasco grilling" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" unoptimized={u(imgs.aboutChurrascaria)} />
            </motion.div>
            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7, delay: 0.1 }} className="md:order-2">
              <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#fd850b] sm:mb-3 sm:text-xs">Brazilian Tradition</p>
              <h2 className="font-serif text-3xl font-black uppercase leading-tight sm:text-5xl">What is Churrascaria?</h2>
              <p className="mt-4 text-sm leading-relaxed opacity-90 sm:mt-8 sm:text-lg">Churrascaria is more than a meal. It is a celebration of fire, meat, and community. Servers roam the table with skewers of grilled meats — beef, lamb, pork, and chicken — and slice portions directly onto diners&apos; plates.</p>
              <p className="mt-3 text-sm leading-relaxed opacity-90 sm:mt-4 sm:text-lg">Between cuts, diners enjoy fresh salads, hot sides, and sauces from a full buffet. The pace is relaxed, the portions are generous, and the conversation flows as long as you want to eat.</p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="bg-[#FFF7ED] px-5 py-12 text-[#120807] sm:py-20 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.65 }} className="mx-auto mb-8 max-w-2xl text-center sm:mb-14">
              <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#fd850b] sm:mb-3 sm:text-xs">Our Foundation</p>
              <h2 className="font-serif text-3xl font-black uppercase leading-tight sm:text-5xl">Mission &amp; Values</h2>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {VALUES.map(({ icon, title, body }) => (
                <motion.div key={title} variants={fadeUp} transition={{ duration: 0.55 }} className="rounded border border-black/8 bg-white/60 p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:p-7">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#fd850b]/15 sm:mb-4 sm:h-16 sm:w-16">
                    <i className={`fa-solid ${icon} text-lg text-[#fd850b] sm:text-2xl`} />
                  </div>
                  <h3 className="mb-1 text-sm font-black leading-tight sm:mb-3 sm:text-xl">{title}</h3>
                  <p className="text-[11px] leading-relaxed opacity-80 sm:text-sm">{body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Bravo */}
        <section className="bg-[#120807] px-5 py-12 text-[#FFF7ED] sm:py-20 lg:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.65 }} className="mx-auto mb-8 max-w-2xl text-center sm:mb-14">
              <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#fd850b] sm:mb-3 sm:text-xs">What Sets Us Apart</p>
              <h2 className="font-serif text-3xl font-black uppercase leading-tight sm:text-5xl">Why Choose Bravo</h2>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {WHY_US.map(({ icon, title, body }) => (
                <motion.div key={title} variants={fadeUp} transition={{ duration: 0.55 }} className="rounded border border-white/8 bg-white/5 p-4 transition-all hover:-translate-y-1 hover:shadow-xl sm:p-7">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A373]/15 sm:mb-4 sm:h-16 sm:w-16">
                    <i className={`fa-solid ${icon} text-lg text-[#D4A373] sm:text-2xl`} />
                  </div>
                  <h3 className="mb-1 text-sm font-black leading-tight sm:mb-3 sm:text-xl">{title}</h3>
                  <p className="text-[11px] leading-relaxed opacity-80 sm:text-sm">{body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Intro */}
        <section className="bg-[#FFF7ED] px-5 py-12 text-[#120807] sm:py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-16">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }}>
              <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#fd850b] sm:mb-3 sm:text-xs">Meet the Team</p>
              <h2 className="font-serif text-3xl font-black uppercase leading-tight sm:text-5xl">Crafted by Passionate People</h2>
              <p className="mt-4 text-sm leading-relaxed opacity-90 sm:mt-8 sm:text-lg">Our team brings together Brazilian grill masters, attentive servers, and hospitality leaders who share one goal: to make your dining experience unforgettable.</p>
              <p className="mt-3 text-sm leading-relaxed opacity-90 sm:mt-4 sm:text-lg">Every role matters. From the chef tending the flames to the server at your table, BRAVO is a team effort built on care and craftsmanship.</p>
            </motion.div>
            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7, delay: 0.1 }} className="relative h-56 overflow-hidden rounded shadow-lg sm:h-80 md:h-96">
              <Image src={imgs.aboutTeamGroup} alt="BRAVO team" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" unoptimized={u(imgs.aboutTeamGroup)} />
            </motion.div>
          </div>
        </section>

        {/* Team Members */}
        <section className="bg-[#120807] px-5 py-12 text-[#FFF7ED] sm:py-20 lg:py-28">
          <div className="mx-auto max-w-4xl">
            {teamMembers.slice(0, 1).map((member) => (
              <motion.div key={member.id} variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }} className="overflow-hidden rounded border border-white/8 bg-white/5 shadow-lg md:flex">
                <div className="relative h-64 w-full shrink-0 md:h-auto md:w-72 lg:w-96">
                  <Image src={member.image} alt={member.name} fill sizes="(max-width:768px) 100vw, 384px" className="object-cover object-top" unoptimized={u(member.image)} />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-10">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#fd850b] sm:text-xs">{member.title}</p>
                  <h3 className="font-serif text-2xl font-black uppercase leading-tight sm:text-4xl">{member.name}</h3>
                  <div className="my-4 h-px w-12 bg-[#fd850b]/50 sm:my-6" />
                  <p className="text-sm leading-relaxed text-[#C7B8A8] sm:text-base">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-y border-[#D4A373]/18 bg-[#120807] px-5 py-12 text-[#FFF7ED] sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <Image src={imgs.aboutCTA} alt="" fill sizes="100vw" className="object-cover opacity-25" aria-hidden="true" unoptimized={u(imgs.aboutCTA)} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,8,7,0.98)_0%,rgba(18,8,7,0.88)_48%,rgba(18,8,7,0.68)_100%)]" />

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }} className="relative z-10 mx-auto grid max-w-6xl items-center gap-6 sm:gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#fd850b] sm:mb-4 sm:text-xs">Visit Bravo</p>
              <h2 className="font-serif text-3xl font-black uppercase leading-tight sm:text-5xl md:text-6xl">Experience the Bravo difference</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#f4d8c5] sm:mt-5 sm:text-base sm:leading-8 lg:text-lg">Come for the fire-grilled cuts, stay for the service, sides, and celebration-style Brazilian steakhouse atmosphere.</p>
            </div>
            <div className="flex flex-row gap-3 sm:flex-row lg:flex-col">
              <Link href="/contact#reservation" className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-[#fd850b] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#120807] shadow-[0_18px_44px_rgba(253,133,11,0.32)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(253,133,11,0.5)] sm:min-h-14 sm:px-7 sm:py-4 sm:text-sm">
                <i className="fa-solid fa-calendar-check" aria-hidden="true" /> Book a Table
              </Link>
              <Link href="/menu" className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 border border-[#FFF7ED]/42 bg-black/20 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#FFF7ED] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#fd850b] hover:bg-[#fd850b] hover:text-[#120807] sm:min-h-14 sm:px-7 sm:py-4 sm:text-sm">
                <i className="fa-solid fa-utensils" aria-hidden="true" /> View Menu
              </Link>
            </div>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="relative z-10 mx-auto mt-6 grid max-w-6xl gap-2 sm:mt-9 sm:gap-3 md:grid-cols-3">
            {ABOUT_CTA_HIGHLIGHTS.map((item) => (
              <motion.div key={item} variants={fadeUp} transition={{ duration: 0.5 }} className="border border-[#D4A373]/18 bg-[#FFF7ED]/7 px-4 py-3 backdrop-blur sm:px-5 sm:py-4">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#FFF7ED] sm:text-sm">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  )
}
