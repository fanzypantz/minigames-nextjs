import styles from "../styles/Home.module.css";
import { UserInterface } from "../constants/interfaces";

const UserProfile = ({ user }: { user: UserInterface }) => {
  return (
    <div className={styles.container}>
      <img src={user.photoURL} alt="" />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  );
};

export default UserProfile;
