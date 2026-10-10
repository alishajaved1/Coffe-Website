import React, { createContext, useContext, useState, useEffect } from 'react';
import { CoffeeProduct, COFFEE_PRODUCTS } from '../data/coffeeData';

export type PageRoute =
  | 'home'
  | 'story'
  | 'menu'
  | 'shop'
  | 'details'
  | 'favorites'
  | 'cart'
  | 'signup'
  | 'signin'
  | 'dashboard'
  | 'brewbot'
  | 'contact';

export interface CartItem {
  product: CoffeeProduct;
  quantity: number;
  grind: 'Whole Bean' | 'Espresso Grind' | 'Pour Over Grind' | 'French Press Grind' | 'Standard Cup';
  size: 'Regular (12oz)' | 'Large (16oz)' | 'Bag (250g)' | 'Bag (340g)' | 'Standard';
}

export interface DemoOrder {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: 'Brewing & Packing' | 'Dispatched' | 'Delivered';
}

export interface UserProfile {
  name: string;
  email: string;
  memberTier: string;
  points: number;
  joinedDate: string;
  recentOrders: DemoOrder[];
}

interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface CoffeeContextType {
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  openProductDetails: (productId: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: CoffeeProduct, quantity?: number, grind?: CartItem['grind'], size?: CartItem['size']) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  promoCode: string;
  setPromoCode: (code: string) => void;
  discount: number;
  applyPromo: (code: string) => boolean;

  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;

  // Demo Auth
  currentUser: UserProfile | null;
  signIn: (email: string, name?: string) => void;
  signUp: (name: string, email: string) => void;
  signOut: () => void;

  // Checkout Demo
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  placeDemoOrder: (deliveryAddress: string) => DemoOrder;

  // BrewBot
  isBrewBotOpen: boolean;
  setIsBrewBotOpen: (open: boolean) => void;
  brewBotInitialPrompt: string | null;
  setBrewBotInitialPrompt: (prompt: string | null) => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const CoffeeContext = createContext<CoffeeContextType | undefined>(undefined);

const INITIAL_DEMO_ORDERS: DemoOrder[] = [
  {
    id: 'BB-89421',
    date: 'Yesterday at 9:15 AM',
    items: [
      { name: '18h Reserve Cold Brew', quantity: 2, price: 4.85 },
      { name: 'Artisan Cappuccino', quantity: 1, price: 4.75 }
    ],
    total: 14.45,
    status: 'Delivered'
  },
  {
    id: 'BB-77209',
    date: 'Oct 3, 2026',
    items: [
      { name: 'Signature House Blend (Whole Bean)', quantity: 1, price: 18.50 },
      { name: 'Caramel Macchiato', quantity: 1, price: 5.60 }
    ],
    total: 24.10,
    status: 'Delivered'
  }
];

export const CoffeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bb_cart');
      return saved ? JSON.parse(saved) : [
        {
          product: COFFEE_PRODUCTS[1], // Cappuccino
          quantity: 1,
          grind: 'Standard Cup',
          size: 'Regular (12oz)'
        },
        {
          product: COFFEE_PRODUCTS[8], // Signature House Blend
          quantity: 1,
          grind: 'Whole Bean',
          size: 'Bag (340g)'
        }
      ];
    } catch {
      return [];
    }
  });

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bb_favorites');
      return saved ? JSON.parse(saved) : ['cappuccino', 'signature-house-blend', 'caramel-macchiato'];
    } catch {
      return ['cappuccino', 'signature-house-blend'];
    }
  });

  // User Auth (demo)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('bb_user');
      if (saved) return JSON.parse(saved);
      // default demo user for instant preview experience
      return {
        name: 'Clara Delacroix',
        email: 'clara.delacroix@example.com',
        memberTier: 'Gold Bloom Connoisseur',
        points: 380,
        joinedDate: 'September 2026',
        recentOrders: INITIAL_DEMO_ORDERS
      };
    } catch {
      return null;
    }
  });

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBrewBotOpen, setIsBrewBotOpen] = useState(false);
  const [brewBotInitialPrompt, setBrewBotInitialPrompt] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Local storage synchronization
  useEffect(() => {
    try {
      localStorage.setItem('bb_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage unavailable', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('bb_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('LocalStorage unavailable', e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('bb_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('bb_user');
      }
    } catch (e) {
      console.warn('LocalStorage unavailable', e);
    }
  }, [currentUser]);

  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openProductDetails = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (
    product: CoffeeProduct,
    quantity = 1,
    grind: CartItem['grind'] = 'Standard Cup',
    size: CartItem['size'] = 'Regular (12oz)'
  ) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.grind === grind && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.grind === grind && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, grind, size }];
    });
    addToast('Added to Cart', `${product.name} (${quantity}x) added to your coffee order.`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Item Removed', 'Removed from your shopping bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (productId: string) => {
    const isFav = favorites.includes(productId);
    const product = COFFEE_PRODUCTS.find((p) => p.id === productId);
    if (isFav) {
      setFavorites((prev) => prev.filter((id) => id !== productId));
      addToast('Removed from Favorites', `${product?.name || 'Item'} removed from favorites.`, 'info');
    } else {
      setFavorites((prev) => [...prev, productId]);
      addToast('Saved to Favorites', `${product?.name || 'Item'} saved to your wish list.`, 'success');
    }
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const clearFavorites = () => {
    setFavorites([]);
    addToast('Favorites Cleared', 'Your favorites list has been reset.', 'info');
  };

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BLOOM10' || clean === 'COFFEE10') {
      setDiscountPercent(0.10);
      addToast('Promo Applied!', '10% discount applied to your order.');
      return true;
    } else if (clean === 'WELCOME15') {
      setDiscountPercent(0.15);
      addToast('VIP Promo Applied!', '15% new member discount applied.');
      return true;
    } else {
      addToast('Invalid Promo Code', 'Please try BLOOM10 for 10% off.', 'warning');
      return false;
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = subtotal * discountPercent;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * 0.0825; // standard 8.25% demo tax
  const shipping = taxableAmount > 35 || cart.length === 0 ? 0 : 4.50;
  const total = taxableAmount + tax + (cart.length > 0 ? shipping : 0);

  const signIn = (email: string, name?: string) => {
    const displayName = name || email.split('@')[0].replace(/[\._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const user: UserProfile = {
      name: displayName,
      email,
      memberTier: 'Gold Bloom Connoisseur',
      points: 250,
      joinedDate: 'October 2026',
      recentOrders: INITIAL_DEMO_ORDERS
    };
    setCurrentUser(user);
    addToast('Welcome Back!', `Signed in as ${displayName}.`);
    setCurrentPage('dashboard');
  };

  const signUp = (name: string, email: string) => {
    const user: UserProfile = {
      name,
      email,
      memberTier: 'Bloom Welcome Member',
      points: 100,
      joinedDate: 'October 2026',
      recentOrders: []
    };
    setCurrentUser(user);
    addToast('Account Created!', `Welcome to the Brew & Bloom family, ${name}! +100 welcome points added.`);
    setCurrentPage('dashboard');
  };

  const signOut = () => {
    setCurrentUser(null);
    addToast('Signed Out', 'You have been safely signed out from the demo session.', 'info');
    setCurrentPage('home');
  };

  const placeDemoOrder = (deliveryAddress: string): DemoOrder => {
    const newOrder: DemoOrder = {
      id: `BB-${Math.floor(10000 + Math.random() * 90000)}`,
      date: 'Just now',
      items: cart.map((item) => ({
        name: `${item.product.name} (${item.size})`,
        quantity: item.quantity,
        price: item.product.price
      })),
      total,
      status: 'Brewing & Packing'
    };

    if (currentUser) {
      const updatedUser: UserProfile = {
        ...currentUser,
        points: currentUser.points + Math.round(total * 10),
        recentOrders: [newOrder, ...currentUser.recentOrders]
      };
      setCurrentUser(updatedUser);
    }

    clearCart();
    setIsCheckoutOpen(false);
    addToast('Order Placed!', `Demo Order #${newOrder.id} is being roasted & prepared!`);
    setCurrentPage('dashboard');
    return newOrder;
  };

  return (
    <CoffeeContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductId,
        setSelectedProductId,
        openProductDetails,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        tax,
        shipping,
        total,
        promoCode,
        setPromoCode,
        discount,
        applyPromo,
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        currentUser,
        signIn,
        signUp,
        signOut,
        isCheckoutOpen,
        setIsCheckoutOpen,
        placeDemoOrder,
        isBrewBotOpen,
        setIsBrewBotOpen,
        brewBotInitialPrompt,
        setBrewBotInitialPrompt,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
};

export const useCoffee = () => {
  const context = useContext(CoffeeContext);
  if (!context) throw new Error('useCoffee must be used within a CoffeeProvider');
  return context;
};
