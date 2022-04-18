import styles from "@styles/Home.module.css";
import UserNameForm from "@components/UserNameForm";
import type { User } from "@prisma/client";

const UserProfile = ({ user }: { user: User }) => {
  return (
    <div className={styles.container}>
      <UserNameForm />

      <img src={user.image} alt="" />
      <p>
        <i>@{user.name}</i>
        <i>@{user.username}</i>
      </p>
    </div>
  );
};

export default UserProfile;
