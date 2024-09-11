import { auth } from "@frontend/auth";
import { prisma } from "@db/prisma";

export const POST = auth(async (req, res) => {
  const body = await req.json();
  const getSquad = await prisma.user.findFirst({
    where: {
      id: req?.auth?.user?.id,
      squad: {
        is: null,
      },
    },
  });

  if (!getSquad) {
    return Response.json({
      status: 400,
      body: {
        error: "You already have a squad",
      },
    });
  }

  const { id } = await prisma.squad.create({
    data: {
      name: req?.auth?.user?.name + `'s Squad`,
      banned: false,
      allowOthersToJoin: Boolean(body.allowRandom || false),
      ownerId: req?.auth?.user?.id!,
      score: 0,
    },
  });

  await prisma.user.update({
    where: {
      id: req?.auth?.user?.id,
    },
    data: {
      squadId: id,
    },
  });

  return Response.json({
    status: 200,
    body: {
      message: "Squad created successfully",
    },
  });
});
