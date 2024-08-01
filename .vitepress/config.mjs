import { defineConfig } from 'vitepress'
import taskLists from 'markdown-it-task-lists'
import imageFigures from 'markdown-it-image-figures'

  
export default defineConfig({   
  // srcDir: './pages',
  title: "MANGTTU",
  description: "Welcome to my blog", 
  rewrites: {
    "pages(/:path)*/(.*)": "(/:path)*/(.*)",
  },
  themeConfig: { 
    nav: [ 
      // { text: '포스트', link: '/' },
      // { text: '멤버', link: '/members/' },
    ],
    posts: [
    ],
    sidebar: [
      {
        text: '프로젝트',
        items: [
          { text: '- HCloud(운영)', link: '/hcloud' },
          { text: '- UNA(구축)', link: '/una' },
        ]
      },
      {
        text: 'Git',
        items: [
          { text: '- Git 관련 정보', link: '/git/' },
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

