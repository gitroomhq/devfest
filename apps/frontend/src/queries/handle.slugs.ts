import { prisma } from "@db/prisma";

export const handleSlugs = () => {
  return prisma.user.findMany({
    select: {
      handle: true,
    },
  });
};
