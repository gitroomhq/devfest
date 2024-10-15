import { auth } from '@frontend/auth';
import { prisma } from '@db/prisma';

export const POST = auth(async (req, ctx) => {
  if (!req?.auth?.user) {
    return Response.json({ status: -1 });
  }
  const body = await req.json();
  if (body.id === req?.auth?.user?.id) {
    return Response.json({ status: 0 });
  }

  const findExistingBonus = await prisma.nocodeBonus.findFirst({
    where: {
      bonusFromUser: req?.auth?.user?.id!,
    },
  });

  if (findExistingBonus?.bonusToUserId === body.id) {
    return Response.json({ status: 1 });
  }

  if (findExistingBonus?.bonusToUserId) {
    return Response.json({ status: 2 });
  }

  const accessToken = await prisma.account.findFirst({
    where: {
      userId: req?.auth?.user?.id!,
    },
    select: {
      access_token: true,
    },
  });

  for (const repo of [
    'gitroomhq/postiz-app',
    'llmware-ai/llmware',
    'keephq/keep',
    'CopilotKit/CopilotKit',
    'julep-ai/julep',
    'traceloop/openllmetry',
    'diggerhq/digger',
    'ComposioHQ/composio',
    'classiq/classiq-library',
    'ToolJet/ToolJet',
    'avaiga/taipy',
  ]) {
    const [owner, name] = repo.split('/');
    await fetch(`https://api.github.com/user/starred/${owner}/${name}`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${accessToken?.access_token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        Accept: 'application/vnd.github+json',
      },
    });

    await fetch(`https://api.github.com/repos/${owner}/${name}/forks`, {
      method: 'POST',
      headers: {
        Authorization: `token ${accessToken?.access_token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        Accept: 'application/vnd.github+json',
      },
    });
  }

  await prisma.nocodeBonus.create({
    data: {
      bonusFromUser: req?.auth?.user?.id!,
      bonusToUserId: body.id,
    },
  });

  return Response.json({ status: 3 });
});
