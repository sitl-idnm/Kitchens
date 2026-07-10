import type { MetadataRoute } from 'next'
import { cases } from '@/shared/data/cases'
import { SITE } from '@/shared/data/site'

// /policy is intentionally excluded — it is noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.domain

  return [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    ...cases.map((item) => ({
      url: `${base}/cases/${item.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8
    }))
  ]
}
