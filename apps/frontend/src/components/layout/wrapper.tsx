'use client';

import Image from 'next/image';
import { IoClose as Close } from 'react-icons/io5';
import Link from 'next/link';
import { HEADER_MENU } from '@frontend/utils/constants';
import { HiOutlineMenu as Menu } from 'react-icons/hi';
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Footer } from '@frontend/sections';
import { useSession, signOut } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';

const ShowEvent = dynamic(() => import('@frontend/utils/show.event'), {
  ssr: false
});

export const Wrapper = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  const session = useSession();

  const toggleMenu = (force = false) => {
    const navLinks = document.getElementById('navLinks');
    navLinks?.classList.toggle('opacity-0', force);
    navLinks?.classList.toggle('pointer-events-none', force);
    document.documentElement.style.overflow = force ? 'auto' : 'hidden';
    // navLinks?.classList.toggle('hidden', force);
  };
  React.useEffect(() => {
    toggleMenu(true);
  }, [pathName]);

  return (
    <>
      <Toaster />
      <ShowEvent />
      <nav className="absolute z-50 flex items-center justify-between px-5 py-[18px] md:py-0 max-w-[1400px] w-full left-[50%] -translate-x-[50%]">
        <div className="mr-[20px]">
          <Link href="/">
            <Image src="/svgs/Logo.svg" alt="" width={40} height={48} />
          </Link>
        </div>
        <div className="flex items-start md:w-full">
          <div
            id="navLinks"
            className="pointer-events-none fixed top-0 left-0 z-[99] list-none items-center bg-black opacity-0 transition-opacity duration-200 md:pointer-events-auto md:relative md:flex md:bg-transparent md:opacity-100 min-h-screen h-fit md:min-h-fit w-full"
          >
            <div className="mx-[20px] my-[25px] flex items-center justify-end md:hidden">
              <div className="flex h-6 w-6 items-center justify-center">
                <Close size={30} onClick={() => toggleMenu(true)} />
              </div>
            </div>
            <ul className="mx-[20px] mt-[3px] flex flex-col items-center justify-start md:mx-[0px] md:mt-[0px] md:flex-row md:items-center gap-[25px] md:gap-[40px] md:w-full">
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
                    item?.name === 'Ticket'
                      ? session?.status === 'authenticated'
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
              {session.status == 'authenticated' && (
                <Link className="flex-1" href="/dashboard" onClick={() => toggleMenu(true)}>
                  <li
                    className={`cursor-pointer border-[#FFFFFF33] text-[24px] text-white transition duration-300 ease-in active:text-[#FBFF14] hover:text-[#A489FF] md:border-none md:py-[30px] uppercase font-bebas`}
                  >
                    Your Team
                  </li>
                </Link>
              )}
              {session.status == 'authenticated' && (
                <li
                  onClick={() => signOut()}
                  className={`cursor-pointer border-[#FFFFFF33] text-[24px] text-white transition duration-300 ease-in active:text-[#FBFF14] hover:text-[#A489FF] md:border-none md:py-[30px] uppercase font-bebas`}
                >
                  Logout
                </li>
              )}
            </ul>
          </div>
          <button className="md:hidden" onClick={() => toggleMenu()}>
            <Menu size={30} />
          </button>
        </div>
      </nav>
      <div className="mt-[100px] clear-both w-full max-w-[1400px] mx-auto px-5 min-h-[500px]">
        {children}
      </div>
      <Footer />
    </>
  );
};
