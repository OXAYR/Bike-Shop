// lib/categories.ts
import api from './woocommerce';

/**
 * Fetch all product categories with pagination
 */
export async function getCategories(page = 1, perPage = 100) {
  try {
    const response = await api.get("products/categories", {
      per_page: perPage,
      page: page
    });
    
    return {
      categories: response.data,
      totalPages: parseInt(response.headers['x-wp-totalpages'], 10) || 1,
      total: parseInt(response.headers['x-wp-total'], 10) || 0
    };
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return { categories: [], totalPages: 1, total: 0 };
  }
}

/**
 * Fetch a single category by ID
 */
export async function getCategoryById(id) {
  try {
    const response = await api.get(`products/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    return null;
  }
}

/**
 * Fetch a single category by slug
 */
export async function getCategoryBySlug(slug) {
  try {
    const response = await api.get("products/categories", {
      slug: slug
    });
    
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return null;
  }
}