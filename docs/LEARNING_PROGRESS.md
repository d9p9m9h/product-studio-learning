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
- **Learner's demonstrated understanding:** Correctly explained that a plain `string` can accept arbitrary strings, while `ConnectionStatus` as a string-literal union restricts the state to the listed values. Earlier, correctly predicted a false `&&` condition and identified that a whitespace-only string is not equal to the empty string. GitHub code demonstrates correct `&&`, ternary, and union-state patterns. Independent verbal explanation of when to choose `&&` versus ternary remains unassessed.
- **Verification convention:** When the learner says an exercise is done and pushes it for review, assume they personally tested the preview in their browser and successfully ran `npm run typecheck` and `npm run build`, unless they explicitly say otherwise. This is the learner's agreed workflow; do not imply the assistant independently ran the browser or commands.
- **Next teaching step:** Start the Phase 2 Assessment Gate in a new chat. Do not start another lesson or repeat teaching by default. Run an adaptive, evidence-based assessment based on the Phase 2 criteria in `COURSE_MAP.md` and relevant entries in `SOURCE_DATA_MAP.md`.
- **Phase 2 planning estimate:** Based on the eight topics and assessment gates in `COURSE_MAP.md`, plan for approximately 3–5 focused mini-lessons/checkpoints, assuming the existing prior-practice evidence holds up during quick checks. This is an estimate by lesson checkpoints, not a calendar promise; add practice if a gap appears.
- **Phase 3 transition warning:** Before changing the curriculum to Phase 3, explicitly tell the learner that Phase 2 is nearing completion, summarize any remaining readiness checks, and give the learner a chance to review or ask questions. Do not silently switch phases. Move to Phase 3 only after the Phase 2 readiness gate is met and the transition has been communicated.
- **No Playground registration instructions:** The learner explicitly asked not to receive repeated instructions to register each lesson preview in the Playground. Future exercises should reuse an existing previewable component and leave only the lesson-specific code for the learner to change.

## Previous practice evidence

- React component props and children (`React.ReactNode`).
- `useState`, controlled inputs, and typed React event handlers.
- Union types and discriminated-union/type-narrowing patterns.
- Zod schemas, `z.coerce.number()`, `safeParse()`, and `z.infer`.
- Earlier practice correctly identified `ValidatedProduct['price']` as `number`. Precise distinction: `z.coerce.number()` converts runtime input and `z.infer<typeof ProductSchema>` represents the schema's inferred output type.

These demonstrate prior practice and partial understanding, not blanket independent mastery.

## Pending / not yet verified

- Explain when to use `&&` versus ternary `? :` in their own words.
- Understand and explain `useState` inference versus an explicit union type; inspect inferred types using the editor.
- Briefly verify object types, optional props, and `type`/`interface` as needed; existing prior practice is evidence of exposure but not blanket mastery.
- Demonstrate reading a TypeScript error and fixing a type mismatch without suppressing it.
- Revisit Zod's runtime validation versus TypeScript's compile-time checking before Phase 3, as required by `SOURCE_DATA_MAP.md`.
- Introduce generics briefly when encountered, without expanding into advanced type manipulation.
- Complete the Phase 2 assessment gate: explain inferred and union types, resolve a type error, and explain why TypeScript types alone do not validate arbitrary runtime input.
- Next.js architecture and Server/Client boundaries remain Phase 3 topics and are not a prerequisite to completing the TypeScript bridge.
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
- Warn the learner explicitly before the transition from Phase 2 to Phase 3; summarize readiness and remaining checks before progressing.
- Resume from the current TypeScript state-typing concept check. Do not restart earlier Zod/type exercises unless a concrete issue requires it.
 conditional rendering and ternary branch selection appear in valid JSX; a status union was extended with `connecting`; learner explained that a plain `string` accepts arbitrary strings while a string-literal union restricts allowed values.
  - **Project evidence / prior practice, mastery not automatically implied:** component props and `React.ReactNode` children, `useState`, controlled input state, typed React handlers, Zod `safeParse()`, `z.coerce.number()`, and `z.infer`.
  - **Needs a quick diagnostic before deciding whether to reteach:** primitive/object/array/function types; `type` vs `interface`; optional properties and component props; `useState` inference vs explicit union type; type narrowing; event-handler inference; reading VS Code hover/Problems and fixing compiler errors; brief generic type use.
  - **Mandatory Phase 2 gate evidence:** (1) model props, state, events, and common data shapes without using `any` as a shortcut; (2) explain one inferred type and one union type; (3) diagnose and fix a real or intentionally introduced type mismatch without suppressing the check; (4) explain that TypeScript checks types at development/build time but does not validate arbitrary external input at runtime; (5) explain and apply Zod runtime parsing at a basic level. Include a modest narrowing/generics check because `SOURCE_DATA_MAP.md` calls out narrowing and generics before the Phase 3 dynamic-routing material; do not expand into advanced type manipulation.
- **Suggested adaptive gate sequence:** A. Explain `useState(0)` vs an explicit union state type; B. read a compact typed props/object example, including an optional field; C. reason about a union and narrow it safely; D. fix a small TypeScript error; E. distinguish a TypeScript type from Zod runtime validation; F. identify what a simple generic represents if the earlier checks support proceeding. This is a sequence guide, not a rigid quiz; skip demonstrated items and slow down only where evidence shows a gap.
- **Pass rule:** Do not pass based on code merely existing in GitHub. Pass when the learner can explain key concepts and produce/adapt a small correct solution, including at least one type-error diagnosis and the compile-time/runtime validation distinction. Record unresolved items honestly.
- **Phase 3 transition:** Before switching, explicitly warn the learner that Phase 2 is nearing completion, summarize assessment results and remaining gaps, answer questions, and only then propose starting Phase 3. Never switch phases silently.
