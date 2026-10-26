# Learning Plan — Product Studio

This project is the learner's implementation workspace. It complements the official course sequence; it does not replace Next.js React Foundations or the official Dashboard App course.

## Milestone status

| Milestone | Status | Evidence required before marking complete |
|---|---|---|
| Environment and project scaffold | Scaffold created; local install/build unverified | Run `npm install`, start dev server, open all routes |
| React controlled form | Starter code included | Explain state → event → re-render and modify both fields independently |
| TypeScript data contracts | Starter model included | Explain `ProductDraft` vs `Product`, inferred types, and `ProductStatus` union |
| Zod runtime validation | Not implemented yet | Write schema, `safeParse` input, show success/error state, explain coercion and output type |
| Typed form assessment | Not passed yet | Use props, state, events, and Zod together without relying on a fixed payload |
| Official Next.js Dashboard App | Not started in this project | Complete the official course in its intended sequence and explain its request/data flow |
| Data persistence and mutation | Future | Server-side database reads and writes with invalid-input/error handling |
| Search and pagination | Future | URL-driven state and server-side filtering/pagination |
| Accessibility, auth, and deployment | Future | Accessible form/navigation, explain auth vs authorization, verify and deploy |

## Teaching rule

Implement only the next small feature. First explain the reason and data flow; then implement; then verify; finally ask the learner to explain the relevant decision. Do not mark a milestone done from generated starter code alone.

## Current feature boundary

`components/product-form.tsx` currently demonstrates React controlled inputs and a live preview. `price` remains a string. The next lesson will add a Zod schema and runtime validation. The app does not yet save data, connect a database, search, paginate, or authenticate users.
