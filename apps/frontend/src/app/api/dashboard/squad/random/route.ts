import { auth } from "@frontend/auth";
import { prisma } from "@db/prisma";

export const POST = auth(async (req, res) => {
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

  const findAGroup = await prisma.user.groupBy({
    by: ["squadId"],
    where: {
      banned: false,
      squad: {
        allowOthersToJoin: true,
      },
      squadId: {
        not: null,
      },
    },
    having: {
      squadId: {
        _count: {
          lt: 5,
        },
      },
    },
    orderBy: {
      _count: {
        squadId: "asc",
      },
    },
    take: 1,
  });

  if (!findAGroup.length) {
    const { id } = await prisma.squad.create({
      data: {
        name: req?.auth?.user?.name + `'s Squad`,
        banned: false,
        allowOthersToJoin: false,
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
  }

  await prisma.user.update({
    where: {
      id: req?.auth?.user?.id,
    },
    data: {
      squadId: findAGroup[0].squadId,
    },
  });

  return Response.json({
    status: 200,
    body: {
      message: "Joined Squad created successfully",
    },
  });
});
