"use client";

import Image from "next/image";
import { FC, useCallback, useEffect, useState } from "react";

import { Button, ColorButton } from "@frontend/components/button";
import GithubSvg from "@frontend/components/svgs/GithubSvg";
import { TICKETS } from "@frontend/utils/constants";
import clsx from "clsx";
import { signIn, useSession } from "next-auth/react";
import { tree } from "next/dist/build/templates/app-page";
import { useRouter } from "next/router";

export const BUTTON_COLORS = [
  "from-[#FF8D68] to-[#FF6F41]",
  "from-[#65FFC7] to-[#10EE9E]",
  "from-[#FF8097] to-[#FF485E]",
  "from-[#81F7FF] to-[#32F3FF]",
  "from-[#FFEC87] to-[#FFDE2E]",
  "from-[#8FB5FF] to-[#5690FF]",
];

const objectToGetParams = (object: any) => {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);

  return params.length > 0 ? `?${params.join('&')}` : '';
};

const getBoxPositionOnWindowCenter = (width: number, height: number) => ({
  left:
    window.outerWidth / 2 +
    (window.screenX || window.screenLeft || 0) -
    width / 2,
  top:
    window.outerHeight / 2 +
    (window.screenY || window.screenTop || 0) -
    height / 2,
});

const windowOpen = (url: string, { width, height, ...configRest }: any) => {
  const config = {
    width,
    height,
    location: "no",
    toolbar: "no",
    status: "no",
    directories: "no",
    menubar: "no",
    scrollbars: "yes",
    resizable: "no",
    centerscreen: "yes",
    chrome: "yes",
    ...configRest,
  };

  return window.open(
    url,
    "",
    Object.keys(config)
      .map((key) => `${key}=${config[key]}`)
      .join(", "),
  );
};

