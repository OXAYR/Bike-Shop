import { getCategoryById } from '@/app/lib/categories';
import { getProductsByCategory } from '@/app/lib/products';
import ProductCard from '@/app/components/ProductCard';
import { Filter, Star } from 'lucide-react';
import Link from 'next/link';
import SortDropdown from '@/app/components/SortDropdown';

export default async function CategoryPage({ params, searchParams }) {
  const categoryId = params.id;

  const min_price = searchParams?.min_price;
  const max_price = searchParams?.max_price;
  const brands = searchParams?.brands;
  const ratings = searchParams?.ratings;
  const sort = searchParams?.sort;
  const attributeFilters = {};
  Object.keys(searchParams || {}).forEach(key => {
    if (
      typeof key === 'string' &&
      !['min_price', 'max_price', 'brands', 'ratings', 'sort'].includes(key)
    ) {
      attributeFilters[key] = searchParams[key];
    }
  });

  const categoryInfo = await getCategoryById(categoryId);

  const options = {
    perPage: 24,
    page: 1,
    ...(min_price && { min_price }),
    ...(max_price && { max_price }),
    ...(brands && { brands }),
    ...(ratings && { ratings }),
    ...(sort && { sort }),
    ...attributeFilters,
  };

  const { products, total } = await getProductsByCategory(categoryInfo?.id, options);

  const brandsList = Array.from(new Set(products.map(p => p.brand).filter(Boolean)));
  const attributes = {};
  products.forEach(product => {
    Object.entries(product.attributes || {}).forEach(([key, value]) => {
      if (!attributes[key]) attributes[key] = new Set();
      if (Array.isArray(value)) value.forEach(v => attributes[key].add(v));
      else attributes[key].add(value);
    });
  });
  const attributesArray = {};
  Object.keys(attributes).forEach(key => {
    attributesArray[key] = Array.from(attributes[key]);
  });

  // Find min/max prices
  const prices = products.map(p => parseFloat(p.price)).filter(Boolean);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 10000;

  // Helper to build filter URLs (now just returns the base category URL)
  // Helper to build filter URLs (fix: only use string keys)
  function buildUrl(newFilters) {
    const merged = { ...(searchParams || {}) };
    Object.keys(newFilters).forEach(key => {
      merged[key] = newFilters[key];
    });
    // Remove undefined, null, or empty values and ensure only string keys
    Object.keys(merged).forEach(key => {
      const value = merged[key];
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        typeof value === 'symbol'
      ) {
        delete merged[key];
      }
    });
    // Only use string keys for URLSearchParams
    const params = new URLSearchParams();
    Object.entries(merged).forEach(([key, value]) => {
      if (typeof key === 'string') {
        params.set(key, value);
      }
    });
    return `/category/${categoryId}?${params.toString()}`;
  }

  // When extracting attribute filters, only use string keys
 

  // Build applied filters summary
  const appliedFilters = [];
  if (min_price || max_price) appliedFilters.push(`Price: ${min_price || minPrice} - ${max_price || maxPrice}`);
  if (brands) appliedFilters.push(`Brand: ${brands}`);
  if (ratings) appliedFilters.push(`Rating: ${ratings}+`);
  if (sort) appliedFilters.push(`Sort: ${sort.charAt(0).toUpperCase() + sort.slice(1).replace('-', ' ')}`);
  Object.keys(attributeFilters).forEach(attr => {
    appliedFilters.push(`${attr.charAt(0).toUpperCase() + attr.slice(1)}: ${attributeFilters[attr]}`);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8 relative rounded-lg overflow-hidden">
        <img
          src={categoryInfo?.image.src || `/api/placeholder/1200/300?text=${categoryInfo?.name || 'Category'}`}
          alt={categoryInfo?.name}
          className="w-full h-48 sm:h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent flex flex-col justify-end p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{categoryInfo?.name}</h1>
          <p className="text-white text-opacity-90 max-w-xl">{categoryInfo?.description}</p>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-5 lg:gap-8">
        {/* Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
            <h2 className="text-lg font-medium text-secondary mb-4">Filters</h2>
            {/* Price Range */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-secondary mb-2">Price Range</h3>
              <form action={`/category/${categoryId}`} method="get">
                <div className="flex gap-2">
                  <input type="number" name="min_price" placeholder="Min" defaultValue={min_price || minPrice} className="w-1/2 border rounded p-1" />
                  <input type="number" name="max_price" placeholder="Max" defaultValue={max_price || maxPrice} className="w-1/2 border rounded p-1" />
                </div>
                <button type="submit" className="mt-2 w-full bg-primary text-secondary px-2 py-1 rounded">Apply</button>
              </form>
            </div>
            {/* Brands */}
            {brandsList.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-secondary mb-2">Brands</h3>
                {brandsList.map(brand => (
                  <Link key={brand} href={buildUrl({ brands: brand })} className={`block text-sm mb-1 ${brands === brand ? 'font-bold text-primary' : ''}`}>
                    <input type="checkbox" checked={brands === brand} readOnly className="mr-2" />
                    {brand}
                  </Link>
                ))}
              </div>
            )}
            {/* Ratings */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-secondary mb-2">Rating</h3>
              {[5, 4, 3, 2, 1].map(rating => (
                <Link key={rating} href={buildUrl({ ratings: rating })} className={`block text-sm mb-1 ${ratings == rating ? 'font-bold text-primary' : ''}`}>
                  <input type="checkbox" checked={ratings == rating} readOnly className="mr-2" />
                  {Array(rating).fill().map((_, i) => (
                    <Star key={i} size={14} fill="#EAE151" className="inline" />
                  ))}
                  {Array(5 - rating).fill().map((_, i) => (
                    <Star key={i} size={14} className="inline text-gray-300" />
                  ))}
                </Link>
              ))}
            </div>
            {/* Attribute Filters */}
            {Object.keys(attributesArray).map(attrName => (
              <div key={attrName} className="mb-4">
                <h3 className="text-sm font-medium text-secondary mb-2">{attrName.charAt(0).toUpperCase() + attrName.slice(1)}</h3>
                {attributesArray[attrName].map(value => (
                  <Link key={value} href={buildUrl({ [attrName]: value })} className={`block text-sm mb-1 ${searchParams?.[attrName] === value ? 'font-bold text-primary' : ''}`}>
                    <input type="checkbox" checked={searchParams?.[attrName] === value} readOnly className="mr-2" />
                    {value}
                  </Link>
                ))}
              </div>
            ))}
            {/* Reset Filters */}
            <Link href={`/category/${categoryId}`} className="block mt-4 text-primary text-sm underline">Reset All</Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-4">
          {/* Applied Filters Line */}
          {appliedFilters.length > 0 && (
            <div className="mb-4 p-2 bg-gray-100 rounded text-sm text-gray-700">
              Filters applied: {appliedFilters.join(', ')}
            </div>
          )}
          <div className="bg-white rounded-lg mb-6 p-4 border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="text-secondary mb-4 sm:mb-0">
                <span className="font-medium">{products.length} Products</span>
                <span className="text-gray-500 text-sm ml-2">in {categoryInfo?.name}</span>
              </div>
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <label className="text-sm text-gray-500">Sort by:</label>
                <SortDropdown currentSort={sort} />
              </div>
            </div>
          </div>
          {/* Products */}
          {products.length > 0 ? (
            <ProductCard products={products} isFeatured={false} />
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
}