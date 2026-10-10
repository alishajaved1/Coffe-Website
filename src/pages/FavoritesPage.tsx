import React from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { COFFEE_PRODUCTS } from '../data/coffeeData';
import { CoffeeCard } from '../components/CoffeeCard';
import { Heart, Trash2, ArrowRight, Coffee } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { favorites, clearFavorites, setCurrentPage } = useCoffee();

  const favoriteProducts = COFFEE_PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EADBCE] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#7B8F77]">
            <Heart className="w-4 h-4 fill-[#C68B59] text-[#C68B59]" />
            <span>Saved Coffee Collection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2C1810] mt-1">
            Your Coffee Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-[#7B6E66] mt-1">
            {favoriteProducts.length} handcrafted favorites saved in this session
          </p>
        </div>

        {favoriteProducts.length > 0 && (
          <button
            onClick={clearFavorites}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 hover:bg-rose-50 transition border border-rose-200 cursor-pointer w-fit"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {/* Grid or Empty */}
      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteProducts.map((coffee) => (
            <CoffeeCard key={coffee.id} product={coffee} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#FDFBF7] rounded-3xl border border-[#EADBCE] space-y-5 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F5EFEB] text-[#C68B59] flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#2C1810]">
              No Favorites Saved Yet
            </h3>
            <p className="text-xs text-[#7B6E66] mt-1">
              Tap the heart icon on any coffee roast, specialty latte, or brew gear to save it here.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('menu')}
            className="px-6 py-3 rounded-full bg-[#2C1810] hover:bg-[#C68B59] text-white font-serif font-bold text-xs shadow-md transition cursor-pointer inline-flex items-center gap-2"
          >
            <span>Explore Coffee Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};
