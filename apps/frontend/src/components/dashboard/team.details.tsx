"use client";
import { Button } from "@frontend/components/button";
import { FC, useCallback, useEffect, useState } from "react";
import { User } from "@frontend/components/dashboard/main";
import toast from "react-hot-toast";

export const TeamDetails: FC<{
  user: User;
  close: () => void;
  mutate: () => void;
}> = (props) => {
  const [name, setName] = useState(props.user.squad.name);
  const [allowRandomJoin, setAllowRandomJoin] = useState(
    props.user.squad.allowOthersToJoin,
  );

  const save = useCallback(
    async (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      await fetch("/api/dashboard/squad", {
        method: "PUT",
        body: JSON.stringify({
          name,
          allowRandomJoin,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Saved!", {
        icon: "👏",
      });

      props.mutate();
      props.close();
    },
    [allowRandomJoin, name],
  );

  return (
    <div className="fixed left-0 top-0 w-full h-full flex justify-center items-center z-[500]" onClick={() => props.close()}>
      <form
        onSubmit={save}
        onClick={p => p.stopPropagation()}
        className="p-[50px] rounded-[16px] border border-[#704DFF]/30 max-w-[540px] w-full mx-auto bg-[#191919]"
        data-id={2}
      >
        <div className="flex flex-col gap-[24px] text-center">
          <div className="text-[16px] text-[#DEDEDE]">[ Squad name ]</div>
          <div className="bg-[#2D2D2D] rounded-[100px] h-[68px] px-[32px]">
            <input
              value={name}
              placeholder="Enter squad name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full h-full outline-none text-white bg-transparent"
            />
          </div>
          <div className="flex gap-[12px] justify-center items-center">
            <div
              onClick={() => {
                setAllowRandomJoin(!allowRandomJoin);
              }}
              className="cursor-pointer w-[20px] h-[20px] rounded-[4px] bg-[#8562FD] flex justify-center items-center"
            >
              {allowRandomJoin && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={12}
                  height={10}
                  viewBox="0 0 12 10"
                  fill="none"
                >
                  <path
                    d="M1.5 5.7L4.35714 8.5L10.5 1.5"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <div>Allow random people to join my squad</div>
          </div>
          <div>
            <Button size="sm" type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
