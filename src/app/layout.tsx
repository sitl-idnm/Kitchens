import { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter_Tight, Playfair_Display } from 'next/font/google'
import { SITE } from '@/shared/data/site'
import { SiteFooter } from '@modules/footer'
import { Header } from '@modules/header'

import '@styles/global.scss'

import { YandexMetrika } from '@components/analytics'
import { CookieBanner } from '@components/cookie'
import { LeadModal } from '@components/lead-modal'
import { Provider } from '@service/provider'

const interTight = Inter_Tight({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter-tight',
  display: 'swap'
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-playfair',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `Кухни от фабрики SURA в Москве — проверим смету и посчитаем | ${SITE.name}`,
    template: `%s | ${SITE.name}`
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.domain,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }]
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  colorScheme: 'light'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang={SITE.lang}
      className={`${interTight.variable} ${playfair.variable}`}
    >
      <body>
        <Provider>
          <div id="root">
            <Header />
            {children}
            <SiteFooter />
          </div>

          <LeadModal />
          <CookieBanner />
          <div id="modal-root" />
        </Provider>

        <YandexMetrika />
      </body>
    </html>
  )
}
