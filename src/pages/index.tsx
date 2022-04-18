import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { HomeProps, LobbyInterface } from "../constants/interfaces";
import { docToJSON, firestore, fromMillis } from "../lib/firebase";
import { useState } from "react";
import Lobbies from "../components/Lobbies";
import Loader from "../components/Loader";

const LIMIT = 2;

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  const [lobbies, setLobbies] = useState(props.lobbies);
  const [loading, setLoading] = useState(false);

  const [lobbiesEnd, setLobbiesEnd] = useState(false);

  const getMoreLobbies = async () => {
    setLoading(true);
    const last = lobbies[lobbies.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collection("lobbies")
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(LIMIT);

    const newLobbies = (await query.get()).docs.map(
      (doc) => doc.data() as LobbyInterface
    );

    setLobbies(lobbies.concat(newLobbies));
    setLoading(false);

    if (newLobbies.length < LIMIT) {
      setLobbiesEnd(true);
    }
  };

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
  const lobbyQuery = firestore
    .collection("lobbies")
    .orderBy("createdAt", "desc")
    .limit(LIMIT);

  const lobbies = (await lobbyQuery.get()).docs.map(docToJSON);
  return {
    props: { lobbies },
  };
}

export default Home;
