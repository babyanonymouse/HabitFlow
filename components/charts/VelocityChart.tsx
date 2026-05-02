"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { VelocityData } from "@/lib/actions/task.actions";

/**
 * Renders a 7-day Task Completion Velocity chart.
 *
 * Empty-state contract: if `data` is empty or all zeroes, renders a
 * "flat-line" placeholder so the UI never collapses to nothing.
 */
export default function VelocityChart({ data }: { data: VelocityData[] }) {
  // If the server returned no data at all, render 7 flat-line placeholder days
  const chartData =
    data.length > 0
      ? data
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
          day,
          _dateStr: "",
          created: 0,
          completed: 0,
        }));

  const isEmpty = data.length === 0 || data.every((d) => d.created === 0 && d.completed === 0);

  return (
    <div className="w-full h-44 mt-2 relative">
      {isEmpty && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <p className="text-xs text-zinc-600 tracking-wide">No activity yet — complete your first task.</p>
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 8, right: 0, left: -24, bottom: 0 }}>
          <defs>
            <linearGradient id="gradCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradCreated" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#52525b" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#52525b" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#52525b", fontSize: 11 }}
            dy={6}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#52525b", fontSize: 11 }}
            allowDecimals={false}
            width={28}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            itemStyle={{ color: "#e4e4e7" }}
            labelStyle={{ color: "#71717a", marginBottom: "2px" }}
            cursor={{ stroke: "#3f3f46", strokeWidth: 1 }}
          />

          {/* Created — muted zinc line rendered below completed */}
          <Area
            type="monotone"
            dataKey="created"
            stroke="#52525b"
            strokeWidth={1.5}
            fillOpacity={1}
            fill="url(#gradCreated)"
            name="Created"
            dot={false}
            activeDot={{ r: 3, fill: "#71717a" }}
            isAnimationActive={false}
          />

          {/* Completed — indigo highlight rendered on top */}
          <Area
            type="monotone"
            dataKey="completed"
            stroke="#6366f1"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#gradCompleted)"
            name="Completed"
            dot={false}
            activeDot={{ r: 4, fill: "#818cf8" }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
