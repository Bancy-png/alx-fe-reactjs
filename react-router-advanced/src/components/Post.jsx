import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      const data = await res.json();
      setPost(data);
    })();
  }, [postId]);

  if (!post) return <p>Loading post...</p>;

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </article>
  );
}
