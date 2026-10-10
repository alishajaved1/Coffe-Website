import React, { useState } from 'react';
import { useCoffee } from '../context/CoffeeContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Tag,
  ShieldCheck,
  Check
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    tax,
    shipping,
    total,
    promoCode,
    setPromoCode,
    applyPromo,
    setIsCheckoutOpen,
    setCurrentPage
  } = useCoffee();

  const [inputCode, setInputCode] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);

  const freeShippingThreshold = 35;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromo(inputCode)) {
      setPromoSuccess(true);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#F5EFEB] text-[#C68B59] flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#2C1810]">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-sm text-[#7B6E66] max-w-sm mx-auto">
          You haven't added any fresh roasts or artisanal brews yet. Discover our seasonal harvests and treat yourself.
        </p>
        <button
          onClick={() => setCurrentPage('menu')}
          className="px-8 py-3.5 rounded-full bg-[#2C1810] hover:bg-[#C68B59] text-white font-serif font-bold text-sm shadow-md transition cursor-pointer inline-flex items-center gap-2"
        >
          <span>Explore Coffee Menu</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title */}
      <div className="border-b border-[#EADBCE] pb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2C1810]">
            Shopping Bag
          </h1>
          <p className="text-xs sm:text-sm text-[#7B6E66] mt-1">
            Review your artisan selection before roasting & dispatch
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-700 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Cart items */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Free Shipping Meter */}
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EADBCE] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#4A2C1B]">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#C68B59]" />
                {remainingForFreeShipping === 0
                  ? '🎉 You unlocked Complimentary Roastery Shipping!'
                  : `Add $${remainingForFreeShipping.toFixed(2)} more for Free Shipping`}
              </span>
              <span>{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#EADBCE] overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#C68B59] to-[#7B8F77] rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.grind}-${item.size}-${idx}`}
                className="bg-[#FDFBF7] p-4 sm:p-5 rounded-2xl border border-[#EADBCE] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#EADBCE] shrink-0"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#2C1810]">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-[#7B8F77] font-medium mt-0.5">
                      {item.size} • {item.grind}
                    </p>
                    <span className="font-serif font-bold text-sm text-[#2C1810] block mt-1">
                      ${item.product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#EADBCE] rounded-xl bg-[#FAF7F2] p-1">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white hover:bg-[#F0E8DF] text-[#2C1810] font-bold text-xs flex items-center justify-center transition cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-semibold text-xs text-[#2C1810] px-3">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white hover:bg-[#F0E8DF] text-[#2C1810] font-bold text-xs flex items-center justify-center transition cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right min-w-[70px]">
                    <span className="font-serif font-bold text-base text-[#2C1810] block">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-[#998A80] hover:text-rose-600 p-1.5 transition cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => setCurrentPage('menu')}
              className="text-xs text-[#7B6E66] hover:text-[#2C1810] font-semibold flex items-center gap-1 cursor-pointer"
            >
              ← Add More Items from Menu
            </button>
          </div>

        </div>

        {/* Right Column: Order Summary & Checkout */}
        <div className="lg:col-span-4 bg-[#FDFBF7] p-6 rounded-3xl border border-[#EADBCE] shadow-xs space-y-6">
          <h3 className="font-serif text-xl font-bold text-[#2C1810] border-b border-[#EADBCE] pb-3">
            Order Summary
          </h3>

          {/* Promo code form */}
          <form onSubmit={handleApplyPromo} className="space-y-2">
            <label className="block text-xs font-semibold text-[#4A2C1B]">
              Promotional or Gift Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Try: BLOOM10"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#FAF7F2] border border-[#EADBCE] rounded-xl text-xs uppercase font-mono text-[#2C1810] placeholder-[#998A80] focus:outline-none focus:border-[#C68B59]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2C1810] hover:bg-[#C68B59] text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Apply
              </button>
            </div>
            {promoSuccess && (
              <p className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1">
                <Check className="w-3 h-3" /> Code applied successfully!
              </p>
            )}
          </form>

          {/* Calculations */}
          <div className="space-y-3 text-xs pt-2 border-t border-[#F5EFEB]">
            <div className="flex justify-between text-[#7B6E66]">
              <span>Items Subtotal:</span>
              <span className="font-semibold text-[#2C1810]">${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount:</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#7B6E66]">
              <span>Estimated Sales Tax (8.25%):</span>
              <span className="font-semibold text-[#2C1810]">${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-[#7B6E66]">
              <span>Shipping:</span>
              <span>{shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div className="pt-3 border-t border-[#EADBCE] flex justify-between items-baseline">
              <span className="font-serif text-base font-bold text-[#2C1810]">Estimated Total:</span>
              <span className="font-serif text-2xl font-extrabold text-[#2C1810]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full py-4 rounded-2xl bg-[#2C1810] hover:bg-[#C68B59] text-white font-serif font-bold text-sm shadow-md hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="space-y-2 pt-2 text-[11px] text-[#7B6E66]">
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7B8F77]" />
              Safe Demo Checkout • Simulated transaction
            </p>
            <p className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#C68B59]" />
              Roasted fresh & packaged in compostable bags
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
