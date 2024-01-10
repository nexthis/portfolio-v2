// server/api/_sitemap-urls.ts
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const data = await serverQueryContent(event).find()


  const pl = data.map((item) => {
    return {
      loc: `portfolio/${item.slug}`,
      lastmod: new Date(item.datePublished),
      priority: 0.5
    }
  })

  const en = data.map((item) => {
    return {
      loc: `en/portfolio/${item.slug}`,
      lastmod: new Date(item.datePublished),
      priority: 0.5
    }
  })

  return [...en, ...pl]
})
