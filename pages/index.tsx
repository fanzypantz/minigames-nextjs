import type { NextPage } from "next";
import Lobby from "../components/Lobby";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <Lobby></Lobby>
    </div>
  );
};

export default Home;
