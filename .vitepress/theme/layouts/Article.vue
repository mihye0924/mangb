<script setup lang="ts">
import { useRoute, useData } from "vitepress";
import { ref, computed } from "vue";
import type { Ref } from "vue";
import { useSidebar } from "vitepress/theme";
import { useEditLink } from "vitepress/dist/client/theme-default/composables/edit-link";
import VPDocAside from "vitepress/dist/client/theme-default/components/VPDocAside.vue";
import VPLink from "vitepress/dist/client/theme-default/components/VPLink.vue";
import Avatar from "../components/Avatar.vue";
import Bookmark from "../components/Bookmark.vue";

const { theme, frontmatter, page } = useData();
const editLink = useEditLink();
const hasEditLink = computed(() => {
  return theme.value.editLink && frontmatter.value.editLink !== false;
});

const route = useRoute();
const { hasSidebar, hasAside, leftAside } = useSidebar();

const term = computed(() => {
  const titleDuplicate = new RegExp(
    `${page.value.title.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}\/$`
  );
  return `${page.value.filePath
    ?.replace(/[^\/]+\.\w{2,3}$/, "")
    .replace(titleDuplicate, "")}${page.value.title}`;
});

interface ListItem {
  title: string;
  thumbnail: string;
  url: string;
}

const prev: Ref<ListItem | null> = ref(null);
const next: Ref<ListItem | null> = ref(null);
const getLists = async () => {
  const target = page.value.relativePath
    .replace(/\/index\.md$|\.md$/, "")
    .replace(/\/+$/, "");
  const dynamic = target
    .split("/")
    .filter((item) => item.toUpperCase() !== page.value.title.toUpperCase());

  const { data } = await import(
    `../../../pages/${dynamic[1] ? dynamic.join("/") : dynamic[0]}/${
      dynamic[1] ? dynamic[1] : dynamic[0]
    }.data.js`
  );
  const lists = data.map((item) => {
    return {
      title: item.frontmatter.title,
      thumbnail: item.frontmatter.thumbnail,
      url: item.url.replace("/pages", ""),
    };
  });
  const currentIndex = lists?.findIndex(
    ({ title }) => title === page.value.title
  );

  prev.value = currentIndex > 0 ? lists[currentIndex - 1] : null;
  next.value =
    currentIndex > -1 && currentIndex < lists.length - 1
      ? lists[currentIndex + 1]
      : null;
};

const pageName = computed(() => {
  getLists();
  return route.path.replace(/[./]+/g, "_").replace(/_html$/, "");
});
</script>

