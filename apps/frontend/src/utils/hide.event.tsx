import { FC } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const HideEvent: FC<{date: string}> = (props) => {
  const { date } = props;
  if (!dayjs.utc(date).isBefore(dayjs.utc())) {
    return null;
  }

  return (
    <div className="absolute left-0 top-0 w-full h-full bg-[#000808]/80 z-10" />
  );
};

export default HideEvent;
