import { useEffect, useState, useCallback, useMemo } from "react";
import {
  fetchAllProducts,
  fetchCategories,
  fetchFilteredProducts,
} from "../../api/Ecommerce/productApi";

export const useProducts = (initialFilters = {}) => {
  // State management
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    sortBy: "name-asc",
    priceRange: "price-all",
    minPrice: undefined,
    maxPrice: undefined,
    ...initialFilters,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    skip: 0,
    limit: 30,
    hasMore: false,
  });

  // Price range mapping (moved outside to avoid dependency issues)
  const priceRanges = useMemo(
    () => ({
      "price-all": { min: undefined, max: undefined },
      "under-10": { min: 0, max: 10 },
      "10-50": { min: 10, max: 50 },
      "50-100": { min: 50, max: 100 },
      "100-500": { min: 100, max: 500 },
      "above-500": { min: 500, max: undefined },
    }),
    []
  );

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError("");

        // Load categories and initial products concurrently
        const [categoriesData, productsData] = await Promise.all([
          fetchCategories(),
          fetchAllProducts({ limit: 30 }),
        ]);

        // Categories already include "All" option from API
        setCategories(categoriesData);

        setProducts(productsData.products);
        setPagination({
          total: productsData.total,
          skip: productsData.skip,
          limit: productsData.limit,
          hasMore: productsData.products.length < productsData.total,
        });
      } catch (err) {
        console.error("Error loading initial data:", err);
        setError(err.message);
        setProducts([]);
        setCategories([{ id: "all", name: "Tất cả danh mục" }]);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []); // Only run once on mount

  // Apply filters and fetch data
  const applyFilters = useCallback(
    async (newFilters = {}, append = false) => {
      try {
        setLoading(true);
        setError("");

        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);

        // Get price range
        const priceRange =
          priceRanges[updatedFilters.priceRange] || priceRanges["price-all"];

        const filterParams = {
          category: updatedFilters.category,
          search: updatedFilters.search,
          minPrice: priceRange.min,
          maxPrice: priceRange.max,
          sortBy: updatedFilters.sortBy,
          limit: updatedFilters.limit || 30,
          skip: append ? pagination.skip + pagination.limit : 0,
        };

        const data = await fetchFilteredProducts(filterParams);

        if (append) {
          setProducts((prev) => [...prev, ...data.products]);
        } else {
          setProducts(data.products);
        }

        setPagination({
          total: data.total,
          skip: data.skip,
          limit: data.limit,
          hasMore: data.skip + data.products.length < data.total,
        });
      } catch (err) {
        console.error("Error applying filters:", err);
        setError(err.message);
        if (!append) {
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [filters, pagination.skip, pagination.limit, priceRanges]
  );

  // Load more products (pagination)
  const loadMore = useCallback(() => {
    if (!loading && pagination.hasMore) {
      applyFilters({}, true);
    }
  }, [loading, pagination.hasMore, applyFilters]);

  // Search products with debounce effect
  const handleSearch = useCallback(
    async (searchTerm) => {
      if (!searchTerm.trim()) {
        // If search is empty, reload all products
        applyFilters({ search: "", category: "all" });
        return;
      }

      applyFilters({ search: searchTerm, category: "all" });
    },
    [applyFilters]
  );

  // Update individual filter
  const updateFilter = useCallback(
    (filterKey, value) => {
      const newFilters = { [filterKey]: value };

      // Reset category when searching
      if (filterKey === "search" && value) {
        newFilters.category = "all";
      }

      // Reset search when changing category
      if (filterKey === "category" && value !== "all") {
        newFilters.search = "";
      }

      applyFilters(newFilters);
    },
    [applyFilters]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    const defaultFilters = {
      search: "",
      category: "all",
      sortBy: "name-asc",
      priceRange: "price-all",
    };
    applyFilters(defaultFilters);
  }, [applyFilters]);

  // Computed values
  const filteredProducts = useMemo(() => {
    return products.filter((product) => product && product.id);
  }, [products]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.search ||
      filters.category !== "all" ||
      filters.priceRange !== "price-all" ||
      filters.sortBy !== "name-asc"
    );
  }, [filters]);

  const stats = useMemo(() => {
    return {
      totalProducts: pagination.total,
      displayedProducts: filteredProducts.length,
      hasActiveFilters,
      isFiltered: filteredProducts.length !== pagination.total,
    };
  }, [filteredProducts.length, pagination.total, hasActiveFilters]);

  return {
    // Data
    products: filteredProducts,
    categories,

    // State
    loading,
    error,
    filters,
    pagination,
    stats,

    // Actions
    updateFilter,
    searchProducts: handleSearch,
    clearFilters,
    loadMore,

    // Utilities
    hasActiveFilters,
    hasMore: pagination.hasMore,
  };
};

export default useProducts;
