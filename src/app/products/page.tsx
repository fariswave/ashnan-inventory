import { requireAuth } from "@/lib/auth";
import ProductCard from "@/components/ProductCard";

interface ProductItem {
  id: string;
  name: string;
  icon: string;
  createdAt: string;
}

interface productProps {
  products?: ProductItem[];
}

const defaultProducts: ProductItem[] = [
  {
    id: "prod_1",
    name: "mangga",
    icon: "🥭",
    createdAt: "2026-08-17",
  },
  {
    id: "prod_2",
    name: "mango",
    icon: "🥭",
    createdAt: "2026-08-17",
  },
  {
    id: "prod_3",
    name: "pisang",
    icon: "🍌",
    createdAt: "2026-08-17",
  },
  {
    id: "prod_4",
    name: "banana",
    icon: "🍌",
    createdAt: "2026-08-17",
  },
  {
    id: "prod_5",
    name: "apel",
    icon: "",
    createdAt: "2026-08-17",
  },
  {
    id: "prod_6",
    name: "orange",
    icon: "🍊",
    createdAt: "2026-08-17",
  },
  {
    id: "prod_7",
    name: "jeruk",
    icon: "",
    createdAt: "2026-08-17",
  },
  {
    id: "prod_8",
    name: "nanas",
    icon: "🍍",
    createdAt: "2026-08-17",
  },
  {
    id: "prod_9",
    name: "strawberry",
    icon: "🍓",
    createdAt: "2026-08-17",
  },
  {
    id: "prod_10",
    name: "semangka",
    icon: "",
    createdAt: "2026-08-17",
  },
];

export default async function ProductsPage() {
  const user = await requireAuth();
  const productsFromDb = null as any; // ganti dengan query db kamu

  const products = productsFromDb?.length ? productsFromDb : defaultProducts;

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p: ProductItem) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
