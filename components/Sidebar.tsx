"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Utensils, Star, Users, LogOut, LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/create-customer", label: "Create Feedback", icon: <Star size={20} /> },
    { href: "/view-customers", label: "View Feedback", icon: <Users size={20} /> },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-yellow-400 via-orange-400 to-pink-400 text-white p-6 flex flex-col min-h-screen shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-2 mb-10">
        <Utensils className="text-white" size={26} />
        <h2 className="text-2xl font-bold drop-shadow-sm">Snack Feedback</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-3">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 ${
              pathname === link.href
                ? "bg-white/30 text-white font-semibold"
                : "hover:bg-white/20"
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Decorative Footer */}
      <div className="mt-auto pt-10 border-t border-white/30">
        <div className="flex items-center justify-between">
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Small snack emojis for fun */}
        <div className="mt-6 text-center text-sm opacity-90">
          🍕🍪 Powered by <span className="font-semibold">Snack Lovers</span>
        </div>
      </div>
    </aside>
  );
}
