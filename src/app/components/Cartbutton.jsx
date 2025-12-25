"use client";

import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  X,
  ArrowLeft,
  CheckCircle,
  Mail,
  MessageCircle,
  Download,
} from "lucide-react";
import CartItem from "./CartItem/CartItem";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    country: "",
    address: "",
    city: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null); // Store order after submission

  const { 
    cartItems, 
    isLoaded,
    getTotalCount, 
    getTotalPrice, 
    updateQuantity, 
    removeFromCart,
    clearCart
  } = useCart();

  const count = getTotalCount();
  const totalPrice = getTotalPrice();

  // Listen for openCart event (from Buy Now buttons)
  useEffect(() => {
    const handleOpenCart = () => setOpen(true);
    const handleOpenCheckout = () => {
      setOpen(true);
      setCheckout(true);
    };
    
    window.addEventListener('openCart', handleOpenCart);
    window.addEventListener('openCheckout', handleOpenCheckout);
    
    return () => {
      window.removeEventListener('openCart', handleOpenCart);
      window.removeEventListener('openCheckout', handleOpenCheckout);
    };
  }, []);

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Store items before clearing cart
    const orderItems = [...cartItems];
    const orderTotal = totalPrice;

    try {
      // Create order in database
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items: orderItems,
          total: orderTotal,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Store order details for confirmation page
        setOrderDetails({
          orderNumber: data.order?.orderNumber || Date.now(),
          orderId: data.order?._id || `ORD-${Date.now()}`,
          customerName: formData.name,
          whatsapp: formData.whatsapp,
          email: formData.email,
          country: formData.country,
          address: formData.address,
          city: formData.city,
          items: orderItems,
          total: orderTotal,
          date: new Date().toLocaleString(),
        });

        setSuccess(true);
        clearCart();
        setFormData({
          name: "",
          whatsapp: "",
          email: "",
          country: "",
          address: "",
          city: "",
        });
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Generate WhatsApp message with order details
  const getWhatsAppLink = () => {
    if (!orderDetails) return "https://wa.me/94770000000";
    
    const productList = orderDetails.items
      .map(item => `• ${item.itemName} (Qty: ${item.quantity})`)
      .join('\n');

    const message = `Hello! I just placed an order.\n\n` +
      `📋 Order ID: #${orderDetails.orderNumber}\n` +
      `👤 Name: ${orderDetails.customerName}\n\n` +
      `🛒 Products:\n${productList}\n\n` +
      `💰 Total: LKR ${orderDetails.total.toLocaleString()}\n\n` +
      `Please confirm my order. Thank you!`;

    return `https://wa.me/94770000000?text=${encodeURIComponent(message)}`;
  };

  // Generate Email link with order details
  const getEmailLink = () => {
    if (!orderDetails) return "mailto:seller@gmail.com";

    const productList = orderDetails.items
      .map(item => `- ${item.itemName} (Qty: ${item.quantity})`)
      .join('\n');

    const subject = `Order Confirmation - #${orderDetails.orderNumber}`;
    const body = `Hello,\n\n` +
      `I just placed an order and would like to confirm.\n\n` +
      `Order Details:\n` +
      `------------------------\n` +
      `Order ID: #${orderDetails.orderNumber}\n` +
      `Name: ${orderDetails.customerName}\n` +
      `Email: ${orderDetails.email}\n` +
      `WhatsApp: ${orderDetails.whatsapp}\n` +
      `Address: ${orderDetails.address}, ${orderDetails.city}, ${orderDetails.country}\n\n` +
      `Products:\n${productList}\n\n` +
      `Total: LKR ${orderDetails.total.toLocaleString()}\n` +
      `------------------------\n\n` +
      `Please confirm my order.\n\nThank you!`;

    return `mailto:seller@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Generate and download PDF
  const handleDownloadPDF = async () => {
    if (!orderDetails) return;

    // Create PDF content using browser print
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order #${orderDetails.orderNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 20px; }
          .logo { font-size: 24px; font-weight: bold; }
          .order-id { font-size: 14px; color: #666; margin-top: 10px; }
          .section { margin-bottom: 20px; }
          .section-title { font-weight: bold; font-size: 14px; color: #333; margin-bottom: 8px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
          .detail-row { display: flex; justify-content: space-between; padding: 5px 0; font-size: 13px; }
          .detail-label { color: #666; }
          .product-item { padding: 10px 0; border-bottom: 1px solid #eee; }
          .product-name { font-weight: 500; }
          .product-details { font-size: 12px; color: #666; }
          .total-row { font-size: 16px; font-weight: bold; margin-top: 15px; padding-top: 15px; border-top: 2px solid #000; display: flex; justify-content: space-between; }
          .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">NEW LINE</div>
          <div class="order-id">Order Confirmation</div>
        </div>

        <div class="section">
          <div class="section-title">Order Information</div>
          <div class="detail-row">
            <span class="detail-label">Order ID:</span>
            <span>#${orderDetails.orderNumber}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Date:</span>
            <span>${orderDetails.date}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Customer Details</div>
          <div class="detail-row">
            <span class="detail-label">Name:</span>
            <span>${orderDetails.customerName}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">WhatsApp:</span>
            <span>${orderDetails.whatsapp}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Email:</span>
            <span>${orderDetails.email}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Address:</span>
            <span>${orderDetails.address}, ${orderDetails.city}, ${orderDetails.country}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Products</div>
          ${orderDetails.items.map(item => `
            <div class="product-item">
              <div class="product-name">${item.itemName}</div>
              <div class="product-details">
                ${item.color ? `Color: ${item.color} | ` : ''}
                ${item.category} | 
                Qty: ${item.quantity} | 
                LKR ${((item.pricePerPack || 4500) * item.quantity).toLocaleString()}
              </div>
            </div>
          `).join('')}
          <div class="total-row">
            <span>Total:</span>
            <span>LKR ${orderDetails.total.toLocaleString()}</span>
          </div>
        </div>

        <div class="footer">
          <p>Thank you for your order!</p>
          <p>The seller will contact you within 1 hour to confirm.</p>
          <p>© ${new Date().getFullYear()} New Line. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load then trigger print
    printWindow.onload = () => {
      printWindow.print();
      // Close window after a delay (user might cancel print)
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    };
  };

  return (
    <>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-2 text-sm font-semibold text-black dark:text-white"
      >
        {/* Mobile */}
        <div className="relative md:hidden">
          <ShoppingCart size={20} />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-3 h-3 text-[8px] font-bold rounded-full bg-white text-black border border-black">
              {count}
            </span>
          )}
        </div>

        {/* Desktop */}
        <span className="hidden md:flex items-center gap-2 border border-black dark:border-white px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
          <ShoppingCart size={16} />
          Cart
          {count > 0 && (
            <span className="w-4 h-4 ml-1 flex items-center justify-center text-[10px] font-bold rounded-full bg-white text-black border border-black">
              {count}
            </span>
          )}
        </span>
      </button>

      {/* CART DRAWER */}
      <div
        className={`fixed top-0 right-0 h-screen 
          w-full sm:w-[320px] md:w-[380px]
          bg-white shadow-xl z-[9999]
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
          flex flex-col`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-5 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            {success
              ? "Order Status"
              : checkout
              ? "Customer Details"
              : "Your Cart"}
          </h2>

          <button
            onClick={() => {
              setOpen(false);
              setCheckout(false);
              setSuccess(false);
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="pt-2 flex-1 overflow-y-auto bg-gray-100">
          {!checkout && !success && (
            /* ---------- CART ITEMS ---------- */
            <div className="p-5 flex flex-col gap-6 text-sm bg-white">
              {!isLoaded ? (
                <div className="text-center py-8 text-gray-500">
                  Loading cart...
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart size={48} className="mx-auto mb-3 text-gray-300" />
                  <p>Your cart is empty</p>
                  <p className="text-sm mt-1">Add some products to get started</p>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={`${item.productId}-${item.color || index}`}>
                    <CartItem 
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                    {index < cartItems.length - 1 && (
                      <hr className="border-gray-300 mt-6" />
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {checkout && !success && (
            /* ---------- CHECKOUT FORM ---------- */
            <div className="p-5 bg-white">
              <button
                className="flex items-center gap-1 text-sm text-gray-700 mb-4"
                onClick={() => setCheckout(false)}
              >
                <ArrowLeft size={18} /> Back
              </button>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-[14px]"
              >
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Full Name *"
                  className="border p-2"
                />
                <input
                  required
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleFormChange}
                  placeholder="WhatsApp Number *"
                  className="border p-2"
                />
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Email Address *"
                  className="border p-2"
                />
                <input
                  required
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleFormChange}
                  placeholder="Country *"
                  className="border p-2"
                />
                <input
                  required
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  placeholder="Address *"
                  className="border p-2"
                />
                <input
                  required
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                  placeholder="City *"
                  className="border p-2"
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 mt-2 text-[14px] font-medium disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Order"}
                </button>
              </form>
            </div>
          )}

          {success && (
            /* ---------- SUCCESS MESSAGE ---------- */
            <div className="p-5 bg-white text-center">
              <button
                className="flex items-center gap-1 text-sm text-gray-700 mb-4"
                onClick={() => {
                  setSuccess(false);
                  setCheckout(false);
                  setOpen(false);
                }}
              >
                <ArrowLeft size={18} /> Close
              </button>
              <div className="py-5 mb-4">
                <CheckCircle
                  size={48}
                  className="mx-auto text-green-600 mb-3"
                />

                <h3 className="text-lg font-semibold text-green-600">
                  Order Successful
                </h3>

                {orderDetails && (
                  <p className="text-[14px] mt-2 text-gray-800 font-medium">
                    Order ID: #{orderDetails.orderNumber}
                  </p>
                )}

                <p className="text-[12px] mt-2 text-gray-700">
                  For confirmation, <br/> the seller will contact you within{" "}
                  <b>1 hour</b>.
                </p>
              </div>

              {/* Download PDF Button */}
              <button
                onClick={handleDownloadPDF}
                className="flex items-center justify-center gap-2 w-full bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 text-[13px] font-medium rounded mb-4"
              >
                <Download size={16} /> Download Order PDF
              </button>

              <div className="bg-gray-100 py-4 mb-4 rounded">
                <p className="text-[12px] text-gray-600">
                  For any questions, contact the seller through :
                </p>

                <div className="flex justify-center gap-4 mt-3">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    className="flex items-center gap-2 bg-green-200 text-green-600 px-4 py-2 text-[12px] font-medium rounded"
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>

                  <a
                    href={getEmailLink()}
                    className="flex items-center gap-2 bg-blue-200 text-blue-600 font-medium px-4 py-2 text-[12px] rounded"
                  >
                    <Mail size={16} /> Send Email
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        {!checkout && !success && cartItems.length > 0 && (
          <div className="w-full bottom-0 right-0 bg-white border-t border-gray-300 px-5 py-4 flex justify-between items-center">
            <div className="text-sm">
              <span className="font-medium text-[12px] pr-1">Total :</span>
              <span className="font-bold text-[16px]">LKR {totalPrice.toLocaleString()}</span>
            </div>

            <button
              onClick={() => setCheckout(true)}
              className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 text-[14px] font-medium"
            >
              Place Order
            </button>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/30 z-[9998]"
          onClick={() => {
            setOpen(false);
            setCheckout(false);
            setSuccess(false);
          }}
        />
      )}
    </>
  );
}
