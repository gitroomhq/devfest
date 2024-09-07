import Image from "next/image";
import Link from "next/link";

import IconButton from "@frontend/components/button/IconButton";
import {
  FOOTER_MENU,
  GITHUB_URL,
  DISCORD_URL,
  TWITTER_URL,
} from "@frontend/utils/constants";
import Peppermint from "@frontend/components/svgs/Peppermint";

const Footer = () => {
  return (
    <section className="mt-0 md:mt-[60px] pb-10 gap-10">
      <div className="w-full flex flex-col md:flex-row justify-between gap-[60px]">
        <Link href="">
          <Image
            src="/svgs/LogoWithWhiteText.svg"
            alt=""
            width={172}
            height={61}
            className="w-[108px] h-[38px] md:w-[171px] md:h-[60px]"
          />
        </Link>
        <div className="flex flex-wrap gap-[60px]">
          {FOOTER_MENU.map((sub_menu, idx) => (
            <div key={idx} className="flex flex-col gap-4 pr-[40px]">
              <p className="text-[20px] leading-[20px] md:text-[24px] md:leading-[24px] font-bebas">
                {sub_menu.title}
              </p>
              <div className="flex flex-col gap-2.5 md:gap-4">
                {sub_menu.items.map((item, idx) => (
                  <Link key={idx} href={item.path} rel="dofollow">
                    <p className="text-[16px] md:text-[20px] leading-[24px] active:text-yellow hover:text-[#A489FF] transition-all">
                      {item.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-px bg-[#252525]" />
      <div className="w-full flex flex-col-reverse lg:flex-row justify-between gap-8">
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center text-[14px] leading-[16.94px] md:text-[16px] md:leading-[19.36px] gap-2.5 md:gap-10">
          <p className="text-[#ADADAD]">©HackAI, 2024. All rights reserved.</p>
          <Link
            href="https://peppermint.id"
            className="flex items-center gap-1.5 group"
          >
            <p className="text-[#ADADAD] group-hover:text-white transition-all">
              Designed by
            </p>
            <Peppermint className="fill-[#ADADAD] group-hover:fill-white transition-all" />
          </Link>
        </div>
        <div className="flex gap-2">
          <Link
            href="https://whatsapp.com/channel/0029VakC1dbA2pLGYG9Jph1L"
            target="_blank"
          >
            <IconButton icon="WhatsApp" />
          </Link>
          <Link href="https://t.me/+KZVCCxksVcpkNmZk" target="_blank">
            <IconButton icon="Telegram" />
          </Link>
          <Link href="https://github.com/gitroomhq/hackai" target="_blank">
            <IconButton icon="github" />
          </Link>
          <Link href="https://discord.gg/raSVgQP9vx" target="_blank">
            <IconButton icon="discord" />
          </Link>
          <Link href="https://x.com/devfestai" target="_blank">
            <IconButton icon="twitter" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Footer;
