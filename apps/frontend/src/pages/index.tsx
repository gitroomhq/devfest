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
} from "@frontend/sections";
import { FAQ_ITEMS } from "@frontend/utils/constants";
import { useSession } from "next-auth/react";
import Seo from "@frontend/components/seo/seo";

export default function Home() {
  const session = useSession();
  return (
    <>
      <Seo
        title="Home"
        description="Contribute code to AI repositories, meet new people, Participate in events and win awesome SWAG."
      />
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
