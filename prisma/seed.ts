import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
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

interface SeedPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  createdAt: Date;
}

const INITIAL_DESIGNERS: SeedDesigner[] = [
  { name: "Versace", slug: "versace", image: "/images/designers/versace.svg" },
  { name: "Dior", slug: "dior", image: "/images/designers/dior.svg" },
  { name: "Xerjoff", slug: "xerjoff", image: "/images/designers/xerjoff.svg" },
  { name: "Tom Ford", slug: "tom-ford", image: "/images/designers/tom-ford.svg" },
  { name: "Gucci", slug: "gucci", image: "/images/designers/gucci.svg" },
  { name: "Louis Vuitton", slug: "louis-vuitton", image: "/images/designers/louis-vuitton.svg" },
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

const DECANT_CONFIGS = [
  { ml: 5, priceFactor: 0.3, image: "/images/5ml.png" },
  { ml: 10, priceFactor: 0.5, image: "/images/10ml.png" },
] as const;

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
    description: "Fragancias misteriosas",
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

const INITIAL_POSTS: SeedPost[] = [
  {
    title: "¿Cómo elegir tu fragancia ideal?",
    slug: "como-elegir-tu-fragancia-ideal",
    content:
      "Elegir un perfume es una experiencia muy personal. Para acertar, identifica tus notas favoritas y las familias olfativas que más te atraen, prueba la fragancia sobre tu piel y déjala evolucionar a lo largo del día. Así encontrarás el perfume que mejor se adapta a tu estilo y a cada momento.",
    excerpt:
      "Descubre cómo identificar tus notas favoritas y encontrar el perfume que mejor se adapta a tu estilo y momento.",
    image: "https://i.ibb.co/Zpz0YMZN/post1.png",
    createdAt: new Date("2026-04-12T00:00:00.000Z"),
  },
  {
    title: "Tendencias en perfumería 2024",
    slug: "tendencias-en-perfumeria-2024",
    content:
      "Cada año trae nuevas propuestas olfativas que marcan el rumbo de la industria. Las notas y familias olfativas que dominarán este año van desde frescos cítricos hasta maderas profundas, con acuerdos que sorprenden y elevan los clásicos a nuevas versiones.",
    excerpt:
      "Las notas y familias olfativas que dominarán este año: desde frescos cítricos hasta maderas profundas.",
    image: "https://i.ibb.co/y13z5tK/post2.png",
    createdAt: new Date("2026-05-20T00:00:00.000Z"),
  },
  {
    title: "El arte de las notas olfativas",
    slug: "el-arte-de-las-notas-olfativas",
    content:
      "Una fragancia no huele igual durante todo el día: se despliega en notas de salida, corazón y fondo. Aprende a leer una pirámide olfativa y a entender cómo evoluciona una fragancia en tu piel con el tiempo para apreciar cada una de sus capas.",
    excerpt:
      "Aprende a leer una pirámide olfativa y a entender cómo evoluciona una fragancia en tu piel con el tiempo.",
    image: "https://i.ibb.co/7xJMJPrV/post3.png",
    createdAt: new Date("2026-04-12T00:00:00.000Z"),
  },
];

async function main() {
  console.log("🌱 Iniciando el seeding..");

  await prisma.perfumeAccord.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.userVote.deleteMany();
  await prisma.perfume.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.accord.deleteMany();
  await prisma.designer.deleteMany();
  await prisma.post.deleteMany();

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

    for (const config of DECANT_CONFIGS) {
      await prisma.decant.upsert({
        where: {
          perfumeId_ml: { perfumeId: createdPerfume.id, ml: config.ml },
        },
        update: {},
        create: {
          perfumeId: createdPerfume.id,
          ml: config.ml,
          price: Math.round(perfume.price * config.priceFactor * 100) / 100,
          image: config.image,
          stock: Math.floor(perfume.remainingMl / config.ml),
        },
      });
    }

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
        spring: Math.floor(Math.random() * 500),
        summer: Math.floor(Math.random() * 500),
        autumn: Math.floor(Math.random() * 500),
      }
    });

    await prisma.timeOfDay.create({
      data: {
        perfumeId: createdPerfume.id,
        day: Math.floor(Math.random() * 500),
        night: Math.floor(Math.random() * 500),
      }
    });

    await prisma.longevity.create({
      data: {
        perfumeId: createdPerfume.id,
        weak: Math.floor(Math.random() * 200),
        moderate: Math.floor(Math.random() * 400),
        long: Math.floor(Math.random() * 400),
        veryLong: Math.floor(Math.random() * 200),
      }
    });

    await prisma.feeling.create({
      data: {
        perfumeId: createdPerfume.id,
        hate: Math.floor(Math.random() * 50),
        dislike: Math.floor(Math.random() * 100),
        like: Math.floor(Math.random() * 400),
        love: Math.floor(Math.random() * 500),
      }
    });

    await prisma.sillage.create({
      data: {
        perfumeId: createdPerfume.id,
        soft: Math.floor(Math.random() * 200),
        moderate: Math.floor(Math.random() * 400),
        heavy: Math.floor(Math.random() * 300),
        huge: Math.floor(Math.random() * 100),
      }
    });

    await prisma.projection.create({
      data: {
        perfumeId: createdPerfume.id,
        soft: Math.floor(Math.random() * 200),
        moderate: Math.floor(Math.random() * 400),
        heavy: Math.floor(Math.random() * 300),
        huge: Math.floor(Math.random() * 100),
      }
    });

    const notePool = [
      { name: "Mandarina", image: "/images/notes/mandarina.png", stage: "TOP" },
      { name: "Moscada", image: "/images/notes/moscada.png", stage: "TOP" },
      { name: "Jasmine", image: "/images/notes/jasmine.png", stage: "HEART" },
      { name: "Esclarea", image: "/images/notes/esclarea.png", stage: "HEART" },
      { name: "Tabaco", image: "/images/notes/tabaco.png", stage: "BASE" },
      { name: "Vainilla", image: "/images/notes/vainilla.png", stage: "BASE" },
    ] as const;

    const shuffledNotes = [...notePool].sort(() => 0.5 - Math.random());
    const selectedNotes = shuffledNotes.slice(0, 4);

    for (const note of selectedNotes) {
      await prisma.note.create({
        data: {
          perfumeId: createdPerfume.id,
          name: note.name,
          image: note.image,
          stage: note.stage as "TOP" | "HEART" | "BASE",
        },
      });
    }
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

  for (const post of INITIAL_POSTS) {
    await prisma.post.create({
      data: post,
    });
  }

  const passwordHash = await bcrypt.hash("aura12345", 10);
  await prisma.user.upsert({
    where: { email: "admin@aura.com" },
    update: { role: "ADMIN" },
    create: {
      email: "admin@aura.com",
      password: passwordHash,
      name: "Admin",
      role: "ADMIN",
    },
  });

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
