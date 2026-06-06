'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

type GalleryCategory = 'all' | 'food' | 'grill' | 'interior' | 'events'

type GalleryImage = {
  id: number
  src: string
  category: Exclude<GalleryCategory, 'all'>
  alt: string
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1000&q=90',
    category: 'food',
    alt: 'Brazilian BBQ steak platter',
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
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1000&q=90',
    category: 'food',
    alt: 'Seared steak with sauce',
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

const filters: GalleryCategory[] = ['all', 'food', 'grill', 'interior', 'events']

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const filteredImages =
    activeFilter === 'all'
      ? galleryImages
      : galleryImages.filter((image) => image.category === activeFilter)

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
            <h1 className="font-serif text-5xl font-black leading-tight sm:text-6xl lg:text-8xl">
              Moments at BRAVO
            </h1>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`min-h-12 rounded-lg px-5 py-3 text-sm font-black uppercase tracking-[0.14em] transition duration-300 ${
                    activeFilter === filter
                      ? 'bg-[#fd850b] text-[#120807] shadow-[0_18px_42px_rgba(253,133,11,0.3)]'
                      : 'border border-[#D4A373]/26 bg-[#FFF7ED]/5 text-[#FFF7ED] hover:border-[#fd850b]'
                  }`}
                >
                  {filter === 'all' ? 'All' : filter}
                </button>
              ))}
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredImages.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="group relative h-72 overflow-hidden rounded-lg border border-[#D4A373]/18 bg-[#1A0E0A] text-left shadow-[0_24px_70px_rgba(0,0,0,0.24)]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#120807]/76 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-4 right-4 text-lg font-black text-[#FFF7ED]">
                    {image.alt}
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
