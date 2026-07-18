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
│   ├── .vitepress/
│   │   ├── config.mts          # Site config
│   │   ├── theme/index.ts      # Theme (registers global components)
│   │   └── components/         # Vue components (PageDate, TagBadge, etc.)
│   ├── index.md                # Home page (layout: home)
│   ├── blog/                   # Blog & berita
│   │   ├── list.md
│   │   └── YYYYMMDD-HHmmss-*.md
│   ├── guide/                  # User guides
│   │   ├── list.md
│   │   ├── merchant/           # Merchant guides
│   │   └── satdik/             # School guides
│   ├── legal/                  # Legal pages
│   │   ├── about-siplah.md
│   │   ├── privacy-policy.md
│   │   └── terms-of-conditions.md
│   └── faq.md
```

## File Creation Rules

### General Rules (applies to all `.md` files)

- **Naming**: numeric prefix `YYYYMMDD-HHmmss-` based on current time UTC+7 and use datetime now, followed by a kebab-case slug.  
  Example: `20260715-153815-guide.md`
- **Frontmatter**: must include `title`, `description`, `date`
- **H1**: always use `# {{ $frontmatter.title }}`
- **Date**: place `<PageDate />` on its own line after the H1 (with a blank line separator)

### Guide `.md` Files

- Follow all **General Rules**
- File location: `docs/guide/` or any subfolder beneath it (e.g. `docs/guide/merchant/`, `docs/guide/payment/`)
- After creating the file, register it in the sidebar in `docs/.vitepress/config.mts` under the appropriate section

### Blog `.md` Files

- Follow all **General Rules**
- File location: `docs/blog/` or any subfolder beneath it
- Additional frontmatter fields (beyond `title`, `description`, `date`):
    - `sidebar: false`
    - `lastUpdated: false`
    - `ogImage` — full URL or path to the blog thumbnail image
- Content structure:

    ```markdown
    # {{ $frontmatter.title }}

    <TagBadge :tags="$frontmatter.tags" />

    <PageDate />
    ```

- `TagBadge` must come right after the H1 (with a blank line delimiter) and before `<PageDate />`
