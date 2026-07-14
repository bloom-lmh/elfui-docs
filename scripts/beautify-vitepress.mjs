import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const roots = ["en", "zh"];
const supportedLanguages = new Set(["ts", "tsx", "js", "jsx", "html", "css", "json", "bash", "sh"]);
const warningZh = /(?:\u4e0d\u8981|\u4e0d\u5e94|\u4e0d\u80fd|\u5fc5\u987b|\u4ec5\u9002\u5408|\u4e0d\u9002\u5408|\u9650\u5236\u5728)/;
const tipZh = /(?:\u63a8\u8350|\u5efa\u8bae|\u4f18\u5148)/;
const adviceHeadingZh = /(?:\u5efa\u8bae|\u63a8\u8350|\u6ce8\u610f)/;
const warningEn = /(?:must not|do not|should not|cannot|not suitable|only install|only use|only belongs)/i;
const tipEn = /(?:recommended|recommend|prefer|best practice)/i;
const adviceHeadingEn = /(?:recommend|advice|tip|note|caution)/i;

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return entry.name.endsWith(".md") ? [path] : [];
  }));
  return files.flat();
}

function formatLines(lines) {
  const ranges = [];
  for (const line of [...new Set(lines)].sort((a, b) => a - b)) {
    const previous = ranges.at(-1);
    if (previous && line === previous[1] + 1) previous[1] = line;
    else ranges.push([line, line]);
  }
  return ranges.map(([start, end]) => start === end ? start : `${start}-${end}`).join(",");
}

function firstMeaningfulLine(lines) {
  return lines.findIndex((line) => {
    const value = line.trim();
    return value && !value.startsWith("//") && !value.startsWith("<!--");
  });
}

function statementRange(lines, start) {
  let depth = 0;
  let opened = false;

  for (let index = start; index < lines.length; index += 1) {
    const line = lines[index];
    for (const character of line) {
      if ("([{".includes(character)) {
        depth += 1;
        opened = true;
      } else if (")]}".includes(character)) {
        depth = Math.max(0, depth - 1);
      }
    }

    if (opened && depth === 0 && /;\s*$/.test(line)) {
      return Array.from({ length: index - start + 1 }, (_, offset) => start + offset + 1);
    }
  }

  return [start + 1];
}

