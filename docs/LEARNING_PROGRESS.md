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
- Phase 2 Assessment Gate was completed in chat on 2026-10-29. Tasks A–H passed for the specific concepts assessed; see evidence summary below.
- Phase 2 is recorded as completed for the assessment criteria demonstrated here. Do not start Phase 3 automatically; summarize results and ask the learner whether they are ready to proceed.

## Phase 2 Assessment Gate — passed

### Source of truth

- Assessment used Phase 2 purpose, topic order, deliverable, and assessment criteria from Project Source `COURSE_MAP.md`.
- Relevant Project Source map entries: TypeScript/React TypeScript/Next.js TypeScript docs; Zod basic usage and type inference; VS Code type hover, Problems, and debugging; TypeScript Handbook narrowing and generics.
- Official curriculum requirements were kept distinct from supplementary exercises. Generics and the operator-choice task stayed brief and practical.

### Verified assessment evidence

- **A — Hook inference and explicit union state: demonstrated.** Explained inference from `useState(0)` and independently wrote `useState<'idle' | 'loading' | 'success'>('idle')`.
- **B — Object/props types and optional properties: demonstrated.** Independently wrote `ProductCardProps` with `name: string`, `price: number`, and `subtitle?: string`; explained omitted optional props and a `string`/`number` mismatch. Used `type` successfully; detailed comparative trade-offs between `type` and `interface` were not deeply tested.
- **C — Union narrowing: demonstrated.** Implemented a `switch (state.status)` over a discriminated union and explained why branch-specific properties are available only in the matching branch.
- **D — Compiler error and root-cause repair: demonstrated.** Identified that `toUpperCase()` is a string method used on a number; first proposed a compiling conversion, then independently refined the solution to `price.toFixed(2)` to match the intended price-formatting behavior.
- **E — TypeScript vs Zod runtime validation: demonstrated.** Explained compile-time types versus untrusted runtime JSON and wrote a Zod `safeParse()` flow, using `result.data` only in the success branch. Clarified that validation guarantees only the rules expressed by the schema.
- **F — Generics: demonstrated at a basic level.** Explained `T` as a generic type parameter, distinguished generic typing from `any`, and correctly identified `string | undefined` as the return type for the string-array example.
- **G — Conditional rendering: demonstrated.** Independently wrote `message && <p>{message}</p>` for conditional presence and a ternary for loading/ready branches, with appropriate reasoning about UI behavior rather than only condition count.
- **H — React event-handler and children typing: demonstrated.** Independently defined `value: string`, `onChange: (event: ChangeEvent<HTMLInputElement>) => void`, and `children: ReactNode`; explained the input event relationship and why React children can include multiple renderable content types.
- **Evidence limitation:** The learner's note that the event type prevents possible nulls was imprecise. The type primarily describes the event and input element relationship for compile-time checking; it is not a runtime null guard.
- **Earlier repository code remains implementation evidence only; assessment credit is based on the learner's own explanations and independently authored snippets in this chat.**

### Gate outcome

- Phase 2 assessment criteria covered in this gate: props, state, events, common primitive/object/array/function shapes, type inference, union types, narrowing, optional properties, compiler error diagnosis, simple generics, conditional rendering choices, and the compile-time/runtime validation distinction with Zod.
- **Assessment status: PASSED.** This records demonstrated performance for the Phase 2 assessment, not a claim that every advanced TypeScript topic is mastered.
- Follow-up practice, not a blocker to this gate: compare `type` and `interface` in a broader set of examples; refine the distinction between static event typing and runtime safety.
- Do not infer browser preview, `npm run typecheck`, or `npm run build` results from this chat; no such checks were independently run by the assistant for this assessment.
- GitHub remote state does not establish local working tree or uncommitted changes.

## Phase 3 transition rule

Before starting Phase 3, explicitly warn the learner and summarize this assessment result, demonstrated objectives, and follow-up practice items. Answer the learner's questions and ask whether they are ready to proceed. Never switch phases silently.

## Phase 3 setup preparation — planned, not started

### Course and architecture decisions

- Primary curriculum: current official Next.js Dashboard App course, https://nextjs.org/learn/dashboard-app, using its current live chapter order 1–15.
- Start from the official course starter, not a blank `create-next-app` template: `https://github.com/vercel/next-learn/tree/main/dashboard/starter-example`.
- Course command documented by Next.js (use a dedicated local directory name): `npx create-next-app@latest nextjs-dashboard-learning --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm`.
- Keep the starter's root-level `app/` structure (not `src/app`), with course folders such as `app/lib`, `app/ui`, and root `public/` plus configuration files. Do not refactor into a custom architecture or add unrelated libraries before the course calls for them.
- Use `pnpm` consistently, as recommended in the official course; preserve the starter's `pnpm-lock.yaml`. Do not mix npm/yarn lockfiles or run package upgrades without a course-related reason.
- Recommended Node runtime: Node.js 24 LTS for a stable course environment. Official Next.js course minimum listed at research time is Node.js 20.9 or later; verify official requirements again at setup if the official docs change.
- Recommended new code repository: `nextjs-dashboard-learning`, separate from this learning-workspace/progress repository. Initially create it as an empty private GitHub repository (no generated README/license/gitignore), then connect and push the local course starter. Check whether the generated local directory already has a Git repository and branch before running any `git init` or branch-changing command.
- Keep `product-studio-learning/docs/LEARNING_PROGRESS.md` as the canonical progress record; do not put the tutorial app in that repository.
- Vercel account is needed by the official course; only create/link deployment and database resources when the course reaches Chapter 6. Current course instructions use a Postgres integration available via Vercel marketplace (provider options may include Neon or Supabase) and the starter's `postgres` SQL client. Do not pre-add Docker/Postgres or Prisma as a separate architecture before the relevant course chapter.
- The live official authentication chapter currently refers to Next.js Proxy and a root `proxy.ts`; older source-map wording says Middleware. Explain this naming/official-doc difference at that lesson rather than relying on stale terminology.
- Source-map note says Chapter 15 may be optional, but both the Course Map and current live official Dashboard App course include Adding Metadata as Chapter 15. Follow the Course Map/live official course and include Chapter 15 unless the learner later explicitly chooses to skip it.

### Setup status (not completed yet)

- No local VS Code project has been created or inspected in this conversation.
- No new GitHub course repository has been created or connected yet.
- No Node/npm/pnpm/Git version outputs have been verified yet.
- No local dev server, typecheck, build, Vercel deployment, or database has been run by the assistant.
- New chat should begin with the setup gate, not Chapter 1. First read the latest default-branch progress plus the Project Source files, recheck the live official course and requirements, then guide one setup step at a time.
- Initial local verification to request from learner: `node -v`, `npm -v`, `pnpm -v`, and `git --version`. Do not assume versions, OS/shell, local Git state, or that the learner already created the repo.
- Once local starter runs, inspect its initial Git state, create/connect the empty GitHub repo, push an initial checkpoint, verify the remote files, and confirm a clean enough working state before starting lesson content.
- Only mark setup steps completed when the learner provides command output or an observable GitHub state; GitHub remote cannot prove local uncommitted changes.

## Teaching rules

- Teach in natural Burmese; preserve English technical terms.
- One manageable concept at a time; explain why before how.
- Use a complete, previewable mini UI or an existing project component. Avoid unrelated boilerplate.
- Do not require code paste in chat when GitHub push is available; verify default branch and changed files on each review.
- At meaningful lesson endings, record demonstrated concepts, changed files, unresolved items, remaining exercises, and next step.
- Phase 2 assessment has passed. Present the results and ask for explicit readiness before starting Phase 3.
