'use client';

import { useState, useEffect, useRef } from 'react';
import { StarIcon, ShoppingCart, Truck, Shield, RotateCcw, Check } from 'lucide-react';

export default function ProductDetail({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const reviewsScrollerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Set the first variation as default when product loads
  useEffect(() => {
    if (product?.variations?.length > 0) {
      setSelectedVariation(product.variations[0]);
    }
  }, [product]);

  // Custom class to hide scrollbar across browsers
  const scrollbarHideClass = "overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

  // Auto-scrolling reviews effect
  useEffect(() => {
    if (!reviewsScrollerRef.current || !product?.reviews?.length || isPaused) return;

    const scrollerElement = reviewsScrollerRef.current;
    let scrollAmount = 1;
    let scrollInterval;
    const singleSetWidth = scrollerElement.scrollWidth / 2;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        scrollerElement.scrollLeft += scrollAmount;

        // If we've scrolled past the first set, reset to the equivalent position
        if (scrollerElement.scrollLeft >= singleSetWidth) {
          // Temporarily disable smooth scroll for the jump
          scrollerElement.style.scrollBehavior = 'auto';
          scrollerElement.scrollLeft -= singleSetWidth;
          // Re-enable smooth scroll
          scrollerElement.style.scrollBehavior = 'smooth';
        }
      }, 30);
    };

    startScrolling();

    return () => clearInterval(scrollInterval);
  }, [product, isPaused]);

  if (!product) {
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
    console.log("Added to cart:", {
      product: product.name,
      variation: selectedVariation?.name,
      quantity,
      price: selectedVariation?.price || product.price,
    });
    // Show notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Implement your checkout redirection here
    console.log("Proceeding to checkout");
  };

  const displayPrice = selectedVariation?.price || product.price;
  const displaySalePrice = product.onSale ? (selectedVariation?.salePrice || product.salePrice) : null;

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
                      src={image.src || '/api/placeholder/100/100'}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Main image */}
            <div className="relative flex-grow h-64 sm:h-96 w-full bg-gray-50 rounded-xl overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[selectedImage]?.src || '/api/placeholder/500/500'} 
                  alt={product.images[selectedImage]?.alt || product.name}
                  className="w-full h-full object-contain transition-opacity duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
              {product.onSale && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  SALE
                </div>
              )}
              {product.badge && (
                <div className="absolute top-4 right-4 bg-primary text-secondary px-3 py-1 rounded-full text-sm font-bold">
                  {product.badge}
                </div>
              )}
            </div>
          </div>
          
          {/* Product info */}
          <div className="lg:w-1/2">
            {/* Category breadcrumb */}
            {product.category && (
              <div className="text-sm text-gray-500 mb-2">
                {`Bike Accessories > ${product.category}`}
              </div>
            )}
            
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary">{product.name}</h1>
            
            {/* Rating */}
            {product.rating !== undefined && (
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      size={16} 
                      className={i < (product.rating || 0) ? "text-primary fill-primary" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({product.reviewCount || 0} {product.reviewCount === 1 ? 'review' : 'reviews'})
                </span>
                {product.featured && (
                  <span className="ml-3 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Top Rated</span>
                )}
              </div>
            )}
            
            {/* Price */}
            <div className="mt-4">
              {displaySalePrice ? (
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-secondary">
                    ${displaySalePrice.toFixed(2)}
                  </span>
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ${displayPrice.toFixed(2)}
                  </span>
                  <span className="ml-2 bg-red-100 text-red-800 px-2 py-0.5 rounded-md text-xs font-medium">
                    SAVE ${(displayPrice - displaySalePrice).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-secondary">
                  ${displayPrice.toFixed(2)}
                </span>
              )}
              
              {/* Stock status */}
              <div className="mt-2">
                {product.inStock || (selectedVariation && selectedVariation.inStock) ? (
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
            {product.description && (
              <div className="mt-4 text-gray-700">
                <p>{product.description}</p>
              </div>
            )}
            
            {/* Variations */}
            {product.variations && product.variations.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-secondary">Options</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.variations.map((variation) => (
                    <button
                      key={variation.id}
                      type="button"
                      className={`px-4 py-2 text-sm rounded-md transition
                                ${selectedVariation?.id === variation.id 
                                  ? 'bg-primary text-secondary font-medium shadow-sm' 
                                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}
                                ${!variation.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => variation.inStock && setSelectedVariation(variation)}
                      disabled={!variation.inStock}
                    >
                      {variation.name}
                      {!variation.inStock && ' (Out of Stock)'}
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
                className="flex-1 bg-white border-2 border-secondary py-3 px-4 text-base font-medium text-secondary hover:bg-gray-50 rounded-md transition flex items-center justify-center"
                disabled={!product.inStock && (!selectedVariation || !selectedVariation.inStock)}
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 bg-primary border-2 border-primary py-3 px-4 text-base font-medium text-secondary hover:bg-primary/90 rounded-md transition"
                disabled={!product.inStock && (!selectedVariation || !selectedVariation.inStock)}
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
                  <p className="text-sm text-gray-600">Free standard shipping on orders over $50</p>
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
                        <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Product description */}
        {product.longDescription && (
          <div className="mt-16 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-secondary">Product Description</h2>
            <div className="mt-6 prose prose-lg text-gray-700 max-w-none" 
                 dangerouslySetInnerHTML={{ __html: product.longDescription }} />
          </div>
        )}
        
        {/* Compatibility section - specific for bike accessories */}
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
        
        {/* Reviews section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-10">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-secondary">Customer Reviews</h2>
              <button className="text-sm font-medium text-secondary bg-primary px-4 py-2 rounded-md hover:bg-primary/90 transition">
                Write a Review
              </button>
            </div>
            
            {/* Auto-scrolling reviews */}
            <div 
              ref={reviewsScrollerRef}
              className={`mt-6 flex gap-4 ${scrollbarHideClass} pb-4 pt-2`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{ scrollBehavior: 'smooth' }}
            >
              {/* Duplicate reviews for infinite scroll illusion */}
              {[...product.reviews, ...product.reviews].map((review, idx) => (
                <div 
                  key={review.id ? `${review.id}-${idx}` : idx}
                  className="flex-shrink-0 bg-gray-50 p-5 rounded-lg w-72 md:w-80 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          size={14} 
                          className={i < review.rating ? "text-primary fill-primary" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <h4 className="mt-2 font-medium text-secondary">{review.author}</h4>
                  <p className="mt-1 text-sm text-gray-700 line-clamp-4">{review.content}</p>
                  {review.verifiedPurchase && (
                    <div className="mt-2 text-xs text-green-600 flex items-center">
                      <Check size={12} className="mr-1" />
                      Verified Purchase
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* You might also like - related products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-secondary">You Might Also Like</h2>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
      </div>
    </div>
  );
}