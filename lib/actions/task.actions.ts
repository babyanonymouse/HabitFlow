"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import Task, { ITask } from "@/models/Task";
import {
  taskCreateSchema,
  taskToggleCompleteSchema,
  taskUpdateSchema,
  type TaskCreateInput,
  type TaskToggleCompleteInput,
  type TaskUpdateInput,
} from "@/lib/validators/task";

// Serializable shape — safe to pass across the server/client boundary
export type TaskDTO = {
  _id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  isCompleted: boolean;
  privacyMode: boolean;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
};

type TaskDocLike = Pick<
  ITask,
  | "_id"
  | "title"
  | "description"
  | "priority"
  | "isCompleted"
  | "privacyMode"
  | "deadline"
  | "createdAt"
  | "updatedAt"
>;

function toTaskDTO(t: TaskDocLike): TaskDTO {
  return {
    _id: String(t._id),
    title: t.title,
    description: t.description ?? undefined,
    priority: t.priority,
    isCompleted: t.isCompleted,
    privacyMode: t.privacyMode,
    deadline: t.deadline ? new Date(t.deadline).toISOString() : undefined,
    createdAt: new Date(t.createdAt).toISOString(),
    updatedAt: new Date(t.updatedAt).toISOString(),
  };
}

export async function createTask(input: TaskCreateInput): Promise<TaskDTO> {
  const { userId } = await auth(); // server-side only — ID-spoofing proof
  if (!userId) throw new Error("401 Unauthorized");

  const parsed = taskCreateSchema.parse(input);
  const description =
    typeof parsed.description === "string" && parsed.description.trim().length > 0
      ? parsed.description.trim()
      : undefined;

  try {
    await connectDB();
    const created = await Task.create({
      userId,
      title: parsed.title,
      description,
      priority: parsed.priority,
      privacyMode: parsed.privacyMode,
      deadline: parsed.deadline,
    });
    revalidatePath("/dashboard/tasks");
    return toTaskDTO(created);
  } catch (err) {
    console.error("[createTask] Failed:", err);
    throw err;
  }
}

export async function getTasks(): Promise<TaskDTO[]> {
  const { userId } = await auth(); // server-side only
  if (!userId) return [];

  try {
    await connectDB();
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 }).lean<ITask[]>();
    return tasks.map((t) => toTaskDTO(t));
  } catch (err) {
    console.error("[getTasks] Failed:", err);
    return [];
  }
}

export async function updateTask(input: TaskUpdateInput): Promise<TaskDTO> {
  const { userId } = await auth();
  if (!userId) throw new Error("401 Unauthorized");

  const parsed = taskUpdateSchema.parse(input);
  const { _id, ...rest } = parsed;

  const updateDoc: any = { $set: {}, $unset: {} };
  
  if (typeof rest.title === "string") updateDoc.$set.title = rest.title;
  
  if (rest.description !== undefined) {
    const trimmed = typeof rest.description === "string" ? rest.description.trim() : "";
    if (trimmed.length > 0) {
      updateDoc.$set.description = trimmed;
    } else {
      updateDoc.$unset.description = 1;
    }
  }
  
  if (rest.priority) updateDoc.$set.priority = rest.priority;
  
  if (rest.deadline !== undefined) {
    if (rest.deadline) {
      updateDoc.$set.deadline = rest.deadline;
    } else {
      updateDoc.$unset.deadline = 1;
    }
  }
  
  if (rest.privacyMode !== undefined) updateDoc.$set.privacyMode = rest.privacyMode;

  if (Object.keys(updateDoc.$unset).length === 0) delete updateDoc.$unset;

  try {
    await connectDB();
    const updated = await Task.findOneAndUpdate({ _id, userId }, updateDoc, {
      new: true,
    });
    if (!updated) throw new Error("404 Not Found");
    revalidatePath("/dashboard/tasks");
    return toTaskDTO(updated);
  } catch (err) {
    console.error("[updateTask] Failed:", err);
    throw err;
  }
}

export async function deleteTask(taskId: string): Promise<void> {
  const { userId } = await auth();
  if (!userId) throw new Error("401 Unauthorized");

  if (!taskId) throw new Error("Task ID is required");

  try {
    await connectDB();
    await Task.deleteOne({ _id: taskId, userId });
    revalidatePath("/dashboard/tasks");
  } catch (err) {
    console.error("[deleteTask] Failed:", err);
    throw err;
  }
}

export async function setTaskCompleted(
  input: TaskToggleCompleteInput
): Promise<TaskDTO> {
  const { userId } = await auth();
  if (!userId) throw new Error("401 Unauthorized");

  const parsed = taskToggleCompleteSchema.parse(input);

  try {
    await connectDB();
    const updated = await Task.findOneAndUpdate(
      { _id: parsed._id, userId },
      { isCompleted: parsed.isCompleted },
      { new: true }
    );
    if (!updated) throw new Error("404 Not Found");
    revalidatePath("/dashboard/tasks");
    return toTaskDTO(updated);
  } catch (err) {
    console.error("[setTaskCompleted] Failed:", err);
    throw err;
  }
}
