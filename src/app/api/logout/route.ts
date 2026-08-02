import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getSessionCookie } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // Get session dari cookie
    const sessionId = await getSessionCookie();

    if (sessionId) {
      //Hapus session dari database
      const deleteStmt = db.prepare("DELETE FROM sessions WHERE id = ?");
      deleteStmt.run(sessionId);
    }

    const cookieStore = await cookies();
    cookieStore.delete("session_id");

    return NextResponse.json({ success: true, message: "Logout berhasil" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, message: "Logout gagal" },
      { status: 500 },
    );
  }
}
