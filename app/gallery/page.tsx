'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import styles from './page.module.css'

const fadeUp = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const vp = { once: true, amount: 0.15 }

type ShortVideo = { url: string; title: string }
type GalleryCategory = 'all' | 'food' | 'grill' | 'interior' | 'events'
type GalleryImage = { id: number; src: string; category: Exclude<GalleryCategory, 'all'>; alt: string; featured?: boolean }
type GalleryStory = { title: string; copy: string; image: string; filter: Exclude<GalleryCategory, 'all'>; icon: string }

const DEFAULT_IMAGES: GalleryImage[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1000&q=90', category: 'food', alt: 'Brazilian BBQ steak platter', featured: true },
  { id: 2, src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=90', category: 'grill', alt: 'Skewers of grilled meat' },
  { id: 3, src: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=90', category: 'food', alt: 'Brazilian buffet dishes' },
  { id: 4, src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=90', category: 'interior', alt: 'Warm steakhouse dining room', featured: true },
  { id: 5, src: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1000&q=90', category: 'food', alt: 'Brazilian grill plate with sides' },
  { id: 6, src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=90', category: 'interior', alt: 'Restaurant bar seating' },
  { id: 7, src: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1000&q=90', category: 'grill', alt: 'Charred pork ribs' },
  { id: 8, src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=90', category: 'events', alt: 'Guests dining together', featured: true },
  { id: 9, src: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1000&q=90', category: 'food', alt: 'Grilled chicken served hot' },
  { id: 10, src: 'https://images.unsplash.com/photo-1504973960431-1c467e159aa4?auto=format&fit=crop&w=1000&q=90', category: 'grill', alt: 'Steak cooking over flame' },
  { id: 11, src: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1000&q=90', category: 'interior', alt: 'Private dining area' },
  { id: 12, src: 'https://images.unsplash.com/photo-1519671282429-b44660ead0a7?auto=format&fit=crop&w=1000&q=90', category: 'events', alt: 'Celebration table setup' },
]

const DEFAULT_STORIES: GalleryStory[] = [
  { title: 'Start with the fire', copy: 'Churrasco cuts hit the grill hot, smoky, and ready to carve.', image: 'https://images.unsplash.com/photo-1702741168115-cd3d9a682972?auto=format&fit=crop&w=1000&q=85', filter: 'grill', icon: 'fa-fire-flame-curved' },
  { title: 'Fill the table', copy: 'Buffet sides, sauces, salads, and grilled plates keep every guest moving.', image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=90', filter: 'food', icon: 'fa-utensils' },
  { title: 'Stay for the celebration', copy: 'Warm rooms and group tables make BRAVO feel built for gathering.', image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=90', filter: 'events', icon: 'fa-champagne-glasses' },
]

const DEFAULT_HERO = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=2000&q=90'

const DEFAULT_SHORT_VIDEOS: ShortVideo[] = [
  { url: '/Gallery/VIDEO/IMG_2122.MOV', title: 'The Grill' },
  { url: '/Gallery/VIDEO/video_2026-06-30_20-33-55.mp4', title: 'The Experience' },
  { url: '/Gallery/VIDEO/video_2026-06-30_20-35-04.mp4', title: 'The Atmosphere' },
]

const filterOptions: { id: GalleryCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All', icon: 'fa-border-all' },
  { id: 'food', label: 'Food', icon: 'fa-utensils' },
  { id: 'grill', label: 'Grill', icon: 'fa-fire-flame-curved' },
  { id: 'interior', label: 'Interior', icon: 'fa-chair' },
  { id: 'events', label: 'Events', icon: 'fa-champagne-glasses' },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(DEFAULT_IMAGES)
  const [galleryStories, setGalleryStories] = useState<GalleryStory[]>(DEFAULT_STORIES)
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO)
  const [storyPage, setStoryPage] = useState(0)
  const [shortVideos, setShortVideos] = useState<ShortVideo[]>(DEFAULT_SHORT_VIDEOS)

  useEffect(() => {
    fetch('/api/admin/gallery', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data.images)) setGalleryImages(data.images)
        if (Array.isArray(data.stories) && data.stories.length) { setGalleryStories(data.stories); setStoryPage(0) }
        if (data.heroImage) setHeroImage(data.heroImage)
      })
      .catch(() => {})
    fetch('/api/admin/short-videos')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setShortVideos(d) })
      .catch(() => {})
  }, [])

  const totalStoryPages = Math.ceil(galleryStories.length / 3)
  const visibleStories = galleryStories.slice(storyPage * 3, storyPage * 3 + 3)

  return (
    <>
      <Header />
      <main className="bg-[#120807] text-[#FFF7ED]">
        <section className="relative flex min-h-[62vh] items-center justify-center overflow-hidden px-5 py-28 text-center sm:px-8 lg:px-10">
          <Image src={heroImage} alt="Bravo restaurant gallery hero" fill priority sizes="100vw" className="object-cover" unoptimized={!heroImage.includes('unsplash.com')} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,8,7,0.92),rgba(18,8,7,0.5),rgba(18,8,7,0.92))]" />
          <div className="relative z-10 pt-14">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.24em] text-[#fd850b]">Gallery</p>
            <h1 className="font-serif text-3xl font-black leading-tight sm:text-4xl lg:text-6xl">Moments at BRAVO</h1>
          </div>
        </section>

        <section className="border-y border-[#D4A373]/18 bg-[#1A0E0A] px-3 py-8 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-6 sm:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }}>
              <p className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.2em] text-[#fd850b] sm:mb-4 sm:text-xs sm:tracking-[0.24em]">A night at Bravo</p>
              <h2 className="font-serif text-[1.9rem] uppercase leading-[0.95] sm:text-5xl lg:text-6xl">See the experience before you arrive</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-[#C7B8A8] sm:mt-5 sm:text-base sm:leading-8">Use these highlights as a quick path through the gallery, from the first flame to the final group photo.</p>
              <Link href="/contact#reservation" className="mt-5 inline-flex min-h-9 items-center justify-center gap-2 bg-[#fd850b] px-4 py-2 text-[0.72rem] font-black uppercase tracking-[0.12em] text-[#120807] shadow-[0_18px_42px_rgba(253,133,11,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_62px_rgba(253,133,11,0.46)] sm:mt-7 sm:min-h-12 sm:px-6 sm:py-3 sm:text-sm sm:tracking-[0.14em]">
                <i className="fa-solid fa-calendar-check" aria-hidden="true" /> Book a Table
              </Link>
            </motion.div>

            <div>
              <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className={styles.storyGrid}>
                {visibleStories.map((story) => (
                  <motion.button key={story.title} variants={fadeUp} transition={{ duration: 0.5 }} type="button"
                    className={`${styles.storyCard} group relative overflow-hidden border border-[#D4A373]/18 bg-[#120807] text-left shadow-[0_24px_70px_rgba(0,0,0,0.24)] transition duration-300 hover:-translate-y-2 hover:border-[#fd850b]/55`}>
                    <Image src={story.image} alt={story.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.05]" unoptimized={!story.image.includes('unsplash.com')} />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#120807]/92 via-[#120807]/34 to-transparent" />
                    <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center bg-[#fd850b] text-[#120807] sm:left-5 sm:top-5 sm:h-11 sm:w-11">
                      <i className={`fa-solid ${story.icon} text-xs sm:text-base`} aria-hidden="true" />
                    </span>
                    <span className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5">
                      <span className="block font-serif text-[1.18rem] uppercase leading-none text-[#FFF7ED] sm:text-3xl">{story.title}</span>
                      <span className="mt-2 block text-[0.76rem] leading-4 text-[#f4d8c5] sm:mt-3 sm:text-sm sm:leading-6">{story.copy}</span>
                      <span className="mt-2 inline-flex text-[0.62rem] font-black uppercase tracking-[0.14em] text-[#fd850b] sm:mt-4 sm:text-xs sm:tracking-[0.16em]">View {story.filter}</span>
                    </span>
                  </motion.button>
                ))}
              </motion.div>
              {totalStoryPages > 1 && (
                <div className="mt-4 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setStoryPage(p => Math.max(0, p - 1))}
                    disabled={storyPage === 0}
                    className="flex h-9 w-9 items-center justify-center border border-[#D4A373]/30 text-[#C7B8A8] transition hover:border-[#fd850b] hover:text-[#fd850b] disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous stories"
                  >
                    <i className="fa-solid fa-chevron-left text-xs" />
                  </button>
                  <span className="text-[0.65rem] font-black uppercase tracking-[0.14em] text-[#C7B8A8]">{storyPage + 1} / {totalStoryPages}</span>
                  <button
                    type="button"
                    onClick={() => setStoryPage(p => Math.min(totalStoryPages - 1, p + 1))}
                    disabled={storyPage === totalStoryPages - 1}
                    className="flex h-9 w-9 items-center justify-center border border-[#D4A373]/30 text-[#C7B8A8] transition hover:border-[#fd850b] hover:text-[#fd850b] disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next stories"
                  >
                    <i className="fa-solid fa-chevron-right text-xs" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="px-0 py-0">
          <div className={`${styles.galleryGrid}`}>
            {galleryImages.map((image) => (
              <button key={image.id} type="button" onClick={() => setSelectedImage(image)}
                className={`${styles.galleryTile} group overflow-hidden bg-[#1A0E0A] ${image.featured ? styles.featuredTile : ''}`}>
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" unoptimized={!image.src.includes('unsplash.com')} />
              </button>
            ))}
          </div>
        </section>

        {/* 9:16 Short Videos */}
        {shortVideos.some(v => v.url) && (
          <section className="bg-[#0e0905] px-4 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-6xl">
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={vp} transition={{ duration: 0.7 }} className="mb-10 text-center sm:mb-14">
                <div className="mb-4 flex items-center justify-center gap-4">
                  <div className="h-px w-16 bg-[#fd850b]/40 sm:w-28" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fd850b] sm:text-xs">Short Clips</span>
                  <div className="h-px w-16 bg-[#fd850b]/40 sm:w-28" />
                </div>
                <h2 className="font-serif text-2xl uppercase leading-tight text-white sm:text-3xl lg:text-4xl">Bravo in motion</h2>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#C7B8A8] sm:text-base">Behind-the-scenes moments from the kitchen, grill, and dining room.</p>
              </motion.div>

              <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="grid grid-cols-3 gap-3 sm:gap-5 lg:gap-8">
                {shortVideos.map((vid, i) => (
                  <motion.div key={i} variants={fadeUp} transition={{ duration: 0.55 }} className="flex flex-col gap-3">
                    <div className="relative overflow-hidden rounded-xl border border-[#fd850b]/20 bg-[#1a0e0a] shadow-[0_16px_56px_rgba(0,0,0,0.5)]" style={{ aspectRatio: '9/16' }}>
                      {vid.url ? (
                        <video
                          className="absolute inset-0 h-full w-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="none"
                        >
                          <source src={vid.url} />
                        </video>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#C7B8A8]/40">
                          <i className="fa-solid fa-video text-2xl sm:text-4xl" />
                          <span className="text-[0.6rem] font-black uppercase tracking-widest sm:text-xs">Coming soon</span>
                        </div>
                      )}
                    </div>
                    {vid.title && (
                      <p className="text-center text-[0.72rem] font-black uppercase tracking-[0.18em] text-[#C7B8A8] sm:text-xs">{vid.title}</p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}
      </main>

      {selectedImage ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#120807]/94 px-5 py-10 backdrop-blur" onClick={() => setSelectedImage(null)}>
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setSelectedImage(null)} className="mb-4 ml-auto flex min-h-12 items-center justify-center rounded-lg border border-[#D4A373]/30 px-5 py-3 text-base font-black text-[#FFF7ED] transition hover:border-[#fd850b] hover:bg-[#fd850b] hover:text-[#120807]">Close</button>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[#D4A373]/20">
              <Image src={selectedImage.src} alt={selectedImage.alt} fill sizes="100vw" className="object-cover" unoptimized={!selectedImage.src.includes('unsplash.com')} />
            </div>
            <p className="mt-5 text-center text-lg font-bold text-[#C7B8A8]">{selectedImage.alt}</p>
          </div>
        </div>
      ) : null}

      <Footer />
    </>
  )
}
