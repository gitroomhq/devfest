import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@frontend/components/button";
import { useRouter } from "next/router";

const Hero = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <div className="relative mobile:pb-[290px] max-mobile:pb-[150px] md:pb-0">
      <div className="flex justify-center">
        <Image
          src="/Hero.png"
          alt=""
          width={1440}
          height={889}
          className="hidden md:block"
        />
        <Image
          src="/Hero-mobile.png"
          alt=""
          width={375}
          height={360}
          className="block md:hidden w-full"
        />
      </div>
      <div className="flex justify-center">
        <div className="absolute max-w-[1400px] mx-auto px-5 w-full top-[358px] mobile:top-[450px] md:top-[101.5px] flex flex-col items-center md:items-start text-center md:text-left gap-6">
          <Image
            src="/svgs/Logo.svg"
            alt=""
            width={60}
            height={73}
            className="hidden md:block"
          />
          <div className="w-fit">
            <p className="text-[90px] leading-[72px] md:text-[150px] lg:text-[200px] md:leading-[160px] -tracking-[5px] font-bebas">
              DevFest AI
            </p>
            <h5 className="max-w-[500px]">
              Contribute code to AI repositories, meet new people,
              Participate in events and win awesome <strong>SWAG.</strong>
            </h5>
          </div>
          {session.status !== "loading" && (
            <Button
              icon="arrow-up-right"
              className="w-fit"
              onClick={() => {
                if (session.status === "authenticated") {
                  return router.push("/dashboard");
                }
                return signIn("github", {
                  callbackUrl: "/dashboard",
                  redirect: true
                });
              }}
            >
              {session.status === "authenticated"
                ? "Move to your team"
                : "Sign up with GitHub"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