const Ticket: FC<{
  user: { name: string; color: number; handle: string; numericId: string };
  hideColorPicker?: boolean;
  hideCTA?: boolean;
}> = (props) => {
  const { user, hideColorPicker, hideCTA } = props;
  const session = useSession();
  useEffect(() => {
    if (
      session.status === "authenticated" &&
      // @ts-ignore
      session.data?.user?.numericId === user.numericId
    ) {
      // @ts-ignore
      setSelectedIndex(session.data?.user?.color);
    }
  }, [session]);
  const [selectedIndex, setSelectedIndex] = useState(props.user.color || 1);
  const router = useRouter();

  const handleTwitterShare = useCallback((event: any) => {
    const link = `https://x.com/intent/tweet${objectToGetParams({
      url: "https://devfest.ai/ticket/" + user.handle,
      text: "I am participating in HackFest AI 2024, share your card and win awesome swag! @devfestai @CopilotKit @llmware @keepalerting @traceloopdev @julep_ai",
    })}`;

    const windowConfig = {
      width: 550,
      height: 400,
      ...getBoxPositionOnWindowCenter(550, 400),
    };

    event.preventDefault();

    windowOpen(link, windowConfig);
  }, []);

  return (
    <section id="ticket" className="">
      <div className="flex flex-col items-center gap-6">
        <h6>[ Ticket ]</h6>
        <h2 className="max-w-[926px]">
          Share your Ticket and win{" "}
          <span className="text-purple">Awesome Swag </span>
        </h2>
        <h5 className="max-w-[700px] text-center">
          Showcase your unique ticket on X to all your friends!
          <br />
          By the end of the competition we will do a big giveaway for all the
          shares.
          <br />
          Make sure you tag us on social media so we can find your ticket.
        </h5>
        <div className="flex gap-3">
          {!hideCTA && (
            <Button
              icon="arrow-up-right"
              onClick={() =>
                session.status === "authenticated"
                  ? // @ts-ignore
                    router.push(`/dashboard/ticket`)
                  : signIn("github", {
                      callbackUrl: "/dashboard/ticket",
                      redirect: true,
                    })
              }
            >
              {session.status === "authenticated"
                ? "Manage your ticket"
                : "Create your ticket"}
            </Button>
          )}
          {session.status === "authenticated" && (
            <Button icon="x" onClick={handleTwitterShare}>Share Ticket on</Button>
          )}
        </div>
      </div>
      <div className="relative">
        {/* GRADIENT EFFECT */}
        <div className="hidden md:block w-[312px] h-[235px] bg-[#9070FF] bg-opacity-30 absolute -left-[42px] -bottom-[15px] -z-[1] blur-2xl rounded-full" />
        <div className="md:hidden w-[150px] h-[113px] bg-[#9070FF] bg-opacity-30 absolute -left-[70px] -bottom-[7px] -z-[1] blur-xl rounded-full" />
        <div className="hidden md:block w-[520px] h-[270px] bg-[#9070FF] bg-opacity-60 absolute -right-[27px] -top-[12px] -z-[1] blur-3xl rounded-full" />
        <div className="md:hidden w-[250px] h-[113px] bg-[#9070FF] bg-opacity-60 absolute -right-[20px] -top-[7px] -z-[1] blur-2xl rounded-full" />
        {/* GRADIENT EFFECT */}

        {TICKETS.map((ticket, index) => (
          <div
            key={index + "ticket"}
            className={clsx(
              "relative font-bebas tracking-tighter uppercase",
              index + 1 !== selectedIndex && "hidden",
            )}
          >
            <Image
              src={`/tickets/${index + 1}.png`}
              priority={true}
              alt=""
              width={1388}
              height={860}
              className="max-w-[694px] max-h-[430px] w-full h-full"
            />
            <div className="absolute top-5 left-5 mobile:top-10 mobile:left-10 flex flex-col gap-[17.93px] md:gap-[42px]">
              <Image
                src="/svgs/LogoWithBlackText.svg"
                alt=""
                width={108}
                height={38}
                className="w-[57px] h-[20px] mobile:w-[108px] mobile:h-[38px]"
              />
              <div className="flex flex-col gap-[7.72px] md:gap-4">
                <span className="text-[38px] leading-[30.4px] mobile:text-[80px] mobile:leading-[64px] text-black">
                  {user?.name?.split(" ").shift() || "YOUR"}
                  <br />
                  {user?.name?.split(" ").pop() || "NAME"}
                </span>
                <div className="flex items-center gap-[3.49px] md:gap-[8.09px]">
                  <GithubSvg
                    width={24}
                    height={24}
                    className="size-3 mobile:size-6"
                    color={ticket.color}
                  />
                  <span
                    className="text-[14px] leading-[16.8px] mobile:text-[30px] mobile:leading-[36px]"
                    style={{
                      color: ticket.color,
                    }}
                  >
                    {user.handle}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-5 right-5 mobile:bottom-10 mobile:right-10">
              <div className="flex gap-1 mobile:gap-1.5">
                <div className="flex">
                  <div className="text-[20px] leading-[16px] mobile:text-[42px] mobile:leading-[33.6px]">
                    N
                  </div>
                  <div className="underline text-[12px] mobile:text-[22px] translate-y-0 mobile:translate-y-1 font-extrabold tracking-wider">
                    o
                  </div>
                </div>
                <div className="text-[20px] leading-[16px] mobile:text-[42px] mobile:leading-[33.6px]">
                  {
                    // @ts-ignore
                    user.numericId
                      ? // @ts-ignore
                        new Array(9 - user.numericId)
                          .fill(0)
                          // @ts-ignore
                          .join("") + user.numericId
                      : "0000000001"
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {
        // @ts-ignore
        session.data?.user?.numericId === user.numericId &&
          !hideColorPicker && (
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
              <p className="text-[20px] leading-[20px] md:text-[24px] md:leading-[24px] font-bebas">
                Pick a color:
              </p>
              <div className="flex gap-2">
                {BUTTON_COLORS.map((color, idx) => (
                  <ColorButton
                    key={`ticket_${idx}`}
                    gradientColor={color}
                    active={selectedIndex === idx + 1}
                    onClick={async () => {
                      setSelectedIndex(idx + 1);
                      if (session.status === "authenticated") {
                        await fetch("/api/dashboard/ticket", {
                          method: "POST",
                          body: JSON.stringify({
                            color: idx + 1,
                          }),
                          headers: {
                            "Content-Type": "application/json",
                          },
                        });

                        await session.update({ color: idx + 1 });
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          )
      }
    </section>
  );
};

export default Ticket;
