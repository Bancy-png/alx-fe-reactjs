// src/components/PostsComponent.jsx
import { useState } from "react";
import { useQuery } from "react-query";

export default function PostsComponent() {
  const [page, setPage] = useState(1);

  const fetchPosts = async ({ queryKey }) => {
    const [_key, page] = queryKey;
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
    );
    return res.json();
  };

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery(["posts", page], fetchPosts, {
    keepPreviousData: true, // ✅ keep old data during fetch
    cacheTime: 1000 * 60 * 5, // ✅ cache for 5 minutes
    staleTime: 1000 * 30, // ✅ data considered fresh for 30s
    refetchOnWindowFocus: false, // ✅ prevent auto refetch on window focus
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div style={{ marginTop: 16 }}>
      <h2>Posts (Page {page})</h2>

      <ul>
        {data?.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage((p) => p + 1)} disabled={page === 20}>
          Next
        </button>
      </div>

      {isFetching && <p>Loading new data...</p>}
    </div>
  );
}
