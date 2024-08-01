<template>
  <div class="avatar relative flex items-center gap-x-2" :class="type">
    <a :href="`/members/${name}`" class="w-8 h-8 border border-zinc-300 dark:border-zinc-700 rounded-full overflow-hidden box-content">
      <img v-if="members[name]?.['사진']" :src="`/members/img/${members[name]?.['사진']}`" class="object-cover w-full h-full bg-zinc-50" />
      <div v-else class="flex justify-center items-center w-full h-full bg-zinc-100 text-zinc-300">
        <div class="w-full h-full max-w-40 max-h-40 p-0.5 bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM8 14H16V16H8V14ZM8 11C7.17157 11 6.5 10.3284 6.5 9.5C6.5 8.67157 7.17157 8 8 8C8.82843 8 9.5 8.67157 9.5 9.5C9.5 10.3284 8.82843 11 8 11ZM16 11C15.1716 11 14.5 10.3284 14.5 9.5C14.5 8.67157 15.1716 8 16 8C16.8284 8 17.5 8.67157 17.5 9.5C17.5 10.3284 16.8284 11 16 11Z"></path></svg>
        </div>
      </div>
    </a>
    <div class="tooltip">{{ name }}</div>
    <div v-if="type !== 'simple'" class="flex flex-col">
      <a :href="`/members/${name}`" class="text-sm leading-tight">{{ name }}</a>
      <span v-if="writeDate" class="text-xs">{{ writeDate }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { format } from 'date-fns'
import { data as members } from '../../../pages/members/members.data'

const props = defineProps({ 
  name: {
    type: String,
    default: '',
    required: true,
  },
  date: {
    type: String,
    default: '',
    required: false,
  },
  type: {
    type: String,
    default: 'default',
    required: false,
  }, 
})

const dateFormat = props.type === 'minimal' ? 'yyyy. MM. dd.' : (props.date.match(/:\d{2}$/) ? 'yyyy. MM. dd. HH:mm:ss' : 'yyyy. MM. dd.')
const dateObject = new Date(props.date.replace(/^(\d{4})\.(\d{2})\.(\d{2})/, '$1-$2-$3'))
const writeDate = computed(() => props.date && format(dateObject, dateFormat))
</script>

<style scoped>
.avatar a, .avatar a:hover, .avatar span {
  color: #000;
  text-decoration: inherit;
}
.dark .avatar a, .dark .avatar a:hover, .dark .avatar span {
  color: #fff;
}

.tooltip {
  --a: 70deg;
  --h: 5px;
  --p: 50%; 
  --r: 3px;
  --b: 1px;
  --c1: #ccc;
  --c2: #fff;

  display: none;
  padding: 1em;
  border-radius: var(--r) var(--r) min(var(--r), 100% - var(--p) - var(--h) * tan(var(--a) / 2)) min(var(--r), var(--p) - var(--h) * tan(var(--a) / 2)) / var(--r);
  clip-path: polygon(0 100%, 0 0, 100% 0, 100% 100%,
    min(100%, var(--p) + var(--h) * tan(var(--a) / 2)) 100%,
    var(--p) calc(100% + var(--h)),
    max(0%  , var(--p) - var(--h) * tan(var(--a) / 2)) 100%);
  background: var(--c1);
  border-image: conic-gradient(var(--c1) 0 0) fill 0 / var(--r) max(0%, 100% - var(--p) - var(--h) * tan(var(--a) / 2)) 0 max(0%, var(--p) - var(--h) * tan(var(--a) / 2)) / 0 0 var(--h) 0;
  position: absolute;
  bottom: calc(100% + 5px);
  left: 50%;
  padding: 4px 8px 3px;
  font-size: 12px;
  transform: translateX(-50%);
}
.dark .tooltip {
  --c1: #111;
  --c2: #222;
}
.tooltip:before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0;
  padding: var(--b);
  border-radius: inherit;
  clip-path: polygon(0 100%, 0 0, 100% 0, 100% 100%,
    min(100% - var(--b), var(--p) + var(--h) * tan(var(--a) / 2) - var(--b) * tan(45deg - var(--a) / 4)) calc(100% - var(--b)),
    var(--p) calc(100% + var(--h) - var(--b) / sin(var(--a) / 2)),
    max(var(--b), var(--p) - var(--h) * tan(var(--a) / 2) + var(--b) * tan(45deg - var(--a) / 4)) calc(100% - var(--b)));
  background: var(--c2) content-box;
  border-image: conic-gradient(var(--c2) 0 0) fill 0 / var(--r) max(var(--b), 100% - var(--p) - var(--h) * tan(var(--a) / 2)) 0 max(var(--b), var(--p) - var(--h) * tan(var(--a) / 2)) / 0 0 var(--h) 0;
}
.simple a:hover + .tooltip {
  display: block;
}
</style>
