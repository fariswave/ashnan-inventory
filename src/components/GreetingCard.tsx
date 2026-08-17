import React from "react";
import { Card } from "./Card";

interface GreetingCardProps {
  userName?: string;
}

export function GreetingCard({ userName = "Ashnan" }: GreetingCardProps) {
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <Card className="bg-gradient-to-br from-amber-100/60 to-orange-100/40 border-amber-200/50 mb-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-amber-800/70">
          {getTimeGreeting()}, {userName}!
        </p>
        <p className="text-sm text-amber-800/60">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </Card>
  );
}
