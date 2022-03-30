import "../styles/globals.css";
import { useEffect } from "react";
import io from "Socket.IO-client";
import type { AppProps } from "next/app";

let socket;

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });
  };

  return <Component {...pageProps} />;
}

export default MyApp;
