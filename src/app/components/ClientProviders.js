// src/app/components/ClientProviders.js
'use client';

import { CategoriesContext } from '@/app/context/CategoriesContext';
import { CartProvider } from '@/app/context/CartContext';

export function ClientProviders({ children, categoriesData }) {
  return (
    <CategoriesContext.Provider value={categoriesData || { categories: [] }}>
      <CartProvider>
        {children}
      </CartProvider>
    </CategoriesContext.Provider>
  );
}