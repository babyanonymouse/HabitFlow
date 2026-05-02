import { parseLocalDate } from "./date";

export type TimelineDay = {
  dateStr: string;
  isCompleted: boolean;
};

/**
 * Generates a contiguous array of `TimelineDay` objects for the past `daysBack` days.
 * 
 * Strategic Systems Implementations:
 * 1. O(1) Lookups: Loads completedDates into a Set for near-instant validation checks.
 * 2. Timezone Hardening: Anchors cleanly around `todayStr` and reconstructs `en-CA` 
 *    localized strings manually to completely sidestep `Date.toISOString()` UTC-drift behaviors.
 * 3. Pure JSON Native: The output is an array of raw primitives, so it does not
 *    require the `serialize()` wrapper for Next.js boundary traversal.
 */
export function generateTimelineMap(
  completedDates: string[],
  todayStr: string,
  daysBack: number = 30
): TimelineDay[] {
  // Convert array to Set for O(1) lookup during iteration
  const completionSet = new Set(completedDates || []);
  
  // Safely anchor exactly at 00:00:00 local time without shifting timezones
  const todayDate = parseLocalDate(todayStr);
  const timeline: TimelineDay[] = [];

  // Iterate backwards from (today - 29 days) up to today
  for (let i = daysBack - 1; i >= 0; i--) {
    const d = new Date(todayDate);
    
    // JS Date inherently handles month/year rollovers perfectly
    d.setDate(d.getDate() - i);

    // Reconstruct string locally, enforcing exact padding safely
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    timeline.push({
      dateStr,
      isCompleted: completionSet.has(dateStr),
    });
  }

  return timeline;
}
