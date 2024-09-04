import { ReactNode } from "react";
import { auth } from "@frontend/auth";
import { SessionProvider } from "next-auth/react";
import "@frontend/styles/globals.css";
import { Wrapper } from "@frontend/components/layout/wrapper";
import { inter, bebas_neue } from "@frontend/utils/fonts";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <html className={inter.className}>
      <head>
        <title>DevFest AI</title>
      </head>
      <body>
        <main className={`${inter.variable} ${bebas_neue.variable} font-inter flex flex-col`}>
          <SessionProvider session={session}>
            <Wrapper>{children}</Wrapper>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
