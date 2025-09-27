"use client";
import { motion } from "framer-motion";

const Loader: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = "#900001",
}) => {
  const bounceTransition = {
    y: {
      duration: 0.6,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="flex justify-center items-center py-12 gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ width: size, height: size, backgroundColor: color }}
          animate={{ y: ["0%", "-50%", "0%"] }}
          transition={{ ...bounceTransition, delay: i * 0.2 }}
        />
      ))} Loading
    </div>
  );
};

export default Loader;
