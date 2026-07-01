'use client'

import { useEffect, useState } from 'react'

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 150)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="https://wa.me/85510231121"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_32px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_48px_rgba(37,211,102,0.65)] sm:bottom-8 sm:right-6 sm:h-14 sm:w-14 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <i className="fa-brands fa-whatsapp text-[1.35rem] sm:text-[1.6rem]" aria-hidden="true" />
    </a>
  )
}
