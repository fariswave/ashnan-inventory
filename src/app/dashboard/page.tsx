import { requireAuth } from "@/lib/auth";
import { LogoutButton } from "@/components/LogoutButton";

export default async function DashboardPage() {
  // Panggil helper getSession
  const user = await requireAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <LogoutButton />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          <p>
            Halo, <strong>{user.name}</strong>!
          </p>
          <p>Email Anda: {user.email}</p>
          <p>
            Status Server: Mengetahui Anda sudah login menggunakan Cookie. ✅
          </p>
        </div>{" "}
      </main>
    </div>
  );
}
