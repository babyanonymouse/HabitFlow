import EmptyState from "@/components/ui/EmptyState";
import HabitList from "@/components/habits/HabitList";
import TasksClient from "@/components/tasks/TasksClient";
import { getTasks } from "@/lib/actions/task.actions";
import { getHabits } from "@/lib/actions/habit.actions";
import { CheckSquare, Repeat2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [tasks, habits] = await Promise.all([getTasks(), getHabits()]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-xl font-semibold text-zinc-100">Overview</h1>

      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Tasks
        </h2>
        {tasks.length === 0 ? (
          <EmptyState
            icon={CheckSquare}
            title="No tasks yet"
            description="Create your first task to start tracking your work."
          />
        ) : (
          <TasksClient initialTasks={tasks} />
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Habits
        </h2>
        {habits.length === 0 ? (
          <EmptyState
            icon={Repeat2}
            title="No habits yet"
            description="Add a habit to start building your streaks."
          />
        ) : (
          <HabitList initialHabits={habits} />
        )}
      </section>
    </div>
  );
}
