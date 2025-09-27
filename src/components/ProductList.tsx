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
const ProductList = ({
  products,
  title,
}: {
  products: Product[];
  title?: string;
}) => {
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
  // console.log(products);

  // const { activeId, setActiveId } = useVideoStore();

  // useEffect(() => {
  //   if (!products.length) return;

  //   let currentIndex = products.findIndex((p) => p.id === activeId);
  //   if (currentIndex === -1) currentIndex = 0;

  //   const timer = setInterval(() => {
  //     const nextIndex = (currentIndex + 1) % products.length;
  //     setActiveId(products[nextIndex].id);
  //     currentIndex = nextIndex;
  //   }, 4000);

  //   return () => clearInterval(timer);
  // }, [activeId, products, setActiveId]);

  return (
    <div className="relative">
      {" "}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="bg-white py-3 md:py-6 mx-auto px-2 md:px-6">
          {/* Section Title */}
          <motion.h2
            variants={fadeInUp}
            className="text-xl md:text-2xl font-bold text-center  md:mb-4 bg-gradient-to-r from-red-800 to-red-400 bg-clip-text text-transparent"
          >
            {title}
          </motion.h2>
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
                <ProductCard product={p}  />
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
      </motion.section>
    </div>
  );
};

export default ProductList;
