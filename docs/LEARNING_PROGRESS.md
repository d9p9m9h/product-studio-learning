# Learning Progress

Last updated: 2026-10-29

## Session-start source locations

- **Repository:** `d9p9m9h/product-studio-learning`.
- **Canonical progress file:** `docs/LEARNING_PROGRESS.md` in the repository's current default branch. Verify the current default branch and file state at each new session before reading or writing.
- **Course sources:** `COURSE_MAP.md`, `LEARNING_PROTOCOL.md`, and `SOURCE_DATA_MAP.md` are provided as ChatGPT Project Sources/uploads. Read them from the Project's available source files; do not assume they are stored in the GitHub repository.
- GitHub remote state does not prove the learner's local Git branch, working-tree state, or uncommitted changes.

## Current checkpoint

- **Curriculum:** Phase 2 — TypeScript Bridge for React.
- **Completed implementation/review gates:**
  - Conditional Rendering with `&&`: mini UI plus transfer to `components/product-form.tsx`.
  - Ternary Conditional Rendering (`? :`): source review passed after the learner fixed the offline message typo and registry ID whitespace.
  - TypeScript state typing — union state extension: source review passed for adding `connecting` to `ConnectionStatus` and adding a matching ternary message branch.
- **Latest code evidence:** Commit `cc747fc961325a4a1a80e067d3f9a304f3142763` updates `components/playground/conditional-branch-preview.tsx`. The type is now `'connected' | 'disconnected' | 'connecting'`, and the ternary renders `Connecting...` for the new state. The component remains registered in the existing Playground; no new registration guidance should be given to the learner.
- **Review note:** The connecting button uses `variant={status === 'connecting' ? 'ghost' : 'ghost'}`. This is valid but redundant because both branches are `'ghost'`; replace it with `variant="ghost"` when convenient. This does not block the exercise requirement.
- **Learner's demonstrated understanding:** Earlier, correctly predicted the behavior of a false `&&` condition and identified that a whitespace-only string is not equal to the empty string. GitHub code now demonstrates correct `&&` and ternary patterns, and demonstrates extending a string union for another UI state. The learner has not yet independently explained why a union type constrains values or when `&&` is preferable to ternary.
- **Verification convention:** When the learner says an exercise is done and pushes it for review, assume they personally tested the preview in their browser and successfully ran `npm run typecheck` and `npm run build`, unless they explicitly say otherwise. This is the learner's agreed workflow; do not imply the assistant independently ran the browser or commands.
- **Next teaching step:** Briefly assess the concept in the learner's own words: why add `'connecting'` to `ConnectionStatus` rather than use an unrestricted `string`, and when choose `&&` versus ternary. Then continue Phase 2 with everyday TypeScript in React based on the learner's response.
- **No Playground registration instructions:** The learner explicitly asked not to receive repeated instructions to register each lesson preview in the Playground. Future exercises should reuse an existing previewable component and leave only the lesson-specific code for the learner to change.

## Previous practice evidence

- React component props and children (`React.ReactNode`).
- `useState`, controlled inputs, and typed React event handlers.
- Union types and discriminated-union/type-narrowing patterns.
- Zod schemas, `z.coerce.number()`, `safeParse()`, and `z.infer`.
- Earlier practice correctly identified `ValidatedProduct['price']` as `number`. Precise distinction: `z.coerce.number()` converts runtime input and `z.infer<typeof ProductSchema>` represents the schema's inferred output type.

These demonstrate prior practice and partial understanding, not blanket independent mastery.

## Pending / not yet verified

- Independently explain why `ConnectionStatus` should be a union and when to use `&&` versus ternary `? :`.
- Move on to the next everyday TypeScript / React topic after the short concept check.
- Next.js architecture and Server/Client boundaries remain unassessed.
- Independent transfer to a scenario beyond the mini UI and ProductForm remains to be demonstrated.

## Teaching and continuity rules for this learner

- Teach in natural Burmese while preserving English technical terms.
- Teach one manageable concept at a time; explain why before implementation.
- Start with a complete, previewable mini UI and leave only the current lesson's concept-specific code for the learner to change. Avoid unrelated boilerplate.
- Do not provide recurring instructions to register lesson components in the Playground. Reuse an already previewable component.
- Give a graduated hint before revealing a full exercise solution. Assess the learner's own code and explanation.
- The learner pushes completed exercises to GitHub; verify the current default branch, changed files, and code instead of requiring chat paste.
- When the learner pushes an exercise for review, assume they tested the preview in their browser and successfully ran both `npm run typecheck` and `npm run build`, unless they explicitly say otherwise. Do not ask for repeat confirmation. Distinguish learner-completed checks from checks the assistant independently ran.
- Keep conceptual understanding, source correctness, preview/check workflow, and independent transfer as separate evidence categories.
- At the end of a meaningful lesson, record demonstrated learning, changed files/features, unresolved questions, remaining exercises, and next step. Do not infer understanding that has not been demonstrated.
- Resume from the current TypeScript state-typing concept check. Do not restart earlier Zod/type exercises unless a concrete issue requires it.
