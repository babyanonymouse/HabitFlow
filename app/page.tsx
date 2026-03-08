import { getTasks } from "@/lib/actions/task.actions";
import TestDbButton from "@/components/ui/TestDbButton";

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>HabitFlow — DB Proof</h1>
      <TestDbButton />
      <ul style={{ marginTop: "1rem" }}>
        {tasks.map((t) => (
          <li key={t._id}>
            [{t.priority}] {t.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
