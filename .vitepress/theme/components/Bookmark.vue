<template>
  <a v-if="data" :href="data" target="_blank" class="flex justify-between border border-zinc-200 dark:border-zinc-700 rounded-xl">
    <template v-if="metadata">
      <div class="flex flex-col justify-between w-9/12 p-4 pr-6">
        <h1 class="font-bold">{{ metadata['og:title'] || metadata.title.split(/\s?\|\s?/)[0] }}</h1>
        <p v-if="metadata['og:description']" class="mt-2 mb-auto line-clamp-2 text-sm leading-5 opacity-70">{{ metadata['og:description'] }}</p>
        <div class="flex items-center gap-x-1.5">
          <div v-if="favicon" class="w-5 h-5 overflow-hidden">
            <img :src="favicon" class="object-contain w-full h-full" />
          </div>
          <h2 class="line-clamp-1 text-sm">{{ metadata['og:site_name'] || metadata.title.split(/\s?\|\s?/).at(-1) }}</h2>
        </div>
      </div>
      <div class="w-3/12 p-2.5">
        <div class="aspect-[9/8] rounded-md overflow-hidden">
          <img v-if="image" :src="image" class="object-cover w-full h-full bg-zinc-700 dark:bg-zinc-200" />
          <div v-else class="flex justify-center items-center object-cover w-full h-full p-4 bg-zinc-100 text-zinc-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM8 14H16V16H8V14ZM8 11C7.17157 11 6.5 10.3284 6.5 9.5C6.5 8.67157 7.17157 8 8 8C8.82843 8 9.5 8.67157 9.5 9.5C9.5 10.3284 8.82843 11 8 11ZM16 11C15.1716 11 14.5 10.3284 14.5 9.5C14.5 8.67157 15.1716 8 16 8C16.8284 8 17.5 8.67157 17.5 9.5C17.5 10.3284 16.8284 11 16 11Z"></path></svg>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="loading flex flex-col justify-between w-9/12 p-4 pr-6">
        <h1 class="font-bold"></h1>
        <p class="mt-2 mb-auto text-sm leading-5 opacity-70">
          <span></span>
          <span></span>
        </p>
        <div class="flex items-center gap-x-1.5">
          <div v-if="favicon" class="w-5 h-5 overflow-hidden">
            <img :src="favicon" class="object-contain w-full h-full" />
          </div>
          <h2 class="line-clamp-1 text-sm">{{ data }}</h2>
        </div>
      </div>
      <div class="w-3/12 p-2.5">
        <div class="aspect-[9/8] rounded-md overflow-hidden">
          <img v-if="image" :src="image" class="object-cover w-full h-full bg-zinc-700 dark:bg-zinc-200" />
          <div v-else class="flex justify-center items-center object-cover w-full h-full p-4 bg-zinc-100 text-zinc-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM8 14H16V16H8V14ZM8 11C7.17157 11 6.5 10.3284 6.5 9.5C6.5 8.67157 7.17157 8 8 8C8.82843 8 9.5 8.67157 9.5 9.5C9.5 10.3284 8.82843 11 8 11ZM16 11C15.1716 11 14.5 10.3284 14.5 9.5C14.5 8.67157 15.1716 8 16 8C16.8284 8 17.5 8.67157 17.5 9.5C17.5 10.3284 16.8284 11 16 11Z"></path></svg>
          </div>
        </div>
      </div>
    </template>
  </a>
</template>

<script setup>
import { ref, watch } from 'vue'
import urlMetadata from 'url-metadata'

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
    required: true,
  },
})

const metadata = ref(null)
const favicon = ref(null)
const image = ref(null)
watch(() => props.data, async (refer) => {
  metadata.value = null
  favicon.value = null
  image.value = null
  if (refer) {
    try {
      const result = await urlMetadata(`https://cors.dfy.works/${refer}`)
      const description = result['og:description'] || result['description'] || result['Description']
      if (description) {
        const tempEl = document.createElement('p')
        tempEl.innerHTML = description.trim().replace(/&nbsp;/g, ' ')
        result['og:description'] = tempEl.textContent
      }
      metadata.value = result
      favicon.value = result.favicons[0] && ((result.favicons[0]?.href.match(/^\//) ? refer.replace(/(\.[A-z]{2,})[^\.]+$/, '$1') : refer) + result.favicons[0].href).replace(/https?:\/\/.+(https?:\/\/)/, '$1')
      image.value = (result['og:image'].match(/^\//) ? refer.replace(/(\.[A-z]{2,})[^\.]+$/, '$1') : '') + result['og:image']
    } catch (err) {
      metadata.value = null
      favicon.value = null
      image.value = null
    }
  } else {
    metadata.value = null
    favicon.value = null
    image.value = null
  }
}, { immediate: true })
</script>

<style scoped>
.loading > h1, .loading > p span {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.loading > h1:before, .loading > p span:before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 600px;
  background: #e3e3e3;
  background: linear-gradient(to right, #e3e3e3 8%, #efefef 38%, #e3e3e3 54%);
  background-size: 1200px 640px;
  animation-duration: 1.8s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
}
.dark .loading > h1:before, .dark .loading > p span:before {
  background: #333;
  background: linear-gradient(to right, #333 8%, #3d3d3d 38%, #333 54%);
}
.loading > h1 {
  max-width: 200px;
  height: 16px;
  margin: 4px 0;
}
.loading > p span {
  display: block;
  height: 14px;
  margin: 3px 0;
}
.loading > p span + span {
  max-width: 65%;
  margin-top: 6px;
}

@keyframes placeHolderShimmer {
  0%{
    background-position: -600px 0
  }
  100%{
    background-position: 600px 0
  }
}
</style>
