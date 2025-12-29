"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";
import CustomCard from "../SamplePackCard/SamplePackCard";
import { useCart } from "@/context/CartContext";

export default function ShopSection() {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  const [packs, setPacks] = useState(1);
  const pricePerPack = 4500;
  const totalPrice = pricePerPack * packs;

  // Products state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const [tlightAddedToCart, setTlightAddedToCart] = useState(false);

  // Cart context
  const { addToCart } = useCart();

  // Fetch products from API
  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (isMounted && data.success) {
          // Filter only active products
          const activeProducts = data.products.filter((p) => p.isActive !== false);
          setProducts(activeProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
          setHasFetched(true);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter products by category
  const fourwayProducts = products.filter(
    (p) => p.category === "Fourway Material Wear"
  );
  const paperProducts = products.filter(
    (p) => p.category === "Paper Material Wear"
  );
  const tlightProducts = products.filter(
    (p) => p.category === "T-Light Candle"
  );

  // Get the first T-Light product for display
  const tlightProduct = tlightProducts[0];


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

  // Helper to convert moreInfo string to array
  const parseMoreInfo = (moreInfo, material) => {
    const info = [];
    if (material) info.push(`Material - ${material}`);
    if (moreInfo) {
      // Split by period, newline, or comma
      const parts = moreInfo.split(/[.\n,]/).filter((s) => s.trim());
      info.push(...parts.map((s) => s.trim()));
    }
    return info;
  };

  // Render product card from database product
  const renderProductCard = (product) => {
    // Use default placeholder if no images
    const images =
      product.images && product.images.length > 0
        ? product.images
        : ["/images/White_DU.png"];

    return (
      <div key={product._id} className="">
        <ProductCard
          product={product}
          images={images}
          color={product.color || product.itemName}
          title={product.itemName}
          pricePerPack={4500}
          defaultInfo={product.description || "(Each pack contains 100 pieces.)"}
          extraInfo={parseMoreInfo(product.moreInfo, product.material)}
        />
      </div>
    );
  };

  // Handle T-Light Add to Cart
  const handleTlightAddToCart = () => {
    if (!tlightProduct) return;

    const productData = {
      _id: tlightProduct._id,
      itemName: tlightProduct.itemName,
      category: tlightProduct.category,
      color: null,
      material: null,
      images: tlightProduct.images,
      pricePerPack: pricePerPack,
    };

    addToCart(productData, packs);
    setTlightAddedToCart(true);
    setTimeout(() => setTlightAddedToCart(false), 1500);
  };

  // Handle T-Light Buy Now
  const handleTlightBuyNow = () => {
    if (!tlightProduct) return;

    const productData = {
      _id: tlightProduct._id,
      itemName: tlightProduct.itemName,
      category: tlightProduct.category,
      color: null,
      material: null,
      images: tlightProduct.images,
      pricePerPack: pricePerPack,
    };

    addToCart(productData, packs);
    // The cart will be opened via navbar/cart button
    // Scroll to top or trigger cart open
    window.dispatchEvent(new CustomEvent('openCart'));
  };

  // Loading placeholder card
  const LoadingCard = () => (
    <div className="w-[320px] h-[400px] bg-gray-100 animate-pulse rounded-lg" />
  );

  // Empty state message
  const EmptyState = ({ category }) => (
    <div className="text-center py-8 text-gray-500">
      No {category} products available yet.
    </div>
  );

  return (
    <div className="">
      {/* Header */}
      <section
        id="shop"
        className="text-center scroll-margin-top-navbar bg-white "
      >
        <h2 className="text-2xl md:text-4xl font-bold mt-25 mb-10 animate-fade-up">
          Shop
        </h2>
        <section
          id="fourway"
          className=" scroll-margin-top-navbar animate-fade-up"
        >
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
            {(loading || !hasFetched) ? (
              // Loading state
              <>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </>
            ) : fourwayProducts.length > 0 ? (
              // Render products from database
              <>
                {fourwayProducts.map(renderProductCard)}
                <div className="w-10 flex-shrink-0" />
              </>
            ) : (
              // Empty state
              <EmptyState category="Fourway Material Wear" />
            )}
          </div>
        </div>
      </div>

      {/* Paper Material Wear section */}
      <section
        id="paper"
        className="text-center mt-15 scroll-margin-top-navbar animate-fade-up"
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
            {(loading || !hasFetched) ? (
              // Loading state
              <>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </>
            ) : paperProducts.length > 0 ? (
              // Render products from database
              <>
                {paperProducts.map(renderProductCard)}
                <div className="w-10 flex-shrink-0" />
              </>
            ) : (
              // Empty state
              <EmptyState category="Paper Material Wear" />
            )}
          </div>
        </div>
      </div>

      {/* T-Light Candle Section */}
      <div id="tlight" className="bg-[#faf3e3] scroll-margin-top-navbar">
        {/* Section Header */}
        <section className="text-center pt-12 animate-fade-up">
          <div className="inline-flex items-center w-full max-w-6xl mx-auto px-4">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <p className="px-2 sm:px-4 lg:px-6 text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[14px] uppercase tracking-widest text-amber-700">
              T-Light Candle
            </p>
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
        </section>

        <div className="pb-20 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 flex items-center justify-center">
          <section className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto bg-white rounded-xl p-6 sm:p-8 shadow-lg">
            {(loading || !hasFetched) ? (
              // Loading state for T-Light - Responsive
              <div className="flex flex-col items-center justify-center md:flex-row md:items-center gap-6 md:gap-8">
                <div className="w-full max-w-[280px] sm:max-w-[300px] md:w-[320px] lg:w-[350px] aspect-square bg-amber-200/50 animate-pulse rounded-lg" />
                <div className="flex-1 w-full space-y-4 px-2">
                  <div className="h-8 bg-amber-200/50 animate-pulse rounded w-48 mx-auto md:mx-0" />
                  <div className="h-4 bg-amber-200/50 animate-pulse rounded w-full" />
                  <div className="h-4 bg-amber-200/50 animate-pulse rounded w-3/4" />
                  <div className="h-12 bg-amber-200/50 animate-pulse rounded w-full mt-6" />
                </div>
              </div>
            ) : tlightProduct ? (
              // Render T-Light product from database - Fully Responsive
              <div className="flex flex-col items-center justify-center md:flex-row md:items-start lg:items-center gap-6 md:gap-8 lg:gap-12">
                {/* Image - Responsive */}
                <div className="w-full max-w-[280px] sm:max-w-[300px] md:w-[320px] lg:w-[350px] xl:w-[380px] flex-shrink-0">
                  <img
                    className="w-full aspect-square object-cover object-center shadow-lg rounded-lg"
                    src={
                      tlightProduct.images && tlightProduct.images.length > 0
                        ? tlightProduct.images[0]
                        : "/images/items/tlight_candles_item.png"
                    }
                    alt={tlightProduct.itemName}
                  />
                </div>

                {/* Text content - Responsive */}
                <div className="flex flex-col justify-between text-center md:text-left flex-1 w-full max-w-md md:max-w-none">
                  <div>
                    <h5 className="mb-3 text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                      {tlightProduct.itemName}
                    </h5>
                    <ul className="mb-4 text-left space-y-1">
                      {tlightProduct.description && (
                        <li className="text-sm sm:text-base text-gray-700 leading-relaxed list-disc list-inside">
                          {tlightProduct.description}
                        </li>
                      )}
                      {tlightProduct.moreInfo &&
                        tlightProduct.moreInfo
                          .split(/[.\n]/)
                          .filter(Boolean)
                          .map((info, i) => (
                            <li
                              key={i}
                              className="text-sm sm:text-base text-gray-700 leading-relaxed list-disc list-inside"
                            >
                              {info.trim()}
                            </li>
                          ))}
                    </ul>

                    {/* Pack selector and price - Responsive */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-5">
                      <div className="flex items-center gap-3">
                        <span className="text-sm sm:text-base font-medium text-gray-600">
                          Packs:
                        </span>
                        <div className="bg-white w-[100px] h-[40px] sm:w-[110px] sm:h-[44px] md:w-[120px] md:h-[48px] flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              packs > 1 && setPacks(packs - 1);
                            }}
                            className="flex-1 h-full flex items-center justify-center hover:bg-gray-100 transition active:bg-gray-200"
                          >
                            <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <span className="w-10 sm:w-12 text-center font-bold text-base sm:text-lg">
                            {packs}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPacks(packs + 1);
                            }}
                            className="flex-1 h-full flex items-center justify-center hover:bg-gray-100 transition active:bg-gray-200"
                          >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-center sm:text-right">
                        <span className="text-sm text-gray-500">LKR</span>
                        <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 ml-1">
                          {totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons - Responsive */}
                  <div className="flex gap-3 pt-2 w-full">
                    <button 
                      onClick={handleTlightBuyNow}
                      className="flex-1 h-11 sm:h-12 md:h-14 bg-black text-white font-semibold text-sm sm:text-base rounded-md hover:bg-zinc-800 active:scale-[0.98] transition-all shadow-md"
                    >
                      Buy Now
                    </button>

                    <button 
                      onClick={handleTlightAddToCart}
                      className={`w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 border-2 rounded-md flex items-center justify-center active:scale-95 transition-all shadow-sm ${
                        tlightAddedToCart 
                          ? "bg-green-500 border-green-500 text-white" 
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {tlightAddedToCart ? (
                        <Check className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : (
                        <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Empty state for T-Light - Responsive
              <div className="text-center py-8 sm:py-12 text-gray-700 bg-amber-50 rounded-lg">
                <p className="text-lg font-medium mb-4">No T-Light Candle Added</p>
                <img
                  className="mx-auto object-cover object-center w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 mb-6 opacity-60 rounded-lg"
                  src="/images/items/tlight_candles_item.png"
                  alt="T-light Candle"
                />
                <p className="text-sm sm:text-base text-amber-700">
                  No T-Light Candle products available yet.
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Add one from the admin panel.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>

      <div id="samplekit" className="scroll-margin-top-navbar flex justify-center items-center">
        <div className="p-6 animate-fade-up">
          <CustomCard
            title={<><span style={{ color: "#643F18", fontSize: "24px" }}>Free</span> Spa Wear Sample Kit{""}</>}
            text="Unsure which product suits your needs? Our sample kit includes all 7 items (1 piece each), so you can touch, compare, and decide with confidence completely free."
            imgSrc="/images/White_DU.png"
          />
        </div>
      </div>
    </div>
  );
}
