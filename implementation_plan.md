# HF-8 (Jira: HF-10): Identity Layer (Clerk Integration)

> **Note:** Due to Jira's auto-increment, your HF-8 (Identity Layer) was assigned key **HF-10**. Plan references both for clarity.

---

## Proposed Changes

### Dependencies

```bash
npm install @clerk/nextjs
```

### `.env.local` additions

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Add both to Vercel env vars as well (HF-12 catch-up).

---

### [middleware.ts](file:///media/Hybrid/Coding/habitflow/middleware.ts) [NEW]

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
```

---

### [app/layout.tsx](file:///media/Hybrid/Coding/habitflow/app/layout.tsx) [MODIFY]

Wrap the root layout in `ClerkProvider` and add sign-in/sign-out UI:

```tsx
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// Inside RootLayout return:
<ClerkProvider>
  <html lang="en">
    <body ...>
      <header>
        <SignedOut><SignInButton /></SignedOut>
        <SignedIn><UserButton /></SignedIn>
      </header>
      {children}
    </body>
  </html>
</ClerkProvider>
```

---

### [lib/actions/task.actions.ts](file:///media/Hybrid/Coding/habitflow/lib/actions/task.actions.ts) [MODIFY]

Replace hardcoded `"test-user"` with `auth().userId` from Clerk:

```ts
import { auth } from "@clerk/nextjs/server";

export async function createTask(): Promise<void> {
  const { userId } = await auth();
  if (!userId) throw new Error("401 Unauthorized");
  // ...
  await Task.create({ userId, title: "My first HabitFlow task", priority: "medium" });
  revalidatePath("/");
}

export async function getTasks(): Promise<TaskDTO[]> {
  const { userId } = await auth();
  if (!userId) return [];
  // ...
  const tasks = await Task.find({ userId }).lean<ITask[]>();
  // ...
}
```

---

### [app/(auth)/sign-in/[[...sign-in]]/page.tsx](file:///media/Hybrid/Coding/habitflow/app/(auth)/sign-in/[[...sign-in]]/page.tsx) [NEW]

```tsx
import { SignIn } from "@clerk/nextjs";
export default function SignInPage() {
  return <SignIn />;
}
```

### [app/(auth)/sign-up/[[...sign-up]]/page.tsx](file:///media/Hybrid/Coding/habitflow/app/(auth)/sign-up/[[...sign-up]]/page.tsx) [NEW]

```tsx
import { SignUp } from "@clerk/nextjs";
export default function SignUpPage() {
  return <SignUp />;
}
```

---

## Verification Plan

1. `npm run dev` → visit `/` — `Sign In` button visible in header.
2. Click **Sign In** → Clerk-hosted modal appears.
3. Create an account → redirected back to `/`.
4. `UserButton` avatar visible in header.
5. Visit `/dashboard` while signed out → redirected to sign-in.
6. Click **+ Test DB** → task created; check Atlas — `userId` matches Clerk user ID (not `"test-user"`).

```bash
npx tsc --noEmit   # 0 errors expected
```
