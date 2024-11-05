import { prisma } from '@db/prisma';

export const getLeaderBoardNoCode = async () => {
  return prisma.user.findMany({
    where: {
      bannedNoCode: false,
    },
    select: {
      id: true,
      name: true,
      noCodeScore: true,
      bannedNoCode: true,
    },
    orderBy: {
      noCodeScore: 'desc',
    },
  });
};
