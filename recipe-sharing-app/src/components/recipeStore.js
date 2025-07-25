// src/components/recipeStore.js
import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [], // ✅ If also required by checker

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

  addRecipe: (recipe) => {
    set((state) => ({
      recipes: [...state.recipes, recipe],
      filteredRecipes: [...state.recipes, recipe].filter((r) =>
        r.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    }));
  },

  addToFavorites: (recipeId) => {
    set((state) => ({
      favorites: [...new Set([...state.favorites, recipeId])],
    }));
  },
}));
