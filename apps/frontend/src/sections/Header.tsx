"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HiOutlineMenu as Menu } from "react-icons/hi";
import { IoClose as Close } from "react-icons/io5";

import { Button } from "@frontend/components/button";
import { HEADER_MENU } from "@frontend/utils/constants";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Header = () => {
  const pathName = usePathname();
  const session = useSession();
  const router = useRouter();

  const toggleMenu = (force = false) => {
    const navLinks = document.getElementById("navLinks");
    navLinks?.classList.toggle("opacity-0", force);
    navLinks?.classList.toggle("pointer-events-none", force);
    document.documentElement.style.overflow = force ? "auto" : "hidden";
    // navLinks?.classList.toggle('hidden', force);
  };
  React.useEffect(() => {
    toggleMenu(true);
  }, [pathName]);

  return (
    <>
      <nav className="absolute z-50 flex items-center justify-between px-5 py-[18px] md:py-0 max-w-[1400px] w-full left-[50%] -translate-x-[50%]">
        <div className="md:hidden">
          <Image src="/svgs/Logo.svg" alt="" width={40} height={48} />
        </div>
        <div className="flex items-center md:w-full">
          <div
            id="navLinks"
            className="pointer-events-none fixed top-0 left-0 z-[99] list-none items-center bg-black opacity-0 transition-opacity duration-200 md:pointer-events-auto md:relative md:flex md:bg-transparent md:opacity-100 min-h-screen h-fit md:min-h-fit w-full"
          >
            <div className="mx-[20px] my-[25px] flex items-center justify-end md:hidden">
              <div className="flex h-6 w-6 items-center justify-center">
                <Close size={30} onClick={() => toggleMenu(true)} />
              </div>
            </div>
            <ul className="mx-[20px] mt-[3px] flex flex-col items-center justify-center md:mx-[0px] md:mt-[0px] md:flex-row md:items-center gap-[25px] md:gap-[40px] md:w-full">
              <Link
                href="/"
                className="md:hidden mb-[25px]"
                onClick={() => toggleMenu(true)}
              >
                <Image src="/svgs/Logo.svg" alt="" width={40} height={48} />
              </Link>
              {HEADER_MENU.map((item, index) => (
                <Link
                  href={
                    item?.name === "Ticket"
                      ? session?.status === "authenticated"
                        ? // @ts-ignore
                          `/dashboard/ticket`
                        : item?.path
                      : item?.path
                  }
                  key={index}
                  onClick={() => toggleMenu(true)}
                >
                  <li
                    className={`cursor-pointer border-b-[${
                      index < HEADER_MENU.length - 1 ? 1 : 0
                    }px] border-[#FFFFFF33] text-[24px] text-white transition duration-300 ease-in active:text-[#FBFF14] hover:text-[#A489FF] md:border-none md:py-[30px] uppercase font-bebas`}
                  >
                    {item?.name}
                  </li>
                </Link>
              ))}
              <div className="!h-fit !py-5 md:!py-3 px-8 md:!px-6 mt-[25px] md:mt-0 md:!ml-auto">
                {session.status !== "loading" && (
                  <Button
                    icon="arrow-up-right"
                    variant="tertiary"
                    size="sm"
                    onClick={() => {
                      if (session.status === "authenticated") {
                        return router.push("/dashboard");
                      }
                      return signIn("github", {
                        callbackUrl: "/dashboard",
                        redirect: true,
                      });
                    }}
                  >
                    {session.status === "authenticated"
                      ? "Your Team"
                      : "Join Now"}
                  </Button>
                )}
              </div>
            </ul>
          </div>
          <button className="md:hidden" onClick={() => toggleMenu()}>
            <Menu size={30} />
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
