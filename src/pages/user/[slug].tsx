import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

interface HighScorePageProps {
  lobby: {
    name: string;
    password: string;
  };
}

const HighScorePage: NextPage<HighScorePageProps> = (props) => {
  console.log(props);

  return <div className={styles.container}></div>;
};
