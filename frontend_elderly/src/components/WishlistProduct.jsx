import React, { useState } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';

const WishlistProduct = ({ product, onAddToCart, onBuyNow }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white transition-all duration-150 ease-in-out transform hover:-translate-y-0.5 hover:shadow-md"
      style={{
        boxShadow: isHovered
          ? '0 12px 15px -5px rgba(0, 0, 0, 0.1), 0 5px 8px -3px rgba(0, 0, 0, 0.04)'
          : '0 8px 10px -3px rgba(0, 0, 0, 0.1), 0 3px 6px -2px rgba(0, 0, 0, 0.05)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with New Badge */}
      <div className="relative">
        <img className="w-full h-56 object-fill rounded-t-lg" src={product?.imgUrl} alt={product?.name} />
      </div>

      {/* Product Info */}
      <div className="px-4 py-4">
        {/* Product Name */}
        <div className="font-bold text-base mb-2 text-left">{product?.name}</div>

        {/* Product Price */}
        <p className="text-gray-700 text-sm mb-2 text-left font-bold">₹{product?.price}.00</p>

        {/* Rating Section */}
        <div className="flex items-center">
          <span className="text-gray-600 font-medium text-sm">{product?.ratingAverage}</span>
          <Star className="text-purple-400 ml-1 mr-2" fill="currentColor" size={16} />
          <span className="text-gray-500 text-xs">({product?.ratingCount} reviews)</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4 space-y-2">
        <button
          onClick={() => onAddToCart(product)}
          className="bg-white border border-purple-500 text-purple-500 hover:bg-purple-50 font-bold py-2 px-4 rounded-full w-full transition-all duration-150 ease-in-out flex items-center justify-center space-x-2"
          style={{
            transform: isHovered ? 'scale(1.01)' : 'scale(1)',
          }}
        >
          <ShoppingCart size={16} />
          <span>Add to Cart</span>
        </button>
        <button
          onClick={() => onBuyNow(product)}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full w-full transition-all duration-150 ease-in-out flex items-center justify-center space-x-2"
          style={{
            transform: isHovered ? 'scale(1.01)' : 'scale(1)',
          }}
        >
          <ShoppingCart size={16} />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
};

export default WishlistProduct;