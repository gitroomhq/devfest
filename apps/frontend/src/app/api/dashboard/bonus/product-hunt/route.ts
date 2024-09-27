import { auth } from '@frontend/auth';
import { prisma } from '@db/prisma';
import { productHuntBonus } from '@frontend/utils/product.hunt.bonus';

export const POST = auth(async (req, context) => {
  const body = await req.json();
  const findHunt = productHuntBonus.find((p) => body.id === p.id);
  if (!findHunt) {
    return Response.json({
      status: 400,
      body: {
        error: 'Invalid product hunt',
      },
    });
  }

  const bonuses = await prisma.bonuses.findFirst({
    where: {
      identifier: `producthunt-${findHunt.id}`,
      userId: req?.auth?.user?.id! as string,
    },
  });

  if (bonuses) {
    return Response.json({
      status: 400,
      body: {
        error: 'You already have this bonus',
      },
    });
  }

  const hunt = await prisma.productHunt.findFirst({
    where: {
      userId: req?.auth?.user?.id! as string,
    },
    select: {
      accessToken: true,
    },
  });

  const load = await (
    await fetch(`https://api.producthunt.com/v2/api/graphql`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${hunt?.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
{
    viewer {
      user {
        votedPosts {
          nodes {
            slug
          }
        }
      }
    }
}`,
      }),
    })
  ).json();

  const slugs = load.data.viewer.user.votedPosts.nodes.map((p: any) => p.slug);

  if (!slugs.some((p: any) => p === body.id)) {
    return Response.json({
      success: false,
    });
  }

  await prisma.bonuses.create({
    data: {
      identifier: `producthunt-${body.id!}`,
      score: 1,
      userId: req?.auth?.user?.id! as string,
    },
  });

  return Response.json({
    success: true,
  });
});
