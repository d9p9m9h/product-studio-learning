# Learning Progress

Last updated: 2026-10-27

## Current checkpoint

- **Curriculum:** Phase 2 — TypeScript Bridge for React.
- **Completed checkpoint:** Learning covered before the current Conditional Rendering lesson.
- **Current lesson:** Conditional Rendering — not completed yet.
- **Immediate next exercise:** Write JSX that displays `Upload complete!` only when `uploadStatus === 'success'`, using conditional rendering with `&&`.
- **Next project step:** Apply the concept in the project's `ProductForm`, then verify with `npm run typecheck` and `npm run build` when available.

## Evidence seen so far

Previous practice/code evidence includes:
- React component props and `children` (`React.ReactNode`).
- `useState`, controlled inputs, and typed React event handlers.
- Union types and discriminated-union/type-narrowing patterns.
- Zod schemas, `z.coerce.number()`, `safeParse()`, and `z.infer`.

In this chat, the learner correctly identified `ValidatedProduct['price']` as `number`. The explanation was broadly correct; the precise distinction is that `z.coerce.number()` converts the runtime input and `z.infer<typeof ProductSchema>` represents the schema's inferred output type.

These are evidence of prior practice and partial understanding, not a blanket claim of independent mastery.

## Pending / not yet verified

- Complete the Conditional Rendering `&&` exercise.
- Explain why the conditional JSX displays content only when the condition is truthy.
- Apply the pattern in `ProductForm` and verify the project checks.
- Next.js architecture and Server/Client boundaries remain unassessed in the evidence reviewed so far.
- Independent transfer to a new scenario remains to be demonstrated.

## Teaching rule for the next session

Resume at the Conditional Rendering exercise above. Do not restart earlier Zod/type exercises unless a concrete issue requires revisiting them. Assess one manageable concept at a time and do not mark an exercise complete before the learner attempts it.
