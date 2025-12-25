"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import OrdersTable from "../components/admin/OrdersTable";
import ProductsTable from "../components/admin/ProductsTable";
import AddProductModal from "../components/admin/AddProductModal";

export default function AdminPage() {
  const router = useRouter();

  // Start with null to indicate "not yet initialized"
  const [activeTab, setActiveTab] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check if T-Light Candle already exists
  const tlightExists = products.some((p) => p.category === "T-Light Candle");

  // Initialize activeTab from localStorage on mount (client-side only)
  useEffect(() => {
    // Check URL params first
    const urlParams = new URLSearchParams(window.location.search);
    const urlTab = urlParams.get("tab");
    
    if (urlTab === "products" || urlTab === "orders") {
      setActiveTab(urlTab);
      localStorage.setItem("adminActiveTab", urlTab);
    } else {
      // Then check localStorage
      const savedTab = localStorage.getItem("adminActiveTab");
      if (savedTab === "products" || savedTab === "orders") {
        setActiveTab(savedTab);
      } else {
        setActiveTab("orders");
      }
    }
    setIsInitialized(true);
  }, []);

  // Persist activeTab to localStorage and URL when it changes
  useEffect(() => {
    if (activeTab && isInitialized) {
      localStorage.setItem("adminActiveTab", activeTab);
      // Update URL without navigation
      const url = new URL(window.location.href);
      url.searchParams.set("tab", activeTab);
      window.history.replaceState({}, "", url.toString());
    }
  }, [activeTab, isInitialized]);

  // Fetch products
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  // Handle add product
  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  // Handle edit product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  // Handle save product (create or update)
  const handleSaveProduct = async (productData, productId = null) => {
    const url = productId ? `/api/products/${productId}` : "/api/products";
    const method = productId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    // Refresh products list
    await fetchProducts();
  };

  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        await fetchProducts();
      } else {
        alert(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  // Handle toggle active status
  const handleToggleActive = async (productId, isActive) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });

      const data = await res.json();

      if (data.success) {
        await fetchProducts();
      } else {
        alert(data.message || "Failed to update product status");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product status");
    }
  };

  // Handle order status change
  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        await fetchOrders();
      } else {
        alert(data.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order status");
    }
  };

  // Handle delete order
  const handleDeleteOrder = async (orderId) => {
    if (!confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        await fetchOrders();
      } else {
        alert(data.message || "Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order");
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setShowProductModal(false);
    setEditingProduct(null);
  };

  // Show loading state while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* NAVBAR */}
      <header className="bg-black text-white px-4 md:px-8 py-4 md:py-6 flex items-center relative">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1 mr-2"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="text-sm font-medium hidden md:block">Admin Panel</div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <img src="/logo.png" alt="Logo" className="h-6 md:h-8" />
        </div>

        <button
          onClick={handleLogout}
          className="ml-auto flex items-center gap-2 text-sm hover:text-gray-300 transition"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </header>

      {/* TABS - Desktop */}
      <div className="hidden md:block bg-white border-b border-gray-300 px-8">
        <div className="flex gap-6 justify-center">
          <button
            onClick={() => setActiveTab("orders")}
            className={`py-4 text-sm border-b-2 transition ${
              activeTab === "orders"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Order Management
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`py-4 text-sm border-b-2 transition ${
              activeTab === "products"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Product Management
          </button>
        </div>
      </div>

      {/* TABS - Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-300 shadow-lg">
          <button
            onClick={() => {
              setActiveTab("orders");
              setMobileMenuOpen(false);
            }}
            className={`w-full py-3 px-4 text-left text-sm border-b ${
              activeTab === "orders"
                ? "bg-gray-100 text-black font-medium"
                : "text-gray-600"
            }`}
          >
            Order Management
          </button>
          <button
            onClick={() => {
              setActiveTab("products");
              setMobileMenuOpen(false);
            }}
            className={`w-full py-3 px-4 text-left text-sm ${
              activeTab === "products"
                ? "bg-gray-100 text-black font-medium"
                : "text-gray-600"
            }`}
          >
            Product Management
          </button>
        </div>
      )}

      {/* Mobile Tab Indicator */}
      <div className="md:hidden bg-white border-b border-gray-300 px-4 py-2">
        <span className="text-sm font-medium text-gray-700">
          {activeTab === "orders" ? "Order Management" : "Product Management"}
        </span>
      </div>

      {/* CONTENT */}
      <main className="flex-1 p-4 md:p-8 overflow-x-auto">
        {activeTab === "orders" && (
          <>
            <h2 className="text-lg md:text-xl font-semibold mb-4">Orders Management</h2>
            <OrdersTable
              orders={orders}
              loading={loadingOrders}
              onConfirm={(orderId) => handleOrderStatusChange(orderId, "Confirmed")}
              onCancel={(orderId) => handleOrderStatusChange(orderId, "Canceled")}
              onDelete={handleDeleteOrder}
            />
          </>
        )}

        {activeTab === "products" && (
          <ProductsTable
            products={products}
            loading={loadingProducts}
            onAdd={handleAddProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onToggleActive={handleToggleActive}
          />
        )}
      </main>

      {/* MODAL */}
      {showProductModal && (
        <AddProductModal
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
          editProduct={editingProduct}
          tlightExists={tlightExists}
        />
      )}

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-500 py-4">
        © 2025 New Line. All rights reserved.
      </footer>
    </div>
  );
}
