import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout(() => navigate("/", { replace: true }));
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Welcome, <strong>{user?.name}</strong></p>

      <nav style={{ marginBottom: 12 }}>
        <Link to="details" style={{ marginRight: 12 }}>Details</Link>
        <Link to="settings">Settings</Link>
      </nav>

      <Outlet />

      <div style={{ marginTop: 12 }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
