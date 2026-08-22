import { requireAuth } from "@/lib/auth";
import ProductCard from "@/components/ProductCard";
import { ProductRow } from "@/lib/db";
import db from "@/lib/db";

export default async function ProductsPage() {
  const user = await requireAuth();

  const products = db
    .prepare<[string], ProductRow>(`
      SELECT id, name, unit, icon, createdAt, updatedAt  
      FROM products
      WHERE userId = ?
      ORDER BY name COLLATE NOCASE ASC, id ASC
    `)
    .all(user.id);

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p: ProductRow) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
