"use client";

import { Edit, Trash, Plus } from "lucide-react";

export default function ProductsTable({ onAdd }) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products Management</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 text-sm"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Item Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Color</th>
              <th className="p-3">Material</th>
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">More Info</th>
              <th className="p-3">Images</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t text-center text-gray-400">
              <td colSpan="10" className="p-6">
                No products added yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
