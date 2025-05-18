'use client';

import { useState, useEffect, useRef } from 'react';
import { StarIcon, ShoppingCart, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
export default function ProductDetail({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const reviewsScrollerRef = useRef(null); // Uncommented
  const [isPaused, setIsPaused] = useState(false); // Uncommented
  const [showNotification, setShowNotification] = useState(false);

  // Helper to clean URL strings
  const cleanUrl = (url) => {
    if (typeof url === 'string') {
      return url.trim().replace(/`/g, '');
    }
    return url;
  };
  const { addToCart: contextAddToCart } = useCart();

  // Set the first variation as default when product loads
  useEffect(() => {
    if (product?.variations?.length > 0) {
      // Assuming API variation structure matches component's expectation or needs mapping here
      setSelectedVariation(product.variations[0]);
    }
  }, [product]);

  // Custom class to hide scrollbar across browsers
  const scrollbarHideClass = "overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

  // Static reviews data
  const staticReviews = [
    {
      id: 1,
      author: 'Rider_X',
      rating: 5,
      date: '2024-05-10',
      comment: 'This helmet is fantastic! Lightweight, comfortable, and offers great protection. The visor is crystal clear. Highly recommend for any serious rider.',
      image: 'https://images.pexels.com/photos/1323201/pexels-photo-1323201.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1', // Example image
    },
    {
      id: 2,
      author: 'MotoQueen',
      rating: 4,
      date: '2024-05-08',
      comment: 'Good quality jacket for the price. Kept me warm and dry during a light rain. Wish it had more pockets, but overall a solid buy.',
      image: 'https://images.pexels.com/photos/11026292/pexels-photo-11026292.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
    },
    {
      id: 3,
      author: 'SpeedyGonzales',
      rating: 5,
      date: '2024-05-05',
      comment: 'These gloves are a game-changer. Excellent grip and feel. They fit perfectly and look stylish too. Worth every penny!',
      image: 'https://images.pexels.com/photos/26558690/pexels-photo-26558690/free-photo-of-motorcycle-glove-on-man-hand.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
    },
    {
      id: 4,
      author: 'RoadWarrior77',
      rating: 3,
      date: '2024-05-02',
      comment: 'The chain lube works as expected, but the application nozzle could be better. It gets a bit messy. Decent product otherwise.',
      image: 'https://images.pexels.com/photos/8550669/pexels-photo-8550669.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
    },
    {
      id: 5,
      author: 'TwoWheelDreamer',
      rating: 4,
      date: '2024-04-28',
      comment: 'Great tires for my sportbike. They provide excellent traction in corners and feel very stable at high speeds. Let\'s see how long they last.',
      image: 'https://images.pexels.com/photos/2607554/pexels-photo-2607554.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=1',
    },
  ];

  // Auto-scrolling reviews effect
  useEffect(() => {
    if (!reviewsScrollerRef.current || staticReviews.length === 0 || isPaused) return;

    const scrollerElement = reviewsScrollerRef.current;
    let scrollAmount = 1;
    let scrollInterval;
    // Duplicate reviews for seamless scrolling effect
    const duplicatedReviews = [...staticReviews, ...staticReviews];
    const singleSetWidth = scrollerElement.scrollWidth / (duplicatedReviews.length / staticReviews.length);


    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        scrollerElement.scrollLeft += scrollAmount;

        if (scrollAmount > 0 && scrollerElement.scrollLeft >= singleSetWidth) {
          // If scrolling forward and reached the end of the first set, jump back to the beginning
          scrollerElement.style.scrollBehavior = 'auto'; // Disable smooth scroll for jump
          scrollerElement.scrollLeft -= singleSetWidth;
          scrollerElement.style.scrollBehavior = 'smooth'; // Re-enable smooth scroll
        } else if (scrollAmount < 0 && scrollerElement.scrollLeft <= 0) {
          // If scrolling backward and reached the beginning, jump to the end of the first set
          scrollerElement.style.scrollBehavior = 'auto';
          scrollerElement.scrollLeft += singleSetWidth;
          scrollerElement.style.scrollBehavior = 'smooth';
        }
      }, 30);
    };

    startScrolling();

    return () => clearInterval(scrollInterval);
  }, [isPaused, staticReviews]); // Added staticReviews to dependency array


  if (!product || !product.id) { // Check for product.id as a basic validation
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary">Product not found</h1>
          <p className="mt-4">Sorry, we couldn't find the bike accessory you're looking for.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const productForContext = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price), 
      quantity: 1,
      image: product.images && product.images.length > 0 ? product.images[0].src : null
    };
    contextAddToCart(productForContext);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Implement your checkout redirection here
    console.log("Proceeding to checkout");
  };

  // Determine prices based on API data structure
  const regularPrice = parseFloat(product.regular_price);
  const currentPrice = parseFloat(product.price); // API 'price' is the current (possibly sale) price
  const onSale = product.on_sale;

  const displayPrice = selectedVariation ? parseFloat(selectedVariation.regular_price || selectedVariation.price) : regularPrice;
  const displaySalePrice = selectedVariation 
    ? (selectedVariation.on_sale ? parseFloat(selectedVariation.sale_price) : null)
    : (onSale ? currentPrice : null);
  const finalPriceToShow = displaySalePrice !== null ? displaySalePrice : displayPrice;


  return (
    <div className="bg-white">
      {/* Product section */}
      <div className="container mx-auto px-4 my-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product images */}
          <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail images */}
            {product.images && product.images.length > 1 && (
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pb-2 mt-4 md:mt-0">
                {product.images.map((image, index) => (
                  <div 
                    key={image.id || index}
                    className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 cursor-pointer rounded-md border-2 overflow-hidden transition-all
                              ${selectedImage === index ? 'border-primary shadow-md' : 'border-gray-200'}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={cleanUrl(image.src) || '/api/placeholder/100/100'}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Main image */}
            <div className="relative flex-grow h-64 sm:h-[600px] w-full bg-gray-50 rounded-xl overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={cleanUrl(product.images[selectedImage]?.src) || '/api/placeholder/500/500'} 
                  alt={product.images[selectedImage]?.alt || product.name}
                  className="w-full h-full object-contain transition-opacity duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
              {product.on_sale && ( // Use product.on_sale from API
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  SALE
                </div>
              )}
              {/* product.badge is not in the provided data
              {product.badge && (
                <div className="absolute top-4 right-4 bg-primary text-secondary px-3 py-1 rounded-full text-sm font-bold">
                  {product.badge}
                </div>
              )}
              */}
            </div>
          </div>
          
          {/* Product info */}
          <div className="lg:w-1/2">
            {/* Category breadcrumb */}
            {product.categories && product.categories.length > 0 && (
              <div className="text-sm text-gray-500 mb-2">
                {`Bike Accessories > ${product.categories[0].name}`}
              </div>
            )}
            
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary">{product.name}</h1>
            
            {/* Rating */}
            {product.average_rating !== undefined && ( // Use average_rating from API
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      size={16} 
                      className={i < (parseFloat(product.average_rating) || 0) ? "text-primary fill-primary" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({product.rating_count || 0} {product.rating_count === 1 ? 'review' : 'reviews'}) 
                </span>
                {product.featured && ( // Use featured from API
                  <span className="ml-3 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Top Rated</span>
                )}
              </div>
            )}
            
            {/* Price */}
            <div className="mt-4">
              {displaySalePrice !== null && displaySalePrice < displayPrice ? (
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-secondary">
                    Rs.{displaySalePrice.toFixed(2)}
                  </span>
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    Rs.{displayPrice.toFixed(2)}
                  </span>
                  <span className="ml-2 bg-red-100 text-red-800 px-2 py-0.5 rounded-md text-xs font-medium">
                    SAVE Rs.{(displayPrice - displaySalePrice).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-secondary">
                  Rs.{displayPrice.toFixed(2)}
                </span>
              )}
              
              {/* Stock status */}
              <div className="mt-2">
                {(product.stock_status === 'instock') || (selectedVariation && selectedVariation.stock_status === 'instock') ? (
                  <span className="inline-flex items-center text-green-600 text-sm">
                    <Check size={16} className="mr-1" />
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center text-red-600 text-sm">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>
            
            {/* Short description */}
            {product.short_description && (
              <div className="mt-4 text-gray-700" dangerouslySetInnerHTML={{ __html: product.short_description }} />
            )}
            
            {/* Variations */}
            {product.variations && product.variations.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-secondary">Options</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.variations.map((variation) => ( // Assuming variation structure from API is compatible
                    <button
                      key={variation.id}
                      type="button"
                      className={`px-4 py-2 text-sm rounded-md transition
                                ${selectedVariation?.id === variation.id 
                                  ? 'bg-primary text-secondary font-medium shadow-sm' 
                                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}
                                ${variation.stock_status !== 'instock' ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => variation.stock_status === 'instock' && setSelectedVariation(variation)}
                      disabled={variation.stock_status !== 'instock'}
                    >
                      {variation.attributes?.map(attr => attr.option).join(' - ') || `Variation Rs.{variation.id}`} {/* Example name from attributes */}
                      {variation.stock_status !== 'instock' && ' (Out of Stock)'}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-secondary">Quantity</h3>
              <div className="flex items-center mt-2">
                <button 
                  className="w-10 h-10 bg-gray-100 rounded-l-md flex items-center justify-center hover:bg-gray-200 transition"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <span className="text-lg font-medium">-</span>
                </button>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
                  className="w-12 h-10 text-center border-t border-b border-gray-300 focus:outline-none"
                />
                <button 
                  className="w-10 h-10 bg-gray-100 rounded-r-md flex items-center justify-center hover:bg-gray-200 transition"
                  onClick={() => setQuantity(Math.min(99, quantity + 1))}
                >
                  <span className="text-lg font-medium">+</span>
                </button>
              </div>
            </div>
            
            {/* Add to cart and Buy Now buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-white border-2 cursor-pointer border-secondary py-3 px-4 text-base font-medium text-secondary hover:bg-gray-50 rounded-md transition flex items-center justify-center"
                disabled={product.stock_status !== 'instock' && (!selectedVariation || selectedVariation.stock_status !== 'instock')}
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 bg-primary border-2 cursor-pointer border-primary py-3 px-4 text-base font-medium text-secondary hover:bg-primary/90 rounded-md transition"
                disabled={product.stock_status !== 'instock' && (!selectedVariation || selectedVariation.stock_status !== 'instock')}
              >
                Buy Now
              </button>
            </div>
            
            {/* Cart notification */}
            {showNotification && (
              <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-md flex items-center">
                <Check size={18} className="mr-2" />
                Added to cart successfully!
              </div>
            )}
            
            {/* Shipping & Returns */}
            <div className="mt-8 border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-start">
                <Truck size={20} className="text-secondary mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-secondary">Free Shipping</h4>
                  <p className="text-sm text-gray-600">Free standard shipping on orders over Rs.50</p>
                </div>
              </div>
              <div className="flex items-start">
                <RotateCcw size={20} className="text-secondary mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-secondary">Easy Returns</h4>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield size={20} className="text-secondary mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-secondary">Warranty</h4>
                  <p className="text-sm text-gray-600">1-year manufacturer warranty included</p>
                </div>
              </div>
            </div>
            
            {/* Product highlights */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-secondary">Specifications</h3>
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                          <Check size={14} className="text-secondary" />
                        </div>
                      </div>
                      <p className="ml-2 text-sm text-gray-700">
                        <span className="font-medium">{key.replace(/([A-Z])/g, ' Rs.1').trim()}:</span> {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Product description */}
        {product.description && ( // API 'description' is the long HTML description
          <div className="mt-16 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-secondary">Product Description</h2>
            <div className="mt-6 prose prose-lg text-gray-700 max-w-none" 
                 dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        )}

{staticReviews.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-secondary">Customer Reviews</h2>
              <button className="text-sm font-medium text-secondary bg-primary px-4 py-2 rounded-md hover:bg-primary/90 transition">
                Write a Review
              </button>
            </div>
            
            {/* Overall Rating Summary (optional, if you want to keep it) */}
            {product.average_rating !== undefined && product.rating_count > 0 && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg flex items-center space-x-4">
                <div className="text-4xl font-bold text-primary">{parseFloat(product.average_rating).toFixed(1)}</div>
                <div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        size={20} 
                        className={i < (parseFloat(product.average_rating) || 0) ? "text-primary fill-primary" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Based on {product.rating_count} {product.rating_count === 1 ? 'review' : 'reviews'}</p>
                </div>
              </div>
            )}

            {/* Reviews Carousel */}
            <div 
              className={`relative ${scrollbarHideClass}`}
              ref={reviewsScrollerRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="flex space-x-6 py-4">
                {/* Duplicate reviews for seamless scrolling */}
                {[...staticReviews, ...staticReviews].map((review, index) => (
                  <div key={`${review.id}-${index}`} className="flex-shrink-0 w-80 bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      {review.image && (
                        <img src={review.image} alt={review.author} className="w-12 h-12 rounded-full mr-3 object-cover" />
                      )}
                      <div>
                        <h4 className="font-semibold text-secondary">{review.author}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} size={14} className={i < review.rating ? "text-primary fill-primary" : "text-gray-300"} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2 line-clamp-4">{review.comment}</p>
                    <p className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Compatibility section - product.compatibility is not in the provided data */}
        {/*
        {product.compatibility && (
          <div className="mt-16 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-secondary">Bike Compatibility</h2>
            <div className="mt-6 bg-gray-50 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.compatibility).map(([category, bikes]) => (
                  <div key={category}>
                    <h3 className="font-medium text-lg text-secondary mb-2">{category}</h3>
                    <ul className="space-y-1">
                      {bikes.map((bike, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <Check size={16} className="mr-2 text-green-500" />
                          {bike}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        */}
        
        {/* Reviews section - product.reviews array is not in the provided data */}
        {/* API provides average_rating and rating_count, but not individual reviews */}
        {/*
        {product.rating_count > 0 && ( // Check if there are any reviews based on count
          <div className="mt-16 border-t border-gray-200 pt-10">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-secondary">Customer Reviews</h2>
              <button className="text-sm font-medium text-secondary bg-primary px-4 py-2 rounded-md hover:bg-primary/90 transition">
                Write a Review
              </button>
            </div>
            
            <div className="mt-4">
                <p>This product has an average rating of {parseFloat(product.average_rating).toFixed(1)} stars based on {product.rating_count} reviews.</p>
                // Individual reviews display would require fetching them separately or having them in the product data.
            </div>
          </div>
        )}
        */}
        
        {/* You might also like - related products */}
        {/* API provides related_ids, not a full relatedProducts array */}
        {/* To implement this, you'd fetch products based on product.related_ids */}
        {/*
        {product.related_ids && product.related_ids.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-secondary">You Might Also Like</h2>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              // Map over fetched related products here
              {product.relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition">
                  <div className="aspect-square bg-gray-100 relative">
                    <img 
                      src={relatedProduct.image || '/api/placeholder/300/300'} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    {relatedProduct.onSale && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        SALE
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm text-secondary line-clamp-2">{relatedProduct.name}</h3>
                    <div className="mt-1 flex items-center">
                      {relatedProduct.onSale ? (
                        <>
                          <span className="text-sm font-bold text-secondary">${relatedProduct.salePrice.toFixed(2)}</span>
                          <span className="ml-1 text-xs text-gray-500 line-through">${relatedProduct.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="text-sm font-bold text-secondary">${relatedProduct.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        */}
      </div>
    </div>
  );
}