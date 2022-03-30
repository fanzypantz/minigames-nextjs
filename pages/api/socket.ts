import { Server } from "Socket.IO";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (!res.socket) {
    return;
  }

  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
