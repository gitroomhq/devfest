import "@frontend/styles/globals.css";
import '@sweetalert2/themes/dark/dark.css';
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import { inter, bebas_neue } from "@frontend/utils/fonts";

export default function App({ session, Component, pageProps }: AppProps & {session: any}) {
  return (
    <main className={`${inter.variable} ${bebas_neue.variable} font-inter flex flex-col`}>
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    </main>
  );
}
