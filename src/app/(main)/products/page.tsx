import { requireAuth } from "@/lib/auth";
import { ProductRow } from "@/lib/db";
import db from "@/lib/db";
import { ProductList } from "@/components/ProductList";
import { AddProductDialog } from "@/components/AddProductDialog";

export default async function ProductsPage() {
  const user = await requireAuth();

  const products = db
    .prepare<[string], ProductRow>(
      `
      SELECT id, name, unit, icon, createdAt, updatedAt  
      FROM products
      WHERE userId = ?
      ORDER BY name COLLATE NOCASE ASC, id ASC
    `,
    )
    .all(user.id);

  return (
    <div className="p-4">
      <AddProductDialog />
      <ProductList products={products} />
    </div>
  );
}
