import type { Metadata, Viewport } from 'next'
import { Anton, Montserrat } from 'next/font/google'
import './styles/globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BRAVO Brazilian BBQ | Premium Brazilian Steakhouse',
  description:
    'BRAVO Brazilian BBQ serves premium fire-grilled Brazilian steakhouse flavours with warm hospitality in Phnom Penh.',
  metadataBase: new URL('https://bravorestaurant.com'),
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      translate="no"
      suppressHydrationWarning
      className={`${montserrat.variable} ${anton.variable} scroll-smooth`}
    >
      <head>
        <meta name="google" content="notranslate" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.7.2/css/all.min.css"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
