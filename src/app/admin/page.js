"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import OrdersTable from "../components/admin/OrdersTable";
import ProductsTable from "../components/admin/ProductsTable";
import AddProductModal from "../components/admin/AddProductModal";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("orders");
  const [showAddProduct, setShowAddProduct] = useState(false);

  const orders = [
    {
      id: 1001,
      name: "Nipuna Bandara",
      whatsapp: "+94 77 123 4567",
      email: "nipuna@gmail.com",
      country: "Sri Lanka",
      address: "123 Main Street",
      city: "Colombo",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* NAVBAR */}
      <header className="bg-black text-white px-8 py-6 flex items-center relative">
        <div className="text-sm font-medium">Admin Panel</div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <img src="/logo.png" alt="Logo" className="h-8" />
        </div>

        <button className="ml-auto flex items-center gap-2 text-sm">
          <LogOut size={18} /> Logout
        </button>
      </header>

      {/* TABS */}
      <div className="bg-white border-b border-gray-300 px-8">
        <div className="flex gap-6 justify-center">
          <button
            onClick={() => setActiveTab("orders")}
            className={`py-4 text-sm border-b-2 ${
              activeTab === "orders"
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            }`}
          >
            Order Management
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`py-4 text-sm border-b-2 ${
              activeTab === "products"
                ? "border-black text-black"
                : "border-transparent text-gray-500"
            }`}
          >
            Product Management
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <main className="flex-1 p-8">
        {activeTab === "orders" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Orders Management</h2>
            <OrdersTable orders={orders} />
          </>
        )}

        {activeTab === "products" && (
          <ProductsTable onAdd={() => setShowAddProduct(true)} />
        )}
      </main>

      {/* MODAL */}
      {showAddProduct && (
        <AddProductModal onClose={() => setShowAddProduct(false)} />
      )}

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-500 py-4">
        © 2025 New Line. All rights reserved.
      </footer>
    </div>
  );
}
