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
    <>
      {/* Desktop: floating WhatsApp bubble bottom-right */}
      <a
        href="https://wa.me/85578938333"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className={`fixed bottom-8 right-6 z-50 hidden lg:flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_32px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_48px_rgba(37,211,102,0.65)] ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <i className="fa-brands fa-whatsapp text-[1.6rem]" aria-hidden="true" />
      </a>

      {/* Mobile: sticky bottom bar with Call + Book buttons */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 flex lg:hidden transition-transform duration-300 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <a
          href="tel:+85578938333"
          className="flex flex-1 items-center justify-center gap-2 bg-[#120807] border-t border-[#D4A373]/20 py-4 text-[0.72rem] font-black uppercase tracking-[0.12em] text-[#C7B8A8]"
        >
          <i className="fa-solid fa-phone text-[#fd850b]" aria-hidden="true" />
          Call Us
        </a>
        <a
          href="https://wa.me/85578938333"
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-2 bg-[#fd850b] py-4 text-[0.72rem] font-black uppercase tracking-[0.12em] text-[#120807]"
        >
          <i className="fa-brands fa-whatsapp text-base" aria-hidden="true" />
          Book a Table
        </a>
      </div>
    </>
  )
}
