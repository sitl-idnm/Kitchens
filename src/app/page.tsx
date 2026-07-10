import type { Metadata } from 'next'
import { faqJsonLd, organizationJsonLd } from '@/shared/lib/jsonLd'
import { JsonLd } from '@components/json-ld'
import { HomeView } from '@views/home'

export const metadata: Metadata = {
  description:
    'Кухни фабрики SURA напрямую, без салонной наценки. Пришлите смету или размеры — покажем, где в цене резерв, без потери вида и удобства. Замер, доставка и сборка по Москве и МО.',
  alternates: { canonical: '/' },
  openGraph: {
    title:
      'Кухни от фабрики SURA в Москве — проверим смету и посчитаем | Кухни 30',
    url: '/'
  }
}

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(), faqJsonLd()]} />
      <HomeView />
    </>
  )
}
