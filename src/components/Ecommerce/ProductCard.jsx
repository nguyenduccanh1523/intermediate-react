import React from "react";
import { useTranslation } from "react-i18next";
import { IoMdCart, IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { formatPrice } from "../../utils/Ecommerce/helpers";

const ProductCard = ({
  product,
  onAddToCart,
  onViewDetail,
  onToggleWishlist,
  isInWishlist,
}) => {
  const { t } = useTranslation();
 

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#E5E7EB" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 fill-gray-300"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="bg-gradient-to-b from-orange-300 to-orange-600 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={
            product.thumbnail ||
            product.images?.[0] ||
            "https://via.placeholder.com/300x300?text=No+Image"
          }
          alt={product.title || "Product"}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}

        {/* Stock Status */}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">
              {t("outOfStock")}
            </span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
          <button
            onClick={() => onViewDetail(product)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-blue-50 transition-colors duration-200"
            title="Xem chi tiết"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
          <button
            onClick={() => onToggleWishlist(product)}
            className={`bg-white p-2 ml-2 rounded-full shadow-md transition-colors duration-200 ${
              isInWishlist ? "hover:bg-red-50" : "hover:bg-pink-50"
            }`}
            title={isInWishlist ? t("removeFromWishlist") : t("addToWishlist")}
          >
            {isInWishlist ? (
              <IoMdHeart className="w-5 h-5 text-red-500" />
            ) : (
              <IoMdHeartEmpty className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Brand */}
        
        <div className="text-sm text-gray-100 mb-1">{product.brand}</div>

        {/* Title */}
        <h3 className="font-semibold text-white mb-2 line-clamp-2 hover:text-gray-900 cursor-pointer transition-colors duration-200">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-200">
            {product.rating} ({product.reviews?.length || 0} {t("reviews")})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-red-600">
            {formatPrice(product.price)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(
                product.price / (1 - product.discountPercentage / 100)
              )}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock <= 0}
          className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 ${
            product.stock > 0
              ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {product.stock > 0 ? (
            <div className="flex items-center justify-center gap-2">
              <IoMdCart className="w-5 h-5" />
              {t("addToCart")}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <IoMdCart className="w-5 h-5" />
              {t("outOfStock")}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
