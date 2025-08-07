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
          { text: 'Vue3', link: '/docs/frontend/vue3/communicate-between-components' },
          { text: 'Flutter', link: '/docs/frontend/flutter/getx' },
          { text: '解决方案', link: '/docs/frontend/solution/vue3-solution' },
        ]
      },
      {
        text: '后端', items: [
          { text: 'JAVA', link: '/docs/backend/java/1-常用Dos命令' },
        ]
      }
    ],

    // 侧边栏导航
    sidebar: {
      // Vue3
      '/docs/frontend/vue3': [
        {
          text: 'Vue3',
          items: [
            { text: 'Vue3 组件间通信', link: '/docs/frontend/vue3/communicate-between-components' },
            { text: 'Vue3 插槽', link: '/docs/frontend/vue3/slot' },
            { text: 'Vue3 VueRouter', link: '/docs/frontend/vue3/vue-router' },
            { text: 'Vue3 Pinia状态管理库', link: '/docs/frontend/vue3/pinia-state-manager' },
            { text: 'Vue3 其他API汇总', link: '/docs/frontend/vue3/other-api' },
            { text: 'Vue3 项目配置问题汇总', link: '/docs/frontend/vue3/project-config' }
          ]
        }
      ],
      // Flutter
      '/docs/frontend/flutter': [
        {
          text: 'Flutter',
          items: [
            { text: 'GetX框架', link: '/docs/frontend/flutter/getx' }
          ]
        }
      ],
      // 前端杂谈
      '/docs/frontend/solution': [
        {
          text: '解决方案',
          items: [
            { text: 'Vue3解决方案', link: '/docs/frontend/solution/vue3-solution' }
          ]
        }
      ],
      // java
      '/docs/backend/java': [
        {
          text: 'JAVA',
          items: [
            { text: '常用DOS命令', link: '/docs/backend/java/1-常用Dos命令' },
            { text: '数据类型', link: '/docs/backend/java/2-数据类型' },
            { text: '位运算符', link: '/docs/backend/java/3-位运算符' },
            { text: '进制转换', link: '/docs/backend/java/4-进制转换' },

          ]
        }
      ]
    },

    // 链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/85521303' }
    ]
  }
})
