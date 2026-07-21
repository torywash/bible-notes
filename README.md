# Bible Notes

> A personal practice project for learning Next.js (App Router), React, TypeScript, and Tailwind CSS by building a small app for reading Scripture and keeping study notes alongside it.

This README is written like a project guideline/assignment sheet — treat it as the spec you're building toward, and check items off the acceptance criteria as you implement them.

## Overview

Bible Notes is a single-user, local-first web app for reading Bible passages and jotting down notes as you study. The goal isn't to rebuild a full Bible app — it's to practice the fundamentals of a modern React/Next.js stack (routing, layout, client/server components, forms, state, and styling) using a subject matter that's easy to reason about.

## Learning Objectives

- Get comfortable with the Next.js App Router (`app/` directory, layouts, pages, routing).
- Practice building and composing React components with TypeScript.
- Style a UI with Tailwind CSS, including responsive and dark-mode variants.
- Manage form input and local component state.
- Persist user data (notes) across sessions — starting with `localStorage`, optionally upgrading to a real backend/database later.
- Practice basic CRUD (create, read, update, delete) patterns end to end.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** React 19
- **Styling:** Tailwind CSS 4
- **Linting:** ESLint (`eslint-config-next`)

## Features

### Core Features (required)

- [ ] **Browse structure** — Navigate by book and chapter (e.g. Genesis → Chapter 1).
- [ ] **Read view** — Display verse text for the selected chapter in a readable, scrollable layout.
- [ ] **Add a note** — Attach a note to a specific verse or chapter.
- [ ] **View notes** — See all notes for the chapter/verse currently being viewed.
- [ ] **Edit a note** — Update the text of an existing note.
- [ ] **Delete a note** — Remove a note with a confirmation step.
- [ ] **Persistence** — Notes survive a page refresh (e.g. saved to `localStorage`).

### Stretch Features (optional)

- [ ] **Search** — Search notes by keyword or search Scripture text.
- [ ] **Tags/labels** — Categorize notes (e.g. "prayer," "question," "cross-reference").
- [ ] **Verse highlighting** — Visually mark verses that have notes attached.
- [ ] **Export notes** — Export all notes as Markdown or JSON.
- [ ] **Multiple translations** — Let the user switch between Bible translations.
- [ ] **Backend persistence** — Replace `localStorage` with a real database (e.g. SQLite/Postgres via an API route or ORM).
- [ ] **Auth** — Support multiple users with their own private notes.

## Acceptance Criteria

A feature is considered "done" when:

1. It works correctly on both desktop and mobile viewport sizes.
2. It has no console errors or TypeScript errors (`npm run lint` passes).
3. State updates (add/edit/delete) are reflected in the UI immediately, without requiring a manual refresh.
4. Data persists across a page reload (for persistence-related features).
5. Empty states are handled gracefully (e.g. "No notes yet for this chapter").
6. Interactive elements (buttons, forms) are keyboard-accessible and have visible focus states.
7. The feature respects the app's light/dark theme.

## Project Structure

```
bible-notes/
└── bible-notes/          # Next.js app
    ├── app/
    │   ├── layout.tsx    # Root layout
    │   ├── page.tsx      # Home page
    │   └── globals.css   # Global styles / Tailwind entry
    ├── public/           # Static assets
    └── package.json
```

## Getting Started

```bash
cd bible-notes
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Suggested Build Order

1. Scaffold the book/chapter navigation and static verse display (no notes yet).
2. Add a hardcoded/sample data source for Scripture text (a small JSON file is enough to start).
3. Build the "add note" form and render existing notes for the current view.
4. Wire up `localStorage` persistence.
5. Add edit/delete for notes.
6. Polish: empty states, loading states, responsive layout, dark mode.
7. Pick a stretch feature and implement it.

## Non-Goals

- This is not intended to be a production Bible app or a replacement for existing Bible study tools.
- No requirement for full-Bible text coverage — a handful of books/chapters is enough for practice purposes.
