import {
  Header,
  Hero,
  Sponsors,
  About,
  Events,
  Ticket,
  Swag,
  FAQ,
  Footer,
} from '@frontend/sections';
import { FAQ_ITEMS } from '@frontend/utils/constants';
import { useSession } from 'next-auth/react';
import Seo from '@frontend/components/seo/seo';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

const ShowEvent = dynamic(() => import('@frontend/utils/show.event'), {
  ssr: false,
});

export default function Home() {
  const session = useSession();
  return (
    <>
      <Seo
        title="Home"
        description="Contribute code to AI repositories, meet new people, Participate in events and win awesome SWAG."
      />
      <ShowEvent />
      <Header />
      <Hero />
      <Sponsors />
      <About />
      <Events />
      <Ticket
        hideColorPicker={true}
        // @ts-ignore
        user={{ ...session.data?.user! }}
      />
      <Swag />
      <FAQ items={FAQ_ITEMS} />
      <Footer />
    </>
  );
}
