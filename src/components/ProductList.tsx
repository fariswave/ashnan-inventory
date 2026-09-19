"use client";

import { useState } from "react";
import { ProductRow } from "@/lib/db";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Pencil, Package, Trash2 } from "lucide-react";
import { EditProductDialog } from "./EditProductDialog";
import { DeleteProductDialog } from "./DeleteProductDialog";

interface ProductListProps {
  products: ProductRow[];
}

export function ProductList({ products }: ProductListProps) {
  const [editProduct, setEditProduct] = useState<ProductRow | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<ProductRow | null>(null);

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Products</h1>
      <Accordion className="w-full">
        {/* Grid wrapper di dalam Accordion, bukan per item */}
        {products.map((p) => (
          <div key={p.id} className="border rounded-lg overflow-hidden">
            <AccordionItem
              value={p.id}
              className="border-0 rounded-none shadow-none"
            >
              <AccordionTrigger className="hover:no-underline px-4 py-3">
                <div className="flex items-center gap-3">
                  {/* Avatar / Icon */}
                  <div className="h-10 w-10 rounded-xl bg-amber-200/40 flex items-center justify-center text-lg font-semibold">
                    {p.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="text-left">
                    <div className="font-medium text-lg">{p.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Dibuat: {new Date(p.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-4 pt-2">
                <div className="flex flex-wrap gap-2 border-t pt-3">
                  <button
                    onClick={() => setEditProduct(p)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>

                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
                    <Package className="h-4 w-4" />
                    View Batches
                  </button>

                  <button
                    onClick={() => setDeleteProduct(p)}
                    className="ml-auto flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
      {/* Render EditProductDialog jika editProduct ada */}
      {editProduct && (
        <EditProductDialog
          product={editProduct}
          onClose={() => setEditProduct(null)}
        />
      )}
      {deleteProduct && (
        <DeleteProductDialog
          product={deleteProduct}
          onClose={() => setDeleteProduct(null)}
        />
      )}
    </div>
  );
}
