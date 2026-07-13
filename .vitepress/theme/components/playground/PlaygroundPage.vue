<template>
  <main class="playground-page">
    <header class="playground-header">
      <div>
        <p>ELFUI PLAYGROUND</p>
        <h1>{{ isZh ? "演练场" : "Playground" }}</h1>
        <span>
          {{
            isZh
              ? "编辑宏组件源码，浏览器中的 Worker 编译后交给隔离预览运行。"
              : "Edit a macro component, compile it in a browser Worker, then run it in an isolated preview."
          }}
        </span>
      </div>

      <div class="playground-actions" aria-label="Playground actions">
        <button
          v-for="preset in presets"
          :key="preset.id"
          type="button"
          :class="{ active: activePreset === preset.id }"
          @click="loadPreset(preset.id)"
        >
          {{ preset.title }}
        </button>
        <button type="button" @click="copyShareLink">{{ shareLabel ?? (isZh ? "复制链接" : "Copy link") }}</button>
        <button type="button" class="run-button" @click="compileNow">
          {{ isZh ? "运行" : "Run" }}
        </button>
      </div>
    </header>

    <section class="playground-workspace">
      <article class="editor-panel">
        <div class="panel-bar"><span></span><span></span><span></span><b>Playground.elf.ts</b></div>
        <div ref="editorRoot" class="editor-root"></div>
      </article>

      <article class="preview-panel">
        <div class="panel-bar preview-bar">
          <b>{{ isZh ? "隔离预览" : "Isolated preview" }}</b>
          <span :class="['status', status]">{{ statusLabel }}</span>
        </div>
        <iframe
          v-if="previewOrigin"
          :key="previewKey"
          ref="previewFrame"
          class="preview-frame"
          :src="previewUrl"
          sandbox="allow-scripts allow-same-origin"
          title="ElfUI playground preview"
        ></iframe>
      </article>
    </section>

    <section class="diagnostics-panel" aria-live="polite">
      <div>
        <p>DIAGNOSTICS</p>
        <h2>{{ diagnostics.length ? (isZh ? "编译诊断" : "Compiler diagnostics") : (isZh ? "准备就绪" : "Ready to run") }}</h2>
      </div>
      <ul v-if="diagnostics.length">
        <li v-for="diagnostic in diagnostics" :key="`${diagnostic.code}-${diagnostic.line}-${diagnostic.column}`">
          <b>{{ diagnostic.code }}</b>
          <span v-if="diagnostic.line">{{ diagnostic.line }}:{{ diagnostic.column ?? 1 }}</span>
          <p>{{ diagnostic.message }}</p>
        </li>
      </ul>
      <p v-else class="diagnostics-empty">
        {{
          isZh
            ? "从 Counter 或 Toggle 开始，修改代码后会自动编译。"
            : "Start from Counter or Toggle. Your edits compile automatically."
        }}
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
import { drawSelection, EditorView, highlightActiveLine, keymap, lineNumbers } from "@codemirror/view";
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useData } from "vitepress";

import type { CompileResponse, PlaygroundDiagnostic, PreviewStatusMessage } from "./protocol";
import { playgroundPresets } from "./presets";
import { readPlaygroundState, serializePlaygroundState } from "./state";

const { lang } = useData();
const isZh = computed(() => lang.value.startsWith("zh"));
const presets = playgroundPresets;
const activePreset = ref<(typeof playgroundPresets)[number]["id"]>();
const diagnostics = ref<PlaygroundDiagnostic[]>([]);
const editorRoot = ref<HTMLElement | null>(null);
const previewFrame = ref<HTMLIFrameElement | null>(null);
const previewKey = ref(0);
const previewOrigin = ref("");
const status = ref<"compiling" | "error" | "ready">("compiling");
const shareLabel = ref<string>();

let editor: EditorView | undefined;
let worker: Worker | undefined;
let debounce: number | undefined;
let requestId = 0;
let pendingPreview: Extract<CompileResponse, { code?: string }> | undefined;
let loadingPreset = false;

const previewUrl = computed(() => `${previewOrigin.value}${import.meta.env.BASE_URL}en/playground/preview?run=${previewKey.value}`);
const statusLabel = computed(() => {
  if (status.value === "compiling") return isZh.value ? "编译中" : "Compiling";
  if (status.value === "error") return isZh.value ? "错误" : "Error";
  return isZh.value ? "已运行" : "Running";
});

const editorTheme = EditorView.theme({
  "&": { height: "100%", color: "#dcecff", backgroundColor: "#07111f" },
  ".cm-scroller": { fontFamily: '"JetBrains Mono", ui-monospace, Consolas, monospace', fontSize: "13px", lineHeight: "1.7" },
  ".cm-gutters": { border: "0", color: "#527086", backgroundColor: "#07111f" },
  ".cm-activeLineGutter": { backgroundColor: "rgba(56, 189, 248, .08)" },
  ".cm-activeLine": { backgroundColor: "rgba(56, 189, 248, .06)" },
  ".cm-cursor, .cm-dropCursor": { borderLeftColor: "#38bdf8" },
  ".cm-selectionBackground, .cm-focused .cm-selectionBackground": { backgroundColor: "rgba(56, 189, 248, .22)" }
});

const source = () => editor?.state.doc.toString() ?? "";

