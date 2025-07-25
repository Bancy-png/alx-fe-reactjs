// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useRecipeStore } from './components/recipeStore';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm'; // ✅ NEW
import AddRecipeForm from './components/AddRecipeForm';   // Already imported

function App() {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <Router>
      <div>
        <h1>Recipe Sharing App</h1>
        <Link to="/add">
          <button>Add New Recipe</button>
        </Link>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                {recipes.map((recipe) => (
                  <div key={recipe.id}>
                    <h2>
                      <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                    </h2>
                    <p>{recipe.description}</p>
                    <Link to={`/edit/${recipe.id}`}>
                      <button>Edit</button>
                    </Link>
                  </div>
                ))}
              </div>
            }
          />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/edit/:id" element={<EditRecipeForm />} /> {/* ✅ NEW */}
          <Route path="/add" element={<AddRecipeForm />} />       {/* ✅ Already added */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
