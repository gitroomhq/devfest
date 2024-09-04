import Image from "next/image";
import Link from "next/link";

import { SMALLER_SPONSORS, SPONSORS } from "@frontend/utils/constants";

const Sponsors = () => {
  return (
    <section id="sponsors" className="pt-[60px] gap-[20px]">
      <div className="md:flex flex-wrap justify-center items-center gap-x-[60px] gap-y-1 hidden">
        {SPONSORS.map((sponsor, idx) => (
          <Link key={`sponsor_link_${idx}`} href={sponsor.path}>
            <Image
              key={`sponsor_logo_${idx}`}
              src={sponsor.logoImg.src}
              alt={sponsor.logoImg.alt}
              width={sponsor.logoImg.width}
              height={sponsor.logoImg.height}
            />
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-1 md:hidden">
        {SPONSORS.map((sponsor, idx) => (
          <Link key={`sponsor_link_${idx}`} href={sponsor.path}>
            <Image
              key={`sponsor_logo_${idx}`}
              src={sponsor.logoImgMobile.src}
              alt={sponsor.logoImgMobile.alt}
              width={sponsor.logoImgMobile.width}
              height={sponsor.logoImgMobile.height}
            />
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center gap-5 md:gap-8">
        <div className="md:flex flex-wrap justify-center items-center gap-x-[100px] gap-y-5 hidden">
          {SMALLER_SPONSORS.map((sponsor, idx) => (
            <Link key={`sponsor_smaller_link_${idx}`} href={sponsor.path}>
              <Image
                src={sponsor.logoImg.src}
                alt={sponsor.logoImg.alt}
                width={sponsor.logoImg.width}
                height={sponsor.logoImg.height}
                className="w-auto h-[30px] md:size-auto"
              />
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5 md:hidden">
          {SMALLER_SPONSORS.map((sponsor, idx) => (
            <Link key={`sponsor_smaller_link_mobile_${idx}`} href={sponsor.path}>
              <Image
                src={sponsor.logoImg.src}
                alt={sponsor.logoImg.alt}
                width={sponsor.logoImg.width}
                height={sponsor.logoImg.height}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
