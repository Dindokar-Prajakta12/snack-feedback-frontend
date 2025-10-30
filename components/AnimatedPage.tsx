"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function AnimatedPage({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
