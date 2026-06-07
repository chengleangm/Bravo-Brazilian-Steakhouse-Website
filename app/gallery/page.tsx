'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import styles from './page.module.css'

type GalleryCategory = 'all' | 'food' | 'grill' | 'interior' | 'events'

type GalleryImage = {
  id: number
  src: string
  category: Exclude<GalleryCategory, 'all'>
  alt: string
  featured?: boolean
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1000&q=90',
    category: 'food',
    alt: 'Brazilian BBQ steak platter',
    featured: true,
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=90',
    category: 'grill',
    alt: 'Skewers of grilled meat',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=90',
    category: 'food',
    alt: 'Brazilian buffet dishes',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=90',
    category: 'interior',
    alt: 'Warm steakhouse dining room',
    featured: true,
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1000&q=90',
    category: 'food',
    alt: 'Brazilian grill plate with sides',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=90',
    category: 'interior',
    alt: 'Restaurant bar seating',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1000&q=90',
    category: 'grill',
    alt: 'Charred pork ribs',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=90',
    category: 'events',
    alt: 'Guests dining together',
    featured: true,
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=90',
    category: 'food',
    alt: 'Grilled chicken served hot',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1504973960431-1c467e159aa4?auto=format&fit=crop&w=1000&q=90',
    category: 'grill',
    alt: 'Steak cooking over flame',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1000&q=90',
    category: 'interior',
    alt: 'Private dining area',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1519671282429-b44660ead0a7?auto=format&fit=crop&w=1000&q=90',
    category: 'events',
    alt: 'Celebration table setup',
  },
]

const galleryStories: {
  title: string
  copy: string
  image: string
  filter: Exclude<GalleryCategory, 'all'>
  icon: string
}[] = [
  {
    title: 'Start with the fire',
    copy: 'Churrasco cuts hit the grill hot, smoky, and ready to carve.',
    image:
      'https://images.unsplash.com/photo-1702741168115-cd3d9a682972?auto=format&fit=crop&w=1000&q=85',
    filter: 'grill',
    icon: 'fa-fire-flame-curved',
  },
  {
    title: 'Fill the table',
    copy: 'Buffet sides, sauces, salads, and grilled plates keep every guest moving.',
    image:
      'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=90',
    filter: 'food',
    icon: 'fa-utensils',
  },
  {
    title: 'Stay for the celebration',
    copy: 'Warm rooms and group tables make BRAVO feel built for gathering.',
    image:
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=90',
    filter: 'events',
    icon: 'fa-champagne-glasses',
  },
]

