"use client";

import { Plus, Minus, Trash } from "lucide-react";
import "./CartItem.css";

export default function CartItem({ 
  item,
  onUpdateQuantity,
  onRemove,
}) {
  if (!item) return null;

  const totalPrice = (item.pricePerPack || 4500) * item.quantity;
  
  // Display info based on category
  const displayColor = item.color || "N/A";
  const displayMaterial = item.material || item.category;
  const isSampleKit = item.isSampleKit;

  return (
    <div className="flex gap-3">
      {/* Image */}
      <img
        src={item.image || "/images/White_DU.png"}
        className="w-24 h-20 object-cover responsive-img rounded"
        alt={item.itemName}
      />

      {/* Details */}
      <div className="flex flex-col justify-between w-full">
        <div>
          <div className="flex items-start justify-between">
            <p className="font-semibold text-[14px]">{item.itemName}</p>

            {/* Delete Icon */}
            <button
              onClick={() => onRemove && onRemove(item.productId, item.color)}
              className="text-gray-500 hover:text-red-600 transition"
            >
              <Trash size={16} />
            </button>
          </div>

          {/* Color & Material */}
          {!isSampleKit && (
            <div>
              {item.color && (
                <>
                  <span className="text-gray-700 text-[10px]">{displayColor}</span>
                  <span className="text-gray-700 text-[10px]"> | </span>
                </>
              )}
              <span className="text-gray-700 text-[10px]">{displayMaterial}</span>
            </div>
          )}
          {isSampleKit && (
            <span className="text-green-600 text-[10px] font-medium">Free Sample Kit</span>
          )}
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
                  if (item.quantity > 1 && onUpdateQuantity) {
                    onUpdateQuantity(item.productId, item.color, item.quantity - 1);
                  }
                }}
                disabled={isSampleKit}
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-12 text-center font-semibold text-[12px]">
                {item.quantity}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onUpdateQuantity) {
                    onUpdateQuantity(item.productId, item.color, item.quantity + 1);
                  }
                }}
                disabled={isSampleKit}
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="text-right">
            {isSampleKit ? (
              <span className="text-sm md:text-base font-bold text-green-600">FREE</span>
            ) : (
              <>
                <span className="text-[10px] text-gray-500">LKR</span>
                <span className="text-sm md:text-base font-bold text-gray-900 ml-1">
                  {totalPrice.toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
