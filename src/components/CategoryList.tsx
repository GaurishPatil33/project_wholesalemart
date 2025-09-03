"use client";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Animations
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

// Props type
interface CategoryListProps {
  title: string;
  data: { slug: string; title: string; image: string }[];
  basePath?: string; // e.g., "/category" or "/occasion"
}

const CategoryList = ({ title, data, basePath }: CategoryListProps) => {
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

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative bg-white py-3 md:py-6 mx-auto px-2 md:px-6">
        {/* Section Title */}
        <motion.h2
          variants={fadeInUp}
          className="text-xl md:text-2xl font-bold text-center mb-3 md:mb-4 bg-gradient-to-r from-red-800 to-red-400 bg-clip-text text-transparent"
        >
          {title}
        </motion.h2>

        {/* Scrollable Container */}
        <div className=" relative">
          <motion.div
            variants={containerVariants}
            ref={scrollRef}
            className="flex items-center overflow-x-auto gap-4 snap-x snap-mandatory scroll-smooth scrollbar-hide"
          >
            {data.map((cat) => (
              <motion.div
                key={cat.slug}
                variants={fadeInUp}
                className="relative snap-start flex-shrink-0 w-40"
              >
                <Link
                  href={`${basePath ? basePath : "/listingPage"}?cat=${
                    cat.slug
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-40 w-40 object-cover rounded-tl-2xl rounded-br-2xl"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 rounded-tl-2xl rounded-br-2xl"></div>
                  <p className="absolute bottom-2 left-2 text-xs md:text-sm lg:text-lg text-white font-semibold">
                    {cat.title}
                  </p>
                </Link>
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
      </div>
    </motion.section>
  );
};

export default CategoryList;
