"use client";

import { Check } from "lucide-react";

export default function PriorityTaskList({ tasks, onComplete }: { tasks: any[], onComplete: (id: string) => void }) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
        Priority Tasks
      </h2>
      <div className="grid gap-3">
        {tasks.map((task: any) => (
          <div key={task._id} className="flex items-start gap-3 bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-4 transition-colors hover:bg-zinc-900 group">
            <button
              onClick={() => onComplete(task._id)}
              className="mt-0.5 shrink-0 flex items-center justify-center w-5 h-5 rounded border border-zinc-600 bg-zinc-950 text-transparent hover:bg-emerald-500/20 hover:border-emerald-500 hover:text-emerald-400 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
              title="Complete Task"
            >
              <Check size={14} strokeWidth={3} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <h3 className="text-sm font-semibold text-zinc-100">{task.title}</h3>
                {task.priority === 'high' && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold bg-orange-500/10 text-orange-400">High Due</span>
                )}
                {task.deadline && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Today</span>
                )}
              </div>
              {task.description && <p className="text-xs text-zinc-400 line-clamp-1">{task.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
