import { prisma } from '@db/prisma';

export const loadUserUnclaimedPrizes = async (userId: string) => {
  return prisma.winners.findMany({
    where: {
      userId: userId,
      claimed: null,
    },
    select: {
      id: true,
      type: true,
    },
  });
};
