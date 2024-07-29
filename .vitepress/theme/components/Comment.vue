<template>
  <div ref="comment" class="pt-8 my-20 border-t border-zinc-200 dark:border-zinc-700" />
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vitepress'

const props = defineProps({
  term: {
    type: String,
    default: '',
    required: true,
  },
})

const comment = ref(null)
const commentTheme = ref(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && localStorage.getItem('vitepress-theme-appearance') !== 'light' ? 'github-dark' : 'github-light')
const setCommentBlock = () => {
  document.querySelector('footer .utterances')?.remove()
  const style = document.head.getElementsByTagName('style')[0];
  if (style && style.innerHTML.includes('utterances')) {
    style.remove()
  }

  const utterances = document.createElement('script')
  utterances.id = 'utterances'
  utterances.type = 'text/javascript' 
  utterances.async = true
  utterances.crossOrigin = 'anonymous'
  utterances.src = 'https://utteranc.es/client.js'

  utterances.setAttribute('repo', 'DFY-CODE/codex-comment')
  utterances.setAttribute('issue-term', props.term)
  utterances.setAttribute('theme', commentTheme.value)

  comment.value.appendChild(utterances)
}

const isDark = ref(null)
let observer = null
const setTheme = () => {
  isDark.value = document.documentElement.classList.contains('dark')
  if ((commentTheme.value === 'github-dark') !== isDark.value) {
    commentTheme.value = isDark.value ? 'github-dark' : 'github-light'
    let iframe = document.querySelector('iframe');
    let msg = {
      type: 'set-theme',
      theme: commentTheme.value
    };
    iframe.contentWindow.postMessage(msg, 'https://utteranc.es')
  }
}
onMounted(() => {
  setTheme()
  observer = new MutationObserver(setTheme)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
})
onBeforeUnmount(() => {
  observer.disconnect()
})

const route = useRoute()
watch(() => props.term, (newValue, oldValue) => {
  if (newValue && newValue !== oldValue) {
    setCommentBlock()
  }
})

onMounted(() => {
  setCommentBlock()
})
</script>
