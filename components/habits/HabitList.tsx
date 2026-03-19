"use client";
import React from "react"; // Forcing IDE re-parse

import HabitItem from "./HabitItem";

export default function HabitList({ initialHabits }: { initialHabits: any[] }) {
  return (
    <div className="space-y-4">
      {initialHabits.map((habit) => (
        <HabitItem key={habit._id} habit={habit} />
      ))}
    </div>
  );
}
