import { prisma } from "@db/prisma";

export const getSquadById = (id: string) => {
  return prisma.squad.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      score: true,
      name: true,
      members: {
        select: {
          id: true,
          name: true,
          handle: true,
          image: true,
          score: true,
          bonus: true,
          banned: true,
          prs: true,
          bonuses: {
            select: {
              id: true,
              score: true,
            },
          },
        },
      },
    },
  });
};
