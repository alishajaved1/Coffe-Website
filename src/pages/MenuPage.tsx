import React, { useState, useMemo } from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { COFFEE_PRODUCTS, CoffeeProduct } from '../data/coffeeData';
import { CoffeeCard } from '../components/CoffeeCard';
import { CoffeeBeanIcon } from '../components/Illustrations';
import { Search, Filter, SlidersHorizontal, Sparkles, Coffee } from 'lucide-react';

export const MenuPage: React.FC = () => {
  const { setIsBrewBotOpen, setBrewBotInitialPrompt } = useCoffee();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    'All',
    'Espresso & Classics',
    'Specialty Lattes',
    'Cold Brews',
    'Whole Beans & Roasts',
    'Artisan Gear'
  ];

  const filteredProducts = useMemo(() => {
    return COFFEE_PRODUCTS.filter((product) => {
      const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchQuery =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tastingNotes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchQuery;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8EDE6] text-[#2C1810] text-xs font-semibold">
          <CoffeeBeanIcon size={14} className="text-[#7B8F77]" />
          <span>Handcrafted Daily in Our Roastery</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#2C1810]">
          The Brew & Bloom Menu
        </h1>
        <p className="text-sm sm:text-base text-[#5A463C] leading-relaxed">
          From precise double espresso extractions to slow-steeped cold reserves and fragrant botanical lattes.
        </p>

        {/* BrewBot Suggestion Banner */}
        <div className="pt-2">
          <button
            onClick={() => {
              setBrewBotInitialPrompt('What coffee should I order today based on your seasonal roasts?');
              setIsBrewBotOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EFEB] hover:bg-[#EADBCE] text-[#4A2C1B] text-xs font-semibold border border-[#EADBCE] transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C68B59]" />
            <span>Not sure what to choose? Let BrewBot recommend a cup tailored to you →</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-[#EADBCE] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#7B6E66] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search drinks, notes, beans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-xs sm:text-sm text-[#2C1810] placeholder-[#998A80] focus:outline-none focus:border-[#C68B59]"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-[#7B6E66]" />
            <label className="text-xs font-semibold text-[#4A2C1B]">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-xs font-medium text-[#2C1810] focus:outline-none focus:border-[#C68B59] cursor-pointer"
            >
              <option value="featured">Featured & Bestsellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#F5EFEB]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#2C1810] text-[#FDFBF7] shadow-xs'
                  : 'bg-[#FAF7F2] text-[#4A2C1B] hover:bg-[#F0E8DF] border border-[#EADBCE]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <CoffeeCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#FDFBF7] rounded-3xl border border-[#EADBCE] space-y-3">
          <Coffee className="w-10 h-10 text-[#C68B59] mx-auto opacity-70" />
          <h3 className="font-serif text-xl font-bold text-[#2C1810]">No coffee found</h3>
          <p className="text-xs text-[#7B6E66] max-w-sm mx-auto">
            We couldn't find matches for "{searchQuery}". Try searching for 'cold brew', 'latte', or reset filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 bg-[#2C1810] text-white rounded-xl text-xs font-semibold hover:bg-[#C68B59] transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
