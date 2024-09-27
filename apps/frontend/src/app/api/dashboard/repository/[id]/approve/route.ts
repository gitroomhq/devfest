import { auth } from '@frontend/auth';
import { prisma } from '@db/prisma';

export const POST = auth(async (req, context) => {
  // @ts-ignore
  if (!req.auth.user.isMod) {
    return Response.json({
      status: 400,
      body: {
        error: 'You are not allowed to do this',
      },
    });
  }

  const body = await req.json();

  await prisma.repositories.update({
    where: {
      id: context?.params?.id! as string,
    },
    data: {
      allowed: !!body.approve,
    },
  });

  return Response.json({
    status: 200,
    body: {
      error: 'Success',
    },
  });
});
