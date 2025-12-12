"use client";

import { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import CartItem from "./CartItem/CartItem";

export default function CartButton({ count = 0 }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-2 text-sm font-semibold text-black dark:text-white"
      >
        {/* Mobile */}
        <div className="relative md:hidden">
          <ShoppingCart size={20} />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-3 h-3 text-[8px] font-bold rounded-full bg-white text-black border border-black">
              {count}
            </span>
          )}
        </div>

        {/* Desktop */}
        <span className="hidden md:flex items-center gap-2 border border-black dark:border-white px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
          <ShoppingCart size={16} />
          Cart
          {count > 0 && (
            <span className="w-4 h-4 ml-1 flex items-center justify-center text-[10px] font-bold rounded-full bg-white text-black border border-black">
              {count}
            </span>
          )}
        </span>
      </button>

      {/* CART DRAWER */}
      <div
        className={`
          fixed top-0 right-0 h-screen 
          w-full sm:w-[320px] md:w-[380px]
          bg-white shadow-xl z-[9999]
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
          flex flex-col
        `}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="pt-2 flex-1 overflow-y-auto bg-gray-100">
          <div className="p-5 flex flex-col gap-6 text-sm bg-white">
            <CartItem />
            <hr className="border-gray-300" />
            <CartItem />
          </div>
        </div>

        {/* FOOTER (Fixed Bottom) */}
        <div className="w-full bottom-0 right-0 bg-white border-t border-gray-300 px-6 py-4 flex justify-between items-center">
          <div className="text-sm">
            <span className="font-medium text-[12px] pr-1">Total :</span>
            <span className="font-bold text-[16px]">LKR 9,000</span>
          </div>

          <button className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 text-[14px] font-medium">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
