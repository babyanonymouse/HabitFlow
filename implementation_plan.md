# HF-3: Configure MongoDB Singleton Connection

Create a resilient, reusable MongoDB connection module that prevents the classic Next.js hot-reload problem where dev-mode re-evaluations create hundreds of open connections to Atlas.

## Proposed Changes

### Core Library

#### [NEW] [db.ts](file:///media/Hybrid/Coding/habitflow/lib/db.ts)

The singleton pattern works by stashing the connection promise on the Node.js `global` object. Because `global` persists across hot-reloads in development (unlike the module cache), we only ever open **one** real connection.

```ts
import mongoose from "mongoose";

// 1. Type-augment global so TypeScript doesn't complain
declare global {
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
}

// 2. Initialise the cache bucket on first load
const cached = global.mongoose ?? (global.mongoose = { conn: null, promise: null });

export async function connectDB(): Promise<mongoose.Connection> {
  if (cached.conn) return cached.conn;          // ✅ reuse existing

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in .env.local");
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI)
      .then((m) => {
        console.log("✅ MongoDB connected");
        return m.connection;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
```

> [!NOTE]
> `connectDB()` is called at the top of every Server Action or Route Handler that needs data. It's a no-op when the connection is already live.

---

### Dependencies

Install `mongoose` (and its types, which are bundled):

```bash
npm install mongoose
```

---

## Verification Plan

### Manual Verification — Connection log on dev server start

1. Add `MONGODB_URI` to `.env.local` (copy from [.env.example](file:///media/Hybrid/Coding/habitflow/.env.example), fill in your Atlas URI).
2. Call `connectDB()` from [app/page.tsx](file:///media/Hybrid/Coding/habitflow/app/page.tsx) temporarily:
   ```ts
   // app/page.tsx (temp)
   import { connectDB } from "@/lib/db";
   export default async function Home() {
     await connectDB();
     return <main>HabitFlow</main>;
   }
   ```
3. Run `npm run dev`.
4. Open `http://localhost:3000` in the browser.
5. **Expected:** Terminal prints `✅ MongoDB connected` on first load, and **does not** repeat it on subsequent hot-reloads — confirming the singleton is working.
6. Remove the temp `connectDB()` call from [page.tsx](file:///media/Hybrid/Coding/habitflow/app/page.tsx) after confirming.
