import { readFile, writeFile } from "node:fs/promises";

const config = await readFile(new URL("../.vitepress/config.ts", import.meta.url), "utf8");

const linksFor = (name, locale) => {
  const start = config.indexOf(`const ${name}`);
  const end = config.indexOf("\n];", start);
  if (start === -1 || end === -1) throw new Error(`Cannot read ${name} from the VitePress config.`);
  return [...config.slice(start, end).matchAll(new RegExp(`"(/${locale}/[^"]+)"`, "g"))].map(([, link]) => link);
};

const englishLinks = linksFor("englishSidebar", "en");
const chineseLinks = linksFor("zhSidebar", "zh");
if (englishLinks.length !== chineseLinks.length) throw new Error("English and Chinese sidebars must contain the same number of pages.");
const chineseToEnglishPath = new Map(chineseLinks.map((link, index) => [link, englishLinks[index]]));

const containsChinese = (text) => /[\u3400-\u9fff]/.test(text);

async function translate(text) {
  if (!containsChinese(text)) return text;
  const protectedParts = [];
  const protectedText = text.replace(/```[\s\S]*?```|`[^`\n]+`|https?:\/\/[^\s)]+|(?<=\]\()\/[^\s)]+/g, (part) => {
    const token = `ZXQPROTECT${protectedParts.length}QXZ`;
    protectedParts.push(chineseToEnglishPath.get(part) ?? part);
    return token;
  });
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", "zh-CN");
  url.searchParams.set("tl", "en");
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", protectedText);
  let response;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    response = await fetch(url);
    if (response.ok) break;
    await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
  }
  if (!response?.ok) throw new Error(`Translation request failed with ${response?.status}.`);
  const data = await response.json();
  return data[0]
    .map(([value]) => value)
    .join("")
    .replace(/ZXQPROTECT(\d+)QXZ/g, (_, index) => protectedParts[Number(index)]);
}

function frontmatter(markdown) {
  const match = markdown.match(/^---\n[\s\S]*?\n---\n?/);
  return match?.[0] ?? "";
}

function splitMarkdownLine(line) {
  const match = line.match(/^(\s*(?:#{1,6}\s+|>\s?|[-*+]\s+|\d+[.)]\s+)?)(.*)$/);
  return [match[1], match[2]];
}

const pages = await Promise.all(englishLinks.map(async (englishLink, index) => {
  const chineseLink = chineseLinks[index];
  const [englishPath, chinesePath] = [englishLink, chineseLink].map((link) => new URL(`..${link}.md`, import.meta.url));
  const [english, chinese] = await Promise.all([readFile(englishPath, "utf8"), readFile(chinesePath, "utf8")]);
  return { englishPath, english, chinese };
}));

const sourceLines = new Set();
for (const { chinese } of pages) {
  let inFence = false;
  for (const line of chinese.slice(frontmatter(chinese).length).split("\n")) {
    if (line.startsWith("```")) inFence = !inFence;
    if (!inFence) {
      const [, content] = splitMarkdownLine(line);
      if (containsChinese(content)) sourceLines.add(content);
    }
  }
}

const translations = new Map();
const lines = [...sourceLines];
let cursor = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (cursor < lines.length) {
    const line = lines[cursor++];
    translations.set(line, await translate(line));
  }
}));

for (const { englishPath, english, chinese } of pages) {
  let inFence = false;
  const translatedBody = chinese.slice(frontmatter(chinese).length).split("\n").map((line) => {
    if (line.startsWith("```")) {
      inFence = !inFence;
      return line;
    }
    if (inFence) return line;
    const [prefix, content] = splitMarkdownLine(line);
    return `${prefix}${translations.get(content) ?? content}`;
  }).join("\n").trim();
  await writeFile(englishPath, `${frontmatter(english)}${translatedBody}\n`);
}

console.log(`Translated ${englishLinks.length} English documentation pages from their Chinese source pages.`);
