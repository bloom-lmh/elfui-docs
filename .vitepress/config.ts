import { elfuiMacroPlugin } from "@elfui/vite-plugin";
import { fileURLToPath } from "node:url";
import { defineConfig, type DefaultTheme } from "vitepress";

type Sidebar = DefaultTheme.SidebarItem[];

const section = (text: string, items: [string, string][]): DefaultTheme.SidebarItem => ({
  text,
  collapsed: true,
  items: items.map(([text, link]) => ({ text, link }))
});

const englishSidebar: Sidebar = [
  section("Getting Started", [["Introduction", "/en/guide/introduction"], ["Installation", "/en/guide/installation"], ["Quick Start", "/en/guide/quick-start"], ["Packages and entry points", "/en/guide/packages"]]),
  section("Components", [["Overview", "/en/components/overview"], ["Defining components", "/en/components/defining-components"], ["Props", "/en/components/props"], ["Events", "/en/components/events"], ["v-model", "/en/components/v-model"], ["Slots", "/en/components/slots"], ["Component communication", "/en/components/communication"], ["Component expose", "/en/components/expose"], ["Local components", "/en/components/local-components"], ["Dynamic components", "/en/components/dynamic-components"], ["Component reuse", "/en/components/reuse"]]),
  section("Template Syntax", [["Overview", "/en/template-syntax/overview"], ["Text and attributes", "/en/template-syntax/text-and-attributes"], ["Conditions and lists", "/en/template-syntax/conditions-and-lists"], ["Event binding", "/en/template-syntax/event-binding"], ["Form binding", "/en/template-syntax/form-binding"], ["Class and style", "/en/template-syntax/class-and-style"]]),
  section("Directives", [["Built-in directives", "/en/directives/built-in"], ["Event modifiers", "/en/directives/event-modifiers"], ["Custom directives", "/en/directives/custom-directives"]]),
  section("Reactivity", [["Reactive state", "/en/reactivity/state"], ["Computed", "/en/reactivity/computed"], ["Effects", "/en/reactivity/effects"], ["Watchers", "/en/reactivity/watchers"], ["Reactivity utilities", "/en/reactivity/utilities"]]),
  section("Lifecycle", [["Overview", "/en/lifecycle/overview"], ["Mounting and unmounting", "/en/lifecycle/mounting-and-unmounting"], ["Update phase", "/en/lifecycle/update-phase"], ["KeepAlive lifecycle", "/en/lifecycle/keep-alive"]]),
  section("Styles", [["Global styles", "/en/styles/global-styles"], ["Component styles", "/en/styles/component-styles"], ["Themes", "/en/styles/themes"], ["Shadow DOM", "/en/styles/shadow-dom"]]),
  section("Composables", [["Overview", "/en/composables/overview"], ["DOM events", "/en/composables/dom-events"], ["Template refs", "/en/composables/template-refs"], ["Host and root node", "/en/composables/host-and-root"], ["Form controls", "/en/composables/form-controls"], ["Interaction control", "/en/composables/interaction-control"], ["Observers", "/en/composables/observers"]]),
  section("Built-in Components", [["Teleport", "/en/built-ins/teleport"], ["Suspense", "/en/built-ins/suspense"], ["KeepAlive", "/en/built-ins/keep-alive"], ["Transition", "/en/built-ins/transition"], ["TransitionGroup", "/en/built-ins/transition-group"]]),
  section("Router", [["Quick start", "/en/router/quick-start"], ["Route configuration", "/en/router/configuration"], ["Route view", "/en/router/route-view"], ["Navigation", "/en/router/navigation"], ["Route guards", "/en/router/guards"]]),
  section("Configuration", [["Global configuration", "/en/configuration/global"], ["CSP and bundle size", "/en/configuration/csp-and-bundle-size"]]),
  section("Error Handling", [["Overview", "/en/error-handling/overview"], ["Global error handling", "/en/error-handling/global"], ["Component error capture", "/en/error-handling/component-capture"], ["Error boundaries", "/en/error-handling/error-boundaries"], ["Compiler diagnostics", "/en/error-handling/compiler-diagnostics"]]),
  section("Plugins", [["Overview", "/en/plugins/overview"], ["Using plugins", "/en/plugins/using-plugins"], ["Custom plugins", "/en/plugins/custom-plugins"]]),
  section("Ecosystem", [["Overview", "/en/ecosystem/overview"], ["Vite plugin", "/en/ecosystem/vite-plugin"], ["Router", "/en/ecosystem/router"], ["Chain components", "/en/ecosystem/chain"], ["VS Code plugin", "/en/ecosystem/language-tools"]]),
  section("Migration", [["From Vue", "/en/migration/from-vue"], ["From Chain to components", "/en/migration/from-chain"], ["Deprecated APIs", "/en/migration/deprecated-apis"]]),
  section("API Reference", [["@elfui/core", "/en/api/core"], ["Reactivity", "/en/api/reactivity"], ["Runtime", "/en/api/runtime"], ["Router", "/en/api/router"], ["Chain", "/en/api/chain"]])
];

