import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/client";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  try {
    const profileResponse = await prisma.profile.findFirst({
      where: { userEmail: session?.user?.email || undefined },
    });
    res.status(200).send(profileResponse);
  } catch (e) {
    res.status(500).send(e);
  }
}
