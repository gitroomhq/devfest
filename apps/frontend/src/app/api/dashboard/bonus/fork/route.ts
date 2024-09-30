import { auth } from '@frontend/auth';
import { prisma } from '@db/prisma';
import { starsBonus } from '@frontend/utils/stars.bonus';

export const POST = auth(async (req, context) => {
  const body = await req.json();
  const findRepo = starsBonus.find((p) => body.repository === p);
  const bonuses = await prisma.bonuses.findFirst({
    where: {
      identifier: `fork-${findRepo?.toLowerCase()}`,
      userId: req?.auth?.user?.id! as string,
    },
  });

  if (bonuses) {
    return Response.json({
      status: 400,
      body: {
        error: 'You already have this bonus',
      },
    });
  }

  const account = await prisma.account.findFirst({
    where: {
      userId: req?.auth?.user?.id! as string,
    },
    select: {
      access_token: true,
    },
  });

  const list = await (
    await fetch(`https://api.github.com/repos/${findRepo}/forks`, {
      method: 'GET',
      headers: {
        Authorization: `token ${account?.access_token}`,
      },
    })
  ).json();

  // @ts-ignore
  if (!list.find((p: any) => p.full_name.toLowerCase().indexOf(req?.auth?.user.handle.toLowerCase()) > -1)) {
    return Response.json({
      success: false,
    });
  }

  await prisma.bonuses.create({
    data: {
      identifier: `fork-${findRepo?.toLowerCase()!}`,
      score: 1,
      userId: req?.auth?.user?.id! as string,
    },
  });

  return Response.json({
    success: true,
  });
});
