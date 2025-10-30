"use client";

import { useState } from "react";
import api from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FaStar, FaUser, FaEnvelope, FaStore } from "react-icons/fa";
import { MdCake, MdComment } from "react-icons/md";

export default function CreateCustomer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    productVariant: "",
    rating: 3,
    comments: "",
    purchaseDate: "",
    store: "",
    wouldRecommend: false,
  });
  const [message, setMessage] = useState("");

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type, checked } = e.target;
//     setForm({ ...form, [name]: type === "checkbox" ? checked : value });
//   };


const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  const { name, value, type } = target;
  const checked = (target as HTMLInputElement).checked;

  setForm({ ...form, [name]: type === "checkbox" ? checked : value });
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/customers", form);
      setMessage("✅ Feedback submitted successfully!");
      setForm({
        name: "",
        email: "",
        age: "",
        gender: "",
        productVariant: "",
        rating: 3,
        comments: "",
        purchaseDate: "",
        store: "",
        wouldRecommend: false,
      });
    } catch {
      setMessage("❌ Failed to submit feedback.");
    }
  };

  const handleStarClick = (rating: number) => {
    setForm({ ...form, rating });
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-orange-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Section */}
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 border border-orange-200 transition-transform hover:scale-[1.01]">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-extrabold text-orange-600">Snack Feedback 🍿</h1>
              <p className="text-gray-600">We value your taste buds — share your thoughts below!</p>
            </div>

            {/* Status Message */}
            {message && (
              <p
                className={`mb-4 text-center font-semibold ${
                  message.includes("✅") ? "text-green-700" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              noValidate
            >
              {/* 👤 Name */}
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-orange-400" />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="border border-orange-300 p-3 pl-10 rounded-xl w-full focus:ring-2 focus:ring-orange-400 outline-none"
                  required
                />
              </div>

              {/* 📧 Email */}
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-orange-400" />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  type="email"
                  className="border border-orange-300 p-3 pl-10 rounded-xl w-full focus:ring-2 focus:ring-orange-400 outline-none"
                  required
                />
              </div>

              {/* 🎂 Age */}
              <div className="relative">
                <MdCake className="absolute top-3 left-3 text-orange-400" />
                <input
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Age"
                  type="number"
                  className="border border-orange-300 p-3 pl-10 rounded-xl w-full focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>

              {/* 🚻 Gender */}
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="border border-orange-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              {/* 🍪 Product Variant */}
              <input
                name="productVariant"
                value={form.productVariant}
                onChange={handleChange}
                placeholder="Product Variant"
                className="border border-orange-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
              />

              {/* 🏪 Store */}
              <div className="relative">
                <FaStore className="absolute top-3 left-3 text-orange-400" />
                <input
                  name="store"
                  value={form.store}
                  onChange={handleChange}
                  placeholder="Store Name"
                  className="border border-orange-300 p-3 pl-10 rounded-xl w-full focus:ring-2 focus:ring-orange-400 outline-none"
                />
              </div>

              {/* 📅 Purchase Date */}
              <input
                name="purchaseDate"
                value={form.purchaseDate}
                onChange={handleChange}
                type="date"
                className="border border-orange-300 p-3 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
              />

              {/* ⭐ Rating */}
              <div className="md:col-span-2 flex flex-col items-center mt-2">
                <label className="font-semibold text-gray-700 mb-2">Rate this snack ⭐</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={22}
                      className={`cursor-pointer transition-transform ${
                        star <= form.rating
                          ? "text-yellow-400 scale-110"
                          : "text-gray-300 hover:text-yellow-300"
                      }`}
                      onClick={() => handleStarClick(star)}
                    />
                  ))}
                </div>
              </div>

              {/* 💬 Comments */}
              <div className="relative md:col-span-2">
                <MdComment className="absolute top-3 left-3 text-orange-400" />
                <textarea
                  name="comments"
                  value={form.comments}
                  onChange={handleChange}
                  placeholder="Comments"
                  rows={3}
                  className="border border-orange-300 p-3 pl-10 rounded-xl w-full focus:ring-2 focus:ring-orange-400 outline-none resize-none"
                />
              </div>

              {/* ✅ Recommend */}
              <label className="flex items-center gap-2 md:col-span-2 text-gray-700">
                <input
                  type="checkbox"
                  name="wouldRecommend"
                  checked={form.wouldRecommend}
                  onChange={handleChange}
                  className="w-4 h-4 accent-orange-500"
                />
                Would recommend this snack 🍩
              </label>

              {/* 🚀 Submit */}
              <button
                type="submit"
                className="bg-orange-500 text-white py-3 px-6 rounded-2xl hover:bg-orange-600 transition-all md:col-span-2 shadow-md font-semibold"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
