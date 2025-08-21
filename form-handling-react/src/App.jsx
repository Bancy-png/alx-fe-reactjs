import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import PostsComponent from "./components/PostsComponent";
import RegistrationForm from "./components/RegistrationForm"; // ✅ added

// Create a single QueryClient for the app
const queryClient = new QueryClient();

export default function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
        <h1>React Query Demo</h1>

        <div style={{ marginBottom: 12 }}>
          <button onClick={() => setShowPosts((s) => !s)}>
            {showPosts ? "Hide" : "Show"} PostsComponent
          </button>
          <p style={{ marginTop: 8, maxWidth: 600 }}>
            Toggle this to unmount/mount the component and observe{" "}
            <strong>cache</strong> behavior. If you show it again within the
            cache window, data should appear instantly (from cache) without a new
            network call.
          </p>
        </div>

        {showPosts && <PostsComponent />}

        {/* ✅ Added RegistrationForm below */}
        <div style={{ marginTop: 24 }}>
          <h2>Register</h2>
          <RegistrationForm />
        </div>

        {/* Devtools to inspect queries/caching */}
        <ReactQueryDevtools initialIsOpen={false} />
      </main>
    </QueryClientProvider>
  );
}
