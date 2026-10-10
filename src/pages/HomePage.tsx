import React from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { COFFEE_PRODUCTS, REVIEWS, BREW_PROCESS } from '../data/coffeeData';
import { CoffeeCard } from '../components/CoffeeCard';
import { CoffeeSteam, CoffeeBeanIcon, CoffeeLeafBranch } from '../components/Illustrations';
import {
  ArrowRight,
  Coffee,
  Sparkles,
  Award,
  ShieldCheck,
  Heart,
  Star,
  CheckCircle2,
  Clock,
  Compass,
  Download
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setCurrentPage, setIsBrewBotOpen, setBrewBotInitialPrompt } = useCoffee();

  const bestsellers = COFFEE_PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);
  const featured = COFFEE_PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[88vh] bg-linear-to-b from-[#F5EFEB] via-[#FAF7F2] to-[#FAF7F2] flex items-center pt-8 pb-16">
        {/* Decorative Floating Beans & Background SVGs */}
        <div className="absolute top-12 left-10 text-[#C68B59]/20 animate-float pointer-events-none">
          <CoffeeBeanIcon size={64} />
        </div>
        <div className="absolute bottom-16 left-1/3 text-[#4A2C1B]/15 animate-float-reverse pointer-events-none">
          <CoffeeBeanIcon size={48} />
        </div>
        <div className="absolute top-24 right-1/4 text-[#7B8F77]/20 pointer-events-none">
          <CoffeeLeafBranch className="w-40 h-40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Editorial Headline & Copy */}
            <div className="lg:col-span-7 space-y-6 text-left z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8EDE6] text-[#2C1810] text-xs font-semibold tracking-wide border border-[#7B8F77]/30">
                <CoffeeBeanIcon size={14} className="text-[#7B8F77]" />
                <span>Small Batch Artisan Roastery & Botanical Café</span>
              </div>

              {/* Main Heading */}
              <div className="relative">
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#2C1810] tracking-tight leading-[1.08]">
                  Where Every Cup <br />
                  <span className="italic font-normal text-[#C68B59] relative">
                    Tells a Story
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#C68B59]/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="4" />
                    </svg>
                  </span>
                </h1>
              </div>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#5A463C] max-w-xl leading-relaxed font-normal">
                Sustainably sourced single-origins from high-elevation family farms, roasted in small 12kg drums to coax forth notes of jasmine, velvety cacao, and sweet caramel.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setCurrentPage('menu')}
                  className="px-7 py-3.5 rounded-full bg-[#2C1810] hover:bg-[#C68B59] text-white font-serif font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group cursor-pointer active:scale-95"
                >
                  <span>Explore Our Menu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setCurrentPage('shop')}
                  className="px-7 py-3.5 rounded-full bg-[#FAF7F2] hover:bg-[#F0E8DF] text-[#2C1810] font-serif font-semibold text-sm sm:text-base border-2 border-[#4A2C1B] transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                >
                  Order Whole Beans
                </button>

                <button
                  onClick={() => {
                    setBrewBotInitialPrompt('Which coffee should I try first?');
                    setIsBrewBotOpen(true);
                  }}
                  className="px-4 py-3 rounded-full text-xs font-semibold text-[#7B8F77] hover:text-[#2C1810] flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C68B59]" />
                  <span>Ask Barista AI</span>
                </button>
              </div>

              {/* Micro Stats */}
              <div className="pt-8 border-t border-[#EADBCE] grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] block">
                    100%
                  </span>
                  <span className="text-xs text-[#7B8F77] font-medium uppercase tracking-wider">
                    Grade-1 Arabica
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] block">
                    18 Hours
                  </span>
                  <span className="text-xs text-[#7B8F77] font-medium uppercase tracking-wider">
                    Slow Cold Steep
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] block">
                    +40%
                  </span>
                  <span className="text-xs text-[#7B8F77] font-medium uppercase tracking-wider">
                    Above Fair-Trade
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Artwork Featuring Coffee Lady */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Decorative border frame */}
                <div className="absolute -inset-3 rounded-3xl bg-linear-to-tr from-[#C68B59]/30 via-transparent to-[#7B8F77]/30 blur-md transform -rotate-1" />
                
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#F5EFEB]">
                  <img
                    src="/images/coffee_lady_hero.jpg"
                    alt="Elegant woman savoring artisan coffee at Brew & Bloom"
                    className="w-full h-[460px] sm:h-[520px] object-cover object-center transform hover:scale-103 transition-transform duration-700 ease-out"
                  />

                  {/* Floating Steam in the corner */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-2xl shadow-md flex items-center gap-2 border border-[#EADBCE]">
                    <CoffeeSteam className="h-5" />
                    <span className="text-[11px] font-semibold text-[#2C1810]">Fresh Brewed</span>
                  </div>

                  {/* Floating Glassmorphic Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/95 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2C1810] text-[#C68B59] flex items-center justify-center font-bold">
                        <Coffee className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#2C1810]">Artisan Roast of the Month</h4>
                        <p className="text-[11px] text-[#7B8F77]">Yirgacheffe Geisha Reserve • 2,150m</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setCurrentPage('shop')}
                      className="px-3 py-1.5 bg-[#C68B59] hover:bg-[#b07847] text-[#2C1810] text-xs font-bold rounded-lg transition cursor-pointer"
                    >
                      Taste
                    </button>
                  </div>

                </div>

                {/* Floating Stamp */}
                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-[#2C1810] text-[#FAF7F2] p-2 flex flex-col items-center justify-center text-center shadow-xl border-2 border-[#C68B59] animate-float">
                  <span className="text-[9px] uppercase tracking-tighter text-[#C68B59]">Certified</span>
                  <span className="font-serif text-xs font-bold leading-tight">Master Roast</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BESTSELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#7B8F77]">
              <Sparkles className="w-4 h-4 text-[#C68B59]" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1810] mt-1">
              Our Signature Bestsellers
            </h2>
            <p className="text-sm text-[#7B6E66] max-w-lg mt-2">
              The drinks and roasts our community comes back for every single morning.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('menu')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2C1810] hover:text-[#C68B59] group cursor-pointer"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((coffee) => (
            <CoffeeCard key={coffee.id} product={coffee} />
          ))}
        </div>
      </section>

      {/* OUR STORY EDITORIAL SECTION */}
      <section className="bg-[#F5EFEB] py-20 border-y border-[#EADBCE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image of Barista Craft */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="/images/coffee_brewing_craft.jpg"
                  alt="Artisan Barista Pouring V60 Hand Drip at Brew & Bloom"
                  className="w-full h-[440px] object-cover object-center"
                />
              </div>

              {/* Floating quote card */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#2C1810] text-[#FDFBF7] p-5 rounded-2xl shadow-xl max-w-xs border border-[#C68B59]/40">
                <p className="text-xs italic leading-relaxed text-[#EADBCE]">
                  "Coffee is not simply fuel; it is a mindful ceremony of origin, soil, sun, and fire."
                </p>
                <span className="block text-[10px] uppercase tracking-wider text-[#C68B59] font-bold mt-2">
                  — Amara Vance, Head Roaster
                </span>
              </div>
            </div>

            {/* Right Story Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8EDE6] text-[#2C1810] text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-[#7B8F77]" />
                <span>Our Roots & Philosophy</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810] leading-tight">
                Crafting Harmony Between Nature & Roasting
              </h2>

              <p className="text-sm sm:text-base text-[#5A463C] leading-relaxed">
                Founded in 2021 by a team of botanical enthusiasts and certified Q-graders, Brew & Bloom was born from a desire to strip away pretentious gatekeeping and return coffee to what it truly is: an agricultural wonder that brings humans together.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-[#EADBCE]">
                  <ShieldCheck className="w-5 h-5 text-[#7B8F77] mb-2" />
                  <h4 className="font-serif font-bold text-[#2C1810] text-sm">Direct Farm Partnerships</h4>
                  <p className="text-xs text-[#7B6E66] mt-1">We personally visit producers every harvest season across 4 countries.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#EADBCE]">
                  <Award className="w-5 h-5 text-[#C68B59] mb-2" />
                  <h4 className="font-serif font-bold text-[#2C1810] text-sm">Eco-Conscious Packaging</h4>
                  <p className="text-xs text-[#7B6E66] mt-1">100% home compostable bags lined with plant cellulose.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage('story')}
                  className="px-6 py-3 rounded-full bg-[#2C1810] hover:bg-[#4A2C1B] text-white text-xs sm:text-sm font-semibold transition cursor-pointer"
                >
                  Read Our Full Story →
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* COFFEE-MAKING PROCESS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#7B8F77]">
            <Coffee className="w-4 h-4 text-[#C68B59]" />
            <span>Bean to Cup Journey</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1810]">
            The Four Pillars of Our Craft
          </h2>
          <p className="text-sm text-[#7B6E66]">
            Every step is measured with atomic precision so you experience notes of ripe cherry, honey, and chocolate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BREW_PROCESS.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#FDFBF7] p-8 rounded-3xl border border-[#EADBCE] shadow-xs hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-4xl font-extrabold text-[#EADBCE] group-hover:text-[#C68B59] transition-colors block mb-4">
                  {step.step}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#2C1810] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#7B6E66] leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#F0E8DF] flex items-center text-xs font-semibold text-[#7B8F77] group-hover:text-[#2C1810]">
                <span>Artisan Standard</span>
                <CheckCircle2 className="w-4 h-4 ml-auto text-[#7B8F77]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED ROASTS & BEANS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#7B8F77]">
              <CoffeeBeanIcon size={14} className="text-[#C68B59]" />
              <span>Small Batch Roasted Weekly</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1810] mt-1">
              Curated Roasts & Specialty Blends
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('shop')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2C1810] hover:text-[#C68B59] group cursor-pointer"
          >
            <span>Explore All Beans & Gear</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((coffee) => (
            <CoffeeCard key={coffee.id} product={coffee} />
          ))}
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS */}
      <section className="bg-[#FAF7F2] py-16 border-y border-[#EADBCE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#2C1810]">
              Loved by Discerning Palates
            </h2>
            <p className="text-xs sm:text-sm text-[#7B6E66] mt-2">
              Over 12,000 satisfied coffee lovers enjoy Brew & Bloom every month.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-7 rounded-3xl border border-[#EADBCE] shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#C68B59]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-[#4A2C1B] italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F5EFEB] flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#EADBCE]"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-xs text-[#2C1810]">{rev.name}</h4>
                    <p className="text-[11px] text-[#7B8F77]">{rev.role}</p>
                    <span className="text-[10px] text-[#AFA196]">Favorite: {rev.coffee}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-[#2C1810] via-[#3B2215] to-[#2C1810] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl border border-[#C68B59]/30">
          
          <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none">
            <CoffeeLeafBranch className="w-full h-full text-white" />
          </div>

          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C68B59]/20 text-[#C68B59] text-xs font-semibold border border-[#C68B59]/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Experience The Difference</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
              Ready to elevated your daily coffee ritual?
            </h2>

            <p className="text-sm sm:text-base text-[#D5C2B4] leading-relaxed">
              Order online for local roastery pick-up or have our whole beans delivered directly to your doorstep. Complimentary shipping on orders over $35.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setCurrentPage('shop')}
                className="px-8 py-3.5 rounded-full bg-[#C68B59] hover:bg-[#b07847] text-[#2C1810] font-serif font-bold text-sm sm:text-base shadow-lg transition cursor-pointer"
              >
                Start Your Order
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition cursor-pointer"
              >
                Visit Our Café
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
