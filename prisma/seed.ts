import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SeedPerfume {
  name: string;
  designer: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  remainingMl: number;
  rating: number;
  reviewCount: number;
  type: "ARABIC" | "DESIGNER";
  gender: "MALE" | "FEMALE" | "UNISEX";
  categoryName: string;
}

interface SeedBanner {
  title: string;
  text: string;
  image: string;
  link: string;
  order: number;
  isActive: boolean;
}

const INITIAL_CATEGORIES = [
  { name: "Citas y Seducción" },
  { name: "Modo Fiesta" },
  { name: "Elegancia y Oficina" },
  { name: "Uso Diario y Gimnasio" },
  { name: "Joyas Árabes" },
  { name: "Dulces y Gourmand" },
  { name: "Frescos y Cítricos" },
];

const INITIAL_PERFUMES: SeedPerfume[] = [
  {
    name: "Acqua di Gio",
    designer: "Giorgio Armani",
    description:
      "Acqua di Gio (Parfum) by Giorgio Armani is a fragrance for men and was introduced in 2023",
    price: 109.0,
    image: "https://i.ibb.co/LXV97DV0/mp-7368-bottle-2.png",
    type: "DESIGNER",
    gender: "MALE",
    stock: 0,
    remainingMl: 0,
    rating: 0,
    reviewCount: 0,
    categoryName: "Citas y Seducción",
  },
];

const INITIAL_BANNERS: SeedBanner[] = [
  {
    title: "Scandal pour home",
    text: "Edicion Limitada",
    image: "/images/banner1.png",
    link: "/explorer",
    order: 0,
    isActive: true,
  },
  {
    title: "Ton Ford",
    text: "Ombre leather",
    image: "/images/banner2.JPG",
    link: "/explorer",
    order: 1,
    isActive: true,
  },
];

async function main() {
  console.log("🌱 Iniciando el seeding..");

  await prisma.perfume.deleteMany();
  await prisma.banner.deleteMany();
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

  for (const perfume of INITIAL_PERFUMES) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { name: perfume.categoryName },
    });

    await prisma.perfume.upsert({
      where: { name: perfume.name },
      update: {},
      create: {
        name: perfume.name,
        designer: perfume.designer,
        description: perfume.description,
        price: perfume.price,
        image: perfume.image,
        type: perfume.type,
        gender: perfume.gender,
        categoryId: category.id,
      },
    });
  }

  for (const banner of INITIAL_BANNERS) {
    await prisma.banner.create({
      data: banner,
    });
  }

  console.log(
    `✅ Seeding se ha ejecutado con éxito.`
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
