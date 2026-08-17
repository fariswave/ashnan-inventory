import { requireAuth } from "@/lib/auth";

export default async function BatchesPage() {
  const user = await requireAuth();

  return (
    <div>
      <h1>Batches</h1>
      <p>Belum ada batches.</p>
    </div>
  );
}
