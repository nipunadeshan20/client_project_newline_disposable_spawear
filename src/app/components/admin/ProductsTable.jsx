"use client";

import { Edit, Trash2, Check, Image as ImageIcon } from "lucide-react";

export default function ProductsTable({
  products = [],
  onAdd,
  onEdit,
  onDelete,
  onToggleActive,
  loading = false,
}) {
  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case "Fourway Material Wear":
        return "bg-blue-100 text-blue-700";
      case "Paper Material Wear":
        return "bg-green-100 text-green-700";
      case "T-Light Candle":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryShortName = (category) => {
    switch (category) {
      case "Fourway Material Wear":
        return "Fourway";
      case "Paper Material Wear":
        return "Paper";
      case "T-Light Candle":
        return "T-Light";
      default:
        return category;
    }
  };

  const truncateText = (text, maxLength = 30) => {
    if (!text) return "-";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-lg md:text-xl font-semibold">Products Management</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800 transition w-full sm:w-auto justify-center"
        >
          <span className="text-lg leading-none">+</span> Add Item
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Item Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Color</th>
              <th className="p-3 text-left">Material</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">More Info</th>
              <th className="p-3 text-center">Images</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="10" className="p-6 text-center text-gray-400">
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="10" className="p-6 text-center text-gray-400">
                  No products added yet
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 text-gray-600">{index + 1}</td>
                  <td className="p-3 font-medium">{product.itemName}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getCategoryBadgeColor(
                        product.category
                      )}`}
                    >
                      {getCategoryShortName(product.category)}
                    </span>
                  </td>
                  <td className="p-3">
                    {product.category === "T-Light Candle" ? (
                      <span className="text-gray-400">N/A</span>
                    ) : (
                      product.color || "-"
                    )}
                  </td>
                  <td className="p-3">
                    {product.category === "T-Light Candle" ? (
                      <span className="text-gray-400">N/A</span>
                    ) : (
                      product.material || "-"
                    )}
                  </td>
                  <td className="p-3 max-w-[150px]">
                    <span title={product.description}>
                      {truncateText(product.description)}
                    </span>
                  </td>
                  <td className="p-3 max-w-[150px]">
                    <span title={product.moreInfo}>
                      {truncateText(product.moreInfo)}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {product.images && product.images.length > 0 ? (
                      <div className="flex items-center justify-center gap-1">
                        <ImageIcon size={16} className="text-gray-500" />
                        <span className="text-gray-600">{product.images.length}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">0</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        product.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onToggleActive(product._id, !product.isActive)}
                        title={product.isActive ? "Deactivate" : "Activate"}
                        className={`p-1.5 rounded transition ${
                          product.isActive
                            ? "text-green-600 hover:bg-green-50"
                            : "text-gray-400 hover:bg-gray-100"
                        }`}
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => onEdit(product)}
                        title="Edit"
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(product._id)}
                        title="Delete"
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-4">
        {loading ? (
          <div className="bg-white shadow rounded p-6 text-center text-gray-400">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white shadow rounded p-6 text-center text-gray-400">
            No products added yet
          </div>
        ) : (
          products.map((product, index) => (
            <div
              key={product._id}
              className="bg-white shadow rounded p-4 space-y-3"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-gray-500 text-sm">#{index + 1}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryBadgeColor(
                        product.category
                      )}`}
                    >
                      {getCategoryShortName(product.category)}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        product.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base mt-1">{product.itemName}</h3>
                </div>
                {/* Images indicator */}
                {product.images && product.images.length > 0 && (
                  <div className="flex items-center gap-1 text-gray-500">
                    <ImageIcon size={16} />
                    <span className="text-sm">{product.images.length}</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                {product.category !== "T-Light Candle" && (
                  <>
                    <div>
                      <span className="text-gray-500">Color:</span>{" "}
                      <span className="font-medium">{product.color || "-"}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Material:</span>{" "}
                      <span className="font-medium">{product.material || "-"}</span>
                    </div>
                  </>
                )}
              </div>

              {product.description && (
                <div className="text-sm">
                  <span className="text-gray-500">Description:</span>{" "}
                  <span>{product.description}</span>
                </div>
              )}

              {product.moreInfo && (
                <div className="text-sm">
                  <span className="text-gray-500">More Info:</span>{" "}
                  <span>{product.moreInfo}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t">
                <button
                  onClick={() => onToggleActive(product._id, !product.isActive)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm transition ${
                    product.isActive
                      ? "text-green-600 bg-green-50 hover:bg-green-100"
                      : "text-gray-500 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <Check size={14} />
                  <span>{product.isActive ? "Active" : "Inactive"}</span>
                </button>
                <button
                  onClick={() => onEdit(product)}
                  className="flex items-center gap-1 px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded text-sm transition"
                >
                  <Edit size={14} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => onDelete(product._id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded text-sm transition"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
