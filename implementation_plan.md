# Redesign Home Tab as an "Active Nerve Center" (Zero-Drag UX)

## Goal
Transition the Home tab from a passive skeleton to a high-density, action-oriented dashboard to minimize "Time-to-Action". 

## Epic/Task Link
*Note: I searched both GitHub Projects/Issues and Jira for any linked Epic or Task (e.g., searching for "Active Nerve Center", "Zero-Drag UX", "HabitFlow"), but no parent Epic or Task was found. If this should be tracked under a specific Epic, please let me know!*

## Proposed Changes

### Backend Actions & Utilities
#### [NEW] `lib/actions/summary.actions.ts`
- Implement `getDashboardSummary()` which fetches pending habits and priority tasks in a single round-trip.
- Filter pending habits avoiding those already completed today.
- Return serialized `pendingHabits`, `priorityTasks`, and a dynamic `greeting`.

#### [NEW] `lib/utils/serialization.ts`
- Implement a helper function `serialize()` to ensure all MongoDB `_id` and `Date` objects are converted to strings before reaching the client, preventing Next.js serialization errors.

### Dashboard Frontend
#### [MODIFY] [app/dashboard/page.tsx](file:///media/Hybrid/Coding/habitflow/app/dashboard/page.tsx)
- Replace existing `EmptyState` components.
- Call `getDashboardSummary()` in the server component.
- **Greeting Header**: Display the dynamic greeting and summary string ("You have X habits to maintain and Y priority tasks.").
- **Habit Carousel Element**: Render horizontally scrolling cards for habits. Add "Check Off" buttons and optimistic UI logic (`useOptimistic`).
- **Priority Task List**: Vertical list of top 3 high-priority tasks with fast optimistic check-off.
- **AI Intelligence Slot**: Glassmorphic card with a subtle indigo-500 glow stating "AI is analyzing your patterns... check back tomorrow for suggestions."

## Verification Plan

### Automated/Manual Verification
1. **Serialization Check**: Ensure no server-side Next.js serialization errors occur when navigating to the Home tab.
2. **Optimistic Updates**: Manually test checking off a habit and a priority task on the Home tab. Ensure the UI updates immediately and the items are completed in the database.
3. **Responsive Design**: Verify the habit carousel works properly with horizontal scrolling on mobile emulation and ensure there is zero horizontal overflow on the main page layout.
