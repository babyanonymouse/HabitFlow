# Epic 3: The Progress Visualizer
**Strategic Philosophy:** Information Density > Visual Fluff. "Zero-Drag" architecture mapping.

## Charting Strategy Recommendation
I strongly recommend a **Hybrid Approach**:
1. **The Consistency Heatmap (HF-15):** 
   **Pure Tailwind CSS Grid.** We do not need a charting payload for GitHub-inspired contribution graphs. A mapped grid of pure HTML elements natively processed on the Server will drop instantly onto the screen with zero JS execution overhead, keeping the `< 2.5s` LCP safely anchored.
2. **Velocity Charts & Task Pulses (HF-16):**
   **Shadcn UI Charts (`recharts`)**. Recharts gives us smooth, accessible SVG tooltips and coordinate math. We will load it optimally via dynamic imports or heavily tree-shaken components specifically scoped to the `Pulse` summary.

## Proposed Steps

### Backend Actions & Utilities
#### [NEW] [lib/utils/timeline.ts](file:///media/Hybrid/Coding/habitflow/lib/utils/timeline.ts)
- Utility: [generateTimelineMap(completedDates)](file:///media/Hybrid/Coding/habitflow/lib/utils/timeline.ts#8-51) creating a 30-day Boolean array synced perfectly to `en-CA` local server days to prevent "Future-Proofing Theater" overlaps.

#### [MODIFY] [lib/actions/task.actions.ts](file:///media/Hybrid/Coding/habitflow/lib/actions/task.actions.ts) or [summary.actions.ts](file:///media/Hybrid/Coding/habitflow/lib/actions/summary.actions.ts)
- Add an aggregation wrapper (`getWeeklyVelocity()`) comparing `tasksCreated` and `tasksCompleted` over a rolling 7-day period.

### Frontend Re-Architecture
#### [NEW] `components/charts/ConsistencyHeatmap.tsx`
- Tailwind HTML Component. Iterate through [TimelineMap](file:///media/Hybrid/Coding/habitflow/lib/utils/timeline.ts#8-51) mapping sizes and density colors (`zinc-900` to `indigo-500`).

#### [NEW] `components/charts/VelocityChart.tsx`
- Shadcn/Recharts Component tracking metrics with a minimalistic stroke and fluid axis design, utilizing CSS variables (e.g., `--color-indigo-500`) for dark mode consistency.

#### [MODIFY] [app/dashboard/page.tsx](file:///media/Hybrid/Coding/habitflow/app/dashboard/page.tsx)
- Inject the "Weekly Snapshot" natively into the Home Tab without sacrificing render cycles. Provide a skeleton suspense boundary for the chart rendering.

---

## HF-14 Exact Technical Plan: The History Processor
**Objective**: Create [lib/utils/timeline.ts](file:///media/Hybrid/Coding/habitflow/lib/utils/timeline.ts) and [generateTimelineMap()](file:///media/Hybrid/Coding/habitflow/lib/utils/timeline.ts#8-51).

**Algorithm**:
1. Take `completedDates` (Array of YYYY-MM-DD) and `todayStr` (YYYY-MM-DD).
2. Utilize [parseLocalDate()](file:///media/Hybrid/Coding/habitflow/lib/utils/date.ts#7-13) to safely initialize today's date at 00:00:00 local time without shifting timezones.
3. Determine `daysBack = 30` (or dynamic).
4. Iterate from `daysBack - 1` down to `0`. During each iteration:
   - Subtract `i` days from `todayDate`.
   - Reconstruct the local `YYYY-MM-DD` string manually padding month/day integers to completely bypass the `Date.toISOString()` UTC offset bug which causes "Midnight Drift".
   - Construct a [TimelineDay](file:///media/Hybrid/Coding/habitflow/lib/utils/timeline.ts#3-7) object: `{ dateStr: "YYYY-MM-DD", isCompleted: boolean }`.
5. Return the full `TimelineDay[]` array representing a stable 30-day mapping for the Heatmap.

**Acceptance Check**: 
The generator perfectly resolves the gap days where no completion exists, guaranteeing the UI receives precisely an array of length 30, pre-filled with correctly validated booleans, leaving the UI to purely render without doing any date-math.

---

## HF-15 Exact Technical Plan: The Consistency Heatmap (UI)
**Objective**: Build `components/charts/ConsistencyHeatmap.tsx`.

**Architecture**: 
- **Server Component Strategy**: This will be a standard React component that takes `completedDates` as props, ensuring no heavy chart JS is sent to the client.
- **Timeline Integration**: Calls [generateTimelineMap(completedDates, todayStr, 35)](file:///media/Hybrid/Coding/habitflow/lib/utils/timeline.ts#8-51). We use 35 days to form a perfect 5x7 grid.
- **CSS Grid Geometry (Tailwind)**: Evaluates via `grid grid-rows-7 grid-flow-col gap-1.5`. `grid-flow-col` forces the 35 squares to fill top-to-bottom iteratively before breaking to the next column, mimicking GitHub's historical view correctly (oldest dates on the left).
- **Zero-Drag Native Tooltips**: Utilizes raw HTML `title={day.dateStr}` for hover inspection, entirely avoiding tooltip computation scripts.
- **Binary Contrast Colors**: `bg-indigo-500` (accompanied by a subtle glowing border/shadow) for completions, and `bg-zinc-900 border border-zinc-800/60` for gaps. 
- **Integration**: We will embed this directly within the `/dashboard/habits` ([HabitList](file:///media/Hybrid/Coding/habitflow/components/habits/HabitList.tsx#6-15)) view—likely expanding the [HabitItem](file:///media/Hybrid/Coding/habitflow/components/habits/HabitItem.tsx#8-122) cards so that each habit distinctly visualizes its last 35 days.

## Validation Metrics
1. Pure Type Safety (`tsc --noEmit`).
2. Maximum payload verification mapping through our existing [serialize()](file:///media/Hybrid/Coding/habitflow/lib/utils/serialization.ts#1-7) utility.
3. No noticeable drag added to LCP for the Heatmap.
