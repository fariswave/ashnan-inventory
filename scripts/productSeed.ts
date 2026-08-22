import db from "@/lib/db";
import { randomUUID } from "node:crypto";

const dummyProducts = [
  { name: 'Kopi Susu Gula Aren', unit: 'ML', icon: '☕', userId: '040d4c75-f971-4e86-b976-9524e55d0656' },
  { name: 'Beras Pandan Wangi', unit: 'KG', icon: '🌾', userId: '040d4c75-f971-4e86-b976-9524e55d0656' },
  { name: 'Sabun Mandi Cair', unit: 'ML', icon: '🧼', userId: '040d4c75-f971-4e86-b976-9524e55d0656' },
  { name: 'Indomie Goreng', unit: 'PCS', icon: '🍜', userId: '040d4c75-f971-4e86-b976-9524e55d0656' },
  { name: 'Minyak Goreng 2L', unit: 'L', icon: '🧪', userId: '040d4c75-f971-4e86-b976-9524e55d0656' },
  { name: 'Garam Dapur', unit: 'G', icon: '🧂', userId: '040d4c75-f971-4e86-b976-9524e55d0656' }
];

function productSeed() {
  const insertStmt = db.prepare(`
    INSERT INTO products (id, name, unit, icon, userId)
    VALUES (?, ?, ?, ?, ?)  
  `);

  const runTransaction = db.transaction((products) => {
    for (const product of products) {
      const id = randomUUID();
      insertStmt.run(id, product.name, product.unit, product.icon, product.userId);
    }
  });

  try {
    console.log('Memulai proses seeding...');
    runTransaction(dummyProducts);
    console.log('Seeding berhasil! Data produk telah ditambahkan.');
  } catch (error) {
    console.error('Seeding gagal:', error);
  } finally {
    db.close();
  }
}

productSeed();
