# 📖 Bible Notes

A single-user, local-first web app for reading Scripture and taking study notes alongside it — built as a hands-on practice project for modern React/Next.js development.

## About

Bible Notes lets you browse Scripture by book and chapter and attach personal study notes to any verse or chapter as you read. It's intentionally scoped as a focused CRUD application rather than a full Bible platform, built to practice the core skills of a modern frontend stack: routing, component composition, form handling, state management, and styling with real accessibility and persistence requirements.

## Tech Stack

| Category | Tools |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Linting | ESLint (`eslint-config-next`) |

## Features

- **Browse by book and chapter** — navigate Scripture structure (e.g. Genesis → Chapter 1)
- **Read view** — clean, scrollable verse display
- **Notes CRUD** — add, view, edit, and delete notes attached to a verse or chapter, with delete confirmation
- **Persistence** — notes survive a page refresh via `localStorage`
- **Responsive & accessible** — works on desktop and mobile, keyboard-navigable with visible focus states
- **Light/dark theme support**

### Planned / Stretch Goals

- Search notes and Scripture text
- Tags/labels for categorizing notes
- Verse highlighting for annotated verses
- Export notes as Markdown or JSON
- Multiple Bible translations
- Backend persistence (SQLite/Postgres) in place of `localStorage`
- Multi-user auth with private notes per user

## Why This Project

This project was built to get real, practical reps with the tools most relevant to modern frontend/full-stack roles — the App Router's layout and routing model, typed React components, Tailwind styling (including responsive and dark-mode variants), and end-to-end CRUD with client-side persistence — using a simple, well-understood subject matter so the focus stays on the engineering, not the domain.

## Getting Started

```bash
git clone https://github.com/<your-username>/bible-notes.git
cd bible-notes/bible-notes
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
bible-notes/
└── bible-notes/
    ├── app/
    │   ├── layout.tsx    # Root layout
    │   ├── page.tsx      # Home page
    │   └── globals.css   # Global styles / Tailwind entry
    ├── public/           # Static assets
    └── package.json
```

## Status

Actively in development — core CRUD and persistence features are being built out first, followed by polish (empty/loading states, responsive/dark-mode pass) and one stretch feature.
