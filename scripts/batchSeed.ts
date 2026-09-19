import db from "@/lib/db";
import { randomUUID } from "node:crypto";

const dummyBatches = [
  {
    quantity: 10,
    expiryDate: "2027-09-19",
    productId: "111f6ff4-d139-49c1-bbf9-bffb0c040c45",
  },
  {
    quantity: 10.5,
    expiryDate: "2026-09-19",
    productId: "a11ded17-a956-4d3b-9fc0-118a3bc19794",
  },
  {
    quantity: 1.99,
    expiryDate: "2026-09-26",
    productId: "58f50034-4fd5-47ff-bde4-931cd88d77d6",
  },
  {
    quantity: 10,
    expiryDate: "2027-09-01",
    productId: "a8b44c8a-7edc-48ae-bf0f-d5ddf53fe9ad",
  },
];

function batchSeed() {
  const insertStmt = db.prepare(`
		INSERT INTO batches (id, quantity, expiryDate, productId)
		VALUES (?, ?, ?, ?)
	`);

  const runTransaction = db.transaction((batches) => {
    for (const batch of batches) {
      const id = randomUUID();
      insertStmt.run(id, batch.quantity, batch.expiryDate, batch.productId);
    }
  });

  try {
    console.log("Memulai proses seeding...");
    runTransaction(dummyBatches);
    console.log("Seeding berhasil! Data produk telah ditambahkan.");
  } catch (error) {
    console.error("Seeding gagal:", error);
  } finally {
    db.close();
  }
}

batchSeed();