const filterOptions: {
  id: GalleryCategory
  label: string
  icon: string
}[] = [
  { id: 'all', label: 'All', icon: 'fa-border-all' },
  { id: 'food', label: 'Food', icon: 'fa-utensils' },
  { id: 'grill', label: 'Grill', icon: 'fa-fire-flame-curved' },
  { id: 'interior', label: 'Interior', icon: 'fa-chair' },
  { id: 'events', label: 'Events', icon: 'fa-champagne-glasses' },
]

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const filteredImages =
    activeFilter === 'all'
      ? galleryImages
      : galleryImages.filter((image) => image.category === activeFilter)

  const getFilterCount = (filter: GalleryCategory) =>
    filter === 'all'
      ? galleryImages.length
      : galleryImages.filter((image) => image.category === filter).length

  return (
    <>
      <Header />
      <main className="bg-[#120807] text-[#FFF7ED]">
        <section className="relative flex min-h-[62vh] items-center justify-center overflow-hidden px-5 py-28 text-center sm:px-8 lg:px-10">
          <Image
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=2000&q=90"
            alt="Bravo restaurant gallery hero"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,8,7,0.92),rgba(18,8,7,0.5),rgba(18,8,7,0.92))]" />
          <div className="relative z-10 pt-14">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-[#fd850b]">
              Gallery
            </p>
            <h1 className="font-serif text-4xl font-black leading-tight sm:text-6xl lg:text-8xl">
              Moments at BRAVO
            </h1>
          </div>
        </section>

        <section className="border-y border-[#D4A373]/18 bg-[#1A0E0A] px-3 py-8 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-6 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#fd850b] sm:mb-4 sm:text-xs sm:tracking-[0.24em]">
                A night at Bravo
              </p>
              <h2 className="font-serif text-[1.9rem] uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
                See the experience before you arrive
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-[#C7B8A8] sm:mt-5 sm:text-base sm:leading-8">
                Use these highlights as a quick path through the gallery, from
                the first flame to the final group photo.
              </p>
              <Link
                href="/contact#reservation"
                className="mt-5 inline-flex min-h-9 items-center justify-center gap-2 bg-[#fd850b] px-4 py-2 text-[0.72rem] font-black uppercase tracking-[0.12em] text-[#120807] shadow-[0_18px_42px_rgba(253,133,11,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_62px_rgba(253,133,11,0.46)] sm:mt-7 sm:min-h-12 sm:px-6 sm:py-3 sm:text-sm sm:tracking-[0.14em]"
              >
                <i className="fa-solid fa-calendar-check" aria-hidden="true" />
                Book a Table
              </Link>
            </div>

            <div className={styles.storyGrid}>
              {galleryStories.map((story) => (
                <button
                  key={story.title}
                  type="button"
                  onClick={() => setActiveFilter(story.filter)}
                  className={`${styles.storyCard} group relative overflow-hidden border border-[#D4A373]/18 bg-[#120807] text-left shadow-[0_24px_70px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-2 hover:border-[#fd850b]/55`}
                >
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#120807]/92 via-[#120807]/34 to-transparent" />
                  <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center bg-[#fd850b] text-[#120807] sm:left-5 sm:top-5 sm:h-11 sm:w-11">
                    <i
                      className={`fa-solid ${story.icon} text-xs sm:text-base`}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5">
                    <span className="block font-serif text-[1.18rem] uppercase leading-none text-[#FFF7ED] sm:text-3xl">
                      {story.title}
                    </span>
                    <span className="mt-2 block text-[0.76rem] leading-4 text-[#f4d8c5] sm:mt-3 sm:text-sm sm:leading-6">
                      {story.copy}
                    </span>
                    <span className="mt-2 inline-flex text-[0.62rem] font-black uppercase tracking-[0.14em] text-[#fd850b] sm:mt-4 sm:text-xs sm:tracking-[0.16em]">
                      View {story.filter}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(253,133,11,0.12),transparent_30%)]" />
          <div className="mx-auto max-w-7xl">
            <div className="relative z-10 mx-auto mb-10 max-w-3xl text-center">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#fd850b]">
                Browse the atmosphere
              </p>
              <h2 className="font-serif text-3xl uppercase leading-[0.95] sm:text-5xl lg:text-6xl">
                Fire, food, rooms, and celebrations
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#C7B8A8]">
                A closer look at the plates, grill moments, dining room, and
                group nights that shape the BRAVO experience.
              </p>
            </div>

            <div className={`${styles.compactFilterBar} relative z-10`}>
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={activeFilter === filter.id}
                  className={`${styles.compactFilterButton} ${
                    activeFilter === filter.id
                      ? 'bg-[#fd850b] text-[#120807] shadow-[0_18px_42px_rgba(253,133,11,0.3)]'
                      : 'border border-[#D4A373]/26 bg-[#FFF7ED]/5 text-[#FFF7ED] hover:border-[#fd850b]'
                  }`}
                >
                  <i
                    className={`fa-solid ${filter.icon} ${styles.compactFilterIcon}`}
                    aria-hidden="true"
                  />
                  <span>{filter.label}</span>
                  <span
                    className={`${styles.compactFilterCount} ${
                      activeFilter === filter.id
                        ? 'text-[#120807]/70'
                        : 'text-[#C7B8A8]'
                    }`}
                  >
                    {getFilterCount(filter.id).toString().padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>

            <div className={`${styles.galleryGrid} relative z-10`}>
              {filteredImages.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`${styles.galleryTile} group relative overflow-hidden border border-[#D4A373]/18 bg-[#1A0E0A] text-left shadow-[0_24px_70px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-1 hover:border-[#fd850b]/55 ${
                    image.featured ? styles.featuredTile : ''
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#120807]/86 via-[#120807]/18 to-transparent opacity-88 transition group-hover:opacity-100" />
                  <span className="absolute left-3 top-3 bg-[#120807]/72 px-2 py-1 text-[0.58rem] font-black uppercase tracking-[0.14em] text-[#fd850b] backdrop-blur sm:left-4 sm:top-4 sm:px-3 sm:py-2 sm:text-[0.65rem] sm:tracking-[0.18em]">
                    {image.category}
                  </span>
                  <span className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                    <span className="block text-[0.82rem] font-black leading-tight text-[#FFF7ED] sm:text-lg lg:text-xl">
                      {image.alt}
                    </span>
                    <span className="mt-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#C7B8A8] opacity-0 transition group-hover:opacity-100">
                      View full image
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#120807]/94 px-5 py-10 backdrop-blur"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="mb-4 ml-auto flex min-h-12 items-center justify-center rounded-lg border border-[#D4A373]/30 px-5 py-3 text-base font-black text-[#FFF7ED] transition hover:border-[#fd850b] hover:bg-[#fd850b] hover:text-[#120807]"
            >
              Close
            </button>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[#D4A373]/20">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-5 text-center text-lg font-bold text-[#C7B8A8]">
              {selectedImage.alt}
            </p>
          </div>
        </div>
      ) : null}

      <Footer />
    </>
  )
}
