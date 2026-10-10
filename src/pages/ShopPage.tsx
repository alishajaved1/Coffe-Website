import React, { useState, useMemo } from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { COFFEE_PRODUCTS } from '../data/coffeeData';
import { CoffeeCard } from '../components/CoffeeCard';
import { CoffeeBeanIcon } from '../components/Illustrations';
import {
  Package,
  Truck,
  Sparkles,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Flame
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { setIsBrewBotOpen, setBrewBotInitialPrompt } = useCoffee();
  const [activeTab, setActiveTab] = useState<'all' | 'beans' | 'gear'>('all');
  const [search, setSearch] = useState('');
  const [roastFilter, setRoastFilter] = useState<string>('all');

  const products = useMemo(() => {
    return COFFEE_PRODUCTS.filter((p) => {
      if (activeTab === 'beans' && p.category !== 'Whole Beans & Roasts') return false;
      if (activeTab === 'gear' && p.category !== 'Artisan Gear') return false;
      if (roastFilter !== 'all' && p.roastLevel !== roastFilter) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [activeTab, roastFilter, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Banner */}
      <div className="bg-linear-to-r from-[#2C1810] to-[#4A2C1B] rounded-3xl p-8 sm:p-12 text-[#FDFBF7] relative overflow-hidden shadow-xl border border-[#C68B59]/30">
        <div className="max-w-xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C68B59]/20 text-[#C68B59] text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-[#C68B59]" />
            <span>Roasted To Order in Small 12kg Batches</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold leading-tight">
            The Roastery Shop
          </h1>
          <p className="text-xs sm:text-sm text-[#D5C2B4] leading-relaxed">
            Elevate your home brewing. We roast every Tuesday and Friday, stamping each bag with the harvest altitude, varietal, and roast date.
          </p>
          <div className="flex items-center gap-6 pt-2 text-xs text-[#EADBCE]">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#C68B59]" /> Free Shipping over $35
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#7B8F77]" /> 100% Freshness Guarantee
            </span>
          </div>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#FDFBF7] p-4 rounded-2xl border border-[#EADBCE]">
        {/* Tabs */}
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex-1 sm:flex-none ${
              activeTab === 'all'
                ? 'bg-[#2C1810] text-white shadow-xs'
                : 'bg-[#FAF7F2] text-[#4A2C1B] hover:bg-[#F0E8DF]'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setActiveTab('beans')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex-1 sm:flex-none ${
              activeTab === 'beans'
                ? 'bg-[#2C1810] text-white shadow-xs'
                : 'bg-[#FAF7F2] text-[#4A2C1B] hover:bg-[#F0E8DF]'
            }`}
          >
            Whole Bean Bags
          </button>
          <button
            onClick={() => setActiveTab('gear')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex-1 sm:flex-none ${
              activeTab === 'gear'
                ? 'bg-[#2C1810] text-white shadow-xs'
                : 'bg-[#FAF7F2] text-[#4A2C1B] hover:bg-[#F0E8DF]'
            }`}
          >
            Artisan Gear
          </button>
        </div>

        {/* Search */}
        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-[#7B6E66] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search whole beans or gear..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-xs text-[#2C1810] placeholder-[#998A80] focus:outline-none focus:border-[#C68B59]"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <CoffeeCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
};
