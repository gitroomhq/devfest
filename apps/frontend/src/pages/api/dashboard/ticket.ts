import { prisma } from "@db/prisma";

import { NextApiRequest, NextApiResponse } from "next";
import {auth} from "@frontend/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await auth(req, res)
  if (!session?.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const body = await req.body;
  if (!body.color || +body.color < 1 || +body.color > 6) {
    return res.json({ error: "Invalid color" });
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

  return res.json({ data: "Protected data" });
}
