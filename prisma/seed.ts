// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
// import * as dotenv from "dotenv";

// dotenv.config({ path: "../.env" });

const prisma = new PrismaClient();

const INITIAL_CATEGORIES = [
  { name: "Citas y Seducción" },
  { name: "Modo Fiesta" },
  { name: "Elegancia y Oficina" },
  { name: "Uso Diario y Gimnasio" },
  { name: "Joyas Árabes" },
  { name: "Dulces y Gourmand" },
  { name: "Frescos y Cítricos" },
];

async function main() {
  console.log("🌱 Iniciando el seeding de categorías...");

  await prisma.category.deleteMany();

  for (const category of INITIAL_CATEGORIES) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name,
      },
    });
  }

  console.log(
    `✅ Se han cargado ${INITIAL_CATEGORIES.length} categorías con éxito.`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
