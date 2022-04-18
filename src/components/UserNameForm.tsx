import React, { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const UserNameForm = () => {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session || !session.user || !session.user.email) {
      return;
    }

    try {
      const result = await axios.post("/api/user/update/username", {
        username,
      });
      console.log("new User : ", result.data);
    } catch (err) {
      // @ts-ignore
      console.log(err.response.data);
    }
  };

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { value } = target;
    setUsername(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" onChange={(e) => handleChange(e)} />
      </label>
      <br />
      <button type="submit">Change</button>
    </form>
  );
};

export default UserNameForm;
