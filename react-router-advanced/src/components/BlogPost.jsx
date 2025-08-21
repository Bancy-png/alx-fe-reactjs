import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Blog Post {id}</h2>
      <p>This is the content for blog post with ID: {id}.</p>
    </div>
  );
}
