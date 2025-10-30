"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import DataTable from "react-data-table-component";

export default function ViewCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/customers")
      .then((res) => setCustomers(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  // 🌈 Table Columns
  const columns = [
    {
      name: "👤 Name",
      selector: (row: any) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "📧 Email",
      selector: (row: any) => row.email,
      sortable: true,
      wrap: true,
    },
    {
      name: "🍪 Product",
      selector: (row: any) => row.productVariant || "—",
      sortable: true,
      wrap: true,
    },
    {
      name: "⭐ Rating",
      selector: (row: any) => row.rating,
      sortable: true,
      center: true,
      cell: (row: any) => (
        <div
          className={`px-3 py-1 rounded-full font-semibold text-sm ${
            row.rating >= 4
              ? "bg-green-100 text-green-700"
              : row.rating === 3
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.rating} ★
        </div>
      ),
    },
    {
      name: "❤️ Recommend",
      selector: (row: any) => (row.wouldRecommend ? "Yes" : "No"),
      sortable: true,
      center: true,
      cell: (row: any) => (
        <span
          className={`px-3 py-1 rounded-full font-semibold text-sm ${
            row.wouldRecommend
              ? "bg-pink-100 text-pink-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {row.wouldRecommend ? "Yes" : "No"}
        </span>
      ),
    },
  ];

  // 🍭 Custom Table Styles
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#fb923c", // orange-400
        color: "white",
        fontSize: "16px",
        fontWeight: "700",
      },
    },
    rows: {
      style: {
        minHeight: "60px",
        backgroundColor: "#fffaf0",
        "&:nth-of-type(odd)": {
          backgroundColor: "#fff7ed", // light orange shade
        },
        "&:hover": {
          backgroundColor: "#ffedd5", // orange-100 hover
          cursor: "pointer",
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: "#fff7ed",
        borderTop: "1px solid #fde68a",
        color: "#78350f",
        fontWeight: "600",
      },
    },
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100">
        <Sidebar />
        <main className="flex-1 p-6 md:p-10">
          <h1 className="text-3xl font-extrabold text-orange-600 mb-6">
            Customer Feedback 🍟
          </h1>

          <div className="bg-white rounded-2xl shadow-xl p-4 border border-orange-200">
            <DataTable
              title="Customer Reviews"
              columns={columns}
              data={customers}
              progressPending={loading}
              pagination
              highlightOnHover
              responsive
              customStyles={customStyles}
              striped
            />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
