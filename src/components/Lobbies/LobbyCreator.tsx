import styles from "@styles/Home.module.css";
import React, { useState } from "react";
import axios from "axios";

const LobbyCreator = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await axios.post("/api/lobbies/create", {
      name,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
};

export default LobbyCreator;
