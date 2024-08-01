<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useEditLink } from 'vitepress/dist/client/theme-default/composables/edit-link'
import DefaultTheme from 'vitepress/theme'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'
// import Comment from '../components/Comment.vue'

const { Layout } = DefaultTheme
const { theme, frontmatter, page } = useData()
const editLink = useEditLink()
const hasEditLink = computed(() => {
  return theme.value.editLink && frontmatter.value.editLink !== false
})

const term = computed(() => {
  const titleDuplicate = new RegExp(`${page.value.title.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}\/$`)
  return `${page.value.filePath?.replace(/[^\/]+\.\w{2,3}$/, '').replace(titleDuplicate, '')}${page.value.title}`
})
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <div v-if="hasEditLink" class="edit-info mt-20">
        <div class="edit-link">
          <VPLink class="edit-link-button" :href="editLink.url" :no-icon="true">
            <span class="vpi-square-pen edit-link-icon" />
            {{ editLink.text }}
          </VPLink>
        </div>
      </div>
      <!-- <Comment :term="term" :class="{ 'mt-0': hasEditLink }" /> -->
    </template>
  </Layout>
</template>

<style scoped>
:deep(footer .edit-info ~ .edit-info) {
  display: none;
}

.edit-info {
  padding-bottom: 18px;
}

@media (min-width: 640px) {
  .edit-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 14px;
  }
}

.edit-link-button {
  display: flex;
  align-items: center;
  border: 0;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}

.edit-link-button:hover {
  color: var(--vp-c-brand-2);
}

.edit-link-icon {
  margin-right: 8px;
}
</style>
