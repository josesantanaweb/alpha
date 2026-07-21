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
  image?: string | null;
}

interface SeedPerfume {
  name: string;
  designerName: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  stock: number;
  remainingMl: number;
  rating: number;
  reviewCount: number;
  type: "ARABIC" | "DESIGNER";
  gender: "MALE" | "FEMALE" | "UNISEX";
  discount: number;
}

interface SeedPerfumeInput {
  name: string;
  slug: string;
  designerName: string;
  description: string;
  price: number;
  image: string;
  type: "ARABIC" | "DESIGNER";
  gender: "MALE" | "FEMALE" | "UNISEX";
  discount: number;
}

interface SeedBanner {
  title: string;
  text: string;
  image: string;
  slug: string;
  order: number;
  isActive: boolean;
}

interface SeedVibe {
  name: string;
  image: string;
  description: string;
  slug: string;
  order: number;
}

const INITIAL_DESIGNERS: SeedDesigner[] = [
  { name: "Versace", slug: "versace", image: "/images/versace.svg" },
  { name: "Dior", slug: "dior", image: "/images/dior.svg" },
  { name: "Xerjoff", slug: "xerjoff", image: "/images/xerjoff.svg" },
  { name: "Tom Ford", slug: "tom-ford", image: "/images/tom-ford.svg" },
  { name: "Gucci", slug: "gucci", image: "/images/gucci.svg" },
  { name: "Louis Vuitton", slug: "louis-vuitton", image: "/images/louis-vuitton.svg" },
];

const INITIAL_ACCORDS = [
  { name: "Amaderado" },
  { name: "Floral" },
  { name: "Cítrico" },
  { name: "Oriental" },
  { name: "Acuático" },
  { name: "Fougère" },
  { name: "Aromático" },
  { name: "Dulce" },
];

const INITIAL_PERFUME_STATS = {
  stock: 1,
  remainingMl: 100,
  rating: 4.5,
  reviewCount: 0,
} as const;

const INITIAL_PERFUMES: SeedPerfume[] = (
  perfumesData as SeedPerfumeInput[]
).map((perfume) => ({
  ...perfume,
  ...INITIAL_PERFUME_STATS,
}));

const INITIAL_VIBES: SeedVibe[] = [
  {
    name: "Para la Noche",
    image: "https://i.ibb.co/WpcGktL2/noche.png",
    description: "Fragancias misteriosas e intensas",
    slug: "noche",
    order: 0,
  },
  {
    name: "Para Seducir",
    image: "https://i.ibb.co/gZG5srhZ/sexy.png",
    description: "Seducción a corta distancia",
    slug: "sexy",
    order: 1,
  },
  {
    name: "Para Oficina",
    image: "https://i.ibb.co/nN0LTP9P/oficina.png",
    description: "Fragancias frescas y ligeras",
    slug: "oficina",
    order: 2,
  },
];

const INITIAL_BANNERS: SeedBanner[] = [
  {
    title: "Scandal pour home",
    text: "Edicion Limitada",
    image: "https://i.ibb.co/WpGv4b0h/banner1.png",
    slug: "/explorer",
    order: 0,
    isActive: true,
  },
  {
    title: "Ton Ford",
    text: "Ombre leather",
    image: "https://i.ibb.co/W42L0tKN/banner2.jpg",
    slug: "/explorer",
    order: 1,
    isActive: true,
  },
];

async function main() {
  console.log("🌱 Iniciando el seeding..");

  await prisma.perfumeAccord.deleteMany();
  await prisma.perfume.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.accord.deleteMany();
  await prisma.designer.deleteMany();

  for (const designer of INITIAL_DESIGNERS) {
    await prisma.designer.upsert({
      where: { name: designer.name },
      update: {},
      create: {
        name: designer.name,
        slug: designer.slug,
        image: designer.image ?? null,
      },
    });
  }

  const createdAccords = [];
  for (const accord of INITIAL_ACCORDS) {
    const created = await prisma.accord.upsert({
      where: { name: accord.name },
      update: {},
      create: accord,
    });
    createdAccords.push(created);
  }

  for (const perfume of INITIAL_PERFUMES) {
    const designer = await prisma.designer.findUniqueOrThrow({
      where: { name: perfume.designerName },
    });

    const createdPerfume = await prisma.perfume.upsert({
      where: { name: perfume.name },
      update: {},
      create: {
        name: perfume.name,
        slug: perfume.slug,
        designerId: designer.id,
        description: perfume.description,
        price: perfume.price,
        image: perfume.image,
        stock: perfume.stock,
        remainingMl: perfume.remainingMl,
        rating: perfume.rating,
        reviewCount: perfume.reviewCount,
        type: perfume.type,
        gender: perfume.gender,
        discount: perfume.discount,
      },
    });

    const shuffledAccords = [...createdAccords].sort(() => 0.5 - Math.random());
    const selectedAccords = shuffledAccords.slice(0, Math.floor(Math.random() * 3) + 3);

    for (let i = 0; i < selectedAccords.length; i++) {
      const percentage = Math.floor(Math.random() * 80) + 10;
      await prisma.perfumeAccord.create({
        data: {
          perfumeId: createdPerfume.id,
          accordId: selectedAccords[i].id,
          percentage,
        }
      });
    }

    await prisma.season.create({
      data: {
        perfumeId: createdPerfume.id,
        winter: Math.floor(Math.random() * 500),
        summer: Math.floor(Math.random() * 500),
      }
    });

    await prisma.timeOfDay.create({
      data: {
        perfumeId: createdPerfume.id,
        day: Math.floor(Math.random() * 500),
        night: Math.floor(Math.random() * 500),
      }
    });
  }

  for (const banner of INITIAL_BANNERS) {
    await prisma.banner.create({
      data: banner,
    });
  }

  await prisma.vibe.deleteMany();

  for (const vibe of INITIAL_VIBES) {
    await prisma.vibe.create({
      data: vibe,
    });
  }

  console.log(`✅ Seeding se ha ejecutado con éxito.`);
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
