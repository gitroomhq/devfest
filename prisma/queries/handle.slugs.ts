import { prisma } from "@/prisma";

export const handleSlugs = () => {
  return prisma.user.findMany({
    select: {
      handle: true,
    },
  });
};
