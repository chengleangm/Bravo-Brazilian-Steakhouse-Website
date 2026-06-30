'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const vp = { once: true, amount: 0.2 }

const SPECIALS = [
  {
    tag: 'Daily · Mon – Fri',
    title: 'Lunch Buffet',
    copy: 'All-you-can-eat churrasco + full buffet bar. Unlimited grill cuts carved tableside from 11:00 AM.',
    icon: 'fa-sun',
    cta: { label: 'Book Lunch', href: '/contact#reservation' },
  },
  {
    tag: 'Sat & Sun',
    title: 'Weekend Family Table',
    copy: 'Bring the whole family. Special group pricing on weekends — perfect for large tables and celebrations.',
    icon: 'fa-people-group',
    cta: { label: 'Reserve Now', href: '/contact#reservation' },
  },
  {
    tag: 'Any Night',
    title: 'Private Dining',
    copy: 'Birthdays, corporate dinners, romantic dates. We close off the space and set everything up for you.',
    icon: 'fa-champagne-glasses',
    cta: { label: 'Enquire', href: '/contact#reservation' },
  },
  {
    tag: 'Group Offer',
    title: 'Party of 10+',
    copy: 'Booking a big group? Ask about our group packages with fixed menus, drinks, and reserved seating.',
    icon: 'fa-users',
    cta: { label: 'Get a Quote', href: '/catering' },
  },
]

export function Specials() {
  return (
    <section className="bg-[#0e0905] px-4 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          transition={{ duration: 0.7 }}
          className="mb-10 sm:mb-14 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-[#fd850b]/40 sm:w-28" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fd850b] sm:text-xs">Specials & Offers</span>
            <div className="h-px w-16 bg-[#fd850b]/40 sm:w-28" />
          </div>
          <h2 className="font-serif text-2xl uppercase leading-tight text-white sm:text-3xl lg:text-[2.4rem]">
            What's On at BRAVO
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#C7B8A8] sm:text-base">
            From daily lunch deals to private event packages — something for every occasion.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6"
        >
          {SPECIALS.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="group flex flex-col rounded-xl border border-[#D4A373]/15 bg-[#1A0E0A] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#fd850b]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#fd850b]/15">
                <i className={`fa-solid ${s.icon} text-[#fd850b] text-lg`} aria-hidden="true" />
              </div>
              <span className="mb-1 text-[0.6rem] font-black uppercase tracking-[0.22em] text-[#fd850b]">{s.tag}</span>
              <h3 className="font-serif text-xl uppercase leading-tight text-white">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-[#C7B8A8]">{s.copy}</p>
              <Link
                href={s.cta.href}
                className="mt-5 inline-flex items-center gap-1.5 text-[0.7rem] font-black uppercase tracking-[0.16em] text-[#fd850b] transition hover:text-white"
              >
                {s.cta.label}
                <i className="fa-solid fa-arrow-right text-[0.6rem]" aria-hidden="true" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center sm:mt-14"
        >
          <Link
            href="/promotions"
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#fd850b]/60 px-8 py-3 text-sm font-black uppercase tracking-[0.14em] text-[#fd850b] transition duration-300 hover:bg-[#fd850b] hover:text-[#120807]"
          >
            <i className="fa-solid fa-tags" aria-hidden="true" />
            View All Promotions
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
