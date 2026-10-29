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
- Union state extension: same preview supports `'connected' | 'disconnected' | 'connecting'`; matching ternary branch reviewed.
- Learner explained that unrestricted `string` allows arbitrary strings, while a string-literal union restricts allowed values. This is demonstrated conceptual understanding.
- Small non-blocking cleanup remains in `conditional-branch-preview.tsx`: `variant={status === 'connecting' ? 'ghost' : 'ghost'}` can be simplified to `variant="ghost"`.
- Prior practice evidence (not blanket mastery): React props/children (`React.ReactNode`), `useState`, controlled inputs, typed event handlers, Zod `safeParse()`, `z.coerce.number()`, and `z.infer`.
- Current assessment progress: Tasks A–G attempted in this chat. Each passed for the specified concept/code task. One brief diagnostic on typed React event handlers and `children` remains before the gate can be closed.
- Phase 2 is not yet recorded as completed. Do not start Phase 3 automatically.

## Phase 2 Assessment Gate — A–G attempted; H pending

### Source of truth

- Use Phase 2 purpose, topic order, deliverable, and assessment criteria from Project Source `COURSE_MAP.md`.
- Use `SOURCE_DATA_MAP.md` relevant entries for TypeScript/React TypeScript/Next.js TypeScript docs; Zod basic usage and type inference; VS Code type hover, Problems, and debugging; TypeScript Handbook narrowing and generics.
- Preserve the distinction between official course criteria and supplementary exercises. The source map identifies basic narrowing and generics as relevant before Phase 3 dynamic-routing material; keep this brief and practical, not advanced type theory.

### Verified assessment evidence

- **A — Hook inference and explicit union state: demonstrated.** Explained inference from `useState(0)` and independently wrote `useState<'idle' | 'loading' | 'success'>('idle')`.
- **B — Object/props types and optional properties: demonstrated.** Independently wrote `ProductCardProps` with `name: string`, `price: number`, and `subtitle?: string`; explained omitted optional props and a `string`/ `number` mismatch. The relative trade-offs between `type` and `interface` were not compared in depth.
- **C — Union narrowing: demonstrated.** Implemented a `switch (state.status)` over a discriminated union and explained why branch-specific properties are available only in the matching branch.
- **D — Compiler error and root-cause repair: demonstrated.** Identified that `toUpperCase()` is a string method used on a number; first proposed a compiling conversion, then independently refined the solution to `price.toFixed(2)` to match the intended price-formatting behavior.
- **E — TypeScript vs Zod runtime validation: demonstrated.** Explained compile-time types versus untrusted runtime JSON and wrote a Zod `safeParse()` flow, using `result.data` only in the success branch. Clarified that validation guarantees only the rules expressed by the schema.
- **F — Generics: demonstrated at a basic level.** Explained `T` as a generic type parameter, distinguished generic typing from `any`, and correctly identified `string | undefined` as the return type for the string-array example.
- **G — Conditional rendering: demonstrated.** Independently wrote `message && <p>{message}</p>` for conditional presence and a ternary for loading/ready branches, with appropriate reasoning.
- **Earlier repository code is implementation evidence only; it is not treated as proof of mastery on its own.**
- **Not yet independently validated in this assessment:** typed React event-handler contracts and explicit `children` typing. Prior practice is recorded but is not treated as blanket mastery.

### Gate status and remaining validation

- Tasks A–G above are passed for the specific concepts assessed.
- Before closing the full Phase 2 gate, give one short integrated diagnostic covering typed event-handler props and `children` in a React component.
- Do not mark Phase 2 completed until this remaining check and the gate criteria are reviewed.
- Do not infer browser preview, `npm run typecheck`, or `npm run build` results from this chat; no such checks were independently run by the assistant for this assessment.
- GitHub remote state does not establish local working tree or uncommitted changes.

### Assessment method

- Give one manageable task at a time and begin without hints.
- Use conceptual reasoning and independent code as evidence; offer graduated hints only if needed.
- Keep official course criteria distinct from supplementary exercises.
- At the end, update this record with verified results, remaining gaps, and next steps.

## Phase 3 transition rule

Before moving to Phase 3, explicitly warn the learner that Phase 2 is nearing completion, summarize the assessment results and remaining gaps, answer questions, and ask whether they are ready to proceed. Never switch phases silently.

## Teaching rules

- Teach in natural Burmese; preserve English technical terms.
- One manageable concept at a time; explain why before how.
- Use a complete, previewable mini UI or an existing project component. Avoid unrelated boilerplate.
- Do not require code paste in chat when GitHub push is available; verify default branch and changed files on each review.
- At meaningful lesson endings, record demonstrated concepts, changed files, unresolved items, remaining exercises, and next step.
- Resume with Task H: a brief diagnostic for typed React event-handler props and `children`. After reviewing that result, summarize the full Phase 2 gate and ask the learner before beginning Phase 3.
