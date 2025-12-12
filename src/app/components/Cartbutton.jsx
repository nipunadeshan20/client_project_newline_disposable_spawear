"use client";

import { useState } from "react";
import {
  ShoppingCart,
  X,
  ArrowLeft,
  CheckCircle,
  Mail,
  MessageCircle,
} from "lucide-react";
import CartItem from "./CartItem/CartItem";

export default function CartButton({ count = 0 }) {
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [success, setSuccess] = useState(false); // NEW STATE

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

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
        className={`fixed top-0 right-0 h-screen 
          w-full sm:w-[320px] md:w-[380px]
          bg-white shadow-xl z-[9999]
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
          flex flex-col`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            {success
              ? "Order Status"
              : checkout
              ? "Customer Details"
              : "Your Cart"}
          </h2>

          <button
            onClick={() => {
              setOpen(false);
              setCheckout(false);
              setSuccess(false);
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="pt-2 flex-1 overflow-y-auto bg-gray-100">
          {!checkout && !success && (
            /* ---------- CART ITEMS ---------- */
            <div className="p-5 flex flex-col gap-6 text-sm bg-white">
              <CartItem />
              <hr className="border-gray-300" />
              <CartItem />
            </div>
          )}

          {checkout && !success && (
            /* ---------- CHECKOUT FORM ---------- */
            <div className="p-5 bg-white">
              <button
                className="flex items-center gap-1 text-sm text-gray-700 mb-4"
                onClick={() => setCheckout(false)}
              >
                <ArrowLeft size={18} /> Back
              </button>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-[14px]"
              >
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  className="border p-2"
                />
                <input
                  required
                  type="tel"
                  placeholder="WhatsApp Number"
                  className="border p-2"
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  className="border p-2"
                />
                <input
                  required
                  type="text"
                  placeholder="Country"
                  className="border p-2"
                />
                <input
                  required
                  type="text"
                  placeholder="Address"
                  className="border p-2"
                />
                <input
                  required
                  type="text"
                  placeholder="City"
                  className="border p-2"
                />

                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 mt-2 text-[14px] font-medium"
                >
                  Submit Order
                </button>
              </form>
            </div>
          )}

          {success && (
            /* ---------- SUCCESS MESSAGE ---------- */
            <div className="p-5 bg-white text-center">
              <button
                className="flex items-center gap-1 text-sm text-gray-700 mb-4"
                onClick={() => {
                  setSuccess(false);
                  setCheckout(true);
                }}
              >
                <ArrowLeft size={18} /> Back
              </button>
              <div className="py-5 mb-4">
                <CheckCircle
                  size={48}
                  className="mx-auto text-green-600 mb-3"
                />

                <h3 className="text-lg font-semibold text-green-600">
                  Order Successful
                </h3>

                <p className="text-[12px] mt-2 text-gray-700">
                  For confirmation, <br/> the seller will contact you within{" "}
                  <b>1 hour</b>.
                </p>
              </div>
              <div className="bg-gray-100 py-4 mb-4 rounded">
                <p className="text-[12px] text-gray-600">
                  For any questions, contact the seller through :
                </p>

                <div className="flex justify-center gap-4 mt-3">
                  <a
                    href="https://wa.me/94770000000"
                    target="_blank"
                    className="flex items-center gap-2 bg-green-200 text-green-600 px-4 py-2 text-[12px] font-medium rounded"
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>

                  <a
                    href="mailto:seller@gmail.com"
                    className="flex items-center gap-2 bg-blue-200 text-blue-600 font-medium px-4 py-2 text-[12px] rounded"
                  >
                    <Mail size={16} /> Send Email
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        {!checkout && !success && (
          <div className="w-full bottom-0 right-0 bg-white border-t border-gray-300 px-5 py-4 flex justify-between items-center">
            <div className="text-sm">
              <span className="font-medium text-[12px] pr-1">Total :</span>
              <span className="font-bold text-[16px]">LKR 9,000</span>
            </div>

            <button
              onClick={() => setCheckout(true)}
              className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 text-[14px] font-medium"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </>
  );
}
