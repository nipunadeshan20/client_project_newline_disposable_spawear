"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // later: add authentication logic
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white shadow-md p-6 py-10 ">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/Black_logo.png" alt="Logo" className="h-10" />
        </div>

        <h1 className="text-xl font-semibold text-center mb-2">
          Admin Login
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign in to access the admin panel
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="admin@email.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 text-sm hover:bg-gray-900 transition"
          >
            Login
          </button>
        </form>

        {/* <p className="text-xs text-gray-400 text-center mt-6">
          © 2025 New Line. All rights reserved.
        </p> */}
      </div>
    </div>
  );
}
