import { prisma } from '@db/prisma';

export const addProductHunt = async (userId: string, code: string) => {
  const {access_token} = await (await fetch('https://api.producthunt.com/v2/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.PUBLIC_NEXT_PRODUCT_HUNT_API_KEY!,
      client_secret: process.env.PRODUCT_HUNT_API_SECRET!,
      code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.PUBLIC_NEXT_PRODUCT_HUNT_REDIRECT_URI!,
    }),
  })).json();

  await prisma.productHunt.upsert({
    where: {
      userId
    },
    create: {
      userId,
      accessToken: access_token
    },
    update: {
      accessToken: access_token
    }
  })
};
