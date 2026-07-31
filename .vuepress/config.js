import { defineUserConfig, defaultTheme } from 'vuepress';
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { readingTimePlugin } from "vuepress-plugin-reading-time2";
import { containerPlugin } from '@vuepress/plugin-container'

export default defineUserConfig({
    // ===== 关键：告诉 VuePress 从根目录读取内容 =====
    sourceDir: './',
    base: '/it-talks/',
    lang: 'zh-CN',
    title: '程序员的学习杂谈',
    description: 'AI · 物理 · IT · 系统思考',

    head: [
        ['link', { rel: "shortcut icon", href: "/icon.png" }],
    ],

    plugins: [
        mdEnhancePlugin({ footnote: true, sub: true }),
        containerPlugin({ type: 'center' }),
        containerPlugin({ type: 'right' }),
        readingTimePlugin({}),
    ],

    theme: defaultTheme({
        // ---------- 导航栏（根据你的实际内容配置） ----------
        navbar: [
            { text: '首页', link: '/' },
            { text: 'AI 专题', link: 'common/ai/' },
            { text: '物理与 IT', link: 'common/maphyit/' },
            { text: 'IT 体系地图', link: 'map/' },
            { text: '编程学习', link: 'navigation/learning/' },
            { text: '关于', link: 'about.md' },
            { text: 'GitHub', link: 'https://github.com/GavinKoeng/it-talks' }
        ],

        // ---------- 侧边栏（替换成你的实际目录） ----------
        sidebar: {
            // 首页侧边栏
            '/': [
                {
                    text: '📖 导航',
                    children: [
                        { text: '首页', link: '/' },
                        { text: 'AI 专题', link: 'common/ai/' },
                        { text: '物理与 IT', link: 'common/maphyit/' },
                        { text: 'IT 体系地图', link: 'map/' },
                        { text: '编程学习', link: 'navigation/learning/' },
                        { text: '关于', link: 'about.md' },
                    ]
                }
            ],
            // map/ 目录侧边栏
            'map/': [
                {
                    text: 'IT 体系地图',
                    children: [
                        { text: '计算机体系', link: 'map/computers/' },
                        { text: '程序员视角', link: 'map/programmers/' },
                        { text: '工具链', link: 'map/toolchains/' },
                    ]
                }
            ],
            // navigation/ 目录侧边栏
            'navigation/': [
                {
                    text: '学习导航',
                    children: [
                        { text: '编程学习', link: 'navigation/learning/' },
                        { text: '理解与认知', link: 'navigation/understanding/' },
                        { text: '聚焦与方向', link: 'navigation/focusing/' },
                    ]
                }
            ]
        },

        // ---------- 其他功能 ----------
        lastUpdated: true,
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页',
        editLinkPattern: 'https://github.com/GavinKoeng/it-talks/edit/main/{path}',
        docsRepo: 'https://github.com/GavinKoeng/it-talks',
        docsDir: '',
        docsBranch: 'main',
    })
});
