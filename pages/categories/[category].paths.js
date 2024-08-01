import fs from 'fs'
import matter from 'gray-matter'

export default {
  async paths() {
    const categories = []
    const filelist = await fs.readdirSync('./', { recursive: true })
      .filter((file) => !file.match(/^node_modules\//) && file.match(/\.md$/))
      .map((file) => {
        const markdown = fs.readFileSync(file, 'utf-8')
        const { content, data } = matter(markdown)
        return { content, data }
      })
      .filter(({ data }) => data.categories)
    
    filelist.forEach(({ data }) => {
      categories.push(...data.categories)
    })

    return [...new Set([...categories])].map((category) => {
      return {
        params: { category }
      }
    })
  }
}