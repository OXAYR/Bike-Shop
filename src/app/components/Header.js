'use client'

import { useState } from "react";
import { Search, Menu, X, ShoppingCart, ChevronDown, Bike } from 'lucide-react';
import Link from "next/link";
import { useCart } from "../context/CartContext";

const Header = ({ categories }) => {
  const [cartCount, setCartCount] = useState(3);
  const {cart} = useCart();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top navbar */}
        <div className="flex justify-between items-center py-4">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            <button 
              className="md:hidden text-secondary hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link href="/" className="flex items-center space-x-2">
              <Bike size={28} className="text-primary" />
              <span className="text-secondary font-bold text-xl md:text-2xl tracking-tight">BikeGear</span>
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search for bike accessories..." 
                className={`w-full px-4 py-2.5 pr-10 bg-gray-50 border ${searchFocused ? 'border-primary' : 'border-gray-200'} rounded-lg focus:outline-none transition-all duration-200`}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <div className={`absolute right-3 top-2.5 p-1 rounded-full ${searchFocused ? 'bg-primary' : 'bg-gray-100'} transition-colors duration-200`}>
                <Search className={`${searchFocused ? 'text-secondary' : 'text-gray-500'}`} size={18} />
              </div>
            </div>
          </div>
          
          {/* Cart Icon */}
          <div className="flex items-center space-x-5">
            <Link href="/cart" className="relative p-2 hover:bg-gray-50 rounded-full transition-colors">
              <ShoppingCart size={24} className="text-secondary" />
              {cart?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-secondary w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full border-2 border-white">
                  {cart?.length}
                </span>
              )}
            </Link>
          </div>
        </div>
        
        {/* Categories navbar */}
        <nav className="hidden md:flex items-center py-3 border-t border-gray-100 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-6 w-full justify-between">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/category/${category.slug}`}
                className={`
                  whitespace-nowrap py-2 border-b-2 text-sm font-medium transition-colors duration-200
                  ${category?.name?.includes("Sale") 
                    ? 'text-secondary font-bold border-primary' 
                    : 'text-secondary border-transparent hover:border-primary'}
                `}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slideDown">
          <div className="container mx-auto px-4 py-3">
            {/* Mobile Search */}
            <div className="relative w-full mb-4">
              <input 
                type="text" 
                placeholder="Search for bike accessories..." 
                className="w-full px-4 py-2.5 pr-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="absolute right-3 top-2.5 p-1 rounded-full bg-primary">
                <Search className="text-secondary" size={18} />
              </button>
            </div>
            
            {/* Mobile Categories */}
            <div className="space-y-1">
              {categories.map((category) => (
                <Link 
                  key={category.id} 
                  href={`/category/${category.slug}`}
                  className={`
                    block py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors
                    ${category?.name?.includes("Sale") 
                      ? 'text-secondary font-bold' 
                      : 'text-secondary'}
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;