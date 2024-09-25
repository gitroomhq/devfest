import { NextApiRequest, NextApiResponse } from 'next';
import ical, { ICalCalendarMethod, ICalOrganizer } from 'ical-generator';
import { events } from '@frontend/utils/events';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

dayjs.extend(utc);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body.email || !req.body.id) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const event = events.find((e) => e.id === req.body.id);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  const calendar = ical({ name: event.name });
  calendar.method(ICalCalendarMethod.REQUEST);

  calendar.createEvent({
    start: dayjs.utc(event.date).toDate(),
    end: dayjs.utc(event.date).add(1, 'hour').toDate(),
    summary: `[DevFest] ${event.name}`,
    description: `[DevFest] ${event.name}`,
    location: 'YouTube',
    organizer: 'DevFest',
    url: event.url,
  });


  const { data, error } = await resend.emails.send({
    from: 'Nevo David <nevo@gitroom.com>',
    to: [req.body.email],
    subject: `[DevFest] ${event.name}`,
    attachments: [
      {
        content: calendar.toString(),
        filename: 'invite.ics',
        contentType: 'text/calendar; charset="UTF-8"; method=REQUEST',
      },
    ],
    headers: {
      'Content-Disposition': 'attachment; filename="invite.ics"',
    },
    html: `<h1>You are invite to: ${event.name}</h1><br />To join click here: <a href="${event.url}">${event.url}</a>`,
  });

  res.status(200).json({ message: 'Invitation sent' });
}