<template>
  <VPBadge />
  <div
    class="VPDoc"
    :class="{ 'has-sidebar': hasSidebar, 'has-aside': hasAside }"
  >
    <slot name="doc-top" />
    <div class="container">
      <div v-if="hasAside" class="aside" :class="{ 'left-aside': leftAside }">
        <div class="aside-curtain" />
        <div class="aside-container">
          <div class="aside-content">
            <VPDocAside>
              <template #aside-top><slot name="aside-top" /></template>
              <template #aside-bottom><slot name="aside-bottom" /></template>
              <template #aside-outline-before
                ><slot name="aside-outline-before"
              /></template>
              <template #aside-outline-after
                ><slot name="aside-outline-after"
              /></template>
              <template #aside-ads-before
                ><slot name="aside-ads-before"
              /></template>
              <template #aside-ads-after
                ><slot name="aside-ads-after"
              /></template>
            </VPDocAside>
          </div>
        </div>
      </div>

      <div class="content">
        <div class="content-container">
          <slot name="doc-before">
            <ul v-if="frontmatter.tags">
              <li
                v-for="tag in frontmatter.tags"
                class="inline-block mr-1 mb-1.5 last:mb-5"
              >
                <a
                  :href="`/tags/${tag}`"
                  class="block px-2 rounded-full text-sm leading-6 bg-zinc-200 dark:bg-zinc-700"
                  >{{ tag }}</a
                >
              </li>
            </ul>
            <template v-if="frontmatter.avatar">
              <h1 class="mb-5 text-4xl sm:text-5xl leading-tight font-bold">
                {{ page.title }}
              </h1>
              <Avatar
                :name="frontmatter.author"
                :date="frontmatter.created"
                class="mb-20"
              />
              <Bookmark :data="frontmatter.refer" />
            </template>
          </slot>
          <main class="main">
            <Content
              class="vp-doc"
              :class="[
                pageName,
                theme.externalLinkIcon && 'external-link-icon-enabled',
              ]"
            />
            <div
              v-if="frontmatter.contributors?.length"
              class="pt-6 mt-16 border-t border-zinc-200 dark:border-zinc-700"
            >
              <p class="mb-4 text-lg font-bold">기여자</p>
              <ul
                class="grid grid-cols-2 gap-4 !px-0 !list-none sm:grid-cols-4"
              >
                <li
                  v-for="(member, idx) in frontmatter.contributors.reverse()"
                  class="flex"
                >
                  <Avatar :name="member" type="minimal" />
                </li>
              </ul>
            </div>
          </main>
          <footer class="VPDocFooter">
            <div v-if="hasEditLink" class="edit-info mt-20">
              <div class="edit-link">
                <VPLink
                  class="edit-link-button"
                  :href="editLink.url"
                  :no-icon="true"
                >
                  <span class="vpi-square-pen edit-link-icon" />
                  {{ editLink.text }}
                </VPLink>
              </div>
            </div>
            <!-- <Comment :term="term" :class="{ 'mt-0': hasEditLink }" /> -->
            <nav
              v-if="prev || next"
              class="sm:flex py-8 border-t border-zinc-200 dark:border-zinc-700"
            >
              <div v-if="prev" :class="next ? 'sm:w-1/2' : 'w-full'">
                <a class="flex" :href="prev.url">
                  <div
                    class="hidden min-[460px]:block w-28 min-w-28 mb-auto aspect-[5/4] rounded-2xl overflow-hidden"
                  >
                    <img
                      :src="prev.thumbnail"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="flex flex-col py-1.5 min-[460px]:mx-3">
                    <span class="text-sm">Previous page</span>
                    <span class="mt-2 text-xl font-bold leading-6">{{
                      prev.title
                    }}</span>
                  </div>
                </a>
              </div>
              <div
                v-if="next"
                class="mt-6 min-[460px]:mt-4 sm:mt-0"
                :class="prev ? 'sm:w-1/2' : 'w-full'"
              >
                <a class="flex sm:flex-row-reverse" :href="next.url">
                  <div
                    class="hidden min-[460px]:block w-28 min-w-28 mb-auto aspect-[5/4] rounded-2xl overflow-hidden"
                  >
                    <img
                      :src="next.thumbnail"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    class="flex flex-col py-1.5 min-[460px]:mx-3 sm:items-end sm:text-right"
                  >
                    <span class="text-sm">Next page</span>
                    <span class="mt-2 text-xl font-bold leading-6">{{
                      next.title
                    }}</span>
                  </div>
                </a>
              </div>
            </nav>
          </footer>
          <slot name="doc-after" />
        </div>
      </div>
    </div>
    <slot name="doc-bottom" />
  </div>
</template>

<style scoped>
.VPDoc {
  padding: 32px 24px 96px;
  width: 100%;
}

@media (min-width: 768px) {
  .VPDoc {
    padding: 48px 32px 128px;
  }
}

@media (min-width: 960px) {
  .VPDoc {
    padding: 48px 32px 0;
  }

  .VPDoc:not(.has-sidebar) .container {
    display: flex;
    justify-content: center;
    max-width: 992px;
  }

  .VPDoc:not(.has-sidebar) .content {
    max-width: 752px;
  }
}

@media (min-width: 1280px) {
  .VPDoc .container {
    display: flex;
    justify-content: center;
  }

  .VPDoc .aside {
    display: block;
  }
}

@media (min-width: 1440px) {
  .VPDoc:not(.has-sidebar) .content {
    max-width: 784px;
  }

  .VPDoc:not(.has-sidebar) .container {
    max-width: 1104px;
  }
}

.container {
  margin: 0 auto;
  width: 100%;
}

.aside {
  position: relative;
  display: none;
  order: 2;
  flex-grow: 1;
  padding-left: 32px;
  width: 100%;
  max-width: 256px;
}

.left-aside {
  order: 1;
  padding-left: unset;
  padding-right: 32px;
}

.aside-container {
  position: fixed;
  top: 0;
  padding-top: calc(
    var(--vp-nav-height) + var(--vp-layout-top-height, 0px) +
      var(--vp-doc-top-height, 0px) + 48px
  );
  width: 224px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
}

.aside-container::-webkit-scrollbar {
  display: none;
}

.aside-curtain {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 224px;
  height: 32px;
  background: linear-gradient(transparent, var(--vp-c-bg) 70%);
}

.aside-content {
  display: flex;
  flex-direction: column;
  min-height: calc(
    100vh - (var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px)
  );
  padding-bottom: 32px;
}

.content {
  position: relative;
  margin: 0 auto;
  width: 100%;
  word-break: keep-all;
}

@media (min-width: 960px) {
  .content {
    padding: 0 32px 128px;
  }
}

@media (min-width: 1280px) {
  .content {
    order: 1;
    margin: 0;
    min-width: 640px;
  }
}

.content-container {
  margin: 0 auto;
}

.VPDoc.has-aside .content-container {
  max-width: 688px;
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
