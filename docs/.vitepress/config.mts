import { DefaultTheme, defineConfig, loadEnv } from 'vitepress'

const { VITE_SITE_URL, VITE_GITHUB_URL, VITE_GA_ID } = loadEnv(
    process.env.NODE_ENV || 'development',
    process.cwd(),
    'VITE_'
)
const siteUrl = VITE_SITE_URL
const githubUrl = VITE_GITHUB_URL
const defaultOgImage = `${siteUrl}/og-default-2.jpg`

// head

const head: import('vitepress').HeadConfig[] = [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Toko Ladang' }],
    ['meta', { property: 'og:locale', content: 'id_ID' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'Blog & Informasi — Toko Ladang', href: '/feed.xml' }],
]

if (VITE_GA_ID) {
    head.push(
        [
            'script',
            {
                async: '',
                src: `https://www.googletagmanager.com/gtag/js?id=${VITE_GA_ID}`,
            },
        ],
        [
            'script',
            {},
            `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${VITE_GA_ID}');
`,
        ]
    )
}

// navbar items

const navbarItems = [
    { text: 'Panduan', link: '/guide/list', activeMatch: '/guide/' },
    { text: 'Blog', link: '/blog/list', activeMatch: '/blog/' },
    { text: 'Legal', link: '/legal/about-siplah', activeMatch: '/legal/' },
    { text: 'FAQ', link: '/faq', activeMatch: '/faq' },
    { text: 'Download', link: '/download', activeMatch: '/download' },
]

// sidebar items
const merhcantGuideSidebarItem = (): DefaultTheme.SidebarItem[] => {
    return [
        { text: 'Daftar / Registrasi', link: '/guide/merchant/01-registrasi' },
        {
            text: 'Panduan Penggunaan Notifikasi Whatsapp',
            link: '/guide/merchant/20260715-000000-panduan-notif-whatsapp',
        },
        {
            text: 'Panduan Penggunaan TTE',
            link: '/guide/merchant/20251104-000000-panduan-penggunaan-tte',
        },
        {
            text: 'Tambah Pengguna / Admin Toko',
            link: '/guide/merchant/20260716-000000-tambah-pengguna-admin-toko',
        },
    ]
}
const paymentGuideSidebarItem = (): DefaultTheme.SidebarItem[] => {
    return [
        {
            text: 'Kode Bayar Bank Bali',
            link: '/guide/payment/20260715-000000-pembayaran-kode-bayar-bank-bali',
        },
        {
            text: 'VA BPD DIY',
            link: '/guide/payment/20260716-000000-pembayaran-va-bpd-diy',
        },
        {
            text: 'Kode Bayar Bank Mandiri',
            link: '/guide/payment/20260716-000000-pembayaran-va-bank-mandiri',
        },
        {
            text: 'VA Bank Kaltimtara',
            link: '/guide/payment/20251107-000000-pembayaran-va-bankaltimtara',
        },
        {
            text: 'VA Bank Jateng',
            link: '/guide/payment/20260716-000000-pembayaran-va-bank-jateng',
        },
        {
            text: 'VA BPD Sulselbar',
            link: '/guide/payment/20260716-000000-pembayaran-va-bpd-sulselbar',
        },
    ]
}
const regulationGuideSidebarItem = (): DefaultTheme.SidebarItem[] => {
    return [
        {
            text: 'PMK 58 Tahun 2022',
            link: '/guide/regulation/20220701-000000-pmk58-tahun-2022',
        },
        {
            text: 'SE Sesjen No 20 Tahun 2022',
            link: '/guide/regulation/20220701-000000-se-sesjen-no-20-tahun-2022',
        },
        {
            text: 'PMK 131 Tahun 2024',
            link: '/guide/regulation/20241231-000000-pmk131-tahun-2024',
        },
    ]
}

