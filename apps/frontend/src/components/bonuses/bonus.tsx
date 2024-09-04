"use client";

import { Button } from "@frontend/components/button";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export function Bonuses() {
  const session = useSession();

  return (
    <div className="flex flex-col">
      <h1 className="text-center font-inter mx-auto font-semibold text-[100px] md:text-42 xs:max-w-[246px]">
        Bonuses 🎁
      </h1>

      <div>
        <div className="flex flex-col w-full max-w-[800px] mx-auto gap-2.5">
          <div className="grid grid-cols-[30px,1fr,180px,180px] rounded-[12px] bg-chatGrad h-[72px] px-[32px]">
            <div className="text-left flex items-center">#</div>
            <div className="flex items-center">TYPE</div>
            <div className="flex items-center">POINTS</div>
            <div className="flex items-center">CLAIM</div>
          </div>
          <div className="grid grid-cols-[30px,1fr,180px,180px] bg-[#191919] rounded-[12px] h-[72px] px-[32px]">
            <div className="text-left flex items-center">1</div>
            <div className="flex items-center">
              Invite a friend to DevFest AI
            </div>
            <div className="flex items-center">1 per friend [Max:5]</div>
            <div className="flex items-center">
              <CopyToClipboard
                text={`https://hackfest.ai/friend/${session?.data?.user?.id}`}
                onCopy={() => {
                  toast.success("Copied to clipboard", {
                    icon: "👏",
                  });
                }}
              >
                <Button size="sm">Copy Invite Link</Button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
