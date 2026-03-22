"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Habit from "@/models/Habit";
import Task from "@/models/Task";
import { serialize } from "@/lib/utils/serialization";

export async function getDashboardSummary(clientDateString?: string) {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId || !user) throw new Error("Unauthorized");

  await connectDB();

  // Use YYYY-MM-DD for timezone-resilient string matching
  // If clientDateString is provided, prefer it for strict TZ accuracy, otherwise fallback
  const today = clientDateString || new Date().toLocaleDateString("en-CA");

  const [habits, allTasks] = await Promise.all([
    Habit.find({ userId }).lean(),
    Task.find({ userId, isCompleted: false }).lean(),
  ]);

  // Filter: Only show habits NOT yet checked off today
  const pendingHabits = habits.filter(
    (h: any) => !h.completedDates.includes(today)
  );

  // Filter: Priority tasks (High priority OR deadline is today)
  const priorityTasks = allTasks
    .filter((t: any) => {
      if (t.priority === "high") return true;
      if (t.deadline) {
        const taskDate = new Date(t.deadline).toLocaleDateString("en-CA");
        return taskDate === today;
      }
      return false;
    })
    .sort((a: any, b: any) => {
      // Sort by priority (high > medium > low)
      const pMap: Record<string, number> = { high: 3, medium: 2, low: 1 };
      const pDiff = (pMap[b.priority] || 0) - (pMap[a.priority] || 0);
      if (pDiff !== 0) return pDiff;
      // Then by creation date
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 3);

  return {
    pendingHabits: serialize(pendingHabits),
    priorityTasks: serialize(priorityTasks),
    greeting: `Good morning, ${user.firstName || "System Thinker"}`,
    todayStr: today,
  };
}
