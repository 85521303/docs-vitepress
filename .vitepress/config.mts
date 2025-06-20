import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "天高云淡",
  description: "天高云淡，个人知识库，计算机，前端，后端",
  base: "/docs-vitepress/", // GitHub仓库名称
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "img/cloud.svg",  // 主页标题LOGO

    // 文章页 "在GitHub上编辑" 链接
    editLink: {
      pattern: "https://github.com/85521303/docs-vitepress/edit/master/:path",
      text: "在GitHub上编辑此页面"
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'Vue3', link: '/markDown/Vue3/communicate-between-components' }
    ],

    sidebar: {
      '/markdown-examples': [
        {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
        }
      ],
      '/markDown/Vue3': [
        {
          text: 'Vue3',
        items: [
          { text: 'Vue3 组件间通信', link: '/markDown/Vue3/communicate-between-components' },
          { text: 'Vue3 插槽', link: '/markDown/Vue3/slot' },
          { text: 'Vue3 Pinia状态管理库', link: '/markDown/Vue3/Pinia-state-manager' },
          { text: 'Vue3 其他API汇总', link: '/markDown/Vue3/other-API' },
          { text: 'Vue3 项目配置问题汇总', link: '/markDown/Vue3/project-config' }
        ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/85521303' }
    ]
  }
})
