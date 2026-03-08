# HF-1: Scaffold Next.js Base Architecture

Set up the complete base scaffolding for HabitFlow — the folder structure, TypeScript types, MongoDB connection layer, Mongoose models, API route stubs, reusable UI components, and a polished dashboard shell.

## Proposed Changes

### Foundation & Types

#### [MODIFY] [globals.css](file:///media/Hybrid/Coding/habitflow/app/globals.css)
Add CSS design tokens (color palette, font sizing, spacing), dark mode variables, and base resets using `@theme` (Tailwind v4 syntax).

#### [NEW] types/index.ts
Define shared TypeScript interfaces: `Task` and `Habit` with proper field typing (`_id`, `title`, `description`, `completed`, `createdAt`, `frequency`, etc.).

---

### Database Layer

#### [NEW] lib/db.ts
MongoDB connection helper using Mongoose, with connection caching to avoid re-connecting on hot reloads (standard Next.js pattern).

#### [NEW] lib/models/Task.ts
Mongoose schema + model for tasks (`title`, `description`, `completed`, `priority`, `dueDate`, `createdAt`).

#### [NEW] lib/models/Habit.ts
Mongoose schema + model for habits (`title`, `description`, `frequency`, `completedDates`, `createdAt`).

---

### API Routes

#### [NEW] app/api/tasks/route.ts
Stub handlers: `GET` (return all tasks from MongoDB) and `POST` (create a new task). Fully typed with Next.js `NextResponse`.

#### [NEW] app/api/habits/route.ts
Stub handlers: `GET` (return all habits) and `POST` (create a new habit).

---

### UI Components

#### [NEW] components/Header.tsx
App header with the HabitFlow logo/name, nav links (Tasks / Habits), and a simple responsive layout.

#### [NEW] components/TaskCard.tsx
A card component that displays a task's title, priority, due date, and completion status with a toggle button.

#### [NEW] components/HabitCard.tsx
A card component showing a habit's title, frequency, and last-completed date.

---

### App Shell

#### [MODIFY] app/layout.tsx
Update app metadata (title → "HabitFlow", description), keep Geist fonts, add `<Header />`.

#### [MODIFY] app/page.tsx
Replace boilerplate with a dashboard shell: two sections (Tasks / Habits) with placeholder empty-state messages and a "+" button skeleton for adding items.

---

### Config

#### [NEW] .env.local.example
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/habitflow
```

---

## Verification Plan

### Automated — TypeScript + Lint
```bash
cd /media/Hybrid/Coding/habitflow
npm run build
```
Expected: zero TypeScript errors, zero ESLint errors, build succeeds.

### Manual — Dev Server
```bash
cd /media/Hybrid/Coding/habitflow
npm run dev
```
1. Open `http://localhost:3000` — dashboard shell renders with Header, Tasks section, Habits section.
2. Open `http://localhost:3000/api/tasks` — returns JSON (empty array or error message if no `MONGODB_URI` is set, **not** a crash).
3. Open `http://localhost:3000/api/habits` — same as above.
