import { auth } from '@frontend/auth';
import { prisma } from '@db/prisma';
import { starsBonus } from '@frontend/utils/stars.bonus';

const getStars = async (accessToken: string) => {
  try {
    const list = await fetch(`https://api.github.com/user/starred`, {
      method: 'GET',
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    return list.json();
  } catch (e) {
    return (
      await fetch(`https://api.github.com/user/starred`, {
        method: 'GET',
      })
    ).json();
  }
};

export const POST = auth(async (req, context) => {
  const body = await req.json();
  const findRepo = starsBonus.find((p) => body.repository === p)!;
  const bonuses = await prisma.bonuses.findFirst({
    where: {
      identifier: `star-${findRepo?.toLowerCase()}`,
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

  const list = await getStars(account?.access_token!);

  if (!list.some((p: any) => starsBonus.includes(p.full_name.toLowerCase()))) {
    return Response.json({
      success: false,
    });
  }

  await prisma.bonuses.create({
    data: {
      identifier: `star-${findRepo?.toLowerCase()!}`,
      score: 1,
      userId: req?.auth?.user?.id! as string,
    },
  });

  return Response.json({
    success: true,
  });
});
