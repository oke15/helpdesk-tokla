import { createContentLoader } from 'vitepress'

interface GuideItem {
  title: string
  url: string
  category: string
}

function inferCategory(url: string): string {
  if (url.startsWith('/guide/merchant/')) return 'merchant'
  if (url.startsWith('/guide/satdik/')) return 'satdik'
  if (url.startsWith('/guide/payment/')) return 'payment'
  if (url.startsWith('/guide/regulation/')) return 'regulation'
  return 'umum'
}

export default createContentLoader('guide/**/*.md', {
  transform(rawData): GuideItem[] {
    return rawData
      .filter((page) => {
        const basename = page.url.split('/').pop() || ''
        return !['list', 'index'].includes(basename.replace(/\.html$/, ''))
      })
      .sort((a, b) => a.url.localeCompare(b.url))
      .map((page) => ({
        title: page.frontmatter.title,
        url: page.url.replace(/\.html$/, ''),
        category: inferCategory(page.url),
      }))
  },
})
