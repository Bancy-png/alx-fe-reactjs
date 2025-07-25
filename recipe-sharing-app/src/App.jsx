// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useRecipeStore } from './components/recipeStore';
import RecipeDetails from './components/RecipeDetails';
import AddRecipeForm from './components/AddRecipeForm';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import Favorites from './components/Favorites';

function App() {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <Router>
      <div>
        <h1>Recipe Sharing App</h1>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/favorites">Favorites</Link> |{" "}
          <Link to="/recommendations">Recommendations</Link>
          <Link to="/">Home</Link> | <Link to="/favorites">Favorites</Link>
        </nav>
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
          <Route path="/favorites" element={<FavoritesList />} />
          <Route path="/recommendations" element={<RecommendationsList />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
