import { Product } from "@/lib/types";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
// Example animations
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const ProductList = ({ products }: { products: Product[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    });
  };
  console.log(products);
  return (
    <div className="relative">
      {" "}
      <motion.div
        variants={containerVariants}
        ref={scrollRef}
        className="flex  overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth scrollbar-hide"
      >
        {products.map((p) => (
          <motion.div
            key={p.id}
            variants={fadeInUp}
            className="relative snap-start h-fit max-w-50 flex-shrink-0"
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>
      {/* Left/Right Arrows (Desktop only, auto-hide) */}
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="flex absolute top-1/2 left-2 -translate-y-1/2 bg-white/30 shadow-md rounded-full p-1 md:p-2 hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5 text-black" />
        </button>
      )}
      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="flex absolute top-1/2 right-2 -translate-y-1/2 bg-white/30 shadow-md rounded-full p-1 md:p-2 hover:bg-gray-100"
        >
          <ChevronRight className="w-5 h-5 text-black" />
        </button>
      )}
    </div>
  );
};

export default ProductList;
