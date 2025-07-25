// src/components/RecipeDetails.jsx
import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from "./recipeStore";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);

  const recipe = recipes.find((r) => r.id === parseInt(id));

  if (!recipe) return <p>Recipe not found.</p>;

  const isFavorite = favorites.includes(recipe.id);

  const handleToggleFavorite = () => {
    toggleFavorite(recipe.id);
    alert(
      isFavorite
        ? 'Removed from favorites!'
        : 'Added to favorites!'
    );
  };

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>

      <button onClick={handleToggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>

      <div style={{ marginTop: '20px' }}>
        <Link to="/">← Back to Recipes</Link> |{' '}
        <Link to="/favorites">❤️ View Favorites</Link>
      </div>
    </div>
  );
};

export default RecipeDetails;
