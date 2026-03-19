# HF-12 Implementation Plan: Habit Engine (Tracking Logic)

We are addressing the core habit tracking logic as outlined in Jira Task **HF-12**.

## Proposed Changes

### 1. Habit Validator Schemas (`lib/validators/habit.ts`) [NEW]
- Create Zod schemas for `habitCreateSchema`, `habitUpdateSchema`, and `habitCheckOffSchema`.

### 2. Server Actions (`lib/actions/habit.actions.ts`) [NEW]
- **`getHabits()`**: Query [Habit](file:///media/Hybrid/Coding/habitflow/models/Habit.ts#8-20) model filtered strictly by `auth().userId`.
- **`createHabit(input)` / `deleteHabit(id)`**: Standard CRUD operations bound to `userId`.
- **`checkOffHabit(habitId)`**:
  - **Replay Protection**: Read the habit's `completedDates` array. Standardize the current time to midnight UTC (or local midnight relative to the server). If the last entry matches today's date, throw an error preventing double check-offs on the exact same day.
  - **Streak Recalculation**: If the previous date in the array is exactly *yesterday*, increment the `streak` by 1. Otherwise (if they missed a day), reset the `streak` back to 1.
  - Append the new date to `completedDates` and save to MongoDB. Revalidate the path.

### 3. Habit Frontend Components (`components/habits/HabitList.tsx` & `HabitItem.tsx`) [NEW]
- Build a map/list rendering the habits.
- **Card UI**: Each habit card will display:
  - Title and Description
  - **"Streak" Count**: Emphasized visually (e.g., "🔥 5 Day Streak").
  - **"Last Completed"**: Human-readable relative date (e.g., "Last completed: Today", "Last completed: 2 days ago").
- **Check-off Action Button**: 
  - If the "Last Completed" date evaluates to today, the button changes to a disabled "Checked Off" state.
  - If not, it exposes an interactive "Complete for Today" button linked to the `checkOffHabit` server action.

### 4. Dashboard Page (`app/dashboard/habits/page.tsx`) [NEW]
- Fetch data securely server-side using `getHabits()` and pass it down to the Client components for instant optimistic updates.

## User Review Required
> [!IMPORTANT]
> The Definition of Done specifies that we should *"Ignore until Sprint 3: AI suggestions (`aiSuggestions` field)."* I will explicitly leave the `aiSuggestions` field untouched across all endpoints.

## Verification Plan
### Automated & Manual Verification
1. Attempt to check off a habit. Verify the `streak` correctly increments to 1.
2. Attempt to check off the same habit again instantly; the UI should block it, and the Server Action should reject the attempt if circumvented.
3. Validate that logging into another account appropriately conceals the habits of the original user via the `userId` filter.
