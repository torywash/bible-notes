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
| Database | MongoDB Atlas |
| Auth | Auth.js (NextAuth v5), GitHub OAuth |
| Linting | ESLint (`eslint-config-next`) |

## Features

- **Browse by book and chapter** — navigate Scripture structure (e.g. Genesis → Chapter 1)
- **Read view** — clean, scrollable verse display
- **Notes CRUD** — add, view, edit, and delete notes attached to a verse or chapter, with delete confirmation
- **Cloud persistence** — signed-in notes are stored in MongoDB Atlas and synced across devices
- **Guest/demo mode** — try the full app with no account; notes are kept in `localStorage` only, so recruiters/visitors can explore without touching real data
- **Auth** — GitHub OAuth via Auth.js, restricted to a single owner account
- **Responsive & accessible** — works on desktop and mobile, keyboard-navigable with visible focus states
- **Light/dark theme support**

### Planned / Stretch Goals

- Search notes and Scripture text
- Tags/labels for categorizing notes
- Verse highlighting for annotated verses
- Export notes as Markdown or JSON
- Multiple Bible translations
- Transition animations (tabs, cards, view changes)

## Why This Project

This project was built to get real, practical reps with the tools most relevant to modern frontend/full-stack roles — the App Router's layout and routing model, typed React components, Tailwind styling (including responsive and dark-mode variants), and end-to-end CRUD with client-side persistence — using a simple, well-understood subject matter so the focus stays on the engineering, not the domain.

## Getting Started

```bash
git clone https://github.com/<your-username>/bible-notes.git
cd bible-notes/app
npm install
cp .env.example .env.local   # fill in the values, see below
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment variables

The app supports two modes: a signed-in owner account backed by MongoDB (synced across devices),
and a **guest/demo mode** that behaves exactly like the original `localStorage`-only version — no
account needed, notes stay in the browser. Guest mode works with zero configuration; the env vars
below are only required for the signed-in path.

Copy `app/.env.example` to `app/.env.local` and fill in:

| Variable | Where to get it |
|---|---|
| `MONGODB_URI` | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) → Database → Connect → Drivers. If your network blocks DNS SRV lookups (`querySrv ECONNREFUSED`, common on some campus/ISP networks), use the standard (non-SRV) connection string instead — it needs `authSource=admin` and `replicaSet` explicitly, which Atlas includes by default. |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | [GitHub → Settings → Developer settings → OAuth Apps](https://github.com/settings/developers). Callback URL: `http://localhost:3000/api/auth/callback/github`. |
| `AUTH_GITHUB_OWNER_ID` | Your numeric GitHub user ID, from `https://api.github.com/users/<your-username>`. Sign-in is restricted to this account only. |
| `AUTH_SECRET` | Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`. |
| `AUTH_URL` | `http://localhost:3000` for local dev; your deployed URL in production. |

Never commit `.env.local` — it's gitignored. `.env.example` (committed) has placeholder keys only.

## Project Structure

```
bible-notes/
└── app/
    ├── auth.ts              # Auth.js config (GitHub provider, owner allowlist)
    ├── app/
    │   ├── layout.tsx       # Root layout
    │   ├── page.tsx         # Home page
    │   ├── login/           # Sign in / continue as guest
    │   ├── api/
    │   │   ├── auth/[...nextauth]/  # Auth.js route handler
    │   │   └── notes/        # Notes CRUD, MongoDB-backed
    │   └── globals.css      # Global styles / Tailwind entry
    ├── lib/
    │   ├── mongodb.ts        # MongoDB client singleton
    │   ├── notes-store.ts    # useNotes() hook (Mongo vs. guest localStorage)
    │   └── types.tsx         # Note type, categories
    ├── .env.example          # Required env vars (see above)
    └── package.json
```

## Status

Actively in development — core CRUD, MongoDB persistence, and auth are in place. Next up: transition
animations and a broader security pass on secrets handling.
