import { auth } from '@frontend/auth';
import { prisma } from '@db/prisma';

export const GET = auth(async (req, context) => {
  const bonuses = await prisma.bonuses.findMany({
    where: {
      userId: req?.auth?.user?.id! as string,
    },
    select: {
      identifier: true,
      score: true,
    },
  });

  return Response.json({
    status: 200,
    body: {
      bonuses,
    },
  });
});
