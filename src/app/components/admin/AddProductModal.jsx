"use client";

export default function AddProductModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Add New Product</h3>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <input className="border p-2" placeholder="Item Name" />
          <select className="border p-2">
            <option value="">Category</option>
            <option>Fourway</option>
            <option>Paper</option>
            <option>T-Light</option>
          </select>

          <input className="border p-2" placeholder="Color" />
          <input className="border p-2" placeholder="Material" />
          <input className="border p-2" placeholder="Title" />

          <textarea className="border p-2" placeholder="Description" />
          <textarea
            className="border p-2 md:col-span-2"
            placeholder="More Info"
          />

          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border p-2 text-xs">
              Image {i} (584×348)
              <input type="file" className="mt-2 w-full" />
            </div>
          ))}
        </form>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 border text-sm"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-black text-white text-sm">
            Save Item
          </button>
        </div>
      </div>
    </div>
  );
}
