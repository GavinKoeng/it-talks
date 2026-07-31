import { defineUserConfig, defaultTheme } from 'vuepress';
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { readingTimePlugin } from "vuepress-plugin-reading-time2";
import { containerPlugin } from '@vuepress/plugin-container'
// 如果暂时不需要评论，可以注释掉 commentPlugin 的导入
// import { commentPlugin } from "vuepress-plugin-comment2";

export default defineUserConfig({
    // base 路径改为你的仓库名
    base: '/it-talks/',

    lang: 'zh-CN',
    title: '程序员的学习杂谈',
    description: 'AI · 物理 · IT · 系统思考',

    head: [
        ['link', { rel: "shortcut icon", href: "/icon.png" }], // 你的 icon 在 vuepress/public/ 下
        // 如果暂时没有样式文件，可以注释掉
        // ['link', { rel: "stylesheet", href: "/styles/index.css" }],
    ],

    plugins: [
        mdEnhancePlugin({
            footnote: true,
            // 如果不需要数学公式，可以关闭 katex
            // katex: true,
            sub: true,
        }),
        containerPlugin({ type: 'center' }),
        containerPlugin({ type: 'right' }),
        // 如果你需要阅读时间统计
        readingTimePlugin({}),
        // 评论功能暂时注释掉，等需要时再配置
        /*
        commentPlugin({
            provider: "Giscus",
            repo: "GavinKoeng/it-talks",
            repoId: "你的仓库ID",
            category: "General",
            categoryId: "你的分类ID"
        }),
        */
    ],

    theme: defaultTheme({
        // ---------- 导航栏 ----------
        navbar: [
            { text: '首页', link: '/' },
            {
                text: 'AI 专题',
                link: '/common/ai/'
            },
            {
                text: '物理与 IT',
                link: '/common/maphyit/'
            },
            {
                text: 'IT 体系地图',
                link: '/map/'
            },
            {
                text: '编程学习',
                link: '/navigation/learning/'
            },
            { text: '关于', link: '/about.md' },
            {
                text: 'GitHub',
                link: 'https://github.com/GavinKoeng/it-talks'
            }
        ],

        // ---------- 侧边栏 ----------
        sidebar: {
            // 首页不显示侧边栏，或者显示特定内容

            // ===== common/ai/ 目录下的侧边栏 =====
            '/common/ai/': [
                {
                    text: 'AI 专题',
                    collapsable: false,
                    children: [
                        // 如果 ai 目录下有 md 文件，在这里列出
                        // 例如：'ainormal',
                        // 如果没有 md 文件，可以留空或显示提示
                    ]
                }
            ],

            // ===== common/maphyit/ 目录下的侧边栏 =====
            '/common/maphyit/': [
                {
                    text: '物理与 IT 类比',
                    collapsable: false,
                    children: [
                        // 列出 maphyit 目录下的 md 文件
                        // 例如：'maphyit',
                    ]
                }
            ],

            // ===== map/ 目录下的侧边栏 =====
            '/map/': [
                {
                    text: 'IT 体系地图',
                    collapsable: false,
                    children: [
                        {
                            text: '计算机体系',
                            link: '/map/computers/',
                            children: [
                                '/map/computers/README.md',
                            ]
                        },
                        {
                            text: '程序员视角',
                            link: '/map/programmers/',
                            children: [
                                '/map/programmers/README.md',
                            ]
                        },
                        {
                            text: '工具链',
                            link: '/map/toolchains/',
                            children: [
                                '/map/toolchains/README.md',
                            ]
                        },
                    ]
                }
            ],

            // ===== navigation/ 目录下的侧边栏 =====
            '/navigation/': [
                {
                    text: '学习导航',
                    collapsable: false,
                    children: [
                        {
                            text: '编程学习',
                            link: '/navigation/learning/',
                            children: [
                                '/navigation/learning/learning_programming/README.md',
                                '/navigation/learning/learning_architecture/README.md',
                                '/navigation/learning/learning_hacking/README.md',
                            ]
                        },
                        {
                            text: '理解与认知',
                            link: '/navigation/understanding/',
                            children: [
                                '/navigation/understanding/understanding_os/README.md',
                                '/navigation/understanding/understanding_engineering/README.md',
                                '/navigation/understanding/understanding_fullstack/README.md',
                            ]
                        },
                        {
                            text: '聚焦与方向',
                            link: '/navigation/focusing/',
                            children: [
                                '/navigation/focusing/focusing_itedu/README.md',
                                '/navigation/focusing/focusing_itfuture/README.md',
                                '/navigation/focusing/focusing_itvalue/README.md',
                            ]
                        },
                    ]
                }
            ],
        },

        // ---------- 其他主题配置 ----------
        // 显示最后更新时间
        lastUpdated: true,
        // 启用编辑链接（指向 GitHub 上的源文件）
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页',
        editLinkPattern: 'https://github.com/GavinKoeng/it-talks/edit/main/docs/{path}',
        // 文档仓库
        docsRepo: 'https://github.com/GavinKoeng/it-talks',
        docsDir: 'docs',
        docsBranch: 'main',
    })
});
