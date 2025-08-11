import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "天高云淡",
  description: "天高云淡，个人知识库，计算机，前端，后端",
  outDir:'dist',
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
          { text: 'JAVA', link: '/docs/backend/java/00-常用Dos命令' },
          { text: 'C语言', link: '/docs/backend/c/1-C语言模拟面向对象' },
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
              { text: '00-常用Dos命令', link: '/docs/backend/java/00-常用Dos命令' },
              { text: '01-环境变量与HelloWorld', link: '/docs/backend/java/01-环境变量与HelloWorld' },
              { text: '02-变量、数据类型转换、运算符', link: '/docs/backend/java/02-变量、数据类型转换、运算符' },
              { text: '03-idea、运算符', link: '/docs/backend/java/03-idea、运算符' },
              { text: '04-流程控制', link: '/docs/backend/java/04-流程控制' },
              { text: '05-数组', link: '/docs/backend/java/05-数组' },
              { text: '06-方法', link: '/docs/backend/java/06-方法' },
              { text: '07-面向对象', link: '/docs/backend/java/07-面向对象' },
              { text: '08-面向对象', link: '/docs/backend/java/08-面向对象' },
              { text: '09-面向对象', link: '/docs/backend/java/09-面向对象' },
              { text: '10-面向对象', link: '/docs/backend/java/10-面向对象' },
              { text: '11-面向对象', link: '/docs/backend/java/11-面向对象' },
              { text: '12-面向对象', link: '/docs/backend/java/12-面向对象' },
              { text: '13-异常Object', link: '/docs/backend/java/13-异常Object' },
              { text: '14-基础API', link: '/docs/backend/java/14-基础API' },
              { text: '15-常用API', link: '/docs/backend/java/15-常用API' },
              { text: '16-多线程', link: '/docs/backend/java/16-多线程' },
              { text: '17-多线程', link: '/docs/backend/java/17-多线程' },
              { text: '18-集合', link: '/docs/backend/java/18-集合' },
              { text: '19-集合', link: '/docs/backend/java/19-集合' },
              { text: '20-Map集合', link: '/docs/backend/java/20-Map集合' },
              { text: '21-IO流', link: '/docs/backend/java/21-IO流' },
              { text: '22-IO流', link: '/docs/backend/java/22-IO流' },
              { text: '23-网络编程、正则表达式、设计模式', link: '/docs/backend/java/23-网络编程、正则表达式、设计模式' },
              { text: '24-jdk新特性', link: '/docs/backend/java/24-jdk新特性' },
              { text: '25-反射、注解', link: '/docs/backend/java/25-反射、注解' }
          ]
        }
      ],
      // c
      '/docs/backend/c': [
        {
          text: 'C语言',
          items: [
            { text: 'C语言模拟面向对象', link: '/docs/backend/c/1-C语言模拟面向对象' },

          ]
        }
      ]
    },

    // 链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/85521303' }
    ]
  },
})