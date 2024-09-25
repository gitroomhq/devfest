"use server";

import { auth } from "@frontend/auth";
import { prisma } from "@db/prisma";

export async function checkInvite(inviteId: string) {
  const getUser = await prisma.user.findFirst({
    where: {
      id: inviteId,
    },
    select: {
      bonuses: {
        where: {
          identifier: "invite-friend",
        },
      },
    },
  });

  if (!getUser) {
    return false;
  }

  return getUser.bonuses.length !== 5;
}

export async function addBonusToUser(inviteId: string) {
  const user = await auth();

  if (!user || !user.user) {
    return;
  }

  const getUser = await prisma.user.findFirst({
    where: {
      id: inviteId,
    },
    select: {
      squadId: true,
      bonuses: {
        where: {
          identifier: "invite-friend",
        },
      },
    },
  });

  if (!getUser || !getUser.squadId || getUser.bonuses.length === 5) {
    return;
  }

  const myUser = await prisma.user.findFirst({
    where: {
      id: user.user.id,
    },
    select: {
      squadId: true,
      inviteId: true,
    },
  });

  if (!myUser) {
    return;
  }

  if (myUser.squadId || myUser.inviteId) {
    return;
  }

  await prisma.bonuses.create({
    data: {
      score: 1,
      userId: inviteId!,
      identifier: "invite-friend",
    },
  });

  await prisma.user.update({
    where: {
      id: user.user.id,
    },
    data: {
      inviteId: inviteId,
    },
  });

  return true;
}
