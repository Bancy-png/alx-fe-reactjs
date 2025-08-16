// src/components/AddRecipeForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function parseList(text) {
  // Accept newline or comma separated lists, trim entries and remove empties
  return text
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    const ingredients = parseList(ingredientsText);
    if (ingredients.length < 2) e.ingredients = "Please provide at least 2 ingredients (comma or newline separated).";
    const instructions = parseList(instructionsText);
    if (instructions.length < 1) e.instructions = "Please provide at least one instruction step.";
    return { valid: Object.keys(e).length === 0, errors: e, ingredients, instructions };
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const { valid, errors: vErrs, ingredients, instructions } = validate();
    setErrors(vErrs);
    if (!valid) return;

    // Create a new recipe object
    const newRecipe = {
      id: Date.now(), // simple unique id
      title: title.trim(),
      summary: instructions[0] ? String(instructions[0]).slice(0, 140) : "",
      image: image.trim() || "https://via.placeholder.com/600x400?text=Recipe",
      ingredients,
      instructions,
    };

    // Save to localStorage "recipes_extra"
    const existing = JSON.parse(localStorage.getItem("recipes_extra") || "[]");
    existing.push(newRecipe);
    localStorage.setItem("recipes_extra", JSON.stringify(existing));

    // Redirect to the new recipe's detail page
    navigate(`/recipe/${newRecipe.id}`);
  };

  const isDisabled = () => {
    const res = validate();
    return !res.valid;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Add a New Recipe</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-6 md:p-8 space-y-6"
          noValidate
        >
          <div>
            <label className="block text-sm font-medium mb-1">Recipe Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. Masala Chapati Wraps"
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ingredients (comma or newline separated)</label>
            <textarea
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              rows={4}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder={"e.g.\nChicken, Onion, Tomato\nor\nChicken, Onion, Tomato"}
            />
            {errors.ingredients && <p className="text-red-600 text-sm mt-1">{errors.ingredients}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Instructions (each step on new line or comma separated)</label>
            <textarea
              value={instructionsText}
              onChange={(e) => setInstructionsText(e.target.value)}
              rows={6}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder={"e.g.\nMix spices\nCook chicken\nAssemble wrap"}
            />
            {errors.instructions && <p className="text-red-600 text-sm mt-1">{errors.instructions}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="https://..."
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isDisabled()}
              className={`px-4 py-2 rounded-lg font-medium shadow ${
                isDisabled()
                  ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Add Recipe
            </button>

            <button
              type="button"
              onClick={() => {
                setTitle("");
                setIngredientsText("");
                setInstructionsText("");
                setImage("");
                setErrors({});
              }}
              className="px-3 py-2 rounded-lg border text-sm"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
