// src/components/recipeStore.js
import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [], // ✅ Added this line

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      ),
    }));
  },

  setRecipes: (recipes) => {
    set({ recipes });
    set((state) => ({
      filteredRecipes: recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    }));
  },

  addToFavorites: (recipeId) => {
    set((state) => ({
      favorites: [...new Set([...state.favorites, recipeId])],
    }));
  },

  // ✅ (Optional) Set recommendations method
  setRecommendations: (recommendations) => {
    set({ recommendations });
  },
}));
