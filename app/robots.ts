import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/keystatic/', '/api/'],
    },
    sitemap: 'https://www.robertapulcheri.com.br/sitemap.xml',
  }
}
