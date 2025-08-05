// Debounce utility for search functionality
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Format price utility
export const formatPrice = (price, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(price);
};

// Calculate discount percentage
export const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
  if (!originalPrice || originalPrice <= discountedPrice) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

// Generate pagination info
export const generatePaginationInfo = (total, skip, limit) => {
  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);
  const hasMore = skip + limit < total;

  return {
    currentPage,
    totalPages,
    hasMore,
    showing: Math.min(skip + limit, total),
    total,
  };
};

// Validate product data
export const validateProduct = (product) => {
  return (
    product &&
    product.id &&
    product.title &&
    product.price !== undefined &&
    product.price >= 0
  );
};

// Sort products utility
export const sortProducts = (products, sortBy) => {
  return [...products].sort((a, b) => {
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
};

// Filter products by price range
export const filterByPriceRange = (products, minPrice, maxPrice) => {
  if (minPrice === undefined && maxPrice === undefined) return products;

  return products.filter((product) => {
    const price = product.price;
    if (minPrice !== undefined && price < minPrice) return false;
    if (maxPrice !== undefined && price > maxPrice) return false;
    return true;
  });
};

// Search products utility
export const searchProducts = (products, searchTerm) => {
  if (!searchTerm) return products;

  const term = searchTerm.toLowerCase();
  return products.filter(
    (product) =>
      (product.title && product.title.toLowerCase().includes(term)) ||
      (product.brand && product.brand.toLowerCase().includes(term)) ||
      (product.description &&
        product.description.toLowerCase().includes(term)) ||
      (product.category && product.category.toLowerCase().includes(term))
  );
};
