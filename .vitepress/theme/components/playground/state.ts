export interface PlaygroundState {
  presetId?: string;
  source: string;
}

const encodeBase64Url = (value: string): string => {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
};

const decodeBase64Url = (value: string): string => {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  return new TextDecoder().decode(Uint8Array.from(binary, (character) => character.charCodeAt(0)));
};

export const serializePlaygroundState = (state: PlaygroundState): string => {
  const payload: PlaygroundState = { source: state.source };
  if (state.presetId) payload.presetId = state.presetId;
  return `code=${encodeBase64Url(JSON.stringify(payload))}`;
};

export const readPlaygroundState = (hash: string): PlaygroundState | undefined => {
  const encoded = new URLSearchParams(hash.replace(/^#/, "")).get("code");
  if (!encoded) return undefined;

  try {
    const state = JSON.parse(decodeBase64Url(encoded)) as Partial<PlaygroundState>;
    if (typeof state.source !== "string") return undefined;
    return {
      source: state.source,
      ...(typeof state.presetId === "string" ? { presetId: state.presetId } : {})
    };
  } catch {
    return undefined;
  }
};

export const createPlaygroundHref = (route: string, state: PlaygroundState): string =>
  `${route}#${serializePlaygroundState(state)}`;
