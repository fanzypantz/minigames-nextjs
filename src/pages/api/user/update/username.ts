import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/client";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const { username } = req.body;

  try {
    const profileResponse = await prisma.profile.findFirst({
      where: { userEmail: session?.user?.email || undefined },
    });
    if (!profileResponse) {
      const createResponse = await prisma.user.update({
        where: { email: session?.user?.email || undefined },
        data: {
          profile: {
            create: {
              username: "test",
            },
          },
        },
      });

      console.log("createResponse : ", createResponse);

      return res.status(200).send(createResponse);
    }

    const updateResponse = await prisma.profile.update({
      where: {
        userEmail: session?.user?.email || undefined,
      },
      data: {
        username: username || "",
      },
    });

    console.log("updateResponse : ", updateResponse);

    res.status(200).send(updateResponse);
  } catch (e) {
    res.status(500).send(e);
  }
}
