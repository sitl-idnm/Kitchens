import type { MetadataRoute } from 'next'
import { SITE } from '@/shared/data/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/policy'
    },
    sitemap: `${SITE.domain}/sitemap.xml`,
    host: SITE.domain
  }
}
