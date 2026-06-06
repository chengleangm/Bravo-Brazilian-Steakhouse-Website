'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const dishes = [
  {
    title: 'Brazilian BBQ Buffet',
    description: 'Fire-roasted meats, hot sides, salads, sauces, and live grill carving.',
    price: '$18.90',
    image:
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=90',
  },
  {
    title: 'Churrasco Beef Steak',
    description: 'Juicy beef grilled over high heat and finished with coarse salt.',
    price: '$14.90',
    image:
      'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=90',
  },
  {
    title: 'Grilled Chicken',
    description: 'Marinated chicken with golden char, smoked herbs, and citrus.',
    price: '$9.90',
    image:
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=90',
  },
  {
    title: 'Pork Ribs',
    description: 'Tender ribs glazed with Brazilian spices and caramelized edges.',
    price: '$12.90',
    image:
      'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=90',
  },
]

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

export function Dishes() {
  return (
    <section
      id="dishes"
      className="bg-[#160b08] px-5 py-20 text-[#FFF7ED] sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-4 text-xs font-black uppercase text-[#fd850b]">
            Popular Plates
          </p>
          <h2 className="font-serif text-5xl uppercase leading-[0.88] sm:text-6xl lg:text-7xl">
            Dishes that keep guests coming back
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {dishes.map((dish) => (
            <motion.article
              key={dish.title}
              variants={item}
              transition={{ duration: 0.58 }}
              className="group flex h-full flex-col overflow-hidden bg-[#261712] shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_90px_rgba(253,133,11,0.16)]"
            >
              <div className="relative h-48 overflow-hidden sm:h-52">
                <Image
                  src={dish.image}
                  alt={dish.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#261712]/70 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-3xl uppercase leading-[0.9] text-[#FFF7ED]">
                  {dish.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#C7B8A8]">
                  {dish.description}
                </p>
                <div className="mt-auto pt-6">
                  <span className="block text-base font-black text-[#ffd029]">
                    {dish.price}
                  </span>
                  <Link
                    href="/menu"
                    aria-label={`View ${dish.title} on the menu`}
                    className="mt-4 inline-flex min-h-10 items-center justify-center bg-[#fd850b] px-4 py-2 text-xs font-black uppercase text-black transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(253,133,11,0.42)]"
                  >
                    See more detail
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
