"use client";
import { useToast } from "@/lib/store/toast";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const Toast = () => {
  const { message } = useToast();
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed md:bottom-6  bottom-15  w-full flex items-center justify-center"
        >
          <div className=" bg-black/75 text-white text-xs md:text-sm font-medium px-4 py-2 rounded-full shadow-lg z-50">
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
