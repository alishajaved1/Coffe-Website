import React, { useState } from 'react';
import { useCoffee } from '../context/CoffeeContext';
import {
  X,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle,
  Coffee,
  AlertCircle
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discount,
    tax,
    shipping,
    total,
    placeDemoOrder,
    currentUser
  } = useCoffee();

  const [name, setName] = useState(currentUser?.name || 'Clara Delacroix');
  const [email, setEmail] = useState(currentUser?.email || 'clara@example.com');
  const [address, setAddress] = useState('742 Evergreen Terrace, Apt 4B');
  const [city, setCity] = useState('San Francisco, CA 94107');
  const [paymentType, setPaymentType] = useState<'card' | 'apple_pay'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      placeDemoOrder(`${address}, ${city}`);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2C1810]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FDFBF7] rounded-3xl border border-[#EADBCE] shadow-2xl max-w-2xl w-full overflow-hidden animate-scaleIn my-8">
        {/* Header */}
        <div className="bg-[#2C1810] text-[#FDFBF7] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C68B59] text-[#2C1810] flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">Artisan Order Checkout</h3>
              <p className="text-xs text-[#D5C2B4]">Demo Checkout Experience • No Real Charges</p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-[#D5C2B4] hover:text-white rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice */}
        <div className="bg-[#FAF7F2] border-b border-[#EADBCE] p-3.5 px-6 flex items-center gap-2.5 text-xs text-[#7B8F77]">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#C68B59]" />
          <span>
            This is a <strong>simulated coffee store demonstration</strong>. No actual payment will be processed or stored.
          </span>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Delivery Details */}
            <div className="space-y-4">
              <h4 className="font-serif text-base font-semibold text-[#2C1810] border-b border-[#EADBCE] pb-2">
                1. Delivery Information
              </h4>
              <div>
                <label className="block text-xs font-semibold text-[#4A2C1B] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] text-sm text-[#2C1810] focus:outline-none focus:border-[#C68B59]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4A2C1B] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] text-sm text-[#2C1810] focus:outline-none focus:border-[#C68B59]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4A2C1B] mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] text-sm text-[#2C1810] focus:outline-none focus:border-[#C68B59]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#4A2C1B] mb-1">City, State & ZIP</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] text-sm text-[#2C1810] focus:outline-none focus:border-[#C68B59]"
                />
              </div>
            </div>

            {/* Payment & Order Summary */}
            <div className="space-y-4">
              <h4 className="font-serif text-base font-semibold text-[#2C1810] border-b border-[#EADBCE] pb-2">
                2. Demo Payment Method
              </h4>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentType('card')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition text-xs font-semibold cursor-pointer ${
                    paymentType === 'card'
                      ? 'border-[#2C1810] bg-[#2C1810] text-white'
                      : 'border-[#EADBCE] bg-[#FAF7F2] text-[#4A2C1B]'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Demo Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentType('apple_pay')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition text-xs font-semibold cursor-pointer ${
                    paymentType === 'apple_pay'
                      ? 'border-[#2C1810] bg-[#2C1810] text-white'
                      : 'border-[#EADBCE] bg-[#FAF7F2] text-[#4A2C1B]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Apple Pay (Demo)</span>
                </button>
              </div>

              {paymentType === 'card' && (
                <div className="space-y-3 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EADBCE]">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#4A2C1B] mb-1">Card Number (Demo)</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#EADBCE] text-xs font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#4A2C1B] mb-1">Expires</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#EADBCE] text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#4A2C1B] mb-1">CVV</label>
                      <input
                        type="text"
                        defaultValue="928"
                        className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#EADBCE] text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Cost summary table */}
              <div className="bg-[#F5EFEB] p-4 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-[#7B6E66]">
                  <span>Items Subtotal ({cart.length} items):</span>
                  <span className="font-semibold text-[#2C1810]">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Bloom Code Promo:</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#7B6E66]">
                  <span>Estimated Tax (8.25%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#7B6E66]">
                  <span>Roastery Shipping:</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="pt-2 border-t border-[#EADBCE] flex justify-between text-sm font-bold text-[#2C1810]">
                  <span>Total Amount:</span>
                  <span className="font-serif text-lg text-[#2C1810]">${total.toFixed(2)}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-[#EADBCE] flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="text-xs text-[#7B6E66] hover:text-[#2C1810] font-medium transition cursor-pointer"
            >
              ← Return to Cart
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-[#2C1810] hover:bg-[#C68B59] text-white font-serif font-bold text-sm shadow-md transition cursor-pointer flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Roasting & Confirming Order...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Confirm Demo Order (${total.toFixed(2)})</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
