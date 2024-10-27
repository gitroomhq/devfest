import { prisma } from '@db/prisma';

export const getUserById = (id: string) => {
  return prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      handle: true,
      noCodeScore: true,
      name: true,
      toUserBonus: {
        select: {
          bonusFrom: {
            select: {
              id: true,
              name: true,
              handle: true,
            },
          },
        },
      },
    },
  });
};
