import { createContext, useEffect, useState } from "react";
import { Profile } from "@prisma/client";
import axios from "axios";

export interface ProfileContextInterface {
  profile: Profile;
  setProfile: (profile: Profile) => void;
  fetchProfile: () => Promise<Profile>;
}

export const ProfileContext = createContext<ProfileContextInterface>(
  {} as ProfileContextInterface
);

export const ProfileProvider = ({ children }: { children?: JSX.Element }) => {
  // User is the name of the "data" that gets stored in context
  const [profile, setProfile] = useState<Profile>({} as Profile);

  useEffect(() => {
    if (!profile.userEmail) {
      fetchProfile().then((profile) => {
        setProfile(profile);
      });
    }
  }, []);

  const fetchProfile = async (): Promise<Profile> => {
    const result = await axios.get("/api/user");
    return result.data;
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
