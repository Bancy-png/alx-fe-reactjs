// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useRecipeStore } from './components/recipeStore';
import RecipeDetails from './components/RecipeDetails';

function App() {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <Router>
      <div>
        <h1>Recipe Sharing App</h1>
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
                  </div>
                ))}
              </div>
            }
          />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
