'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const DEFAULT_BG = 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=2000&q=90'

const reviews = [
  { name: 'David & Patti Ens', stars: 5, badge: 'Local Guide', quote: "I wanted Brazilian BBQ for my birthday and found Bravo on Street 155. If it's your birth month, you only pay half — called everyone and we had a fantastic time!" },
  { name: 'Äm Koo', stars: 5, badge: 'Local Guide', quote: 'If you ever want to eat a lot of super delicious meat, this is the place. All 8 types of meat were so delicious I was just speechless. 5/5 place, go give a try!' },
  { name: 'Jenta Hing', stars: 5, badge: 'Local Guide', quote: "When a place is so good you come back twice in one day. The vibe, service, and food were all top-notch. Highly recommended and can't wait to come back!" },
  { name: 'Lucas Melo de Freitas', stars: 5, badge: 'Google Review', quote: 'I am Brazilian and have been traveling in Asia for almost 3 years. This is certainly one of my favorite places — I managed to kill my homesickness.' },
  { name: 'Felipe Cattaneo', stars: 5, badge: 'Google Review', quote: 'Brazilian barbecue that made me feel right at home. The grill master Marcos is very talented. If you want good food at an affordable price, this is your restaurant!' },
  { name: 'Alessandro De Socio', stars: 5, badge: 'Local Guide', quote: "I'm glad I picked this place for lunch. There's a great variety of meats, all flavourful and well prepared. Service is swift. Definitely recommended." },
  { name: 'Kim Dan', stars: 5, badge: 'Local Guide', quote: 'Everything is good including service and food. We really enjoyed it and will go again soon. My wife especially loved the beef!' },
  { name: 'Paul Acosta', stars: 5, badge: 'Google Review', quote: 'A truly exceptional experience. The steak was cooked to perfection with a beautiful sear and juicy interior. The quality of the meat was outstanding.' },
  { name: 'Edward Lai', stars: 5, badge: 'Local Guide', quote: 'Awesome Brazilian steakhouse. Favorites were the garlic steak and the char siu pork! They also have a chocolate fountain.' },
  { name: 'Ricardo Glenn', stars: 4, badge: 'Local Guide', quote: 'Food was good, very good service. After asking for the bill they even brought pan de queijo and passion fruit dessert — great value for money.' },
  { name: 'Sanafa Sink', stars: 5, badge: 'Local Guide', quote: 'The $22 & $29 sets were super-value. We live 3 minutes away and will definitely be back for a quick lunch — totally worth it!' },
  { name: 'C', stars: 5, badge: 'Local Guide', quote: "This is the second day I've been here and the food is delicious and well priced. The owner is very friendly and so are all the employees. Bom Apetite!" },
  { name: 'Sea Lion', stars: 4, badge: 'Local Guide', quote: "I was quite skeptical when I entered, but the food at the buffet is actually quite good. Not that many choices, but it's enough — and it's great!" },
  { name: 'Swen Romijn', stars: 4, badge: 'Local Guide', quote: 'Food is good. They serve barbecue food at your table and come often with new meat each time. The meat is very delicious, especially the duck.' },
  { name: 'Sovanchann Ney', stars: 5, badge: 'Local Guide', quote: 'Everything here was delicious. Price is reasonable too.' },
  { name: 'Donnys Away', stars: 5, badge: 'Google Review', quote: "The beef, chicken, and fish were cooked very well, seasoned exactly as you'd expect from a traditional recipe. Staff were very attentive and friendly." },
  { name: '김현진', stars: 5, badge: 'Local Guide', quote: 'This is already my fifth visit. The staff and the owner couple are so friendly. The wine is cheap, and they even give a 20% discount if you make a reservation.' },
  { name: 'Dmitry Music', stars: 5, badge: 'Local Guide', quote: 'It was my first time at a Brazilian buffet restaurant. The atmosphere and service were fantastic. Everything was delicious, even the oysters.' },
  { name: 'Arjay Bastes', stars: 5, badge: 'Google Review', quote: 'I highly recommend this new Brazilian grill buffet in town. It compensates for its intimate atmosphere with great-tasting food and exceptional service.' },
  { name: 'Garema Srivastav', stars: 5, badge: 'Local Guide', quote: 'Great food, fantastic service! Will definitely come back!!' },
  { name: 'Mark Hanman', stars: 5, badge: 'Local Guide', quote: "My 7-year-old son is a fussy eater, but ate ample amounts. He's a certified carnivore now. Great experience for the whole family." },
  { name: 'Sanders Clardy', stars: 4, badge: 'Local Guide', quote: 'Good lunch buffet. Pork and chicken were the best. I will be back for the pork churrasco and the chicken wings.' },
  { name: 'Tim Coyle', stars: 5, badge: 'Local Guide', quote: 'Food was really good, service was good. The manager came to check on us — really appreciated that personal touch.' },
  { name: 'La Vie Est Belle', stars: 5, badge: 'Local Guide', quote: 'Great buffet with an additional BBQ. People constantly come around with large skewers and cut off bits as needed. Very reasonable prices.' },
  { name: 'Anatoli Mezker', stars: 5, badge: 'Local Guide', quote: 'A fantastic restaurant with very good prices. The steaks with a very generous side dish cost around $10 and the meat is of superb quality.' },
  { name: 'Marcos Duque', stars: 5, badge: 'Google Review', quote: 'Great quality food and a pleasant atmosphere.' },
  { name: 'Mike Elric', stars: 5, badge: 'Local Guide', quote: 'One of my favorite Brazilian steakhouses in Phnom Penh.' },
  { name: 'Ryan Gillespie', stars: 5, badge: 'Local Guide', quote: 'Good value, meat heaven.' },
  { name: 'TheChillQUEEN', stars: 4, badge: 'Local Guide', quote: 'Another good find in the TTP area. Steak was good — more options for food would be great.' },
  { name: 'Jesse A Atienza', stars: 3, badge: 'Local Guide', quote: "It's a good restaurant and I like the food. The only reason for 3 stars is that the buffet meat can be on the tougher side — but I'm sure it can be improved." },
  { name: 'Rasmey Chhim', stars: 4, badge: 'Local Guide', quote: 'Great choice for western food lovers.' },
  { name: 'Space S', stars: 3, badge: 'Local Guide', quote: "Like every Brazilian steakhouse you'll be served meat sliced from the skewer. The taste is average but the quantity is good — a solid mid-range experience." },
  { name: 'Wayne', stars: 4, badge: 'Local Guide', quote: 'Great value-for-money place for a meat fest. Room for improvement on the hygiene side.' },
]

