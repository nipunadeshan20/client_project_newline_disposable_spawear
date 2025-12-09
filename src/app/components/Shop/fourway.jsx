"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { ShoppingCart, Plus, Minus } from "lucide-react";

export default function ShopSection() {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  const [packs, setPacks] = useState(1);
  const pricePerPack = 4500;
  const totalPrice = pricePerPack * packs;

  useEffect(() => {
    const containers = [scrollRef1.current, scrollRef2.current];

    containers.forEach((container) => {
      if (!container) return;

      let isDragging = false;
      let startX;
      let scrollLeft;

      const start = (e) => {
        isDragging = true;
        container.classList.add("cursor-grabbing");
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      };

      const move = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2.5;
        container.scrollLeft = scrollLeft - walk;
      };

      const end = () => {
        isDragging = false;
        container.classList.remove("cursor-grabbing");
      };

      // Desktop: wheel + drag
      container.addEventListener(
        "wheel",
        (e) => {
          e.preventDefault();
          container.scrollBy({ left: e.deltaY * 1.8, behavior: "smooth" });
        },
        { passive: false }
      );

      container.addEventListener("mousedown", start);
      container.addEventListener("mousemove", move);
      container.addEventListener("mouseup", end);
      container.addEventListener("mouseleave", end);

      // Mobile: native touch already works thanks to touch-action-pan-x
      // But we add these just in case
      container.addEventListener(
        "touchstart",
        (e) => {
          startX = e.touches[0].pageX - container.offsetLeft;
          scrollLeft = container.scrollLeft;
        },
        { passive: true }
      );

      container.addEventListener(
        "touchmove",
        (e) => {
          if (!startX && !scrollLeft) return;
          const x = e.touches[0].pageX - container.offsetLeft;
          const walk = (x - startX) * 2.5;
          container.scrollLeft = scrollLeft - walk;
        },
        { passive: false }
      );

      return () => {
        container.removeEventListener("wheel", () => {});
        container.removeEventListener("mousedown", start);
        container.removeEventListener("mousemove", move);
        container.removeEventListener("mouseup", end);
        container.removeEventListener("mouseleave", end);
      };
    });
  }, []);

  return (
    <div className="">
      {/* Header */}
      <section
        id="shop"
        className="text-center scroll-margin-top-navbar bg-white "
      >
        <h2 className="text-2xl md:text-4xl font-bold mt-20 mb-10 animate-fade-up">Shop</h2>
        <section id="fourway" className=" scroll-margin-top-navbar animate-fade-up">
          <div className="inline-flex items-center w-full max-w-6xl mx-auto">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
            <p className=" px-2 sm:px-2 lg:px-6 text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[14px] uppercase tracking-widest text-gray-600">
              Fourway Material Wear
            </p>
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
          </div>
        </section>
      </section>

      {/* First section – Fourway */}
      <div className="relative animate-fade-up">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-0 sm:w-0 md:w-10 l:w-20 xl:w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-0 sm:w-0 md:w-10 l:w-20 xl:w-32 bg-gradient-to-l from-white to-transparent" />

        <div
          ref={scrollRef1}
          className="overflow-x-auto hide-scrollbar px-[30px] sm:px-[30px] md:px-[60px] lg:px-[100px] xl:px-[150px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none touch-action-pan-x"
        >
          <div className="flex py-8 -mx-4 max-w-xl gap-2 sm:gap-2 md:gap-4 lg:gap-6 xl:gap-8">
            {/* ← Your exact original cards – untouched */}
            <div className="">
              <ProductCard
                images={[
                  "/images/White_DU.png",
                  "/images/tlight_candles.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                ]}
                color="White"
                title="Disposable Underwear"
                pricePerPack={4500}
                defaultInfo="(Each pack contains 100 pieces.)"
                extraInfo={[
                  "Material - Fourway",
                  "Hygienic & individually wrapped",
                  "Perfect for travel & hospitals",
                ]}
              />
            </div>
            <div className="">
              <ProductCard
                images={[
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                ]}
                color="White"
                title="Disposable Underwear"
                pricePerPack={4500}
                defaultInfo="(Each pack contains 100 pieces.)"
                extraInfo={[
                  "Material - Fourway",
                  "Hygienic & individually wrapped",
                  "Perfect for travel & hospitals",
                ]}
              />
            </div>
            <div className="">
              <ProductCard
                images={[
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                ]}
                color="White"
                title="Disposable Underwear"
                pricePerPack={4500}
                defaultInfo="(Each pack contains 100 pieces.)"
                extraInfo={[
                  "Material - Fourway",
                  "Hygienic & individually wrapped",
                  "Perfect for travel & hospitals",
                ]}
              />
            </div>
            <div className="">
              <ProductCard
                images={[
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                ]}
                color="White"
                title="Disposable Underwear"
                pricePerPack={4500}
                defaultInfo="(Each pack contains 100 pieces.)"
                extraInfo={[
                  "Material - Fourway",
                  "Hygienic & individually wrapped",
                  "Perfect for travel & hospitals",
                ]}
              />
            </div>
            <div className="">
              <ProductCard
                images={[
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                ]}
                color="White"
                title="Disposable Underwear"
                pricePerPack={4500}
                defaultInfo="(Each pack contains 100 pieces.)"
                extraInfo={[
                  "Material - Fourway",
                  "Hygienic & individually wrapped",
                  "Perfect for travel & hospitals",
                ]}
              />
            </div>
            <div className="">
              <ProductCard
                images={[
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                ]}
                color="White"
                title="Disposable Underwear"
                pricePerPack={4500}
                defaultInfo="(Each pack contains 100 pieces.)"
                extraInfo={[
                  "Material - Fourway",
                  "Hygienic & individually wrapped",
                  "Perfect for travel & hospitals",
                ]}
              />
            </div>

            <div className="w-10 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Paper Material Wear section */}
      <section
        id="paper"
        className="text-center mt-10 scroll-margin-top-navbar animate-fade-up"
      >
        <div className="inline-flex items-center w-full max-w-6xl mx-auto">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
          <p className="px-2 sm:px-2 lg:px-6 text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[14px] uppercase tracking-widest text-gray-600">
            Paper Material Wear
          </p>
          <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
        </div>
      </section>

      <div className="relative mb-20 animate-fade-up">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-0 sm:w-0 md:w-10 l:w-20 xl:w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-0 sm:w-0 md:w-10 l:w-20 xl:w-32 bg-gradient-to-l from-white to-transparent" />

        <div
          ref={scrollRef2}
          className="overflow-x-auto hide-scrollbar px-[30px] sm:px-[30px] md:px-[60px] lg:px-[100px] xl:px-[150px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden select-none touch-action-pan-x"
        >
          <div className="flex py-8 -mx-4 max-w-xl gap-2 sm:gap-2 md:gap-4 lg:gap-6 xl:gap-8">
            <div className="">
              <ProductCard
                images={[
                  "/images/White_DU.png",
                  "/images/tlight_candles.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                ]}
                color="White"
                title="Disposable Underwear"
                pricePerPack={4500}
                defaultInfo="(Each pack contains 100 pieces.)"
                extraInfo={[
                  "Material - Fourway",
                  "Hygienic & individually wrapped",
                  "Perfect for travel & hospitals",
                ]}
              />
            </div>
            <div className="">
              <ProductCard
                images={[
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                ]}
                color="White"
                title="Disposable Underwear"
                pricePerPack={4500}
                defaultInfo="(Each pack contains 100 pieces.)"
                extraInfo={[
                  "Material - Fourway",
                  "Hygienic & individually wrapped",
                  "Perfect for travel & hospitals",
                ]}
              />
            </div>
            <div className="">
              <ProductCard
                images={[
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                ]}
                color="White"
                title="Disposable Underwear"
                pricePerPack={4500}
                defaultInfo="(Each pack contains 100 pieces.)"
                extraInfo={[
                  "Material - Fourway",
                  "Hygienic & individually wrapped",
                  "Perfect for travel & hospitals",
                ]}
              />
            </div>
            <div className="">
              <ProductCard
                images={[
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                  "/images/White_DU.png",
                ]}
                color="White"
                title="Disposable Underwear"
                pricePerPack={4500}
                defaultInfo="(Each pack contains 100 pieces.)"
                extraInfo={[
                  "Material - Fourway",
                  "Hygienic & individually wrapped",
                  "Perfect for travel & hospitals",
                ]}
              />
            </div>

            <div className="w-10 flex-shrink-0" />
          </div>
        </div>
      </div>

      <div id="tlight" className="bg-[#FAF0E3] ">
        {/* Full-height centering container */}
        <div className="mb-20 py-12 px-5 flex items-center justify-center">
          {/* Max-width + auto margins = perfect horizontal centering */}
          <section className="w-full max-w-4xl mx-auto lg:max-w-5xl xl:max-w-6xl items-center animate-fade-right">
            <a className="flex flex-col items-center justify-center md:flex-row md:items-center  transition-all block">
              {/* Image */}
              <img
                className="animate-fade-left object-cover object-bottom w-60 h-50 sm:h-50 sm:w-50 md:h-62 md:w-84 lg:w-84 lg:h-55 mb-6 md:mb-0 md:mr-8 lg:mr-12 shadow-md"
                src="/images/items/tlight_candles_item.png"
                alt="Streamlining your design process"
              />

              {/* Text content */}
              {/* Text content – ONLY THIS DIV CHANGES */}
              <div className="animate-fade-right flex flex-col justify-between text-center md:text-left flex-1 md:flex-none lg:max-w-lg xl:max-w-xl">
                <div>
                  <h5 className="mb-3 text-xl md:text-2xl font-bold text-gray-900">
                    T-light Candle
                  </h5>
                  <ul className="mb-3 text-left">
                    <li className="text-xs md:text-sm text-gray-700 leading-relaxed list-disc list-inside">
                      Each pack contains 100 pieces.
                    </li>
                    <li className="text-xs md:text-sm text-gray-700 leading-relaxed list-disc list-inside">
                      4 1/2 hours lightning.
                    </li>
                  </ul>
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs md:text-sm font-medium text-gray-600">
                        Packs:
                      </span>
                      <div className="bg-white w-[70px] h-[30px] sm:w-[80px] sm:h-[35px] md:w-[90px] md:h-[40px] lg:w-[100px] lg:h-[45px] flex items-center border border-gray-300 rounded-md overflow-hidden">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            packs > 1 && setPacks(packs - 1);
                          }}
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-bold text-sm">
                          {packs}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPacks(packs + 1);
                          }}
                          className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right pl-4">
                      <span className="text-xs text-gray-500">LKR</span>
                      <span className="text-sm md:text-base font-bold text-gray-900 ml-1">
                        {totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className=" flex gap-2 pt-2">
                  <button className="flex-1 h-10 md:h-11 bg-black text-white font-semibold text-sm hover:bg-zinc-800 active:scale-98 transition-all">
                    Buy Now
                  </button>

                  <button className="w-10 h-10 md:w-11 md:h-11 bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all">
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
