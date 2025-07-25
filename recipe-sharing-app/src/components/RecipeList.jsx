import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';

const RecipeList = () => {
  const {
    filteredRecipes,
    filterRecipes,
    searchTerm,
    recipes,
  } = useRecipeStore((state) => ({
    filteredRecipes: state.filteredRecipes,
    filterRecipes: state.filterRecipes,
    searchTerm: state.searchTerm,
    recipes: state.recipes,
  }));

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, recipes, filterRecipes]);

  return (
    <div>
      <h2>Recipes</h2>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {filteredRecipes.map((recipe) => (
            <li key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <button>Add New Recipe</button>
              </Link>
              <p>{recipe.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
