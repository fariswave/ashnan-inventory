import Database from "better-sqlite3";
import path from "node:path";

// Di dalam src/lib/db.ts
export interface UserRow {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: string;
}

const db = new Database(path.join(process.cwd(), "database", "database.db"));

db.pragma("foreign_keys = ON");

export default db;
