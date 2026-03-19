import { z } from "zod";

export const taskPrioritySchema = z.enum(["low", "medium", "high"]);

// Form schema (client-facing) — keeps inputs as strings/booleans
export const taskFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters")
    .optional()
    .or(z.literal("")),
  priority: taskPrioritySchema.optional().default("medium"),
  deadline: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((v) => (v && v.length > 0 ? v : undefined)),
  privacyMode: z.coerce.boolean().optional().default(false),
});

export const taskCreateSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters")
    .optional()
    .or(z.literal("")),
  priority: taskPrioritySchema.optional().default("medium"),
  deadline: z.coerce.date().optional(),
  privacyMode: z.coerce.boolean().optional().default(false),
});

export const taskUpdateSchema = taskCreateSchema.partial().extend({
  _id: z.string().min(1),
});

export const taskToggleCompleteSchema = z.object({
  _id: z.string().min(1),
  isCompleted: z.coerce.boolean(),
});

export type TaskFormInput = z.infer<typeof taskFormSchema>;
export type TaskCreateInput = z.infer<typeof taskCreateSchema>;
export type TaskUpdateInput = z.infer<typeof taskUpdateSchema>;
export type TaskToggleCompleteInput = z.infer<typeof taskToggleCompleteSchema>;

