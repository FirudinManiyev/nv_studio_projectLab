# Decision Board Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a validated, accessible, Azerbaijani and fully responsive redesign of Decision Board.

**Architecture:** Keep the current component boundaries, add one pure validation/storage utility, and let the existing hook remain the persistence boundary. UI components consume validated data and share global design tokens and motion rules from `src/index.css`.

**Tech Stack:** React 19, TypeScript 6, Vite 8, Tailwind CSS 4, Lucide React, Vitest, jsdom, React Testing Library

**Spec:** `docs/superpowers/specs/2026-09-10-decision-board-refresh-design.md`

## Global Constraints

- Keep the existing `Decision` interface and `decision-board-decisions` storage key.
- Preserve the user's `README.md` changes and do not commit automatically.
- Use Azerbaijani for all user-facing and accessible copy.
- Accept 3–120 characters for questions, 2–8 options and 1–60 characters per option.
- Support 320 px mobile screens and `prefers-reduced-motion`.

---

### Task 1: Test infrastructure and pure decision validation

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/utils/decisionValidation.ts`
- Test: `src/utils/decisionValidation.test.ts`

**Interfaces:**
- Produces: `validateDecisionDraft(question: string, options: string[]): ValidationResult`
- Produces: `parseStoredDecisions(value: string | null): Decision[] | null`

- [x] Write table-driven failing tests for whitespace normalization, question bounds, option bounds, duplicate detection and malformed persisted data.
- [x] Run `npm test -- --run src/utils/decisionValidation.test.ts` and confirm failure because the module is missing.
- [x] Implement typed validation results and strict stored-decision guards.
- [x] Re-run the focused tests and confirm they pass.

### Task 2: Safe persistence boundary

**Files:**
- Modify: `src/hooks/useDecisions.ts`
- Test: `src/hooks/useDecisions.test.tsx`

**Interfaces:**
- Consumes: `parseStoredDecisions(value)` from Task 1.
- Produces: existing `useDecisions()` contract with guarded reads and writes.

- [x] Write failing hook tests for malformed storage fallback and storage write exceptions.
- [x] Run the focused hook tests and confirm the unguarded implementation fails.
- [x] Use parsed storage only when valid and contain storage write exceptions.
- [x] Re-run the focused hook tests and confirm they pass.

### Task 3: Azerbaijani form validation and dialog behavior

**Files:**
- Modify: `src/components/decisions/DecisionForm.tsx`
- Modify: `src/components/ui/ConfirmDialog.tsx`
- Test: `src/components/decisions/DecisionForm.test.tsx`
- Test: `src/components/ui/ConfirmDialog.test.tsx`

**Interfaces:**
- Consumes: `validateDecisionDraft` and its field/global errors.
- Produces: normalized `Decision` values through the existing `onCreate` callback.

- [x] Write failing component tests for Azerbaijani errors, normalized submission, option limits and Escape dismissal.
- [x] Run focused tests and confirm the old components fail those expectations.
- [x] Implement inline field errors, counters, accessible dialog semantics, focus and Escape handling.
- [x] Re-run focused tests and confirm they pass.

### Task 4: Localized responsive application shell

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Sidebar.tsx`
- Modify: `src/components/decisions/DecisionCard.tsx`
- Modify: `src/components/decisions/DecisionResult.tsx`
- Modify: `src/data/initialDecisions.ts`
- Modify: `index.html`

**Interfaces:**
- Keeps existing callback props between `App` and child components.
- Adds no routing or server dependency.

- [x] Add an application integration test covering Azerbaijani empty/content states and the create/select/reset flow.
- [x] Run the test and confirm English copy makes it fail.
- [x] Localize all UI and metadata, improve selection guards and add responsive semantic structure.
- [x] Re-run the integration test and confirm it passes.

### Task 5: Premium visual system and final verification

**Files:**
- Modify: `src/index.css`
- Modify: all visual components listed in Task 4.

**Interfaces:**
- Provides shared CSS variables, keyframes, utility classes and global focus/motion behavior.

- [x] Apply the indigo/violet visual system, responsive spacing, 44 px targets, hover elevation and entrance animations.
- [x] Run `npm test -- --run`, `npm run lint` and `npm run build`.
- [x] Inspect `git diff --check` and `git status --short`; fix any source-owned issues without touching `README.md`.
