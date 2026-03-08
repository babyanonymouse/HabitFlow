"use client";

import { createTask } from "@/lib/actions/task.actions";

// Phase 2: replace with useActionState / useFormStatus for loading + error states
export default function TestDbButton() {
  return (
    <form action={createTask}>
      <button type="submit">+ Test DB</button>
    </form>
  );
}
