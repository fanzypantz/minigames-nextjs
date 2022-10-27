import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { HomeProps, LobbyInterface } from "../constants/interfaces";
import { useState } from "react";
import Lobbies from "@components/Lobbies/Lobbies";
import Loader from "../components/Loader";
import { getLobbies, getUser } from "@lib/prisma";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import axios from "axios";
import LobbyCreator from "@components/Lobbies/LobbyCreator";
import { Lobby } from "@prisma/client";

const LIMIT = 2;

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  const [lobbies, setLobbies] = useState(props.lobbies);
  const [loading, setLoading] = useState(false);

  console.log("props : ", props);

  const [lobbiesEnd, setLobbiesEnd] = useState(false);

  const getMoreLobbies = async () => {
    const result = await axios.post("/api/lobbies");
    console.log("result : ", result.data);
  };

  return (
    <main className={styles.container}>
      <h1>Home</h1>
      <Lobbies lobbies={lobbies} />
      <LobbyCreator />

      {!loading && !lobbiesEnd && <button onClick={getMoreLobbies}>Load more</button>}

      <Loader show={loading} />

      {lobbiesEnd && "You have reached the end!"}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let lobbies = {};
  // const session = await getSession(context);
  // if (!session) {
  //   return {
  //     props: { lobbies },
  //   };
  // }

  // const user = await getUser(session);
  lobbies = await getLobbies();

  console.log("lobbies : ", lobbies);

  for (const lobby of lobbies) {
  }

  return {
    props: { lobbies },
  };
};

export default Home;
