const BASE_URL = "https://dummyjson.com";

// API config
const DEFAULT_PARAMS = {
  limit: 30,
  skip: 0,
};

// Helper function for API calls
const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw new Error(`API Error: ${error.message}`);
  }
};

// Fetch all products with pagination
export const fetchAllProducts = async (params = {}) => {
  const queryParams = { ...DEFAULT_PARAMS, ...params };
  const searchParams = new URLSearchParams(queryParams);

  const data = await apiCall(`${BASE_URL}/products?${searchParams}`);
  return {
    products: data.products || [],
    total: data.total || 0,
    skip: data.skip || 0,
    limit: data.limit || 30,
  };
};

// Fetch single product by ID
export const fetchProductById = async (id) => {
  if (!id) throw new Error("Product ID is required");
  return await apiCall(`${BASE_URL}/products/${id}`);
};

// Search products
export const searchProducts = async (query, params = {}) => {
  if (!query) throw new Error("Search query is required");

  const queryParams = { ...DEFAULT_PARAMS, ...params, q: query };
  const searchParams = new URLSearchParams(queryParams);

  const data = await apiCall(`${BASE_URL}/products/search?${searchParams}`);
  return {
    products: data.products || [],
    total: data.total || 0,
    skip: data.skip || 0,
    limit: data.limit || 30,
  };
};

// Fetch all categories
export const fetchCategories = async () => {
  const categories = await apiCall(`${BASE_URL}/products/categories`);

  // Add "All" option at the beginning
  const allCategories = [
    { id: "all", name: "All Categories" },
    ...categories.map((category) => ({
      id: category.slug,
      name: category.name,
    })),
  ];

  return allCategories;
};

// Fetch products by category
export const fetchProductsByCategory = async (category, params = {}) => {
  if (!category) throw new Error("Category is required");

  const queryParams = { ...DEFAULT_PARAMS, ...params };
  const searchParams = new URLSearchParams(queryParams);

  const data = await apiCall(
    `${BASE_URL}/products/category/${category}?${searchParams}`
  );
  return {
    products: data.products || [],
    total: data.total || 0,
    skip: data.skip || 0,
    limit: data.limit || 30,
  };
};

// Fetch products with filters (client-side filtering for demo)
export const fetchFilteredProducts = async (filters = {}) => {
  const {
    category,
    search,
    minPrice,
    maxPrice,
    sortBy,
    limit = 30,
    skip = 0,
  } = filters;

  let data;

  // If search query exists, use search API
  if (search) {
    data = await searchProducts(search, { limit, skip });
  }
  // If category exists, use category API
  else if (category && category !== "all") {
    data = await fetchProductsByCategory(category, { limit, skip });
  }
  // Otherwise, fetch all products
  else {
    data = await fetchAllProducts({ limit, skip });
  }

  let { products } = data;

  // Apply client-side filters
  if (minPrice !== undefined || maxPrice !== undefined) {
    products = products.filter((product) => {
      const price = product.price;
      if (minPrice !== undefined && price < minPrice) return false;
      if (maxPrice !== undefined && price > maxPrice) return false;
      return true;
    });
  }

  // Apply sorting
  if (sortBy) {
    products = [...products].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return (a.title || "").localeCompare(b.title || "");
        case "name-desc":
          return (b.title || "").localeCompare(a.title || "");
        case "price-asc":
          return (a.price || 0) - (b.price || 0);
        case "price-desc":
          return (b.price || 0) - (a.price || 0);
        case "rating-desc":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          return (b.id || 0) - (a.id || 0);
        default:
          return 0;
      }
    });
  }

  return {
    ...data,
    products,
  };
};
