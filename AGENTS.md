# AGENTS.md — Helpdesk Toko Ladang

## Project

VitePress 2.0.0-alpha.18 documentation site in Indonesian.

## Commands

- `pnpm docs:dev` — Start dev server
- `pnpm docs:build` — Build for production
- `pnpm docs:preview` — Preview production build

## Structure

```
├── docs/
│   ├── .vitepress/config.mts   # Site config
│   ├── index.md                # Home page (layout: home)
│   ├── guide/                  # User guides
│   │   ├── index.md
│   │   ├── merchant/           # Merchant guides
│   │   └── satdik/             # School guides
│   └── legal/                  # Legal pages
│       ├── about-siplah.md
│       ├── privacy-policy.md
│       └── terms-of-conditions.md
```

## Conventions

- **Language**: Indonesian (bahasa Indonesia)
- **Title**: `title` in frontmatter, then `# {{ $frontmatter.title }}` as H1
- **Clean URLs**: enabled — link without `.md` extension
- **Sidebar**: edit `config.mts` to add pages to `themeConfig.sidebar`
- **Naming**: numeric prefix for ordering (`01-registrasi.md`), or `YYYYMMDD-HHMMSS-` for date-based pages
- **Images**: use external CDN URLs or relative paths
- **Search**: local search provider configured

## Adding a new page

1. Create `.md` file under the appropriate `docs/guide/` subdirectory
2. Add frontmatter with `title`
3. Use `# {{ $frontmatter.title }}` for the page heading
4. Register in sidebar inside `docs/.vitepress/config.mts`
5. Optionally link from `docs/guide/index.md`
