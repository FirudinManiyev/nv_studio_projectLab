# Decision Board Refresh Design

## Goal

Turn the existing React decision board into a polished, fully Azerbaijani, responsive and accessible experience while keeping its local-only architecture and localStorage persistence.

## Constraints

- Keep React 19, TypeScript, Vite, Tailwind CSS and Lucide React.
- Keep the `decision-board-decisions` storage key and the existing `Decision` shape.
- Do not add a backend, authentication, routing or unrelated features.
- Preserve the user's existing `README.md` changes.
- Support narrow mobile screens from 320 px, tablets and desktop layouts.
- Respect `prefers-reduced-motion` and keyboard navigation.

## Data safety and validation

Creation input is normalized before a decision is created. A question must contain 3–120 visible characters. A decision must have 2–8 non-empty options, each no longer than 60 characters. Duplicate options are rejected case-insensitively after whitespace normalization.

Stored JSON is accepted only when it is an array of structurally valid decisions: non-empty string identifiers, non-empty questions and options, finite `createdAt`, and an optional `selectedOptionId` that references one of the decision's options. Legacy decisions that predate the new creation limits remain readable so an upgrade cannot discard valid user data. Malformed or incompatible storage falls back to starter decisions. Storage write failures are contained so the UI remains usable.

## User interface

The visual language uses deep indigo and violet accents, warm neutral surfaces, soft gradients and restrained shadows. The shell contains a branded sticky header, a desktop sidebar with a decision count and clear active state, and a focused content canvas. Decision options use distinct index markers, directional feedback and subtle elevation/shine on hover. The result state uses a celebratory but compact success treatment.

On mobile, navigation is a dismissible drawer, content spacing is reduced, action labels remain readable and dialogs become bottom-aligned sheets. Tap targets are at least 44 px. Long decision and option labels wrap safely without causing horizontal overflow.

## Azerbaijani localization

All visible copy, placeholders, validation feedback and accessible labels use natural Azerbaijani. Starter decisions are localized. The document language is `az`, the page title is `Qərar lövhəsi`, and created dates use the `az-AZ` locale.

## Accessibility and interaction

Dialogs expose dialog semantics, labelled titles and descriptions, focus their first useful control, close on Escape and restore body scrolling after closing. Icon-only controls have Azerbaijani accessible names. Focus-visible rings are consistent. Decorative elements are hidden from assistive technologies.

## Testing and verification

Vitest, jsdom and React Testing Library cover pure input validation, stored-data parsing, Azerbaijani form feedback, successful normalized creation and keyboard dialog dismissal. Final verification runs tests, ESLint and the production build.
