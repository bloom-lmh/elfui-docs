import { css, defineHtml, defineName, defineStyle, html, useComputed, useRef } from "@elfui/core";

defineName("elf-demo-toggle");

defineStyle(css`
  :host { display: block; }

  .toggle {
    display: grid;
    place-items: center;
    gap: 18px;
    min-height: 210px;
    padding: 18px;
    border: 1px solid color-mix(in srgb, var(--vp-c-brand-1, #38bdf8) 24%, transparent);
    border-radius: 10px;
    color: var(--vp-c-text-1, #0f172a);
    background: color-mix(in srgb, var(--vp-c-bg-soft, #f1f5f9) 72%, transparent);
  }

  .state {
    margin: 0;
    color: var(--vp-c-text-2, #475569);
    font-size: 18px;
    font-weight: 700;
  }

  button {
    min-width: 148px;
    min-height: 48px;
    border: 1px solid rgba(56, 189, 248, 0.32);
    border-radius: 7px;
    color: #062031;
    background: #6dd3f3;
    font: 800 14px/1 Inter, ui-sans-serif, system-ui, sans-serif;
    cursor: pointer;
  }
`);

const enabled = useRef(true);
const state = useComputed(() => (enabled.value ? "Feature enabled" : "Feature disabled"));

const toggle = (): void => {
  enabled.set(!enabled.peek());
};

export const DemoToggle = defineHtml(html`
  <section class="toggle" aria-label="Interactive ElfUI toggle">
    <p class="state">${state}</p>
    <button type="button" @click=${toggle}>Toggle state</button>
  </section>
`);
