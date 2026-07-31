import bcrypt from "bcrypt";
import db, { UserRow } from "@/lib/db";
import { randomUUID } from "node:crypto";
import { userRegisterSchema } from "@/validation/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const rawData = await request.json();

    // Validasi input menggunakan Zod
    const validatedFields = userRegisterSchema.safeParse(rawData);

    if (!validatedFields.success) {
      // Mengubah format error Zod menjadi Record<string, string[]> yang rapi
      return NextResponse.json(
        {
          success: false,
          errors: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, password } = validatedFields.data;

    // Cek email duplikat
    const checkEmailStmt = db.prepare<[string], UserRow>(
      "SELECT id FROM users WHERE email = ?",
    );
    const existingUser = checkEmailStmt.get(email);

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          errors: { email: ["Email sudah terdaftar!"] },
        },
        { status: 400 },
      );
    }

    // Hash password & simpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = randomUUID();

    const insertStmt = db.prepare(
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
    );
    insertStmt.run(userId, name, email, hashedPassword);

    return NextResponse.json({
      success: true,
      message: "Registrasi berhasil!",
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal pada server." },
      { status: 500 },
    );
  }
}
