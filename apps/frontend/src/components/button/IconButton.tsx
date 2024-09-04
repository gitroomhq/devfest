import Image from "next/image";
import React, { FC } from "react";
import clsx from "clsx";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  className?: string;
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`flex justify-center items-center size-[40px] md:size-[54px] rounded-full bg-[#272727] hover:bg-[#7F5FEA] transition-all ${className}`}
      {...props}
    >
      <Image
        src={`/icons/${icon}.svg`}
        alt=""
        width={icon === "github" ? 33 : icon === "discord" ? 30 : 24}
        height={icon === "github" ? 33 : icon === "discord" ? 30 : 24}
        className="scale-75 md:scale-100"
      />
    </button>
  );
};

export default IconButton;
