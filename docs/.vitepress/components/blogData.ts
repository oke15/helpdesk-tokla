export interface Post {
  url: string
  frontmatter: {
    title: string
    description?: string
    date?: string
    tags?: string[]
  }
}

const modules = (import.meta as any).glob('../../blog/**/*.md', { eager: true })

export const posts: Post[] = Object.entries(modules)
  .filter(([path]) => {
    const basename = path.split('/').pop() || ''
    return !['list.md', 'index.md'].includes(basename)
  })
  .map(([path, module]) => {
    const pageData = (module as Record<string, unknown>).__pageData as Record<string, unknown> | undefined
    const fm = pageData?.frontmatter as Record<string, unknown> | undefined
    return {
      url: path.replace(/\.md$/, '').replace(/^\.\.\/\.\.\/blog/, '/blog'),
      frontmatter: {
        title: (fm?.title as string) ?? '',
        description: fm?.description as string | undefined,
        date: fm?.date as string | undefined,
        tags: fm?.tags as string[] | undefined,
      },
    }
  })
  .sort((a, b) => {
    const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0
    const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0
    return dateB - dateA
  })
