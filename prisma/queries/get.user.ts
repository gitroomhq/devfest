import { prisma } from "@/prisma";

export const getUser = (handle: string) => {
  return prisma.user.findFirst({
    where: {
      handle,
    },
    select: {
      id: true,
      color: true,
      name: true,
      handle: true,
      numericId: true,
    },
  });
};
