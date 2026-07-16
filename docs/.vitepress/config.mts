import { defineConfig, loadEnv } from 'vitepress'

const { VITE_SITE_URL } = loadEnv(
  process.env.NODE_ENV || 'development',
  process.cwd(),
  'VITE_'
)
const siteUrl = VITE_SITE_URL
const defaultOgImage = `${siteUrl}/og-default.jpg`

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
      { text: 'Panduan', link: '/guide', activeMatch: '/guide/' },
      { text: 'Legal', link: '/legal/about-siplah', activeMatch: '/legal/' },
      { text: 'FAQ', link: '/faq', activeMatch: '/faq' },
    ],
    sidebar: {
      '/': [
        {
          text: 'FAQ',
          collapsed: false,
          items: [
            { text: 'Pertanyaan Umum', link: '/faq' },
          ],
        },
      ],
      '/guide/': [
        {
          text: 'Panduan Umum',
          collapsed: false,
          items: [
            { text: 'Clear Cache Chrome', link: '/guide/20260715-panduan-clear-cache-chrome' },
          ],
        },
        {
          text: 'Merchant / Penyedia',
          collapsed: false,
          items: [
            { text: 'Daftar / Registrasi', link: '/guide/merchant/01-registrasi' },
            { text: 'Panduan Penggunaan Notifikasi Whatsapp', link: '/guide/merchant/20260715-panduan-notif-whatsapp' },
            { text: 'Panduan Penggunaan TTE', link: '/guide/merchant/20251104-panduan-penggunaan-tte' },
            { text: 'Tambah Pengguna / Admin Toko', link: '/guide/merchant/20260716-tambah-pengguna-admin-toko' },
          ],
        },
        {
          text: 'Satdik / Sekolah',
          collapsed: false,
          items: [
            { text: 'Pembatalan Status BAST', link: '/guide/satdik/20260714-pembatalan-status-bast' },
          ],
        },
        {
          text: 'Cara Pembayaran',
          collapsed: false,
          items: [
            { text: 'Kode Bayar Bank Bali', link: '/guide/payment/20260715-pembayaran-kode-bayar-bank-bali' },
            { text: 'VA BPD DIY', link: '/guide/payment/20260716-pembayaran-va-bpd-diy' },
            { text: 'Kode Bayar Bank Mandiri', link: '/guide/payment/20260716-pembayaran-kode-bayar-bank-mandiri' },
            { text: 'VA Bank Kaltimtara', link: '/guide/payment/20251107-pembayaran-va-bankaltimtara' },
            { text: 'VA Bank Jateng', link: '/guide/payment/20260716-pembayaran-va-bank-jateng' },
            { text: 'VA BPD Sulselbar', link: '/guide/payment/20260716-pembayaran-va-bpd-sulselbar' },
          ],
        },
        {
          text: 'Regulasi',
          collapsed: false,
          items: [
            { text: 'PMK 58 Tahun 2022', link: '/guide/regulation/20220701-pmk58-tahun-2022' },
            { text: 'SE Sesjen No 20 Tahun 2022', link: '/guide/regulation/20220701-se-sesjen-no-20-tahun-2022' },
            { text: 'PMK 131 Tahun 2024', link: '/guide/regulation/20241231-pmk131-tahun-2024' },
          ],
        },
      ],
      '/legal/': [
        {
          text: 'Legal',
          collapsed: false,
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
