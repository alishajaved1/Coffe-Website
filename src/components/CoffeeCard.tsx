import React from 'react';
import { CoffeeProduct } from '../data/coffeeData';
import { useCoffee } from '../context/CoffeeContext';
import { Heart, Plus, Star, Eye } from 'lucide-react';

interface CoffeeCardProps {
  product: CoffeeProduct;
  featured?: boolean;
}

export const CoffeeCard: React.FC<CoffeeCardProps> = ({ product, featured = false }) => {
  const { addToCart, toggleFavorite, isFavorite, openProductDetails } = useCoffee();
  const favorited = isFavorite(product.id);

  return (
    <div
      className={`group bg-[#FDFBF7] rounded-2xl overflow-hidden border border-[#EADBCE] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col relative ${
        featured ? 'ring-2 ring-[#C68B59]/40' : ''
      }`}
    >
      {/* Top badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {product.isBestseller && (
          <span className="px-2.5 py-1 bg-[#2C1810] text-[#FDFBF7] text-[10px] font-semibold tracking-wider uppercase rounded-full shadow-xs">
            Bestseller
          </span>
        )}
        {product.roastLevel && (
          <span className="px-2 py-0.5 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#7B8F77] text-[10px] font-bold rounded-full border border-[#EADBCE]">
            {product.roastLevel} Roast
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(product.id);
        }}
        className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-[#FAF7F2]/90 backdrop-blur-xs hover:bg-white text-[#4A2C1B] shadow-xs transition transform hover:scale-110 cursor-pointer"
        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            favorited ? 'fill-[#C68B59] text-[#C68B59]' : 'text-[#7B6E66]'
          }`}
        />
      </button>

      {/* Image Container with Hover Zoom */}
      <div
        onClick={() => openProductDetails(product.id)}
        className="relative h-56 sm:h-64 overflow-hidden bg-[#F5EFEB] cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#2C1810]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#2C1810] text-xs font-semibold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#7B8F77] mb-1.5">
            <span className="font-semibold tracking-wide uppercase text-[10px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#C68B59] font-medium">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-[#AFA196] text-[11px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => openProductDetails(product.id)}
            className="font-serif text-lg font-bold text-[#2C1810] group-hover:text-[#C68B59] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#7B6E66] line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>

          {/* Tasting Notes */}
          {product.tastingNotes && product.tastingNotes.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {product.tastingNotes.slice(0, 3).map((note, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-[#F5EFEB] text-[#4A2C1B] rounded-md text-[10px] font-medium"
                >
                  {note}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price and Add to Cart */}
        <div className="pt-3 border-t border-[#EADBCE]/70 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#7B6E66] block">Starting at</span>
            <span className="font-serif text-lg font-bold text-[#2C1810]">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2C1810] hover:bg-[#C68B59] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
