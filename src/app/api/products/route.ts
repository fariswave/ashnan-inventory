import db, { ProductRow } from "@/lib/db";
import { randomUUID } from "node:crypto";
import { addProductSchema } from "@/validation/addProducts";
import { NextResponse } from "next/server";
