import React from "react";
import { Header } from "@/components/Header";
import { BottomNavigation, NavItem } from "@/components/BottomNavigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeNavId?: string;
  navItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { id: "dashboard", icon: "📊", label: "Dashboard", path: "/dashboard" },
  { id: "products", icon: "📦", label: "Products", path: "/products" },
  { id: "batches", icon: "🛒", label: "Batches", path: "/batches" },
  { id: "settings", icon: "⚙️", label: "Settings", path: "/settings" },
];

export default function DashboardLayout({
  children,
  activeNavId = "dashboard",
  navItems = defaultNavItems,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/80 to-orange-50/40">
      <Header />

      <div className="flex">
        <main className="flex-1 pb-24 lg:pb-8 min-h-screen">
          <div className="max-w-2xl lg:max-w-4xl mx-auto p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>

      <BottomNavigation items={navItems} />
    </div>
  );
}
