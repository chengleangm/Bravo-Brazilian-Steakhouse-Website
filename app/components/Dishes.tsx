'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const DEFAULT_DISHES = [
  { title: 'Steak Mayo', description: 'White rice, mayonnaise salad & fries.', price: '$10.95', image: '/img/Bestdishes/Steak_Mayo.png' },
  { title: 'Bravo Steak Brazil', description: 'White rice, pinto beans, fried egg, tomatoes and fries.', price: '$11.95', image: '/img/Bestdishes/Bravo_steak_Brazil.png' },
  { title: 'Steak Pepper', description: 'Topped with sauce, beans, couscous, salad & fries.', price: '$11.95', image: '/img/Bestdishes/Steak pepper.png' },
  { title: 'Garlic Rumpsteak', description: 'White rice, salsa sauce, salad & fries.', price: '$12.95', image: '/img/Bestdishes/Garlic Rumpsteak.png' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }
const DEFAULT_TEXT = {
  kicker: 'Popular Plates',
  title: 'Dishes that keep guests coming back',
}

export function Dishes() {
  const [dishes, setDishes] = useState(DEFAULT_DISHES)
  const [text, setText] = useState(DEFAULT_TEXT)

  useEffect(() => {
    fetch('/api/admin/site-images')
      .then(r => r.json())
      .then(data => { if (data.dishes?.length) setDishes(data.dishes) })
      .catch(() => {})
    fetch('/api/admin/home-sections')
      .then(r => r.json())
      .then(data => setText(prev => ({ ...prev, ...data.dishes })))
      .catch(() => {})
  }, [])

  return (
    <section id="dishes" className="bg-[#160b08] px-3 py-10 text-[#FFF7ED] sm:px-8 sm:py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#fd850b] sm:mb-4 sm:text-xs sm:tracking-normal">{text.kicker}</p>
          <h2 className="font-serif text-2xl uppercase leading-[0.88] sm:text-4xl lg:text-5xl">{text.title}</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-7 grid grid-cols-2 gap-2 sm:mt-12 sm:gap-5 lg:grid-cols-4"
        >
          {dishes.map((dish) => (
            <motion.article
              key={dish.title}
              variants={item}
              transition={{ duration: 0.58 }}
              className="group flex h-full min-w-0 flex-col overflow-hidden bg-[#261712] shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_90px_rgba(253,133,11,0.16)]"
            >
              <div className="relative h-28 overflow-hidden sm:h-52">
                <Image
                  src={dish.image}
                  alt={dish.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.05]"
                  unoptimized={dish.image.startsWith('/uploads')}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#261712]/70 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-2.5 sm:p-5">
                <h3 className="font-serif text-[0.75rem] uppercase leading-tight text-[#FFF7ED] sm:text-3xl sm:leading-[0.9]">{dish.title}</h3>
                <p className="hidden sm:mt-3 sm:block sm:text-sm sm:leading-6 sm:text-[#C7B8A8]">{dish.description}</p>
                <div className="mt-auto pt-2 sm:pt-6">
                  <span className="block text-xs font-black text-[#ffd029] sm:text-base">{dish.price}</span>
                  <Link href="/menu" aria-label={`View ${dish.title} on the menu`} className="mt-1.5 inline-flex w-full items-center justify-center bg-[#fd850b] px-2 py-1.5 text-center text-[0.6rem] font-black uppercase leading-none text-black transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(253,133,11,0.42)] sm:mt-4 sm:min-h-10 sm:w-auto sm:px-4 sm:text-xs">
                    View
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
