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
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allSuggestions, setAllSuggestions] = useState([]); // Store all fetched suggestions

  // Mock product data for suggestions - replace with actual API call
  const mockProducts = [
    { id: 1, name: 'Premium Carbon Helmet', slug: 'premium-carbon-helmet', image: 'https://images.pexels.com/photos/1323201/pexels-photo-1323201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 2, name: 'All-Weather Riding Jacket', slug: 'all-weather-riding-jacket', image: 'https://images.pexels.com/photos/11026292/pexels-photo-11026292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 3, name: 'Pro Riding Gloves', slug: 'pro-riding-gloves', image: 'https://images.pexels.com/photos/26558690/pexels-photo-26558690/free-photo-of-motorcycle-glove-on-man-hand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 4, name: 'Motorcycle Chain Lube', slug: 'motorcycle-chain-lube', image: 'https://images.pexels.com/photos/8550669/pexels-photo-8550669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 5, name: 'Sport Bike Tires', slug: 'sport-bike-tires', image: 'https://images.pexels.com/photos/2607554/pexels-photo-2607554.jpeg?auto=compress&cs=tinysrgb&w=1200' },
  ];

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 1) { // Start searching after 2 characters
      // Simulate API call
      const filteredSuggestions = mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setAllSuggestions(filteredSuggestions); // Store all results
      setSuggestions(filteredSuggestions.slice(0, 5)); // Show only top 5
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setAllSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
    if (searchQuery.length > 1 && suggestions.length > 0) { // Check 'suggestions' (the sliced list)
      setShowSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    setSearchFocused(false);
    // Delay hiding suggestions to allow click on suggestion item
    setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top navbar */}
        <div className="flex justify-between items-center ">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center ">
            <button 
              className="md:hidden text-secondary hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link href="/" className="flex items-center ">
              {/* <Bike size={28} className="text-primary" />
              <span className="text-secondary font-bold text-xl md:text-2xl tracking-tight">BikeGear</span> */}
              <img src="/logo.png" className="w-28"/>
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search for bike accessories..." 
                className={`w-full px-4 py-2.5 pr-10 bg-gray-50 border ${searchFocused ? 'border-primary' : 'border-gray-200'} rounded-lg focus:outline-none transition-all duration-200`}
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              <div className={`absolute right-3 top-2.5 p-1 rounded-full ${searchFocused ? 'bg-primary' : 'bg-gray-100'} transition-colors duration-200`}>
                <Search className={`${searchFocused ? 'text-secondary' : 'text-gray-500'}`} size={18} />
              </div>
              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 "> {/* Removed max-h-80 and overflow-y-auto here, will apply to list */}
                  <div className="max-h-80 overflow-y-auto"> {/* Apply scroll to the list part only */}
                    {suggestions.map(product => (
                      <Link 
                        key={product.id} 
                        href={`/products/${product.slug}`} // Assuming your product URLs are /products/:slug
                        className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setSearchQuery(''); // Clear search query
                          setSuggestions([]);
                          setAllSuggestions([]);
                          setShowSuggestions(false);
                        }}
                      >
                        {product.image && (
                          <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-md mr-3" />
                        )}
                        <span className="text-sm text-secondary">{product.name}</span>
                      </Link>
                    ))}
                  </div>
                  {allSuggestions.length > 5 && (
                    <Link
                      href={`/search?q=${encodeURIComponent(searchQuery)}`}
                      className="block text-center px-4 py-3 text-sm font-medium text-primary hover:bg-gray-50 border-t border-gray-200 rounded-b-lg"
                      onClick={() => {
                        setShowSuggestions(false);
                        // Optionally clear searchQuery or keep it for the search page
                      }}
                    >
                      See all results ({allSuggestions.length})
                    </Link>
                  )}
                </div>
              )}
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
                value={searchQuery} // Bind value for mobile too
                onChange={handleSearchChange} // Use same handler
                onFocus={handleSearchFocus}   // Use same handler
                onBlur={handleSearchBlur}    // Use same handler
              />
              <button className="absolute right-3 top-2.5 p-1 rounded-full bg-primary">
                <Search className="text-secondary" size={18} />
              </button>
              {/* Mobile Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10"> {/* Removed max-h-60 and overflow-y-auto here */}
                  <div className="max-h-60 overflow-y-auto"> {/* Apply scroll to the list part only */}
                    {suggestions.map(product => (
                      <Link 
                        key={product.id} 
                        href={`/products/${product.slug}`}
                        className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setMobileMenuOpen(false); // Close mobile menu
                          setSearchQuery(''); // Clear search query
                          setSuggestions([]);
                          setAllSuggestions([]);
                          setShowSuggestions(false);
                        }}
                      >
                        {product.image && (
                          <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-md mr-3" />
                        )}
                        <span className="text-sm text-secondary">{product.name}</span>
                      </Link>
                    ))}
                  </div>
                  {allSuggestions.length > 5 && (
                    <Link
                      href={`/search?q=${encodeURIComponent(searchQuery)}`}
                      className="block text-center px-4 py-3 text-sm font-medium text-primary hover:bg-gray-50 border-t border-gray-200 rounded-b-lg"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setShowSuggestions(false);
                        // Optionally clear searchQuery or keep it for the search page
                      }}
                    >
                      See all results ({allSuggestions.length})
                    </Link>
                  )}
                </div>
              )}
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