"use client";

import { useState } from "react";
import { Plus, Minus, Trash } from "lucide-react";
import "./CartItem.css";

export default function CartItem({ initialPacks = 1, pricePerPack = 4500 }) {
  const [packs, setPacks] = useState(initialPacks);
  const totalPrice = pricePerPack * packs;
  return (
    <div className="flex gap-3">
      {/* Checkbox */}
      <input
        type="checkbox"
        className="w-4 h-4 mt-2 cursor-pointer"
        defaultChecked
      />

      {/* Image */}
      <img
        src="/images/White_DU.png"
        className="w-24 h-20 object-cover responsive-img"
        alt="Product"
      />

      {/* Details */}
      <div className="flex flex-col justify-between w-full">
        <div>
          <div className="flex items-start justify-between">
            <p className="font-semibold text-[14px]">Disposable Underwear</p>

            {/* Delete Icon */}
            <button
              onClick={() => console.log("delete clicked")}
              className="text-gray-500 hover:text-red-600 transition"
            >
              <Trash size={16} />
            </button>
          </div>

          {/* Color */}
          <div>
            <span className=" text-gray-700 text-[10px]">White</span>
            <span className=" text-gray-700 text-[10px]"> | </span>
            <span className=" text-gray-700 text-[10px]">Fourway material</span>
          </div>
        </div>

        {/* Packs & Pricing */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-medium text-gray-600">
              Packs :
            </span>
            <div className="w-[70px] h-[30px] sm:w-[80px] sm:h-[35px] md:w-[90px] md:h-[40px] lg:w-[60px] lg:h-[30px] flex items-center border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  packs > 1 && setPacks(packs - 1);
                }}
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-12 text-center font-semibold text-[12px]">
                {packs}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPacks(packs + 1);
                }}
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-gray-500">LKR</span>
            <span className="text-sm md:text-base font-bold text-gray-900 ml-1">
              {totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
