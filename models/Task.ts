import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITask extends Document {
  userId: string;                       // multi-tenant prep (indexed)
  title: string;                        // max 100 chars
  description?: string;                 // max 500 chars
  isCompleted: boolean;
  completedAt?: Date;                   // immutable history for charts
  privacyMode: boolean;                 // filters task from AI context
  priority: "low" | "medium" | "high"; // AI focus ranking
  deadline?: Date;                      // AI deadline awareness
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    userId:      { type: String, required: true, index: true },
    title:       { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 500 },
    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date },
    privacyMode: { type: Boolean, default: false },
    priority:    { type: String, enum: ["low", "medium", "high"], default: "medium" },
    deadline:    { type: Date },
  },
  { timestamps: true }
);

const Task: Model<ITask> =
  mongoose.models.Task ?? mongoose.model<ITask>("Task", TaskSchema);

export default Task;
