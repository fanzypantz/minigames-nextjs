import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

interface UserPageProps {
  lobby: {
    name: string;
    password: string;
  };
}

const UserPage: NextPage<UserPageProps> = (props) => {
  console.log(props);

  return <div className={styles.container}></div>;
};
