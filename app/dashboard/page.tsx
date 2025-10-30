"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get("/customers/stats").then((res) => setStats(res.data));
  }, []);

  if (!stats) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 items-center justify-center">
          <p className="text-lg text-gray-700 font-semibold animate-pulse">🍿 Loading snack stats...</p>
        </div>
      </ProtectedRoute>
    );
  }

  // Mock chart data
  const barData = {
    labels: ["1★", "2★", "3★", "4★", "5★"],
    datasets: [
      {
        label: "Ratings Count",
        data: [5, 8, 12, 20, 30], // You can replace this with actual distribution if available
        backgroundColor: [
          "#FF6B6B",
          "#FFA94D",
          "#FFD93D",
          "#6BCB77",
          "#4D96FF",
        ],
        borderRadius: 6,
      },
    ],
  };

  const doughnutData = {
    labels: ["Would Recommend", "Would Not Recommend"],
    datasets: [
      {
        label: "Recommendation %",
        data: [stats.recommendPercent, 100 - stats.recommendPercent],
        backgroundColor: ["#6BCB77", "#FF6B6B"],
        hoverOffset: 6,
      },
    ],
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-red-100">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-extrabold text-orange-600 mb-6 flex items-center gap-3">
            🍟 Snack Feedback Dashboard
          </h1>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow-lg hover:shadow-xl transition-all p-6 rounded-2xl text-center border-t-4 border-yellow-400">
              <h2 className="text-lg font-semibold text-gray-700">Total Feedbacks</h2>
              <p className="text-4xl font-extrabold text-yellow-500 mt-2">{stats.total}</p>
              <p className="text-sm text-gray-500 mt-1">🍿 Total customer reviews</p>
            </div>

            <div className="bg-white shadow-lg hover:shadow-xl transition-all p-6 rounded-2xl text-center border-t-4 border-orange-400">
              <h2 className="text-lg font-semibold text-gray-700">Average Rating</h2>
              <p className="text-4xl font-extrabold text-orange-500 mt-2">{stats.avgRating}</p>
              <p className="text-sm text-gray-500 mt-1">🌮 Based on user feedback</p>
            </div>

            <div className="bg-white shadow-lg hover:shadow-xl transition-all p-6 rounded-2xl text-center border-t-4 border-red-400">
              <h2 className="text-lg font-semibold text-gray-700">Recommend %</h2>
              <p className="text-4xl font-extrabold text-red-500 mt-2">
                {stats.recommendPercent}%
              </p>
              <p className="text-sm text-gray-500 mt-1">🥤 Would buy again!</p>
            </div>
          </div>



          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {/* ⭐ Rating Distribution */}
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <h3 className="text-xl font-bold text-gray-700 mb-4">
      ⭐ Rating Distribution
    </h3>
    <div className="relative h-56"> {/* Reduced height */}
      <Bar
        data={barData}
        options={{
          responsive: true,
          maintainAspectRatio: false, // allows custom height
          plugins: { legend: { display: false } },
          scales: {
            y: {
              ticks: { stepSize: 5 },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  </div>

  {/* ❤️ Recommendation Overview */}
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <h3 className="text-xl font-bold text-gray-700 mb-4">
      ❤️ Recommendation Overview
    </h3>
    <div className="flex justify-center h-56 w-full"> {/* Centered and smaller */}
      <div className="w-64 h-64"> {/* Fixed smaller size */}
        <Doughnut
          data={doughnutData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: { boxWidth: 12 },
              },
            },
          }}
        />
      </div>
    </div>
  </div>
</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
