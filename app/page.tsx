import { getTasks } from "@/lib/actions/task.actions";
import TestDbButton from "@/components/ui/TestDbButton";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main className="min-h-screen bg-zinc-950 px-8 py-12 text-zinc-100">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">HabitFlow</h1>
      <p className="mb-6 text-sm text-zinc-500">DB Proof — Walking Skeleton</p>

      <TestDbButton />

      <ul className="mt-6 space-y-2">
        {tasks.map((t) => (
          <li
            key={t._id}
            className="flex items-center gap-3 rounded-lg bg-zinc-900 px-4 py-3 text-sm"
          >
            <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-400">
              {t.priority}
            </span>
            <span className="text-zinc-200">{t.title}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
