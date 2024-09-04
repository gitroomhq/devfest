"use client";

import { Button } from "@frontend/components/button";
import { FC, useState } from "react";
import { Chat } from "@frontend/components/dashboard/chat";
import { TeamDetails } from "@frontend/components/dashboard/team.details";
import { User } from "@frontend/components/dashboard/main";
import { Members } from "@frontend/components/dashboard/members";
import { JoinUs } from "@frontend/components/dashboard/join.us";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import GithubSvg from "@frontend/components/svgs/GithubSvg";
import clsx from "clsx";

export const MySquad: FC<{
  user: User;
  mutate: () => void;
}> = (props) => {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      {showDetails && (
        <TeamDetails
          user={props.user}
          mutate={props.mutate}
          close={() => setShowDetails(false)}
        />
      )}
      <div
        className={clsx(
          "transition-all flex flex-col gap-[12px]",
          showDetails && "blur-[25px]",
        )}
      >
        <div className="flex flex-1 flex-col gap-[12px]">
          <div className="h-[432px] w-full relative pt-[20px] pl-[40px] pr-[20px]">
            <img
              className="absolute z-[0] pointer-events-none left-0 top-0 w-full h-full object-cover border border-[#4c417e]/80 rounded-[15px]"
              src="/home-pub.png"
            />
            <div className="flex justify-end w-full relative z-10">
              <div className="bg-score pt-[14px] px-[40px] pb-[14px] rounded-[12px] text-[40px]">
                Score: {props.user.squad.score}
              </div>
            </div>

            <div className="mt-[10px] flex flex-col relative z-10 gap-[24px]">
              <div className="capitalize text-[16px] text-white/70">
                [ my squad ]
              </div>
              <div className="flex items-end gap-[10px]">
                <div className="capitalize text-[110px] font-bebas leading-[100px]">
                  {props.user.squad.name}
                </div>

                <div className="text-[#FBFF14] mb-[13px]">
                  <svg
                    onClick={() => setShowDetails(true)}
                    className="cursor-pointer"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z"
                      fill="currentColor"
                    />
                    <path
                      d="M19.0206 3.47991C17.0806 1.53991 15.1806 1.48991 13.1906 3.47991L11.9806 4.68991C11.8806 4.78991 11.8406 4.94991 11.8806 5.08991C12.6406 7.73991 14.7606 9.85991 17.4106 10.6199C17.4506 10.6299 17.4906 10.6399 17.5306 10.6399C17.6406 10.6399 17.7406 10.5999 17.8206 10.5199L19.0206 9.30991C20.0106 8.32991 20.4906 7.37991 20.4906 6.41991C20.5006 5.42991 20.0206 4.46991 19.0206 3.47991Z"
                      fill="currentColor"
                    />
                    <path
                      d="M15.6103 11.53C15.3203 11.39 15.0403 11.25 14.7703 11.09C14.5503 10.96 14.3403 10.82 14.1303 10.67C13.9603 10.56 13.7603 10.4 13.5703 10.24C13.5503 10.23 13.4803 10.17 13.4003 10.09C13.0703 9.81005 12.7003 9.45005 12.3703 9.05005C12.3403 9.03005 12.2903 8.96005 12.2203 8.87005C12.1203 8.75005 11.9503 8.55005 11.8003 8.32005C11.6803 8.17005 11.5403 7.95005 11.4103 7.73005C11.2503 7.46005 11.1103 7.19005 10.9703 6.91005C10.9491 6.86465 10.9286 6.81949 10.9088 6.77458C10.7612 6.44127 10.3265 6.34382 10.0688 6.60158L4.34032 12.33C4.21032 12.46 4.09032 12.71 4.06032 12.88L3.52032 16.71C3.42032 17.39 3.61032 18.03 4.03032 18.46C4.39032 18.81 4.89032 19 5.43032 19C5.55032 19 5.67032 18.99 5.79032 18.97L9.63032 18.43C9.81032 18.4 10.0603 18.28 10.1803 18.15L15.9016 12.4287C16.1612 12.1692 16.0633 11.7237 15.7257 11.5797C15.6877 11.5634 15.6492 11.5469 15.6103 11.53Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex gap-[12px]">
                <CopyToClipboard
                  text={"https://devfest.ai/invite/" + props.user.squad.id}
                  onCopy={() => {
                    toast.success("Copied to clipboard", {
                      icon: "👏",
                    });
                  }}
                >
                  <Button
                    className="wrapinv w-[350px]"
                    variant="secondary"
                    glow={false}
                  >
                    <div className="inv" />{" "}
                  </Button>
                </CopyToClipboard>

                <Button
                  className="animate-bounce"
                  glow={false}
                  onClick={() => router.push("/dashboard/bonuses")}
                >
                  Bonuses
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-[12px]">
          <div className="flex flex-1 flex-col gap-[12px]">
            <div className="bg-[#191919] p-[40px] rounded-[16px] flex flex-col gap-[40px]">
              <div className="capitalize text-[16px] text-white/70">
                [ {props.user.squad.members.length} participants ]
              </div>
              <div className="flex gap-[32px]">
                <Members user={props.user} />
              </div>
            </div>
            <div className="bg-[#191919] p-[40px] rounded-[16px] flex flex-col gap-[40px]">
              <JoinUs />
            </div>
          </div>
          <div className="w-[445px] min-h-full">
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
};
