import { createContentLoader } from 'vitepress'
import * as cheerio from 'cheerio'
import path from 'path'
import fs from 'fs'

export default createContentLoader('/pages/vue/**/*.md', {
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
    }).filter((page) => page.url !== '/pages/vue/').map((page) => {
      const $ = cheerio.load(page.html)
      const thumbnail = page.frontmatter.thumbnail || $('img').first().attr('src')
      const summary = $.text()
      if (thumbnail) {
        const resolvedPath = path.resolve(page.url, thumbnail)
        const dirName = page.url.split('/').filter((path) => path)[0]
        const thumbnailPath = process.env.NODE_ENV === 'production' ? `/${dirName}/thumbnail_${page.url.split('/').filter((path) => path).at(-1)}.${thumbnail.split('.').at(-1)}` : resolvedPath
        if (process.env.NODE_ENV === 'production') {
          fs.mkdirSync(path.resolve(`./public/${dirName}`), { recursive: true })
          fs.copyFileSync(path.resolve(`.${resolvedPath}`), path.resolve(`./public/${dirName}/thumbnail_${page.url.split('/').filter((path) => path).at(-1)}.${thumbnail.split('.').at(-1)}`))
        }
        page.frontmatter.thumbnail = thumbnailPath
      }
      if (!page.frontmatter.summary && summary) {
        page.frontmatter.summary = summary.slice(0, 250)
      }

      return page
    })
  }
})