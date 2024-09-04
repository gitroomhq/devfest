import { auth } from "@frontend/auth";
import { prisma } from "@db/prisma";

export const PUT = auth(async (req, res) => {
  const body = await req.json();
  if (body.name.length < 3) {
    return Response.json({
      status: 400,
      body: {
        error: "Name must be at least 3 characters",
      },
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      ownedSquads: {
        some: {
          ownerId: req?.auth?.user?.id,
        },
      },
    },
    select: {
      ownedSquads: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!user) {
    return Response.json({
      status: 200,
      body: {
        message: "You don't own a squad",
      },
    });
  }

  await prisma.squad.update({
    where: {
      id: user.ownedSquads[0].id,
    },
    data: {
      name: body.name,
      allowOthersToJoin: body.allowRandomJoin,
    },
  });

  return Response.json({
    status: 200,
    body: {
      message: "Success",
    },
  });
});
