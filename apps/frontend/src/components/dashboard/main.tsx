"use client";

import useSWR from "swr";
import { useCallback } from "react";
import { GetStarted } from "@frontend/components/dashboard/get.started";
import { MySquad } from "@frontend/components/dashboard/my.squad";

export interface User {
  id: string;
  name: string;
  handle: string;
  owner: boolean;
  isWinner: boolean;
  squad: {
    id: string;
    name: string;
    allowOthersToJoin: boolean;
    score: number;
    members: {
      id: string;
      name: string;
      profilePicture: string;
      handle: string;
    }[];
  };
}

export const Main = () => {
  const getUser = useCallback(async () => {
    return (
      await fetch("/api/dashboard/user", {
        credentials: "include",
      })
    ).json();
  }, []);
  const { data, isLoading, mutate } = useSWR("user", getUser);

  if (isLoading) return <></>;
  return !data?.isSquad ? (
    <GetStarted rerenderPage={mutate} />
  ) : (
    <MySquad user={data} mutate={mutate} />
  );
};
