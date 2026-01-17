import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url
  const locales = SITE_CONFIG.locales
  
  // 静的ページのパス
  const routes = [
    '',
    '/about',
    '/philosophy',
    '/rent',
    '/sale',
    '/management',
    '/minpaku',
    '/contact',
  ]
  
  // 各ロケールと各ルートの組み合わせでURLを生成
  const sitemap: MetadataRoute.Sitemap = []
  
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}${route}`])
          ),
        },
      })
    })
  })
  
  return sitemap
}
