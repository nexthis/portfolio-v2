import type { MetaObject } from 'nuxt/schema'
import _ from 'lodash'

interface Props {
  title?: string
  description?: string
  image?: {
    src: string
  }
  // Create some additional meta tags
  meta?: MetaObject['meta']
  schemaOrg?: Array<any>
}

function getCurrentUrl () {
  const config = useRuntimeConfig()
  const route = useRoute()

  try {
    const url = new URL(route.path, config.public.SITE_URL)
    return url.href
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Filed to get full site url', e)
    return ''
  }
}

export function useSeoGenerator (props: Props) {
  const { locale } = useI18n()
  const img = useImage()
  const url = getCurrentUrl()

  const schema = props.schemaOrg ?? []
  const meta = props.meta ?? []
  const defaultOgType = !meta.find(item => _.get(item, 'property') === 'og:type')

  function createImage (image: Props['image'], props: { width: number; height: number }) {
    if (!image) { return undefined }

    const imageUrl = img.getImage(image.src, { modifiers: { format: 'png', width: props.width, height: props.height } }).url
    return new URL(imageUrl, url).href
  }

  useHead({
    title: props.title,
    htmlAttrs: {
      lang: locale.value
    },
    meta: [
      { name: 'description', content: props.description },
      { property: 'og:title', content: props.title },
      { property: 'og:description', content: props.description },

      { property: 'og:image', content: createImage(props.image, { width: 1200, height: 675 }) },

      // @ts-expect-error
      defaultOgType && { property: 'og:type', content: 'website' },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '675' },
      { property: 'og:image:alt', content: props.title },

      { property: 'og:url', content: url },
      { property: 'og:locale', content: 'pl_PL' },

      { name: 'twitter:title', content: props.title },
      { name: 'twitter:description', content: props.description },
      { name: 'twitter:image', content: createImage(props.image, { width: 1200, height: 675 }) },
      { name: 'twitter:card', content: 'summary_large_image' },

      { name: 'theme-color', content: '#316CE8' },
      ...meta,

      // @ts-expect-error
      { name: 'mask-icon', content: '/pwa.svg', color: '#316CE8' }

    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'canonical', href: url },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon-180x180.png' }
    ]
  })

  useSchemaOrg([
    ...schema,
    // (props.article !== undefined) && article.fn,
    // @todo Select Identity: https://unhead-schema-org.harlanzw.com//guide/guides/identity
    defineWebSite({
      image: createImage(props.image, { width: 1200, height: 675 })
    }),
    defineWebPage()
  ])
}
