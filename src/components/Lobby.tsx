import styles from "../styles/Home.module.css";
import { LobbyInterface } from "../constants/interfaces";

const Lobby = ({ lobby }: {lobby: LobbyInterface}) => {
  return <div className={styles.container}>
    <h1>{lobby.name}</h1>
  </div>;
};

export default Lobby;
