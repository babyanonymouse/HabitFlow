import { CheckSquare, Flame, Zap } from "lucide-react";

export type WeeklySnapshotData = {
  tasksCompletedThisWeek: number;
  habitCompletionRate: number;
  bestStreak: number;
};

const tiles = [
  {
    key: "tasksCompletedThisWeek" as const,
    label: "Tasks Done",
    sublabel: "this week",
    icon: CheckSquare,
    color: "text-emerald-400",
    ring: "ring-emerald-500/20",
    bg: "bg-emerald-500/10",
    glow: "bg-emerald-500/5",
    format: (v: number) => String(v),
  },
  {
    key: "habitCompletionRate" as const,
    label: "Habit Rate",
    sublabel: "today",
    icon: Flame,
    color: "text-orange-400",
    ring: "ring-orange-500/20",
    bg: "bg-orange-500/10",
    glow: "bg-orange-500/5",
    format: (v: number) => `${v}%`,
  },
  {
    key: "bestStreak" as const,
    label: "Best Streak",
    sublabel: "active days",
    icon: Zap,
    color: "text-indigo-400",
    ring: "ring-indigo-500/20",
    bg: "bg-indigo-500/10",
    glow: "bg-indigo-500/5",
    format: (v: number) => String(v),
  },
];

export default function WeeklySnapshot({
  snapshot,
}: {
  snapshot: WeeklySnapshotData;
}) {
  const isAllZero =
    snapshot.tasksCompletedThisWeek === 0 &&
    snapshot.habitCompletionRate === 0 &&
    snapshot.bestStreak === 0;

  if (isAllZero) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 text-center">
        <p className="text-sm text-zinc-500">
          Start your first habit or task to see your weekly stats here.
        </p>
      </div>
    );
  }

  return (
    // grid-cols-1 stacks on mobile (common for quick habit checks);
    // sm:grid-cols-3 spreads tiles on wider screens
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {tiles.map(({ key, label, sublabel, icon: Icon, color, ring, bg, glow, format }) => (
        <div
          key={key}
          className={`relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5`}
        >
          {/* Subtle background glow per tile accent */}
          <div
            className={`absolute -top-6 -right-6 w-24 h-24 ${glow} blur-2xl rounded-full pointer-events-none`}
          />

          <div className="relative z-10 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">
                {label}
              </p>
              <p className={`text-3xl font-bold tracking-tight ${color}`}>
                {format(snapshot[key])}
              </p>
              <p className="text-xs text-zinc-600 mt-0.5">{sublabel}</p>
            </div>
            <div className={`p-2 rounded-xl ${bg} ring-1 ${ring} shrink-0`}>
              <Icon size={18} className={color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
