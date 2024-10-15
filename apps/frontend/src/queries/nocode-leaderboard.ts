import { prisma } from '@db/prisma';

export const getLeaderBoardNoCode = async () => {
  return prisma.user.findMany({
    where: {
      banned: false,
    },
    select: {
      id: true,
      name: true,
      noCodeScore: true,
    },
    orderBy: {
      noCodeScore: 'desc',
    },
  });
};
