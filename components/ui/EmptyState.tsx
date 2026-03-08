import { LucideIcon } from "lucide-react";

export default function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-800 p-12 text-center">
      <Icon size={32} className="text-zinc-600" />
      <p className="font-medium text-zinc-300">{title}</p>
      <p className="text-sm text-zinc-500">{description}</p>
    </div>
  );
}
