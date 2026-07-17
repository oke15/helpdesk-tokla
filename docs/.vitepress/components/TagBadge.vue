<template>
    <span class="tag-badge-group">
        <a
            v-for="tag in tags"
            :key="tag"
            class="tag-badge"
            :href="`/blog/?tag=${encodeURIComponent(tag)}`"
            :style="{
                backgroundColor: tagColors[tag]?.bg || '#e5e7eb',
                color: tagColors[tag]?.text || '#374151',
            }"
        >
            #{{ tag }}
        </a>
    </span>
</template>

<script setup lang="ts">
defineProps<{
    tags: string[]
}>()

const tagColors: Record<string, { bg: string; text: string }> = {
    update: { bg: '#dbeafe', text: '#1e40af' },
    fitur: { bg: '#dcfce7', text: '#166534' },
    pengumuman: { bg: '#fef3c7', text: '#92400e' },
    berita: { bg: '#f3e8ff', text: '#6b21a8' },
}
</script>

<style scoped>
.tag-badge-group {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.375rem;
}

.tag-badge {
    display: inline-block;
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.15s;
    text-decoration: none;
    user-select: none;
}

.tag-badge:hover {
    opacity: 0.75;
}
</style>
