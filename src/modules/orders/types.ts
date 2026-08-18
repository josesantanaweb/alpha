import { Prisma } from "@prisma/client";

export const orderInclude = {
  items: {
    include: {
      perfume: {
        include: {
          designer: true,
        },
      },
      decant: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  },
} satisfies Prisma.OrderInclude;

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: typeof orderInclude;
}>;