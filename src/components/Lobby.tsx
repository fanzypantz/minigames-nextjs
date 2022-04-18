import styles from "../styles/Home.module.css";
import { LobbyInterface } from "../constants/interfaces";
import React, { useState } from "react";

const Lobby = ({ lobby }: { lobby: LobbyInterface }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password === lobby.password) {
      return;
    }
  };

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setPassword(value);
  };

  return (
    <div className={styles.container}>
      <h1>{lobby.name}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default Lobby;
