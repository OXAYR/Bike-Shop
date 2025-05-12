'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { CreditCard, Truck, ArrowLeft, ShoppingBag, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    postcode: '',
    country: 'US',
    email: '',
    phone: '',
    payment_method: 'bacs', // Default to direct bank transfer
    payment_method_title: 'Direct Bank Transfer',
  });

  // Redirect to products page if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/products');
    }
  }, [cart, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;
    let paymentMethodTitle = '';
    
    switch(value) {
      case 'bacs':
        paymentMethodTitle = 'Direct Bank Transfer';
        break;
      case 'cheque':
        paymentMethodTitle = 'Check Payment';
        break;
      case 'cod':
        paymentMethodTitle = 'Cash on Delivery';
        break;
      default:
        paymentMethodTitle = 'Direct Bank Transfer';
    }
    
    setFormData({
      ...formData,
      payment_method: value,
      payment_method_title: paymentMethodTitle
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Prepare line items from cart
      const line_items = cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }));

      // Prepare order data
      const orderData = {
        payment_method: formData.payment_method,
        payment_method_title: formData.payment_method_title,
        set_paid: false,
        billing: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          address_1: formData.address_1,
          address_2: formData.address_2,
          city: formData.city,
          state: formData.state,
          postcode: formData.postcode,
          country: formData.country,
          email: formData.email,
          phone: formData.phone
        },
        shipping: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          address_1: formData.address_1,
          address_2: formData.address_2,
          city: formData.city,
          state: formData.state,
          postcode: formData.postcode,
          country: formData.country
        },
        line_items: line_items,
        customer_note: ''
      };

      // Make API call to create order in WooCommerce
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const data = await response.json();
      
      // Clear the cart after successful order
      clearCart();
      
      // Navigate to a success page
      router.push(`/order-success?orderId=${data.id}`);
      
    } catch (err) {
      setError(err.message || 'An error occurred while placing your order');
      console.error('Checkout Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return null; // Will redirect in useEffect
  }

  const inputClasses = "w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";
  const labelClasses = "block text-sm font-medium text-secondary mb-1";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/cart" className="flex items-center text-secondary hover:text-gray-600 mr-4">
          <ArrowLeft size={18} className="mr-1" />
          <span className="text-sm">Back to cart</span>
        </Link>
        <h1 className="text-3xl font-bold text-secondary">Checkout</h1>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Billing Section */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center mb-4">
                <ShoppingBag size={20} className="mr-2 text-primary" />
                <h2 className="text-xl font-semibold text-secondary">Your Information</h2>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className={labelClasses} htmlFor="first_name">First Name *</label>
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      required
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className={inputClasses}
                    />
                  </div>
                  
                  <div>
                    <label className={labelClasses} htmlFor="last_name">Last Name *</label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className={inputClasses}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className={labelClasses} htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={inputClasses}
                    />
                  </div>
                  
                  <div>
                    <label className={labelClasses} htmlFor="phone">Phone *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Shipping Address Section */}
                <div className="mt-8 mb-6">
                  <div className="flex items-center mb-4">
                    <Truck size={20} className="mr-2 text-primary" />
                    <h2 className="text-xl font-semibold text-secondary">Shipping Address</h2>
                  </div>
                  
                  <div className="mb-4">
                    <label className={labelClasses} htmlFor="address_1">Street Address *</label>
                    <input
                      id="address_1"
                      name="address_1"
                      type="text"
                      required
                      value={formData.address_1}
                      onChange={handleInputChange}
                      className={`${inputClasses} mb-2`}
                      placeholder="House number and street name"
                    />
                    <input
                      id="address_2"
                      name="address_2"
                      type="text"
                      value={formData.address_2}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="Apartment, suite, unit, etc. (optional)"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className={labelClasses} htmlFor="city">City / Town *</label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className={inputClasses}
                      />
                    </div>
                    
                    <div>
                      <label className={labelClasses} htmlFor="state">State / County *</label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className={inputClasses}
                      />
                    </div>
                    
                    <div>
                      <label className={labelClasses} htmlFor="postcode">Postcode / ZIP *</label>
                      <input
                        id="postcode"
                        name="postcode"
                        type="text"
                        required
                        value={formData.postcode}
                        onChange={handleInputChange}
                        className={inputClasses}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className={labelClasses} htmlFor="country">Country / Region *</label>
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className={inputClasses}
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                </div>
                
                {/* Payment Method Section */}
                <div className="mt-8">
                  <div className="flex items-center mb-4">
                    <CreditCard size={20} className="mr-2 text-primary" />
                    <h2 className="text-xl font-semibold text-secondary">Payment Method</h2>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="payment_method"
                          value="bacs"
                          checked={formData.payment_method === 'bacs'}
                          onChange={handlePaymentMethodChange}
                          className="form-radio h-4 w-4 text-primary focus:ring-primary"
                        />
                        <span className="ml-2 font-medium text-secondary">Direct Bank Transfer</span>
                      </label>
                      {formData.payment_method === 'bacs' && (
                        <p className="text-sm text-gray-600 mt-2 ml-6">
                          Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="payment_method"
                          value="cheque"
                          checked={formData.payment_method === 'cheque'}
                          onChange={handlePaymentMethodChange}
                          className="form-radio h-4 w-4 text-primary focus:ring-primary"
                        />
                        <span className="ml-2 font-medium text-secondary">Check Payment</span>
                      </label>
                      {formData.payment_method === 'cheque' && (
                        <p className="text-sm text-gray-600 mt-2 ml-6">
                          Please send a check to our store address provided during the checkout process.
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="payment_method"
                          value="cod"
                          checked={formData.payment_method === 'cod'}
                          onChange={handlePaymentMethodChange}
                          className="form-radio h-4 w-4 text-primary focus:ring-primary"
                        />
                        <span className="ml-2 font-medium text-secondary">Cash on Delivery</span>
                      </label>
                      {formData.payment_method === 'cod' && (
                        <p className="text-sm text-gray-600 mt-2 ml-6">
                          Pay with cash upon delivery.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4 text-secondary">Order Summary</h2>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between py-2">
                  <div className="flex flex-col">
                    <span className="font-medium text-secondary">{item.name}</span>
                    <span className="text-gray-500 text-sm">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-medium text-secondary">Rs.{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Rs.{total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated at next step</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>Calculated at next step</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg text-secondary">
                <span>Total</span>
                <span>Rs.{total.toFixed(2)}</span>
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-primary text-secondary font-medium py-3 px-4 rounded-md hover:bg-[#dfd247] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                'Complete Order'
              )}
            </button>
            
            <div className="mt-4 text-center">
              <Link 
                href="/cart" 
                className="text-sm text-gray-600 hover:text-secondary"
              >
                Return to cart
              </Link>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500 mr-2">
                  <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-600">Secure Checkout</span>
              </div>
              <div className="flex justify-center space-x-2">
                <svg className="h-8 w-auto text-gray-400" viewBox="0 0 36 24" fill="currentColor"><path d="M33 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h30c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z" fill="white"></path><path d="M3 0.75C1.8.75.75 1.8.75 3v18c0 1.2 1.05 2.25 2.25 2.25h30c1.2 0 2.25-1.05 2.25-2.25V3c0-1.2-1.05-2.25-2.25-2.25H3Z" fill="#E3E3E3"></path></svg>
                <svg className="h-8 w-auto text-gray-400" viewBox="0 0 36 24" fill="currentColor"><path d="M33 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h30c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z" fill="white"></path><path d="M3 0.75C1.8.75.75 1.8.75 3v18c0 1.2 1.05 2.25 2.25 2.25h30c1.2 0 2.25-1.05 2.25-2.25V3c0-1.2-1.05-2.25-2.25-2.25H3Z" fill="#E3E3E3"></path><path d="M5 15h2c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1H5c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1Z" fill="#5570F6"></path><path d="M12 15h2c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1Z" fill="#5570F6"></path><path d="M19 15h2c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1Z" fill="#5570F6"></path><path d="M26 15h2c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-2c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1Z" fill="#5570F6"></path></svg>
                <svg className="h-8 w-auto text-gray-400" viewBox="0 0 36 24" fill="currentColor"><path d="M33 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h30c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z" fill="white"></path><path d="M3 0.75C1.8.75.75 1.8.75 3v18c0 1.2 1.05 2.25 2.25 2.25h30c1.2 0 2.25-1.05 2.25-2.25V3c0-1.2-1.05-2.25-2.25-2.25H3Z" fill="#E3E3E3"></path><path d="M8.25 6.5h19.5a.75.75 0 0 1 .75.75v9.5a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-9.5a.75.75 0 0 1 .75-.75Z" fill="#CB70FF"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}