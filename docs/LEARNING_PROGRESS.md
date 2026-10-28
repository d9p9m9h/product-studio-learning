# Learning Progress

Last updated: 2026-10-28

## Session-start source locations

- **Repository:** `d9p9m9h/product-studio-learning`.
- **Canonical progress file:** `docs/LEARNING_PROGRESS.md` in the repository's current default branch. At the last check (2026-10-28), the GitHub repository metadata reported `master` as the default branch. Verify the current default branch and file state at each new session before reading or writing.
- **Course sources:** `COURSE_MAP.md`, `LEARNING_PROTOCOL.md`, and `SOURCE_DATA_MAP.md` are provided as ChatGPT Project Sources/uploads. Read them from the Project's available source files; do not assume they are stored in the GitHub repository or search GitHub for them unless the learner explicitly says they were added there.
- GitHub remote state does not prove the learner's local Git branch, working-tree state, or uncommitted changes.

## Current checkpoint

- **Curriculum:** Phase 2 — TypeScript Bridge for React.
- **Current lesson:** Conditional Rendering with `&&` — in progress, not completed.
- **Learner's current demonstrated understanding:**
  - Correctly predicted that the success message does not appear when `uploadStatus === 'uploading'`, because the condition `uploadStatus === 'success'` is false.
  - Correctly identified that `feedback !== ''` is `true` for a whitespace-only string such as `'   '`.
  - Asked a useful clarification about the difference between rendering an element and displaying non-empty text.
- **Code evidence / limitation:** The learner attempted the conditional JSX, but the first attempt used an `if` statement in the JSX expression and had a malformed closing tag. A later attempt used `upload status` instead of the declared variable name `uploadStatus`. A fully valid implementation has not yet been demonstrated.
- **Immediate next step:** Continue with a self-contained, previewable mini UI for Conditional Rendering. Supply the complete surrounding TSX and CSS, file structure, and run/preview instructions. Leave only the lesson-specific conditional JSX as the learner's exercise. Do not require the learner to invent unrelated component structure, state handling, or styling.
- **Mini UI verification target:** The UI should let the learner change the status among `idle`, `success`, and `error`. The success message should appear only for `success`; it should not appear for `idle` or `error`. Ask the learner to test and report the observed preview behavior. No mini-UI file creation or runtime verification is confirmed by this progress record.
- **After the mini exercise:** Review the learner's code and reasoning. Once the conditional expression is valid and its behavior is explained/verified, apply the concept to the existing project's `ProductForm`, after inspecting the current file and route structure. Run `npm run typecheck` and `npm run build` when available, and record only checks that were actually run.

## Previous practice evidence

Previous practice/code evidence includes:
- React component props and `children` (`React.ReactNode`).
- `useState`, controlled inputs, and typed React event handlers.
- Union types and discriminated-union/type-narrowing patterns.
- Zod schemas, `z.coerce.number()`, `safeParse()`, and `z.infer`.

In earlier practice, the learner correctly identified `ValidatedProduct['price']` as `number`. The explanation was broadly correct; the precise distinction is that `z.coerce.number()` converts runtime input and `z.infer<typeof ProductSchema>` represents the schema's inferred output type.

These are evidence of prior practice and partial understanding, not a blanket claim of independent mastery.

## Pending / not yet verified

- Write a syntactically correct conditional JSX expression using `&&` in the mini UI.
- Test `idle`, `success`, and `error` in the preview and explain the observed rendering.
- Apply the pattern in `ProductForm` after the mini exercise is demonstrated.
- Run and record relevant project checks when available.
- Next.js architecture and Server/Client boundaries remain unassessed in the evidence reviewed so far.
- Independent transfer to a new scenario remains to be demonstrated.

## Teaching and continuity rules for this learner

- Teach in natural Burmese while preserving English technical terms.
- Teach one manageable concept at a time, explaining why it is needed and how it works before expanding to implementation.
- **Start with a complete, working UI context** (for example, a form, card, or mini page) that can be previewed. Include the necessary TSX, CSS, file placement, and run instructions. Then ask the learner to change only the code relevant to the current lesson.
- Do not make the learner write unrelated boilerplate or assume syntax/components that have not been taught yet. Move from mini UI practice to the real project only after the concept is understood.
- Give a graduated hint before revealing a full exercise solution. Assess the learner's own code and explanation.
- Keep demonstrated understanding separate from syntactically correct implementation, preview/runtime verification, and independent transfer.
- At the end of a meaningful lesson, record objectives, concepts actually demonstrated, changed files/features actually verified, unresolved questions, remaining exercise(s), and next step.
- Do not mark an exercise complete before the learner attempts it and the relevant evidence is reviewed.
- Resume at the current Conditional Rendering exercise. Do not restart earlier Zod/type exercises unless a concrete issue requires it.
