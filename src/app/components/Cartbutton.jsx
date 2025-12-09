"use client";

import { ShoppingCart } from "lucide-react";
import { cn } from "../utils";   // ← this line works in .js files too

export default function CartButton({ count = 0 }) {
  return (
    <a
      href="#"
      className={cn(
        "relative flex items-center gap-2 text-sm font-semibold",
        "text-black dark:text-white"
      )}
    >
      {/* Mobile only */}
      <div className="relative md:hidden">
        <ShoppingCart size={20} className="text-black dark:text-white" />
        {count > 0 && (
          <span
            className={cn(
              "absolute -top-1 -right-1 flex items-center justify-center",
              "w-3 h-3 text-[8px] font-bold rounded-full",
              "bg-white text-black border border-black"
            )}
          >
            {count}
          </span>
        )}
      </div>

      {/* Desktop */}
      <span
        className={cn(
          "hidden md:flex items-center gap-2 border border-black dark:border-white",
          "px-4 py-2 hover:bg-black hover:text-white",
          "dark:hover:bg-white dark:hover:text-black transition-colors"
        )}
      >
        <ShoppingCart size={16} />
        Cart
        {count > 0 && (
          <span
            className={cn(
              "ml-2 flex items-center justify-center",
              "w-4 h-4 text-[10px] font-bold rounded-full",
              "bg-white text-black border border-black"
            )}
          >
            {count}
          </span>
        )}
      </span>
    </a>
  );
}