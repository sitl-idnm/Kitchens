import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cases, getCaseBySlug } from '@/shared/data/cases'
import { caseArticleJsonLd, caseBreadcrumbJsonLd } from '@/shared/lib/jsonLd'
import { JsonLd } from '@components/json-ld'
import { CaseView } from '@views/case'

interface CasePageProps {
  params: { slug: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }))
}

export function generateMetadata({ params }: CasePageProps): Metadata {
  const study = getCaseBySlug(params.slug)
  if (!study) return {}

  const title = `${study.caseTitle} — разбор сметы кухни`
  const description = `${study.location}, ${study.area}. Смета ${study.oldPrice} → ${study.newPrice}, резерв ${study.saving}. Что клиент хотел сохранить и где нашли резерв без потери вида и удобства.`

  return {
    title,
    description,
    alternates: { canonical: `/cases/${study.slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/cases/${study.slug}`,
      images: [
        {
          url: study.gallery[0].src,
          width: 1600,
          height: 1200,
          alt: study.cover.alt
        }
      ]
    }
  }
}

export default function CasePage({ params }: CasePageProps) {
  const study = getCaseBySlug(params.slug)

  if (!study) {
    notFound()
  }

  return (
    <>
      <JsonLd data={[caseArticleJsonLd(study), caseBreadcrumbJsonLd(study)]} />
      <CaseView data={study} />
    </>
  )
}