const PER_PAGE = 3

export function Testimonials() {
  const [backgroundImage, setBackgroundImage] = useState(DEFAULT_BG)
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const totalPages = Math.ceil(reviews.length / PER_PAGE)
  const visible = reviews.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  useEffect(() => {
    fetch('/api/admin/page-images')
      .then(r => r.json())
      .then(d => { if (d.testimonialsBg) setBackgroundImage(d.testimonialsBg) })
      .catch(() => {})
  }, [])

  function prev() { setDirection(-1); setPage(p => Math.max(0, p - 1)) }
  function next() { setDirection(1); setPage(p => Math.min(totalPages - 1, p + 1)) }

  return (
    <section className="relative overflow-hidden px-4 py-10 text-[#FFF7ED] sm:px-8 sm:py-20 lg:px-10 lg:py-28">
      <Image
        src={backgroundImage}
        alt="Steak dinner plated for a celebration"
        fill
        sizes="100vw"
        className="object-cover object-center"
        unoptimized={!backgroundImage.includes('unsplash.com')}
      />
      <div className="absolute inset-0 bg-black/64" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.55),rgba(0,0,0,0.3),rgba(0,0,0,0.55))]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.68 }}
          className="mx-auto max-w-[22rem] text-center font-serif text-[2.05rem] uppercase leading-[0.9] sm:max-w-4xl sm:text-6xl lg:text-7xl"
        >
          Dinner that feels like a celebration
        </motion.h2>

        <div className="mt-7 sm:mt-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={page}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35 }}
              className="grid gap-3 sm:gap-5 md:grid-cols-3"
            >
              {visible.map((review, i) => (
                <article
                  key={i}
                  className="bg-[#f4eadb]/94 p-4 text-left text-[#180c08] shadow-[0_24px_60px_rgba(0,0,0,0.26)] sm:p-6 flex flex-col"
                >
                  <div className="mb-2 flex items-center justify-between sm:mb-3">
                    <span
                      className="text-[0.75rem] font-black text-[#fd850b] sm:text-base"
                      aria-label={`${review.stars} out of 5 stars`}
                    >
                      {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}
                    </span>
                    <span className="text-[0.58rem] font-bold uppercase tracking-wider text-[#8c7060] sm:text-[0.62rem]">
                      {review.badge}
                    </span>
                  </div>
                  <p className="flex-1 text-[0.82rem] leading-5 text-[#3c2b24] sm:text-sm sm:leading-7">
                    &quot;{review.quote}&quot;
                  </p>
                  <h3 className="mt-3 font-serif text-xl uppercase text-[#180c08] sm:mt-5 sm:text-2xl">
                    {review.name}
                  </h3>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4 sm:mt-8">
              <button
                type="button"
                onClick={prev}
                disabled={page === 0}
                aria-label="Previous reviews"
                className="flex h-10 w-10 items-center justify-center border border-[#FFF7ED]/30 text-[#FFF7ED] transition hover:border-[#fd850b] hover:text-[#fd850b] disabled:cursor-not-allowed disabled:opacity-30 sm:h-12 sm:w-12"
              >
                <i className="fa-solid fa-chevron-left text-xs" aria-hidden="true" />
              </button>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-[#FFF7ED]/70">
                {page + 1} / {totalPages}
              </span>
              <button
                type="button"
                onClick={next}
                disabled={page === totalPages - 1}
                aria-label="Next reviews"
                className="flex h-10 w-10 items-center justify-center border border-[#FFF7ED]/30 text-[#FFF7ED] transition hover:border-[#fd850b] hover:text-[#fd850b] disabled:cursor-not-allowed disabled:opacity-30 sm:h-12 sm:w-12"
              >
                <i className="fa-solid fa-chevron-right text-xs" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
