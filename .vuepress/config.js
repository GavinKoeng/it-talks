import { defineUserConfig, defaultTheme } from 'vuepress';
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { readingTimePlugin } from "vuepress-plugin-reading-time2";
import { containerPlugin } from '@vuepress/plugin-container'

export default defineUserConfig({
    // ===== 关键：指定源目录为项目根目录 =====
    sourceDir: './',

    // base 路径改为你的仓库名
    base: '/it-talks/',

    lang: 'zh-CN',
    title: '程序员的学习杂谈',
    description: 'AI · 物理 · IT · 系统思考',

    head: [
        ['link', { rel: "shortcut icon", href: "/icon.png" }],
    ],

    plugins: [
        mdEnhancePlugin({
            footnote: true,
            sub: true,
        }),
        containerPlugin({ type: 'center' }),
        containerPlugin({ type: 'right' }),
        readingTimePlugin({}),
    ],

    theme: defaultTheme({
        // ---------- 导航栏 ----------
        navbar: [
            { text: '首页', link: '/' },
            { text: 'AI 专题', link: 'common/ai/' },
            { text: '物理与 IT', link: 'common/maphyit/' },
            { text: 'IT 体系地图', link: 'map/' },
            { text: '编程学习', link: 'navigation/learning/' },
            { text: '关于', link: 'about.md' },
            { text: 'GitHub', link: 'https://github.com/GavinKoeng/it-talks' }
        ],

        // ---------- 侧边栏 ----------
        sidebar: {
            // ===== 根路径（首页）的侧边栏 =====
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

            // ===== common/ai/ 目录下的侧边栏 =====
            'common/ai/': [
                {
                    text: 'AI 专题',
                    collapsable: false,
                    children: [
                        // 在这里列出 common/ai/ 下的 .md 文件
                        // 例如：'ainormal',
                    ]
                }
            ],

            // ===== common/maphyit/ 目录下的侧边栏 =====
            'common/maphyit/': [
                {
                    text: '物理与 IT 类比',
                    collapsable: false,
                    children: [
                        // 在这里列出 common/maphyit/ 下的 .md 文件
                        // 例如：'maphyit',
                    ]
                }
            ],

            // ===== map/ 目录下的侧边栏 =====
            'map/': [
                {
                    text: 'IT 体系地图',
                    collapsable: false,
                    children: [
                        {
                            text: '计算机体系',
                            link: 'map/computers/',
                            children: [
                                'map/computers/README.md',
                            ]
                        },
                        {
                            text: '程序员视角',
                            link: 'map/programmers/',
                            children: [
                                'map/programmers/README.md',
                            ]
                        },
                        {
                            text: '工具链',
                            link: 'map/toolchains/',
                            children: [
                                'map/toolchains/README.md',
                            ]
                        },
                    ]
                }
            ],

            // ===== navigation/ 目录下的侧边栏 =====
            'navigation/': [
                {
                    text: '学习导航',
                    collapsable: false,
                    children: [
                        {
                            text: '编程学习',
                            link: 'navigation/learning/',
                            children: [
                                'navigation/learning/learning_programming/README.md',
                                'navigation/learning/learning_architecture/README.md',
                                'navigation/learning/learning_hacking/README.md',
                            ]
                        },
                        {
                            text: '理解与认知',
                            link: 'navigation/understanding/',
                            children: [
                                'navigation/understanding/understanding_os/README.md',
                                'navigation/understanding/understanding_engineering/README.md',
                                'navigation/understanding/understanding_fullstack/README.md',
                            ]
                        },
                        {
                            text: '聚焦与方向',
                            link: 'navigation/focusing/',
                            children: [
                                'navigation/focusing/focusing_itedu/README.md',
                                'navigation/focusing/focusing_itfuture/README.md',
                                'navigation/focusing/focusing_itvalue/README.md',
                            ]
                        },
                    ]
                }
            ],
        },

        // ---------- 其他主题配置 ----------
        lastUpdated: true,
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页',
        editLinkPattern: 'https://github.com/GavinKoeng/it-talks/edit/main/{path}',
        docsRepo: 'https://github.com/GavinKoeng/it-talks',
        docsDir: '',  // 因为文件在根目录，设为空字符串
        docsBranch: 'main',
    })
});
