"use client";
import { motion } from "framer-motion";
import React from "react";

interface Filters {
  category: string[];
  brands: string[];
  priceRange: { min: number; max: number };
  discount: number[];
  rating: number[];
  availabilityStatus: string[];
}

interface FilterBannerProps {
  type: "category" | "brand" | "price";
  categories: string[];
  brands: string[];
  filters: Filters;
  onChange: (newFilters: Partial<Filters>) => void;
}

const FilterBanner: React.FC<FilterBannerProps> = ({
  type,
  categories,
  brands,
  filters,
  onChange,
}) => {
  // Make a copy of filters
  const tempFilters: Filters = { ...filters };

  const toggleCategory = (id: string) => {
    const updated = tempFilters.category.includes(id)
      ? tempFilters.category.filter((c) => c !== id)
      : [...tempFilters.category, id];
    onChange({ category: updated });
  };

  const toggleBrand = (id: string) => {
    const updated = tempFilters.brands.includes(id)
      ? tempFilters.brands.filter((b) => b !== id)
      : [...tempFilters.brands, id];
    onChange({ brands: updated });
  };

  const updatePriceRange = (min: number, max: number) => {
    onChange({ priceRange: { min, max } });
  };

  let title = "";
  let content: React.ReactNode = null;

  switch (type) {
    // case "category":
    //   title = "Shop by Category";
    //   content = (
    //     <div className="flex w-full gap-2 overflow-x-auto flex-wrap">
    //       {categories.map((category, i) => (
    //         <button
    //           key={i}
    //           onClick={() => toggleCategory(category)}
    //           className={`px-2 py-1 rounded-full text-sm font-medium transition-all ${
    //             filters.category.includes(category)
    //               ? "bg-[#900001]/50 text-white"
    //               : "bg-white text-gray-700 border border-gray-300 hover:border-pink-300"
    //           }`}
    //         >
    //           {category}
    //         </button>
    //       ))}
    //     </div>
    //   );
    //   break;

    case "brand":
      title = "Filter by Brand";
      content = (
        <div className="flex gap-2 overflow-x-auto flex-wrap">
          {brands.map((brand, i) => (
            <button
              key={i}
              onClick={() => toggleBrand(brand)}
              className={`px-2 py-1 rounded-full text-sm font-medium transition-all cursor-pointer ${
                filters.brands.includes(brand)
                  ? "bg-[#900001]/50 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-pink-300"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      );
      break;

    case "price":
      title = "Price Range";
      const ranges = [
        { min: 0, max: 2000, label: "Under ₹2000" },
        { min: 2000, max: 5000, label: "₹2000 - ₹5000" },
        { min: 5000, max: 10000, label: "₹5000 - ₹10000" },
        { min: 10000, max: 25000, label: "₹10000 - ₹25000" },
        { min: 25000, max: 50000, label: "₹25000+" },
      ];
      content = (
        <div className="flex w-full gap-2 overflow-x-auto flex-wrap">
          {ranges.map((opt, i) => {
            const isActive =
              filters.priceRange.min === opt.min &&
              filters.priceRange.max === opt.max;

            return (
              <button
                key={i}
                onClick={() => updatePriceRange(opt.min, opt.max)}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#900001]/50 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-pink-300"
                }`}
              >
                <div className=" truncate">{opt.label}</div>
              </button>
            );
          })}
        </div>
      );
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="block md:hidden mx-1 col-span-full py-1.5 pb-2 px-3 bg-[#900001]/10 rounded-lg border border-pink-100"
    >
      <h3 className="text-md font-semibold text-[#900001]/70 mb-1">{title}</h3>
      {content}
    </motion.div>
  );
};

export default FilterBanner;
