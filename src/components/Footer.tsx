import React, { useState } from 'react';
import { useCoffee, PageRoute } from '../context/CoffeeContext';
import { CoffeeBeanIcon, CoffeeLeafBranch } from './Illustrations';
import {
  Coffee,
  Heart,
  Send,
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Download,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, addToast, setIsBrewBotOpen } = useCoffee();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }
    addToast('Subscribed!', 'Welcome to the Brew & Bloom Roastery Club. Check your inbox for 10% off code BLOOM10.');
    setEmail('');
  };

  const nav = (route: PageRoute) => {
    setCurrentPage(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#21120B] text-[#EADBCE] relative overflow-hidden border-t-4 border-[#C68B59]">
      {/* Decorative leaf branch in background */}
      <div className="absolute right-0 top-0 w-80 h-80 opacity-5 pointer-events-none">
        <CoffeeLeafBranch className="w-full h-full text-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#4A2C1B]/60">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C68B59] text-[#2C1810] flex items-center justify-center font-bold">
                <Coffee className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-[#FDFBF7]">
                  Brew & Bloom
                </h3>
                <p className="text-xs tracking-widest uppercase text-[#C68B59] font-medium">
                  Artisan Roastery & Botanica
                </p>
              </div>
            </div>
            
            <p className="text-sm text-[#D5C2B4] leading-relaxed max-w-sm">
              Where every cup tells a story. We roast sustainably sourced specialty beans in micro-lots, honoring the delicate bloom of every origin.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="#instagram"
                onClick={(e) => { e.preventDefault(); addToast('Social Link', 'Opening Instagram @brewandbloom'); }}
                className="w-9 h-9 rounded-full bg-[#351E14] hover:bg-[#C68B59] hover:text-[#2C1810] text-[#EADBCE] flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                onClick={(e) => { e.preventDefault(); addToast('Social Link', 'Opening Facebook /brewandbloom'); }}
                className="w-9 h-9 rounded-full bg-[#351E14] hover:bg-[#C68B59] hover:text-[#2C1810] text-[#EADBCE] flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                onClick={(e) => { e.preventDefault(); addToast('Social Link', 'Opening X /brewandbloom'); }}
                className="w-9 h-9 rounded-full bg-[#351E14] hover:bg-[#C68B59] hover:text-[#2C1810] text-[#EADBCE] flex items-center justify-center transition"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#FDFBF7] tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#D5C2B4]">
              <li>
                <button onClick={() => nav('home')} className="hover:text-[#C68B59] transition cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => nav('story')} className="hover:text-[#C68B59] transition cursor-pointer">
                  Our Story & Heritage
                </button>
              </li>
              <li>
                <button onClick={() => nav('menu')} className="hover:text-[#C68B59] transition cursor-pointer">
                  Coffee Menu
                </button>
              </li>
              <li>
                <button onClick={() => nav('shop')} className="hover:text-[#C68B59] transition cursor-pointer">
                  Shop Whole Beans
                </button>
              </li>
              <li>
                <button onClick={() => nav('favorites')} className="hover:text-[#C68B59] transition cursor-pointer">
                  Favorites Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => nav('contact')} className="hover:text-[#C68B59] transition cursor-pointer">
                  Café Locations
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Roastery Location */}
          <div className="space-y-3 text-sm text-[#D5C2B4]">
            <h4 className="font-serif text-base font-semibold text-[#FDFBF7] tracking-wide">
              Roastery Hours
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C68B59] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#FDFBF7]">Mon – Fri:</p>
                  <p className="text-xs text-[#AFA196]">6:30 AM – 7:00 PM</p>
                  <p className="font-medium text-[#FDFBF7] mt-1">Sat – Sun:</p>
                  <p className="text-xs text-[#AFA196]">7:30 AM – 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C68B59] shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  482 Bloom Avenue, Heritage District, Pacific Grove, CA
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#FDFBF7] tracking-wide">
              The Roaster’s Journal
            </h4>
            <p className="text-xs text-[#D5C2B4] leading-relaxed">
              Receive limited harvest reserve alerts, home brew brewing ratios, and 10% off your first whole bean order.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 bg-[#2E190E] border border-[#4A2C1B] rounded-lg text-xs text-[#FDFBF7] placeholder-[#8C7A70] focus:outline-none focus:border-[#C68B59]"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#C68B59] hover:bg-[#b07847] text-[#2C1810] font-semibold text-xs rounded-md flex items-center gap-1 transition cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>
            <div className="pt-2">
              <button
                onClick={() => {
                  window.location.href = '/api/download-zip';
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#3A2216] hover:bg-[#4A2C1B] border border-[#C68B59]/40 rounded-lg text-xs text-amber-200 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Python & Streamlit Project</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#AFA196] gap-4">
          <p>© {new Date().getFullYear()} Brew & Bloom Specialty Coffee Roasters. Handcrafted with passion.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => nav('contact')} className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => nav('contact')} className="hover:text-white transition cursor-pointer">
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => setIsBrewBotOpen(true)}
              className="text-[#C68B59] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Ask BrewBot</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
