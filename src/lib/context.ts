import { createContext } from "react";
import { UserInterface } from "../constants/interfaces";

interface ContextProps {
  // currentUser?: firestore.User | null;
  // setCurrentUser?: any;
  user: UserInterface | null;
  username: string | null;
}

export const UserContext = createContext<ContextProps>({
  user: null,
  username: null,
});
