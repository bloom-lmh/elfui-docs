import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const roots = ["en", "zh"];
const supportedLanguages = new Set(["ts", "tsx", "js", "jsx", "html", "css", "json", "bash", "sh"]);
const keyCode = /\b(import|export|defineHtml|defineStyle|defineName|createApp|createRouter|registerComponents|useRef|useComputed|useEffect|watch|provide|inject|defineProps|defineEmits|defineSlots|defineExpose|return)\b|@(?:click|input|change)|v-(?:if|for|model)|:\w+=/;
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

function addCodeHighlights(markdown) {
  return markdown.replace(/^```([^\n{}]+)\n([\s\S]*?)^```$/gm, (block, rawLanguage, body) => {
    const language = rawLanguage.trim();
    if (!supportedLanguages.has(language)) return block;
    const lines = body.split("\n");
    const significant = lines
      .map((line, index) => ({ line, number: index + 1 }))
      .filter(({ line }) => line.trim() && !line.trim().startsWith("//") && !line.trim().startsWith("<!--"));
    if (!significant.length) return block;

    const highlighted = significant
      .filter(({ line }) => keyCode.test(line))
      .map(({ number }) => number)
      .slice(0, 4);
    if (!highlighted.length) highlighted.push(significant[0].number);
    return `\`\`\`${language}{${formatLines(highlighted)}}\n${body}\`\`\``;
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
