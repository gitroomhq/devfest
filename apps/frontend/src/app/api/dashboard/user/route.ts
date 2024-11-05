import { auth } from '@frontend/auth';
import { prisma } from '@db/prisma';

export const GET = auth(async function GET(req) {
  return Response.json({
    id: req?.auth?.user?.id,
    name: req?.auth?.user?.name,
    isSquad: !!(await prisma.squad.count({
      where: {
        members: {
          some: {
            id: req?.auth?.user?.id,
          },
        },
      },
    })),
    owner: !!(await prisma.squad.findFirst({
      where: {
        ownerId: req?.auth?.user?.id,
      },
    })),
    isWinner: !!(await prisma.winners.count({
      where: {
        userId: req?.auth?.user?.id,
      },
    })),
    squad: await prisma.squad.findFirst({
      where: {
        members: {
          some: {
            id: req?.auth?.user?.id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        score: true,
        allowOthersToJoin: true,
        members: {
          select: {
            id: true,
            name: true,
            profilePicture: true,
            handle: true,
          },
        },
      },
    }),
  });
});
