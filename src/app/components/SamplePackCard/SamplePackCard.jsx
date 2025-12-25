"use client";

import React from "react";
import "./SamplePackCard.css";
import { useCart } from "@/context/CartContext";

export default function CustomCard({
  title = "Request Your Free Spa Wear Samples Pack",
  text = "Our free Samples Pack includes 1 piece of each of our 7 premium spa-wear items. Test the quality, material, and finishing before placing a larger order.",
  className = "",
}) {
  const { addSampleKitRequest } = useCart();

  const handleRequest = () => {
    // Add sample kit to cart
    addSampleKitRequest();
    
    // Open cart drawer and go to checkout
    window.dispatchEvent(new CustomEvent('openCart'));
    
    // Small delay then trigger checkout
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('openCheckout'));
    }, 300);
  };

  return (
    <article
      className={`custom-card ${className}`}
      style={{
        backgroundImage: "url('/images/hero_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* White overlay box on top of background */}
      <div className="custom-card__overlay">
        <div className="custom-card__body">
          <h3 className="custom-card__title py-5 px-2">{title}</h3>
          <p className="custom-card__text">{text}</p>

          <div className="flex justify-center items-center">
            <button
              onClick={handleRequest}
              className="w-60 h-10 md:h-11 px-5 my-5 border-2 text-black font-semibold text-sm bg-white/30 backdrop-blur- hover:bg-zinc-800 hover:text-white active:scale-98 transition-all"
            >
              Request
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
