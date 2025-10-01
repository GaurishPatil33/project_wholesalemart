"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Filter, ArrowUpDown } from "lucide-react";

const MobileFilterSortBar = ({
  setMobileFilters,
  setMobileSort,
}: {
  setMobileFilters: React.Dispatch<React.SetStateAction<boolean>>;
  setMobileSort: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showBar, setShowBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // scrolling down → hide
        setShowBar(false);
      } else {
        // scrolling up → show
        setShowBar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.div
      initial={{ y: -60 }}
      animate={{ y: showBar ? 0 : -60 }}
      transition={{ duration: 0.3 }}
      className="flex md:hidden top-14 bg-gray-50 justify-between items-center gap-3 px-3 py-2 w-full border-b shadow-sm sticky  z-10"
    >
      {/* Filter Button */}
      <button
        onClick={() => {
          setMobileFilters((prev) => !prev);
          setMobileSort(false);
        }}
        className="flex items-center justify-center flex-1 gap-2 py-2 rounded-full border border-gray-300 text-gray-700 font-medium bg-white shadow-sm active:scale-95 transition"
      >
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm">Filters</span>
      </button>

      {/* Sort Button */}
      <button
        onClick={() => {
          setMobileSort((prev) => !prev);
          setMobileFilters(false);
        }}
        className="flex items-center justify-center flex-1 gap-2 py-2 rounded-full border border-gray-300 text-gray-700 font-medium bg-white shadow-sm active:scale-95 transition"
      >
        <ArrowUpDown className="w-4 h-4 text-gray-500" />
        <span className="text-sm">Sort</span>
      </button>
    </motion.div>
  );
};

export default MobileFilterSortBar;
