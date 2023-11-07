// server/api/_sitemap-urls.ts
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const data = await serverQueryContent(event).find()

  return data.map((item) => {
    return {
      loc: item.slug,
      modifiedAt: new Date(item.datePublished),
      priority: 0.5
    }
  })
})

// export default cachedEventHandler(
//   async (e) => {
//     const posts = await Promise.all([
//       {
//         _path: '/blog/post-a',
//         modifiedAt: new Date()
//       },
//       {
//         _path: '/blog/post-b',
//         modifiedAt: new Date()
//       },
//       {
//         _path: '/blog/post-c',
//         modifiedAt: new Date()
//       }
//     ])
//     return posts.map((p) => {
//       return {
//         loc: p._path,
//         lastmod: p.modifiedAt
//       }
//     })
//   },
//   {
//     name: 'sitemap-dynamic-url',
//     maxAge: 60 * 10 // cache URLs for 10 minutes
//   }
// )
