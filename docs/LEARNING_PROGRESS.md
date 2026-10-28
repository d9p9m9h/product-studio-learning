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
  - Ternary Conditional Rendering (`? :`): mini UI source review is complete after the learner corrected the offline-message typo and removed leading whitespace from the registry ID.
- **Latest ternary code evidence:** Commit `bad4bd00b321d1bcadfe2dd6996c3246002f4c11` fixes `Your are offline.` to `You are offline.`; commit `d9c443489c4b1a9cc2f48807d9166a06fc614b03` has the resulting source tree and progress-file update. Current `components/playground/conditional-branch-preview.tsx` uses a ternary expression to show `Connected Successfully.` or `You are offline.`. The current `components/playground/registry.ts` uses the clean ID `conditional-branch`.
- **Learner's demonstrated understanding:** Earlier, correctly predicted the behavior of a false `&&` condition and identified that a whitespace-only string is not equal to the empty string. Code submitted on GitHub demonstrates the correct structure for both `&&` and ternary rendering. Independent verbal explanation of when to choose each operator remains unassessed.
- **Verification convention:** When the learner says an exercise is done and pushes it for review, assume they personally tested the preview in their browser and successfully ran `npm run typecheck` and `npm run build`, unless they explicitly say otherwise. This is the learner's agreed workflow; do not imply the assistant independently ran the browser or commands.
- **Next lesson:** TypeScript state typing — understand when `useState` can rely on inference and when an explicit union type is useful. Reuse an existing previewable component, such as the existing conditional branch or ProductForm UI. Do not ask the learner to register a new component in the Playground.
- **Next lesson assessment:** Also ask the learner to explain in their own words when they would choose `&&` versus ternary `? :`, without assuming independent conceptual mastery from code alone.
- **No Playground registration instructions:** The learner explicitly asked not to receive repeated instructions to register each lesson preview in the Playground. Future exercises should reuse an existing previewable component and leave only the lesson-specific code for the learner to change. Do not include registry-edit steps in the learner's task.

## Previous practice evidence

- React component props and children (`React.ReactNode`).
- `useState`, controlled inputs, and typed React event handlers.
- Union types and discriminated-union/type-narrowing patterns.
- Zod schemas, `z.coerce.number()`, `safeParse()`, and `z.infer`.
- Earlier practice correctly identified `ValidatedProduct['price']` as `number`. Precise distinction: `z.coerce.number()` converts runtime input and `z.infer<typeof ProductSchema>` represents the schema's inferred output type.

These demonstrate prior practice and partial understanding, not blanket independent mastery.

## Pending / not yet verified

- Independently explain when to use `&&` versus ternary `? :`.
- Understand and apply the distinction between inferred `useState` types and explicit union state types.
- Next.js architecture and Server/Client boundaries remain unassessed in the evidence reviewed so far.
- Independent transfer to a new scenario beyond the mini UI and ProductForm remains to be demonstrated.

## Teaching and continuity rules for this learner

- Teach in natural Burmese while preserving English technical terms.
- Teach one manageable concept at a time, explaining why it is needed and how it works before expanding to implementation.
- Start with a complete, previewable mini UI and leave only the current lesson's concept-specific code for the learner to change. Include necessary TSX/CSS and avoid unrelated boilerplate exercises.
- Do not provide recurring instructions to register lesson components in the Playground. Reuse an already previewable component and keep the learner focused on the target concept.
- Give a graduated hint before revealing a full exercise solution. Assess the learner's own code and explanation.
- The learner pushes completed exercises to GitHub; verify the repository's current default branch, changed files, and code instead of requiring chat paste. Verify branch and files before each review.
- When the learner pushes an exercise for review, assume they have tested the preview in their browser and successfully run both `npm run typecheck` and `npm run build`, unless they explicitly say otherwise. Do not ask for repeat confirmation. Distinguish learner-completed checks from checks the assistant independently ran.
- Keep conceptual understanding, source correctness, preview/check workflow, and independent transfer as distinct evidence categories.
- At the end of a meaningful lesson, record demonstrated learning, changed files/features, unresolved questions, remaining exercise(s), and next step. Do not infer understanding that has not been demonstrated.
- Resume with the TypeScript state-typing lesson using an existing preview. Do not restart earlier Zod/type exercises unless a concrete issue requires it.
