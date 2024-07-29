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
    }).filter((page) => page.frontmatter.tags).map((page) => {
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
      const tags = cur?.frontmatter?.tags
      const addItem = (tag, item) => {
        if (acc.hasOwnProperty(tag)) {
          acc[tag].push(item)
        } else {
          acc[tag] = [ item ]
        }
      }
      if (tags) {
        if (Array.isArray(tags)) {
          tags.forEach((tag) => {
            addItem(tag, cur)
          })
        } else {
          addItem(tag, cur)
        }
      }
      return acc
    }, {})
  }
})