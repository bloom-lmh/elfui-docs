export interface PlaygroundDiagnostic {
  code: string;
  column?: number;
  line?: number;
  message: string;
  severity: "error" | "warning";
}

export interface PlaygroundComponent {
  exportName: string;
  name: string;
}

export interface CompileRequest {
  id: number;
  source: string;
  tagPrefix: string;
  type: "compile";
}

export interface CompileResponse {
  code?: string;
  components?: PlaygroundComponent[];
  diagnostics: PlaygroundDiagnostic[];
  id: number;
  type: "compiled";
}

export interface PreviewRunMessage {
  code: string;
  components: PlaygroundComponent[];
  id: number;
  type: "elfui-playground:run";
}

export interface PreviewStatusMessage {
  id: number;
  message?: string;
  type: "elfui-playground:error" | "elfui-playground:host-ready" | "elfui-playground:ready";
}
