import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "天高云淡",
  description: "天高云淡，个人知识库，计算机，前端，后端",

  base: "/docs-vitepress/", // GitHub仓库名称

  head: [['link', { rel: 'icon', href: '/docs-vitepress/favicon.ico' }]], // favicon

  lastUpdated: true, // 页面最后更新时间

  themeConfig: {
    logo: "img/cloud.svg",  // 主页标题LOGO

    // 文章页 "在GitHub上编辑" 链接
    editLink: {
      pattern: "https://github.com/85521303/docs-vitepress/edit/master/:path",
      text: "在GitHub上编辑此页面"
    },

    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端', items: [
          { text: 'Vue3', link: '/markDown/frontend/Vue3/communicate-between-components' },
          { text: 'Flutter', link: '/markDown/frontend/Flutter/GetX.md' },
          { text: '解决方案', link: '/markDown/frontend/Vue3Solution.md' },
        ]
      },
    ],

    // 侧边栏导航
    sidebar: {
      // Vue3
      '/markDown/frontend/Vue3': [
        {
          text: 'Vue3',
          items: [
            { text: 'Vue3 组件间通信', link: '/markDown/frontend/Vue3/communicate-between-components' },
            { text: 'Vue3 插槽', link: '/markDown/frontend/Vue3/slot' },
            { text: 'Vue3 VueRouter', link: '/markDown/frontend/Vue3/vue-router' },
            { text: 'Vue3 Pinia状态管理库', link: '/markDown/frontend/Vue3/Pinia-state-manager' },
            { text: 'Vue3 其他API汇总', link: '/markDown/frontend/Vue3/other-API' },
            { text: 'Vue3 项目配置问题汇总', link: '/markDown/frontend/Vue3/project-config' }
          ]
        }
      ],
      // Flutter
      '/markDown/frontend/Flutter': [
        {
          text: 'Flutter',
          items: [
            { text: 'GetX框架', link: '/markDown/frontend/Flutter/GetX.md' },
          ]
        }
      ],
      // 前端杂谈
      '/markDown/frontend/Solution': [
        {
          text: '解决方案',
          items: [
            { text: 'Vue3解决方案', link: '/markDown/frontend/Solution/Vue3Solution.md' }
          ]
        }
      ],
    },

    // 链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/85521303' }
    ]
  }
})
