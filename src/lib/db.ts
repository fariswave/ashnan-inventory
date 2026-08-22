import Database from "better-sqlite3";
import path from "node:path";

// Di dalam src/lib/db.ts
export interface UserRow {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface SessionRow {
  id: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
}

export interface ProductRow {
  id: string;
  name: string;
  unit: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

const db = new Database(path.join(process.cwd(), "database", "database.db"));

db.pragma("foreign_keys = ON");

export default db;
