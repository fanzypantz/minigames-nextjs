import styles from "../styles/Home.module.css";
import { LobbyInterface } from "../constants/interfaces";
import Lobby from "./Lobby";

const Lobbies = ({ lobbies }: { lobbies: LobbyInterface[] }) => {
  if (lobbies.length > 0) {
    return (
      <div className={styles.container}>
        {lobbies.map((lobby, index) => (
          <Lobby key={index} lobby={lobby} />
        ))}
      </div>
    );
  }

  return <></>;
};

export default Lobbies;
