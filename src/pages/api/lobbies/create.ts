import { NextApiRequest, NextApiResponse } from "next";

import { createLobby } from "@lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, password } = req.body;

  try {
    const lobby = await createLobby({ name, password });
    res.status(200).send(lobby);
  } catch (e) {
    res.status(500).send(e);
  }
}
