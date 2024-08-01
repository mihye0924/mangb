import { defineConfig } from 'vitepress'
import taskLists from 'markdown-it-task-lists'
import imageFigures from 'markdown-it-image-figures'

  
export default defineConfig({    
  title: "MANGB",
  description: "Welcome to my blog", 
  rewrites: {
    "pages(/:path)*/(.*)": "(/:path)*/(.*)",
  },
  themeConfig: { 
    nav: [  
    ],
    posts: [
    ],
    sidebar: [
      {
        text: '프로젝트',
        items: [
          { text: '- HCloud(운영)', link: '/hcloud/' },
          { text: '- UNA(구축)', link: '/una/' },
        ]
      },
      {
        text: 'Git',
        items: [
          { text: '- Git 관련 정보', link: '/git/' },
        ]
      },
      {
        text: 'Study',
        items: [
          { text: '- 배포', link: '/deploy/' },
          { text: '- Vue3', link: '/vue3/' },
          { text: '- Nuxt3', link: '/nuxt3/' }
        ]
      }
    ], 
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mihye0924/' }
    ],
    outline: 'deep', 
    search: {
      provider: 'local',
    },
  },
  markdown: {
    container: {
      tipLabel: '<span class="emoji">💡</span>',
      warningLabel: '<span class="emoji">✋</span>',
      dangerLabel: '<span class="emoji">🚨</span>',
      infoLabel: '<span class="emoji">💬</span>',
    },
    config: (md) => {
      md.use(taskLists)
      md.use(imageFigures, {
        figcaption: 'alt',
      })
    }
  }
})

