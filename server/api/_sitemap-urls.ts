// server/api/_sitemap-urls.ts
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const data = await serverQueryContent(event).find()

  return data.map((item) => {
    return {
      loc: item.slug,
      lastmod: new Date(item.datePublished),
      priority: 0.5
    }
  })
})
