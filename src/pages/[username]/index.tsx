import styles from "../../styles/Home.module.css";

import type { NextPage } from "next";
import UserProfile from "../../components/UserProfile";
import { getUserWithUsername } from "../../lib/firebase";
import { UserPageProps } from "../../constants/interfaces";

const UserPage: NextPage<UserPageProps> = ({ user }) => {
  return (
    <main className={styles.container}>
      <UserProfile user={user} />
    </main>
  );
};

export async function getServerSideProps({ query }: { query: { username: string } }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);
  const user = userDoc.data();

  return {
    props: { user },
  };
}

export default UserPage;
