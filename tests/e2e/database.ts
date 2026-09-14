import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

let database: PrismaClient | undefined;

function getDatabase() {
  if (database) return database;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL es requerida para las pruebas E2E.");
  }

  database = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });
  return database;
}

export async function resetDatabase(): Promise<void> {
  await getDatabase().$executeRawUnsafe(
    'TRUNCATE TABLE "User", "Designer" RESTART IDENTITY CASCADE'
  );
}

export async function createTestPerfume() {
  const db = getDatabase();
  const designer = await db.designer.create({
    data: {
      name: "Maison E2E",
      slug: "maison-e2e",
    },
  });

  return db.perfume.create({
    data: {
      name: "Perfume E2E",
      slug: "perfume-e2e",
      type: "NICHE",
      gender: "UNISEX",
      price: 50,
      stock: 5,
      designerId: designer.id,
    },
  });
}

export async function findUserByEmail(email: string) {
  return getDatabase().user.findUnique({ where: { email } });
}

export async function findOrderByEmail(email: string) {
  return getDatabase().order.findFirst({
    where: { contactEmail: email },
    include: { items: true },
  });
}

export async function getPerfumeStock(perfumeId: string) {
  const perfume = await getDatabase().perfume.findUnique({
    where: { id: perfumeId },
    select: { stock: true },
  });

  return perfume?.stock;
}

export async function getCartItemCount(userId: string) {
  return getDatabase().cartItem.count({ where: { cart: { userId } } });
}

export async function disconnectDatabase(): Promise<void> {
  await database?.$disconnect();
  database = undefined;
}
