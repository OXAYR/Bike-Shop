// src/app/context/CategoriesContext.js
'use client';

import { createContext, useContext } from 'react';

// Create the context with a default empty value
const CategoriesContext = createContext({
  categories: []
});

// Optional: Create a custom hook for using the context
export function useCategories() {
  return useContext(CategoriesContext);
}

// Export the context itself (this was missing)
export { CategoriesContext };