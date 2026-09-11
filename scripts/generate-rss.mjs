import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!match) return { frontmatter: {}, body: content }

    const frontmatter = {}
    const fmLines = match[1].split('\n')
    for (const line of fmLines) {
        const kv = line.match(/^(\w+):\s*(.+)$/)
        if (kv) {
            const key = kv[1]
            let value = kv[2].trim().replace(/^['"]|['"]$/g, '')
            if (key === 'tags') {
                frontmatter.tags = value
                    .replace(/^\[|\]$/g, '')
                    .split(',')
                    .map((t) => t.trim().replace(/^['"]|['"]$/g, ''))
            } else if (key === 'title') {
                frontmatter.title = value
            } else if (key === 'description') {
                frontmatter.description = value
            } else if (key === 'date') {
                frontmatter.date = value
            } else if (key === 'ogImage') {
                frontmatter.ogImage = value
            }
        }
    }
    return { frontmatter, body: match[2] }
}

function escapeXml(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}

const docsDir = resolve(__dirname, '../docs')
const blogDir = resolve(docsDir, 'blog')
const siteUrl = process.env.VITE_SITE_URL || 'https://helpdesk.tokoladang.co.id/'

const files = readdirSync(blogDir)
    .filter((f) => f.endsWith('.md') && f !== 'list.md')
    .sort()
    .reverse()

const items = []

for (const file of files) {
    const content = readFileSync(resolve(blogDir, file), 'utf-8')
    const { frontmatter } = parseFrontmatter(content)
    if (!frontmatter.title || !frontmatter.date) continue

    const slug = file.replace(/\.md$/, '')
    const pubDate = new Date(frontmatter.date).toUTCString()
    const description = frontmatter.description || ''

    items.push(`    <item>
        <title>${escapeXml(frontmatter.title)}</title>
        <link>${siteUrl}/blog/${slug}</link>
        <guid>${siteUrl}/blog/${slug}</guid>
        <description>${escapeXml(description)}</description>
        <pubDate>${pubDate}</pubDate>
    </item>`)
}

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Blog &amp; Informasi — Toko Ladang</title>
        <link>${siteUrl}/blog/list</link>
        <description>Informasi terbaru, pengumuman, dan berita seputar Toko Ladang dan SIPLah</description>
        <language>id</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items.join('\n')}
    </channel>
</rss>`

writeFileSync(resolve(docsDir, 'public', 'feed.xml'), feed, 'utf-8')
console.log('RSS feed generated: docs/public/feed.xml')
