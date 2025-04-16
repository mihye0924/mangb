---
layout: article
aside: false
---

<script setup>
import { data as hcloud } from './si.data.js' 
import Avatar from '../../../.vitepress/theme/components/Avatar.vue'  
</script>
<section v-if="hcloud.length"> 
  <h1 class="mt-12 mb-8 !text-3xl font-bold">
    {{hcloud[0].url.split('/')[2].toUpperCase()}} (구축)
    <p class="!text-sm !my-0 !mt-2 text-gray-500">2025.05.01 ~ 2025.08.31 (4개월)</p>
  </h1>
  <ul class="grid grid-cols-1 gap-4 !px-0 !list-none sm:grid-cols-2 lg:grid-cols-3"> 
    <li v-for="post in hcloud" class="mb-6 border">  
      <div class="group relative overflow-hidden">
        <a :href="post.url.replace('/pages','')" class="block aspect-[5/4] border-b">
          <img v-if="post.frontmatter?.thumbnail" :src="post.frontmatter.thumbnail" class="object-cover w-full h-full" />
          <div v-else class="flex justify-center items-center w-full h-full bg-zinc-100 text-zinc-300">
            <div class="w-full h-full max-w-40 max-h-40 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM8 14H16V16H8V14ZM8 11C7.17157 11 6.5 10.3284 6.5 9.5C6.5 8.67157 7.17157 8 8 8C8.82843 8 9.5 8.67157 9.5 9.5C9.5 10.3284 8.82843 11 8 11ZM16 11C15.1716 11 14.5 10.3284 14.5 9.5C14.5 8.67157 15.1716 8 16 8C16.8284 8 17.5 8.67157 17.5 9.5C17.5 10.3284 16.8284 11 16 11Z"></path></svg>
            </div>
          </div>
        </a>
        <div class="absolute top-0 -bottom-2 inset-x-0 flex justify-between items-end px-4 pb-6 pointer-events-none bg-gradient-to-t group-hover:from-zinc-900/80 group-hover:to-zinc-900/0">
          <Avatar :name="post.frontmatter.author" :date="post.frontmatter.created" type="minimal" class="avatar w-fit pointer-events-auto" />
        </div>
      </div>
      <ul v-if="post.frontmatter.tags" class="!my-4 !px-4 border-b">
        <li v-for="tag in post.frontmatter.tags" class="inline-block mr-1 mb-1.5 last:mb-4">
          <a :href="`/tags/${tag}`" class="block px-2 rounded-2xl text-sm leading-6 bg-zinc-100 dark:bg-zinc-700">{{ tag }}</a>
        </li>
      </ul>
      <a :href="post.url.replace('/pages','')">
        <h1 class="!mx-4 !text-2xl !leading-snug !font-bold">{{ post.frontmatter?.title || '제목없음' }}</h1>
        <p class="!mx-4 mb-5 line-clamp-4 text-sm font-normal !leading-6">{{ post.frontmatter.summary }}</p>
      </a>
    </li>
  </ul>
</section>

<style scoped>
  section {
    word-break: keep-all;
  }
  section ul {
    padding-inline-start: 0;
  }
  section ul li {
    margin-top: 0;
  }
  section a, section a:hover {
    color: inherit;
    text-decoration: inherit;
  }
  .avatar :deep(a ~ div) {
    opacity: 0;
  }
  .avatar :deep(a), .avatar :deep(a:hover), .avatar :deep(span) {
    color: #fff;
  }
  @media (hover: hover) {
    .group:hover .avatar :deep(a ~ div) {
      opacity: 1;
    }
  }
</style>
