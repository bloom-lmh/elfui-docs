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
  const end = lines.findIndex((line, index) => index >= start && /^\s*`?\);\s*$/.test(line));
  return end === -1 ? [start + 1] : Array.from({ length: end - start + 1 }, (_, index) => start + index + 1);
}

function keyLines(language, body) {
  const lines = body.split("\n");
  const find = (pattern) => lines.findIndex((line) => pattern.test(line));
  const style = find(/\bdefineStyle\s*\(\s*css`/);
  if (style !== -1) return statementRange(lines, style);

  const template = find(/\bdefineHtml\s*\(\s*html`/);
  if (template !== -1) return statementRange(lines, template);

  const primary = find(/\bcreateApp\([^\n]*\)\.mount\(|\bregisterComponents\(|\bcreateRouter\(|\belfuiMacroPlugin\(|\bdefine(?:Props|Emits|Slots|Model|Expose)\(|\buse(?:Ref|Reactive|Computed|Effect|TemplateRef)\(|\b(?:watch|watchEffect|provide|inject|onMounted|onUnmounted)\(/);
  if (primary !== -1) return [primary + 1];

  if (language === "css" || language === "html") {
    const root = firstMeaningfulLine(lines);
    return root === -1 ? [] : [root + 1];
  }

  const declaration = find(/^\s*(?:export\s+)?(?:type|interface|class|function|const)\b/);
  if (declaration !== -1) return [declaration + 1];
  const fallback = firstMeaningfulLine(lines);
  return fallback === -1 ? [] : [fallback + 1];
}

function addCodeHighlights(markdown) {
  return markdown.replace(/^```([^\n{}]+)(?:\{[^\n}]+\})?\n([\s\S]*?)^```$/gm, (block, rawLanguage, body) => {
    const language = rawLanguage.trim();
    if (!supportedLanguages.has(language)) return block;
    const highlighted = keyLines(language, body);
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
