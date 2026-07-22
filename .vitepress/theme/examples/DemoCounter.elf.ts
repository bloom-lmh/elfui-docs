import { defineHtml, defineName, defineStyle, useComputed, useRef } from "@elfui/core";

defineName("elf-demo-counter");

defineStyle(`
  :host {
    display: block;
    color: var(--vp-c-text-1, #0f172a);
  }

  .demo {
    display: grid;
    grid-template-columns: minmax(240px, 0.9fr) minmax(260px, 1.1fr);
    gap: 18px;
    padding: 18px;
    border: 1px solid color-mix(in srgb, var(--vp-c-brand-1, #38bdf8) 24%, transparent);
    border-radius: 16px;
    background:
      radial-gradient(circle at 20% 10%, rgba(56, 189, 248, 0.18), transparent 38%),
      color-mix(in srgb, var(--vp-c-bg-soft, #f1f5f9) 72%, transparent);
    box-shadow: none;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  .preview {
    display: grid;
    min-height: 220px;
    place-items: center;
    gap: 14px;
    border-radius: 12px;
    background:
      linear-gradient(145deg, rgba(8, 47, 73, 0.08), rgba(56, 189, 248, 0.1)),
      rgba(255, 255, 255, 0.08);
  }

  .chip {
    padding: 5px 10px;
    border: 1px solid rgba(56, 189, 248, 0.22);
    border-radius: 999px;
    color: var(--vp-c-brand-1, #0284c7);
    background: rgba(56, 189, 248, 0.1);
    font-size: 12px;
    font-weight: 760;
  }

  .counter {
    display: grid;
    min-width: 150px;
    place-items: center;
    gap: 6px;
    padding: 18px 22px;
    border: 1px solid rgba(56, 189, 248, 0.28);
    border-radius: 14px;
    color: #04111f;
    background: linear-gradient(135deg, #7dd3fc, #22d3ee);
    box-shadow: 0 18px 34px rgba(14, 165, 233, 0.26);
    cursor: pointer;
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;
  }

  .counter:hover {
    transform: translateY(-2px);
    box-shadow: 0 24px 42px rgba(14, 165, 233, 0.32);
  }

  .counter span {
    font-size: 42px;
    font-weight: 820;
    line-height: 1;
  }

  .counter b {
    font-size: 14px;
  }

  .preview p,
  .meta p {
    margin: 0;
    color: var(--vp-c-text-2, #475569);
  }

  .meta {
    align-self: center;
  }

  .meta h3 {
    margin: 0 0 10px;
    color: var(--vp-c-text-1, #0f172a);
    font-size: 21px;
    line-height: 1.3;
  }

  .reset {
    margin-top: 18px;
    padding: 8px 13px;
    border: 1px solid rgba(56, 189, 248, 0.28);
    border-radius: 8px;
    color: var(--vp-c-brand-1, #0284c7);
    background: rgba(56, 189, 248, 0.1);
    cursor: pointer;
  }

  @media (max-width: 720px) {
    .demo {
      grid-template-columns: 1fr;
    }
  }
`);

const count = useRef(0);
const tone = useComputed(() => {
  if (count.value >= 8) return "Only this text node updates.";
  if (count.value >= 4) return "One state read, one fine-grained update.";
  return "Click to update native DOM state.";
});

const increment = (): void => {
  count.set(count.peek() + 1);
};

const reset = (): void => {
  count.set(0);
};

export const DemoCounter = defineHtml(`
  <section class="demo" aria-label="Interactive ElfUI counter">
    <div class="preview">
      <div class="chip">native ElfUI component</div>
      <button class="counter" type="button" @click=${increment}>
        <span>${count}</span>
        <b>Increment</b>
      </button>
      <p>${tone}</p>
    </div>
    <div class="meta">
      <h3>Run a native ElfUI component</h3>
      <p>
        This is a native Custom Element compiled from <code>defineHtml(&#96;...&#96;)</code>. The docs page
        only renders an <code>&lt;elf-demo-counter&gt;</code> tag.
      </p>
      <button class="reset" type="button" @click=${reset}>Reset</button>
    </div>
  </section>
`);
