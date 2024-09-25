import { prisma } from '@db/prisma';

export const repositories = async () => {
  const list = await prisma.repositories.findMany({
    where: {
      allowed: true,
    },
    orderBy: {
      sponsored: 'desc',
    },
  });

  return list.map(({ allowed, id, sponsored, nameOwner }) => ({
    allowed,
    id,
    sponsored,
    nameOwner,
  }));
};
