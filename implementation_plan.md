# HF-4: Define Strict Data Models (Task & Habit)

Create fully-typed Mongoose schemas for the two core entities. TypeScript interfaces are defined first, then passed as generics to `mongoose.Schema` so the compiler enforces field contract at every model call site.

---

## Proposed Changes

### [models/Task.ts](file:///media/Hybrid/Coding/habitflow/models/Task.ts) [NEW]

```ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  isCompleted: boolean;
  privacyMode: boolean;   // filters task from AI context when true
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    isCompleted: { type: Boolean, default: false },
    privacyMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task: Model<ITask> =
  mongoose.models.Task ?? mongoose.model<ITask>("Task", TaskSchema);

export default Task;
```

---

### [models/Habit.ts](file:///media/Hybrid/Coding/habitflow/models/Habit.ts) [NEW]

```ts
import mongoose, { Schema, Document, Model } from "mongoose";

interface IAiSuggestions {
  content: string;
  generatedAt: Date;
}

export interface IHabit extends Document {
  title: string;
  description?: string;
  frequency: "daily" | "weekly";
  isActive: boolean;
  aiSuggestions?: IAiSuggestions;  // populated by M5 AI Activation
  createdAt: Date;
  updatedAt: Date;
}

const HabitSchema = new Schema<IHabit>(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    frequency:   { type: String, enum: ["daily", "weekly"], default: "daily" },
    isActive:    { type: Boolean, default: true },
    aiSuggestions: {
      content:     { type: String },
      generatedAt: { type: Date },
    },
  },
  { timestamps: true }
);

const Habit: Model<IHabit> =
  mongoose.models.Habit ?? mongoose.model<IHabit>("Habit", HabitSchema);

export default Habit;
```

> [!NOTE]
> The `mongoose.models.X ?? mongoose.model(...)` guard prevents the "Cannot overwrite model once compiled" error that fires on Next.js hot-reloads — same pattern as the DB singleton.

---

## Verification Plan

TypeScript compiler is the primary validator:

```bash
npx tsc --noEmit
```

Expected: **0 errors**. No runtime test needed at this stage — the models are consumed in HF-5.
