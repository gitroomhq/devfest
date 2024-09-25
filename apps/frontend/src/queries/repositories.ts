import { prisma } from '@db/prisma';

export const repositories = () => {
  return prisma.repositories.findMany({
    where: {
      allowed: true
    },
    orderBy: {
      sponsored: 'desc'
    }
  })
}
