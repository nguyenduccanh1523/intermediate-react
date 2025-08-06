import React, { useState } from "react";
import ProductCard from "../components/Ecommerce/ProductCard";
import ProductDetail from "../components/Ecommerce/ProductDetail";
import Cart from "../components/Ecommerce/Cart";
import Wishlist from "../components/Ecommerce/Wishlist";
import SearchAndFilter from "../components/Ecommerce/SearchAndFilter";
import { useTranslation } from "react-i18next";
import { IoMdCart, IoMdHeart } from "react-icons/io";
import { useProducts } from "../hooks/Ecommerce/useProducts";
import { App } from "antd";

const Ecommerce = () => {
  const { notification: notificationApi } = App.useApp();

  const {
    products,
    categories,
    loading,
    error,
    filters,
    stats,
    updateFilter,
    clearFilters,
    loadMore,
    hasMore,
  } = useProducts();

  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const newQuantity =
        existingItem.cartQuantity + (product.cartQuantity || 1);
      const maxStock = product.stock || 999; // Default stock if not provided
      if (newQuantity <= maxStock) {
        setCartItems(
          cartItems.map((item) =>
            item.id === product.id
              ? { ...item, cartQuantity: newQuantity }
              : item
          )
        );
        // Notification for quantity update
        notificationApi.success({
          message: t("addedToCart"),
          description: `${product.title} ${t("updated")} (${newQuantity})`,
          placement: "topRight",
          duration: 3,
        });
      } else {
        notificationApi.warning({
          message: t("outOfStock"),
          description: `${product.title} ${t("maxStockReached")}`,
          placement: "topRight",
          duration: 4,
        });
      }
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          cartQuantity: product.cartQuantity || 1,
        },
      ]);
      // Notification for new item
      notificationApi.success({
        message: t("addedToCart"),
        description: `${product.title} ${t("addedToCartSuccess")}`,
        placement: "topRight",
        duration: 3,
      });
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, cartQuantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    const removedItem = cartItems.find((item) => item.id === productId);
    setCartItems(cartItems.filter((item) => item.id !== productId));

    // Notification for item removal
    if (removedItem) {
      notificationApi.error({
        message: t("removedFromCart"),
        description: `${removedItem.title} ${t("removedFromCartSuccess")}`,
        placement: "topRight",
        duration: 3,
      });
    }
  };

  const handleToggleWishlist = (product) => {
    const existingItem = wishlistItems.find((item) => item.id === product.id);

    if (existingItem) {
      setWishlistItems(wishlistItems.filter((item) => item.id !== product.id));
      // Notification for removing from wishlist
      notificationApi.error({
        message: t("removedFromWishlist"),
        description: `${product.title} ${t("removedFromWishlistSuccess")}`,
        placement: "topRight",
        duration: 3,
      });
    } else {
      setWishlistItems([...wishlistItems, product]);
      // Notification for adding to wishlist
      notificationApi.success({
        message: t("addedToWishlist"),
        description: `${product.title} ${t("addedToWishlistSuccess")}`,
        placement: "topRight",
        duration: 3,
      });
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    const removedItem = wishlistItems.find((item) => item.id === productId);
    setWishlistItems(wishlistItems.filter((item) => item.id !== productId));

    // Notification for removing from wishlist
    if (removedItem) {
      notificationApi.error({
        message: t("removedFromWishlist"),
        description: `${removedItem.title} ${t("removedFromWishlistSuccess")}`,
        placement: "topRight",
        duration: 3,
      });
    }
  };

  const handleAddToCartFromWishlist = (product) => {
    handleAddToCart(product);
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const handleViewDetail = (product) => {
    setSelectedProduct(product);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.cartQuantity, 0);
  };

  const handleCheckout = () => {
    alert("Chức năng thanh toán đang được phát triển!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl m-2 font-bold text-white">
                {t("ecommerce")}
              </h1>
              <p className="text-sm text-gray-200">{t("desEcommerce")}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Wishlist Button */}
              <button
                onClick={() => setShowWishlist(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-900 rounded-full transition-colors duration-200"
                title={t("wishlist")}
              >
                <IoMdHeart className="w-6 h-6 text-gray-200" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-900 rounded-full transition-colors duration-200"
                title={t("cart")}
              >
                <IoMdCart className="w-6 h-6 text-gray-200" />
                {getTotalCartItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalCartItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {t("errorProduct")}
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">
              {t("loadingProduct")}
            </span>
          </div>
        )}

        {/* Content - Only show when not loading */}
        {!loading && !error && (
          <>
            {/* Search and Filter */}
            <SearchAndFilter
              searchTerm={filters.search}
              onSearchChange={(term) => updateFilter("search", term)}
              selectedCategory={filters.category}
              onCategoryChange={(category) =>
                updateFilter("category", category)
              }
              sortBy={filters.sortBy}
              onSortChange={(sort) => updateFilter("sortBy", sort)}
              priceRange={filters.priceRange}
              onPriceRangeChange={(range) => updateFilter("priceRange", range)}
              categories={categories}
              onClearFilters={handleClearFilters}
            />

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {stats.displayedProducts} {t("products")}
                </h2>
                {stats.hasActiveFilters && (
                  <p className="text-sm text-gray-500 mt-1">
                    {filters.search && `${t("results")} "${filters.search}"`}
                    {filters.category !== "all" &&
                      ` ${t("inCategory")} ${filters.category}`}
                  </p>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onViewDetail={handleViewDetail}
                      onToggleWishlist={handleToggleWishlist}
                      isInWishlist={isInWishlist(product.id)}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          {t("loading")}
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                          {t("viewMoreProducts")}
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-white">
                  {t("noProducts")}
                </h3>
                <p className="text-gray-500 mb-4">
                  {t("noProductsDescription")}
                </p>
                <button
                  onClick={handleClearFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  {t("clearFilters")}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={isInWishlist(selectedProduct.id)}
        />
      )}

      {/* Cart Modal */}
      {showCart && (
        <Cart
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onClose={() => setShowCart(false)}
          onCheckout={handleCheckout}
        />
      )}

      {/* Wishlist Modal */}
      {showWishlist && (
        <Wishlist
          wishlistItems={wishlistItems}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onAddToCart={handleAddToCartFromWishlist}
          onClose={() => setShowWishlist(false)}
          onViewDetail={handleViewDetail}
        />
      )}
    </div>
  );
};

export default Ecommerce;
