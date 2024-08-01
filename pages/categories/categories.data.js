import { createContentLoader } from 'vitepress'
import * as cheerio from 'cheerio'
import path from 'path'
import fs from 'fs'

export default createContentLoader('/**/**/*.md', {
  render: true,
  transform(rawData) {
    return rawData.sort((a, b) => {
      const aDate = new Date(a.frontmatter.created?.replace(/^(\d{4})\.(\d{2})\.(\d{2})/, '$1-$2-$3'))
      const bDate = new Date(b.frontmatter.created?.replace(/^(\d{4})\.(\d{2})\.(\d{2})/, '$1-$2-$3'))
      if (isNaN(aDate) && isNaN(bDate)) {
        return 0
      } else if (isNaN(aDate)) {
        return 1
      } else if (isNaN(bDate)) {
        return -1
      } else {
        return +bDate - +aDate
      }
    }).filter((page) => page.frontmatter.categories).map((page) => {
      const $ = cheerio.load(page.html)
      const title = $('h1').first().text().trim()
      const thumbnail = $('img').first().attr('src')
      if (!page.frontmatter.title && title) {
        page.frontmatter.title = title
      }
      if (!page.frontmatter.thumbnail && thumbnail) {
        const resolvedPath = path.resolve(page.url, thumbnail)
        const dirName = page.url.split('/').filter((path) => path)[0]
        const thumbnailPath = process.env.NODE_ENV === 'production' ? `/${dirName}/thumbnail_${page.url.split('/').filter((path) => path).at(-1)}.${thumbnail.split('.').at(-1)}` : resolvedPath
        page.frontmatter.thumbnail = thumbnailPath
      }

      return page
    }).reduce((acc, cur) => {
      const categories = cur?.frontmatter?.categories
      const addItem = (category, item) => {
        if (acc.hasOwnProperty(category)) {
          acc[category].push(item)
        } else {
          acc[category] = [ item ]
        }
      }
      if (categories) {
        if (Array.isArray(categories)) {
          categories.forEach((category) => {
            addItem(category, cur)
          })
        } else {
          addItem(category, cur)
        }
      }
      return acc
    }, {})
  }
})