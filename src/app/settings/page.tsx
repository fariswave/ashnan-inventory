import { requireAuth } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await requireAuth();

  return (
    <div>
      <h1>Settings</h1>
      <p>Belum ada settings.</p>
    </div>
  );
}
