import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { HomeProps, LobbyInterface } from "../constants/interfaces";
import { useState } from "react";
import Lobbies from "../components/Lobbies";
import Loader from "../components/Loader";

const LIMIT = 2;

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  const [lobbies, setLobbies] = useState(props.lobbies);
  const [loading, setLoading] = useState(false);

  const [lobbiesEnd, setLobbiesEnd] = useState(false);

  const getMoreLobbies = async () => {};

  return (
    <main className={styles.container}>
      <h1>Home</h1>
      <Lobbies lobbies={lobbies} />

      {!loading && !lobbiesEnd && (
        <button onClick={getMoreLobbies}>Load more</button>
      )}

      <Loader show={loading} />

      {lobbiesEnd && "You have reached the end!"}
    </main>
  );
};

export async function getServerSideProps() {
  const lobbies = {};
  return {
    props: { lobbies },
  };
}

export default Home;
