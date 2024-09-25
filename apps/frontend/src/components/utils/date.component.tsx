'use client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const DateComponent = ({ date, format }: { date: string, format: string }) => {
  return <>{dayjs.utc(date).local().format(format)}</>;
};

export default DateComponent;
