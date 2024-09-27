import { auth } from '@frontend/auth';
import { prisma } from '@db/prisma';

export const GET = auth(async (req, context) => {
  const isAuthenticated = await prisma.productHunt.count({
    where: {
      userId: req?.auth?.user?.id! as string,
    }
  });

  return Response.json({
    isAuthenticated: isAuthenticated > 0,
  });
});
