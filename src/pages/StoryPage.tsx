import React from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { CoffeeBeanIcon, CoffeeLeafBranch, CoffeeSteam } from '../components/Illustrations';
import {
  Heart,
  Sprout,
  Award,
  Globe2,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const StoryPage: React.FC = () => {
  const { setCurrentPage } = useCoffee();

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero */}
      <section className="bg-linear-to-b from-[#F5EFEB] to-[#FAF7F2] py-20 border-b border-[#EADBCE]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#E8EDE6] text-[#2C1810] text-xs font-semibold tracking-wide">
            <CoffeeBeanIcon size={14} className="text-[#7B8F77]" />
            <span>Founded in 2021 • Heritage & Purpose</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#2C1810] leading-tight">
            Our Story: Rooted in Soil, <br />
            <span className="italic font-normal text-[#C68B59]">Inspired by the Bloom</span>
          </h1>

          <p className="text-base sm:text-lg text-[#5A463C] max-w-2xl mx-auto leading-relaxed">
            Brew & Bloom started with a vintage 5kg drum roaster in a sunlit conservatory. We believed that when you treat coffee as delicate agriculture rather than industrial fuel, the cup becomes magic.
          </p>
        </div>
      </section>

      {/* Origin Story Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/images/coffee_brewing_craft.jpg"
                alt="Our Head Roaster preparing single-origin harvest"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#FAF7F2] p-5 rounded-2xl border border-[#EADBCE] shadow-lg max-w-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#7B8F77]">
                <Globe2 className="w-4 h-4" />
                <span>Direct Farmer Trade</span>
              </div>
              <p className="text-xs text-[#5A463C] mt-1">
                We know every grower by first name: Mateo in Huila, Abebe in Yirgacheffe, and Sofia in Huehuetenango.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C1810]">
              The Philosophy of the "Bloom"
            </h2>
            <p className="text-sm sm:text-base text-[#5A463C] leading-relaxed">
              When hot water first touches fresh coffee grounds, a fascinating phenomenon occurs: the coffee blooms. Trapped carbon dioxide escapes in gentle bubbles, releasing the true aromatics of jasmine, peach, cacao, and honey.
            </p>
            <p className="text-sm sm:text-base text-[#5A463C] leading-relaxed">
              To us, <em>Bloom</em> represents more than extraction chemistry. It is how our neighborhood awakens each morning, how conversations unfold across warm ceramic cups, and how mindful living transforms daily routines.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#7B8F77] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-[#2C1810] text-sm">Strictly Elevation-Grown (1,400m - 2,200m)</h4>
                  <p className="text-xs text-[#7B6E66]">Cool mountain nights slow bean maturation, concentrating natural fruit sugars.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#7B8F77] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-[#2C1810] text-sm">Gentle Convection Roasting</h4>
                  <p className="text-xs text-[#7B6E66]">No scorched beans or bitter charcoal tones. Clean, sweet, and repeatable flavor clarity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Values Grid */}
      <section className="bg-[#FAF7F2] py-16 border-y border-[#EADBCE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#2C1810]">
              Our Commitments to the Earth & People
            </h2>
            <p className="text-xs sm:text-sm text-[#7B6E66] mt-2">
              Responsibility built into every single ounce of roasted bean.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-[#EADBCE] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E8EDE6] text-[#7B8F77] flex items-center justify-center">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2C1810]">Shade-Grown Biodiversity</h3>
              <p className="text-xs text-[#7B6E66] leading-relaxed">
                All partner farms preserve native tree canopies, providing vital habitats for migratory birds and preventing deforestation.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#EADBCE] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EFEB] text-[#C68B59] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2C1810]">Direct Equity Premium</h3>
              <p className="text-xs text-[#7B6E66] leading-relaxed">
                We pre-finance harvest cycles and guarantee purchases above international market swings, ensuring farm families thrive generationally.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#EADBCE] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#2C1810] text-[#FDFBF7] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#FDFBF7]">Zero-Waste Packaging</h3>
              <p className="text-xs text-[#D5C2B4] leading-relaxed">
                Our whole-bean bags and takeaway cups are 100% commercially compostable with water-based non-toxic inks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA to Menu */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-[#2C1810]">
          Ready to Taste Our Craft?
        </h2>
        <p className="text-sm text-[#7B6E66] max-w-lg mx-auto">
          Explore our menu of handcrafted espresso drinks or order whole beans roasted this week.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setCurrentPage('menu')}
            className="px-7 py-3 rounded-full bg-[#2C1810] hover:bg-[#C68B59] text-white font-serif font-bold text-sm shadow-md transition cursor-pointer"
          >
            Explore Coffee Menu
          </button>
          <button
            onClick={() => setCurrentPage('shop')}
            className="px-7 py-3 rounded-full bg-[#FAF7F2] hover:bg-[#F0E8DF] text-[#2C1810] border border-[#2C1810] font-serif font-semibold text-sm transition cursor-pointer"
          >
            Order Whole Beans
          </button>
        </div>
      </section>

    </div>
  );
};
