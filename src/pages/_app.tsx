import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { ProfileProvider } from "@lib/profileContext";

function MinGameApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ProfileProvider>
        <>
          <Navbar />
          <Component {...pageProps} />
          <Toaster />
        </>
      </ProfileProvider>
    </SessionProvider>
  );
}

export default MinGameApp;
