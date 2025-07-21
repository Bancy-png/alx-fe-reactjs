import React, { useContext } from "react";
import { UserContext } from "../UserContext";

const Counter = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>User Info</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default Counter;
