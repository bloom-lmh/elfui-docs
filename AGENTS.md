# ElfUI Official Docs

## Scope

This repository is the official documentation site for ElfUI.

- Framework source: `E:\dev_projects\elfui`
- Language tools and VS Code extension: `E:\dev_projects\elfui-official\elfui-language-tools`
- Do not modify either repository when working on this site unless the user explicitly asks.

## Language policy

- English is the primary documentation at `/en/`.
- Simplified Chinese is the complete translation at `/zh/`.
- Keep matching pages on equivalent English paths whenever a Chinese page is translated.
- Do not place bilingual prose in one document. Keep code examples shared in meaning and translate surrounding explanation.

## Dependencies and commands

- Use `pnpm`.
- Install application APIs from `@elfui/core`.
- Install the macro compiler as `@elfui/vite-plugin`.
- Run `pnpm build` before handing off a change.

## Website conventions

- Keep the top navigation limited to Home, API, and the language switcher.
- The homepage should prioritize the brand hero and compiler pipeline; avoid adding promotional sections without a clear documentation purpose.
- Use conventional commits for documentation changes.
