import { auth } from '@frontend/auth';
import { prisma } from '@db/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await auth(req, res);
  // @ts-ignore
  if (!session || !session.user.isMod) {
    return res.json({ error: 'Not a mod' });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: req.query.id as string,
    },
    select: {
      squadId: true,
      ownedSquads: true,
      squad: {
        select: {
          members: {
            where: {
              banned: false,
              id: {
                not: req.query.id as string,
              },
            },
          },
        },
      },
    },
  });

  await prisma.user.update({
    where: {
      id: req.query.id as string,
    },
    data: {
      squadId: null,
    },
  });

  // if it was the only member of the squad, delete the squad
  if (user?.squad?.members?.length === 0) {
    await prisma.squad.delete({
      where: {
        id: user?.squadId!,
      },
    });
  }
  // if it was the owner of the squad, assign the first member as the owner
  else if (
    user?.ownedSquads?.[0]?.id &&
    (user?.squad?.members?.length || 0) > 0
  ) {
    await prisma.squad.update({
      where: {
        id: user?.squadId!,
      },
      data: {
        ownerId: user?.squad?.members?.[0]?.id!,
      },
    });
  }

  await res.revalidate(`/leaderboard/` + user?.squadId);
  return res.json({ error: 'Removed from squad' });
}
