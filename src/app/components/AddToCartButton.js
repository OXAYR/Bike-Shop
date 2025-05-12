// components/AddToCartButton.tsx
'use client';

import { useState } from 'react';

export default function AddToCartButton({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const addToCart = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      // Call your cart API endpoint
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      setMessage('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage('Failed to add product to cart.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <div className="flex items-center mb-4">
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
      </div>
      
      <button
        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-gray-400"
        onClick={addToCart}
        disabled={isLoading}
      >
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </button>
      
      {message && (
        <div className={`mt-2 text-center ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </div>
      )}
    </div>
  );
}