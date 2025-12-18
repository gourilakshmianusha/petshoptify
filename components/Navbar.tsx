import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, PawPrint, Search } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartItems, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Dogs', path: '/shop?category=Dog' },
    { name: 'Cats', path: '/shop?category=Cat' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-orange-600 p-2 rounded-xl text-white transform group-hover:rotate-12 transition-all shadow-sm">
              <PawPrint size={20} fill="currentColor" />
            </div>
            <span className="font-black text-xl text-slate-900 tracking-tighter">Pawradise</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  location.pathname === link.path && !location.search.includes('?') 
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-slate-600 hover:text-orange-500 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-1 md:gap-3">
            <button className="p-2 text-slate-500 hover:text-orange-500 transition-colors hidden sm:block">
              <Search size={20} />
            </button>
            <button 
              onClick={onOpenCart}
              className="relative p-2.5 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-black leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-600 rounded-full border-2 border-white shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600 active:scale-90 transition-transform"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-slate-100 ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                location.pathname === link.path 
                  ? 'bg-orange-50 text-orange-600' 
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;