const zhSidebar: Sidebar = [
  section("起步", [["简介", "/zh/起步/简介"], ["安装", "/zh/起步/安装"], ["快速开始", "/zh/起步/快速开始"], ["包与入口", "/zh/起步/包与入口"]]),
  section("组件", [["概览", "/zh/组件/概览"], ["定义组件", "/zh/组件/定义组件"], ["props", "/zh/组件/props"], ["事件", "/zh/组件/事件"], ["v-model", "/zh/组件/v-model"], ["插槽", "/zh/组件/插槽"], ["组件通信", "/zh/组件/组件通信"], ["组件暴露", "/zh/组件/组件暴露"], ["局部组件", "/zh/组件/局部组件"], ["动态组件", "/zh/组件/动态组件"], ["组件复用", "/zh/组件/组件复用"]]),
  section("模板语法", [["概览", "/zh/模板语法/概览"], ["文本与属性", "/zh/模板语法/文本与属性"], ["条件与列表", "/zh/模板语法/条件与列表"], ["事件绑定", "/zh/模板语法/事件绑定"], ["表单绑定", "/zh/模板语法/表单绑定"], ["class 与 style", "/zh/模板语法/class与style"]]),
  section("指令", [["内置指令", "/zh/指令/内置指令"], ["事件修饰符", "/zh/指令/事件修饰符"], ["自定义指令", "/zh/指令/自定义指令"]]),
  section("响应式", [["响应式状态", "/zh/响应式/响应式状态"], ["计算属性", "/zh/响应式/计算属性"], ["副作用", "/zh/响应式/副作用"], ["监听器", "/zh/响应式/监听器"], ["响应式工具", "/zh/响应式/响应式工具"]]),
  section("生命周期", [["概览", "/zh/生命周期/概览"], ["挂载与卸载", "/zh/生命周期/挂载与卸载"], ["更新阶段", "/zh/生命周期/更新阶段"], ["KeepAlive 生命周期", "/zh/生命周期/KeepAlive生命周期"]]),
  section("样式", [["全局样式", "/zh/样式/全局样式"], ["组件样式", "/zh/样式/组件样式"], ["主题", "/zh/样式/主题"], ["Shadow DOM", "/zh/样式/ShadowDOM"]]),
  section("内置组合式函数", [["概览", "/zh/内置组合式函数/概览"], ["DOM 事件", "/zh/内置组合式函数/DOM事件"], ["模板引用", "/zh/内置组合式函数/模板引用"], ["Host 与根节点", "/zh/内置组合式函数/Host与根节点"], ["表单控件", "/zh/内置组合式函数/表单控件"], ["交互控制", "/zh/内置组合式函数/交互控制"], ["观察器", "/zh/内置组合式函数/观察器"]]),
  section("内置组件", [["Teleport", "/zh/内置组件/Teleport"], ["Suspense", "/zh/内置组件/Suspense"], ["KeepAlive", "/zh/内置组件/KeepAlive"], ["Transition", "/zh/内置组件/Transition"], ["TransitionGroup", "/zh/内置组件/TransitionGroup"]]),
  section("路由", [["快速开始", "/zh/路由/快速开始"], ["路由配置", "/zh/路由/路由配置"], ["路由视图", "/zh/路由/路由视图"], ["导航", "/zh/路由/导航"], ["路由守卫", "/zh/路由/路由守卫"]]),
  section("配置", [["全局配置", "/zh/配置/全局配置"], ["CSP 与体积", "/zh/配置/CSP与体积"]]),
  section("错误处理", [["概览", "/zh/错误处理/概览"], ["全局错误处理", "/zh/错误处理/全局错误处理"], ["组件错误捕获", "/zh/错误处理/组件错误捕获"], ["错误边界", "/zh/错误处理/错误边界"], ["编译诊断", "/zh/错误处理/编译诊断"]]),
  section("插件", [["概览", "/zh/插件/概览"], ["使用插件", "/zh/插件/使用插件"], ["自定义插件", "/zh/插件/自定义插件"]]),
  section("生态", [["总览", "/zh/生态/总览"], ["Vite 插件", "/zh/生态/Vite插件"], ["Router", "/zh/生态/Router"], ["Chain 链式组件", "/zh/生态/Chain链式组件"], ["VS Code 插件", "/zh/生态/VSCode插件"]]),
  section("迁移", [["从 Vue 迁移", "/zh/迁移/从Vue迁移"], ["从链式迁移到组件", "/zh/迁移/从链式迁移到组件"], ["废弃 API", "/zh/迁移/废弃API"]]),
  section("API 参考", [["@elfui/core", "/zh/API参考/elfui"], ["reactivity", "/zh/API参考/reactivity"], ["runtime", "/zh/API参考/runtime"], ["router", "/zh/API参考/router"], ["chain", "/zh/API参考/chain"]])
];

