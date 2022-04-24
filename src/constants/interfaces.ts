import type { User, Profile } from "@prisma/client";

export interface UserInterface {
  uid: string;
  displayName: string;
  photoURL: string;
  username: string;
}

export interface LobbyInterface {
  name: string;
  password: string;
  createdAt: number;
  updatedAt: number;
}

export interface HomeProps {
  lobbies: LobbyInterface[];
}

export interface UserPageProps {
  lobby: LobbyInterface;
  user: User;
  profile: Profile;
}
