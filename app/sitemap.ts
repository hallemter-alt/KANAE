import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.rut-tokyo.com'
  const locales = ['ja', 'zh', 'en']
  const lastModified = new Date()

  // 定義所有頁面路徑
  const pages = [
    '', // 首頁
    '/about',
    '/philosophy',
    '/rent',
    '/management',
    '/sale',
    '/minpaku',
  ]

  // 為每個語言生成所有頁面的 sitemap 條目
  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach(locale => {
    pages.forEach(page => {
      const url = `${baseUrl}/${locale}${page}`
      
      // 為每個 URL 添加條目
      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            ja: `${baseUrl}/ja${page}`,
            zh: `${baseUrl}/zh${page}`,
            en: `${baseUrl}/en${page}`,
          },
        },
      })
    })
  })

  return sitemapEntries
}
