import styles from "@styles/Home.module.css";
import UserNameForm from "@components/User/UserNameForm";
import type { User } from "@prisma/client";
import { useContext } from "react";
import { ProfileContext } from "@lib/profileContext";

const UserProfile = ({ user }: { user: User }) => {
  const { profile } = useContext(ProfileContext);

  return (
    <div className={styles.container}>
      <h1>User Profile</h1>
      <UserNameForm />

      <img src={user.image || ""} alt="" />
      <div>
        <p>Login: @{user.name}</p>
        <p>Username: @{profile.username}</p>
      </div>
    </div>
  );
};

export default UserProfile;
