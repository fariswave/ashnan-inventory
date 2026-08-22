import { GreetingCard } from "@/components/GreetingCard";
import { SummaryCard } from "@/components/SummaryCard";
import { RecentActivity } from "@/components/RecentActivity";
import { requireAuth } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await requireAuth();

  const summaryData = [
    {
      title: "Total Products",
      value: "24",
      icon: "📦",
      bgColor: "bg-orange-50/60",
      iconBgColor: "bg-orange-200/50",
      description: "12 types in stock",
    },
    {
      title: "Total Batches",
      value: "8",
      icon: "🛒",
      bgColor: "bg-yellow-50/60",
      iconBgColor: "bg-yellow-200/50",
      description: "Active batches",
    },
    {
      title: "Expiring Soon",
      value: "3",
      icon: "⏰",
      bgColor: "bg-amber-100/60",
      iconBgColor: "bg-amber-200/50",
      description: "Within 7 days",
    },
    {
      title: "Expired",
      value: "0",
      icon: "❌",
      bgColor: "bg-red-50/60",
      iconBgColor: "bg-red-200/50",
      description: "Items past date",
    },
  ];

  const activities = [
    {
      id: "1",
      description: "Added 24 units of Tomato",
      timestamp: "Today at 10:30 AM",
      icon: "🍅",
    },
    {
      id: "2",
      description: "Updated Lettuce stock to 48 units",
      timestamp: "Today at 9:15 AM",
      icon: "🥬",
    },
    {
      id: "3",
      description: "Marked Spinach batch as quality checked",
      timestamp: "Yesterday at 2:45 PM",
      icon: "🌱",
    },
    {
      id: "4",
      description: "Created new batch: Carrots (Grade A)",
      timestamp: "Yesterday at 11:20 AM",
      icon: "🥕",
    },
  ];

  return (
    <>
      <div className="space-y-6 pb-4">
        <GreetingCard userName={user.name} />

        <div>
          <h2 className="text-sm font-bold text-amber-950 uppercase tracking-wide mb-3 px-1">
            Inventory Summary
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {summaryData.map((item, idx) => (
              <SummaryCard key={idx} {...item} />
            ))}
          </div>
        </div>

        <RecentActivity activities={activities} />
      </div>
    </>
  );
}
