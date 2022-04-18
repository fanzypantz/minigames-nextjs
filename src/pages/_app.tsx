import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

function MinGameApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </SessionProvider>
  );
}

export default MinGameApp;
