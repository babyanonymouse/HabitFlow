"use client";

import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import type { VelocityData } from "@/lib/actions/task.actions";

export default function VelocityChart({ data }: { data: VelocityData[] }) {
  // Format dates for display (e.g. "Mar 16")
  const chartData = useMemo(() => {
    return data.map(d => {
      const parts = d.dateStr.split('-');
      if (parts.length < 3) return { ...d, displayDate: d.dateStr };
      const date = new Date(parseInt(parts[0]!), parseInt(parts[1]!) - 1, parseInt(parts[2]!));
      return {
        ...d,
        displayDate: date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      };
    });
  }, [data]);

  if (!data || data.length === 0) return null;

  return (
    <div className="w-full h-48 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#52525b" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#52525b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
          <XAxis 
            dataKey="displayDate" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#71717a", fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#71717a", fontSize: 12 }} 
            allowDecimals={false}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "8px" }}
            itemStyle={{ color: "#e4e4e7" }}
            labelStyle={{ color: "#a1a1aa", marginBottom: "4px" }}
          />
          <Area 
            type="monotone" 
            dataKey="created" 
            stroke="#52525b" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorCreated)" 
            name="Tasks Created"
          />
          <Area 
            type="monotone" 
            dataKey="completed" 
            stroke="#6366f1" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorCompleted)" 
            name="Tasks Completed"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
