import clsx from "clsx";

const contactOptions = [
  {
    icon: "/icons/twitter.svg",
    title: "X",
    description: "We’d love to stay connect with you.",
    link: "https://x.com/devfestai",
    className: "bg-gradTopLeft",
    cta: "Follow us",
  },
  {
    icon: "/icons/discord.svg",
    title: "Discord",
    description: "This is where the action really is",
    link: "https://discord.gg/raSVgQP9vx",
    className: "bg-gradTopRight",
    cta: "Join us",
  },
  {
    icon: "/icons/Telegram.svg",
    title: "Telegram",
    description: "Connect to our channel for instant news",
    link: "https://t.me/+KZVCCxksVcpkNmZk",
    className: "bg-gradBottomLeft",
    cta: "Join us",
  },
  {
    icon: "/icons/WhatsApp.svg",
    title: "WhatsApp",
    description: "Connect to our group for instant news",
    link: "https://chat.whatsapp.com/B9msrogQYW5D6UA9ASjPJP",
    className: "bg-gradBottomRight",
    cta: "Join us",
  },
];
export const JoinUs = () => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-[15px] leading-[90px] text-[106px] font-bebas text-left">
        <div>Join Our</div>
        <div className="text-[#9070FF]">Community</div>
      </div>
      <div className="mt-[24px] text-left text-[20px]">
        Stay in the know and don’t miss our bonuses and hidden prizes
      </div>
      <div className="mt-[60px] grid grid-cols-2 gap-[12px]">
        {contactOptions.map((option) => (
          <div
            key={option.title}
            className="p-[1px] rounded-[12px] bg-boxBorder"
          >
            <a
              href={option.link}
              target="_blank"
              className={clsx(
                "group h-full flex flex-col rounded-[12px] p-[40px]",
                option.className,
              )}
            >
              <div className="w-[80px] h-[80px] bg-circle flex justify-center items-center rounded-full">
                <img
                  src={option.icon}
                  width={40}
                  height={40}
                  alt=""
                  loading="lazy"
                />
              </div>
              <h3 className="mt-6 text-20 font-semibold leading-1.125">
                {option.title}
              </h3>
              <p className="mt-2 text-16 font-light leading-snug text-gray-1">
                {option.description}
              </p>
              <p className="mt-3 flex items-center gap-x-2.5 text-16 font-medium leading-normal text-[#FBFF14] transition-colors duration-200 group-hover:text-white">
                {option.cta}
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <g
                    clipPath="url(#clip0_1148_3585)"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="m10.5 1.5-9 9" strokeLinejoin="round" />
                    <path d="M4.5 1.5h6v6" strokeLinecap="square" />
                  </g>
                  <defs>
                    <clipPath id="clip0_1148_3585">
                      <path fill="currentColor" d="M0 0h12v12H0z" />
                    </clipPath>
                  </defs>
                </svg>
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
