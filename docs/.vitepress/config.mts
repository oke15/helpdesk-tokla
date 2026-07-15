import { defineConfig, loadEnv } from 'vitepress'

const { VITE_SITE_URL } = loadEnv(
  process.env.NODE_ENV || 'development',
  process.cwd(),
  'VITE_'
)
const siteUrl = VITE_SITE_URL
const defaultOgImage = `${siteUrl}/og-default.svg`

export default defineConfig({
  title: 'Helpdesk Toko Ladang',
  description: 'Pusat bantuan, panduan, dan informasi untuk pengguna Toko Ladang',
  lang: 'id-ID',
  cleanUrls: true,
  lastUpdated: true,

  sitemap: {
    hostname: siteUrl,
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Toko Ladang' }],
    ['meta', { property: 'og:locale', content: 'id_ID' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  transformPageData(pageData) {
    const canonicalUrl = `${siteUrl}/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    const title = pageData.frontmatter.layout === 'home'
      ? 'Helpdesk Toko Ladang'
      : `${pageData.frontmatter.title} | Helpdesk Toko Ladang`

    const description = pageData.frontmatter.description || pageData.description
    const ogImage = pageData.frontmatter.ogImage || defaultOgImage

    pageData.frontmatter.head ??= []

    pageData.frontmatter.head.push(['link', { rel: 'canonical', href: canonicalUrl }])
    pageData.frontmatter.head.push(['meta', { property: 'og:title', content: title }])
    pageData.frontmatter.head.push(['meta', { property: 'og:url', content: canonicalUrl }])
    pageData.frontmatter.head.push(['meta', { property: 'og:image', content: ogImage }])

    if (description) {
      pageData.frontmatter.head.push(['meta', { property: 'og:description', content: description }])
      pageData.frontmatter.head.push(['meta', { name: 'twitter:description', content: description }])
    }

    pageData.frontmatter.head.push(['meta', { name: 'twitter:title', content: title }])
    pageData.frontmatter.head.push(['meta', { name: 'twitter:image', content: ogImage }])
  },

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Panduan', link: '/guide' },
      { text: 'Legal', link: '/legal/about-siplah' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Merchant / Penyedia',
          collapsed: false,
          items: [
            { text: 'Daftar / Registrasi', link: '/guide/merchant/01-registrasi' },
          ],
        },
        {
          text: 'Satdik / Sekolah',
          collapsed: false,
          items: [
            { text: 'Pembatalan Status BAST', link: '/guide/satdik/20260714-pembatalan-status-bast' },
          ],
        },
      ],
      '/legal/': [
        {
          text: 'Legal',
          collapsed: true,
          items: [
            { text: 'Tentang Siplah', link: '/legal/about-siplah' },
            { text: 'Kebijakan Privasi', link: '/legal/privacy-policy' },
            { text: 'Syarat dan Ketentuan', link: '/legal/terms-of-conditions' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
    search: {
      provider: 'local',
    },
  },
})
