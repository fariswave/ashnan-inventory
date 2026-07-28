import db from "@/lib/db";
import { randomUUID } from "node:crypto";
import bcrypt from "bcrypt";

async function runSeed() {
  try {
    //generate uuid dengan crypto
    const userId = randomUUID();
    console.log(`🆔 UUID Berhasil dibuat: ${userId}`);

    //hash password
    const plainPassword = "ashnan123";
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log("🔒 Password berhasil di-hash.");

    //insert into user
    const stmt = db.prepare(
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?) ON CONFLICT(email) DO NOTHING",
    );
    const result = stmt.run(
      userId,
      "ashnan",
      "ashnan@gmail.com",
      hashedPassword,
    );
    if (result.changes === 0) {
      console.log("⚠️ Email sudah ada, proses insert diabaikan.");
    } else {
      console.log("💾 Data user baru berhasil dimasukkan.");
    }
  } catch (error) {
    console.error("❌ Terjadi error saat seeding:", error);
  } finally {
    // Close database
    db.close();
    console.log("🔌 Koneksi database ditutup.");
  }
}

runSeed();
