import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/profile";

  function handleSubmit(e) {
    e.preventDefault();
    // simulate login
    auth.login(username || "User", () => {
      navigate(from, { replace: true });
    });
  }

  if (auth.isAuthenticated) {
    // If already logged in, send to profile
    navigate("/profile", { replace: true });
    return null;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>{" "}
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
