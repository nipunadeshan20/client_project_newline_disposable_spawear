"use client";

import { useState } from "react";
import { X, Upload, AlertCircle } from "lucide-react";

export default function AddProductModal({
  onClose,
  onSave,
  editProduct = null,
  tlightExists = false,
}) {
  const isEditing = !!editProduct;
  const isEditingTLight = isEditing && editProduct?.category === "T-Light Candle";

  const [formData, setFormData] = useState({
    itemName: editProduct?.itemName || "",
    category: editProduct?.category || "",
    color: editProduct?.color || "",
    material: editProduct?.material || "",
    description: editProduct?.description || "",
    moreInfo: editProduct?.moreInfo || "",
  });

  const [images, setImages] = useState(editProduct?.images || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Define categories with T-Light availability
  const categories = [
    { value: "Fourway Material Wear", label: "Fourway Material Wear", disabled: false },
    { value: "Paper Material Wear", label: "Paper Material Wear", disabled: false },
    {
      value: "T-Light Candle",
      label: "T-Light Candle",
      // Disable if T-Light exists AND we're not editing an existing T-Light product
      disabled: tlightExists && !isEditingTLight,
    },
  ];

  const isTLight = formData.category === "T-Light Candle";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear color and material when switching to T-Light
    if (name === "category" && value === "T-Light Candle") {
      setFormData((prev) => ({ ...prev, [name]: value, color: "", material: "" }));
    }
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...images];
      newImages[index] = reader.result; // Base64 string
      setImages(newImages);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages.filter(Boolean));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.itemName.trim()) {
      setError("Item name is required");
      setLoading(false);
      return;
    }

    if (!formData.category) {
      setError("Category is required");
      setLoading(false);
      return;
    }

    // Check T-Light uniqueness
    if (formData.category === "T-Light Candle" && tlightExists && !isEditingTLight) {
      setError("A T-Light Candle product already exists. Only one is allowed.");
      setLoading(false);
      return;
    }

    try {
      const productData = {
        ...formData,
        images: images.filter(Boolean),
      };

      // Clear color and material for T-Light
      if (isTLight) {
        productData.color = null;
        productData.material = null;
      }

      await onSave(productData, editProduct?._id);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Item Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="e.g. Disposable Underwear"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option
                    key={cat.value}
                    value={cat.value}
                    disabled={cat.disabled}
                  >
                    {cat.label}
                    {cat.disabled ? " (Already exists)" : ""}
                  </option>
                ))}
              </select>
              {tlightExists && !isEditingTLight && (
                <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} />
                  T-Light Candle already exists (only one allowed)
                </p>
              )}
            </div>

            {/* Color - Only for Fourway & Paper */}
            {!isTLight && (
              <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="e.g. White, Black, Navy Blue"
                />
              </div>
            )}

            {/* Material - Only for Fourway & Paper */}
            {!isTLight && (
              <div>
                <label className="block text-sm font-medium mb-1">Material</label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="e.g. Fourway Stretch, Paper"
                />
              </div>
            )}

            {/* Description */}
            <div className={isTLight ? "md:col-span-2" : ""}>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-black resize-none"
                placeholder="e.g. Each pack contains 100 pieces."
              />
            </div>

            {/* More Info */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">More Info</label>
              <textarea
                name="moreInfo"
                value={formData.moreInfo}
                onChange={handleChange}
                rows={3}
                className="w-full border p-2 rounded focus:outline-none focus:ring-1 focus:ring-black resize-none"
                placeholder="e.g. Hygienic & individually wrapped. Perfect for travel & hospitals."
              />
            </div>

            {/* Images - Show only 1 for T-Light, 4 for others */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Product Images {isTLight ? "(1 image for T-Light)" : "(584×348 recommended)"}
              </label>
              <div className={`grid gap-3 ${isTLight ? "grid-cols-1 max-w-xs" : "grid-cols-2 md:grid-cols-4"}`}>
                {(isTLight ? [0] : [0, 1, 2, 3]).map((index) => (
                  <div
                    key={index}
                    className="relative border-2 border-dashed border-gray-300 rounded-lg aspect-[584/348] flex items-center justify-center bg-gray-50 overflow-hidden hover:border-gray-400 transition"
                  >
                    {images[index] ? (
                      <>
                        <img
                          src={images[index]}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                        >
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-gray-600 transition">
                        <Upload size={20} />
                        <span className="text-xs mt-1">
                          {isTLight ? "Upload Image" : `Image ${index + 1}`}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, index)}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border text-sm rounded hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : isEditing ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
