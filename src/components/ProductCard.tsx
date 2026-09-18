// components/ProductCard.tsx
import { Card } from "./Card";
import { ChevronDown } from "lucide-react";

type Product = {
  id: string;
  name: string;
  icon?: string;
  createdAt: string;
};

// Hapus isExpanded dan onClick dari interface
type ProductCardProps = {
  product: Product;
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

export default function ProductCard({ product }: ProductCardProps) {
  const avatar = product.icon ? product.icon : getInitial(product.name);

  return (
    <Card className="flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors w-full">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-amber-200/40 flex items-center justify-center text-lg font-semibold">
          {avatar}
        </div>

        <div>
          <div className="font-medium">{toTitleCase(product.name)}</div>
          <div className="text-xs text-muted-foreground">
            Dibuat: {new Date(product.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* 
        Kita gunakan class data-[state=open] yang disuntikkan oleh Radix ke elemen trigger.
        Karena kita tidak pakai asChild, kita perlu memastikan parentnya (AccordionTrigger) 
        punya state ini. 
        Solusi: Kita biarkan AccordionTrigger membungkus ProductCard, 
        tapi kita harus pastikan ProductCard tidak blocking state.
      */}
      {/* <div className="transition-transform duration-200 group-data-[state=open]:rotate-180">
        <ChevronDown className="h-5 w-5 text-muted-foreground" />
      </div> */}
    </Card>
  );
}
