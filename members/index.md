---
layout: home
aside: false
---

<script setup>
import { data as members } from './members.data.js'
import { data as posts } from './posts.data.js'
import { isWithinTwoWeeks } from '../.vitepress/theme/utils'
</script>

<section>
  <h1 class="mt-12 mb-8 !text-3xl font-bold">🤖 멤버</h1>
  <ul class="grid grid-cols-1 gap-4 !px-0 !list-none sm:grid-cols-2 lg:grid-cols-3">
    <li v-for="[name, data] of Object.entries(members).filter(([_, data]) => !data['퇴사'])" class="pb-6">
      <a :href="`/members/${name}`">
        <div class="rounded-2xl aspect-[5/4] overflow-hidden sm:aspect-square">
          <img v-if="data['사진']" :src="data['사진']" class="object-cover w-full h-full" />
          <div v-else class="flex justify-center items-center w-full h-full bg-zinc-100 text-zinc-300">
            <div class="w-full h-full max-w-40 max-h-40 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM8 14H16V16H8V14ZM8 11C7.17157 11 6.5 10.3284 6.5 9.5C6.5 8.67157 7.17157 8 8 8C8.82843 8 9.5 8.67157 9.5 9.5C9.5 10.3284 8.82843 11 8 11ZM16 11C15.1716 11 14.5 10.3284 14.5 9.5C14.5 8.67157 15.1716 8 16 8C16.8284 8 17.5 8.67157 17.5 9.5C17.5 10.3284 16.8284 11 16 11Z"></path></svg>
            </div>
          </div>
        </div>
        <p class="flex items-center pt-4 pb-2 !my-0 !text-xl font-bold">
          <span v-if="isWithinTwoWeeks(data['생일'])" class="mr-2">🎉</span>
          <span>{{ name }}</span>
          <Badge type="info" :text="posts[name]?.length || 0" />
        </p>
        <ul class="!px-0 !my-0 !list-none text-sm">
          <li class="inline-block">{{ data['직급'] }}</li>
          <li v-if="data['이메일']" class="relative inline-block pl-2 ml-2 before:block before:absolute before:w-0.5 before:h-0.5 before:bg-zinc-200 before:top-1/2 before:-left-px before:-translate-y-1/2">{{ data['이메일']?.split('@')[0] }}</li>
        </ul>
      </a>
    </li>
  </ul>
</section>

<style scoped>
  ul li {
    margin-top: 0;
  }
  ul li a, ul li a:hover {
    color: inherit;
    text-decoration: inherit;
  }
  :deep(.VPBadge) {
    margin-left: 8px;
    transform: none;
  }
</style>
