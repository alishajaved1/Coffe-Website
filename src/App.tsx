import React from 'react';
import { CoffeeProvider, useCoffee } from './context/CoffeeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BrewBotModal } from './components/BrewBotModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastContainer } from './components/ToastContainer';

import { HomePage } from './pages/HomePage';
import { StoryPage } from './pages/StoryPage';
import { MenuPage } from './pages/MenuPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';
import { DashboardPage } from './pages/DashboardPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { currentPage } = useCoffee();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'story':
        return <StoryPage />;
      case 'menu':
        return <MenuPage />;
      case 'shop':
        return <ShopPage />;
      case 'details':
        return <ProductDetailsPage />;
      case 'favorites':
        return <FavoritesPage />;
      case 'cart':
        return <CartPage />;
      case 'signup':
        return <SignUpPage />;
      case 'signin':
        return <SignInPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C1810]">
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
      <BrewBotModal />
      <CheckoutModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <CoffeeProvider>
      <AppContent />
    </CoffeeProvider>
  );
}
