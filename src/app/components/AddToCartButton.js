// components/AddToCartButton.tsx
'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function AddToCartButton({ product, isProductDetailsPage = true }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // You might still want this for UI feedback
  const [message, setMessage] = useState('');
  const { addToCart: contextAddToCart } = useCart();

  const handleAddToCart = () => { // Renamed from handleApiAddToCart
    setIsLoading(true); // Optional: for UI feedback
    setMessage('');
    
    try {
      // Product data to be added to context
      const productForContext = {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price), // Ensure price is a number
        quantity: quantity,
        image: product.images && product.images.length > 0 ? product.images[0].src : null
      };
      contextAddToCart(productForContext); // Directly update the context
      setMessage('Product added to cart!');
      // Reset quantity for product details page after adding
      if (isProductDetailsPage) {
        setQuantity(1);
      }

    } catch (error) {
      console.error('Error adding to cart via context:', error);
      setMessage('Failed to add product to cart.');
    } finally {
      setIsLoading(false); // Optional: for UI feedback
    }
  };
  
  return (
    <div>
      {isProductDetailsPage && (<div className="flex items-center mb-4">
        <label htmlFor="quantity" className="mr-3">Quantity:</label>
        <div className="flex items-center border rounded">
          <button
            type="button"
            className="px-3 py-1"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            type="button"
            className="px-3 py-1"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>)}
      
      
      <button
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
        onClick={handleAddToCart} // Use the updated handler
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </button>
      {isProductDetailsPage &&  message && (
        <div className={`mt-2 text-center ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </div>
      )}
     
    </div>
  );
}