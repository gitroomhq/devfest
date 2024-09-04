import { prisma } from "@/prisma";

export const addUserToSquad = async (userId: string, squadId: string) => {
  const getUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      squadId: true,
    },
  });

  if (getUser?.squadId) {
    return;
  }

  const getSquad = await prisma.squad.findFirst({
      where: {
        id: squadId,
      },
      select: {
          members: {
              select: {
                  id: true,
              }
          }
      }
  });

  if (!getSquad) {
      return ;
  }

  if (getSquad?.members?.length! >= 5) {
      return ;
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      squadId: squadId,
    },
  });
};