const baseTheme = {
  socialLinks: [{ icon: "github" as const, link: "https://github.com/bloom-lmh/elfui" }],
  outline: { level: [2, 3] as [2, 3] }
};

const englishTheme: DefaultTheme.Config = {
  ...baseTheme,
  nav: [{ text: "Home", link: "/en/" }, { text: "API", link: "/en/api/core" }],
  sidebar: englishSidebar,
  outline: { ...baseTheme.outline, label: "On this page" },
  docFooter: { prev: "Previous", next: "Next" },
  returnToTopLabel: "Back to top"
};

const chineseTheme: DefaultTheme.Config = {
  ...baseTheme,
  nav: [{ text: "首页", link: "/zh/" }, { text: "API", link: "/zh/API参考/elfui" }],
  sidebar: zhSidebar,
  outline: { ...baseTheme.outline, label: "本页目录" },
  docFooter: { prev: "上一页", next: "下一页" },
  returnToTopLabel: "回到顶部"
};

export default defineConfig({
  title: "ElfUI",
  description: "A compiler-first framework for native Web Components",
  cleanUrls: true,
  appearance: true,
  locales: {
    root: { lang: "en" },
    en: { label: "English", lang: "en", link: "/en/", themeConfig: englishTheme },
    zh: { label: "简体中文", lang: "zh-CN", link: "/zh/", themeConfig: chineseTheme }
  },
  vite: {
    plugins: [elfuiMacroPlugin({ macroImport: "@elfui/core" })],
    resolve: {
      alias: {
        elfui: "@elfui/core",
        "node:path": fileURLToPath(new URL("./theme/components/playground/node-path-shim.ts", import.meta.url))
      }
    }
  }
});
