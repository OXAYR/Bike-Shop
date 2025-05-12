'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

// Create the cart context
const CartContext = createContext();

// Initial state
const initialState = {
  items: [],
  total: 0
};

// Actions
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';

// Reducer function to handle cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex !== -1) {
        // Item already exists in cart, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity
        };
        
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      } else {
        // Add new item to cart
        const updatedItems = [...state.items, action.payload];
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }
    }
    
    case REMOVE_FROM_CART: {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case UPDATE_QUANTITY: {
      const updatedItems = state.items.map(item => 
        item.id === action.payload.id 
          ? { ...item, quantity: action.payload.quantity } 
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case CLEAR_CART:
      return {
        ...initialState
      };
      
    default:
      return state;
  }
};

// Helper function to calculate total
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Provider component
export const CartProvider = ({ children }) => {
  // Load cart from localStorage on initial render
  const loadInitialState = () => {
    if (typeof window === 'undefined') {
      return initialState;
    }
    
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : initialState;
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return initialState;
    }
  };

  const [state, dispatch] = useReducer(cartReducer, null, loadInitialState);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try { 
        localStorage.setItem('cart', JSON.stringify(state));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [state]);
  
  // Cart actions
  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };
  
  const removeFromCart = (productId) => {
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
  };
  
  const updateQuantity = (productId, quantity) => {
    dispatch({ 
      type: UPDATE_QUANTITY, 
      payload: { id: productId, quantity: parseInt(quantity) } 
    });
  };
  
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  
  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        total: state.total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};