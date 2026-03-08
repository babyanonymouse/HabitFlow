import EmptyState from "@/components/ui/EmptyState";
import { CheckSquare, Repeat2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold text-zinc-100">Overview</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <EmptyState
          icon={CheckSquare}
          title="No tasks yet"
          description="Create your first task to start tracking your work."
        />
        <EmptyState
          icon={Repeat2}
          title="No habits yet"
          description="Add a habit to start building your streaks."
        />
      </div>
    </div>
  );
}
