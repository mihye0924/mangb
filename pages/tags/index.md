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
  <h1 class="mt-12 mb-8 !text-3xl font-bold">🔖 태그 목록</h1>
  <ul v-if="Object.keys(tags).length" class="grid grid-cols-1 gap-4 !px-0 !list-none sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="tagName in Object.keys(tags).sort()">
      <a :href="`./${tagName}`" class="flex items-center gap-x-1 !text-inherit !no-underline">
        <span class="text-lg font-bold">#{{ tagName }}</span>
        <Badge type="info" :text="tags[tagName].length || 0" class="translate-y-0" />
      </a>
    </li>
  </ul>
  <div v-else class="pt-28 text-center">
    <img src="/eyes.png" class="w-80 mx-auto opacity-85 dark:opacity-100" />
    <p class="!mt-10 !mb-60 text-xl font-semibold">등록된 태그가 없어요...</p>
  </div>
</section>
