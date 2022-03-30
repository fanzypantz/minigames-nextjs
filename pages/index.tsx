import type { NextPage } from "next";
import Lobby from "../components/Lobby";
import styles from "../styles/Home.module.css";
import firestore from "../config/firebaseConfig";

interface HomeProps {
  lobby: {
    name: string;
    password: string;
  };
}

const Home: NextPage<HomeProps> = (props) => {
  console.log(props);

  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <Lobby lobby={props.lobby} />
    </div>
  );
};

export async function getStaticProps() {
  // const snapshot = await firestore.collection("lobby").get();
  // const lobbies = snapshot.docs.map((doc) => doc.data());

  const ref = firestore.doc("lobby/sAreh8nkhoqZkX7V92yJ");
  const lobby = (await ref.get()).data();

  return {
    props: { lobby },
  };
}

export default Home;
