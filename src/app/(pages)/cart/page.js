'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { Trash, ArrowLeft, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container   mx-auto px-4 py-12 h-lvh">
        <div className="max-w-3xl mx-auto flex flex-col justify-center rounded-lg p-8">
          <div className="flex flex-col items-center justify-center py-8">
            <ShoppingCart size={64} className="text-gray-300 mb-4" />
            <h2 className="text-3xl font-bold mb-2 text-secondary">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any bike accessories yet!</p>
            <Link 
              href="/" 
              className="flex items-center bg-primary text-secondary px-6 py-3 rounded-md font-medium hover:bg-[#dfd247] transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Browse Accessories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-secondary">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-secondary">Cart Items ({cart.length})</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center">
                <div className="sm:w-1/4 mb-4 sm:mb-0">
                  {item.image && (
                    <div className="relative w-24 h-24 mx-auto">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
                
                <div className="sm:w-2/4 mb-4 sm:mb-0">
                  <h3 className="font-medium text-secondary">{item.name}</h3>
                  <p className="text-gray-500 text-sm">Item #: {item.id}</p>
                  <p className="font-semibold text-secondary mt-1">Rs.{item.price.toFixed(2)}</p>
                </div>
                
                <div className="sm:w-1/4 flex flex-col items-center sm:items-end">
                  <div className="flex items-center border border-gray-200 rounded-md mb-3">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-3 py-1 text-secondary font-bold"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      min="1" 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                      className="w-12 text-center border-x border-gray-200 py-1 focus:outline-none"
                      aria-label="Quantity"
                    />
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-secondary font-bold"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 text-sm flex items-center"
                    aria-label="Remove item"
                  >
                    <Trash size={14} className="mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4 text-secondary">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Rs.{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between font-semibold text-lg text-secondary">
                  <span>Total</span>
                  <span>Rs.{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link 
                href="/checkout" 
                className="block w-full bg-primary text-secondary text-center py-3 rounded-md font-medium hover:bg-[#dfd247] transition-colors"
              >
                Proceed to Checkout
              </Link>
              
              <Link 
                href="/" 
                className="block w-full bg-white border border-gray-300 text-secondary text-center py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </Link>
              
              <button 
                onClick={clearCart}
                className="block w-full bg-white text-red-600 text-center py-3 rounded-md font-medium hover:text-red-800 transition-colors text-sm flex items-center justify-center"
              >
                <Trash size={14} className="mr-1" />
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}