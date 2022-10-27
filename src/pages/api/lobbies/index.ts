import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/client";
import { getSession } from "next-auth/react";
import { getLobbies } from "@lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const lobbies = await getLobbies();
    res.status(200).send(lobbies);
  } catch (e) {
    res.status(500).send(e);
  }
}
