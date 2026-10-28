# Learning Progress

Last updated: 2026-10-29

## Session-start source locations

- **Repository:** d9p9m9h/product-studio-learning.
- **Canonical progress file:** docs/LEARNING_PROGRESS.md in the repository's current default branch. At the latest check (2026-10-28), GitHub metadata reported master as the default branch. Verify the current default branch and file state at each new session before reading or writing.
- **Course sources:** COURSE_MAP.md, LEARNING_PROTOCOL.md, and SOURCE_DATA_MAP.md are provided as ChatGPT Project Sources/uploads. Read them from the Project's available source files; do not assume they are stored in the GitHub repository or search GitHub for them unless the learner explicitly says they were added there.
- GitHub remote state does not prove the learner's local Git branch, working-tree state, or uncommitted changes.

## Current checkpoint

- **Curriculum:** Phase 2 — TypeScript Bridge for React.
- **Current lesson:** Conditional Rendering with `&&` in the mini UI and `ProductForm` — completed at the implementation/review gate. The learner pushed the ProductForm change; source review passed. Under the agreed workflow, the learner has tested the preview in their browser and run both `npm run typecheck` and `npm run build`.
- **Learner's current demonstrated understanding:**
  - Correctly predicted that the success message does not appear when uploadStatus === 'uploading', because the condition uploadStatus === 'success' is false.
  - Correctly identified that feedback !== '' is true for a whitespace-only string such as '   '.
  - Asked a useful clarification about the difference between rendering an element and displaying non-empty text.
  - Reported completing the mini exercise and pushed the implementation to GitHub.
- **Code evidence — mini UI:** Commit `7d07ace35efb56acce9a66a4a88ca42f21b4ce67` adds `components/playground/conditional-rendering-preview.tsx` and registers it in `components/playground/registry.ts`. It uses `status === 'success' && (...)` and provides idle, success, and error controls. Source review passed.
- **Code evidence — ProductForm transfer:** Commit `ea96e5a3808f17fa0b66ac256c19fa6a8d1d98ce` (message: `PHASE 2 - CONDITIONAL RENDERING`) updates `components/product-form.tsx`. It conditionally renders the feedback paragraph only when `validationStatus !== 'idle'`. The expression and surrounding JSX are syntactically coherent by source inspection and satisfy the intended `idle`-versus-feedback requirement.
- **Verification convention:** When the learner pushes an exercise and asks for review, assume they have personally tested the UI in the browser and run both npm run typecheck and npm run build, unless they explicitly say otherwise. Record these as learner-completed checks under the agreed workflow; do not imply the assistant independently ran the browser or commands.
- **Verification convention applied:** The learner reported the exercise as done and, per the agreed workflow, this means browser preview testing plus `npm run typecheck` and `npm run build` are completed on the learner's side. I reviewed GitHub source and commit diffs but did not independently execute the browser or commands.
- **Immediate next step:** Continue Phase 2 with the next small supplementary lesson: choose between `&&` and ternary conditional rendering when a UI needs either one branch or an alternative branch. Keep the current lesson marked as implemented/reviewed, without claiming an independent verbal explanation beyond the code evidence.
- **Mini UI status:** The mini UI file and registry entry are present on the default branch. The success message is guarded by status === 'success'. The UI still includes helper text saying “Exercise: Replace the placeholder with your conditional JSX expression,” even though the placeholder has been replaced; this is a small stale-copy issue, not a blocker for the conditional expression.
- **After this exercise:** The `&&` pattern was transferred from the mini UI into the real `ProductForm`; do not ask for the code to be pasted into chat. Source paths and commit were reviewed on the current default branch.

## Previous practice evidence

Previous practice/code evidence includes:
- React component props and children (React.ReactNode).
- useState, controlled inputs, and typed React event handlers.
- Union types and discriminated-union/type-narrowing patterns.
- Zod schemas, z.coerce.number(), safeParse(), and z.infer.

In earlier practice, the learner correctly identified ValidatedProduct['price'] as number. The explanation was broadly correct; the precise distinction is that z.coerce.number() converts runtime input and z.infer<typeof ProductSchema> represents the schema's inferred output type.

These are evidence of prior practice and partial understanding, not a blanket claim of independent mastery.

## Pending / not yet verified

- Next.js architecture and Server/Client boundaries remain unassessed in the evidence reviewed so far.
- Independent verbal explanation of the conditional rendering trade-off remains unassessed.
- Independent transfer to a scenario beyond the mini UI and ProductForm remains to be demonstrated.

## Teaching and continuity rules for this learner

- Teach in natural Burmese while preserving English technical terms.
- Teach one manageable concept at a time, explaining why it is needed and how it works before expanding to implementation.
- Start with a complete, previewable UI context (for example, a form, card, or mini page) that can be previewed. Include the necessary TSX, CSS, file placement, and run instructions. Then ask the learner to change only the code relevant to the current lesson.
- Do not make the learner write unrelated boilerplate or assume syntax/components that have not been taught yet. Move from mini UI practice to the real project only after the concept is understood.
- Give a graduated hint before revealing a full exercise solution. Assess the learner's own code and explanation.
- The learner will push completed exercise work to GitHub; review the pushed source from the verified current default branch rather than requiring a chat paste. Verify the branch and changed files before each review.
- **When the learner pushes an exercise for review, assume the learner has already tested the preview in their own browser and successfully run both `npm run typecheck` and `npm run build`, unless they explicitly say otherwise.** This is the default workflow convention; do not ask for repeat confirmation. Distinguish checks the learner completed from checks the assistant independently ran.
- Keep demonstrated understanding separate from syntactically correct implementation, preview/runtime verification, and independent transfer.
- At the end of a meaningful lesson, record objectives, concepts actually demonstrated, changed files/features actually verified, unresolved questions, remaining exercise(s), and next step.
- Do not mark an exercise complete until the relevant source/code review and learning objectives are reviewed. Under the agreed workflow, pushed exercises imply the learner completed browser preview testing, npm run typecheck, and npm run build; do not require them to restate those checks unless something suggests a failure.
- Resume with the next supplementary Phase 2 lesson after `&&` conditional rendering. Do not restart earlier Zod/type exercises unless a concrete issue requires it.
