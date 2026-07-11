import { elfuiMacroPlugin } from "@elfui/vite-plugin";
import { defineConfig } from "vitepress";

export default defineConfig({
  title: "ElfUI",
  description: "宏组件驱动的 Web Components 框架",
  lang: "zh-CN",
  base: "/",
  cleanUrls: true,
  appearance: "dark",
  vite: {
    plugins: [elfuiMacroPlugin()]
  },
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "起步", link: "/起步/简介" },
      { text: "组件", link: "/组件/概览" },
      { text: "生态", link: "/生态/Chain链式组件" },
      { text: "API", link: "/API参考/elfui" }
    ],
    sidebar: [
      {
        text: "起步",
        collapsed: false,
        items: [
          { text: "简介", link: "/起步/简介" },
          { text: "安装", link: "/起步/安装" },
          { text: "快速开始", link: "/起步/快速开始" },
          { text: "包与入口", link: "/起步/包与入口" }
        ]
      },
      {
        text: "组件",
        collapsed: false,
        items: [
          { text: "概览", link: "/组件/概览" },
          { text: "定义组件", link: "/组件/定义组件" },
          { text: "Props", link: "/组件/props" },
          { text: "事件", link: "/组件/事件" },
          { text: "v-model", link: "/组件/v-model" },
          { text: "插槽", link: "/组件/插槽" },
          { text: "组件通信", link: "/组件/组件通信" },
          { text: "组件暴露", link: "/组件/组件暴露" },
          { text: "局部组件", link: "/组件/局部组件" },
          { text: "动态组件", link: "/组件/动态组件" },
          { text: "组件复用", link: "/组件/组件复用" }
        ]
      },
      {
        text: "模板语法",
        collapsed: true,
        items: [
          { text: "概览", link: "/模板语法/概览" },
          { text: "文本与属性", link: "/模板语法/文本与属性" },
          { text: "事件绑定", link: "/模板语法/事件绑定" },
          { text: "条件与列表", link: "/模板语法/条件与列表" },
          { text: "class 与 style", link: "/模板语法/class与style" },
          { text: "表单绑定", link: "/模板语法/表单绑定" }
        ]
      },
      {
        text: "指令",
        collapsed: true,
        items: [
          { text: "内置指令", link: "/指令/内置指令" },
          { text: "事件修饰符", link: "/指令/事件修饰符" },
          { text: "自定义指令", link: "/指令/自定义指令" }
        ]
      },
      {
        text: "响应式",
        collapsed: true,
        items: [
          { text: "响应式状态", link: "/响应式/响应式状态" },
          { text: "计算属性", link: "/响应式/计算属性" },
          { text: "副作用", link: "/响应式/副作用" },
          { text: "监听器", link: "/响应式/监听器" },
          { text: "响应式工具", link: "/响应式/响应式工具" }
        ]
      },
      {
        text: "生命周期",
        collapsed: true,
        items: [
          { text: "概览", link: "/生命周期/概览" },
          { text: "挂载与卸载", link: "/生命周期/挂载与卸载" },
          { text: "更新阶段", link: "/生命周期/更新阶段" },
          { text: "KeepAlive 生命周期", link: "/生命周期/KeepAlive生命周期" }
        ]
      },
      {
        text: "样式",
        collapsed: true,
        items: [
          { text: "组件样式", link: "/样式/组件样式" },
          { text: "Shadow DOM", link: "/样式/ShadowDOM" },
          { text: "主题", link: "/样式/主题" },
          { text: "全局样式", link: "/样式/全局样式" }
        ]
      },
      {
        text: "内置组合式函数",
        collapsed: true,
        items: [
          { text: "概览", link: "/内置组合式函数/概览" },
          { text: "Host 与根节点", link: "/内置组合式函数/Host与根节点" },
          { text: "模板引用", link: "/内置组合式函数/模板引用" },
          { text: "DOM 事件", link: "/内置组合式函数/DOM事件" },
          { text: "观察器", link: "/内置组合式函数/观察器" },
          { text: "交互控制", link: "/内置组合式函数/交互控制" },
          { text: "表单控件", link: "/内置组合式函数/表单控件" }
        ]
      },
      {
        text: "内置组件",
        collapsed: true,
        items: [
          { text: "Teleport", link: "/内置组件/Teleport" },
          { text: "Transition", link: "/内置组件/Transition" },
          { text: "TransitionGroup", link: "/内置组件/TransitionGroup" },
          { text: "KeepAlive", link: "/内置组件/KeepAlive" },
          { text: "Suspense", link: "/内置组件/Suspense" }
        ]
      },
      {
        text: "路由",
        collapsed: true,
        items: [
          { text: "快速开始", link: "/路由/快速开始" },
          { text: "路由配置", link: "/路由/路由配置" },
          { text: "导航", link: "/路由/导航" },
          { text: "路由视图", link: "/路由/路由视图" },
          { text: "路由守卫", link: "/路由/路由守卫" }
        ]
      },
      {
        text: "配置",
        collapsed: true,
        items: [
          { text: "全局配置", link: "/配置/全局配置" },
          { text: "CSP 与体积", link: "/配置/CSP与体积" }
        ]
      },
      {
        text: "错误处理",
        collapsed: true,
        items: [
          { text: "概览", link: "/错误处理/概览" },
          { text: "组件错误捕获", link: "/错误处理/组件错误捕获" },
          { text: "错误边界", link: "/错误处理/错误边界" },
          { text: "全局错误处理", link: "/错误处理/全局错误处理" },
          { text: "编译诊断", link: "/错误处理/编译诊断" }
        ]
      },
      {
        text: "插件",
        collapsed: true,
        items: [
          { text: "概览", link: "/插件/概览" },
          { text: "使用插件", link: "/插件/使用插件" },
          { text: "自定义插件", link: "/插件/自定义插件" }
        ]
      },
      {
        text: "生态",
        collapsed: true,
        items: [
          { text: "Chain 链式组件", link: "/生态/Chain链式组件" },
          { text: "Vite 插件", link: "/生态/Vite插件" },
          { text: "VS Code 插件", link: "/生态/VSCode插件" }
        ]
      },
      {
        text: "迁移",
        collapsed: true,
        items: [
          { text: "从 Vue 迁移", link: "/迁移/从Vue迁移" },
          { text: "从链式迁移到组件", link: "/迁移/从链式迁移到组件" },
          { text: "废弃 API", link: "/迁移/废弃API" }
        ]
      },
      {
        text: "API 参考",
        collapsed: true,
        items: [
          { text: "elfui", link: "/API参考/elfui" },
          { text: "reactivity", link: "/API参考/reactivity" },
          { text: "runtime", link: "/API参考/runtime" },
          { text: "router", link: "/API参考/router" },
          { text: "chain", link: "/API参考/chain" }
        ]
      }
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/bloom-lmh/elfui" }],
    footer: {
      message: "ElfUI 1.0 beta docs · 宏组件主线 · Web Components 输出",
      copyright: "MIT License"
    },
    search: {
      provider: "local"
    },
    outline: { level: [2, 3], label: "本页目录" },
    docFooter: { prev: "上一篇", next: "下一篇" },
    lastUpdatedText: "最后更新",
    darkModeSwitchLabel: "外观",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "回到顶部"
  }
});
