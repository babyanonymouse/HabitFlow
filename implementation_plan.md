# HF-8 (Jira: HF-8): The Grid — UI Foundation

Build the persistent dashboard shell: sticky sidebar on desktop, bottom nav on mobile.

---

## Dependencies

```bash
npm install lucide-react
```

---

## Proposed Changes

### [app/dashboard/layout.tsx](file:///media/Hybrid/Coding/habitflow/app/dashboard/layout.tsx) [NEW]

The dashboard shell — renders Sidebar + BottomNav around the page content.

```tsx
import Sidebar from "@/components/ui/Sidebar";
import BottomNav from "@/components/ui/BottomNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sticky sidebar – hidden on mobile */}
      <Sidebar />
      {/* Main content */}
      <main className="flex-1 pb-20 md:pb-0 md:pl-64">{children}</main>
      {/* Bottom nav – visible on mobile only */}
      <BottomNav />
    </div>
  );
}
```

---

### [components/ui/Sidebar.tsx](file:///media/Hybrid/Coding/habitflow/components/ui/Sidebar.tsx) [NEW]

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CheckSquare, Repeat2, Settings } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Overview",  icon: LayoutDashboard },
  { href: "/dashboard/tasks",  label: "Tasks",    icon: CheckSquare },
  { href: "/dashboard/habits", label: "Habits",   icon: Repeat2 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="fixed hidden md:flex flex-col w-64 h-screen border-r border-zinc-800 bg-zinc-950 px-4 py-6 gap-1">
      <p className="px-3 mb-4 text-sm font-semibold text-zinc-400 uppercase tracking-widest">HabitFlow</p>
      {links.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
            ${path === href ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"}`}>
          <Icon size={16} /> {label}
        </Link>
      ))}
    </aside>
  );
}
```

---

### [components/ui/BottomNav.tsx](file:///media/Hybrid/Coding/habitflow/components/ui/BottomNav.tsx) [NEW]

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CheckSquare, Repeat2, Settings } from "lucide-react";

const links = [
  { href: "/dashboard",          icon: LayoutDashboard, label: "Home" },
  { href: "/dashboard/tasks",    icon: CheckSquare,     label: "Tasks" },
  { href: "/dashboard/habits",   icon: Repeat2,         label: "Habits" },
  { href: "/dashboard/settings", icon: Settings,        label: "Settings" },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-zinc-800 bg-zinc-950">
      {links.map(({ href, icon: Icon, label }) => (
        <Link key={href} href={href}
          className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs transition-colors
            ${path === href ? "text-white" : "text-zinc-500 hover:text-white"}`}>
          <Icon size={20} /> {label}
        </Link>
      ))}
    </nav>
  );
}
```

---

### [components/ui/EmptyState.tsx](file:///media/Hybrid/Coding/habitflow/components/ui/EmptyState.tsx) [NEW]

```tsx
import { LucideIcon } from "lucide-react";

export default function EmptyState({ icon: Icon, title, description }: {
  icon: LucideIcon; title: string; description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-800 p-12 text-center">
      <Icon size={32} className="text-zinc-600" />
      <p className="font-medium text-zinc-300">{title}</p>
      <p className="text-sm text-zinc-500">{description}</p>
    </div>
  );
}
```

---

### [app/dashboard/page.tsx](file:///media/Hybrid/Coding/habitflow/app/dashboard/page.tsx) [NEW]

```tsx
import EmptyState from "@/components/ui/EmptyState";
import { CheckSquare, Repeat2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold text-zinc-100">Overview</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <EmptyState icon={CheckSquare} title="No tasks yet"
          description="Create your first task to start tracking your work." />
        <EmptyState icon={Repeat2} title="No habits yet"
          description="Add a habit to start building your streaks." />
      </div>
    </div>
  );
}
```

---

## Verification Plan

1. `npm run dev` → navigate to `/dashboard`.
2. **Desktop (≥768px):** sticky sidebar visible on the left, content shifted right.
3. **Mobile (<768px):** sidebar hidden, bottom nav visible and tappable.
4. Active route is highlighted in both nav variants.
5. `npx tsc --noEmit` → 0 errors.
