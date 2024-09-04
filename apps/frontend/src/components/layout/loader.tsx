"use client";

import { Oval } from "react-loader-spinner";
import { FC } from "react";

export const Loader: FC<{ width?: number; height?: number }> = ({width, height}) => {
  return <Oval color="#9070FF" secondaryColor="black" strokeWidth={4} width={100 || width} height={100 || height} />;
};
