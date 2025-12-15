"use client";

import { Check, X, Trash } from "lucide-react";

export default function OrdersTable({ orders }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded">
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
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="p-3">{order.id}</td>
              <td className="p-3">{order.name}</td>
              <td className="p-3">{order.whatsapp}</td>
              <td className="p-3">{order.email}</td>
              <td className="p-3">{order.country}</td>
              <td className="p-3">{order.address}</td>
              <td className="p-3">{order.city}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    order.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Canceled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-3 flex gap-2">
                <button className="text-green-600 hover:text-green-800">
                  <Check size={16} />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <X size={16} />
                </button>
                <button className="text-gray-600 hover:text-black">
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
