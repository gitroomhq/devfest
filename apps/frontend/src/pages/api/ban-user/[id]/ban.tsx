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
      bannedNoCode: true,
      squadId: true,
    },
  });

  await prisma.user.update({
    where: {
      id: req.query.id as string,
    },
    data: {
      bannedNoCode: !user?.bannedNoCode,
    },
  });

  await res.revalidate(`/nocode-leaderboard`);
  await res.revalidate(`/nocode-leaderboard/` + req.query.id);
  return res.json({ error: 'Banned user' });
}
