# Product Studio - React Component Playground

A focused workspace for exploring and interacting with React components and learning examples, built with Next.js App Router and TypeScript.

## What is included now

- Next.js App Router with TypeScript.
- A searchable, category-grouped component Playground at `/` with persistent selection and preview reset.
- Reusable previews for rendering, interactions, forms, UI primitives, and data display.
- A controlled Product Form preview using React `useState`, `value`, and `onChange`.
- A typed `Product`, `ProductStatus` union, and `ProductDraft` data contract in `lib/products.ts`.
- A component registry containing labels, categories, and short descriptions for each preview.
- Responsive styles, preview error handling, and a light/dark theme toggle.

## Requirements

- Node.js 20.9 or later (current Next.js App Router installation guidance).
- npm.

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000> to use the Playground. The selected component and theme are saved in localStorage.

Useful verification commands:

```bash
npm run typecheck
npm run build
```

The dependencies use the npm `latest` tag so the install resolves current releases at install time. After the first install, keep `package-lock.json` in version control for reproducible installs.

## Current learning milestone

**Phase 2 - TypeScript bridge for React.** Inspect `components/product-form.tsx`:

1. `name` and `price` are controlled by separate React state values.
2. Both raw inputs remain strings, including a numeric-looking price such as `49.99`.
3. `ProductDraft` describes raw form input; `Product` describes the trusted domain shape where `price` is a number.
4. The next exercise is to use `zod` to validate the draft, show success/error feedback, and only then create typed `Product` data. That validation logic is intentionally not pre-written in this starter.

## Progressive roadmap

The project will grow in small, reviewable milestones that match the learning path. Only mark a milestone complete after the learner can explain it and demonstrate it in code.

### Phase 2 - React + TypeScript + Zod bridge

- Complete runtime validation for the current product form.
- Use `z.infer` to derive the output type from the schema.
- Type component props and form-related state; use a union for idle/success/error feedback.
- Read and fix an intentional TypeScript mismatch.
- Verify with `npm run typecheck` and manual browser testing.

### Phase 3 - Official Next.js Dashboard App course

The official Next.js Dashboard App is still the primary guided course for this phase. This Product Studio is a companion/capstone project, not a substitute for that course. When the course reaches each topic, transfer the concept to this app as a separate lesson:

- App Router layouts, pages, links, styling, and metadata.
- PostgreSQL data setup and server-side fetching.
- Static/dynamic rendering and loading/streaming states.
- URL-driven search and pagination.
- Server Actions or the current recommended mutation pattern, validation, redirects, and revalidation.
- Error boundaries and not-found handling.
- Accessibility and authentication/authorization.

### Phase 4 - Independent capstone and verification

- Replace mock-only data with persistent data and complete create/read/update/delete flows.
- Add targeted tests after the relevant feature is understood.
- Keep secrets server-only, document environment variables, and explain authentication versus authorization.
- Verify primary user flows, type checking, build, error cases, and deploy with a short README and known limitations.

## Project structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  product-form.tsx
  playground/
    playground.tsx
    registry.ts
lib/
  products.ts
```

## Official references

- Next.js installation: https://nextjs.org/docs/app/getting-started/installation
- React + TypeScript: https://react.dev/learn/typescript
- Zod basic usage and type inference: https://zod.dev/basics
- Next.js Dashboard App course: https://nextjs.org/learn/dashboard-app

Add or update examples in `components/playground/registry.ts`.
