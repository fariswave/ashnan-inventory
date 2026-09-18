import db, { ProductRow } from "@/lib/db";
import { randomUUID } from "node:crypto";
import { addProductSchema } from "@/validation/addProducts";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const user = await requireAuth();
    const rawData = await request.json();
    const validatedFields = addProductSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, unit } = validatedFields.data;

    const checkProductStmt = db.prepare<[string, string], ProductRow>(
      "SELECT id FROM products WHERE lower(name) = ? AND userId = ?",
    );

    const existingProduct = checkProductStmt.get(name.toLowerCase(), user.id);

    if (existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product is already registered!", // Ganti dari `errors` ke `message` },
        },
        { status: 400 },
      );
    }

    const productId = randomUUID();

    const insertProductStmt = db.prepare(
      "INSERT INTO products (id, name, unit, userId) VALUES (?, ?, ?, ?)",
    );
    insertProductStmt.run(productId, name, unit, user.id);

    return NextResponse.json({
      success: true,
      message: "Product succesfully added!",
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal pada server." },
      { status: 500 },
    );
  }
}
