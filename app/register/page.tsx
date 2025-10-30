"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, email, password });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-50 text-gray-800 overflow-hidden">
      {/* LEFT SIDE - IMAGE PANEL (same as login) */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">
        <img
          src="https://m.media-amazon.com/images/I/81ZX-dvnU1L._AC_UF894,1000_QL80_.jpg"
          alt="Snack Banner"
          className="absolute w-full h-full object-cover opacity-100"
        />
      </div>

      {/* RIGHT SIDE - REGISTER FORM with animation */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex w-full lg:w-1/2 items-center justify-center p-10"
        style={{ backgroundColor: "#f5f7f6" }}
      >
        <div className="bg-white/70 backdrop-blur-sm p-10 rounded-3xl shadow-xl w-full max-w-md border border-pink-100">
          <h2 className="text-3xl font-bold text-center mb-3 text-rose-600">
            Create Your Account 🌸
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Join our snack community and share your tasty experiences!
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* USERNAME */}
            <div className="relative">
              <FaUser className="absolute left-4 top-3.5 text-rose-400" />
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-pink-50 text-gray-800 rounded-xl pl-10 pr-4 py-3 border border-pink-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 outline-none transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3.5 text-rose-400" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-pink-50 text-gray-800 rounded-xl pl-10 pr-4 py-3 border border-pink-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-rose-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-pink-50 text-gray-800 rounded-xl pl-10 pr-4 py-3 border border-pink-200 focus:border-rose-400 focus:ring-1 focus:ring-rose-400 outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-400 to-orange-300 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              Sign Up
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-pink-200" />
            <span className="px-3 text-sm text-gray-400">or</span>
            <div className="flex-grow h-px bg-pink-200" />
          </div>

          

          {/* LINK TO LOGIN */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <span
              className="text-rose-500 hover:underline cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
