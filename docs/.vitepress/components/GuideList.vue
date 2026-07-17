<template>
    <div class="guide-list">
        <div v-for="group in groupedGuides" :key="group.category" class="guide-section">
            <h2>{{ group.label }}</h2>
            <ul>
                <li v-for="item in group.items" :key="item.url">
                    <a :href="item.url">{{ item.title }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { data as guides } from '../data/guide.data.js'

const categoryLabels: Record<string, string> = {
    umum: 'Panduan Umum',
    merchant: 'Merchant / Penyedia',
    satdik: 'Satdik / Sekolah',
    payment: 'Cara Pembayaran',
    regulation: 'Regulasi',
}

const categoryOrder = ['umum', 'merchant', 'satdik', 'payment', 'regulation']

const groupedGuides = computed(() => {
    const map = new Map<string, { category: string; label: string; items: typeof guides }>()
    for (const item of guides) {
        if (!map.has(item.category)) {
            map.set(item.category, {
                category: item.category,
                label: categoryLabels[item.category] || item.category,
                items: [],
            })
        }
        map.get(item.category)!.items.push(item)
    }
    return categoryOrder.filter((cat) => map.has(cat)).map((cat) => map.get(cat)!)
})
</script>

<style scoped>
.guide-section {
    margin-bottom: 2rem;
}

.guide-section h2 {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
}

.guide-section ul {
    padding-left: 1.5rem;
    margin: 0;
}

.guide-section li {
    padding: 0.375rem 0;
}

.guide-section a {
    color: var(--vp-c-brand-1);
    text-decoration: none;
}

.guide-section a:hover {
    text-decoration: underline;
}
</style>
