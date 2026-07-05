import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg(process.env.DATABASE_URL ?? ""),
});

interface SeedDesigner {
  name: string;
  slug: string;
}

interface SeedPerfume {
  name: string;
  designerName: string;
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

const INITIAL_DESIGNERS: SeedDesigner[] = [
  { name: "Giorgio Armani", slug: "giorgio-armani" },
];

const INITIAL_CATEGORIES = [
  { name: "Diseñador", icon: "Gem" },
  { name: "Arabe", icon: "Sunrise" },
  { name: "Decant", icon: "Pipette" },
];

const INITIAL_PERFUMES: SeedPerfume[] = [
  {
    name: "Acqua di Gio",
    designerName: "Giorgio Armani",
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
    categoryName: "Diseñador",
  },
];

const INITIAL_BANNERS: SeedBanner[] = [
  {
    title: "Scandal pour home",
    text: "Edicion Limitada",
    image: "https://i.ibb.co/WpGv4b0h/banner1.png",
    link: "/explorer",
    order: 0,
    isActive: true,
  },
  {
    title: "Ton Ford",
    text: "Ombre leather",
    image: "https://i.ibb.co/W42L0tKN/banner2.jpg",
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
  await prisma.designer.deleteMany();

  for (const designer of INITIAL_DESIGNERS) {
    await prisma.designer.upsert({
      where: { name: designer.name },
      update: {},
      create: {
        name: designer.name,
        slug: designer.slug,
      },
    });
  }

  for (const category of INITIAL_CATEGORIES) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name
      },
    });
  }

  for (const perfume of INITIAL_PERFUMES) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { name: perfume.categoryName },
    });
    const designer = await prisma.designer.findUniqueOrThrow({
      where: { name: perfume.designerName },
    });

    await prisma.perfume.upsert({
      where: { name: perfume.name },
      update: {},
      create: {
        name: perfume.name,
        designerId: designer.id,
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
