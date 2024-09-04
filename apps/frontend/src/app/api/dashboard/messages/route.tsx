import { auth } from "@frontend/auth";
import { prisma } from "@db/prisma";

export const GET = auth(async (req, res) => {
  const findSquad = await prisma.user.findFirst({
    select: {
      squadId: true,
    },
    where: {
      id: req?.auth?.user?.id,
    },
  });

  const messages = await prisma.squadMessages.findMany({
    where: {
      squadId: findSquad?.squadId!,
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      message: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          profilePicture: true,
          handle: true,
        }
      }
    },
  });

  return Response.json({ messages });
});

export const POST = auth(async (req, res) => {
  const body = await req?.json();
  if (!body.message || body.message.length < 3) {
    return Response.json({ message: "Message is required" });
  }

  const findSquad = await prisma.user.findFirst({
    select: {
      squadId: true,
    },
    where: {
      id: req?.auth?.user?.id,
    },
  });

  await prisma.squadMessages.create({
    data: {
      squadId: findSquad?.squadId!,
      message: body.message!,
      userId: req?.auth?.user?.id!,
    },
  });

  return Response.json({ message: "Added" });
});
