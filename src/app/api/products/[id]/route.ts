// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { addProductSchema } from "@/validation/addProducts";
import { requireAuth } from "@/lib/auth";
import { ProductRow } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    // Cek apakah product punya user yang sama
    const checkProductStmt = db.prepare<[string, string], ProductRow>(
      "SELECT id FROM products WHERE id = ? AND userId = ?",
    );
    const existingProduct = checkProductStmt.get(id, user.id);

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found or unauthorized" },
        { status: 404 },
      );
    }

    // Update product
    const deleteProductStmt = db.prepare(
      "DELETE FROM products WHERE id = ? AND userId = ?",
    );
    deleteProductStmt.run(id, user.id);

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireAuth();
    const { id } = await params;
    const rawData = await request.json();
    const validatedFields = addProductSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return NextResponse.json(
        { success: false, errors: validatedFields.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { name, unit } = validatedFields.data;

    // Cek apakah product punya user yang sama
    const checkProductStmt = db.prepare<[string, string], ProductRow>(
      "SELECT id FROM products WHERE id = ? AND userId = ?",
    );
    const existingProduct = await checkProductStmt.get(id, user.id);

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found or unauthorized" },
        { status: 404 },
      );
    }

    // Update product
    const updateProductStmt = db.prepare(
      "UPDATE products SET name = ?, unit = ? WHERE id = ? AND userId = ?",
    );
    await updateProductStmt.run(name, unit, id, user.id);

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
