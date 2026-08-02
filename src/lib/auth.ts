import { cookies } from "next/headers";
import db, { UserRow, SessionRow } from "@/lib/db";
import { redirect } from "next/navigation";

// Helper untuk mengambil data user yang sedang login
export async function getAuthenticatedUser() {
  //Ambil cookie 'session_id'
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;

  // Jika cookie tidak ada, user jelas belum login
  if (!sessionId) {
    return null;
  }

  //Cari Session ID di database sessions
  const findSessionStmt = db.prepare<[string], SessionRow>(
    "SELECT id, userId, expiresAt, createdAt FROM sessions WHERE id = ?",
  );
  const session = findSessionStmt.get(sessionId);

  // Jika session tidak ditemukan di DB, kembalikan null
  if (!session) {
    return null;
  }

  // Cek apakah session sudah expired
  const now = new Date();
  const expiresAt = new Date(session.expiresAt);

  if (now > expiresAt) {
    // Hapus sesi basi ini dari DB
    const deleteSessionStmt = db.prepare("DELETE FROM sessions WHERE id = ?");
    deleteSessionStmt.run(sessionId);

    return null;
  }

  // Ambil data User dari database berdasarkan user_id dari session
  const findUserStmt = db.prepare<[string], UserRow>(
    "SELECT id, name, email FROM users WHERE id = ?",
  );

  const user = findUserStmt.get(session.userId);

  // Jika user tiba-tiba tidak ada di DB (misal akun dihapus admin)
  if (!user) {
    return null;
  }

  // Return User jika lolos semua pengecekan
  return user;
}

export async function requireAuth() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function getSessionCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("session_id")?.value;
}

export async function deleteSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("session_id");
}
