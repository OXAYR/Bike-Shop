'use client'

import { useState, useEffect } from 'react';
import { Filter, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
// Missing import
import { Star } from 'lucide-react';
import ProductCard from '@/app/components/ProductCard';

const CategoryPage = ({ params }) => {
  const categorySlug = params.slug;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: [0, 10000],
    brands: [],
    ratings: [],
    attributes: {},
  });
  const [availableFilters, setAvailableFilters] = useState({
    priceRange: { min: 0, max: 10000 },
    brands: [],
    ratings: [5, 4, 3, 2, 1],
    attributes: {},
  });
  const [sortOption, setSortOption] = useState('popularity');

  useEffect(() => {
    // Fetch category data and products
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        // This would be your actual API call to fetch category data from WooCommerce
        // Example: const response = await fetch(`/api/categories/${categorySlug}`);
        
        // Simulating API response with mock data
        const mockCategoryData = {
          id: 1,
          name: categorySlug === 'helmets' ? 'Helmets' : 
                categorySlug === 'gloves' ? 'Riding Gloves' : 
                categorySlug === 'lights' ? 'Bike Lights' : 'Bike Accessories',
          description: `High-quality bike ${categorySlug} for safe and comfortable rides.`,
          image: `/api/placeholder/1200/300`,
          productCount: categorySlug === 'helmets' ? 42 : 
                        categorySlug === 'gloves' ? 38 : 
                        categorySlug === 'lights' ? 56 : 120,
        };
        
        // Mock product data
        const mockProducts = Array(12).fill().map((_, index) => ({
          id: index + 1,
          name: `${mockCategoryData.name.slice(0, -1)} ${index + 1} - Premium Bike ${categorySlug === 'helmets' ? 'Protection' : 
                 categorySlug === 'gloves' ? 'Comfort' : 
                 categorySlug === 'lights' ? 'Visibility' : 'Accessory'}`,
          slug: `${categorySlug}-${index + 1}`,
          price: (Math.floor(Math.random() * 50) + 20) * 10,
          regular_price: (Math.floor(Math.random() * 60) + 25) * 10,
          on_sale: Math.random() > 0.5,
          sale_price: (Math.floor(Math.random() * 40) + 15) * 10,
          images: [
            {
              src: `/api/placeholder/400/350?text=${categorySlug}${index+1}`,
              alt: `${mockCategoryData.name.slice(0, -1)} ${index + 1}`
            }
          ],
          categories: [{ name: mockCategoryData.name }],
          rating: Math.floor(Math.random() * 3) + 3,
          reviewCount: Math.floor(Math.random() * 50) + 5,
          isNew: index < 3,
          attributes: {
            color: ['Black', 'Red', 'Blue'][Math.floor(Math.random() * 3)],
            size: ['S', 'M', 'L', 'XL'][Math.floor(Math.random() * 4)],
            material: ['Carbon', 'Plastic', 'Metal'][Math.floor(Math.random() * 3)]
          },
          brand: ['ProBiker', 'RideSafe', 'SpeedGear', 'BikeElite'][Math.floor(Math.random() * 4)]
        }));

        // Get available filter values from products
        const brands = [...new Set(mockProducts.map(p => p.brand))];
        const attributes = {};
        mockProducts.forEach(product => {
          Object.keys(product.attributes || {}).forEach(key => {
            if (!attributes[key]) attributes[key] = new Set();
            if (typeof product.attributes[key] === 'string') {
              attributes[key].add(product.attributes[key]);
            } else if (Array.isArray(product.attributes[key])) {
              product.attributes[key].forEach(value => attributes[key].add(value));
            }
          });
        });

        // Convert Sets to Arrays
        const attributesArray = {};
        Object.keys(attributes).forEach(key => {
          attributesArray[key] = Array.from(attributes[key]);
        });

        // Find min and max prices
        const prices = mockProducts.map(p => parseFloat(p.price));
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        setCategoryInfo(mockCategoryData);
        setProducts(mockProducts);
        setAvailableFilters({
          priceRange: { min: minPrice, max: maxPrice },
          brands,
          ratings: [5, 4, 3, 2, 1],
          attributes: attributesArray
        });
        setSelectedFilters({
          ...selectedFilters,
          priceRange: [minPrice, maxPrice]
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category data:', error);
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categorySlug]);

  const applyFilters = () => {
    // This function would typically be more complex with real filtering
    // For this demo, we'll just simulate filtering on the client side
    return products.filter(product => {
      // Price filter
      const price = parseFloat(product.price);
      if (price < selectedFilters.priceRange[0] || price > selectedFilters.priceRange[1]) {
        return false;
      }

      // Brand filter
      if (selectedFilters.brands.length > 0 && !selectedFilters.brands.includes(product.brand)) {
        return false;
      }

      // Rating filter
      if (selectedFilters.ratings.length > 0 && !selectedFilters.ratings.includes(product.rating)) {
        return false;
      }

      // Attribute filters
      for (const attrName in selectedFilters.attributes) {
        if (selectedFilters.attributes[attrName].length > 0) {
          if (!product.attributes || !product.attributes[attrName]) return false;
          
          const productAttrValue = product.attributes[attrName];
          const selectedValues = selectedFilters.attributes[attrName];
          
          let matches = false;
          if (Array.isArray(productAttrValue)) {
            matches = productAttrValue.some(val => selectedValues.includes(val));
          } else {
            matches = selectedValues.includes(productAttrValue);
          }
          
          if (!matches) return false;
        }
      }

      return true;
    });
  };

  const sortProducts = (products) => {
    let sortedProducts = [...products];
    
    switch (sortOption) {
      case 'price-low':
        sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'newest':
        sortedProducts.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
      default:
        // Assuming reviewCount as a measure of popularity
        sortedProducts.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
    
    return sortedProducts;
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterType === 'priceRange') {
        newFilters.priceRange = value;
      } else if (filterType === 'brands' || filterType === 'ratings') {
        if (newFilters[filterType].includes(value)) {
          newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
        } else {
          newFilters[filterType] = [...newFilters[filterType], value];
        }
      } else if (filterType.startsWith('attr_')) {
        const attrName = filterType.replace('attr_', '');
        if (!newFilters.attributes[attrName]) {
          newFilters.attributes[attrName] = [];
        }
        
        if (newFilters.attributes[attrName].includes(value)) {
          newFilters.attributes[attrName] = newFilters.attributes[attrName].filter(item => item !== value);
        } else {
          newFilters.attributes[attrName] = [...newFilters.attributes[attrName], value];
        }
      }
      
      return newFilters;
    });
  };

  const filteredProducts = applyFilters();
  const sortedAndFilteredProducts = sortProducts(filteredProducts);

  const FilterSection = ({ title, children, isOpen, toggleOpen }) => (
    <div className="border-b border-gray-200 py-4">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={toggleOpen}
      >
        <h3 className="text-sm font-medium text-secondary">{title}</h3>
        {isOpen ? (
          <ChevronUp size={16} className="text-secondary" />
        ) : (
          <ChevronDown size={16} className="text-secondary" />
        )}
      </div>
      {isOpen && (
        <div className="mt-4 space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  const resetFilters = () => {
    setSelectedFilters({
      priceRange: [availableFilters.priceRange.min, availableFilters.priceRange.max],
      brands: [],
      ratings: [],
      attributes: {},
    });
  };

  // Filter configuration for rendering
  const filterSections = [
    {
      id: 'price',
      title: 'Price Range',
      content: (
        <div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Rs.{selectedFilters.priceRange[0]}</span>
            <span className="text-sm text-gray-600">Rs.{selectedFilters.priceRange[1]}</span>
          </div>
          <input
            type="range"
            min={availableFilters.priceRange.min}
            max={availableFilters.priceRange.max}
            value={selectedFilters.priceRange[0]}
            onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), selectedFilters.priceRange[1]])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            min={availableFilters.priceRange.min}
            max={availableFilters.priceRange.max}
            value={selectedFilters.priceRange[1]}
            onChange={(e) => handleFilterChange('priceRange', [selectedFilters.priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
        </div>
      )
    },
    {
      id: 'brands',
      title: 'Brands',
      content: (
        <div className="space-y-2">
          {availableFilters.brands.map(brand => (
            <div key={brand} className="flex items-center">
              <input
                type="checkbox"
                id={`brand-${brand}`}
                checked={selectedFilters.brands.includes(brand)}
                onChange={() => handleFilterChange('brands', brand)}
                className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
              />
              <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-600">{brand}</label>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'ratings',
      title: 'Rating',
      content: (
        <div className="space-y-2">
          {availableFilters.ratings.map(rating => (
            <div key={rating} className="flex items-center">
              <input
                type="checkbox"
                id={`rating-${rating}`}
                checked={selectedFilters.ratings.includes(rating)}
                onChange={() => handleFilterChange('ratings', rating)}
                className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
              />
              <label htmlFor={`rating-${rating}`} className="ml-2 flex text-sm text-gray-600">
                {Array(rating).fill().map((_, i) => (
                  <Star key={i} size={14} fill="#EAE151" className="text-primary" />
                ))}
                {Array(5 - rating).fill().map((_, i) => (
                  <Star key={i} size={14} className="text-gray-300" />
                ))}
              </label>
            </div>
          ))}
        </div>
      )
    },
    ...Object.keys(availableFilters.attributes).map(attrName => ({
      id: `attr_${attrName}`,
      title: attrName.charAt(0).toUpperCase() + attrName.slice(1),
      content: (
        <div className="space-y-2">
          {availableFilters.attributes[attrName].map(value => (
            <div key={value} className="flex items-center">
              <input
                type="checkbox"
                id={`${attrName}-${value}`}
                checked={selectedFilters.attributes[attrName]?.includes(value) || false}
                onChange={() => handleFilterChange(`attr_${attrName}`, value)}
                className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
              />
              <label htmlFor={`${attrName}-${value}`} className="ml-2 text-sm text-gray-600">{value}</label>
            </div>
          ))}
        </div>
      )
    }))
  ];

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8 relative rounded-lg overflow-hidden">
        <img 
          src={categoryInfo?.image || `/api/placeholder/1200/300?text=${categoryInfo?.name || 'Category'}`} 
          alt={categoryInfo?.name} 
          className="w-full h-48 sm:h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent flex flex-col justify-end p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{categoryInfo?.name}</h1>
          <p className="text-white text-opacity-90 max-w-xl">{categoryInfo?.description}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="lg:grid lg:grid-cols-5 lg:gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button 
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="w-full flex justify-center items-center space-x-2 bg-secondary text-white px-4 py-3 rounded-md font-medium hover:bg-[#2D2A32]/90 transition-colors"
          >
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </button>
        </div>
        
        {/* Filter Sidebar (Mobile) */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)}></div>
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-secondary">Filters</h2>
                <button 
                  type="button" 
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white text-gray-400" 
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-4 px-4">
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Reset All Filters
                </button>
              </div>

              {/* Filter sections */}
              <div className="mt-4 px-4">
                {filterSections.map((section) => (
                  <FilterSection
                    key={section.id}
                    title={section.title}
                    isOpen={true}  // Always open on mobile
                    toggleOpen={() => {}}
                  >
                    {section.content}
                  </FilterSection>
                ))}
              </div>

              <div className="mt-6 px-4">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-primary text-secondary px-4 py-3 rounded-md font-medium hover:bg-[#d6cd49] transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-secondary">Filters</h2>
              <button
                onClick={resetFilters}
                className="text-sm text-primary hover:underline"
              >
                Reset All
              </button>
            </div>
            
            {/* Filter sections */}
            {filterSections.map((section, index) => (
              <FilterSection
                key={section.id}
                title={section.title}
                isOpen={filtersOpen || index < 3}  // First 3 sections open by default
                toggleOpen={() => setFiltersOpen(!filtersOpen)}
              >
                {section.content}
              </FilterSection>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg mb-6 p-4 border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="text-secondary mb-4 sm:mb-0">
                <span className="font-medium">
                  {sortedAndFilteredProducts.length} Products 
                </span>
                <span className="text-gray-500 text-sm ml-2">
                  in {categoryInfo?.name}
                </span>
              </div>
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <label className="text-sm text-gray-500">Sort by:</label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="flex-grow sm:flex-grow-0 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products */}
          {sortedAndFilteredProducts.length > 0 ? (
            <ProductCard products={sortedAndFilteredProducts} isFeatured={false} />
          ) : (
            <div className="py-12 text-center">
              <Filter size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-secondary mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters or browsing other categories.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default CategoryPage;