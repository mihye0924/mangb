---
layout: home
aside: false
prev: false
next: false
---

<script setup>
import { data as categories } from './categories.data.js'
</script>

<ul>
  <li v-for="data in categories[$params.category]">
    <a :href="data.url">{{ data.frontmatter?.title }}</a>
  </li>
</ul>
