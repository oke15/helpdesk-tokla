<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
}

const formattedDate = computed(() => {
  if (!frontmatter.value.date) return ''
  return formatDate(frontmatter.value.date)
})
</script>

<template>
  <blockquote v-if="formattedDate" class="blog-date">
    <svg
      class="blog-date-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
      <path d="M3 10h18" />
      <path d="m16 20 2 2 4-4" />
    </svg>
    Diterbitkan: {{ formattedDate }}
  </blockquote>
</template>

<style scoped>
.blog-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.blog-date-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}
</style>
