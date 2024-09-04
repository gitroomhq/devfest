"use server";

import { cookies } from "next/headers";
import { auth } from "@frontend/auth";
import { prisma } from "@db/prisma";
import {addUserToSquad} from "@frontend/queries/add.user.to.squad";

export async function checkInvite(inviteId: string) {
  const getSquadId = await prisma.squad.findFirst({
    where: {
      id: inviteId,
    }
  });

  return !!getSquadId;
}

export async function trySetToTeam(inviteId: string) {
  const user = await auth();
  if (!user) {
    return;
  }

  await addUserToSquad(user.user?.id!, inviteId);
}
