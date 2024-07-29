// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme-without-fonts'
import Default from './layouts/Default.vue'
import Article from './layouts/Article.vue'
import Document from './layouts/Document.vue'
import Post from './layouts/Post.vue'
import './font.css'
import './style.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: Default,
  enhanceApp({ app, router, siteData }) {
    app.component('article', Article)
    app.component('document', Document)
    app.component('post', Post)
  }
}
