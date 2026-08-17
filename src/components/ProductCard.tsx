import React from "react";
import { Card } from "./Card";

type Product = {
  id: string;
  name: string;
  icon?: string;
  createdAt: string;
};

function getInitial(name: string) {
  const n = name?.trim();
  if (!n) return "?";
  return n[0].toUpperCase();
}

function toTitleCase(input: string) {
  const s = input?.trim();
  if (!s) return "";
  return s
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function ProductCard({ product }: { product: Product }) {
  const avatar = product.icon ? product.icon : getInitial(product.name);

  return (
    <Card className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-amber-200/40 flex items-center justify-center text-lg">
          {avatar}
        </div>
        <div>
          <div className="font-medium">{toTitleCase(product.name)}</div>
        </div>
      </div>
    </Card>
  );
}
