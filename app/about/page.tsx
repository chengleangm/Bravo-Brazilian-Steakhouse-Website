'use client'

import Link from 'next/link'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Chef Carlos',
    title: 'Head Chef',
    description: '30 years grilling meat in São Paulo and Phnom Penh.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 2,
    name: 'Maria Santos',
    title: 'Service Director',
    description: 'Brazilian hospitality expert with a passion for guest care.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 3,
    name: 'David Meng',
    title: 'Restaurant Manager',
    description: 'Bridging Brazilian and Cambodian dining cultures.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
  },
]

const ABOUT_CTA_HIGHLIGHTS = [
  'Brazilian grill tradition',
  'Warm Phnom Penh hospitality',
  'Built for groups and celebrations',
]

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85')] pt-32 pb-16 px-5 text-center text-white" style={{backgroundAttachment: 'fixed'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/70"></div>
          <div className="relative z-10">
            <h1 className="font-black text-8xl md:text-9xl uppercase leading-none drop-shadow-lg">ABOUT BRAVO</h1>
            <p className="text-white/90 text-xl mt-6">Our story, our team, our mission</p>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-cream text-dark py-28 px-5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-orange font-black text-xs uppercase tracking-widest mb-3">Our Journey</p>
              <h2 className="font-black text-5xl md:text-6xl uppercase leading-tight">THE BRAVO STORY</h2>
              <p className="mt-8 text-lg opacity-90 leading-relaxed">
                BRAVO Brazilian Steakhouse was born from a simple dream: to bring the joy and generosity of a real São Paulo churrascaria to Phnom Penh.
              </p>
              <p className="mt-4 text-lg opacity-90 leading-relaxed">
                Our founder, a lifelong lover of Brazilian culture, assembled a team of seasoned grill masters and hospitality experts who share a passion for fire, meat, and gathering. Every day, we celebrate the rhythm of churrasco: slow flames, caramelized edges, and tables full of guests who leave happy.
              </p>
            </div>
            <div className="h-96 overflow-hidden rounded shadow-custom">
              <img
                src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=80"
                alt="Brazilian steakhouse dining"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* What is Churrascaria */}
        <section id="churrascaria" className="bg-dark text-cream py-28 px-5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="h-96 overflow-hidden rounded shadow-custom order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1702741168115-cd3d9a682972?auto=format&fit=crop&w=1200&q=85"
                alt="Churrasco grilling"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <p className="text-orange font-black text-xs uppercase tracking-widest mb-3">Brazilian Tradition</p>
              <h2 className="font-black text-5xl uppercase leading-tight">WHAT IS CHURRASCARIA?</h2>
              <p className="mt-8 text-lg opacity-90 leading-relaxed">
                Churrascaria is more than a meal. It is a celebration of fire, meat, and community. Servers roam the table with skewers of grilled meats—beef, lamb, pork, and chicken—and slice portions directly onto diners' plates.
              </p>
              <p className="mt-4 text-lg opacity-90 leading-relaxed">
                Between cuts, diners enjoy fresh salads, hot sides, and sauces from a full buffet. The pace is relaxed, the portions are generous, and the conversation flows as long as you want to eat.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="bg-cream text-dark py-28 px-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-orange font-black text-xs uppercase tracking-widest mb-3">Our Foundation</p>
              <h2 className="font-black text-5xl uppercase leading-tight">MISSION & VALUES</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 flex items-center justify-center bg-orange/20 rounded-full mb-4">
                  <i className="fa-solid fa-fire-flame-curved text-orange text-2xl"></i>
                </div>
                <h3 className="font-black text-2xl mb-3">Our Mission</h3>
                <p className="opacity-90">To serve authentic Brazilian churrasco with warmth, skill, and the generosity that defines community dining at its best.</p>
              </div>
              <div className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 flex items-center justify-center bg-orange/20 rounded-full mb-4">
                  <i className="fa-solid fa-heart text-orange text-2xl"></i>
                </div>
                <h3 className="font-black text-2xl mb-3">Craft & Passion</h3>
                <p className="opacity-90">Every cut is seasoned with care. Every flame is tended with patience. Every plate reflects our commitment to excellence.</p>
              </div>
              <div className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 flex items-center justify-center bg-orange/20 rounded-full mb-4">
                  <i className="fa-solid fa-handshake text-orange text-2xl"></i>
                </div>
                <h3 className="font-black text-2xl mb-3">Hospitality First</h3>
                <p className="opacity-90">Your comfort and happiness matter more than speed. We listen, we adapt, and we go the extra mile.</p>
              </div>
              <div className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 flex items-center justify-center bg-orange/20 rounded-full mb-4">
                  <i className="fa-solid fa-check-circle text-orange text-2xl"></i>
                </div>
                <h3 className="font-black text-2xl mb-3">Consistency</h3>
                <p className="opacity-90">Rain or shine, lunch or dinner, you can count on BRAVO to deliver the same quality and warmth every single visit.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-dark text-cream py-28 px-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-orange font-black text-xs uppercase tracking-widest mb-3">What Sets Us Apart</p>
              <h2 className="font-black text-5xl uppercase leading-tight">WHY CHOOSE BRAVO</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 flex items-center justify-center bg-yellow/20 rounded-full mb-4">
                  <i className="fa-solid fa-globe text-yellow text-2xl"></i>
                </div>
                <h3 className="font-black text-2xl mb-3">Authentic Brazilian</h3>
                <p className="opacity-90">Our chefs are Brazilian trained. Our methods are time-honoured. Our passion is genuine.</p>
              </div>
              <div className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 flex items-center justify-center bg-yellow/20 rounded-full mb-4">
                  <i className="fa-solid fa-leaf text-yellow text-2xl"></i>
                </div>
                <h3 className="font-black text-2xl mb-3">Fresh Ingredients</h3>
                <p className="opacity-90">Premium meats, fresh vegetables, and quality sides sourced daily for optimal taste and quality.</p>
              </div>
              <div className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 flex items-center justify-center bg-yellow/20 rounded-full mb-4">
                  <i className="fa-solid fa-users text-yellow text-2xl"></i>
                </div>
                <h3 className="font-black text-2xl mb-3">Family Friendly</h3>
                <p className="opacity-90">Welcoming to all ages, we host celebrations, quiet dinners, and joyful group gatherings every night.</p>
              </div>
              <div className="bg-white/6 border border-white/9 shadow-custom p-7 rounded hover:shadow-2xl hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 flex items-center justify-center bg-yellow/20 rounded-full mb-4">
                  <i className="fa-solid fa-sun text-yellow text-2xl"></i>
                </div>
                <h3 className="font-black text-2xl mb-3">Warm Atmosphere</h3>
                <p className="opacity-90">Our dining room is built for laughter, connection, and the kind of memories that last.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Chef & Team */}
        <section className="bg-cream text-dark py-28 px-5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-orange font-black text-xs uppercase tracking-widest mb-3">Meet the Team</p>
              <h2 className="font-black text-5xl uppercase leading-tight">CRAFTED BY PASSIONATE PEOPLE</h2>
              <p className="mt-8 text-lg opacity-90 leading-relaxed">
                Our team brings together Brazilian grill masters, attentive servers, and hospitality leaders who share one goal: to make your dining experience unforgettable.
              </p>
              <p className="mt-4 text-lg opacity-90 leading-relaxed">
                Every role matters. From the chef tending the flames to the server attentive at your table, BRAVO is a team effort built on care and craftsmanship.
              </p>
            </div>
            <div className="h-96 overflow-hidden rounded shadow-custom">
              <img
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=700&q=80"
                alt="BRAVO team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="bg-dark text-cream py-28 px-5">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10">
              {TEAM_MEMBERS.map(member => (
                <div key={member.id} className="bg-white/6 border border-white/9 shadow-custom overflow-hidden rounded hover:shadow-2xl hover:-translate-y-2 transition-all">
                  <img src={member.image} alt={member.name} className="w-full h-80 object-cover" />
                  <div className="p-7">
                    <h3 className="font-black text-2xl mb-1">{member.name}</h3>
                    <p className="text-orange font-black uppercase text-xs tracking-widest mb-4">
                      {member.title}
                    </p>
                    <p className="text-cream/80">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden border-y border-[#D4A373]/18 bg-[#120807] px-5 py-16 text-cream sm:px-8 lg:px-10 lg:py-20">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-24"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,8,7,0.98)_0%,rgba(18,8,7,0.88)_48%,rgba(18,8,7,0.68)_100%)]" />

          <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#fd850b]">
                Visit Bravo
              </p>
              <h2 className="font-black text-5xl uppercase leading-[0.92] md:text-6xl">
                Experience the Bravo difference
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#f4d8c5] sm:text-lg">
                Come for the fire-grilled cuts, stay for the service, sides, and
                celebration-style Brazilian steakhouse atmosphere.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/contact#reservation"
                className="inline-flex min-h-14 items-center justify-center gap-2 bg-[#fd850b] px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-[#120807] shadow-[0_18px_44px_rgba(253,133,11,0.32)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(253,133,11,0.5)]"
              >
                <i className="fa-solid fa-calendar-check" aria-hidden="true"></i>
                Book a Table
              </Link>
              <Link
                href="/menu"
                className="inline-flex min-h-14 items-center justify-center gap-2 border border-[#FFF7ED]/42 bg-black/20 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-[#FFF7ED] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#fd850b] hover:bg-[#fd850b] hover:text-[#120807]"
              >
                <i className="fa-solid fa-utensils" aria-hidden="true"></i>
                View Menu
              </Link>
            </div>
          </div>

          <div className="relative z-10 mx-auto mt-9 grid max-w-6xl gap-3 md:grid-cols-3">
            {ABOUT_CTA_HIGHLIGHTS.map((item) => (
              <div
                key={item}
                className="border border-[#D4A373]/18 bg-[#FFF7ED]/7 px-5 py-4 backdrop-blur"
              >
                <p className="text-sm font-black uppercase tracking-[0.12em] text-[#FFF7ED]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
