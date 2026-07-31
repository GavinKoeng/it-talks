import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
    sourceDir: './',
    base: '/it-talks/',
    lang: 'zh-CN',
    title: '测试站点',
    theme: defaultTheme({
        navbar: [
            { text: '首页', link: '/' },
            { text: '测试', link: '/test.md' }
        ],
        sidebar: {
            '/': [
                {
                    text: '导航',
                    children: [
                        { text: '首页', link: '/' },
                        { text: '测试页面', link: '/test.md' }
                    ]
                }
            ]
        }
    })
})
