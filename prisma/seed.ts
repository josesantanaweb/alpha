import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import perfumesData from "./data/perfumes.json";

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

interface SeedPerfumeInput {
  name: string;
  designerName: string;
  description: string;
  price: number;
  image: string;
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
  { name: "Nicho", icon: "FlaskRound" },
];

const INITIAL_PERFUME_STATS = {
  stock: 1,
  remainingMl: 100,
  rating: 0,
  reviewCount: 0,
} as const;

const INITIAL_PERFUMES: SeedPerfume[] = (perfumesData as SeedPerfumeInput[]).map(
  (perfume) => ({
    ...perfume,
    ...INITIAL_PERFUME_STATS,
  }),
);

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

function createSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  console.log("🌱 Iniciando el seeding..");

  await prisma.perfume.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.category.deleteMany();
  await prisma.designer.deleteMany();

  const designerNames = Array.from(
    new Set([
      ...INITIAL_DESIGNERS.map((designer) => designer.name),
      ...INITIAL_PERFUMES.map((perfume) => perfume.designerName),
    ]),
  );

  for (const designerName of designerNames) {
    const existingDesigner = INITIAL_DESIGNERS.find(
      (designer) => designer.name === designerName,
    );

    await prisma.designer.upsert({
      where: { name: designerName },
      update: {},
      create: {
        name: designerName,
        slug: existingDesigner?.slug ?? createSlug(designerName),
      },
    });
  }

  const categoryNames = Array.from(
    new Set([
      ...INITIAL_CATEGORIES.map((category) => category.name),
      ...INITIAL_PERFUMES.map((perfume) => perfume.categoryName),
    ]),
  );

  for (const categoryName of categoryNames) {
    const initialCategory = INITIAL_CATEGORIES.find(
      (category) => category.name === categoryName,
    );

    await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: {
        name: categoryName,
        icon: initialCategory?.icon,
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
