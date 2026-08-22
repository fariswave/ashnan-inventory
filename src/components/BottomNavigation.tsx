"use client";

import { usePathname, useRouter } from "next/navigation";

export interface NavItem {
  id: string;
  icon: string;
  label: string;
  active?: boolean;
  path: string;
  onClick?: () => void;
}

interface BottomNavigationProps {
  items: NavItem[];
}

export function BottomNavigation({ items }: BottomNavigationProps) {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-amber-50 to-amber-50/95 backdrop-blur-sm border-t border-amber-100/40 px-4 py-2">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          // Tentukan status aktif berdasarkan URL saat ini
          const isActive = pathName === item.path;

          return (
            <button
              key={item.id}
              onClick={() => {
                router.push(item.path);
              }} // Pemicu navigasi browser
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all ${
                isActive
                  ? "bg-amber-200/50 text-amber-950"
                  : "text-amber-700/60 hover:bg-amber-100/30"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
