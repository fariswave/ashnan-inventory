"use client";

import { ProductRow } from "@/lib/db";
import ProductCard from "./ProductCard";
import { AddProductDialog } from "./AddProductDialog";

interface ProductListProps {
  products: ProductRow[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Products</h1>
      <AddProductDialog />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p: ProductRow) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
