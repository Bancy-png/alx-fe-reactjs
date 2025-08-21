import { useQuery } from "@tanstack/react-query";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

async function fetchPosts() {
  const res = await fetch(POSTS_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  return res.json();
}

export default function PostsComponent() {
  const {
    data,
    error,
    isLoading,
    isError,
    isFetching,          // background refetch indicator
    refetch,
    dataUpdatedAt,       // timestamp of last successful fetch
  } = useQuery({
    queryKey: ["posts"], 
    queryFn: fetchPosts,
    staleTime: 60 * 1000,          // data considered fresh for 60s
    gcTime: 5 * 60 * 1000,         // ✅ in v5 use gcTime instead of cacheTime
    refetchOnWindowFocus: false,   // avoid surprise refetch when focusing tab
  });

  if (isLoading) return <p>Loading posts…</p>;
  if (isError) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  const lastUpdated = new Date(dataUpdatedAt).toLocaleTimeString();

  return (
    <section>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <button onClick={() => refetch()}>Refetch Posts</button>
        {isFetching && <span>Refetching in background…</span>}
        <span style={{ marginLeft: "auto" }}>
          Last updated: <strong>{lastUpdated}</strong>
        </span>
      </div>

      <ul style={{ lineHeight: 1.5 }}>
        {data.slice(0, 10).map((post) => (
          <li key={post.id} style={{ marginBottom: 10 }}>
            <strong>#{post.id}:</strong> {post.title}
          </li>
        ))}
      </ul>
      <p style={{ marginTop: 12, color: "#555" }}>
        Showing first 10 posts (cached). Use the button above to force a refetch.
      </p>
    </section>
  );
}
