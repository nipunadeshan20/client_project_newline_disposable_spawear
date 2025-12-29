"use client";

import { Check, X, Trash2 } from "lucide-react";

export default function OrdersTable({
  orders = [],
  loading = false,
  onConfirm,
  onCancel,
  onDelete,
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Canceled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">Order #</th>
              <th className="p-3">Customer</th>
              <th className="p-3">WhatsApp</th>
              <th className="p-3">Email</th>
              <th className="p-3">Country</th>
              <th className="p-3">Address</th>
              <th className="p-3">City</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="p-6 text-center text-gray-400">
                  Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-6 text-center text-gray-400">
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id || order.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{order.orderNumber || order.id}</td>
                  <td className="p-3">{order.name}</td>
                  <td className="p-3">{order.whatsapp}</td>
                  <td className="p-3">{order.email}</td>
                  <td className="p-3">{order.country}</td>
                  <td className="p-3">{order.address}</td>
                  <td className="p-3">{order.city}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onConfirm && onConfirm(order._id || order.id)}
                        title="Confirm"
                        disabled={order.status === "Confirmed"}
                        className={`p-1.5 rounded transition ${
                          order.status === "Confirmed"
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-green-600 hover:bg-green-50"
                        }`}
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => onCancel && onCancel(order._id || order.id)}
                        title="Cancel"
                        disabled={order.status === "Canceled"}
                        className={`p-1.5 rounded transition ${
                          order.status === "Canceled"
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-red-600 hover:bg-red-50"
                        }`}
                      >
                        <X size={16} />
                      </button>
                      <button
                        onClick={() => onDelete && onDelete(order._id || order.id)}
                        title="Delete"
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition"
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
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white shadow rounded p-6 text-center text-gray-400">
            No orders yet
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id || order.id}
              className="bg-white shadow rounded p-4 space-y-3"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Order #{order.orderNumber || order.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{order.name}</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">WhatsApp:</span>{" "}
                  <a
                    href={`https://wa.me/${order.whatsapp.replace(/\s/g, "").replace(/\+/g, "")}`}
                    className="text-green-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {order.whatsapp}
                  </a>
                </div>
                <div>
                  <span className="text-gray-500">Email:</span>{" "}
                  <a
                    href={`mailto:${order.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {order.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="text-sm">
                <span className="text-gray-500">Address:</span>{" "}
                <span>
                  {order.address}, {order.city}, {order.country}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t">
                <button
                  onClick={() => onConfirm && onConfirm(order._id || order.id)}
                  disabled={order.status === "Confirmed"}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm transition ${
                    order.status === "Confirmed"
                      ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                      : "text-green-600 bg-green-50 hover:bg-green-100"
                  }`}
                >
                  <Check size={14} />
                  <span>Confirm</span>
                </button>
                <button
                  onClick={() => onCancel && onCancel(order._id || order.id)}
                  disabled={order.status === "Canceled"}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm transition ${
                    order.status === "Canceled"
                      ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                      : "text-red-600 bg-red-50 hover:bg-red-100"
                  }`}
                >
                  <X size={14} />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={() => onDelete && onDelete(order._id || order.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-gray-600 bg-gray-50 hover:bg-gray-100 rounded text-sm transition"
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
