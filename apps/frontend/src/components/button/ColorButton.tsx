import React, { FC } from "react";
import clsx from "clsx";

interface ColorButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  gradientColor: string;
  active?: boolean;
  className?: string;
}

const ColorButton: FC<ColorButtonProps> = ({
  gradientColor,
  active = false,
  className = "",
  ...props
}) => {
  return (
    <button
      className={clsx(
        "flex justify-center items-center",
        "size-8 md:size-11 rounded-full",
        active && "border border-white",
        className
      )}
      {...props}
    >
      <div className="size-6 md:size-8 p-px rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF00]">
        <div
          className={`size-full rounded-full bg-gradient-to-br ${gradientColor}`}
        />
      </div>
    </button>
  );
};

export default ColorButton;
