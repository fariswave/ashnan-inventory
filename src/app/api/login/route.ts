import bcrypt from "bcrypt";
import db, { UserRow } from "@/lib/db";
import { randomUUID } from "node:crypto";
import { userLoginSchema } from "@/validation/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const rawData = await request.json();

    // Validasi input menggunakan Zod
    const validatedFields = userLoginSchema.safeParse(rawData);

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

    const { email, password } = validatedFields.data;

    const findUserStmt = db.prepare<[string], UserRow>(
      "SELECT id, password FROM users WHERE email = ?",
    );

    const user = findUserStmt.get(email);

    const invalidCredentialsError = {
      success: false,
      errors: { email: ["Email atau password anda salah!"] },
    };

    if (!user) {
      return NextResponse.json(invalidCredentialsError, {
        status: 400,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(invalidCredentialsError, {
        status: 400,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Login berhasil!",
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal pada server." },
      { status: 500 },
    );
  }
}
