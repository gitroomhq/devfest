'use client';

import { Button } from '@frontend/components/button';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const ScrollBottom: FC<{ scroll: () => void; reload: boolean }> = (props) => {
  useEffect(() => {
    props.scroll();
  }, [props.reload]);
  return null;
};

const SendMessage: FC<{ update: () => void }> = (props) => {
  const [value, setValue] = useState('');

  const submit = useCallback(
    async (e: any) => {
      e.preventDefault();
      if (value.length < 3) {
        return alert('You have to type at least 3 characters');
      }

      await fetch('/api/dashboard/messages', {
        method: 'POST',
        body: JSON.stringify({ message: value }),
      });

      setValue('');
      props.update();
    },
    [value]
  );

  return (
    <form className="flex w-full items-center space-x-2" onSubmit={submit}>
      <div className="flex-1 bg-black h-[68px] px-[32px] rounded-[100px]">
        <input
          className="w-full h-full outline-none text-white bg-transparent"
          id="message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Message your Squad..."
          autoComplete="off"
          data-id={43}
        />
      </div>
      <button
        type="submit"
        className="flex justify-center items-center cursor-pointer bg-sendButton transition-all hover:shadow-btn w-[68px] h-[68px] rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z"
            stroke="black"
            strokeOpacity="0.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
};

export function Chat() {
  const ref = useRef<null>();
  const [reload, setReload] = useState(false);
  const scroll = useCallback(() => {
    const scroll = ref.current;
    if (scroll) {
      // @ts-ignore
      scroll.scrollTop = scroll.scrollHeight;
    }
  }, [ref]);

  const loadChat = useCallback(async () => {
    return (
      await fetch('/api/dashboard/messages', {
        method: 'GET',
      })
    ).json();
  }, []);

  const { data, isLoading, mutate } = useSWR('messages', loadChat);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="w-full mx-auto flex flex-col h-full">
      <div className="flex flex-col gap-[12px] flex-1">
        <div className="text-[24px] bg-chatGrad rounded-[12px] h-[69px] text-white font-bebas flex justify-center items-center">
          CHAT
        </div>
        <div className="w-full flex-1 bg-[#191919] rounded-[14px] gap-[12px] px-[20px] py-[40px] flex flex-col">
          <div
            className="gap-[12px] flex-1 overflow-hidden overflow-y-auto flex flex-col"
            // @ts-ignore
            ref={ref}
          >
            <div className="flex gap-[8px] items-end pr-[20px]">
              <div className="min-w-[40px]">
                <img
                  className="w-[40px] h-[40px] bg-fuchsia-500 rounded-full"
                  alt="Nevo David"
                  src="https://avatars.githubusercontent.com/u/100117126?v=4"
                />
              </div>
              <div className="rounded-[12px] gap-[8px] rounded-bl-none bg-[#2D2D2D] p-[12px] flex flex-col">
                <div className="flex gap-[12px] items-center">
                  <div className="text-[#FBFF14] text-[20px]">Nevo David</div>
                  <div className="text-[#8e8e8e]">
                    {dayjs().local().format('hh:mm a')}
                  </div>
                </div>
                <div className="text-[20px] font-[300]">
                  Hi guys welcome to your squad!
                  <br />
                  <br />
                  Make sure you create your{' '}
                  <a
                    href="/dashboard/ticket"
                    className="underline hover:font-bold"
                  >
                    personal ticket
                  </a>{' '}
                  and share it.
                  <br />
                  I will be giving random swag to the people who share.
                  <br />
                  <br />
                  Don{"'"}t forget to check your bonuses, we will add more add
                  during the competition.
                  <br />
                  And of course, follow us on:{' '}
                  <a
                    className="underline hover:font-bold"
                    href="https://whatsapp.com/channel/0029VakC1dbA2pLGYG9Jph1L"
                  >
                    WhatsApp
                  </a>
                  ,{' '}
                  <a
                    className="underline hover:font-bold"
                    href="https://t.me/+KZVCCxksVcpkNmZk"
                  >
                    Telegram
                  </a>
                  ,
                  <a
                    className="underline hover:font-bold"
                    href="https://discord.gg/raSVgQP9vx"
                  >
                    Discord
                  </a>
                  , and{' '}
                  <a
                    className="underline hover:font-bold"
                    href="https://x.com/devfestai"
                  >
                    X
                  </a>
                  , to know about everything first.
                </div>
              </div>
            </div>
            {data.messages.map(
              (p: {
                id: string;
                message: string;
                createdAt: string;
                user: {
                  name: string;
                  profilePicture: string;
                  handle: string;
                };
              }) => (
                <div key={p.id} className="flex gap-[8px] items-end pr-[20px]">
                  <div className="min-w-[40px]">
                    <img
                      className="w-[40px] h-[40px] bg-fuchsia-500 rounded-full"
                      alt={p.user.name}
                      src={p.user.profilePicture}
                    />
                  </div>
                  <div className="rounded-[12px] gap-[8px] rounded-bl-none bg-[#2D2D2D] p-[12px] flex flex-col">
                    <div className="flex gap-[12px] items-center">
                      <div className="text-[#FBFF14] text-[20px]">
                        {p.user.name}
                      </div>
                      <div className="text-[#8e8e8e]">
                        {dayjs(p.createdAt).local().format('hh:mm a')}
                      </div>
                    </div>
                    <div className="text-[20px] font-[300]">{p.message}</div>
                  </div>
                </div>
              )
            )}
            <ScrollBottom scroll={scroll} reload={reload} />
          </div>
          <div className="mt-[20px] flex gap-[8px]">
            <SendMessage
              update={async () => {
                await mutate();
                setReload(!reload);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
