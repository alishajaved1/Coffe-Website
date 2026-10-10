import React, { useState } from 'react';
import { useCoffee, CartItem } from '../context/CoffeeContext';
import { COFFEE_PRODUCTS } from '../data/coffeeData';
import { CoffeeSteam, CoffeeBeanIcon } from '../components/Illustrations';
import {
  Heart,
  ShoppingBag,
  Star,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Flame,
  Globe2,
  Clock,
  Compass,
  Share2
} from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const {
    selectedProductId,
    setCurrentPage,
    addToCart,
    toggleFavorite,
    isFavorite,
    setIsBrewBotOpen,
    setBrewBotInitialPrompt,
    addToast
  } = useCoffee();

  const product = COFFEE_PRODUCTS.find((p) => p.id === selectedProductId) || COFFEE_PRODUCTS[0];

  const isBeanOrGear = product.category === 'Whole Beans & Roasts' || product.category === 'Artisan Gear';

  const [quantity, setQuantity] = useState(1);
  const [selectedGrind, setSelectedGrind] = useState<CartItem['grind']>(
    isBeanOrGear ? 'Whole Bean' : 'Standard Cup'
  );
  const [selectedSize, setSelectedSize] = useState<CartItem['size']>(
    isBeanOrGear ? 'Bag (340g)' : 'Regular (12oz)'
  );

  const favorited = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedGrind, selectedSize);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Link Copied', 'Product link copied to clipboard.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back button */}
      <button
        onClick={() => setCurrentPage('menu')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#4A2C1B] hover:text-[#2C1810] transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Coffee Menu</span>
      </button>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image with gallery zoom */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl overflow-hidden bg-[#F5EFEB] border border-[#EADBCE] shadow-lg relative group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[450px] sm:h-[520px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {product.isBestseller && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#2C1810] text-[#FDFBF7] text-xs font-semibold rounded-full shadow-md">
                Master Roaster Bestseller
              </span>
            )}

            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-xs text-[#2C1810] shadow-md hover:bg-white transition cursor-pointer"
              aria-label="Toggle favorite"
            >
              <Heart
                className={`w-5 h-5 ${favorited ? 'fill-[#C68B59] text-[#C68B59]' : 'text-neutral-500'}`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-[#7B6E66] px-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7B8F77]" /> 100% Satisfaction Guarantee
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 hover:text-[#2C1810] transition cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </div>

        {/* Right Column: Product Config & Details */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7B8F77]">
              <span>{product.category}</span>
              <span>•</span>
              <div className="flex items-center gap-1 text-[#C68B59]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-[#AFA196]">({product.reviewsCount} verified reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2C1810] mt-2">
              {product.name}
            </h1>
            <p className="text-sm text-[#7B8F77] font-medium mt-1">
              {product.subtitle}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl font-extrabold text-[#2C1810]">
              ${(product.price * (selectedSize === 'Large (16oz)' ? 1.2 : 1)).toFixed(2)}
            </span>
            <span className="text-xs text-[#7B6E66]">Tax included at checkout</span>
          </div>

          {/* Description */}
          <p className="text-sm text-[#5A463C] leading-relaxed">
            {product.detailedDescription || product.description}
          </p>

          {/* Tasting Notes Pills */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A2C1B] mb-2">
              Aromatic Tasting Notes
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.tastingNotes.map((note, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-[#F5EFEB] text-[#2C1810] font-semibold text-xs border border-[#EADBCE]"
                >
                  🍃 {note}
                </span>
              ))}
            </div>
          </div>

          {/* Grind Customization */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A2C1B] mb-2">
              Grind & Preparation
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(isBeanOrGear
                ? (['Whole Bean', 'Pour Over Grind', 'French Press Grind', 'Espresso Grind'] as const)
                : (['Standard Cup', 'Extra Hot', 'Iced with Cold Foam'] as const)
              ).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedGrind(option as any)}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-center transition cursor-pointer ${
                    selectedGrind === option
                      ? 'border-[#2C1810] bg-[#2C1810] text-white'
                      : 'border-[#EADBCE] bg-[#FAF7F2] text-[#4A2C1B] hover:bg-[#F0E8DF]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="pt-4 border-t border-[#EADBCE] flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center justify-between border border-[#EADBCE] rounded-2xl bg-[#FAF7F2] p-1.5 w-full sm:w-36">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-xl bg-white hover:bg-[#F0E8DF] text-[#2C1810] font-bold text-sm flex items-center justify-center transition cursor-pointer"
              >
                -
              </button>
              <span className="font-serif font-bold text-sm text-[#2C1810]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-xl bg-white hover:bg-[#F0E8DF] text-[#2C1810] font-bold text-sm flex items-center justify-center transition cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-[#2C1810] hover:bg-[#C68B59] text-white font-serif font-bold text-sm shadow-md hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Order (${(product.price * quantity).toFixed(2)})</span>
            </button>
          </div>

          {/* Ask BrewBot about this button */}
          <div className="pt-2">
            <button
              onClick={() => {
                setBrewBotInitialPrompt(`Tell me more about ${product.name} and the best way to brew it.`);
                setIsBrewBotOpen(true);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#E8EDE6] hover:bg-[#D5E0D2] text-[#2C1810] text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7B8F77]" />
              <span>Ask BrewBot: "What brew method works best with {product.name}?"</span>
            </button>
          </div>

          {/* Technical Terroir Metadata Card */}
          <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#EADBCE] space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#2C1810]">
              Terroir & Extraction Details
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#998A80] block">Origin:</span>
                <span className="font-medium text-[#2C1810]">{product.origin || 'Direct Micro-Lot'}</span>
              </div>
              <div>
                <span className="text-[#998A80] block">Elevation:</span>
                <span className="font-medium text-[#2C1810]">{product.altitude || '1,750m'}</span>
              </div>
              <div>
                <span className="text-[#998A80] block">Roast Profile:</span>
                <span className="font-medium text-[#2C1810]">{product.roastLevel || 'Medium'}</span>
              </div>
              <div>
                <span className="text-[#998A80] block">Recommended Brew:</span>
                <span className="font-medium text-[#2C1810]">{product.recommendedBrew}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