const semanticApis = [
  { code: /\bdefineProps\s*(?:<|\()/, context: /\bdefineProps\b|\bprops?\b|属性/i },
  { code: /\bdefineEmits\s*(?:<|\()/, context: /\bdefineEmits\b|\bemits?\b|事件/i },
  { code: /\bdefineModel\s*(?:<|\()/, context: /\bdefineModel\b|v-model|双向/i },
  { code: /\bdefineSlots\s*(?:<|\()/, context: /\bdefineSlots\b|\bslots?\b|插槽/i },
  { code: /\bdefineExpose\s*\(/, context: /\bdefineExpose\b|\bexpose\b|暴露/i },
  { code: /\bdefineOptions\s*\(/, context: /\bdefineOptions\b|\boptions?\b|formControl|表单控件|选项/i },
  { code: /\bdefineDirective\s*\(/, context: /\bdefineDirective\b|\bdirective\b|指令/i },
  { code: /\bdefineName\s*\(/, context: /\bdefineName\b|组件名称|component name/i },
  { code: /\buseComponents\s*\(/, context: /\buseComponents\b|local components?|局部组件/i },
  { code: /\bregisterComponents\s*\(/, context: /\bregisterComponents\b|global components?|全局组件|注册组件/i },
  { code: /\bcreateApp\([^\n]*\)\.mount\(/, context: /\b(?:createApp|mount)\b|挂载应用|挂载根组件/i },
  { code: /\bcreateRouter\s*\(/, context: /\bcreateRouter\b|\brouter\b|路由/i },
  { code: /\buseTemplateRef\s*(?:<|\()/, context: /\buseTemplateRef\b|template ref|模板引用/i },
  { code: /\buseFormControlContext\s*\(/, context: /\buseFormControlContext\b|form control|表单控件/i },
  { code: /\buse(?:Ref|Reactive|Readonly|Computed|Effect|TemplateRef)\s*(?:<|\()/, context: /\buse(?:Ref|Reactive|Readonly|Computed|Effect)\b|reactiv|响应式|计算属性|副作用/i },
  { code: /\b(?:watch|watchEffect)\s*\(/, context: /\bwatch(?:Effect)?\b|watchers?|监听器/i },
  { code: /\b(?:provide|inject)\s*\(/, context: /\b(?:provide|inject)\b|依赖注入/i },
  { code: /\bon(?:BeforeMount|Mounted|BeforeUpdate|Updated|BeforeUnmount|Unmounted|Activated|Deactivated|ErrorCaptured)\s*\(/, context: /\blifecycle|\bon(?:BeforeMount|Mounted|BeforeUpdate|Updated|BeforeUnmount|Unmounted|Activated|Deactivated|ErrorCaptured)\b|生命周期/i },
  { code: /\buse(?:Host|ShadowRoot|RenderRoot|Attrs|AppConfig|HostAttr|HostFlag|HostClass|HostCssVar|HostStyle|ScopedSlot|EventListener|ClickOutside|EscapeKey|ScrollLock|FocusTrap|ResizeObserver|IntersectionObserver|MutationObserver)\s*(?:<|\()/, context: /\buse(?:Host|ShadowRoot|RenderRoot|Attrs|AppConfig|HostAttr|HostFlag|HostClass|HostCssVar|HostStyle|ScopedSlot|EventListener|ClickOutside|EscapeKey|ScrollLock|FocusTrap|ResizeObserver|IntersectionObserver|MutationObserver)\b|host|shadow|observer|观察器|交互控制|DOM 事件/i },
];

function keyLines(language, body, context) {
  const lines = body.split("\n");
  const find = (pattern) => lines.findIndex((line) => pattern.test(line));
  const nearbyContext = context.slice(-1800);

  // Prefer the API that the surrounding section teaches. Template declarations
  // are supporting code in examples such as props, events, and local components.
  for (const api of semanticApis) {
    const line = find(api.code);
    if (line !== -1 && api.context.test(nearbyContext)) return statementRange(lines, line);
  }

  const style = find(/\bdefineStyle\s*\(\s*css`/);
  if (style !== -1) return statementRange(lines, style);

  const template = find(/\bdefineHtml\s*\(\s*html`/);
  if (template !== -1) return statementRange(lines, template);

  const primary = semanticApis.map((api) => find(api.code)).find((line) => line !== -1);
  if (primary !== undefined) return statementRange(lines, primary);

  const plugin = find(/\belfuiMacroPlugin\s*\(/);
  if (plugin !== -1) return statementRange(lines, plugin);

  if (language === "css" || language === "html") {
    const root = firstMeaningfulLine(lines);
    return root === -1 ? [] : [root + 1];
  }

  const declaration = find(/^\s*(?:export\s+)?(?:type|interface|class|function|const)\b/);
  if (declaration !== -1) return [declaration + 1];
  const fallback = firstMeaningfulLine(lines);
  return fallback === -1 ? [] : [fallback + 1];
}

function currentSectionContext(markdown, offset) {
  const preceding = markdown.slice(0, offset);
  const headings = [...preceding.matchAll(/^#{1,6}\s+.*$/gm)];
  const sectionStart = headings.at(-1)?.index ?? 0;

  // A prior example in the same page should not make a later example look as
  // though it teaches the same API. Keep the current heading and prose only.
  return preceding.slice(sectionStart).replace(/^```[^\n]*\n[\s\S]*?^```$/gm, "");
}

function addCodeHighlights(markdown) {
  return markdown.replace(/^```([^\n{}]+)(?:\{[^\n}]+\})?\n([\s\S]*?)^```$/gm, (block, rawLanguage, body, offset) => {
    const language = rawLanguage.trim();
    if (!supportedLanguages.has(language)) return block;
    const highlighted = keyLines(language, body, currentSectionContext(markdown, offset));
    return highlighted.length ? `\`\`\`${language}{${formatLines(highlighted)}}\n${body}\`\`\`` : block;
  });
}

function addContainers(markdown, locale) {
  const lines = markdown.split("\n");
  const isChinese = locale === "zh";
  const warning = isChinese ? warningZh : warningEn;
  const tip = isChinese ? tipZh : tipEn;
  const adviceHeading = isChinese ? adviceHeadingZh : adviceHeadingEn;
  let inFence = false;
  let inContainer = false;
  let nextType = null;

  return lines.map((line) => {
    if (line.startsWith("```")) {
      inFence = !inFence;
      nextType = null;
      return line;
    }
    if (inFence) return line;
    if (line.startsWith(":::")) {
      inContainer = !inContainer;
      nextType = null;
      return line;
    }
    if (inContainer || !line.trim()) return line;
    if (/^#{1,6}\s+/.test(line)) {
      nextType = adviceHeading.test(line) ? "tip" : null;
      return line;
    }
    if (/^\s*(?:[-*+] |\d+\. |\||>|<|---)/.test(line)) {
      nextType = null;
      return line;
    }

    const type = warning.test(line) ? "warning" : nextType ?? (tip.test(line) ? "tip" : null);
    nextType = null;
    if (!type) return line;
    return [`::: ${type}`, line, ":::"].join("\n");
  }).join("\n");
}

let changed = 0;
for (const root of roots) {
  for (const file of await markdownFiles(root)) {
    const original = await readFile(file, "utf8");
    const updated = addContainers(addCodeHighlights(original), root);
    if (updated !== original) {
      await writeFile(file, updated);
      changed += 1;
    }
  }
}

console.log(`Applied VitePress code highlights and containers to ${changed} documentation pages.`);
