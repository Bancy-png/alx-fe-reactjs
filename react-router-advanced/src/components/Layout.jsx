import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const active = ({ isActive }) => ({
  marginRight: 12,
  textDecoration: isActive ? "underline" : "none"
});

export default function Layout() {
  return (
    <div style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <header style={{ marginBottom: 18 }}>
        <NavLink to="/" style={active}>Home</NavLink>
        <NavLink to="/about" style={active}>About</NavLink>
        <NavLink to="/posts" style={active}>Posts</NavLink>
        <NavLink to="/profile" style={active}>Profile</NavLink>
        <NavLink to="/login" style={active}>Login</NavLink>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
