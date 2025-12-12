"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingCart, X } from "lucide-react";

export default function ProductCard({
  images,
  color,
  title,
  pricePerPack,
  defaultInfo = "(Each pack contains 100 pieces.)",
  extraInfo = [],
  initialPacks = 1,
}) {
  const [packs, setPacks] = useState(initialPacks);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const totalPrice = pricePerPack * packs;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="group w-full max-w-[320px] mx-auto">
        <div className="bg-white shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
          {/* Image Container */}
          <div className="relative aspect-rectangle bg-white flex items-center justify-center overflow-hidden">
            {/* Click ONLY the image to open fullscreen */}
            <img
              src={images[currentImageIndex]}
              alt={`${color} ${title}`}
              className="w-full h-full object-contain p-0.5 transition-opacity duration-300 cursor-pointer"
              onClick={() => setIsFullscreenOpen(true)}
              draggable={false}
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition z-10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition z-10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}

            <div className="absolute bottom-3 right-3 bg-white text-gray-700 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              {color}
            </div>

            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === currentImageIndex ? "bg-gray-800 w-6" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center mb-0">
              <h2 className="text-sm md:text-base font-bold text-gray-900 truncate">
                {title}
              </h2>
              <button
                onClick={(e) => { e.stopPropagation(); setIsInfoOpen(!isInfoOpen); }}
                className="text-xs md:text-sm font-semibold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-md transition"
              >
                INFO
              </button>
            </div>

            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
              {defaultInfo}
            </p>

            <div className={`transition-all duration-300 overflow-hidden ${isInfoOpen ? "max-h-40" : "max-h-0"}`}>
              <ul className="text-xs text-gray-700 space-y-1.5 pl-4">
                {extraInfo.map((item, i) => (
                  <li key={i} className="relative">
                    <span className="absolute left-0 top-2 w-1 h-1 bg-gray-500 rounded-full -translate-x-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="text-xs md:text-sm font-medium text-gray-600">Packs :</span>
                <div className="w-[70px] h-[30px] sm:w-[80px] sm:h-[35px] md:w-[90px] md:h-[40px] lg:w-[90px] lg:h-[40px] flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={(e) => { e.stopPropagation(); packs > 1 && setPacks(packs - 1); }}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-sm">{packs}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setPacks(packs + 1); }}
                    className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-500">LKR</span>
                <span className="text-sm md:text-base font-bold text-gray-900 ml-1">
                  {totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 h-10 md:h-11 bg-black text-white font-semibold text-sm hover:bg-zinc-800 active:scale-98 transition-all">
                Buy Now
              </button>
              <button className="w-10 h-10 md:w-11 md:h-11 bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all">
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreenOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setIsFullscreenOpen(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <button
              onClick={() => setIsFullscreenOpen(false)}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
            >
              <X className="w-7 h-7" />
            </button>

            <img
              src={images[currentImageIndex]}
              alt={`${color} ${title}`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6" strokeWidth={3} />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6" strokeWidth={3} />
                  </svg>
                </button>
              </>
            )}

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-5 py-2 rounded-full text-lg font-medium">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}