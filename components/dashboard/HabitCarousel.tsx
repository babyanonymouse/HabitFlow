"use client";

import { Flame, Check } from "lucide-react";
import { calculateStreak } from "@/lib/utils/date";

export default function HabitCarousel({ habits, onCheckOff, todayStr }: { habits: any[], onCheckOff: (id: string) => void, todayStr: string }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
        Pending Habits
      </h2>
      {/* Container to allow full width scroll on mobile but neat fit on desktop */}
      <div className="-mx-6 px-6 md:mx-0 md:px-0">
        <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pt-1 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {habits.map((habit: any) => {
            const currentStreak = calculateStreak(habit.completedDates || [], todayStr);
            return (
              <div 
                key={habit._id} 
                className="snap-start shrink-0 w-[85%] sm:w-[280px] bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col relative overflow-hidden group min-h-[140px]"
              >
                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
                
                <div className="flex-1 mb-4">
                  <h3 className="text-base font-bold text-white leading-tight mb-1 line-clamp-2">{habit.title}</h3>
                  {habit.description && <p className="text-sm text-zinc-400 line-clamp-2">{habit.description}</p>}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${currentStreak > 0 ? "bg-orange-500/10 border-orange-500/20 text-orange-400" : "bg-zinc-800 border-zinc-700 text-zinc-500"}`}>
                    <Flame size={14} className={currentStreak > 0 ? "fill-orange-400/50" : ""} />
                    <span className="font-bold text-xs">{currentStreak} Day{currentStreak === 1 ? "" : "s"}</span>
                  </div>

                  <button
                    onClick={() => onCheckOff(habit._id)}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold text-sm hover:bg-emerald-500 hover:border-emerald-500 hover:text-emerald-950 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900 shadow-sm"
                    title="Check Off"
                  >
                    <Check size={16} strokeWidth={2.5} />
                    <span>Done</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
