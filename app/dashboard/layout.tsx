import Sidebar from "@/components/ui/Sidebar";
import BottomNav from "@/components/ui/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sticky sidebar — hidden on mobile */}
      <Sidebar />
      {/* min-h-screen prevents bg cut-off on high-density mobile displays */}
      <main className="flex-1 min-h-screen pb-20 md:pb-0 md:pl-64">
        {children}
      </main>
      {/* Bottom nav — visible on mobile only */}
      <BottomNav />
    </div>
  );
}
