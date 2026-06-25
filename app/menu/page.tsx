'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import styles from './page.module.css'

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const vp = { once: true, amount: 0.15 }

type MenuItem = { name: string; description: string; price: string; image?: string }
type MenuSection = { id: string; eyebrow: string; title: string; description: string; items: MenuItem[] }
type BuffetPackage = { name: string; grillCount: number; priceAdult: string; priceKids: string; items: string[]; extras?: string; highlight?: boolean }

const DEFAULT_HERO = 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=2000&q=90'
const menuCtaHighlights = [
  { label: 'Buffet', value: 'Lunch and dinner' },
  { label: 'À La Carte', value: 'Open daily 11AM–10:30PM' },
  { label: 'Groups', value: 'Tables for celebrations' },
]

/* ── BUFFET DATA ── */
const lunchPackages: BuffetPackage[] = [
  {
    name: 'Buffet + 6 Grill', grillCount: 6, priceAdult: '$10.95', priceKids: '$8.50',
    items: ['Beef Sirloin / សាច់គោដាប់ខ្ទាញ់','Garlic Steak / សាច់គោខ្ទឹម','Grill Chicken Wings / ស្លាបមាន់','Honey Pork Ham / ភ្លៅជ្រូក','Pork Sausages / សាច់ក្រកសាច់ជ្រូក','Dory Fish / ត្រីដូរី'],
  },
  {
    name: 'Buffet + 8 Grill', grillCount: 8, priceAdult: '$13.95', priceKids: '$10.50', highlight: true,
    items: ['Beef Sirloin / សាច់គោដាប់ខ្ទាញ់','Garlic Steak / សាច់គោខ្ទឹម','Smoked Duck / ទ្រូងទា','Grill Chicken Wings / ស្លាបមាន់','Honey Pork Ham / ភ្លៅជ្រូក','Pork Sausages / សាច់ក្រកសាច់ជ្រូក','Pork Char Siu / សាច់ជ្រូកសាសួរ','Dory Fish / ត្រីដូរី'],
  },
]
const dinnerPackages: BuffetPackage[] = [
  {
    name: 'Buffet + 12 Grill', grillCount: 12, priceAdult: '$19.95', priceKids: '$16.50',
    items: ['Beef Sirloin / សាច់គោដាប់ខ្ទាញ់','Garlic Steak / សាច់គោខ្ទឹម','Beef Cheese / សាច់គោស៊ីស','Lamb of Leg / ជើងចៀម','Spicy Pork Sausages / សាច់ក្រកហឹរ','Smoked Duck / ទ្រូងទា','Pork Char Siu / សាច់ជ្រូកសាសួរ','Grill Chicken Wings / ស្លាបមាន់','Honey Pork Ham / ភ្លៅជ្រូក','Pork Sausages / សាច់ក្រកសាច់ជ្រូក','Chicken Hearts / បេះដូងមាន់','Dory Fish / ត្រីដូរី'],
    extras: 'Salads · Hot Dishes · Fruits · Soup · Breads · Seafood · Coldcuts · Desserts',
  },
  {
    name: 'Buffet + 15 Grill', grillCount: 15, priceAdult: '$29.95', priceKids: '$19.50', highlight: true,
    items: ['Beef Ribs (USA) / សាច់គោឆ្អឹងជំនី','Rump Steak / សាច់គោចន្លូក','Beef Hump / ហ្គកគោ','Beef Sirloin / សាច់គោដាប់ខ្ទាញ់','Garlic Steak / សាច់គោខ្ទឹម','Beef Cheese / សាច់គោស៊ីស','Lamb of Leg / ជើងចៀម','Spicy Pork Sausages / សាច់ក្រកហឹរ','Smoked Duck / ទ្រូងទា','Pork Char Siu / សាច់ជ្រូកសាសួរ','Grill Chicken Wings / ស្លាបមាន់','Honey Pork Ham / ភ្លៅជ្រូក','Pork Sausages / សាច់ក្រកសាច់ជ្រូក','Dory Fish / ត្រីដូរី','River Prawns / បង្គាទន្លេ'],
    extras: 'Salads · Hot Dishes · Fruits · Soup · Breads · Seafood · Coldcuts · Desserts',
  },
]