const syncHash = () => {
  const url = new URL(window.location.href);
  url.hash = serializePlaygroundState({ presetId: activePreset.value, source: source() });
  window.history.replaceState({}, "", url);
};

const scheduleCompile = () => {
  if (debounce) window.clearTimeout(debounce);
  debounce = window.setTimeout(compileNow, 360);
};

const compileNow = () => {
  if (!worker) return;
  requestId += 1;
  status.value = "compiling";
  diagnostics.value = [];
  worker.postMessage({
    id: requestId,
    source: source(),
    tagPrefix: `elf-play-${requestId}`,
    type: "compile"
  });
};

const loadPreset = (id: (typeof playgroundPresets)[number]["id"]) => {
  const preset = playgroundPresets.find((candidate) => candidate.id === id);
  if (!preset || !editor) return;
  loadingPreset = true;
  activePreset.value = id;
  editor.dispatch({ changes: { from: 0, insert: preset.source, to: editor.state.doc.length } });
  loadingPreset = false;
};

const copyShareLink = async () => {
  syncHash();
  try {
    await navigator.clipboard.writeText(window.location.href);
    shareLabel.value = isZh.value ? "已复制" : "Copied";
  } catch {
    shareLabel.value = isZh.value ? "链接已更新" : "Link updated";
  }
  window.setTimeout(() => { shareLabel.value = undefined; }, 1400);
};

const receiveCompile = async ({ data }: MessageEvent<CompileResponse>) => {
  if (data.type !== "compiled" || data.id !== requestId) return;
  diagnostics.value = data.diagnostics;

  if (!data.code || !data.components || data.diagnostics.some((diagnostic) => diagnostic.severity === "error")) {
    status.value = "error";
    return;
  }

  pendingPreview = data;
  previewKey.value += 1;
  await nextTick();
};

const reportWorkerFailure = (message: string) => {
  status.value = "error";
  diagnostics.value = [{ code: "ELF_PLAYGROUND_WORKER", message, severity: "error" }];
};

const sendPreview = () => {
  if (!pendingPreview?.code || !pendingPreview.components) return;
  previewFrame.value?.contentWindow?.postMessage(
    {
      code: pendingPreview.code,
      components: pendingPreview.components,
      id: pendingPreview.id,
      type: "elfui-playground:run"
    },
    previewOrigin.value
  );
};

const receivePreview = ({ data, origin, source: messageSource }: MessageEvent<PreviewStatusMessage>) => {
  if (origin !== previewOrigin.value || messageSource !== previewFrame.value?.contentWindow || data.id !== requestId) return;
  if (data.type === "elfui-playground:host-ready") {
    sendPreview();
    return;
  }
  status.value = data.type === "elfui-playground:ready" ? "ready" : "error";
  if (data.type === "elfui-playground:error") {
    diagnostics.value = [{ code: "ELF_PLAYGROUND_RUNTIME", message: data.message ?? "Preview failed", severity: "error" }];
  }
};

onMounted(() => {
  const configuredOrigin = import.meta.env.VITE_PLAYGROUND_PREVIEW_ORIGIN?.replace(/\/$/, "");
  const localPreviewOrigin = `${window.location.protocol}//127.0.0.1:${window.location.port}`;
  previewOrigin.value = configuredOrigin || (import.meta.env.DEV ? localPreviewOrigin : "");

  if (!previewOrigin.value || previewOrigin.value === window.location.origin) {
    status.value = "error";
    diagnostics.value = [
      {
        code: "ELF_PLAYGROUND_ORIGIN",
        message: "Configure VITE_PLAYGROUND_PREVIEW_ORIGIN with an isolated preview origin.",
        severity: "error"
      }
    ];
    return;
  }

  worker = new Worker(new URL("./compiler.worker.ts", import.meta.url), { type: "module" });
  worker.addEventListener("message", receiveCompile);
  worker.addEventListener("error", (event) => {
    reportWorkerFailure(event.message || "The compiler Worker could not start.");
  });
  worker.addEventListener("messageerror", () => {
    reportWorkerFailure("The compiler Worker returned an unreadable response.");
  });
  window.addEventListener("message", receivePreview);

  const restoredState = readPlaygroundState(window.location.hash);
  const restoredPreset = restoredState?.presetId
    ? presets.find((preset) => preset.id === restoredState.presetId && preset.source === restoredState.source)
    : undefined;
  activePreset.value = restoredPreset?.id;

  editor = new EditorView({
    parent: editorRoot.value ?? undefined,
    state: EditorState.create({
      doc: restoredState?.source ?? playgroundPresets[0].source,
      extensions: [
        lineNumbers(),
        drawSelection(),
        highlightActiveLine(),
        javascript({ typescript: true }),
        keymap.of([...defaultKeymap, indentWithTab]),
        editorTheme,
        EditorView.updateListener.of((update) => {
          if (!update.docChanged) return;
          if (!loadingPreset) activePreset.value = undefined;
          syncHash();
          scheduleCompile();
        })
      ]
    })
  });

  compileNow();
});

onBeforeUnmount(() => {
  if (debounce) window.clearTimeout(debounce);
  worker?.terminate();
  editor?.destroy();
  window.removeEventListener("message", receivePreview);
});
</script>

<style scoped src="./PlaygroundPage.css"></style>
