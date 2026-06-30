'use client'

import { useEffect, useState } from 'react'

type VideoData = { url: string; title: string; subtitle: string }

const DEFAULT: VideoData = {
  url: '/Home/video_2026-06-30_20-27-44.mp4',
  title: 'See Bravo in Action',
  subtitle: 'Watch how our authentic Brazilian churrasco experience comes to life',
}

function getEmbedUrl(raw: string): string | null {
  if (!raw.trim()) return null
  try {
    const url = new URL(raw.trim())
    if (url.hostname.includes('youtube.com')) {
      const v = url.searchParams.get('v')
      if (v) return `https://www.youtube.com/embed/${v}?rel=0`
    }
    if (url.hostname.includes('youtu.be')) {
      const v = url.pathname.replace('/', '')
      if (v) return `https://www.youtube.com/embed/${v}?rel=0`
    }
    if (url.pathname.includes('/embed/')) return raw.trim()
    return raw.trim()
  } catch {
    // relative path like /Home/video.mp4
    return raw.trim()
  }
}

function isYouTubeEmbed(url: string): boolean {
  return url.includes('youtube.com/embed/')
}

export default function PromoVideo() {
  const [data, setData] = useState<VideoData>(DEFAULT)

  useEffect(() => {
    fetch('/api/admin/promo-video')
      .then(r => r.json())
      .then(d => setData(prev => ({ ...prev, ...d })))
      .catch(() => {})
  }, [])

  const embed = getEmbedUrl(data.url)
  if (!embed) return null

  return (
    <section className="bg-[#0a0805] px-4 py-14 sm:px-8 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center sm:mb-10">
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-[#fd850b]/40 sm:w-28" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fd850b] sm:text-xs">Bravo Experience</span>
            <div className="h-px w-16 bg-[#fd850b]/40 sm:w-28" />
          </div>
          <h2 className="font-serif text-2xl uppercase leading-tight text-white sm:text-3xl lg:text-4xl">{data.title}</h2>
          {data.subtitle && (
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#C7B8A8] sm:text-base">{data.subtitle}</p>
          )}
        </div>

        <div className="overflow-hidden rounded-xl border border-[#fd850b]/20 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
          {isYouTubeEmbed(embed) ? (
            <div className="aspect-square w-full">
              <iframe
                src={embed}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={data.title}
              />
            </div>
          ) : (
            <video
              className="aspect-square w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src={embed} />
            </video>
          )}
        </div>
      </div>
    </section>
  )
}