/* ── MENU SECTIONS ── */
const menuSections: MenuSection[] = [
  {
    id: 'alacarte',
    eyebrow: 'Open Daily 11AM – 10:30PM',
    title: 'À La Carte Menu',
    description: 'Individual plates served with rice, fries, salad, or pasta — fire-grilled to order.',
    items: [
      { name: 'Steak Mayo', description: 'White rice, mayonnaise salad & fries.', price: '$10.95', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=90' },
      { name: 'Bravo Steak Brazil', description: 'White rice, pinto beans, fried egg, tomatoes and fries.', price: '$11.95', image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=90' },
      { name: 'Steak Pepper', description: 'Topped with sauce, beans, couscous, salad & fries.', price: '$11.95', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=90' },
      { name: 'Picanha / Rump', description: 'White rice, mayonnaise salad & fries.', price: '$12.95', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=90' },
      { name: 'Spaghetti Steak', description: 'Spaghetti with tomato sauce.', price: '$10.95', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=90' },
      { name: 'Chicken Pasta', description: 'Penne pasta with tomato sauce.', price: '$8.95', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=900&q=90' },
      { name: 'Garlic Rumpsteak', description: 'White rice, salsa sauce, salad & fries.', price: '$12.95', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=90' },
      { name: 'Parmigiana Chicken', description: 'Chicken with mozzarella cheese and tomato sauce.', price: '$10.95', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=90' },
      { name: 'Parmigiana Steak', description: 'Sirloin steak with pasta sauce and mozzarella.', price: '$11.95', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=90' },
    ],
  },
  {
    id: 'grill',
    eyebrow: 'Fire-Carved Tableside',
    title: 'Grill Cuts',
    description: 'Premium cuts from the churrasco skewer — seasoned, grilled over fire, and carved at your table.',
    items: [
      { name: 'Beef Ribs (USA) / សាច់គោឆ្អឹងជំនី', description: 'Slow-grilled USA beef ribs with deep smoky flavour.', price: 'Buffet Included', image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=600&q=85' },
      { name: 'Rump Steak / សាច់គោចន្លូក', description: 'Juicy rump steak grilled over open flame.', price: 'Buffet Included', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=85' },
      { name: 'Beef Hump / ហ្គកគោ', description: 'Richly marbled hump cut with a deep beefy finish.', price: 'Buffet Included', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=85' },
      { name: 'Beef Cheese / សាច់គោស៊ីស', description: 'Tender beef skewer finished with melted cheese.', price: 'Buffet Included', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=600&q=85' },
      { name: 'Beef Sirloin / សាច់គោដាប់ខ្ទាញ់', description: 'Classic sirloin on the skewer, carved to order.', price: 'Buffet Included', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600&q=85' },
      { name: 'Garlic Steak / សាច់គោខ្ទឹម', description: 'Sirloin brushed with roasted garlic butter.', price: 'Buffet Included', image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=85' },
      { name: 'Dory Fish / ត្រីដូរី', description: 'Dory fish fillet grilled with garlic and herbs.', price: 'Buffet Included', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=85' },
      { name: 'Honey Pork Ham / ភ្លៅជ្រូក', description: 'Glazed pork ham with honey and smoky char.', price: 'Buffet Included', image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=85' },
      { name: 'Lamb of Leg / ជើងចៀម', description: 'Herb-marinated leg of lamb grilled over charcoal.', price: 'Buffet Included', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=85' },
      { name: 'Pork Sausages / សាច់ក្រកសាច់ជ្រូក', description: 'Brazilian-style pork sausage skewered and grilled.', price: 'Buffet Included', image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=85' },
      { name: 'Smoked Duck / ទ្រូងទា', description: 'Smoked duck breast with caramelised edges.', price: 'Buffet Included', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=85' },
      { name: 'Chicken Hearts / បេះដូងមាន់', description: 'Classic churrasco chicken hearts with sea salt.', price: 'Buffet Included', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=600&q=85' },
      { name: 'Chicken Wings / ស្លាបមាន់', description: 'Grill chicken wings with crisp skin and juicy inside.', price: 'Buffet Included', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=85' },
      { name: 'River Prawns / បង្គាទន្លេ', description: 'Grilled river prawns with garlic butter and lime.', price: 'Buffet Included', image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=85' },
      { name: 'Pork Char Siu / សាច់ជ្រូកសាសួរ', description: 'Chinese-style BBQ pork with sweet glaze.', price: 'Buffet Included', image: 'https://images.unsplash.com/photo-1606851091851-e8c8c0fca5ba?auto=format&fit=crop&w=600&q=85' },
      { name: 'Spicy Pork Sausage / សាច់ក្រកហឹរ', description: 'Spiced pork sausage with chilli heat and smoky finish.', price: 'Buffet Included', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=85' },
    ],
  },
]

/* ── COMPONENTS ── */
function BuffetPackageCard({ pkg }: { pkg: BuffetPackage }) {
  return (
    <article className={`relative flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 ${pkg.highlight ? 'shadow-[0_0_60px_rgba(253,133,11,0.18)]' : 'shadow-[0_8px_40px_rgba(0,0,0,0.4)]'}`}>
      <div className={`h-1.5 w-full ${pkg.highlight ? 'bg-[#fd850b]' : 'bg-[#D4A373]/40'}`} />
      <div className={`flex flex-1 flex-col ${pkg.highlight ? 'bg-[#1c0f0a]' : 'bg-[#181008]'}`}>

        {/* Header: title + price badge */}
        <div className="flex items-start justify-between gap-2 p-3 pb-0 sm:gap-4 sm:p-6 sm:pb-0 lg:p-8 lg:pb-0">
          <div className="min-w-0">
            <h3 className="font-serif text-sm font-black uppercase leading-tight text-[#FFF7ED] sm:text-2xl lg:text-4xl">{pkg.name}</h3>
            <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[7px] font-black uppercase tracking-[0.18em] sm:mt-2 sm:px-3 sm:text-[9px] ${pkg.highlight ? 'bg-[#fd850b] text-black' : 'invisible'}`}>Most Popular</span>
          </div>
          <div className={`flex shrink-0 flex-col items-center justify-center rounded-lg px-2 py-1.5 text-center sm:rounded-2xl sm:px-4 sm:py-3 ${pkg.highlight ? 'bg-[#fd850b]' : 'bg-[#fd850b]/15 ring-1 ring-[#fd850b]/40'}`}>
            <span className={`text-[7px] font-bold uppercase tracking-widest sm:text-[10px] ${pkg.highlight ? 'text-black/70' : 'text-[#fd850b]'}`}>Per person</span>
            <span className={`text-sm font-black leading-none sm:text-2xl lg:text-3xl ${pkg.highlight ? 'text-black' : 'text-[#fd850b]'}`}>{pkg.priceAdult}</span>
            <span className={`text-[7px] font-bold sm:mt-0.5 sm:text-[9px] ${pkg.highlight ? 'text-black/60' : 'text-[#C7B8A8]'}`}>Adult</span>
          </div>
        </div>

        {/* Kids price */}
        <div className="mx-3 mt-2 flex items-center gap-1.5 rounded bg-white/4 px-2 py-1.5 ring-1 ring-white/8 sm:mx-6 sm:mt-3 sm:gap-3 sm:rounded-lg sm:px-4 sm:py-2.5 lg:mx-8">
          <i className="fa-solid fa-child-reaching text-[#D4A373] text-[10px] sm:text-sm" aria-hidden="true" />
          <span className="text-[9px] font-bold text-[#C7B8A8] sm:text-xs">Kids (6–10 yrs)</span>
          <span className="ml-auto text-[10px] font-black text-[#D4A373] sm:text-sm">{pkg.priceKids}</span>
        </div>

        {/* Grill items divider */}
        <div className="mx-3 mt-3 flex items-center gap-2 sm:mx-6 sm:mt-4 lg:mx-8">
          <div className="h-px flex-1 bg-[#D4A373]/15" />
          <span className="text-[8px] font-black uppercase tracking-[0.18em] text-[#fd850b] sm:text-[9px] sm:tracking-[0.22em]">Grill Items</span>
          <div className="h-px flex-1 bg-[#D4A373]/15" />
        </div>

        {/* Items list */}
        <ul className="mx-3 mt-2 grid grid-cols-1 gap-y-1 sm:mx-6 sm:mt-3 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2 lg:mx-8">
          {pkg.items.map((item) => {
            const [en, km] = item.split(' / ')
            return (
              <li key={item} className="flex items-start gap-1.5 leading-snug text-[#C7B8A8] sm:gap-2">
                <i className="fa-solid fa-caret-right mt-0.5 shrink-0 text-[8px] text-[#fd850b] sm:text-[10px]" aria-hidden="true" />
                <span className="text-[9px] sm:text-sm">
                  <span className="block">{en}</span>
                  {km && <span className="block text-[8px] text-[#C7B8A8]/60 sm:text-[10px]">{km}</span>}
                </span>
              </li>
            )
          })}
        </ul>

        {/* Extras tags */}
        {pkg.extras && (
          <div className="mx-3 mt-3 flex flex-wrap gap-1 sm:mx-6 sm:mt-4 sm:gap-1.5 lg:mx-8">
            {pkg.extras.split(' · ').map((tag) => (
              <span key={tag} className="rounded-full bg-[#fd850b]/10 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-[#fd850b] ring-1 ring-[#fd850b]/20 sm:px-2.5 sm:py-1 sm:text-[10px]">{tag}</span>
            ))}
          </div>
        )}

        {/* Book button */}
        <div className="mt-auto p-3 pt-4 sm:p-6 sm:pt-6 lg:p-8 lg:pt-6">
          <Link href="/contact#reservation" className={`flex w-full min-h-9 items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-wider transition duration-300 hover:-translate-y-0.5 sm:min-h-12 sm:gap-2 sm:text-xs sm:tracking-widest ${pkg.highlight ? 'bg-[#fd850b] text-black shadow-[0_8px_20px_rgba(253,133,11,0.35)] hover:bg-[#ff9a2e]' : 'border border-[#fd850b]/50 text-[#fd850b] hover:bg-[#fd850b] hover:text-black'}`}>
            <i className="fa-solid fa-calendar-check text-[9px] sm:text-xs" aria-hidden="true" />
            <span className="hidden sm:inline">Book This Package</span>
            <span className="sm:hidden">Book Now</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#D4A373]/18 bg-[#120807] shadow-[0_24px_70px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-2 hover:border-[#fd850b]/55">
      {item.image && (
        <div className="relative h-32 overflow-hidden sm:h-48 lg:h-56">
          <Image src={item.image} alt={item.name} fill sizes="50vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120807]/60 to-transparent" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h3 className="text-base font-black leading-tight text-[#FFF7ED] sm:text-xl">{item.name}</h3>
        <p className="mt-2 text-sm leading-6 text-[#C7B8A8] sm:mt-3 sm:text-base sm:leading-7">{item.description}</p>
        <span className={`mt-auto block pt-4 text-base font-black sm:text-lg ${item.price === 'Buffet Included' ? 'text-[#fd850b]' : 'text-[#D4A373]'}`}>{item.price}</span>
      </div>
    </article>
  )
}

function GrillCard({ item }: { item: MenuItem }) {
  const [englishName, khmerName] = item.name.split(' / ')
  return (
    <article className="group relative aspect-[3/4] overflow-hidden">
      {item.image && (
        <Image
          src={item.image}
          alt={englishName}
          fill
          sizes="25vw"
          className="object-cover transition duration-700 group-hover:scale-[1.07]"
          unoptimized={!item.image.includes('unsplash.com')}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-3 lg:p-4">
        <p className="font-serif text-[7px] font-black uppercase leading-tight text-white sm:text-xs lg:text-[0.95rem]">{englishName}</p>
        {khmerName && <p className="mt-0.5 hidden text-[9px] leading-snug text-[#C7B8A8] sm:block sm:text-[10px] sm:leading-snug">{khmerName}</p>}
      </div>
    </article>
  )
}

function AlaCarteCard({ item }: { item: MenuItem }) {
  return (
    <article className="group relative flex flex-col items-center overflow-hidden rounded-lg border border-[#ffffff07] bg-[#0e0b08] p-2 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#fd850b]/30 hover:shadow-[0_12px_48px_rgba(253,133,11,0.13)] sm:rounded-xl sm:p-5 lg:p-7">
      {/* Circle image with price badge */}
      <div className="relative mx-auto w-full">
        {item.image && (
          <div className="relative aspect-square overflow-hidden rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.6)] sm:shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width:640px) 33vw, (max-width:1024px) 210px, 230px"
              className="object-cover transition duration-500 group-hover:scale-[1.08]"
              unoptimized={!item.image.includes('unsplash.com')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        )}
        {/* Price badge */}
        <div className="absolute -left-1 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#fd850b] shadow-[0_0_0_2px_#0e0b08,0_0_10px_rgba(253,133,11,0.7)] sm:-left-2 sm:h-[3.25rem] sm:w-[3.25rem] sm:shadow-[0_0_0_3px_#0e0b08,0_0_20px_rgba(253,133,11,0.7)]">
          <span className="text-center text-[7px] font-black leading-tight text-white sm:text-[10px]">{item.price}</span>
        </div>
      </div>

      {/* Divider — hidden on mobile */}
      <div className="my-2 hidden items-center gap-2 sm:my-4 sm:flex">
        <div className="h-px w-6 bg-[#fd850b]/30" />
        <div className="h-1 w-1 rounded-full bg-[#fd850b]/50" />
        <div className="h-px w-6 bg-[#fd850b]/30" />
      </div>
      <div className="mt-1.5 sm:hidden" />

      <h3 className="text-[8px] font-black uppercase leading-tight text-[#FFF7ED] sm:font-serif sm:text-base lg:text-xl">{item.name}</h3>
      <p className="mt-0.5 text-[7px] leading-tight text-[#7a6e64] sm:mt-2 sm:max-w-[170px] sm:text-xs sm:leading-5">{item.description}</p>
    </article>
  )
}

function AlaCarteSection({ section }: { section: MenuSection }) {
  return (
    <section id={section.id} className="bg-[#0a0805] px-3 py-12 sm:px-8 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }} className="mb-8 text-center sm:mb-14">
          <div className="mb-5 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-[#fd850b]/40 sm:w-28" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fd850b] sm:text-xs">Bravo Restaurant</span>
            <div className="h-px w-16 bg-[#fd850b]/40 sm:w-28" />
          </div>
          <h2 className="font-serif text-3xl font-black uppercase leading-none text-white sm:text-7xl lg:text-[7rem]">
            À La Carte
          </h2>
          <p className="-mt-1 font-serif text-2xl font-black uppercase leading-none text-[#fd850b] sm:-mt-3 sm:text-6xl lg:text-7xl">
            Menu
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-[#fd850b] px-4 py-1.5 shadow-[0_8px_28px_rgba(253,133,11,0.35)] sm:mt-7 sm:gap-2.5 sm:px-6 sm:py-2">
            <i className="fa-solid fa-clock text-[9px] text-black sm:text-[10px]" aria-hidden="true" />
            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-black sm:text-xs sm:tracking-[0.2em]">Open Daily · 11AM – 10:30PM</span>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }} className="grid grid-cols-3 gap-2 sm:gap-5 lg:gap-6 xl:gap-8">
          {section.items.map((item) => <AlaCarteCard key={item.name} item={item} />)}
        </motion.div>
      </div>
    </section>
  )
}

function DrinkCategoryHeader({ title }: { title: string }) {
  return (
    <div className="border-2 border-white py-1 text-center sm:border-[3px] sm:py-1.5 lg:py-2">
      <h3 className="font-serif text-xs font-black uppercase tracking-widest text-white sm:text-base lg:text-xl">{title}</h3>
    </div>
  )
}

function DrinkSubHeader({ title }: { title: string }) {
  return (
    <p className="mb-0.5 mt-2 text-center text-[9px] font-black uppercase tracking-[0.2em] text-white sm:mt-3 sm:text-[10px] lg:mt-4 lg:text-xs">{title}</p>
  )
}

function DrinkList({ items }: { items: { name: string; price: string }[] }) {
  return (
    <ul className="mt-0.5 flex flex-col">
      {items.map((item) => (
        <li key={item.name} className="flex flex-wrap items-baseline justify-between gap-x-1 border-b border-white/6 py-[2px] text-[9px] text-[#C7B8A8] sm:py-[3px] sm:text-[11px] lg:py-1 lg:text-sm">
          <span className="min-w-0 flex-1 break-words">{item.name}</span>
          <span className="shrink-0 font-bold text-white">{item.price}</span>
        </li>
      ))}
    </ul>
  )
}


function DrinkSection() {
  return (
    <section id="drinks" className="bg-black px-3 py-8 sm:px-6 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">

        {/* DRINKS title */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }} className="mb-6 text-center sm:mb-12">
          <h2 className="font-serif text-4xl font-black uppercase leading-none tracking-widest text-white sm:text-7xl lg:text-9xl">
            DRINKS
          </h2>
          <div className="mx-auto mt-1.5 h-[3px] w-14 bg-white sm:mt-3 sm:w-24" />
        </motion.div>

        {/* 3-column layout — 2 col mobile (cols 1+2), 3 col sm+ */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-8">

          {/* ── COL 1: Juices, Soft Drinks, Draught Beer ── */}
          <div className="flex flex-col gap-4 sm:gap-5">

            {/* Fresh Juices */}
            <div>
              <DrinkCategoryHeader title="Fresh Juices" />
              <div className="relative mt-1.5 h-20 w-full overflow-hidden sm:h-32 lg:h-44">
                <Image src="https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=85" alt="Fresh juices" fill sizes="400px" className="object-cover" />
              </div>
              <DrinkSubHeader title="Best-Sellers" />
              <DrinkList items={[
                { name: 'Apple Orange', price: '$3.00' },
                { name: 'Pineapple Carrot', price: '$3.00' },
                { name: 'Fresh Watermelon', price: '$2.50' },
                { name: 'Orange Carrot', price: '$3.00' },
                { name: 'Passion Soda', price: '$3.00' },
                { name: 'Passion Juice', price: '$3.00' },
                { name: 'Lime Soda', price: '$3.00' },
                { name: 'Lime Juice', price: '$2.50' },
                { name: 'Iced Lemon Tea', price: '$2.50' },
              ]} />
            </div>

            {/* Soft Drinks */}
            <div>
              <DrinkCategoryHeader title="Soft Drinks" />
              <div className="relative mt-1.5 h-16 w-full overflow-hidden sm:h-24 lg:h-32">
                <Image src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=85" alt="Soft drinks" fill sizes="400px" className="object-cover" />
              </div>
              <DrinkList items={[
                { name: 'Coke', price: '$2.00' },
                { name: 'Coca Light', price: '$2.00' },
                { name: 'Fanta Orange', price: '$1.75' },
                { name: 'Sprite', price: '$1.75' },
                { name: 'Schweppers Ginger Ale', price: '$2.00' },
                { name: 'Schweeppers Soda Water', price: '$2.00' },
                { name: 'Schweeppers Lemon', price: '$2.00' },
              ]} />
            </div>

            {/* Draught Beer */}
            <div>
              <DrinkCategoryHeader title="Draught Beer" />
              <div className="relative mt-1.5 h-20 w-full overflow-hidden sm:h-28 lg:h-36">
                <Image src="https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=85" alt="Draught beer" fill sizes="400px" className="object-cover" />
              </div>
              <DrinkList items={[
                { name: 'Angkor Draught 3L (Tower)', price: '$15.00' },
                { name: 'Angkor Draught 2.0L (Tower)', price: '$10.00' },
                { name: 'Angkor Pint 330ml', price: '$2.00' },
              ]} />
            </div>

            {/* Wine image fills remaining height on mobile — moved from Wines section */}
            <div className="relative min-h-0 flex-1 overflow-hidden sm:hidden">
              <Image src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=85" alt="Wines" fill sizes="200px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <p className="absolute bottom-2 left-0 right-0 text-center text-[8px] font-black uppercase tracking-[0.2em] text-white">Wines</p>
            </div>
          </div>

          {/* ── COL 2: Water, Whiskey, Beers ── */}
          <div className="flex flex-col gap-4 sm:gap-5">

            {/* Water */}
            <div>
              <DrinkCategoryHeader title="Water" />
              <div className="relative mt-1.5 h-20 w-full overflow-hidden sm:h-28 lg:h-36">
                <Image src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=600&q=85" alt="Water bottles" fill sizes="400px" className="object-cover" />
              </div>
              <DrinkSubHeader title="Sparkling / Mineral" />
              <DrinkList items={[
                { name: 'Dasani 500ml', price: '$1.50' },
                { name: 'Dasani 1.5L', price: '$3.50' },
                { name: 'Kulen 500ml', price: '$2.00' },
                { name: 'Kulen 1.5L', price: '$4.50' },
                { name: 'Sparkling Voss 700ml', price: '$6.00' },
              ]} />
            </div>

            {/* Whiskey */}
            <div>
              <DrinkCategoryHeader title="Whiskey" />
              <div className="relative mt-1.5 h-20 w-full overflow-hidden sm:h-28 lg:h-36">
                <Image src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=85" alt="Whiskey" fill sizes="400px" className="object-cover" />
              </div>
              <DrinkSubHeader title="Scotch / Single Malt" />
              <DrinkList items={[
                { name: 'Auchentoshan Three Wood 700ml', price: '$70.00' },
                { name: 'The Glenlivet 15Yrs 700ml', price: '$85.00' },
                { name: 'Johnnie Walker 18Yrs 750ml', price: '$95.00' },
                { name: 'Johnnie Walker XR 21Yrs 750ml', price: '$140.00' },
                { name: "Dewar's 15Yrs 1L", price: '$75.00' },
                { name: "Dewar's 15Yrs 700ml", price: '$60.00' },
                { name: 'Glenfiddich Single Malt 15Yrs', price: '$70.00' },
                { name: 'Chivas Regal 18Yrs 1L', price: '$85.00' },
                { name: 'Royal Salute 21Yrs 1L', price: '$170.00' },
              ]} />
              <DrinkSubHeader title="By Glass" />
              <DrinkList items={[
                { name: "Dewar's 12 YO", price: '$3.90' },
                { name: 'Glendfiddich 12 YO', price: '$3.90' },
              ]} />
            </div>

            {/* Beers */}
            <div>
              <DrinkCategoryHeader title="Beers" />
              <div className="relative mt-1.5 h-16 w-full overflow-hidden sm:h-24 lg:h-32">
                <Image src="https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=600&q=85" alt="Beers" fill sizes="400px" className="object-cover" />
              </div>
              <DrinkList items={[
                { name: 'Corona', price: '$3.50' },
                { name: 'Hoegaarden', price: '$3.50' },
                { name: 'Angkor', price: '$3.00' },
                { name: 'ABC', price: '$3.75' },
                { name: 'Hanuman', price: '$3.00' },
                { name: 'Heineken', price: '$3.50' },
                { name: 'Tiger Cristal', price: '$3.00' },
                { name: 'Cambodia', price: '$3.00' },
              ]} />
            </div>
          </div>

          {/* ── COL 3: Wines | House Wine + Cocktails — spans full width on mobile, split 2-col internally ── */}
          <div className="col-span-2 sm:col-span-1">
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:gap-5">

              {/* Wines */}
              <div>
                <DrinkCategoryHeader title="Wines" />
                <div className="relative mt-1.5 hidden h-20 w-full overflow-hidden sm:block sm:h-28 lg:h-36">
                  <Image src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=85" alt="Wine bottles" fill sizes="400px" className="object-cover" />
                </div>
                <DrinkSubHeader title="Australia" />
                <DrinkList items={[
                  { name: 'Penfolds Bin 2 Shiraz Mouvedre', price: '$45.00' },
                  { name: "Penfold Max's C. Sauvignon", price: '$38.00' },
                  { name: 'Penfold Bin 8 Cabernet Shiraz', price: '$49.00' },
                ]} />
                <DrinkSubHeader title="France" />
                <DrinkList items={[
                  { name: 'Chateau Haut Veyrac Saint Emilion', price: '$38.90' },
                  { name: 'Chateau Grand Verdus Sauvignon', price: '$30.00' },
                  { name: 'Louis Eschenauer C. Sauvignon', price: '$25.50' },
                  { name: 'Esprit De Pavie', price: '$45.00' },
                ]} />
                <DrinkSubHeader title="Argentina" />
                <DrinkList items={[
                  { name: 'Argento Estate Reserve Malbec', price: '$35.00' },
                  { name: 'Argento Finca Altamira Malbec', price: '$46.00' },
                ]} />
                <DrinkSubHeader title="Chile" />
                <DrinkList items={[
                  { name: 'Marques Casa Concha C.Sauvignon', price: '$42.00' },
                  { name: 'Frontera C. Sauvignon', price: '$25.00' },
                  { name: 'Frontera Merlot', price: '$25.00' },
                  { name: 'Santa Alicia Sauvignon', price: '$25.00' },
                ]} />
              </div>

              {/* House Wine + Cocktails */}
              <div className="flex flex-col gap-4 sm:gap-5">

                {/* House Wine */}
                <div>
                  <DrinkCategoryHeader title="House Wine" />
                  <DrinkSubHeader title="By Glass" />
                  <DrinkList items={[
                    { name: 'Frontera C. Sauvignon Chile', price: '$4.00' },
                  ]} />
                </div>

                {/* Cocktails */}
                <div>
                  <DrinkCategoryHeader title="Cocktails" />
                  <div className="relative mt-1.5 h-20 w-full overflow-hidden sm:h-28 lg:h-36">
                    <Image src="https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=85" alt="Cocktails" fill sizes="400px" className="object-cover" />
                  </div>
                  <DrinkList items={[
                    { name: 'Brazilian Caipirinha', price: '$4.00' },
                    { name: 'Blue Margarita', price: '$3.50' },
                    { name: 'Pina Colada', price: '$3.50' },
                    { name: 'Singapore Sling', price: '$3.50' },
                    { name: 'Mojito', price: '$3.50' },
                  ]} />
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Contact */}
        <div className="mt-12 flex items-center justify-center gap-3 text-center text-[#C7B8A8]">
          <i className="fa-solid fa-phone text-[#fd850b]" aria-hidden="true" />
          <span className="font-bold tracking-widest">023 218 211</span>
        </div>
      </div>
    </section>
  )
}

export default function MenuPage() {
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO)
  const [alacarteItems, setAlacarteItems] = useState(menuSections[0].items)
  const [grillItems, setGrillItems] = useState(menuSections[1].items)

  useEffect(() => {
    fetch('/api/admin/page-images')
      .then(r => r.json())
      .then(d => { if (d.menuHero) setHeroImage(d.menuHero) })
      .catch(() => {})
    fetch('/api/admin/menu-items')
      .then(r => r.json())
      .then(d => {
        if (d.alacarte?.length) setAlacarteItems(d.alacarte)
        if (d.grillCuts?.length) setGrillItems(d.grillCuts)
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <Header />
      <main className="bg-[#120807] text-[#FFF7ED]">

        {/* Hero */}
        <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden px-5 py-28 text-center sm:px-8 lg:px-10">
          <Image src={heroImage} alt="Brazilian BBQ menu hero" fill priority sizes="100vw" className="object-cover" unoptimized={!heroImage.includes('unsplash.com')} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,8,7,0.92),rgba(18,8,7,0.5),rgba(18,8,7,0.92))]" />
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.8 }} className="relative z-10 mx-auto max-w-4xl pt-16">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-[#fd850b]">Bravo Menu</p>
            <h1 className="font-serif text-4xl font-black leading-tight sm:text-6xl lg:text-8xl">Buffet, Grill & À La Carte</h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-[#FCE7D3]">Premium Brazilian BBQ packages, individual plates, and drinks — all in one place.</p>
          </motion.div>
        </section>

        {/* BUFFET */}
        <section id="buffet" className="bg-[#120807] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }} className="mx-auto mb-14 max-w-3xl text-center">
              <div className="mb-5 flex items-center justify-center gap-4">
                <div className="h-px w-16 bg-[#fd850b]/40 sm:w-28" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fd850b] sm:text-xs">Signature Service</span>
                <div className="h-px w-16 bg-[#fd850b]/40 sm:w-28" />
              </div>
              <h2 className="font-serif text-5xl font-black uppercase leading-none text-white sm:text-7xl lg:text-[7rem]">
                Menu Buffet
              </h2>
              <p className="-mt-2 font-serif text-4xl font-black uppercase leading-none text-[#fd850b] sm:-mt-3 sm:text-6xl lg:text-7xl">
                &amp; Grill
              </p>
              <p className="mt-6 text-base leading-7 text-[#C7B8A8] sm:text-lg sm:leading-8">Unlimited buffet sides with your choice of fire-grilled cuts.</p>
            </motion.div>

            {/* Lunch */}
            <div className="mb-14">
              <div className="mb-8 overflow-hidden rounded-lg border border-[#fd850b]/30 bg-[#fd850b]/10">
                <div className="flex flex-col items-center gap-1 px-6 py-4 text-center sm:flex-row sm:justify-between sm:text-left">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#fd850b]">Lunch Buffet</p>
                    <p className="mt-1 text-sm font-black text-[#FFF7ED] sm:text-xl">
                      Weekdays 11:00 AM – 2:30 PM
                      <span className="block sm:inline sm:before:content-['_·_']">Weekends 11:30 AM – 3:00 PM</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[#C7B8A8]">
                    <i className="fa-solid fa-sun text-[#fd850b]" aria-hidden="true" />
                    <span className="text-sm font-bold">Midday service</span>
                  </div>
                </div>
              </div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }} className={styles.buffetGrid}>
                {lunchPackages.map((pkg) => <BuffetPackageCard key={pkg.name} pkg={pkg} />)}
              </motion.div>
            </div>

            {/* Dinner */}
            <div>
              <div className="mb-8 overflow-hidden rounded-lg border border-[#fd850b]/30 bg-[#fd850b]/10">
                <div className="flex flex-col items-center gap-1 px-6 py-4 text-center sm:flex-row sm:justify-between sm:text-left">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-[#fd850b]">Dinner Buffet</p>
                    <p className="mt-1 text-lg font-black text-[#FFF7ED] sm:text-xl">Daily 5:30 PM – 10:30 PM</p>
                  </div>
                  <div className="flex items-center gap-2 text-[#C7B8A8]">
                    <i className="fa-solid fa-moon text-[#fd850b]" aria-hidden="true" />
                    <span className="text-sm font-bold">Evening service</span>
                  </div>
                </div>
              </div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.6 }} className={styles.buffetGrid}>
                {dinnerPackages.map((pkg) => <BuffetPackageCard key={pkg.name} pkg={pkg} />)}
              </motion.div>
            </div>
          </div>
        </section>

        {/* À LA CARTE */}
        <AlaCarteSection section={{ ...menuSections[0], items: alacarteItems }} />

        {/* GRILL CUTS */}
        <section id="grill" className="bg-[#120807] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }} className="mx-auto mb-12 max-w-3xl text-center">
              <div className="mb-5 flex items-center justify-center gap-4">
                <div className="h-px w-16 bg-[#fd850b]/40 sm:w-28" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fd850b] sm:text-xs">{menuSections[1].eyebrow}</span>
                <div className="h-px w-16 bg-[#fd850b]/40 sm:w-28" />
              </div>
              <h2 className="font-serif text-5xl font-black uppercase leading-none text-white sm:text-7xl lg:text-[7rem]">
                {menuSections[1].title}
              </h2>
              <p className="mt-6 text-base leading-7 text-[#C7B8A8] sm:text-lg sm:leading-8">{menuSections[1].description}</p>
            </motion.div>
            <div className="grid grid-cols-4 gap-0.5 sm:gap-1">
              {grillItems.map((item) => <GrillCard key={item.name} item={item} />)}
            </div>
          </div>
        </section>

        {/* DRINKS */}
        <DrinkSection />

        {/* CTA */}
        <section className="relative overflow-hidden border-y border-[#D4A373]/18 px-4 py-10 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <Image src={heroImage} alt="" fill sizes="100vw" className="object-cover opacity-24" aria-hidden="true" unoptimized={!heroImage.includes('unsplash.com')} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,8,7,0.98)_0%,rgba(18,8,7,0.86)_52%,rgba(18,8,7,0.7)_100%)]" />
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }} className="relative z-10 mx-auto grid max-w-6xl items-center gap-5 sm:gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <p className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#fd850b] sm:mb-4 sm:text-xs">Book Bravo</p>
              <h2 className="font-serif text-[1.9rem] font-black uppercase leading-[0.95] sm:text-5xl lg:text-6xl">Ready to taste the fire?</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#f4d8c5] sm:mt-5 sm:text-lg sm:leading-8">Save your table for buffet service, à la carte plates, and a full Brazilian steakhouse night in Phnom Penh.</p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:gap-3 lg:flex-col lg:items-stretch">
              <Link href="/contact#reservation" className="inline-flex min-h-10 items-center justify-center gap-2 bg-[#fd850b] px-4 py-2 text-[0.72rem] font-black uppercase tracking-[0.12em] text-[#120807] shadow-[0_18px_44px_rgba(253,133,11,0.32)] transition duration-300 hover:-translate-y-1 sm:min-h-14 sm:px-7 sm:py-4 sm:text-sm">
                <i className="fa-solid fa-calendar-check" aria-hidden="true" />
                Book a Table
              </Link>
              <Link href="/contact" className="inline-flex min-h-10 items-center justify-center gap-2 border border-[#FFF7ED]/42 bg-black/20 px-4 py-2 text-[0.72rem] font-black uppercase tracking-[0.12em] text-[#FFF7ED] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#fd850b] hover:bg-[#fd850b] hover:text-[#120807] sm:min-h-14 sm:px-7 sm:py-4 sm:text-sm">
                <i className="fa-solid fa-location-dot" aria-hidden="true" />
                Visit Us
              </Link>
            </div>
          </motion.div>
          <div className="relative z-10 mx-auto mt-6 grid max-w-6xl gap-2 sm:mt-9 sm:gap-3 sm:grid-cols-3">
            {menuCtaHighlights.map((item) => (
              <div key={item.label} className="border border-[#D4A373]/18 bg-[#FFF7ED]/7 px-4 py-3 backdrop-blur sm:px-5 sm:py-4">
                <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#fd850b] sm:text-xs">{item.label}</p>
                <p className="mt-1 text-[0.8rem] font-bold leading-5 text-[#FFF7ED] sm:mt-2 sm:text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
