import { SVGProps } from "@frontend/utils/types";

const ArrowUpRight = ({ ...props }: SVGProps) => {
  const { width = 18, height = 18, color = "black", className = "" } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      className={className}
    >
      <path
        d="M4.125 13.875L13.875 4.125M13.875 4.125H4.125M13.875 4.125V13.875"
        stroke="inherit"
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowUpRight;
