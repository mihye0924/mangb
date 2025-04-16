---
layout: home
aside: false
prev: false
next: false
---

<script setup>
import { data as tags } from './tags.data.js'
</script>

<section>
  <h1 class="flex items-center gap-x-2 mt-12 mb-8 !text-3xl font-bold">
    <span># {{ $params.tag }}</span>
    <Badge type="info" :text="tags[$params.tag].length || 0" />
  </h1>
  <ul v-if="tags[$params.tag].length" class="grid grid-cols-1 gap-4 !px-0 !list-none sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="data in tags[$params.tag]">
      <a :href="data.url">{{ data.frontmatter?.title }}</a>
    </li>
  </ul>
</section>

<style scoped>
  :deep(.VPBadge) {
    margin: 0 !important;
    transform: none;
  }
</style>
