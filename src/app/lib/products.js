// lib/products.ts
import api from './woocommerce';

/**
 * Fetch all products with pagination
 */
export async function getProducts(page = 1, perPage = 20) {
  try {
    const response = await api.get("products", {
      per_page: perPage,
      page: page
    });
    
    return {
      products: response.data,
      totalPages: parseInt(response.headers['x-wp-totalpages'], 10) || 1,
      total: parseInt(response.headers['x-wp-total'], 10) || 0
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalPages: 1, total: 0 };
  }
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id) {
  try {
    const response = await api.get(`products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug) {
  try {
    const response = await api.get("products", {
      slug: slug
    });
    
    // The API returns an array, but since slugs are unique,
    // we can safely return the first item
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch products by category ID
 */
export async function getProductsByCategory(categoryId, page = 1, perPage = 20) {
  try {
    const response = await api.get("products", {
      category: categoryId,
      per_page: perPage,
      page: page
    });
    
    return {
      products: response.data,
      totalPages: parseInt(response.headers['x-wp-totalpages'], 10) || 1,
      total: parseInt(response.headers['x-wp-total'], 10) || 0
    };
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    return { products: [], totalPages: 1, total: 0 };
  }
}

/**
 * Fetch products by category slug
 */
export async function getProductsByCategorySlug(categorySlug, page = 1, perPage = 20) {
  try {
    // First, get the category ID from the slug
    const categoryResponse = await api.get("products/categories", {
      slug: categorySlug
    });
    
    if (categoryResponse.data.length === 0) {
      return { products: [], totalPages: 1, total: 0 };
    }
    
    const categoryId = categoryResponse.data[0].id;
    
    // Then fetch products with that category ID
    return getProductsByCategory(categoryId, page, perPage);
  } catch (error) {
    console.error(`Error fetching products for category slug ${categorySlug}:`, error);
    return { products: [], totalPages: 1, total: 0 };
  }
}

/**
 * Fetch featured products
 */
export async function getFeaturedProducts(limit = 10) {
  try {
    const response = await api.get("products", {
      featured: true,
      per_page: limit
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

/**
 * Fetch products on sale
 */
export async function getProductsOnSale(page = 1, perPage = 20) {
  try {
    const response = await api.get("products", {
      on_sale: true,
      per_page: perPage,
      page: page
    });
    
    return {
      products: response.data,
      totalPages: parseInt(response.headers['x-wp-totalpages'], 10) || 1,
      total: parseInt(response.headers['x-wp-total'], 10) || 0
    };
  } catch (error) {
    console.error("Error fetching products on sale:", error);
    return { products: [], totalPages: 1, total: 0 };
  }
}

/**
 * Search products
 */
export async function searchProducts(searchTerm, page = 1, perPage = 20) {
  try {
    const response = await api.get("products", {
      search: searchTerm,
      per_page: perPage,
      page: page
    });
    
    return {
      products: response.data,
      totalPages: parseInt(response.headers['x-wp-totalpages'], 10) || 1,
      total: parseInt(response.headers['x-wp-total'], 10) || 0
    };
  } catch (error) {
    console.error(`Error searching products for "${searchTerm}":`, error);
    return { products: [], totalPages: 1, total: 0 };
  }
}