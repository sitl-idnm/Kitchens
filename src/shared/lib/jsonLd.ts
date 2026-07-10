import { cases, type CaseStudy } from '@/shared/data/cases'
import { faq } from '@/shared/data/faq'
import { company, SITE } from '@/shared/data/site'

type JsonLdObject = Record<string, unknown>

const abs = (path: string) => new URL(path, SITE.domain).toString()

// Organization / LocalBusiness. Placeholder contact fields are omitted rather
// than shipped with fake values (per the SEO handoff).
export const organizationJsonLd = (): JsonLdObject => {
  const data: JsonLdObject = {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: SITE.name,
    description:
      'Кухни фабрики SURA напрямую, без салонной наценки. Москва и область.',
    url: abs('/'),
    areaServed: company.areaServed,
    image: abs(SITE.ogImage)
  }

  if (!company.phone.placeholder) data.telephone = company.phone.display
  if (!company.email.placeholder) data.email = company.email.display
  if (!company.address.placeholder) {
    data.address = {
      '@type': 'PostalAddress',
      addressLocality: 'Москва',
      streetAddress: company.address.display,
      addressCountry: 'RU'
    }
  }

  return data
}

export const faqJsonLd = (): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer }
  }))
})

export const caseArticleJsonLd = (study: CaseStudy): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: study.caseTitle,
  image: abs(study.gallery[0]?.src ?? study.cover.src),
  description: study.clientStory,
  author: { '@type': 'Organization', name: SITE.name },
  publisher: { '@type': 'Organization', name: SITE.name }
})

export const caseBreadcrumbJsonLd = (study: CaseStudy): JsonLdObject => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Главная', item: abs('/') },
    { '@type': 'ListItem', position: 2, name: 'Кейсы', item: abs('/#catalog') },
    {
      '@type': 'ListItem',
      position: 3,
      name: study.kicker,
      item: abs(`/cases/${study.slug}`)
    }
  ]
})

export const allCaseSlugs = () => cases.map((item) => item.slug)
