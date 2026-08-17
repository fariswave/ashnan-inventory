import React from "react";
import { LogoutButton } from "./LogoutButton";

export function Header() {
  return (
    <header className="sticky top-0 flex items-center justify-between border-b border-amber-100/40 bg-gradient-to-b from-amber-50/95 to-amber-50/85 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="text-2xl">🌾</div>
        <h1 className="text-xl font-bold text-amber-950">Ashnan</h1>
      </div>

      <LogoutButton />
    </header>
  );
}
