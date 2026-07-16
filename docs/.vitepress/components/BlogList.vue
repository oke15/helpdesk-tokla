<template>
    <div class="blog-list">
        <div v-if="allTags.length" class="blog-tags-filter">
            <a
                v-for="tag in allTags"
                :key="tag.name"
                class="tag-filter"
                :class="{ active: selectedTag === tag.name }"
                :href="`/blog/list?tag=${encodeURIComponent(tag.name)}`"
            >
                {{ tag.name }} ({{ tag.count }})
            </a>
            <a v-if="selectedTag" class="clear-filter" href="/blog/list">
                &times; Tampilkan semua
            </a>
        </div>

        <div v-if="filteredPosts.length" class="blog-posts">
            <article v-for="post in filteredPosts" :key="post.url" class="blog-post">
                <h2 class="post-title">
                    <a :href="post.url">{{ post.frontmatter.title }}</a>
                </h2>
                <p v-if="post.frontmatter.date" class="post-date">
                    {{ formatDate(post.frontmatter.date) }}
                </p>
                <p v-if="post.frontmatter.description" class="post-desc">
                    {{ post.frontmatter.description }}
                </p>
                <TagBadge v-if="post.frontmatter.tags" :tags="post.frontmatter.tags" />
            </article>
        </div>
        <div v-else class="blog-empty">
            <p>
                Tidak ada postingan dengan tag "<strong>{{ selectedTag }}</strong
                >".
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { posts } from './blogData'

const route = useRoute()

const selectedTag = computed(() => {
    const params = new URLSearchParams(route.query)
    return params.get('tag')
})

const filteredPosts = computed(() => {
    if (!selectedTag.value) return posts
    return posts.filter((post) => post.frontmatter.tags?.includes(selectedTag.value!))
})

const allTags = computed(() => {
    const tagMap = new Map<string, number>()
    for (const post of posts) {
        for (const tag of post.frontmatter.tags || []) {
            tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
        }
    }
    return Array.from(tagMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
})

function formatDate(dateStr: string): string {
    const d = new Date(dateStr)
    return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
.blog-tags-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    align-items: center;
}

.tag-filter {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.8125rem;
    font-weight: 500;
    background: #f3f4f6;
    color: #374151;
    cursor: pointer;
    transition: all 0.15s;
    user-select: none;
    border: 1px solid transparent;
    text-decoration: none;
}

.tag-filter:hover {
    background: #e5e7eb;
}

.tag-filter.active {
    background: var(--vp-c-brand-1);
    color: #fff;
    border-color: var(--vp-c-brand-1);
}

.clear-filter {
    font-size: 0.8125rem;
    color: var(--vp-c-brand-1);
    cursor: pointer;
    user-select: none;
    margin-left: 0.5rem;
    text-decoration: none;
}

.clear-filter:hover {
    text-decoration: underline;
}

.blog-posts {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.blog-post {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--vp-c-divider);
}

.blog-post:last-child {
    border-bottom: none;
}

.post-title {
    margin: 0 0 0.25rem;
    font-size: 1.25rem;
    line-height: 1.4;
}

.post-title a {
    color: var(--vp-c-text-1);
    text-decoration: none;
}

.post-title a:hover {
    color: var(--vp-c-brand-1);
}

.post-date {
    font-size: 0.8125rem;
    color: var(--vp-c-text-3);
    margin: 0 0 0.5rem;
}

.post-desc {
    margin: 0 0 0.5rem;
    color: var(--vp-c-text-2);
}

.blog-empty {
    text-align: center;
    padding: 3rem 0;
    color: var(--vp-c-text-2);
}
</style>
