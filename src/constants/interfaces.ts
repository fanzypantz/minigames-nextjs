import { FireBaseTimeStamp } from "../lib/firebase";

export interface UserInterface {
  uid: string;
  displayName: string;
  photoURL: string;
  username: string;
}

export interface LobbyInterface {
  name: string;
  password: string;
  createdAt: number | typeof FireBaseTimeStamp;
  updatedAt: number | typeof FireBaseTimeStamp;
}

export interface HomeProps {
  lobbies: LobbyInterface[];
}

export interface UserPageProps {
  lobby: LobbyInterface;
  user: UserInterface;
}
