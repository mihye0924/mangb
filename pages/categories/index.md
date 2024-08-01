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
  <li v-for="categoryName in Object.keys(categories).sort()">
    <a :href="`./${categoryName}`">{{ categoryName }}({{ categories[categoryName].length }})</a>
  </li>
</ul>
