import React from 'react';
import { Menu, ShoppingBag, X, Compass, Award, Calendar, HelpCircle, Mail } from 'lucide-react';

interface NavigationProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onNavigate: (screen: 'home' | 'catalog' | 'bespoke' | 'quiz' | 'heritage') => void;
  activeScreen: string;
}

export default function Navigation({
  cartItemCount,
  onOpenCart,
  onNavigate,
  activeScreen
}: NavigationProps) {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);

  const handleLinkClick = (screen: 'home' | 'catalog' | 'bespoke' | 'quiz' | 'heritage') => {
    onNavigate(screen);
    setIsOpenMenu(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#fbf9f9]/80 backdrop-blur-md border-b border-[#735c00]/15">
        <nav className="flex justify-between items-center w-full px-6 md:px-20 py-4 max-w-[1440px] mx-auto h-16">
          {/* Menu Button */}
          <button
            onClick={() => setIsOpenMenu(true)}
            className="text-[#000000] scale-100 active:scale-95 transition-transform hover:text-[#735c00] relative group flex items-center gap-2"
            aria-label="Open navigation menu"
            id="nav-menu-btn"
          >
            <Menu className="w-5 h-5" />
            <span className="hidden md:inline font-sans text-xs uppercase tracking-[0.2em] font-medium text-neutral-600 group-hover:text-[#735c00] transition-colors">
              Menu
            </span>
          </button>

          {/* Centered Brand Title */}
          <button
            onClick={() => handleLinkClick('home')}
            className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.2em] font-normal text-[#000000] hover:opacity-90 transition-opacity uppercase text-center"
            id="nav-brand-logo"
          >
            AVA'S JEWELRY
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="text-[#000000] hover:text-[#735c00] relative scale-100 active:scale-95 transition-transform flex items-center gap-2 group"
            aria-label="View shopping bag"
            id="nav-cart-btn"
          >
            <span className="hidden md:inline font-sans text-xs uppercase tracking-[0.2em] font-medium text-neutral-600 group-hover:text-[#735c00] transition-colors">
              Bag
            </span>
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-[#000000] group-hover:text-[#735c00] transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#735c00] text-[#fbf9f9] text-[9px] font-sans font-bold w-4 h-4 flex items-center justify-center rounded-none border border-[#fbf9f9]">
                  {cartItemCount}
                </span>
              )}
            </div>
          </button>
        </nav>
      </header>

      {/* Slide-out Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpenMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setIsOpenMenu(false)}
          className="absolute inset-0 bg-[#000000]/45 backdrop-blur-[2px]"
        />

        {/* Drawer Content */}
        <div
          className={`absolute top-0 left-0 bottom-0 w-full max-w-[420px] bg-[#fbf9f9] border-r border-[#735c00]/15 px-8 py-10 flex flex-col justify-between transition-transform duration-500 ease-out ${
            isOpenMenu ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#735c00]/10 pb-6">
            <span className="font-serif text-[#000000] text-lg tracking-[0.15em] uppercase">
              Exquisite Curation
            </span>
            <button
              onClick={() => setIsOpenMenu(false)}
              className="text-[#000000] hover:text-[#735c00] transition-colors p-1"
              id="close-menu-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-12 flex flex-col space-y-8">
            <button
              onClick={() => handleLinkClick('home')}
              className={`text-left font-serif text-2xl tracking-wide group flex items-center justify-between ${
                activeScreen === 'home' ? 'text-[#735c00]' : 'text-[#000000] hover:text-[#735c00]'
              }`}
            >
              <span>The Atelier</span>
              <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 group-hover:text-[#735c00] transition-colors">
                Atelier Home
              </span>
            </button>

            <button
              onClick={() => handleLinkClick('catalog')}
              className={`text-left font-serif text-2xl tracking-wide group flex items-center justify-between ${
                activeScreen === 'catalog' ? 'text-[#735c00]' : 'text-[#000000] hover:text-[#735c00]'
              }`}
            >
              <span>Selected Masterpieces</span>
              <Compass className="w-4 h-4 opacity-45 group-hover:opacity-100 group-hover:text-[#735c00] transition-opacity" />
            </button>

            <button
              onClick={() => handleLinkClick('bespoke')}
              className={`text-left font-serif text-2xl tracking-wide group flex items-center justify-between ${
                activeScreen === 'bespoke' ? 'text-[#735c00]' : 'text-[#000000] hover:text-[#735c00]'
              }`}
            >
              <span>Bespoke Consultation</span>
              <Calendar className="w-4 h-4 opacity-45 group-hover:opacity-100 group-hover:text-[#735c00] transition-opacity" />
            </button>

            <button
              onClick={() => handleLinkClick('quiz')}
              className={`text-left font-serif text-2xl tracking-wide group flex items-center justify-between ${
                activeScreen === 'quiz' ? 'text-[#735c00]' : 'text-[#000000] hover:text-[#735c00]'
              }`}
            >
              <span>Radiance Style Advisor</span>
              <HelpCircle className="w-4 h-4 opacity-45 group-hover:opacity-100 group-hover:text-[#735c00] transition-opacity" />
            </button>

            <button
              onClick={() => handleLinkClick('heritage')}
              className={`text-left font-serif text-2xl tracking-wide group flex items-center justify-between ${
                activeScreen === 'heritage' ? 'text-[#735c00]' : 'text-[#000000] hover:text-[#735c00]'
              }`}
            >
              <span>Our Legacy & Artistry</span>
              <Award className="w-4 h-4 opacity-45 group-hover:opacity-100 group-hover:text-[#735c00] transition-opacity" />
            </button>
          </div>

          {/* Footer inside menu */}
          <div className="border-t border-[#735c00]/10 pt-6">
            <p className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest leading-relaxed">
              AVA'S ATELIER PARIS • LONDON • NEW YORK
            </p>
            <p className="font-sans text-[11px] text-[#735c00] mt-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>curator@avasjewelry.luxury</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
