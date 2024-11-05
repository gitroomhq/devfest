import { auth } from '@frontend/auth';
import Airtable from 'airtable';
import moment from 'moment';
import { object, string, array } from 'yup';
import { prisma } from '@db/prisma';
import { loadUserUnclaimedPrizes } from '@db/queries/load.member.prizes';
const validation = object({
  type: array().required(),
  first_name: string().required(),
  last_name: string().required(),
  email: string().required().email(),
  phone_number: string()
    .required()
    .matches(
      /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
      'Is not in correct format'
    ),
  shipping_address1: string().required(),
  shipping_city: string().required(),
  shipping_state: string().required(),
  shipping_zip: string().required(),
  shipping_country: string().required(),
  shirt_size: string()
    .required()
    .oneOf(['Small', 'Medium', 'Large', 'X-Large', '2X-Large']),
});

const airTable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });

export const POST = auth(async (req, context) => {
  const body = await req.json();
  if (!req?.auth?.user?.id! || !validation.validateSync(body)) {
    return Response.json({ invalid: true });
  }

  const winners = await loadUserUnclaimedPrizes(req?.auth?.user?.id!);

  if (winners.length === 0) {
    return Response.json({ invalid: true });
  }

  const selectedWins = body.type.filter(
    (p: any) => winners.map((w) => w.id).indexOf(p) > -1
  );

  if (!selectedWins.length || body.type.length !== selectedWins.length) {
    return Response.json({ invalid: true });
  }

  const winnersMap = selectedWins.map((s: any) => winners.find((w) => w.id === s));

  await Promise.all(
    winnersMap.map(async (win: any) => {
      await airTable
        .base('appXgTB1DffKq9cHX')
        .table('DevFest')
        .create({
          first_name: body.first_name,
          last_name: body.last_name,
          email: body.email,
          phone_number: body.phone_number,
          shipping_address1: body.shipping_address1,
          shipping_address2: body.shipping_address2,
          shipping_city: body.shipping_city,
          shipping_state: body.shipping_state,
          shipping_zip: body.shipping_zip,
          shipping_country: body.shipping_country,
          shirt_size: body.shirt_size,
          company_name: win.type === 'code' ? 'Code' :  win.type === 'nocode' ? 'No Code' : 'Giveaway',
          variation: win.type,
          // @ts-ignore
          'github_handle': req?.auth?.user?.handle?.toLowerCase(),
        });

      await prisma.winners.update({
        where: {
          id: win.id,
        },
        data: {
          claimed: moment().toDate(),
        },
      });
    })
  );

  return Response.json({ invalid: false });
});
