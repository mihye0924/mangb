import { defineConfig } from "vitepress";
import taskLists from "markdown-it-task-lists";
import imageFigures from "markdown-it-image-figures";

export default defineConfig({
  title: "MANGTTU",
  description: "Welcome to my blog",
  rewrites: {
    "pages(/:path)*/(.*)": "(/:path)*/(.*)",
  },
  themeConfig: {
    nav: [],
    posts: [],
    sidebar: [
      {
        text: "Project Manager",
        items: [{ text: "일정관리", link: "/prj/" }],
      },
      {
        text: "프로젝트",
        items: [
          {
            text: "운영",
            items: [
              {
                text: "HCloud",
                link: "/sm/hcloud/",
              },
            ],
          },
          {
            text: "구축",
            items: [
              {
                text: "UNA",
                link: "/si/una/",
              },
              {
                text: "JINS",
                link: "/si/jins/",
              },
            ],
          },
        ],
      },
      {
        text: "Git",
        items: [{ text: "Git 관련 정보", link: "/git/" }],
      },
      {
        text: "Study",
        items: [
          { text: "배포", link: "/deploy/" },
          { text: "Vue", link: "/vue/" },
          { text: "Nuxt", link: "/nuxt/" },
          { text: "Next", link: "/next/" },
          { text: "React Native", link: "/react-native/" },
        ],
      },
      {
        text: "Mini Project",
        items: [{ text: "Spotify", link: "/spotify/" }],
      },
      {
        text: "",
        items: [
          { text: "윈도우", link: "/window" },
          { text: "맥", link: "/mac" },
          { text: "기타/플러그인", link: "/etc" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/mihye0924/" }],
    outline: "deep",
    search: {
      provider: "local",
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
      md.use(taskLists);
      md.use(imageFigures, {
        figcaption: "alt",
      });
    },
  },
});