export default defineConfig({
    title: 'Helpdesk Toko Ladang',
    description: 'Pusat bantuan, panduan, dan informasi untuk pengguna Toko Ladang',
    lang: 'id-ID',
    cleanUrls: true,
    lastUpdated: true,
    sitemap: {
        hostname: siteUrl,
    },
    head,
    transformPageData(pageData) {
        const isBlog = pageData.relativePath.startsWith('blog/')
        const isBlogPost = isBlog && pageData.relativePath !== 'blog/list.md' && pageData.relativePath !== 'blog/list'

        if (isBlog) {
            pageData.frontmatter.prev = false
            pageData.frontmatter.next = false
        }

        const canonicalUrl = `${siteUrl}/${pageData.relativePath}`
            .replace(/index\.md$/, '')
            .replace(/\.md$/, '.html')

        const title =
            pageData.frontmatter.layout === 'home'
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
            pageData.frontmatter.head.push([
                'meta',
                { property: 'og:description', content: description },
            ])
            pageData.frontmatter.head.push([
                'meta',
                { name: 'twitter:description', content: description },
            ])
        }

        pageData.frontmatter.head.push(['meta', { name: 'twitter:title', content: title }])
        pageData.frontmatter.head.push(['meta', { name: 'twitter:image', content: ogImage }])

        // article meta untuk blog posts
        if (isBlogPost && pageData.frontmatter.date) {
            pageData.frontmatter.head.push([
                'meta',
                { property: 'article:published_time', content: new Date(pageData.frontmatter.date).toISOString() },
            ])
            if (pageData.lastUpdated) {
                pageData.frontmatter.head.push([
                    'meta',
                    { property: 'article:modified_time', content: new Date(pageData.lastUpdated).toISOString() },
                ])
            }
        }

        // JSON-LD Structured Data
        const jsonLdGraph: Record<string, unknown>[] = []

        // Organization schema
        jsonLdGraph.push({
            '@type': 'Organization',
            name: 'Toko Ladang',
            url: siteUrl,
            logo: `${siteUrl}/logo.svg`,
            sameAs: [
                'https://www.youtube.com/@tokoladang',
                'https://www.instagram.com/tokoladang/',
                'https://t.me/siplahtokoladang',
                'https://www.tiktok.com/@tokoladang',
            ],
        })

        // BreadcrumbList schema
        const pathParts = pageData.relativePath.replace(/\.md$/, '').split('/').filter(Boolean)
        const breadcrumbLabels: Record<string, string> = {
            guide: 'Panduan',
            merchant: 'Merchant / Penyedia',
            satdik: 'Satdik / Sekolah',
            payment: 'Cara Pembayaran',
            regulation: 'Regulasi',
            blog: 'Blog & Informasi',
            legal: 'Legal',
            download: 'Download',
            faq: 'FAQ',
        }
        const breadcrumbItems = [
            { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteUrl },
        ]
        let accPath = ''
        for (let i = 0; i < pathParts.length; i++) {
            accPath += '/' + pathParts[i]
            const isLast = i === pathParts.length - 1
            breadcrumbItems.push({
                '@type': 'ListItem',
                position: i + 2,
                name: isLast ? (pageData.frontmatter.title || pathParts[i]) : (breadcrumbLabels[pathParts[i]] || pathParts[i]),
                item: `${siteUrl}${accPath}`,
            })
        }
        jsonLdGraph.push({
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbItems,
        })

        // Article schema untuk blog posts
        if (isBlogPost && pageData.frontmatter.date) {
            jsonLdGraph.push({
                '@type': 'Article',
                headline: pageData.frontmatter.title,
                description: description,
                datePublished: new Date(pageData.frontmatter.date).toISOString(),
                dateModified: pageData.lastUpdated ? new Date(pageData.lastUpdated).toISOString() : new Date(pageData.frontmatter.date).toISOString(),
                author: { '@type': 'Organization', name: 'Toko Ladang' },
                publisher: {
                    '@type': 'Organization',
                    name: 'Toko Ladang',
                    logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.svg` },
                },
                image: ogImage,
                mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
            })
        }

        pageData.frontmatter.head.push([
            'script',
            { type: 'application/ld+json' },
            JSON.stringify({ '@context': 'https://schema.org', '@graph': jsonLdGraph }),
        ])
    },

    themeConfig: {
        nav: navbarItems,
        sidebar: {
            '/': [
                {
                    text: 'FAQ',
                    collapsed: false,
                    items: [{ text: 'Pertanyaan Umum', link: '/faq' }],
                },
            ],
            '/guide/': [
                {
                    text: 'Panduan Umum',
                    collapsed: false,
                    items: [
                        {
                            text: 'Clear Cache Chrome',
                            link: '/guide/20260715-000000-panduan-clear-cache-chrome',
                        },
                        {
                            text: 'Tutorial Negosiasi',
                            link: '/guide/20260718-114630-tutorial-negosiasi',
                        },
                    ],
                },
                {
                    text: 'Merchant / Penyedia',
                    collapsed: false,
                    items: merhcantGuideSidebarItem(),
                },
                {
                    text: 'Satdik / Sekolah',
                    collapsed: false,
                    items: [
                        {
                            text: 'Pembatalan Status BAST',
                            link: '/guide/satdik/20260714-000000-pembatalan-status-bast',
                        },
                    ],
                },
                {
                    text: 'Cara Pembayaran',
                    collapsed: false,
                    items: paymentGuideSidebarItem(),
                },
                {
                    text: 'Regulasi',
                    collapsed: false,
                    items: regulationGuideSidebarItem(),
                },
            ],
            '/legal/': [
                {
                    text: 'Legal',
                    collapsed: false,
                    items: [
                        { text: 'Tentang Siplah', link: '/legal/about-siplah' },
                        { text: 'Kebijakan Privasi', link: '/legal/privacy-policy' },
                        {
                            text: 'Syarat dan Ketentuan',
                            link: '/legal/terms-of-conditions',
                        },
                    ],
                },
            ],
        },
        socialLinks: [
            { icon: 'github', link: githubUrl },
            { icon: 'youtube', link: 'https://www.youtube.com/@tokoladang' },
            { icon: 'instagram', link: 'https://www.instagram.com/tokoladang/' },
            { icon: 'telegram', link: 'https://t.me/siplahtokoladang' },
            { icon: 'tiktok', link: 'https://www.tiktok.com/@tokoladang' },
        ],
        search: {
            provider: 'local',
        },
        outline: {
            level: 'deep',
            label: 'Semua di halaman ini',
        },
    },
    markdown: {
        toc: { level: [1, 2, 3] },
        image: {
            lazyLoading: true,
        },
    },
})
