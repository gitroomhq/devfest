import { Bonuses } from "@frontend/components/bonuses/bonus";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'DevFest AI 2024 - Bonuses',
  description: 'Collaborate with your teammate and win awesome SWAG - Bonuses.',
}

export default async function Page() {
  return <Bonuses />;
}
