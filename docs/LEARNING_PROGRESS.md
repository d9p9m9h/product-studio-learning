# Learning Progress

Last updated: 2026-10-28

## Session-start source locations

- **Repository:** d9p9m9h/product-studio-learning.
- **Canonical progress file:** docs/LEARNING_PROGRESS.md in the repository's current default branch. At the latest check (2026-10-28), GitHub metadata reported master as the default branch. Verify the current default branch and file state at each new session before reading or writing.
- **Course sources:** COURSE_MAP.md, LEARNING_PROTOCOL.md, and SOURCE_DATA_MAP.md are provided as ChatGPT Project Sources/uploads. Read them from the Project's available source files; do not assume they are stored in the GitHub repository or search GitHub for them unless the learner explicitly says they were added there.
- GitHub remote state does not prove the learner's local Git branch, working-tree state, or uncommitted changes.

## Current checkpoint

- **Curriculum:** Phase 2 — TypeScript Bridge for React.
- **Current lesson:** Conditional Rendering with && — in progress; the conditional JSX implementation has passed source review, but browser/runtime verification has not been independently confirmed.
- **Learner's current demonstrated understanding:**
  - Correctly predicted that the success message does not appear when uploadStatus === 'uploading', because the condition uploadStatus === 'success' is false.
  - Correctly identified that feedback !== '' is true for a whitespace-only string such as '   '.
  - Asked a useful clarification about the difference between rendering an element and displaying non-empty text.
  - Reported completing the mini exercise and pushed the implementation to GitHub.
- **Code evidence:** Commit 7d07ace35efb56acce9a66a4a88ca42f21b4ce67 (message: PHASE 2 CONDITIONAL JSX) adds components/playground/conditional-rendering-preview.tsx and registers it in components/playground/registry.ts. The current source contains a valid condition, status === 'success' && (<p>Upload completed successfully.</p>), and provides idle, success, and error status controls. The expression matches the intended conditional-rendering behavior by code inspection.
- **Verification boundary:** I reviewed the source on GitHub. I did not run the app in a browser or run npm run typecheck / npm run build, so preview behavior and build checks are not independently verified.
- **Immediate next step:** Ask the learner to test the pushed mini UI for idle, success, and error, and confirm the observed results. Run npm run typecheck and npm run build when available. Only after the mini UI behavior and relevant checks are confirmed should the pattern be applied to ProductForm.
- **Mini UI status:** The mini UI file and registry entry are present on the default branch. The success message is guarded by status === 'success'. The UI still includes helper text saying “Exercise: Replace the placeholder with your conditional JSX expression,” even though the placeholder has been replaced; this is a small stale-copy issue, not a blocker for the conditional expression.
- **After the mini exercise:** Review the learner's GitHub-pushed code instead of requiring them to paste it into chat. Once preview behavior is confirmed, inspect the current ProductForm and route structure before making any change. Record only checks that were actually run.

## Previous practice evidence

Previous practice/code evidence includes:
- React component props and children (React.ReactNode).
- useState, controlled inputs, and typed React event handlers.
- Union types and discriminated-union/type-narrowing patterns.
- Zod schemas, z.coerce.number(), safeParse(), and z.infer.

In earlier practice, the learner correctly identified ValidatedProduct['price'] as number. The explanation was broadly correct; the precise distinction is that z.coerce.number() converts runtime input and z.infer<typeof ProductSchema> represents the schema's inferred output type.

These are evidence of prior practice and partial understanding, not a blanket claim of independent mastery.

## Pending / not yet verified

- Confirm in the browser that the message is hidden for idle and error and visible for success.
- Run npm run typecheck and npm run build, then record their actual outcomes.
- Apply the conditional rendering pattern in ProductForm only after the mini UI gate is complete.
- Next.js architecture and Server/Client boundaries remain unassessed in the evidence reviewed so far.
- Independent transfer to a new scenario remains to be demonstrated.

## Teaching and continuity rules for this learner

- Teach in natural Burmese while preserving English technical terms.
- Teach one manageable concept at a time, explaining why it is needed and how it works before expanding to implementation.
- Start with a complete, previewable UI context (for example, a form, card, or mini page) that can be previewed. Include the necessary TSX, CSS, file placement, and run instructions. Then ask the learner to change only the code relevant to the current lesson.
- Do not make the learner write unrelated boilerplate or assume syntax/components that have not been taught yet. Move from mini UI practice to the real project only after the concept is understood.
- Give a graduated hint before revealing a full exercise solution. Assess the learner's own code and explanation.
- The learner will push completed exercise work to GitHub; review the pushed source from the verified current default branch rather than requiring a chat paste. Verify the branch and changed files before each review.
- Keep demonstrated understanding separate from syntactically correct implementation, preview/runtime verification, and independent transfer.
- At the end of a meaningful lesson, record objectives, concepts actually demonstrated, changed files/features actually verified, unresolved questions, remaining exercise(s), and next step.
- Do not mark an exercise complete before the relevant evidence is reviewed. A source-correct implementation does not by itself prove browser verification or successful build checks.
- Resume at the current Conditional Rendering exercise. Do not restart earlier Zod/type exercises unless a concrete issue requires it.
