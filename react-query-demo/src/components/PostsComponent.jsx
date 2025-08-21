import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetch posts for a given page
async function fetchPosts(page) {
  const res = await fetch(`${POSTS_URL}?_page=${page}&_limit=10`);
  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }
  return res.json();
}

export default function PostsComponent() {
  const [page, setPage] = useState(1);

  const {
    data,
    error,
    isLoading,
    isError,
    isFetching,
    isPreviousData,   // 👈 tells us if we are showing cached data
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    keepPreviousData: true,   // 👈 REQUIRED for caching check
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading posts…</p>;
  if (isError) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <section>
      <div style={{ marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={() => setPage((old) => Math.max(old - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage((old) => old + 1)} disabled={isPreviousData}>
          Next
        </button>
        {isFetching && <span> Updating…</span>}
      </div>

      <ul style={{ lineHeight: 1.5 }}>
        {data.map((post) => (
          <li key={post.id} style={{ marginBottom: 10 }}>
            <strong>#{post.id}:</strong> {post.title}
          </li>
        ))}
      </ul>
      <p style={{ marginTop: 12, color: "#555" }}>
        Page {page} — showing cached data while fetching next page.
      </p>
    </section>
  );
}
