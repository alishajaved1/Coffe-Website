import React, { useState } from 'react';
import { useCoffee, PageRoute } from '../context/CoffeeContext';
import { CoffeeBeanIcon } from './Illustrations';
import {
  ShoppingBag,
  Heart,
  User,
  Menu as MenuIcon,
  X,
  Sparkles,
  Download,
  Coffee,
  Search
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    cartCount,
    favorites,
    currentUser,
    setIsBrewBotOpen
  } = useCoffee();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; route: PageRoute; highlight?: boolean }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Our Story', route: 'story' },
    { label: 'Coffee Menu', route: 'menu' },
    { label: 'Shop Roasts & Gear', route: 'shop' },
    { label: 'Favorites', route: 'favorites' },
    { label: 'Contact', route: 'contact' }
  ];

  const handleNavClick = (route: PageRoute) => {
    setCurrentPage(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadZip = () => {
    window.location.href = '/api/download-zip';
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#2C1810] text-[#EADBCE] text-xs py-2 px-4 border-b border-[#4A2C1B]/50 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C68B59] animate-pulse"></span>
            <span>Complimentary artisan shipping on fresh bean orders over $35 | Code: <strong className="text-white font-mono">BLOOM10</strong></span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#C68B59]">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Bloom Loyalty: Earn 10pts per $1</span>
            </button>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <button
              onClick={handleDownloadZip}
              className="hidden sm:flex items-center gap-1.5 text-amber-300 hover:text-white font-medium bg-[#4A2C1B] px-2.5 py-0.5 rounded-full transition cursor-pointer"
              title="Download standalone Windows Python & Streamlit project ZIP"
            >
              <Download className="w-3 h-3" />
              <span>Download Project ZIP</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EADBCE]/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-full bg-[#2C1810] text-[#C68B59] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                <Coffee className="w-6 h-6 stroke-[1.8]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-2xl font-bold tracking-tight text-[#2C1810]">
                    Brew & Bloom
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#7B8F77] font-semibold px-1.5 py-0.5 bg-[#E8EDE6] rounded">
                    Roastery
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#7B8F77] font-medium">
                  Specialty Coffee Co.
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((item) => {
                const isActive = currentPage === item.route;
                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavClick(item.route)}
                    className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#2C1810] text-[#FDFBF7] shadow-xs'
                        : 'text-[#4A2C1B] hover:text-[#2C1810] hover:bg-[#F0E8DF]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* BrewBot AI Companion Button */}
              <button
                onClick={() => setIsBrewBotOpen(true)}
                className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-linear-to-r from-[#2C1810] to-[#4A2C1B] text-[#FDFBF7] hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer border border-[#C68B59]/40"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C68B59] animate-pulse" />
                <span>BrewBot AI</span>
              </button>

              {/* Favorites button */}
              <button
                onClick={() => handleNavClick('favorites')}
                className={`relative p-2.5 rounded-full text-[#4A2C1B] hover:bg-[#F0E8DF] transition-colors cursor-pointer ${
                  currentPage === 'favorites' ? 'bg-[#F0E8DF] text-[#2C1810]' : ''
                }`}
                title="Favorites"
                aria-label="Favorites"
              >
                <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-[#C68B59] text-[#C68B59]' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C68B59] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Cart button */}
              <button
                onClick={() => handleNavClick('cart')}
                className={`relative p-2.5 rounded-full text-[#4A2C1B] hover:bg-[#F0E8DF] transition-colors cursor-pointer ${
                  currentPage === 'cart' ? 'bg-[#2C1810] text-white' : ''
                }`}
                title="Shopping Bag"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#2C1810] text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#FAF7F2] shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Account / Sign In */}
              {currentUser ? (
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full transition-colors cursor-pointer border ${
                    currentPage === 'dashboard'
                      ? 'bg-[#2C1810] text-white border-[#2C1810]'
                      : 'bg-[#F0E8DF] text-[#2C1810] border-[#EADBCE] hover:bg-[#EADBCE]'
                  }`}
                  title="Dashboard"
                >
                  <div className="w-6 h-6 rounded-full bg-[#C68B59] text-white text-xs font-bold flex items-center justify-center">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="text-xs font-medium max-w-[80px] truncate hidden sm:inline">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => handleNavClick('signin')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#2C1810] text-[#FDFBF7] hover:bg-[#4A2C1B] transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Mobile menu hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#2C1810] hover:bg-[#F0E8DF] rounded-lg transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#EADBCE] px-4 pt-2 pb-6 space-y-2 shadow-lg animate-fadeIn">
            {navLinks.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition ${
                  currentPage === item.route
                    ? 'bg-[#2C1810] text-white'
                    : 'text-[#4A2C1B] hover:bg-[#F0E8DF]'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-2 border-t border-[#EADBCE] flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsBrewBotOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-[#2C1810] to-[#4A2C1B] text-white text-sm font-semibold cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C68B59]" />
                <span>Launch BrewBot AI Assistant</span>
              </button>

              <button
                onClick={handleDownloadZip}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#E8EDE6] text-[#2C1810] text-sm font-medium hover:bg-[#D5E0D2] transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#7B8F77]" />
                <span>Download Python & Streamlit Project (ZIP)</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
