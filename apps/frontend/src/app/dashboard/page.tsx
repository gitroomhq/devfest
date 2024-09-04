import { Main } from "@frontend/components/dashboard/main";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'DevFest AI 2024 - My Team',
  description: 'Collaborate with your teammate and win awesome SWAG.',
}

export default async function Page() {
  return (
    <>
      <Main />
    </>
  );
}
