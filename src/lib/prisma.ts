import prisma from "@lib/client";
import { Session } from "next-auth";
import { User, Lobby } from "@prisma/client";

export const getUser = async (session: Session) => {
  return await prisma.user.findFirst({
    where: {
      email: session?.user?.email || undefined,
    },
  });
};

export const getProfile = async (session: Session, user: User) => {
  return await prisma.profile.findFirst({
    where: {
      userEmail: user?.email || undefined,
    },
  });
};

export const getLobbies = async (): Promise<Lobby[]> => {
  return await prisma.lobby.findMany();
};

export const createLobby = async ({ name, password }: { name: string; password: string }) => {
  return await prisma.lobby.create({
    data: {
      name,
      password,
    },
  });
};
