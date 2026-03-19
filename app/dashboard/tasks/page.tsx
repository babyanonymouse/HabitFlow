import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getTasks } from "@/lib/actions/task.actions";
import TasksClient from "@/components/tasks/TasksClient";

export default async function TasksPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const tasks = await getTasks();

  return (
    <div className="p-6 space-y-6">
      <TasksClient initialTasks={tasks} />
    </div>
  );
}

