# HF-5: Build E2E Database Proof (Server Action)

Wire the full stack together: UI → Server Action → MongoDB → rendered list. This is a temporary proof-of-concept; the UI layer gets replaced in M4.

---

## Proposed Changes

### [lib/actions/task.actions.ts](file:///media/Hybrid/Coding/habitflow/lib/actions/task.actions.ts) [NEW]

```ts
"use server";

import { connectDB } from "@/lib/db";
import Task, { ITask } from "@/models/Task";

export async function createTask(): Promise<void> {
  await connectDB();
  await Task.create({
    userId: "test-user",
    title: "My first HabitFlow task",
    priority: "medium",
  });
}

export async function getTasks(): Promise<ITask[]> {
  await connectDB();
  // .lean() returns plain JS objects (serializable to the client)
  return Task.find({ userId: "test-user" }).lean<ITask[]>();
}
```

---

### [components/ui/TestDbButton.tsx](file:///media/Hybrid/Coding/habitflow/components/ui/TestDbButton.tsx) [NEW]

A Client Component so the button can call the Server Action interactively.

```tsx
"use client";

import { createTask } from "@/lib/actions/task.actions";

export default function TestDbButton() {
  return (
    <form action={createTask}>
      <button type="submit">+ Test DB</button>
    </form>
  );
}
```

> [!NOTE]
> Using a `<form action={serverAction}>` is the idiomatic Next.js 16 pattern — no `onClick` + `fetch` needed.

---

### [app/page.tsx](file:///media/Hybrid/Coding/habitflow/app/page.tsx) [MODIFY]

Make [Home](file:///media/Hybrid/Coding/habitflow/app/page.tsx#1-8) an `async` Server Component that fetches and renders tasks.

```tsx
import { getTasks } from "@/lib/actions/task.actions";
import TestDbButton from "@/components/ui/TestDbButton";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>HabitFlow — DB Proof</h1>
      <TestDbButton />
      <ul style={{ marginTop: "1rem" }}>
        {tasks.map((t) => (
          <li key={String(t._id)}>{t.title}</li>
        ))}
      </ul>
    </main>
  );
}
```

---

## Verification Plan

1. Add `MONGODB_URI` to `.env.local`.
2. `npm run dev` → open `http://localhost:3000`.
3. Click **+ Test DB** → page refreshes → new task appears in the list.
4. **Expected terminal output:** `✅ MongoDB connected` on first load only (singleton confirmed).
5. Check Atlas dashboard → `habitflow.tasks` collection → document exists.
