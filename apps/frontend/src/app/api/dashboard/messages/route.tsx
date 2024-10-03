import { auth } from '@frontend/auth';
import { prisma } from '@db/prisma';
import { Novu } from '@novu/node';

const novu = new Novu(process.env['NOVU_SECRET_KEY'] as string);

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
      createdAt: 'asc',
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
        },
      },
    },
  });

  return Response.json({ messages });
});

export const POST = auth(async (req, res) => {
  const body = await req?.json();
  if (!body.message || body.message.length < 3) {
    return Response.json({ message: 'Message is required' });
  }

  const findSquad = await prisma.user.findFirst({
    select: {
      squadId: true,
    },
    where: {
      id: req?.auth?.user?.id,
    },
  });

  const squadeUsersAndSquadName = await prisma.squad.findFirst({
    where: {
      id: findSquad?.squadId!,
    },
    select: {
      members: true,
      name: true,
    },
  });

  const novuSubscribers = squadeUsersAndSquadName?.members.map((member) => {
    const firstName = member?.name?.split(' ')[0];
    const lastName = member?.name?.split(' ')[1] ?? null;
    return {
      subscriberId: member.id,
      email: member.email,
      firstName: firstName,
      lastName: lastName,
    };
  }) as [];

  console.log(novuSubscribers);
  if (novuSubscribers.length) {
    await novu.trigger('devfest-chat-message', {
      to: novuSubscribers,
      payload: {
        message: `Your **${squadeUsersAndSquadName?.name}** squad has a new message - **${body.message}**`,
      },
    });
  }

  await await prisma.squadMessages.create({
    data: {
      squadId: findSquad?.squadId!,
      message: body.message!,
      userId: req?.auth?.user?.id!,
    },
  });

  return Response.json({ message: 'Added' });
});
