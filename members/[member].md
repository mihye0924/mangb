---
layout: home
aside: false
---

<script setup>
import { data as members } from './members.data.js'
import { data as posts } from './posts.data.js'
import Avatar from '../.vitepress/theme/components/Avatar.vue'
import { isWithinTwoWeeks } from '../.vitepress/theme/utils'
</script>


<template v-if="data = members[$params.member]">
  <div class="pt-10 mt-12 text-center">
    <div class="w-36 h-36 mx-auto border-8 border-zinc-200 dark:border-zinc-700 rounded-full overflow-hidden box-content">
      <img v-if="data['사진']" :src="data['사진']" class="object-cover w-full h-full" />
      <div v-else class="flex justify-center items-center w-full h-full bg-zinc-100 text-zinc-300">
        <div class="w-full h-full max-w-40 max-h-40 p-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM8 14H16V16H8V14ZM8 11C7.17157 11 6.5 10.3284 6.5 9.5C6.5 8.67157 7.17157 8 8 8C8.82843 8 9.5 8.67157 9.5 9.5C9.5 10.3284 8.82843 11 8 11ZM16 11C15.1716 11 14.5 10.3284 14.5 9.5C14.5 8.67157 15.1716 8 16 8C16.8284 8 17.5 8.67157 17.5 9.5C17.5 10.3284 16.8284 11 16 11Z"></path></svg>
        </div>
      </div>
    </div>
    <h1 class="flex justify-center items-center mt-5 mb-8 !font-bold">
      <span v-if="isWithinTwoWeeks(data['생일'])" class="mr-2">🎉</span>
      <span>{{ $params.member }}</span>
    </h1>
    <div class="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-0 sm:gap-x-12">
      <div v-if="data['이메일']" class="flex items-center gap-x-2">
        <span class="w-4 h-4 text-zinc-500" title="이메일">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"></path></svg>
        </span>
        <span class="text-sm">{{ data['이메일'] }}</span>
      </div>
      <div v-if="data['입사']" class="flex items-center gap-x-2">
        <span class="w-4 h-4 text-zinc-500" title="입사">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14.1213 10.4792C13.7308 10.0886 13.0976 10.0886 12.7071 10.4792L12 11.1863C11.2189 11.9673 9.95259 11.9673 9.17154 11.1863C8.39049 10.4052 8.39049 9.13888 9.17154 8.35783L14.8022 2.72568C16.9061 2.24973 19.2008 2.83075 20.8388 4.46875C23.2582 6.88811 23.3716 10.7402 21.1792 13.2939L19.071 15.4289L14.1213 10.4792ZM3.16113 4.46875C5.33452 2.29536 8.66411 1.98283 11.17 3.53116L7.75732 6.94362C6.19523 8.50572 6.19523 11.0384 7.75732 12.6005C9.27209 14.1152 11.6995 14.1611 13.2695 12.7382L13.4142 12.6005L17.6568 16.8431L13.4142 21.0858C12.6331 21.8668 11.3668 21.8668 10.5858 21.0858L3.16113 13.6611C0.622722 11.1227 0.622722 7.00715 3.16113 4.46875Z"></path></svg>
        </span>
        <span class="text-sm">{{ data['입사'] }}<template v-if="data['퇴사']"> ~ {{ data['퇴사'] }}</template></span>
      </div> 
      <div v-if="data['전화번호']" class="flex items-center gap-x-2">
        <span class="w-4 h-4 text-zinc-500" title="전화번호">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2H18C18.5523 2 19 2.44772 19 3V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V3C5 2.44772 5.44772 2 6 2ZM12 17C11.4477 17 11 17.4477 11 18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18C13 17.4477 12.5523 17 12 17Z"></path></svg>
        </span>
        <span class="text-sm">{{ data['전화번호'] }}</span>
      </div>
      <div v-if="data['생일']" class="flex items-center gap-x-2">
        <span class="w-4 h-4 text-zinc-500" title="생일">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6.99993V10.9999L20 10.9999C20.5523 10.9999 21 11.4476 21 11.9999V19.9999L23 19.9999V21.9999H1V19.9999L3 19.9999V11.9999C3 11.4476 3.44772 10.9999 4 10.9999L11 10.9999V6.99993H13ZM13.8301 0.401855C14.6586 1.83673 14.1669 3.6715 12.7321 4.49993L11 5.49993C10.1716 4.06505 10.6632 2.23028 12.0981 1.40186L13.8301 0.401855Z"></path></svg>
        </span>
        <span class="text-sm">{{ data['생일'] }}</span>
      </div> 
    </div>
  </div>
</template>

<section class="mt-32">
  <h1 class="mt-12 mb-8 !text-3xl font-bold">📝 작성한 글</h1>
  <ul v-if="_posts = posts[$params.member]" class="grid grid-cols-1 gap-4 !px-0 !list-none sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="post in _posts">
      <div class="group relative rounded-3xl overflow-hidden">
        <a :href="post.url" class="block aspect-[5/4]">
          <img v-if="post.frontmatter?.thumbnail" :src="post.frontmatter.thumbnail" class="object-cover w-full h-full" />
          <div v-else class="flex justify-center items-center w-full h-full bg-zinc-100 text-zinc-300">
            <div class="w-full h-full max-w-40 max-h-40 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM8 14H16V16H8V14ZM8 11C7.17157 11 6.5 10.3284 6.5 9.5C6.5 8.67157 7.17157 8 8 8C8.82843 8 9.5 8.67157 9.5 9.5C9.5 10.3284 8.82843 11 8 11ZM16 11C15.1716 11 14.5 10.3284 14.5 9.5C14.5 8.67157 15.1716 8 16 8C16.8284 8 17.5 8.67157 17.5 9.5C17.5 10.3284 16.8284 11 16 11Z"></path></svg>
            </div>
          </div>
        </a>
        <div class="absolute top-0 -bottom-2 inset-x-0 flex justify-between items-end px-4 pb-6 pointer-events-none bg-gradient-to-t group-hover:from-zinc-900/80 group-hover:to-zinc-900/0">
          <Avatar :name="post.frontmatter.author" :date="post.frontmatter.created" type="minimal" class="avatar w-fit pointer-events-auto" />
          <div v-if="post.frontmatter.contributors" class="flex">
            <Avatar v-for="(contributor, idx) in post.frontmatter.contributors?.reverse()" :name="contributor" type="simple"  class="relative w-fit -ml-4 first:ml-0 pointer-events-auto" :style="`z-index: ${post.frontmatter.contributors.filter((contributor) => contributor !== post.frontmatter.author).length - idx}`" />
          </div>
        </div>
      </div>
      <ul v-if="post.frontmatter.tags" class="!mt-4">
        <li v-for="tag in post.frontmatter.tags" class="inline-block mr-1 mb-1.5 last:mb-4">
          <a :href="`/tags/${tag}`" class="block px-2 rounded-full text-sm leading-6 bg-zinc-200 dark:bg-zinc-700">{{ tag }}</a>
        </li>
      </ul>
      <a :href="post.url">
        <h1 class="mb-3 !text-2xl !leading-snug !font-bold">{{ post.frontmatter?.title || '제목없음' }}</h1>
        <p class="!my-0 line-clamp-4 text-sm font-normal !leading-6">{{ post.frontmatter.summary }}</p>
      </a>
    </li>
  </ul>
  <div v-else class="pt-28 text-center">
    <!-- <img src="/eyes.png" class="w-80 mx-auto opacity-85 dark:opacity-100" /> -->
    <p class="!mt-10 !mb-60 text-xl font-semibold">아직(도) 작성한 글이 없어요...</p>
  </div>
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
