import { defineUserConfig, defaultTheme } from 'vuepress';
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
// 如果你不需要评论和阅读时间，可以注释或删除以下导入
// import { commentPlugin } from "vuepress-plugin-comment2";
// import { readingTimePlugin } from "vuepress-plugin-reading-time2";
import { containerPlugin } from '@vuepress/plugin-container'

export default defineUserConfig({
    // ===== 关键：告诉 VuePress 从项目根目录读取内容 =====
    sourceDir: './',
    
    // ===== 部署路径（你的 GitHub Pages 子路径） =====
    base: '/it-talks/',

    // ===== 站点信息 =====
    lang: 'zh-CN',
    title: '程序员的学习杂谈',
    description: 'AI · 物理 · IT · 系统思考',

    // ===== 页面头部（图标等） =====
    head: [
        ['link', { rel: "shortcut icon", href: "/icon.png" }],
        // 如果你不需要百度统计，这段可以删除
        /*
        [ 'script', {}, `
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?你的ID";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
            })();
        `]
        */
    ],

    // ===== 插件配置 =====
    plugins: [
        // Markdown 增强：脚注、数学公式、下标等
        mdEnhancePlugin({
            footnote: true,
            katex: true,   // 如果你不需要数学公式，可以改为 false
            sub: true,
        }),
        // 自定义容器：::: center / ::: right
        containerPlugin({ type: 'center' }),
        containerPlugin({ type: 'right' }),
        
        // 阅读时间统计（需要先安装插件）
        // readingTimePlugin({}),
        
        // 评论系统（需要先安装插件并配置你的仓库信息）
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

    // ===== 主题配置 =====
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
            // 首页的侧边栏
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
            
            // common/ai/ 目录的侧边栏
            'common/ai/': [
                {
                    text: 'AI 专题',
                    children: [
                        // 在这里列出 common/ai/ 下的 .md 文件
                        // 例如：'README.md', 'ainormal.md'
                    ]
                }
            ],

            // common/maphyit/ 目录的侧边栏
            'common/maphyit/': [
                {
                    text: '物理与 IT 类比',
                    children: [
                        // 在这里列出 common/maphyit/ 下的 .md 文件
                    ]
                }
            ],

            // map/ 目录的侧边栏
            'map/': [
                {
                    text: 'IT 体系地图',
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

            // navigation/ 目录的侧边栏
            'navigation/': [
                {
                    text: '学习导航',
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
//                        {
//                            text: '理解与认知',
//                            link: 'navigation/understanding/',
//                            children: [
//                                'navigation/understanding/understanding_os/README.md',
//                                'navigation/understanding/understanding_engineering/README.md',
//                                'navigation/understanding/understanding_fullstack/README.md',
//                            ]
//                        },
//                        {
//                            text: '聚焦与方向',
//                            link: 'navigation/focusing/',
//                            children: [
//                                'navigation/focusing/focusing_itedu/README.md',
//                                'navigation/focusing/focusing_itfuture/README.md',
//                                'navigation/focusing/focusing_itvalue/README.md',
//                            ]
//                        },
                    ]
                }
            ],
        },

        // ---------- 其他功能 ----------
        lastUpdated: true,
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页',
        editLinkPattern: 'https://github.com/GavinKoeng/it-talks/edit/main/{path}',
        docsRepo: 'https://github.com/GavinKoeng/it-talks',
        docsDir: '',      // 因为内容在根目录，设为空
        docsBranch: 'main',
    })
});
