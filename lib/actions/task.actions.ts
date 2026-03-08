"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import Task, { ITask } from "@/models/Task";

// Serializable shape — safe to pass across the server/client boundary
export type TaskDTO = {
  _id: string;
  title: string;
  priority: string;
  isCompleted: boolean;
};

export async function createTask(): Promise<void> {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Restart the dev server after updating .env.local."
    );
  }

  try {
    await connectDB();
    await Task.create({
      userId: "test-user",
      title: "My first HabitFlow task",
      priority: "medium",
    });
    revalidatePath("/"); // bust cache so the new task appears immediately
  } catch (err) {
    console.error("[createTask] Failed:", err);
    throw err; // re-throw so the form surface can handle it
  }
}

export async function getTasks(): Promise<TaskDTO[]> {
  if (!process.env.MONGODB_URI) {
    console.warn("[getTasks] MONGODB_URI not set — returning empty list.");
    return [];
  }

  try {
    await connectDB();
    const tasks = await Task.find({ userId: "test-user" }).lean<ITask[]>();
    // Explicitly serialize ObjectIds/Dates → strings to avoid Next.js POJO errors
    return tasks.map((t) => ({
      _id: String(t._id),
      title: t.title,
      priority: t.priority,
      isCompleted: t.isCompleted,
    }));
  } catch (err) {
    console.error("[getTasks] Failed:", err);
    return []; // safe fallback — UI shows empty list instead of crashing
  }
}
