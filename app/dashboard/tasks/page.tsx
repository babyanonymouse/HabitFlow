import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getTasks, getWeeklyVelocity } from "@/lib/actions/task.actions";
import TasksClient from "@/components/tasks/TasksClient";
import VelocityChart from "@/components/charts/VelocityChart";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  // Concurrent fetch — no waterfall delay
  const [tasks, velocityData] = await Promise.all([
    getTasks(),
    // Pass local date string so the server action anchors on Nairobi time (UTC+3)
    getWeeklyVelocity(new Date().toLocaleDateString("en-CA")),
  ]);

  return (
    <div className="p-6 space-y-8">
      {/* ── Velocity Chart Card ─────────────────────────────────────────── */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
        <div className="flex items-baseline justify-between gap-4 mb-1">
          <div>
            <h2 className="text-sm font-semibold text-zinc-200 tracking-tight">
              Completion Velocity
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Tasks created vs. completed — last 7 days
            </p>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="flex items-center gap-1.5 text-xs text-zinc-400">
              <span className="inline-block h-2 w-2 rounded-full bg-zinc-600" />
              Created
            </span>
            <span className="flex items-center gap-1.5 text-xs text-zinc-400">
              <span className="inline-block h-2 w-2 rounded-full bg-indigo-500" />
              Completed
            </span>
          </div>
        </div>
        <VelocityChart data={velocityData} />
      </section>

      {/* ── Task List ───────────────────────────────────────────────────── */}
      <TasksClient initialTasks={tasks} />
    </div>
  );
}
