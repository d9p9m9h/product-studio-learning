# Learning Progress

Last updated: 2026-10-29

## Canonical sources and workflow

- Repository: `d9p9m9h/product-studio-learning`; verify current default branch and file state each session.
- Canonical progress: `docs/LEARNING_PROGRESS.md` on the current default branch.
- `COURSE_MAP.md`, `LEARNING_PROTOCOL.md`, and `SOURCE_DATA_MAP.md` are Project Sources/uploads, not assumed to be repository files.
- GitHub remote does not confirm local working tree or uncommitted changes.
- When the learner says an exercise is done and pushes it for review, assume they tested in their browser and successfully ran `npm run typecheck` and `npm run build`, unless they say otherwise. Do not ask them to repeat these checks. Distinguish learner-completed checks from checks the assistant independently ran.
- Do not give recurring instructions to register lesson previews in the Playground. Reuse existing previewable components; have the learner change only the lesson-specific code.

## Current checkpoint

- Curriculum: Phase 2 — TypeScript Bridge for React.
- Conditional rendering with `&&`: mini UI and transfer to `components/product-form.tsx` reviewed.
- Ternary rendering (`? :`): `components/playground/conditional-branch-preview.tsx` reviewed after fixing the offline-message typo and registry ID whitespace.
- Union state extension: same preview now supports `'connected' | 'disconnected' | 'connecting'`; matching ternary branch reviewed.
- Learner explained that unrestricted `string` allows arbitrary strings, while a string-literal union restricts allowed values. This is demonstrated conceptual understanding.
- Small non-blocking cleanup: in `conditional-branch-preview.tsx`, `variant={status === 'connecting' ? 'ghost' : 'ghost'}` can be simplified to `variant="ghost"`.
- Prior practice evidence (not blanket mastery): React props/children (`React.ReactNode`), `useState`, controlled inputs, typed event handlers, Zod `safeParse()`, `z.coerce.number()`, and `z.infer`.
- Next action: start the Phase 2 Assessment Gate in a new chat. Do not teach a new lesson first or repeat previously taught material by default.

## Phase 2 Assessment Gate — prepared, not yet attempted

### Source of truth

- Use Phase 2 purpose, topic order, deliverable, and assessment criteria from Project Source `COURSE_MAP.md`.
- Use `SOURCE_DATA_MAP.md` relevant entries for TypeScript/React TypeScript/Next.js TypeScript docs; Zod basic usage and type inference; VS Code type hover, Problems, and debugging; TypeScript Handbook narrowing and generics.
- Preserve the distinction between official course criteria and supplementary exercises. The source map identifies basic narrowing and generics as relevant before Phase 3 dynamic-routing material; keep this brief and practical, not advanced type theory.

### Provisional evidence matrix

- **Demonstrated:** conditional `&&` and ternary JSX patterns in project code; adding a state to a union; explaining `string` versus a string-literal union.
- **Practice/code evidence to validate quickly:** component props/children, `useState`, controlled input state, typed event handlers, Zod parsing and inferred output types.
- **Not yet demonstrated in this current assessment context:** `useState` inference versus explicit types; object/array/function types as applied independently; optional props and `type` vs `interface`; narrowing explanation; reading and fixing a compiler error; generic type basics; explaining the `&&` versus ternary trade-off; TypeScript compile-time checking versus runtime input validation.

### Mandatory gate

Learner should be able to:
1. Model component props, state, events, and common data shapes without using `any` as a shortcut.
2. Explain an inferred type and a union type using code examples.
3. Read and fix a TypeScript type mismatch without suppressing the error.
4. Explain that TypeScript checks types during development/build but does not validate arbitrary runtime input.
5. Explain and apply basic Zod runtime parsing; distinguish raw input from validated/inferred output.
6. Demonstrate basic union narrowing, and explain a simple generic at a practical level if the earlier checks indicate readiness.

### Assessment method

- Begin with one manageable question/task, without a hint.
- Do not reveal the full solution before the learner attempts it; offer graduated hints if needed.
- Use answers, code, and explanations as evidence; mark each item demonstrated, partial, or unassessed.
- Skip items already demonstrated by reliable evidence, but validate prior-practice topics briefly rather than assuming mastery.
- Do not pass just because related code exists in GitHub. Pass on concept explanation plus a small independent/adapted implementation, type-error diagnosis, and the compile-time/runtime validation distinction.
- At the end, update this progress record with verified results and unresolved gaps.

### Suggested adaptive order

1. `useState(0)` inference versus explicit union state type.
2. Compact props/object example with an optional property; choose `type` or `interface`.
3. Union narrowing in a UI-state example.
4. Diagnose and repair a small TypeScript error.
5. Distinguish TypeScript types from Zod runtime validation.
6. Briefly interpret a simple generic if needed.
7. Check when to use `&&` versus ternary `? :`.
This is a guide, not a rigid quiz; adapt or skip based on demonstrated evidence.

## Phase 3 transition rule

Before moving to Phase 3, explicitly warn the learner that Phase 2 is nearing completion, summarize the assessment results and remaining gaps, answer questions, and ask whether they are ready to proceed. Never switch phases silently.

## Teaching rules

- Teach in natural Burmese; preserve English technical terms.
- One manageable concept at a time; explain why before how.
- Use a complete, previewable mini UI or an existing project component. Avoid unrelated boilerplate.
- Do not require code paste in chat when GitHub push is available; verify default branch and changed files on each review.
- At meaningful lesson endings, record demonstrated concepts, changed files, unresolved items, remaining exercises, and next step.
- Resume with the assessment gate in the next chat; do not resume the unfinished `useState` inference lesson first.
