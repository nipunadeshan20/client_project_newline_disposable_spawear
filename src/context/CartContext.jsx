"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage:", e);
        setCartItems([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      // Check if product already exists in cart
      const existingIndex = prev.findIndex(
        (item) => item.productId === product._id && item.color === product.color
      );

      if (existingIndex > -1) {
        // Update quantity of existing item
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      // Add new item
      return [
        ...prev,
        {
          productId: product._id,
          itemName: product.itemName,
          category: product.category,
          color: product.color || null,
          material: product.material || null,
          image: product.images?.[0] || "/images/White_DU.png",
          pricePerPack: product.pricePerPack || 4500,
          quantity,
        },
      ];
    });
  };

  // Remove item from cart
  const removeFromCart = (productId, color) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.color === color)
      )
    );
  };

  // Update item quantity
  const updateQuantity = (productId, color, quantity) => {
    if (quantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Toggle item selection
  const toggleSelection = (productId, color) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.color === color
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get total count
  const getTotalCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Get total price
  const getTotalPrice = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.pricePerPack * item.quantity,
      0
    );
  };

  // Check if a product is in cart
  const isInCart = (productId, color) => {
    return cartItems.some(
      (item) => item.productId === productId && item.color === color
    );
  };

  // Add sample kit request (special item)
  const addSampleKitRequest = () => {
    const sampleKit = {
      productId: "sample-kit",
      itemName: "Free Spa Wear Sample Kit",
      category: "Sample Kit",
      color: null,
      material: null,
      image: "/images/White_DU.png",
      pricePerPack: 0, // Free
      quantity: 1,
      isSampleKit: true,
    };

    // Check if sample kit already in cart
    const exists = cartItems.some((item) => item.productId === "sample-kit");
    if (!exists) {
      setCartItems((prev) => [...prev, sampleKit]);
    }

    return !exists; // Return true if added, false if already existed
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoaded,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSelection,
        clearCart,
        getTotalCount,
        getTotalPrice,
        isInCart,
        addSampleKitRequest,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export default CartContext;

