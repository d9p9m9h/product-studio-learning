# Learning Progress

Last updated: 2026-10-29

## Session-start source locations

- **Repository:** `d9p9m9h/product-studio-learning`.
- **Canonical progress file:** `docs/LEARNING_PROGRESS.md` in the repository's current default branch. Verify the current default branch and file state at each new session before reading or writing.
- **Course sources:** `COURSE_MAP.md`, `LEARNING_PROTOCOL.md`, and `SOURCE_DATA_MAP.md` are provided as ChatGPT Project Sources/uploads. Read them from the Project's available source files; do not assume they are stored in the GitHub repository.
- GitHub remote state does not prove the learner's local Git branch, working-tree state, or uncommitted changes.

## Current checkpoint

- **Curriculum:** Phase 2 — TypeScript Bridge for React.
- **Previous lesson:** Conditional Rendering with `&&` in the mini UI and `ProductForm` — implementation/review gate completed.
- **Current lesson:** Ternary Conditional Rendering (`? :`) — in progress. The ternary expression has passed conceptual source review, but two small source cleanup items are pending before treating the exercise as fully reviewed.
- **Learner's demonstrated understanding:** Earlier, correctly predicted the behavior of a false `&&` condition and identified that a whitespace-only string is not equal to the empty string. They also asked a useful clarification about rendering an element versus displaying non-empty text. Code now demonstrates both `&&` and ternary patterns, but independent verbal explanation of the trade-off remains unassessed.
- **Code evidence — `&&` mini UI:** Commit `7d07ace35efb56acce9a66a4a88ca42f21b4ce67` adds `components/playground/conditional-rendering-preview.tsx` and registers it in `components/playground/registry.ts`. It uses `status === 'success' && (...)` and has idle, success, and error controls.
- **Code evidence — ProductForm transfer:** Commit `ea96e5a3808f17fa0b66ac256c19fa6a8d1d98ce` updates `components/product-form.tsx` to render the feedback paragraph only when `validationStatus !== 'idle'`.
- **Code evidence — ternary mini UI:** Commit `b88c7205de63e6a56819a3ec9a3cf992ac03c4ac` adds `components/playground/conditional-branch-preview.tsx` and imports/registers it in `components/playground/registry.ts`. The expression `status === 'connected' ? (...) : (...)` correctly selects one branch for each state. Review findings: change the typo `Your are offline.` to `You are offline.`; remove the leading space in the registry ID `' conditional-branch'` so it becomes `'conditional-branch'`. Consider consistent message casing, e.g. `Connected successfully.`.
- **Verification convention:** When the learner says an exercise is done and has pushed it for review, assume they have personally tested the preview in their browser and successfully run `npm run typecheck` and `npm run build`, unless they explicitly say otherwise. These are learner-completed checks under the agreed workflow; do not imply the assistant independently ran the browser or commands.
- **Next action:** Ask the learner to fix the small source-review findings above and push the update. Do not ask them to repeat preview testing or re-confirm typecheck/build. After the fixes are reviewed, continue to the next small Phase 2 lesson.
- **No Playground registration instructions:** The learner explicitly asked not to receive repeated instructions to register each lesson preview in the Playground. Future mini UI exercises should be prepared so that the learner only changes the lesson-specific code; reuse an already available preview host/component where possible and omit registry-edit steps from learner instructions. If integration scaffolding is necessary, account for it without turning it into an unrelated learner exercise.

## Previous practice evidence

- React component props and children (`React.ReactNode`).
- `useState`, controlled inputs, and typed React event handlers.
- Union types and discriminated-union/type-narrowing patterns.
- Zod schemas, `z.coerce.number()`, `safeParse()`, and `z.infer`.
- Earlier practice correctly identified `ValidatedProduct['price']` as `number`. Precise distinction: `z.coerce.number()` converts runtime input and `z.infer<typeof ProductSchema>` represents the schema's inferred output type.

These demonstrate prior practice and partial understanding, not blanket independent mastery.

## Pending / not yet verified

- Fix the offline-message typo and leading whitespace in the new registry ID, then push for review.
- Independently explain when to use `&&` versus ternary `? :`.
- Next.js architecture and Server/Client boundaries remain unassessed in the evidence reviewed so far.
- Independent transfer to a new scenario beyond the mini UI and ProductForm remains to be demonstrated.

## Teaching and continuity rules for this learner

- Teach in natural Burmese while preserving English technical terms.
- Teach one manageable concept at a time, explaining why it is needed and how it works before expanding to implementation.
- Start with a complete, previewable mini UI and leave only the current lesson's concept-specific code for the learner to change. Include necessary TSX/CSS and avoid unrelated boilerplate exercises.
- Do not provide recurring instructions to register lesson components in the Playground. Arrange the mini UI so the target code is directly editable in an existing preview setup, where possible.
- Give a graduated hint before revealing a full exercise solution. Assess the learner's own code and explanation.
- The learner pushes completed exercises to GitHub; verify the repository's current default branch, changed files, and code instead of requiring chat paste. Verify branch and files before each review.
- When the learner pushes an exercise for review, assume they have tested the preview in their browser and successfully run both `npm run typecheck` and `npm run build`, unless they explicitly say otherwise. Do not ask for repeat confirmation. Distinguish learner-completed checks from checks the assistant independently ran.
- Keep conceptual understanding, source correctness, preview/check workflow, and independent transfer as distinct evidence categories.
- At the end of a meaningful lesson, record demonstrated learning, changed files/features, unresolved questions, remaining exercise(s), and next step. Do not infer understanding that has not been demonstrated.
- Resume at the current Ternary Conditional Rendering exercise; do not restart earlier Zod/type exercises unless a concrete issue requires it.
