import { generateTimelineMap } from "@/lib/utils/timeline";

type ConsistencyHeatmapProps = {
  completedDates: string[];
  todayStr: string;
  habitTitle: string;
};

export default function ConsistencyHeatmap({
  completedDates,
  todayStr,
  habitTitle,
}: ConsistencyHeatmapProps) {
  // Generate exact 35-day history for a 7x5 grid
  const timeline = generateTimelineMap(completedDates, todayStr, 35);

  return (
    <div
      role="img"
      aria-label={`Consistency heatmap for ${habitTitle}`}
      className="grid grid-rows-7 grid-flow-col gap-1 w-max"
    >
      {timeline.map((day) => (
        <div
          key={day.dateStr}
          title={day.dateStr}
          className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-xs aspect-square transition-all duration-300 ${
            day.isCompleted
              ? "bg-indigo-500 shadow-[0_0_8px_-2px_rgba(99,102,241,0.4)]"
              : "bg-zinc-900 border border-zinc-800/80"
          }`}
        />
      ))}
    </div>
  );
}
