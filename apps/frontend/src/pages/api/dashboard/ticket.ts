import { prisma } from "@db/prisma";

import { NextApiRequest, NextApiResponse } from "next";
import {auth} from "@frontend/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await auth(req, res)
  if (!session?.user) {
    res.status(401).json({ message: "Not authenticated" });
    return ;
  }

  const body = await req.body;
  if (!body.color || +body.color < 1 || +body.color > 6) {
    res.status(200).json({ error: "Invalid color" });
    return ;
  }

  await prisma.user.update({
    where: {
      id: session?.user?.id!,
    },
    data: {
      color: +body.color,
    },
  });

  // @ts-ignore
  await res.revalidate(`/ticket/` + session?.user?.handle);

  res.status(200).json({ data: "Protected data" });
}
