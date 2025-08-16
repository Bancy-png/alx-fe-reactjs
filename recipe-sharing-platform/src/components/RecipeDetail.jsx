// src/components/RecipeDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const url = new URL("../data.json", import.meta.url);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const found = data.find((r) => String(r.id) === String(id));
        if (!found) throw new Error("Recipe not found");
        setRecipe(found);
      })
      .catch((err) => setError(err.message || "Failed to load recipe"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-gray-600 animate-pulse">Loading recipe…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>

        <article className="bg-white rounded-2xl shadow p-5 md:p-8">
          {/* Top section: image + title/summary side-by-side on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full h-56 sm:h-72 md:h-full bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {recipe.title}
              </h1>
              <p className="mt-3 text-gray-600">{recipe.summary}</p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-xl font-semibold">Ingredients</h2>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700">
                {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
                  recipe.ingredients.map((item, idx) => <li key={idx}>{item}</li>)
                ) : (
                  <li>No ingredients provided.</li>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Instructions</h2>
              <ol className="mt-3 list-decimal list-inside space-y-2 text-gray-700">
                {Array.isArray(recipe.instructions) && recipe.instructions.length > 0 ? (
                  recipe.instructions.map((step, idx) => <li key={idx}>{step}</li>)
                ) : (
                  <li>No instructions provided.</li>
                )}
              </ol>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
