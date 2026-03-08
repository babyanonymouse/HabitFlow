"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CheckSquare, Repeat2, Settings } from "lucide-react";

const links = [
  { href: "/dashboard",          label: "Overview",  icon: LayoutDashboard },
  { href: "/dashboard/tasks",    label: "Tasks",     icon: CheckSquare },
  { href: "/dashboard/habits",   label: "Habits",    icon: Repeat2 },
  { href: "/dashboard/settings", label: "Settings",  icon: Settings },
];

// Exact match for /dashboard root; startsWith for sub-pages like /dashboard/tasks/123
function isActive(path: string, href: string) {
  return href === "/dashboard" ? path === href : path.startsWith(href);
}

export default function Sidebar() {
  const path = usePathname();
  return (
    // z-40 — below modals (z-50) but above page content
    <aside className="fixed hidden md:flex flex-col w-64 h-screen z-40 border-r border-zinc-800 bg-zinc-950 px-4 py-6 gap-1">
      <p className="px-3 mb-4 text-sm font-semibold text-zinc-400 uppercase tracking-widest">
        HabitFlow
      </p>
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            isActive(path, href)
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
          }`}
        >
          <Icon size={16} />
          {label}
        </Link>
      ))}
    </aside>
  );
}
