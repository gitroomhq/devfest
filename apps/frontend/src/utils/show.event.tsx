'use client';
import { FC, useCallback, useEffect, useState } from 'react';
import { events } from '@frontend/utils/events';
import Link from 'next/link';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const ShowEvent: FC = () => {
  const [event, setEvent] = useState<any>(false);
  useEffect(() => {
    const findEvent = events.find((event) => {
      const a =
        dayjs.utc(event.date).isSameOrAfter(dayjs.utc().startOf('hour')) &&
        dayjs.utc(event.date).isSameOrBefore(dayjs.utc().endOf('hour'));

      return a;
    });

    if (!findEvent) {
      return;
    }

    const storage = localStorage.getItem('event');
    if (storage && storage === String(findEvent.id)) {
      return;
    }

    setEvent(findEvent);
  }, []);

  const close = useCallback(() => {
    setEvent(false);
    localStorage.setItem('event', String(event.id));
  }, [event]);

  if (!event) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 w-full h-full little-black z-[300] flex justify-center items-center" onClick={close}>
      <div className="relative bg-white p-[40px] rounded-[20px] flex flex-col gap-[20px]" onClick={e => e.stopPropagation()}>
        <div onClick={close} className="cursor-pointer absolute -right-[10px] -top-[10px] rounded-full bg-red-600 w-[30px] h-[30px] flex justify-center items-center">
          X
        </div>
        <div className="text-black text-[20px] text-center font-bold">
          <span className="text-red-500">NOW LIVE:</span> {event.name}
        </div>
        <iframe
          width="560"
          height="315"
          src={event.youTube + '?autoplay=true'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="text-center">
          <Link
            className="text-red-500 text-[20px] text-center font-bold w-full hover:underline"
            href={event.url}
          >
            Watch on YouTube
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowEvent;
