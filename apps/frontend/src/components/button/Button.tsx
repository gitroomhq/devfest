import Image from "next/image";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

import ArrowUpRight from "../svgs/ArrowUpRight";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  glow?: boolean;
  size?: "lg" | "sm";
  icon?: string;
  className?: string;
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "lg",
  glow = true,
  icon,
  className,
  children,
  ...props
}) => {
  const backgroundColor =
    variant === "primary"
      ? "bg-gradient-to-b from-[#FBFF14] to-[#DBB800] group-hover:from-[#FCFF63] group-hover:to-[#FFDD29]"
      : variant === "secondary"
        ? "bg-[#00080803]"
        : "bg-gradient-to-b from-[#FFFFFF] to-[#999999] group-hover:from-[#8562FF] group-hover:to-[#533CA6]";

  const borderColor =
    variant === "primary"
      ? "bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF00]"
      : variant === "secondary"
        ? // ? "bg-gradient-to-b from-[#FBFF14] to-[#DBB800] group-hover:from-[#FCFF63] group-hover:to-[#F5D52D]"
          "border border-[#FBFF14] group-hover:border-[#FCFF63]"
        : "bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF00] group-hover:from-[#FFFFFF80] group-hover:to-[#FFFFFF0D]";

  const height =
    size === "lg"
      ? "h-[54px] md:h-[68px]"
      : variant === "tertiary"
        ? "h-[54px] md:h-[38px]"
        : "h-[38px]";

  const padding =
    size === "lg"
      ? icon
        ? "pl-7 pr-6 md:pl-10 md:pr-8"
        : "px-6 md:px-8"
      : variant === "tertiary"
        ? icon
          ? "pl-8 pr-6 md:pl-6 md:pr-[18px]"
          : "px-8 md:px-6"
        : icon
          ? "pl-6 pr-[18px]"
          : "px-6";

  let textStyle =
    size === "lg"
      ? "text-[14px] leading-[15.4px] md:text-[16px] md:leading-[17.6px] font-bold"
      : variant === "tertiary"
        ? "text-[14px] leading-[15.4px] font-bold md:font-semibold"
        : "text-[14px] leading-[15.4px] font-semibold";
  textStyle +=
    variant === "primary"
      ? " text-black"
      : variant === "secondary"
        ? " text-yellow"
        : " text-black group-hover:text-white";
  textStyle += " uppercase";

  return (
    <button
      className={`p-px w-fit ${height} ${borderColor} rounded-full group ${className}`}
      {...props}
    >
      <div
        className={`h-full flex justify-center items-center gap-2 ${padding} ${backgroundColor} rounded-full transition-all ${
          !glow ? '' : variant === "tertiary" ? "shadow-tertiary" : "shadow-primary"
        }`}
      >
        <p className={`${textStyle} transition-none`}>{children}</p>
        {icon &&
          (icon === "arrow-up-right" ? (
            <ArrowUpRight
              className={`stroke-black ${
                variant === "tertiary" && "group-hover:stroke-white"
              } size-4 ${size === "lg" && "md:size-[18px]"}`}
            />
          ) : (
            <Image
              src={`/icons/${icon}.svg`}
              alt=""
              width={18}
              height={18}
              className={`size-4 ${size === "lg" && "md:size-[18px]"}`}
            />
          ))}
      </div>
    </button>
  );
};

export default Button;
