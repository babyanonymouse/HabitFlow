"use server";

import { auth } from "@clerk/nextjs/server";
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
  const { userId } = await auth(); // server-side only — ID-spoofing proof
  if (!userId) throw new Error("401 Unauthorized");

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set. Restart the dev server after updating .env.local.");
  }

  try {
    await connectDB();
    await Task.create({
      userId,
      title: "My HabitFlow task",
      priority: "medium",
    });
    revalidatePath("/");
  } catch (err) {
    console.error("[createTask] Failed:", err);
    throw err;
  }
}

export async function getTasks(): Promise<TaskDTO[]> {
  const { userId } = await auth(); // server-side only
  if (!userId) return [];

  if (!process.env.MONGODB_URI) {
    console.warn("[getTasks] MONGODB_URI not set — returning empty list.");
    return [];
  }

  try {
    await connectDB();
    const tasks = await Task.find({ userId }).lean<ITask[]>();
    // Explicitly serialize ObjectIds/Dates → strings (Next.js POJO requirement)
    return tasks.map((t) => ({
      _id: String(t._id),
      title: t.title,
      priority: t.priority,
      isCompleted: t.isCompleted,
    }));
  } catch (err) {
    console.error("[getTasks] Failed:", err);
    return [];
  }
}
