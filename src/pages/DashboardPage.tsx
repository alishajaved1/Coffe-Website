import React, { useState } from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { COFFEE_PRODUCTS } from '../data/coffeeData';
import { CoffeeCard } from '../components/CoffeeCard';
import { CoffeeBeanIcon } from '../components/Illustrations';
import {
  User,
  Package,
  Heart,
  ShoppingBag,
  Sparkles,
  LogOut,
  Clock,
  CheckCircle2,
  Settings,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    signOut,
    favorites,
    cart,
    setCurrentPage,
    setIsBrewBotOpen,
    setBrewBotInitialPrompt,
    addToast
  } = useCoffee();

  const [activeTab, setActiveTab] = useState<'orders' | 'favorites' | 'settings'>('orders');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#2C1810]">
          Please Sign In
        </h2>
        <p className="text-xs text-[#7B6E66]">
          You need to be signed in to view your loyalty points and order history.
        </p>
        <button
          onClick={() => setCurrentPage('signin')}
          className="px-6 py-2.5 bg-[#2C1810] text-white rounded-xl text-xs font-semibold hover:bg-[#C68B59] transition cursor-pointer"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  const favoriteProducts = COFFEE_PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Profile Header Card */}
      <div className="bg-linear-to-r from-[#2C1810] via-[#3D2316] to-[#2C1810] rounded-3xl p-6 sm:p-8 text-[#FDFBF7] shadow-xl border border-[#C68B59]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#C68B59] text-[#2C1810] font-serif font-extrabold text-2xl sm:text-3xl flex items-center justify-center shadow-lg border-2 border-white/20">
            {currentUser.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Welcome, {currentUser.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8EDE6] text-[#2C1810] text-[10px] font-bold uppercase tracking-wider">
                {currentUser.memberTier}
              </span>
            </div>
            <p className="text-xs text-[#D5C2B4]">
              {currentUser.email} • Member since {currentUser.joinedDate}
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-[#C68B59] font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Bloom Balance: <strong>{currentUser.points} Points</strong></span>
              <span className="text-[#AFA196] text-[11px]">(Redeemable for free 12oz bags)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => {
              setBrewBotInitialPrompt(`What can I redeem my ${currentUser.points} Bloom points for?`);
              setIsBrewBotOpen(true);
            }}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C68B59]" />
            <span>Redeem Rewards</span>
          </button>
          <button
            onClick={signOut}
            className="px-4 py-2.5 rounded-xl bg-rose-900/60 hover:bg-rose-800 text-rose-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            title="Sign out of demo session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Demo storage notice banner */}
      <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EADBCE] flex items-center gap-3 text-xs text-[#7B8F77]">
        <ShieldCheck className="w-5 h-5 text-[#C68B59] shrink-0" />
        <div>
          <span className="font-bold text-[#2C1810]">Demo Dashboard Session:</span> Orders and preferences are simulated and stored in local browser state. No permanent database credentials are used.
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#EADBCE] gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'text-[#2C1810] border-b-2 border-[#2C1810]'
              : 'text-[#7B6E66] hover:text-[#2C1810]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Demo Orders ({currentUser.recentOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`pb-3 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'favorites'
              ? 'text-[#2C1810] border-b-2 border-[#2C1810]'
              : 'text-[#7B6E66] hover:text-[#2C1810]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>My Favorites ({favoriteProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'text-[#2C1810] border-b-2 border-[#2C1810]'
              : 'text-[#7B6E66] hover:text-[#2C1810]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Account Preferences</span>
        </button>
      </div>

      {/* Tab: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {currentUser.recentOrders.length > 0 ? (
            currentUser.recentOrders.map((order) => (
              <div
                key={order.id}
                className="bg-[#FDFBF7] p-5 sm:p-6 rounded-2xl border border-[#EADBCE] shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#2C1810] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#EADBCE]">
                      {order.id}
                    </span>
                    <span className="text-xs text-[#7B6E66] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {order.date}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800 animate-pulse'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="pt-1">
                    <p className="text-xs sm:text-sm font-medium text-[#2C1810]">
                      {order.items.map((it) => `${it.quantity}x ${it.name}`).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <span className="text-xs text-[#7B6E66] block">Order Total</span>
                    <span className="font-serif font-bold text-base text-[#2C1810]">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      addToast('Re-order Demo', `Items from order ${order.id} added to cart!`);
                      setCurrentPage('cart');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#2C1810] hover:bg-[#C68B59] text-white text-xs font-semibold transition cursor-pointer"
                  >
                    Reorder
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-[#FDFBF7] rounded-3xl border border-[#EADBCE] space-y-3">
              <Package className="w-10 h-10 text-[#C68B59] mx-auto opacity-70" />
              <h3 className="font-serif text-lg font-bold text-[#2C1810]">No orders placed yet</h3>
              <p className="text-xs text-[#7B6E66]">Explore our coffee menu to place your first simulated order.</p>
              <button
                onClick={() => setCurrentPage('menu')}
                className="px-5 py-2.5 bg-[#2C1810] text-white rounded-xl text-xs font-semibold hover:bg-[#C68B59] transition cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab: Favorites */}
      {activeTab === 'favorites' && (
        <div>
          {favoriteProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteProducts.map((coffee) => (
                <CoffeeCard key={coffee.id} product={coffee} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#FDFBF7] rounded-3xl border border-[#EADBCE] space-y-3">
              <Heart className="w-10 h-10 text-[#C68B59] mx-auto opacity-70" />
              <h3 className="font-serif text-lg font-bold text-[#2C1810]">No favorites yet</h3>
              <p className="text-xs text-[#7B6E66]">Click the heart icon on any coffee to save it here.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === 'settings' && (
        <div className="bg-[#FDFBF7] p-6 rounded-3xl border border-[#EADBCE] space-y-6 max-w-xl">
          <h3 className="font-serif text-lg font-bold text-[#2C1810]">
            Demo Preferences & Delivery Defaults
          </h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#4A2C1B] mb-1">Display Name</label>
              <input
                type="text"
                defaultValue={currentUser.name}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#4A2C1B] mb-1">Notification Email</label>
              <input
                type="email"
                defaultValue={currentUser.email}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#4A2C1B] mb-1">Default Coffee Grind Preference</label>
              <select className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-sm">
                <option>Whole Bean (Recommended)</option>
                <option>Espresso Grind</option>
                <option>Pour Over (V60)</option>
                <option>French Press</option>
              </select>
            </div>
            <button
              onClick={() => addToast('Preferences Saved', 'Demo account preferences updated.')}
              className="px-5 py-2.5 bg-[#2C1810] text-white rounded-xl font-semibold hover:bg-[#C68B59] transition cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
