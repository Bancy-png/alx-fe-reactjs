// src/components/Favorites.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const Favorites = () => {
  const { favorites, recipes } = useRecipeStore();

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  return (
    <div>
      <h2>Favorite Recipes</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <ul>
          {favoriteRecipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              <Link to="/favorites">❤️ View Favorites</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
