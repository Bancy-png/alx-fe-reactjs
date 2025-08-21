import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Profile from "./components/Profile/Profile";
import ProfileDetails from "./components/Profile/ProfileDetails";
import ProfileSettings from "./components/Profile/ProfileSettings";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />

            {/* Public route for posts list + dynamic post route */}
            <Route path="posts" element={<Posts />} />
            <Route path="posts/:postId" element={<Post />} />

            {/* Login */}
            <Route path="login" element={<Login />} />

            {/* Protected nested Profile route */}
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            >
              {/* Nested routes inside /profile */}
              <Route index element={<ProfileDetails />} />
              <Route path="details" element={<ProfileDetails />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<h2>404 — Page not found</h2>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
