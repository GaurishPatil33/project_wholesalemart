import { motion } from "framer-motion";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-8">
        {/* Logo Container with Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.6,
          }}
          className="relative"
        >
          {/* Pulsing Circle Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Logo Circle */}
          <motion.div
            className="relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full p-8 shadow-2xl"
            animate={{
              boxShadow: [
                "0 20px 60px -15px rgba(99, 102, 241, 0.3)",
                "0 20px 60px -15px rgba(147, 51, 234, 0.5)",
                "0 20px 60px -15px rgba(99, 102, 241, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* <ShoppingBag className="w-16 h-16 text-white" strokeWidth={1.5} /> */}
            <img
              src={"/logos/ram.png"}
              alt=""
              className="w-20 h-20 rounded-full object-cover"
            />
          </motion.div>

          {/* Orbiting Dots */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
              style={{
                originX: 0.5,
                originY: 0.5,
                x: Math.cos((i * 120 * Math.PI) / 180) * 60,
                y: Math.sin((i * 120 * Math.PI) / 180) * 60,
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.5, 1],
              }}
              transition={{
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.4,
                },
                scale: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                },
              }}
            />
          ))}
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            ShopLuxe
          </h1>
          <p className="text-gray-600 text-sm font-medium">
            Premium Shopping Experience
          </p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ width: "50%" }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center space-x-2"
        >
          <span className="text-gray-500 text-sm">Loading your experience</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-indigo-600">.</span>
            <span className="text-purple-600">.</span>
            <span className="text-indigo-600">.</span>
          </motion.span>
        </motion.div>

        {/* Floating Product Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 opacity-30"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 50,
              }}
              animate={{
                y: -50,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 1.2,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
