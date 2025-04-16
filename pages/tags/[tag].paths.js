import fs from 'fs'
import matter from 'gray-matter'

export default {
  async paths() {
    const tags = []
    const filelist = await fs.readdirSync('./', { recursive: true })
      .filter((file) => !file.match(/^node_modules\//) && file.match(/\.md$/))
      .map((file) => {
        const markdown = fs.readFileSync(file, 'utf-8')
        const { content, data } = matter(markdown)
        return { content, data }
      })
      .filter(({ data }) => data.tags)
    
    filelist.forEach(({ data }) => {
      tags.push(...data.tags)
    })

    return [...new Set([...tags])].map((tag) => {
      return {
        params: { tag }
      }
    })
  }
}