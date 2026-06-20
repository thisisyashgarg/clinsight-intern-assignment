# Clinsight Intern Assignment — Expert Directory

Welcome, and thanks for taking the time to do this. This is a small app that
mirrors the kind of work you'll do day-to-day at Clinsight: **manually testing
product flows, finding bugs, reporting them clearly, and fixing them.**

The app is a directory of clinical experts. You can search, filter, sort, view
an expert, add a new expert, and shortlist experts.

> ⚠️ **This app ships with several bugs on purpose.** Some are easy to spot by
> clicking around; others only show up if you read the code. Your job is to find
> them, write down what you found, and fix them.
>
> Heads up: **not everything that looks odd is actually a bug.** Part of the job
> is judgement — don't "fix" behaviour that's working as intended. Changing
> correct code counts against you.

---

## The tech

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** for styling
- **Zod** for validation
- **Zustand** for client state
- Data is stored in the browser's **localStorage** (`lib/db.ts`), seeded from
  `lib/seed.ts` on first load. It acts as the "database" — your changes (e.g.
  adding an expert) persist across page refreshes. No real database to set up.
  To start fresh, clear the site's localStorage (DevTools → Application →
  Local Storage) or run `localStorage.clear()` in the browser console.

This is a simplified version of our real stack, so it should feel familiar to
the work you'd be doing.

## Setup

```bash
npm install
npm run dev
```

Then open **http://localhost:4000**. The app runs on a fixed port on purpose:
`localStorage` is tied to the exact origin (host + port), so keeping the port
stable is what lets your data survive restarts.

## Your task (target: ~6–8 hours, due in 1 day)

1. **Test every flow manually.** Click through the directory (search, filter,
   sort, pagination), open expert detail pages, shortlist experts, and use the
   "Add expert" form. Try valid and invalid inputs.
2. **Record what you find** in `FLOW_NOTES.md` (template already in the repo).
   For each flow: what you tested, what you expected, what actually happened, and
   whether it's a bug + how serious. This is your bug report to the senior dev.
3. **Fix the real bugs.** Keep your changes minimal and focused — fix the bug,
   don't rewrite the file.
4. **Open a Pull Request** with your fixes. In the PR description, list each bug
   you fixed: what was wrong, where, and how you fixed it.

## How to submit

1. Create a branch: `git checkout -b fix/<your-name>`
2. Commit your fixes with clear messages.
3. Push and open a **Pull Request** against `main`.
4. Make sure `FLOW_NOTES.md` is filled in and included.

## What we're looking for

- **Bug-finding:** how many real bugs you catch (by testing *and* by reading code).
- **Judgement:** you don't "fix" things that already work correctly.
- **Fix quality:** minimal, correct changes that don't break other things.
- **Reporting:** clear, reproducible notes in `FLOW_NOTES.md`.
- **PR hygiene:** focused commits and a readable PR description.

Good luck — and if something is genuinely unclear, write down your assumption
and keep going, just like you would on the job.
