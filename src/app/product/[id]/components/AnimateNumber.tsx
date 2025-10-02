import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

export const AnimatedNumber = ({ value }: { value: number }) => {
  const digits = String(value).split(""); // split number into digits

  return (
    <span className="flex space-x-0.5 font-semibold text-gray-900">
      {digits.map((digit, index) => (
        <AnimatePresence mode="popLayout" key={index}>
          <motion.span
            key={digit + index} // key ensures it re-renders on change
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="inline-block"
          >
            {digit}
          </motion.span>
        </AnimatePresence>
      ))}
    </span>
  );
};
