import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const url = new URL("../data.json", import.meta.url);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setRecipes(data))
      .catch((err) => setError(err.message || "Failed to load recipes"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-gray-600 animate-pulse">Loading recipes…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Recipe Sharing Platform
          </h1>
          <p className="mt-2 text-gray-600">
            Browse, add, and share your favorite recipes.
          </p>
        </header>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {recipes.map((r) => (
            <article
              key={r.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-0.5 overflow-hidden"
            >
              <div className="w-full h-48 bg-gray-100">
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-5">
                <h2 className="text-xl font-semibold">{r.title}</h2>
                <p className="mt-2 text-gray-600 line-clamp-3">{r.summary}</p>

                {/* React Router Link to details */}
                <Link
                  to={`/recipe/${r.id}`}
                  className="inline-flex items-center mt-4 text-blue-600 hover:underline"
                >
                  View details →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
