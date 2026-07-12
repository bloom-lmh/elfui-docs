/// <reference lib="webworker" />

import { compileMacroComponent } from "@elfui/compiler/macro-component";
import ts from "typescript";

import type { CompileRequest, CompileResponse, PlaygroundDiagnostic } from "./protocol";

const scope = self as DedicatedWorkerGlobalScope;

const toDiagnostic = (diagnostic: {
  code: string;
  column?: number;
  line?: number;
  message: string;
  severity: "error" | "warning";
}): PlaygroundDiagnostic => ({
  code: diagnostic.code,
  ...(diagnostic.column ? { column: diagnostic.column } : {}),
  ...(diagnostic.line ? { line: diagnostic.line } : {}),
  message: diagnostic.message,
  severity: diagnostic.severity
});

scope.onmessage = ({ data }: MessageEvent<CompileRequest>) => {
  if (data.type !== "compile") return;

  try {
    const compiled = compileMacroComponent(data.source, {
      filename: "Playground.elf.ts",
      macroImport: "@elfui/core",
      tagPrefix: data.tagPrefix,
      // The released macro compiler's template type-check host uses Node path APIs.
      // Keep the browser worker to syntax/macro diagnostics; editor type-checking lives in Language Tools.
      templateTypeCheck: false
    });
    const diagnostics = compiled.diagnostics.map(toDiagnostic);

    if (diagnostics.some((diagnostic) => diagnostic.severity === "error")) {
      const response: CompileResponse = { diagnostics, id: data.id, type: "compiled" };
      scope.postMessage(response);
      return;
    }

    const transpiled = ts.transpileModule(compiled.code, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022
      },
      reportDiagnostics: true
    });
    const transpileDiagnostics = (transpiled.diagnostics ?? []).map((diagnostic) => ({
      code: `TS${diagnostic.code}`,
      message: ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
      severity: "error" as const
    }));
    const response: CompileResponse = {
      code: transpiled.outputText,
      components: compiled.components.map(({ exportName, name }) => ({ exportName, name })),
      diagnostics: [...diagnostics, ...transpileDiagnostics],
      id: data.id,
      type: "compiled"
    };

    scope.postMessage(response);
  } catch (error) {
    const response: CompileResponse = {
      diagnostics: [
        {
          code: "ELF_PLAYGROUND_COMPILE",
          message: error instanceof Error ? error.message : String(error),
          severity: "error"
        }
      ],
      id: data.id,
      type: "compiled"
    };
    scope.postMessage(response);
  }
};
